/**
 * Prebuild gate (2026-09-25). npm runs `prebuild` before `build` automatically, so this runs
 * ahead of every `next build`, including on Vercel.
 *
 * On a Production build (VERCEL_ENV === 'production') it re-checks lib/environment.ts's
 * signupGate against the real env and refuses the build unless the gate comes back live.
 * next.config.js is CommonJS and cannot import the TS gate, so this script is where that one
 * definition gets reused rather than duplicated.
 *
 * Why refuse rather than warn: a red production deploy leaves the current live deploy serving.
 * The current live code still has the hardcoded addresses, so a missing or mispasted env var
 * here costs a failed deploy, not real sign-ups.
 *
 * Off Production (including every preview build) this exits 0 without reading the signup keys,
 * printing only which VERCEL_ENV value it skipped for. No env value is ever printed.
 *
 * Run: node --experimental-strip-types --disable-warning=ExperimentalWarning
 * --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/check-production-env.ts
 */
import { signupGate } from '../lib/environment.ts'

function main(): number {
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv !== 'production') {
    console.log(`[build] signup env check: skipped (VERCEL_ENV=${vercelEnv ?? 'unset'})`)
    return 0
  }

  const gate = signupGate(process.env)
  if (gate.mode === 'live') {
    console.log('[build] signup env check: passed')
    return 0
  }

  const missing = gate.mode === 'misconfigured' ? gate.missing : []
  const invalid = gate.mode === 'misconfigured' ? gate.invalid : []
  console.error(`[build] refusing a production build: missing=${missing.join(',')} invalid=${invalid.join(',')}`)
  return 1
}

process.exit(main())
