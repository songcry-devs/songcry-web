# Session notes — 2026-06-22 — Framer → Vercel pixel-perfect clone

Executed `docs/plans/2026-06-22-framer-clone-cutover-plan.md` via subagent-driven-development. Built `feat/framer-clone-cutover` off `feat/website-refresh-2026` (redesign preserved). 38 commits; production build clean (6 static routes, Home First-Load JS 103 kB vs the redesign's 162 kB).

## What was built (all measured live off Framer songcry.app via Playwright at 1440/1000/390)
- **Phase 0:** `scripts/measure.mjs` + `scripts/compare.mjs` (playwright devDep), `app/tokens.css` (palette/type/spacing/breakpoints), `next/font` Albert Sans + Inter, Framer `<head>` metadata + native-res assets in `public/framer/`.
- **Phase 1:** `Nav` (floating dark pill; `/artist` phone → hamburger) + `Footer` (3-col → stacked; social glyphs; fixed `/artist` mobile overlap).
- **Phase 2 (Home):** `Hero`, `HowItWorks`, `Download` composed in `app/page.tsx`. Verified desktop+tablet+phone vs Framer.
- **Phase 3 (`/artist`):** `ArtistHero`, `CallingIntro`, `FeatureRow`×3 (+`CityBand`), `Perks` (6 cards), `WhatWeNeed` (5 cards). Verified desktop+phone.
- **Phase 4 (legal):** shared `LegalLayout` + terms/privacy/community restyled to Framer (42px "(BETA)" headings, 16px/#D6D6D6/1.6 body, Framer titles).
- **Phase 5:** `next.config.js` 301 redirects (`/tiktok`,`/youtube`,`/x`, `/legal/community-guidlines`→correct); removed typo route + unused redesign motion components.
- **Phase 6:** `docs/parity-report.md` (page×breakpoint + flags); meta/SEO/404 sweep.
- **Phase 7.2:** `docs/cutover-runbook.md` (DNS flip steps, TJ-owned).
- **Final whole-branch review (opus):** no Critical. Cleanups landed (nav dead code, legal skip-link, 90 lines dead CSS). **Caught a deploy-breaker:** a blanket `*.png` gitignore had silently kept the `/artist` PNG assets untracked → would 404 on Vercel; scoped the rule and committed all `public/framer` assets.

## For Alfred / TJ (open items — see docs/parity-report.md)
- Bug-fixes that diverge from Framer (need sign-off): `/artist` mobile footer overlap, footer "Community Guidelines" typo link, "SongCry"→"Songcry", "Drop exlusives"→"exclusives", "Guidlines"→"Guidelines", Facebook icon.
- Approximations: `/artist` hero purple glow, scroll-reveal animations (built static), hero CTA arrow-circle icon, Home download/footer ambient glow, `/artist` card image radius.
- Decisions to confirm: "Get Early Access" → App Store (Framer used `/#form`); `/youtube` & `/x` redirect handles inferred as `@songcrymusic`; `/artist` hamburger menu contents.

## Not done (deferred, outward-facing)
- **Phase 7.1 — push `feat/framer-clone-cutover` + validate Vercel preview.** Left for explicit go-ahead (outward-facing deploy; parity flags pending TJ review). Branch is local-only on `origin = songcry-devs/songcry-web`.
- The DNS flip itself (Phase 7 / runbook) is TJ-owned and intentionally deferred.
