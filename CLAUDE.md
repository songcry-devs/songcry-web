# CLAUDE.md: songcry-web (songcry.app)

_Rewritten in the 2026-09 web sweep (Phase 1A). Framer was cancelled 2026-09-09. This repo is the live site._

## What this is
- The live marketing site, **https://songcry.app**, on Vercel (project `prj_d5MbiXQnkuBX5NUU3GoBDl01E7Zd`). Repo `songcry-devs/songcry-web`, **public on GitHub**.
- **`main` is production.** A merge to `main` deploys songcry.app. Work on a branch, open a PR; TJ looks at the Vercel preview and says yes before anything merges.
- Routes: `/` (home, with the artist and fan sign-up form), `/artist` (the "Songcry for artists" showcase; artists.songcry.app is the separate sign-up funnel, and neither redirects to the other), `/join`, `/join/thanks-fan`, `/support`, `/legal/*`, `/get` (the device-aware "get the app" link), `/r/[code]` (outreach click tracker), `robots.txt`, `sitemap.xml`, and a branded 404.

## Stack
- Next.js 14.2 (App Router), React 18, TypeScript. `package.json` pins `engines.node` to `24.x`.
- Styling: a scoped `<style>{`...`}</style>` string per component plus inline style objects. Tailwind v4 is imported for its base reset only; no utility classes are used. Tokens: `app/tokens.css`. Global rules: `app/globals.css`.
- Motion: framer-motion drives the scroll-bound devices (`components/craft/HoldingModule.tsx`, `DriftGallery.tsx`). Scroll reveals (`Reveal`, `WordReveal`) are CSS plus IntersectionObserver and always render visible on the server.

## Scripts
- `npm run dev`, `npm run start`
- `npm run build`: the style-literal guard, then `next build` (which also lints and type-checks). `prebuild` runs first automatically; see the production gate rule below.
- `npm test`: `node --test` over `tests/**/*.test.ts` using Node's built-in TypeScript type stripping (77 tests). No test framework.
- `npm run lint` (ESLint 8, `next/core-web-vitals`), `npm run typecheck`, `npm run check:styles`
- `node scripts/check-craft.mjs <url> ...`: headless report against the songcry-page-craft bar. Reports, never fails.

## Rules
- **Legal text is lawyer reviewed.** Never edit `content/legal/*.md` or the rendered text of `app/legal/*` without TJ's approval of the exact words. A page's `metadata` export (tab title, share card) is not legal text.
- **Production gate.** Writes (Supabase, the fan-waitlist API) and ad conversions (Meta CAPI, the Meta pixel, Google Ads) happen only when `VERCEL_ENV === 'production'`, or, as a fallback for when that variable fails to reach the runtime, when the request host is exactly `songcry.app` or `www.songcry.app` (`isProduction` plus the host fallback, `lib/environment.ts`). The signup addresses are Vercel env vars scoped to Production: `OUTREACH_SUPABASE_URL`, `OUTREACH_SUPABASE_ANON_KEY`, `FAN_WAITLIST_URL`. The `prebuild` script (`scripts/check-production-env.ts`) re-checks this gate on every Production build and refuses the build if an address is missing or malformed, so a bad env var fails the deploy instead of shipping a broken form. Test forms on `npm run dev` or a preview, where they show "Preview: nothing was saved". Never submit a form on songcry.app.
- **Attribution.** UTM conventions follow `songcry-outreach/bin/link_router.py:tag()` and the vocabulary in `bin/attribution.py`; never invent a source or medium. Helpers: `lib/attribution.ts`, `lib/store-links.ts`. Every download control uses `GetAppLink` (device-aware) or `StoreBadges` (both badges). No new analytics without TJ.
- **`<style>` strings** contain no apostrophe, quote, ampersand or angle bracket, comments included (`scripts/check-style-literals.mjs` fails the build).
- **Pure modules that tests import** use relative imports with the `.ts` extension and `import type` for types. The `@/` alias is for app and component code.
- **Copy:** "Songcry" only; no dashes as punctuation; the word "local" never appears; claims only from the songcry-voice skill's SAFE TO SAY list; TJ approves every visitor-facing word.
- **Design bar:** `~/.claude/skills/songcry-page-craft/SKILL.md`. Measure spacing in a browser; never match a neighbour's padding.
- No new dependency without saying why in the PR. Never merge the `staging` branch.

## Skills in this repo (`.claude/skills/`)
- Songcry-authored: `songcry-design-tokens.md`, `component-conventions.md`, `animation-patterns.md`.
- Vendored (see `VENDORED-SKILLS.md`): `gsap-*` (8), `motion-design`, `react-best-practices`, `web-design-guidelines`.
- Global: `songcry-page-craft` (design bar), `songcry-voice` (words and product truth).

## Where things live
See `WHERE-TO-FIND-IT.md`. Non-Claude agents read `AGENTS.md`.
