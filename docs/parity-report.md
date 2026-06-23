# Framer → Vercel Clone — Parity Report

**Branch:** `feat/framer-clone-cutover` (redesign preserved on `feat/website-refresh-2026`)
**Source of truth:** live Framer site `https://songcry.app` (measured via Playwright at Desktop 1440 / Tablet 1000 / Phone 390)
**Date:** 2026-06-22

Each page was rebuilt section-by-section from computed values read off the live Framer site, then verified with side-by-side screenshots. Tokens live in `app/tokens.css`; section components under `components/sections/{home,artist}` and `components/legal`.

## Page × breakpoint status

| Page | Desktop 1440 | Tablet 1000 | Phone 390 |
|------|:---:|:---:|:---:|
| Home `/` | ✅ matched | ✅ matched | ✅ matched |
| `/artist` | ✅ matched | ✅ (light check) | ✅ matched |
| `/legal/terms-of-use` | ✅ matched | ✅ | ✅ |
| `/legal/privacy` | ✅ matched | ✅ | ✅ |
| `/legal/community-guidelines` | ✅ matched | ✅ | ✅ |

✅ = computed type/colors/spacing matched to Framer and side-by-side screenshots agree. Items below are flagged for TJ.

## Bug fixes made (clone diverges from Framer to fix clear breakage) — need TJ sign-off

1. **`/artist` mobile footer overlap (FIXED).** On live Framer `/artist` at phone width, the footer "Contact Us" heading overlaps the Songcry logo lockup (logo y≈6889–6957, "Contact Us" y≈6921). The clone stacks the footer single-column with ~32px gaps — no overlap on any page.
2. **Footer "Community Guidelines" link (FIXED).** Live Framer links it to the misspelled `/legal/community-guidlines`. The clone links to the correct `/legal/community-guidelines`; the misspelled path is kept as a 301 redirect for backward-compat.
3. **`/artist` "Calling All Music Artists" subtitle (FIXED).** Live Framer renders "SongCry" (brand-casing typo); clone uses "Songcry".
4. **`/artist` "What We Need" card 3 title (FIXED).** Live Framer reads "Drop exlusives" (misspelling); clone uses "Drop exclusives".
5. **Legal "Community Guidelines (BETA)" heading (FIXED).** Live Framer page heading misspells it "Community Guidlines (BETA)"; clone uses correct spelling.
6. **Footer Facebook icon (FIXED).** Repo's `facebook.svg` duplicated the LinkedIn glyph; corrected to a real Facebook glyph.
7. **Nav at `/artist` desktop (FIXED).** Initial nav rendered both the floating pill AND the mobile hamburger bar at desktop (an inline `display:flex` overrode the CSS hide). Now: floating "Download" pill at desktop/tablet on both pages; logo + hamburger only on `/artist` phone.

## Plan-vs-live corrections (followed LIVE site = source of truth)

- **`/artist` nav.** The plan said the `/artist` nav pill is "Get Early Access". Live site: `/artist` uses the SAME floating "Download" pill as Home at desktop/tablet, and collapses to logo + hamburger at phone. "Get Early Access" is the `/artist` **hero** CTA, not the nav. Built to match live.
- **`/artist` has more sections than the plan enumerated.** Live order: Hero → "Calling All Music Artists" → 3 feature rows (Takeover / Rise / Built) → city-photo band → Green Room Perks (6 cards) → What We Need From You (5 cards) → Footer. All built.

## Approximations / open items for TJ

- **`/artist` hero purple glow + sparkles** — approximated with a CSS radial-gradient; exact Framer geometry not reproduced.
- **Home & `/artist` scroll-reveal animations** — Framer fades sections in on scroll; the clone renders them static (always visible). Deferred enhancement.
- **Hero CTA circle-arrow icon + hero→bg bottom gradient** (Home & `/artist`) — approximated.
- **Footer treatment (FIXED 2026-06-22 follow-up).** Framer's footer uses a measured vertical gradient `#080707`→`#121212`; the clone now applies it, plus a faint magenta wash (approximate — Framer has no pink radial in CSS; its pink reads from the footer's pink Songcry logo).
- **"Get Early Access" CTA (`/artist` hero)** links to the App Store; live Framer links to `/#form`. Confirm intended destination.
- **`/youtube` and `/x` redirects** infer the `@songcrymusic` handle (matching IG/TikTok). Confirm these channels exist or drop the stubs. `/tiktok` uses the known footer URL.
- **`/artist` hamburger menu** — live Framer hamburger appears non-functional; clone implements a minimal accessible menu with an App Store link. Confirm intended contents.
- **`/artist` "needs" card image radius** — set to 12px (approximate).
- **Legal content** — content substance matches Framer; section numbering matched per page (terms/privacy unnumbered, community numbered). Minor wording/curly-quote differences may remain in long legal text.
- **Nav logo (FIXED 2026-06-22 follow-up).** The nav was rendering the "Songcry" wordmark only — Framer's nav is a flame **icon** (`nav-flame.svg`, exact Framer asset) + the wordmark. The flame is now added on both the desktop pill and the `/artist` mobile bar, which also resolves the prior ~44px logo left-inset near-miss.

## Notes

- **`/artist` "Drop exclusives" card reuses the Home hero image on purpose.** The live Framer site serves the same asset (`6J1yMzrqFCfyGZIh2XtzvpI.png`) for both the Home hero background and this card; the clone reuses `/framer/hero-bg.png` accordingly — faithful, not a duplication bug.
- Dev-only: Next's image optimizer can 400 on first cold load of large images (resolves once warm); validate clean on the Vercel production build (Phase 7).
- Asset-tracking note: an early blanket `*.png` gitignore rule had silently excluded the `/artist` PNG assets from git; fixed (scoped to root scratch) so all `public/framer` assets ship. Verify images render on the Vercel preview.
