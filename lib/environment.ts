/**
 * Production gate (2026-09-25). Previews and local dev must never write production or fire a
 * real conversion. They used to: the form addresses were hardcoded, so npm run dev, every
 * Vercel preview and the public staging preview wrote real access_requests and fan_waitlist
 * rows, and the artist path sent previews to the live artists.songcry.app thank-you page, which
 * fires the real Meta Lead and Google Ads conversion.
 *
 * Two locks, either one sufficient on its own:
 *   1. Nothing writes unless VERCEL_ENV is exactly 'production', OR the request host is exactly
 *      songcry.app / www.songcry.app (the host fallback, Change 1 below).
 *   2. The addresses exist only as Vercel env vars scoped to Production. They are no longer in
 *      source, so a preview could not reach production even if lock 1 were wrong.
 * Pure, so tests/environment.test.ts can pin it. Nothing here logs — a caller (Task 3.2's server
 * action) decides what to do with envMismatch, including any logging.
 *
 * Host fallback (controller Ruling D′, 2026-09-25): Vercel DOES rebuild a promoted preview with
 * Production env (checked in the docs 2026-09-25), so this is not here to cover that case. It
 * exists for one case only: VERCEL_ENV failing to reach the production runtime — for example
 * with system environment variable exposure turned off for the project. `envMismatch` on the
 * live result flags exactly that: the host says production but VERCEL_ENV does not agree.
 *
 * Mispasted values (Change 2): a signup address that is present but wrapped in quotes, carries a
 * stray `;` or `,`, has internal whitespace, or (for the two URLs) is not `https://` is refused
 * as `invalid`, never treated as usable. The anon key is not validated as a JWT — the outreach
 * project's key format is not confirmed, and it may be an `sb_publishable_` key.
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

/** URL keys must be https://. The anon key has no such requirement. */
const REQUIRES_HTTPS = new Set(['OUTREACH_SUPABASE_URL', 'FAN_WAITLIST_URL'])

/** A present value that is wrapped or dirty enough that it must never be treated as usable. */
function isMispasted(key: string, value: string): boolean {
  if (/["';,]/.test(value)) return true
  if (/\s/.test(value)) return true
  if (REQUIRES_HTTPS.has(key) && !value.startsWith('https://')) return true
  return false
}

export function signupGate(env: Env, host?: string | null): SignupGate {
  const envIsProduction = isProduction(env)
  const hostIsProduction = isProductionHost(host)
  if (!envIsProduction && !hostIsProduction) return { mode: 'preview' }

  const missing: string[] = []
  const invalid: string[] = []
  const values: Record<string, string> = {}

  for (const key of SIGNUP_ENV_KEYS) {
    const value = (env[key] ?? '').trim()
    if (!value) {
      missing.push(key)
    } else if (isMispasted(key, value)) {
      invalid.push(key)
    } else {
      values[key] = value
    }
  }

  if (missing.length || invalid.length) {
    return { mode: 'misconfigured', missing, invalid }
  }

  return {
    mode: 'live',
    config: {
      supabaseUrl: values.OUTREACH_SUPABASE_URL.replace(/\/+$/, ''),
      supabaseAnonKey: values.OUTREACH_SUPABASE_ANON_KEY,
      fanWaitlistUrl: values.FAN_WAITLIST_URL,
    },
    envMismatch: hostIsProduction && !envIsProduction,
  }
}
