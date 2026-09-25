import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { isProduction, isProductionHost, signupGate } from '../lib/environment.ts'

const FULL = {
  OUTREACH_SUPABASE_URL: 'https://example.supabase.co/',
  OUTREACH_SUPABASE_ANON_KEY: ' anon-key ',
  FAN_WAITLIST_URL: 'https://api.example.test/api/v1/fan-waitlist',
}

const CHECK_SCRIPT = fileURLToPath(new URL('../scripts/check-production-env.ts', import.meta.url))

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
    config: {
      supabaseUrl: 'https://example.supabase.co',
      supabaseAnonKey: 'anon-key',
      fanWaitlistUrl: 'https://api.example.test/api/v1/fan-waitlist',
    },
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

// --- Change 1 (Ruling D′): host fallback ---

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
  ]) {
    assert.equal(isProductionHost(host), false, `expected ${JSON.stringify(host)} to not be a production host`)
  }
})

test('the host fallback promotes the gate to live off VERCEL_ENV, and flags envMismatch', () => {
  assert.deepEqual(signupGate({ ...FULL }, 'songcry.app'), {
    mode: 'live',
    config: {
      supabaseUrl: 'https://example.supabase.co',
      supabaseAnonKey: 'anon-key',
      fanWaitlistUrl: 'https://api.example.test/api/v1/fan-waitlist',
    },
    envMismatch: true,
  })
  assert.deepEqual(signupGate({ ...FULL, VERCEL_ENV: 'production' }, 'songcry.app'), {
    mode: 'live',
    config: {
      supabaseUrl: 'https://example.supabase.co',
      supabaseAnonKey: 'anon-key',
      fanWaitlistUrl: 'https://api.example.test/api/v1/fan-waitlist',
    },
    envMismatch: false,
  })
  assert.deepEqual(signupGate({ ...FULL }, 'www.songcry.app'), {
    mode: 'live',
    config: {
      supabaseUrl: 'https://example.supabase.co',
      supabaseAnonKey: 'anon-key',
      fanWaitlistUrl: 'https://api.example.test/api/v1/fan-waitlist',
    },
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

// --- Change 2: refuse mispasted values ---

test('a quoted anon key is refused as invalid, not accepted', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: '"anon-key"' }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('an anon key with a semicolon is refused as invalid', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: 'anon-key;drop' }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('a URL with a trailing comma is refused as invalid', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_URL: 'https://example.supabase.co,' }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_URL'] },
  )
})

test('an http:// URL is refused as invalid (https required)', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', FAN_WAITLIST_URL: 'http://api.example.test/api/v1/fan-waitlist' }),
    { mode: 'misconfigured', missing: [], invalid: ['FAN_WAITLIST_URL'] },
  )
})

test('internal whitespace after the trim is refused as invalid', () => {
  assert.deepEqual(
    signupGate({ ...FULL, VERCEL_ENV: 'production', OUTREACH_SUPABASE_ANON_KEY: 'anon key' }),
    { mode: 'misconfigured', missing: [], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

test('missing and invalid keys are both named together', () => {
  assert.deepEqual(
    signupGate({
      VERCEL_ENV: 'production',
      OUTREACH_SUPABASE_ANON_KEY: '"anon-key"',
      FAN_WAITLIST_URL: FULL.FAN_WAITLIST_URL,
    }),
    { mode: 'misconfigured', missing: ['OUTREACH_SUPABASE_URL'], invalid: ['OUTREACH_SUPABASE_ANON_KEY'] },
  )
})

// --- Change 3: the prebuild gate refuses a bad production build ---

test('check-production-env.ts exits 1 on production with every key missing, naming them', () => {
  let thrown: { status: number; stderr: Buffer } | undefined
  try {
    execFileSync(
      'node',
      ['--experimental-strip-types', '--disable-warning=ExperimentalWarning', CHECK_SCRIPT],
      {
        env: { ...process.env, VERCEL_ENV: 'production', PATH: process.env.PATH },
        stdio: 'pipe',
      },
    )
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

test('check-production-env.ts exits 0 on production with every key present', () => {
  const out = execFileSync(
    'node',
    ['--experimental-strip-types', '--disable-warning=ExperimentalWarning', CHECK_SCRIPT],
    {
      env: {
        ...process.env,
        PATH: process.env.PATH,
        VERCEL_ENV: 'production',
        OUTREACH_SUPABASE_URL: 'https://example.supabase.co',
        OUTREACH_SUPABASE_ANON_KEY: 'test-anon-key',
        FAN_WAITLIST_URL: 'https://api.example.test/api/v1/fan-waitlist',
      },
      stdio: 'pipe',
    },
  )
  assert.equal(out.toString(), '')
})

test('check-production-env.ts exits 0 off production, regardless of config', () => {
  const out = execFileSync(
    'node',
    ['--experimental-strip-types', '--disable-warning=ExperimentalWarning', CHECK_SCRIPT],
    {
      env: { ...process.env, PATH: process.env.PATH, VERCEL_ENV: 'preview' },
      stdio: 'pipe',
    },
  )
  assert.equal(out.toString(), '')
})
