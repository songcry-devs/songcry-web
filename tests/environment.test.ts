import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { SIGNUP_ENV_KEYS, isProduction, isProductionHost, signupGate } from '../lib/environment.ts'

/** A fake 20-lowercase-character Supabase project ref, never a real one. */
const FAKE_REF = 'abcdefghij'.repeat(2)
const OTHER_REF = 'z'.repeat(20)

/** A JWT shaped exactly like a Supabase key, built here so no real key is ever pasted. */
function fakeJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${header}.${body}.fake-signature`
}

const ANON_JWT = fakeJwt({ iss: 'supabase', ref: FAKE_REF, role: 'anon' })
const SERVICE_ROLE_JWT = fakeJwt({ iss: 'supabase', ref: FAKE_REF, role: 'service_role' })
const OTHER_REF_JWT = fakeJwt({ iss: 'supabase', ref: OTHER_REF, role: 'anon' })
const TRUNCATED_KEY = ANON_JWT.slice(0, Math.floor(ANON_JWT.length / 2))
const PUBLISHABLE_KEY = 'sb_publishable_testkey1234567890'
const SECRET_KEY = 'sb_secret_testkey1234567890'

const FULL = {
  OUTREACH_SUPABASE_URL: `https://${FAKE_REF}.supabase.co/`,
  OUTREACH_SUPABASE_ANON_KEY: ` ${ANON_JWT} `,
  FAN_WAITLIST_URL: 'https://api.songcry.app/api/v1/fan-waitlist',
}

const LIVE_CONFIG = {
  supabaseUrl: `https://${FAKE_REF}.supabase.co`,
  supabaseAnonKey: ANON_JWT,
  fanWaitlistUrl: 'https://api.songcry.app/api/v1/fan-waitlist',
}

const CHECK_SCRIPT = fileURLToPath(new URL('../scripts/check-production-env.ts', import.meta.url))

/**
 * A child-process env with VERCEL_ENV and every signup key removed from a copy of this
 * process's real env, then exactly `overrides` set on top. Without this, a real
 * OUTREACH_SUPABASE_URL / OUTREACH_SUPABASE_ANON_KEY / FAN_WAITLIST_URL / VERCEL_ENV exported on
 * the machine running the tests would leak into the child and change what the test is actually
 * proving.
 */
function cleanEnv(overrides: Record<string, string>): NodeJS.ProcessEnv {
  const base = { ...process.env }
  for (const key of ['VERCEL_ENV', ...SIGNUP_ENV_KEYS]) delete base[key]
  return { ...base, ...overrides }
}

const CHECK_SCRIPT_ARGS = [
  '--experimental-strip-types',
  '--disable-warning=ExperimentalWarning',
  '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
  CHECK_SCRIPT,
]

test('isProduction is true only for VERCEL_ENV=production', () => {
  assert.equal(isProduction({ VERCEL_ENV: 'production' }), true)
  for (const v of [undefined, 'preview', 'development', 'Production', '']) {
    assert.equal(isProduction({ VERCEL_ENV: v }), false)
  }
})

test('off production the gate is preview even when every address is present', () => {
  assert.deepEqual(signupGate({ ...FULL }), { mode: 'preview' })
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'preview' }), { mode: 'preview' })
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'development' }), { mode: 'preview' })
})

test('production with every address is live, trimmed, trailing slash removed', () => {
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'production' }), {
    mode: 'live',
    config: LIVE_CONFIG,
    envMismatch: false,
  })
})

test('production with a missing or blank address is misconfigured and names what is missing', () => {
  assert.deepEqual(signupGate({ VERCEL_ENV: 'production', FAN_WAITLIST_URL: FULL.FAN_WAITLIST_URL }), {
    mode: 'misconfigured',
    missing: ['OUTREACH_SUPABASE_URL', 'OUTREACH_SUPABASE_ANON_KEY'],
    invalid: [],
  })
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: '   ' }), {
    mode: 'misconfigured',
    missing: ['OUTREACH_SUPABASE_ANON_KEY'],
    invalid: [],
  })
})

// --- host fallback ---

test('isProductionHost matches only the two live hosts, case- and port-insensitive', () => {
  for (const host of ['SONGCRY.APP', 'songcry.app:443', 'www.songcry.app', 'songcry.app']) {
    assert.equal(isProductionHost(host), true, `expected ${host} to be a production host`)
  }
  for (const host of [
    'songcry.app.evil.com',
    'evilsongcry.app',
    'songcry-web-git-x-tjsongcrys-projects.vercel.app',
    'localhost:3000',
    '',
    null,
    undefined,
    // A trailing dot and a bracketed IPv6 host both fail the exact match today, so both stay
    // non-production. Pinned here so a future change to that is deliberate, not accidental.
    'songcry.app.',
    '[::1]:3000',
  ]) {
    assert.equal(isProductionHost(host), false, `expected ${JSON.stringify(host)} to not be a production host`)
  }
})

test('the host fallback promotes the gate to live off VERCEL_ENV, and flags envMismatch', () => {
  assert.deepEqual(signupGate({ ...FULL }, 'songcry.app'), {
    mode: 'live',
    config: LIVE_CONFIG,
    envMismatch: true,
  })
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'production' }, 'songcry.app'), {
    mode: 'live',
    config: LIVE_CONFIG,
    envMismatch: false,
  })
  assert.deepEqual(signupGate({ ...FULL }, 'www.songcry.app'), {
    mode: 'live',
    config: LIVE_CONFIG,
    envMismatch: true,
  })
})

test('off production and a non-production host stays preview, even with every address present', () => {
  assert.deepEqual(
    signupGate({ ...FULL }, 'songcry-web-git-x-tjsongcrys-projects.vercel.app'),
    { mode: 'preview' },
  )
  assert.deepEqual(signupGate({ ...FULL }, 'localhost:3000'), { mode: 'preview' })
  assert.deepEqual(signupGate({ ...FULL }, null), { mode: 'preview' })
  assert.deepEqual(signupGate({ ...FULL }), { mode: 'preview' })
})

// --- OUTREACH_SUPABASE_URL and OUTREACH_SUPABASE_ANON_KEY must be the real shape, not just present ---

test('a quoted anon key is refused as invalid, not accepted', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: `"${ANON_JWT}"` }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('an anon key with a trailing semicolon is refused as invalid', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: `${ANON_JWT};drop` }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('internal whitespace inside the key is refused as invalid', () => {
  const withSpace = `${ANON_JWT.slice(0, 20)} ${ANON_JWT.slice(20)}`
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: withSpace }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('a service_role JWT is refused, even though it decodes cleanly', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: SERVICE_ROLE_JWT }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('an anon JWT signed for a different project ref is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: OTHER_REF_JWT }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('a truncated key is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: TRUNCATED_KEY }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('an sb_publishable_ key is accepted, with no project ref to check it against', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: PUBLISHABLE_KEY }),
    {
      mode: 'live',
      config: { ...LIVE_CONFIG, supabaseAnonKey: PUBLISHABLE_KEY },
      envMismatch: false,
    },
  )
})

test('an sb_secret_ key is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: SECRET_KEY }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('the project URL with a path segment appended is refused, and so is the key that can no longer be checked against it', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_URL: `https://${FAKE_REF}.supabase.co/rest/v1` }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_URL', 'OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('a non-supabase host is refused, and so is the key that can no longer be checked against it', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_URL: 'https://not-supabase.example.com' }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_URL', 'OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('a bad URL does not also refuse a publishable key, which carries no ref to check', () => {
  assert.deepEqual(
    signupGate({
      ...FULL,
      VERCEL_ENV: 'production',
      OUTREACH_SUPABASE_URL: 'https://not-supabase.example.com',
      OUTREACH_SUPABASE_ANON_KEY: PUBLISHABLE_KEY,
    }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_URL'] },
  )
})

test('a URL with a trailing comma is refused, and so is the key that can no longer be checked against it', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_URL: `https://${FAKE_REF}.supabase.co,` }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_URL', 'OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('missing and invalid keys are both named together', () => {
  assert.deepEqual(
    signupGate({
      VERCEL_ENV: 'production',
      OUTREACH_SUPABASE_ANON_KEY: SERVICE_ROLE_JWT,
      FAN_WAITLIST_URL: FULL.FAN_WAITLIST_URL,
    }),
    { mode: 'misconfigured', missing: ['OUTREACH_SUPABASE_URL'], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

// --- FAN_WAITLIST_URL must be exactly the one real endpoint ---

test('a FAN_WAITLIST_URL with the wrong host is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', FAN_WAITLIST_URL: 'https://api.example.test/api/v1/fan-waitlist' }),
    { mode: 'misconfigured', missing: [], invalid: ['FAN_WAITLIST_URL'] },
  )
})

test('a FAN_WAITLIST_URL with the wrong path is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', FAN_WAITLIST_URL: 'https://api.songcry.app/api/v2/fan-waitlist' }),
    { mode: 'misconfigured', missing: [], invalid: ['FAN_WAITLIST_URL'] },
  )
})

test('a FAN_WAITLIST_URL with a trailing slash is refused', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', FAN_WAITLIST_URL: 'https://api.songcry.app/api/v1/fan-waitlist/' }),
    { mode: 'misconfigured', missing: [], invalid: ['FAN_WAITLIST_URL'] },
  )
})

test('an http:// FAN_WAITLIST_URL is refused (https required)', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', FAN_WAITLIST_URL: 'http://api.songcry.app/api/v1/fan-waitlist' }),
    { mode: 'misconfigured', missing: [], invalid: ['FAN_WAITLIST_URL'] },
  )
})

// --- the prebuild gate ---

test('check-production-env.ts exits 1 on production with every key missing, naming them', () => {
  let thrown: { status: number; stderr: Buffer } | undefined
  try {
    execFileSync(process.execPath, CHECK_SCRIPT_ARGS, {
      env: cleanEnv({ VERCEL_ENV: 'production' }),
      stdio: 'pipe',
    })
  } catch (e) {
    thrown = e as { status: number; stderr: Buffer }
  }
  assert.ok(thrown, 'expected check-production-env.ts to exit non-zero')
  assert.equal(thrown!.status, 1)
  assert.match(
    thrown!.stderr.toString(),
    /\[build\] refusing a production build: missing=OUTREACH_SUPABASE_URL,OUTREACH_SUPABASE_ANON_KEY,FAN_WAITLIST_URL invalid=/,
  )
})

test('check-production-env.ts exits 0 on production with every key present, and says so', () => {
  const out = execFileSync(process.execPath, CHECK_SCRIPT_ARGS, {
    env: cleanEnv({
      VERCEL_ENV: 'production',
      OUTREACH_SUPABASE_URL: `https://${FAKE_REF}.supabase.co`,
      OUTREACH_SUPABASE_ANON_KEY: ANON_JWT,
      FAN_WAITLIST_URL: 'https://api.songcry.app/api/v1/fan-waitlist',
    }),
    stdio: 'pipe',
  })
  assert.equal(out.toString(), '[build] signup env check: passed\n')
})

test('check-production-env.ts exits 0 off production, regardless of config, and names the VERCEL_ENV it skipped for', () => {
  const out = execFileSync(process.execPath, CHECK_SCRIPT_ARGS, {
    env: cleanEnv({ VERCEL_ENV: 'preview' }),
    stdio: 'pipe',
  })
  assert.equal(out.toString(), '[build] signup env check: skipped (VERCEL_ENV=preview)\n')
})

test('check-production-env.ts reports VERCEL_ENV as unset when it is not set at all', () => {
  const out = execFileSync(process.execPath, CHECK_SCRIPT_ARGS, {
    env: cleanEnv({}),
    stdio: 'pipe',
  })
  assert.equal(out.toString(), '[build] signup env check: skipped (VERCEL_ENV=unset)\n')
})
