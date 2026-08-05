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

---

## Addendum (added 2026-06-23) — what happened BEFORE and AFTER the 20:18 notes above

The original notes above were written at 20:18 and only cover the clone-execution body. They miss (a) the morning App Store CTA migration that preceded the clone, and (b) the entire evening polish push that continued until ~00:13. Reconstructed from git (`feat/framer-clone-cutover`, all on 2026-06-22 unless noted):

### Earlier that day — App Store CTA migration (predates the clone work)
- `5778a51` (12:37) **feat(web): replace waitlist CTA with App Store download CTA** — app is live on the App Store, so the public site stops collecting waitlist/beta-code signups. Replaced the `#waitlist` form with a `#download` section (Apple "Download on the App Store" badge → real listing `https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416`), hero+nav buttons link straight to the listing (new tab), removed form state + the dead `/api/waitlist` route, added the official Apple badge SVG.
- `a8e2451` (14:07) **fix(web): narrow App Store CTA to form-only swap, keep original section copy** — per TJ, do NOT rewrite the heading/subhead; swap only the form. Locked copy: heading "Join early and discover what's rising near you.", subhead "The beta is live. Artists can join now — fan access is coming soon.", no kicker. See `docs/framer-appstore-cta-migration.md`.
- The clone cutover work (`56d5581` onward, 17:31→20:18) then built on top — see body above.

### Evening polish push (AFTER the 20:18 notes — not captured above)
Continued matching Framer + adding motion/visual fidelity on the same branch:
- `7dcaf00` (20:42) add missing Songcry flame logo to nav (was wordmark-only) + footer gradient/glow to match Framer; `0c0f693` parity-report follow-up.
- `fc46f2f` (21:05) Framer-style **scroll-reveal animations** (fade-up + stagger) across Home + `/artist`; `7be810c` (21:16) made animations SSR-safe + magenta download/footer glow + WhatWeNeed 3-col grid; `c3f4982` parity-report update.
- `dfdedb5` (21:43) animated **purple swirl globe** (`/artist` hero) + white-circle arrows + raised hero phone + stronger magenta glow.
- `8ced3c4` (21:58) **globe-of-the-world sphere + starfield**, richer multi-source bottom gradient, balanced download heading, diagonal Get-Early-Access arrow.
- `4d28093`→`62b85c3` (22:17→23:48) iterative precise-Framer-match dialing: globe lowered/subtler, **perspective floor grid** rising from footer boundary, centered feature screenshots, removed top-left pink artifact, reverse-hover CTAs, grid home-only, hero arrow to NE diagonal, bottom purple/grid raised ~500px above footer, gradient colors dialed (purer/dimmer magenta), crisper grid lines + denser starfield.
- `5c1ce65` (2026-06-23 00:13) **proper dark branded OG link-preview card** (replaces transparent logo that rendered as an ugly white card).

### Branch / deploy state (as of this addendum, 2026-06-23)
- Branch `feat/framer-clone-cutover` is at `5c1ce65`, present locally and on `origin/feat/framer-clone-cutover` (songcry-devs/songcry-web). NOT merged to `main`; Vercel production cutover + DNS flip still TJ-owned/deferred.
- **Framer live-site = DONE** (verified 2026-06-23 via Playwright against live `songcry.app`): the waitlist form is gone (0 inputs, word "waitlist" absent), the App Store link `id6760088416` is live, and the locked download copy renders verbatim ("Join early and discover what's rising near you." / "The beta is live. Artists can join now — fan access is coming soon."). The `publish-dialog.png`/`publish-status.png`/`live-songcry-app.png` shots (~14:53–14:56) were that publish. The CTA migration is live on BOTH surfaces (Framer live + the Vercel clone branch). Memory `project_framer_edit_via_playwright_mcp` updated accordingly.
