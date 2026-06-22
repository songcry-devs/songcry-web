# Design: Framer → Vercel pixel-perfect cutover of songcry.app

**Date:** 2026-06-22
**Repo:** `songcry-web` (branch `feat/website-refresh-2026`)
**Status:** Design — approved for spec review

## 1. Goal

Make `songcry-web` a **pixel-perfect port** of the live Framer site at `songcry.app`, with
clean, maintainable, token-driven code — so we can retire Framer, serve `songcry.app` from
this repo, and have a solid base to *enhance* afterward.

Pixel-perfect is the bar **for the cutover**. Enhancements/redesign happen **after** the
flip, not during it. This is a faithful 1:1 port, not a redesign. (TJ, 2026-06-22.)

## 2. Scope

### In scope — the real live Framer pages
- **Home** (`/`)
- **`/artist`**
- **Legal**: terms of use, privacy, community guidelines
- **Shared chrome**: nav + footer (appear on every page), including the footer social links
  (Instagram / TikTok / Facebook / LinkedIn) which must point to the same channels as Framer
- Fonts, image/SVG assets, colors, gradients, spacing, **all three Framer breakpoints**
  (Desktop ≥ 1200 / Tablet 818–1199 / Phone ≤ 817), and **animations / interactions / hover states**

### Out of scope (now)
- `/contents`, `/for-fans` — unpublished Framer drafts (404 on live site)
- The actual **DNS flip** (deferred — small step, mechanics TBD when ready; see Phase 7)
- Any **new** design or enhancements (post-cutover)

### Empty stub routes — `/youtube`, `/x`, `/tiktok`
On the live Framer site these render literally `Edit Content` with **0 links, 0 images, no
content, no redirect** — empty unfinished pages. **Default decision:** redirect each to the
matching social channel (reusing the footer social URLs) so social links always resolve
correctly. Low-priority, trivially changeable later. (The footer social *icons* are
replicated exactly regardless — that is separate from these routes.)

## 3. Source of truth & measurement method (Approach A: measure-and-match)

The **live Framer `songcry.app` is the source of truth.** For each section, at each
breakpoint, exact values are extracted from the rendered page via the browser:

- `getComputedStyle` → font-size / weight / line-height / letter-spacing, colors, gradient
  stops, padding / margin (px), border-radius, box-shadow, `transition` / easing
- `getBoundingClientRect` → exact dimensions and positions
- the actual loaded **font files**, **image assets at native resolution**, animation
  timing + easing curves

→ set the same values in code → **screenshot Framer vs the Vercel preview side-by-side at
all three breakpoints** to confirm. Measuring is automated (done by Claude via the browser),
**not** manual — TJ never measures.

**Why not alternatives:** porting Framer's auto-generated HTML/CSS (Approach B) would import
obfuscated spaghetti and wreck the clean codebase we want to build on. Pure visual-diff
(Approach C) is imprecise — it can't confirm true pixel/animation parity. We use C
(screenshot diff) only as the *verification* step on top of A.

## 4. Architecture — the clean base

Keep the existing stack (Next.js App Router, Tailwind v4, `framer-motion` + `gsap` +
`lottie-react`), but make it token-driven and section-componentized:

- **Design-token layer first** — single source of truth for colors, fonts, spacing scale,
  breakpoints, and easing curves, extracted from Framer (Tailwind theme + CSS variables).
  No scattered magic hex / px values.
- **Fonts** via `next/font`, matching Framer exactly (Albert Sans + any other faces actually
  used; verify weights/styles in use).
- **Shared components**: `Nav`, `Footer` (already exist → brought to parity).
- **Each page = composed section components** (e.g. Home → `Hero`, `HowItWorks`,
  `DownloadCTA`; reuse the existing `components/` structure), each isolated, typed,
  single-purpose, understandable in isolation.
- **Motion components**: reuse / extend existing `SectionReveal`, `KineticHeadline`,
  `ParallaxPhone`, `WaveDivider` to match Framer's animations.
- **Assets**: audit `public/` against Framer's actual assets; re-export anything
  missing / wrong; lock the exact App Store badge + social icons.
- **Cleanup as we go**: remove the duplicate typo route `app/legal/community-guidlines/`
  (keep the correctly-spelled `community-guidelines`), dead code, magic numbers.

### Current `songcry-web` reality (IMPORTANT — corrected 2026-06-22)
**`songcry-web`'s current pages are NOT a Framer clone — they are a separate, richer
"website-refresh-2026" redesign** (Home has Fan-gallery / "How it spreads" cards /
"Your city, not theirs" editorial / Fan-perks grid / Artist-teaser sections that do **not**
exist on Framer). TJ reviewed it and decided **not** to ship the redesign — parts read
cheap / AI-generated (e.g. fake listener avatars). Direction (TJ, 2026-06-22): **build a
faithful 1:1 clone of the current Framer site now**; add new things *deliberately* later.

Implications for this work:
- **Set the redesign aside, do not delete it.** Preserve it (keep the existing
  `feat/website-refresh-2026` branch intact; do the clone on a fresh branch). It may hold
  reusable ideas for deliberate post-cutover enhancements.
- The clone is built to match Framer; existing redesign page code is **replaced**, not
  adjusted. Reuse only what genuinely matches Framer (assets in `public/`, and `Nav`/`Footer`
  *only if* they already match Framer — verify; otherwise rebuild to match).
- Existing pieces that may be reusable as tools: `public/` assets, the motion-component
  scaffolding (`SectionReveal` etc.), Tailwind setup.
- Components present today (redesign): `layout/{nav,footer}`, `motion/{KineticHeadline,
  ParallaxPhone, SectionReveal, WaveDivider}`.
- The Home **download section** already matches the current live Framer Home (App Store CTA,
  commit `a8e2451`) — that one section is a valid reference for the clone.

### Bug-fix policy (TJ, 2026-06-22)
Clone the Framer **design** faithfully, but **fix clear layout bugs as we go and flag each
one** for TJ's approval — an obvious breakage is not "the design." Known example to fix:
on **`/artist` (mobile)** the footer "Contact Us" text **overlaps the Songcry logo lockup**
("yours, not theirs") instead of stacking with spacing. Each such fix is logged in the parity
report.

## 5. Phased execution plan

- **Phase 0 — Foundation**: create a fresh clone branch (preserving the redesign on
  `feat/website-refresh-2026`); audit which existing `public/` assets + `Nav`/`Footer`
  actually match Framer; extract design tokens + fonts + asset inventory from live Framer;
  stand up the side-by-side screenshot verification harness (Framer vs Vercel preview at the
  three breakpoints).
- **Phase 1 — Shared chrome**: Nav + Footer to pixel-parity (on every page → first).
- **Phase 2 — Home**: section by section — measure → match → verify each at three breakpoints,
  including scroll / hover animations.
- **Phase 3 — `/artist`**: same methodology.
- **Phase 4 — Legal pages**: terms / privacy / community guidelines (mostly type — fast).
- **Phase 5 — Secondary routes + cleanup**: redirect the empty `/youtube` `/x` `/tiktok`
  routes to socials; remove the typo route; dead-code sweep.
- **Phase 6 — Full-site parity pass**: every page × every breakpoint side-by-side; link checks;
  **SEO / meta parity** (titles, descriptions, OG tags, favicon); 404 behavior; accessibility
  sanity. Output a written parity report listing every page/breakpoint verified and any flagged
  near-misses.
- **Phase 7 — Cutover prep**: Vercel domain-config readiness + documented exact DNS steps,
  staged for when TJ is ready to flip. (The flip itself is a later, TJ-owned action.)

## 6. Verification bar (per section)

Not "looks close." For each section: computed values match Framer's numbers **and** the
side-by-side screenshots match at Desktop / Tablet / Phone, with animations matched on
timing + easing. Anything that **cannot** be made exactly identical (rare Framer
scroll-linked / custom-easing effects that don't read as a single clean value) is
**explicitly flagged** for TJ's eyeball — never silently shipped.

**Review cadence:** TJ chose **one big review at the end** — Claude builds the whole site to
the verification bar, then TJ does a single full side-by-side review before flip prep.

## 7. Risks

1. **Content freeze**: if the Framer site is edited *during* the port, parity drifts.
   Recommendation: don't edit Framer until we flip; otherwise re-verify affected sections at
   the end.
2. **Non-reproducible effects**: a few Framer scroll-linked / parallax easings may not read as
   one clean value — replicate the behavior and flag any that aren't exactly identical.
3. **Fonts**: confirm the exact Framer font(s) and weights; Albert Sans is on Google Fonts, so
   `next/font` should match, but verify glyph metrics.
4. **Asset quality**: if any Framer asset can't be extracted at native resolution, TJ may need
   to export it from Framer.

## 8. Open / deferred decisions
- DNS flip mechanics — decided at flip time (Phase 7).
- Whether to keep the empty stub routes as redirects vs build real pages — post-cutover.
