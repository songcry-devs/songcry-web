/**
 * Production gate (2026-09-25). Previews and local dev must never write production or fire a
 * real conversion. They used to: the form addresses were hardcoded, so npm run dev, every
 * Vercel preview and the public staging preview wrote real access_requests and fan_waitlist
 * rows, and the artist path sent previews to the live artists.songcry.app thank-you page, which
 * fires the real Meta Lead and Google Ads conversion.
 *
 * Two locks, either one sufficient on its own:
 *   1. Nothing writes unless VERCEL_ENV is exactly 'production', OR the request host is exactly
 *      songcry.app / www.songcry.app (the host fallback below).
 *   2. The addresses exist only as Vercel env vars scoped to Production. They are no longer in
 *      source, so a preview could not reach production even if lock 1 were wrong.
 * Pure, so tests/environment.test.ts can pin it. Nothing here logs — the caller decides what to
 * do with envMismatch, including any logging.
 *
 * Host fallback: Vercel does rebuild a promoted preview with Production env, so this is not here
 * to cover that case. It exists for one case only: VERCEL_ENV failing to reach the production
 * runtime — for example with system environment variable exposure turned off for the project.
 * `envMismatch` on the live result flags exactly that: the host says production but VERCEL_ENV
 * does not agree.
 *
 * A signup address that is present but wrong is refused as `invalid`, never treated as usable:
 *   - OUTREACH_SUPABASE_URL must be exactly https://<20-character-ref>.supabase.co, after trim
 *     and stripping a trailing slash — not wrapped in quotes, not carrying a stray `;` or `,`,
 *     no extra path, no other host.
 *   - OUTREACH_SUPABASE_ANON_KEY must either be a JWT whose payload claims role "anon" for that
 *     same project ref, or a key starting with sb_publishable_. A service_role key, a secret
 *     key, an anon key for a different project, and a key that no longer decodes (cut short or
 *     otherwise mangled) are all refused. A JWT-shaped key can never be confirmed against a
 *     project ref that does not exist, so it is refused whenever OUTREACH_SUPABASE_URL is
 *     missing or does not parse; a publishable key carries no ref claim to compare, so it is
 *     unaffected either way.
 *   - FAN_WAITLIST_URL must be exactly https://api.songcry.app/api/v1/fan-waitlist — that host,
 *     that path, no query string, no trailing slash.
 */

export type Env = Record<string, string | undefined>

export const SIGNUP_ENV_KEYS = ['OUTREACH_SUPABASE_URL', 'OUTREACH_SUPABASE_ANON_KEY', 'FAN_WAITLIST_URL'] as const

export type SignupConfig = { supabaseUrl: string; supabaseAnonKey: string; fanWaitlistUrl: string }

export type SignupGate =
  | { mode: 'preview' }
  | { mode: 'misconfigured'; missing: string[]; invalid: string[] }
  | { mode: 'live'; config: SignupConfig; envMismatch: boolean }

/** True only when Vercel's own runtime env says this is the Production deployment. */
export function isProduction(env: Env): boolean {
  return env.VERCEL_ENV === 'production'
}

const PRODUCTION_HOSTS = new Set(['songcry.app', 'www.songcry.app'])

/**
 * True only for the live site's own hosts, case- and port-insensitive. Exact match only: a
 * lookalike like songcry.app.evil.com merely contains our name and must fail this check.
 */
export function isProductionHost(host: string | null | undefined): boolean {
  if (!host) return false
  const normalized = host.toLowerCase().replace(/:\d+$/, '')
  return PRODUCTION_HOSTS.has(normalized)
}

/** A Supabase project URL and nothing else: that host shape, no path, no query, no fragment. */
const SUPABASE_URL_SHAPE = /^https:\/\/([a-z0-9]{20})\.supabase\.co$/

/**
 * The three dot-separated, base64url segments of a JWT. This never checks the signature — that
 * cannot be done without the project's secret — only the payload's claims below.
 */
const JWT_SHAPE = /^[A-Za-z0-9_-]+\.([A-Za-z0-9_-]+)\.[A-Za-z0-9_-]+$/

/** A Supabase publishable key carries no claims to decode, so it is checked by shape alone. */
const PUBLISHABLE_KEY_SHAPE = /^sb_publishable_[A-Za-z0-9_-]+$/

/**
 * Base64url to JSON, the way a JWT payload is encoded. atob, not Buffer, so this file keeps
 * working unchanged in the browser bundle that lib/track.ts pulls it into.
 */
function decodeJwtPayload(segment: string): unknown {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  return JSON.parse(atob(padded))
}

/** The 20-character project ref a valid OUTREACH_SUPABASE_URL encodes, or undefined if it does not match. */
function supabaseRef(url: string): string | undefined {
  return SUPABASE_URL_SHAPE.exec(url)?.[1]
}

/**
 * True only for a key that could actually authenticate an anon request to that project: a
 * publishable key (checked by shape only, no ref to compare), or a JWT whose payload claims
 * role "anon" for that exact project ref. `ref` is undefined whenever OUTREACH_SUPABASE_URL is
 * missing or does not parse; a JWT can never be confirmed against a ref that does not exist, so
 * it is refused in that case too.
 */
function anonKeyIsValid(key: string, ref: string | undefined): boolean {
  if (key.startsWith('sb_publishable_')) return PUBLISHABLE_KEY_SHAPE.test(key)

  const match = JWT_SHAPE.exec(key)
  if (!match) return false

  let claims: { role?: unknown; ref?: unknown }
  try {
    claims = decodeJwtPayload(match[1]) as { role?: unknown; ref?: unknown }
  } catch {
    return false
  }
  return claims.role === 'anon' && ref !== undefined && claims.ref === ref
}

/** True only for exactly https://api.songcry.app/api/v1/fan-waitlist — no query, no trailing slash. */
function fanWaitlistUrlIsValid(value: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return false
  }
  return (
    parsed.protocol === 'https:' &&
    parsed.username === '' &&
    parsed.password === '' &&
    parsed.host === 'api.songcry.app' &&
    parsed.pathname === '/api/v1/fan-waitlist' &&
    parsed.search === '' &&
    parsed.hash === ''
  )
}

export function signupGate(env: Env, host?: string | null): SignupGate {
  const envIsProduction = isProduction(env)
  const hostIsProduction = isProductionHost(host)
  if (!envIsProduction && !hostIsProduction) return { mode: 'preview' }

  const rawUrl = (env.OUTREACH_SUPABASE_URL ?? '').trim().replace(/\/+$/, '')
  const rawKey = (env.OUTREACH_SUPABASE_ANON_KEY ?? '').trim()
  const rawWaitlist = (env.FAN_WAITLIST_URL ?? '').trim()

  const missing: string[] = []
  if (!rawUrl) missing.push('OUTREACH_SUPABASE_URL')
  if (!rawKey) missing.push('OUTREACH_SUPABASE_ANON_KEY')
  if (!rawWaitlist) missing.push('FAN_WAITLIST_URL')

  const ref = rawUrl ? supabaseRef(rawUrl) : undefined

  const invalid: string[] = []
  if (rawUrl && ref === undefined) invalid.push('OUTREACH_SUPABASE_URL')
  if (rawKey && !anonKeyIsValid(rawKey, ref)) invalid.push('OUTREACH_SUPABASE_ANON_KEY')
  if (rawWaitlist && !fanWaitlistUrlIsValid(rawWaitlist)) invalid.push('FAN_WAITLIST_URL')

  if (missing.length || invalid.length) {
    return { mode: 'misconfigured', missing, invalid }
  }

  return {
    mode: 'live',
    config: {
      supabaseUrl: rawUrl,
      supabaseAnonKey: rawKey,
      fanWaitlistUrl: rawWaitlist,
    },
    envMismatch: hostIsProduction && !envIsProduction,
  }
}
