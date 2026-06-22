# Framer → Vercel Pixel-Perfect Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `songcry-web` as a faithful, pixel-perfect clone of the live Framer site at `songcry.app` (Home, `/artist`, legal pages), with clean token-driven code, as the base we cut `songcry.app` over to and enhance deliberately afterward.

**Architecture:** Next.js App Router. Measure exact values off the live Framer site via a Playwright script (`scripts/measure.mjs`), encode them as design tokens + per-section React/CSS, and verify each section with side-by-side Framer-vs-local screenshots at three breakpoints (`scripts/compare.mjs`). The existing "website-refresh-2026" redesign is preserved on its branch and set aside; the clone is built on a fresh branch, replacing redesign page code.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind v4, `next/font`, Playwright (for measurement + verification), framer-motion/gsap (only where Framer animates).

## Global Constraints

- **Parity bar:** pixel-perfect vs the LIVE Framer `songcry.app` — exact font-size/weight/line-height/letter-spacing, colors (hex/rgb), gradients, padding/margin (px), radius, shadows, animation timing+easing. Source of truth = the live Framer site (measured, not guessed).
- **Breakpoints (Framer's):** Desktop ≥ 1200 / Tablet 818–1199 / Phone ≤ 817. Every section verified at all three.
- **Fonts:** Albert Sans (primary) + Inter (secondary), via `next/font`. Match weights actually used on Framer.
- **Bug-fix policy:** clone the design faithfully BUT fix clear layout bugs as you go and **flag each fix** in the parity report for TJ approval. Do not invent visual changes beyond fixing breakage. (Known bug: `/artist` mobile footer "Contact Us" overlaps the logo lockup.)
- **Preserve the redesign:** do NOT delete the `feat/website-refresh-2026` redesign code. The clone happens on a fresh branch; redesign stays intact in git for future salvage.
- **Brand:** "Songcry" (capital S only). Primary pink `rgb(248, 25, 192)`. App Store URL `https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416`.
- **No new content/sections** beyond what Framer has. Enhancements are a separate post-cutover effort.
- **Commit after every task.** Keep components small and single-purpose.

---

## Phase 0 — Foundation

### Task 0.1: Fresh clone branch (preserve redesign)

**Files:** none (git only)

- [ ] **Step 1:** From repo root, confirm the redesign branch is committed and clean.

Run: `git status` → Expected: clean tree on `feat/website-refresh-2026`.

- [ ] **Step 2:** Create the clone branch off the redesign branch (so it inherits assets/config; page code will be replaced).

Run: `git checkout -b feat/framer-clone-cutover`

- [ ] **Step 3:** Confirm branch.

Run: `git branch --show-current` → Expected: `feat/framer-clone-cutover`

- [ ] **Step 4:** Commit a marker doc noting the redesign is preserved on `feat/website-refresh-2026`.

```bash
mkdir -p docs && printf '%s\n' '# Clone branch' '' 'Faithful Framer clone. The prior redesign is preserved on branch `feat/website-refresh-2026` (do not delete).' > docs/CLONE-BRANCH.md
git add docs/CLONE-BRANCH.md && git commit -m "chore: start framer-clone branch; preserve redesign on website-refresh-2026"
```

### Task 0.2: Measurement script

**Files:**
- Create: `scripts/measure.mjs`

**Interfaces:**
- Produces: a CLI `node scripts/measure.mjs <url> "<cssSelector>"` that prints, for each of the 3 breakpoints, the element's `getBoundingClientRect` + a curated set of `getComputedStyle` properties (font, color, background, padding, margin, border, borderRadius, boxShadow, letterSpacing, lineHeight, transition, transform). Used by every section task to read Framer's real values.

- [ ] **Step 1:** Write the script.

```js
// scripts/measure.mjs — node scripts/measure.mjs <url> "<selector>"
import { chromium } from 'playwright'
const [,, url, selector] = process.argv
const BPS = { desktop: 1440, tablet: 1000, phone: 390 }
const PROPS = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color',
  'background','backgroundColor','backgroundImage','padding','margin','gap','width','height',
  'maxWidth','borderRadius','border','boxShadow','textAlign','transition','transform','opacity',
  'display','flexDirection','justifyContent','alignItems']
const b = await chromium.launch()
for (const [name, w] of Object.entries(BPS)) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } })
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(800)
  const data = await p.$$eval(selector, (els, props) => els.slice(0,1).map(el => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect()
    const o = { rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } }
    for (const k of props) o[k] = cs[k]
    return o
  }), PROPS)
  console.log(`\n=== ${name} (${w}px) ===`); console.log(JSON.stringify(data[0] ?? 'NOT FOUND', null, 2))
  await p.close()
}
await b.close()
```

- [ ] **Step 2:** Smoke-test against the live nav logo.

Run: `node scripts/measure.mjs https://songcry.app/ "img"`
Expected: prints rect + computed props for 3 breakpoints (non-empty).

- [ ] **Step 3:** Commit.

```bash
git add scripts/measure.mjs && git commit -m "tools: add Framer computed-style measurement script"
```

### Task 0.3: Side-by-side screenshot comparison harness

**Files:**
- Create: `scripts/compare.mjs`

**Interfaces:**
- Produces: `node scripts/compare.mjs <framerPath> <localPath>` — screenshots `https://songcry.app<framerPath>` and `http://localhost:3000<localPath>` full-page at the 3 breakpoints into `verify/<path>/<bp>-{framer,local}.png`. The verification artifact for every section/page task.

- [ ] **Step 1:** Write the script.

```js
// scripts/compare.mjs — node scripts/compare.mjs <framerPath> <localPath>
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
const [,, fPath='/', lPath='/'] = process.argv
const BPS = { desktop: 1440, tablet: 1000, phone: 390 }
const slug = lPath.replace(/[^a-z0-9]+/gi,'_') || 'home'
const dir = `verify/${slug}`; mkdirSync(dir, { recursive: true })
const b = await chromium.launch()
for (const [name, w] of Object.entries(BPS)) {
  for (const [label, base, path] of [['framer','https://songcry.app',fPath],['local','http://localhost:3000',lPath]]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } })
    await p.goto(base+path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1000)
    await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)) } window.scrollTo(0,0) })
    await p.waitForTimeout(400)
    await p.screenshot({ path: `${dir}/${name}-${label}.png`, fullPage: true })
    await p.close()
  }
}
await b.close()
console.log(`Wrote screenshots to ${dir}/`)
```

- [ ] **Step 2:** Add `verify/` to `.gitignore` (screenshots are local artifacts).

```bash
grep -qxF 'verify/' .gitignore || echo 'verify/' >> .gitignore
```

- [ ] **Step 3:** Commit.

```bash
git add scripts/compare.mjs .gitignore && git commit -m "tools: add Framer-vs-local screenshot comparison harness"
```

### Task 0.4: Extract design tokens from Framer

**Files:**
- Create: `app/tokens.css` (CSS variables) — colors, fonts, spacing, breakpoints, easing
- Modify: `app/layout.tsx` (import tokens, wire `next/font` for Albert Sans + Inter)

- [ ] **Step 1:** Measure the global palette + type ramp from the live site. Run `scripts/measure.mjs` on the body, headings, and key text blocks of `https://songcry.app/` and `/artist`; record the recurring colors (background `rgb(8,7,7)` confirmed, text whites/greys, pink `rgb(248,25,192)`), font sizes/weights, and the section vertical rhythm (padding values).

- [ ] **Step 2:** Write `app/tokens.css` with the measured values as CSS variables (`--bg`, `--text`, `--text-muted`, `--pink`, type scale, spacing scale, `--bp-tablet:1199px`, `--bp-phone:817px`, easing tokens).

- [ ] **Step 3:** Wire fonts in `app/layout.tsx` via `next/font/google` (`Albert_Sans`, `Inter`) and import `tokens.css`; set `<body>` background to `--bg`.

- [ ] **Step 4:** Verify the homepage background + base font render correctly.

Run: `npm run dev` then `node scripts/compare.mjs / /` → eyeball `verify/home/*-framer.png` vs `*-local.png` background/font baseline match.

- [ ] **Step 5:** Commit.

```bash
git add app/tokens.css app/layout.tsx && git commit -m "feat: design tokens + fonts extracted from Framer (palette, type, spacing, breakpoints)"
```

### Task 0.5: Asset + meta audit

**Files:**
- Modify: `app/layout.tsx` (metadata: title, description, OG, favicon)
- Create/verify: `public/` assets used by Framer (favicon SVG, any section images/logos)

- [ ] **Step 1:** Pull Framer's `<head>` metadata (title `Songcry | Geolocation Based Music Platform`, description `Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.`, OG tags, favicon). Set them in `app/layout.tsx` `metadata`.

- [ ] **Step 2:** Inventory the images Framer actually serves on Home + `/artist` (download their native-resolution sources from `framerusercontent.com`). Save into `public/` with clear names; note any that can't be fetched at native res for TJ to export.

- [ ] **Step 3:** Verify favicon + title render.

Run: `curl -s localhost:3000 | grep -iE '<title>|favicon|og:title'` → matches Framer.

- [ ] **Step 4:** Commit.

```bash
git add app/layout.tsx public/ && git commit -m "feat: site metadata + assets matched to Framer"
```

---

## Phase 1 — Shared chrome (Nav + Footer)

> These appear on every page, so they come first. Each is one task: measure Framer → build/adjust component → verify at 3 breakpoints → commit. The `/artist` footer overlap bug is fixed here and flagged.

### Task 1.1: Nav (header)

**Files:**
- Modify: `components/layout/nav.tsx`
- Test/verify: `verify/home/` screenshots (nav region)

- [ ] **Step 1:** Measure the Framer nav: `node scripts/measure.mjs https://songcry.app/ "nav, header"` and measure the logo + "Download" pill (selector by text via DevTools). Record height, padding, logo size, pill colors/padding/radius/font, sticky behavior, and mobile hamburger (`/artist` shows a hamburger ≤ phone).
- [ ] **Step 2:** Rebuild `Nav` to those exact values: logo left, right-side pill ("Download" → App Store URL, new tab) on Home; on `/artist` the nav pill is "Get Early Access". Mobile hamburger menu matching Framer.
- [ ] **Step 3:** Verify.

Run: `node scripts/compare.mjs / /` and `node scripts/compare.mjs /artist /artist` → nav region matches at all 3 breakpoints.

- [ ] **Step 4:** Commit. `git add components/layout/nav.tsx && git commit -m "feat: nav pixel-matched to Framer (Home + artist, mobile menu)"`

### Task 1.2: Footer (+ fix /artist overlap bug)

**Files:**
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1:** Measure Framer footer on Home AND `/artist`: `node scripts/measure.mjs https://songcry.app/ "footer"`. Record the logo lockup, "Contact Us"/email, "Company" + legal links, social icon row, copyright — exact spacing, columns, and the responsive stack order.
- [ ] **Step 2:** Build `Footer` to match. **Fix the known bug:** ensure on phone the "Contact Us" column stacks BELOW the logo lockup with proper spacing (no overlap). Social links → the exact channel URLs from Framer (Instagram/TikTok/Facebook/LinkedIn). Legal links → `/legal/*`.
- [ ] **Step 3:** Verify, paying attention to phone.

Run: `node scripts/compare.mjs /artist /artist` → footer matches; confirm no overlap on phone.

- [ ] **Step 4:** Log the bug fix in the parity report (Task 6.2). Commit. `git add components/layout/footer.tsx && git commit -m "feat: footer pixel-matched to Framer; fix /artist mobile Contact-Us/logo overlap"`

---

## Phase 2 — Home page clone

> Framer Home sections (top→bottom): Hero → How Songcry Works → Download → Footer. Build each as a section component under `components/sections/home/`, compose in `app/page.tsx`. Replace the redesign Home entirely. Each section = one task with the measure→build→verify→commit loop.

### Task 2.1: Reset `app/page.tsx` to the clone shell

**Files:** Modify: `app/page.tsx`

- [ ] **Step 1:** Replace the redesign `FanHomepage` with a shell that renders `<Nav/>`, an empty `<main>`, `<Footer/>`. (Redesign code remains in git on the other branch.)
- [ ] **Step 2:** Verify it builds. Run: `npm run build` → Expected: clean.
- [ ] **Step 3:** Commit. `git add app/page.tsx && git commit -m "refactor: reset Home to clone shell (nav + main + footer)"`

### Task 2.2: Hero section

**Files:** Create `components/sections/home/Hero.tsx`; Modify `app/page.tsx`

- [ ] **Step 1:** Measure Framer hero: headline "Music spreads through fans", subtext "Songcry is where fans decide what rises — and artists see momentum by city.", the "Download on the App Store" pill, and the phone/visual. Record exact type, colors, background (concert image + gradients), layout per breakpoint.
- [ ] **Step 2:** Build `Hero.tsx` to match; mount in `app/page.tsx`.
- [ ] **Step 3:** Verify. Run: `node scripts/compare.mjs / /` → hero matches at 3 breakpoints.
- [ ] **Step 4:** Commit. `git add -A && git commit -m "feat: Home hero pixel-matched to Framer"`

### Task 2.3: "How Songcry Works" section

**Files:** Create `components/sections/home/HowItWorks.tsx`; Modify `app/page.tsx`

- [ ] **Step 1:** Measure the Framer "How Songcry Works" block (heading + the single descriptive paragraph) — exact type, max-width, padding, alignment.
- [ ] **Step 2:** Build + mount.
- [ ] **Step 3:** Verify. Run: `node scripts/compare.mjs / /`.
- [ ] **Step 4:** Commit. `git add -A && git commit -m "feat: Home 'How Songcry Works' matched to Framer"`

### Task 2.4: Download section

**Files:** Create `components/sections/home/Download.tsx`; Modify `app/page.tsx`

- [ ] **Step 1:** This section already matches Framer (the App Store CTA — kicker-free heading "Join early and discover what's rising near you.", subhead "The beta is live…", centered App Store badge → listing, new tab). Port the existing implementation from `feat/website-refresh-2026`'s `app/page.tsx` download block into `Download.tsx`, keeping it centered + the badge↔footer spacing.
- [ ] **Step 2:** Mount; verify. Run: `node scripts/compare.mjs / /` → download section + spacing match at 3 breakpoints.
- [ ] **Step 3:** Commit. `git add -A && git commit -m "feat: Home download section as component (matches Framer)"`

### Task 2.5: Home full-page verification

- [ ] **Step 1:** Run: `node scripts/compare.mjs / /` and review all 3 breakpoints top-to-bottom Framer vs local. Note any diffs; fix and re-verify.
- [ ] **Step 2:** Commit any fixes. `git add -A && git commit -m "fix: Home parity adjustments"`

---

## Phase 3 — `/artist` page clone

> Framer `/artist` (Green Room) sections: Hero → Takeover Your City → Rise in Neighborhood → Built From the Ground → Perks → Invite 3–5 artists → Footer. Build under `components/sections/artist/`, compose in `app/artist/page.tsx`. Each section = one task (measure→build→verify→commit), same pattern as Phase 2. Per-section measurement is read live during execution.

### Task 3.1: Reset `app/artist/page.tsx` to clone shell
- [ ] Replace redesign artist page with `<Nav/>` + empty `<main>` + `<Footer/>`; `npm run build` clean; commit.

### Task 3.2: Hero ("Green Room Invite" / "Calling All Music Artists" / Get Early Access)
- [ ] Measure → build `components/sections/artist/Hero.tsx` → `node scripts/compare.mjs /artist /artist` → commit.

### Task 3.3: "Takeover Your City"
- [ ] Measure → build `TakeoverCity.tsx` → verify → commit.

### Task 3.4: "Rise in [your] Neighborhood"
- [ ] Measure → build `RiseNeighborhood.tsx` → verify → commit.

### Task 3.5: "Built From the Ground [up]"
- [ ] Measure → build `BuiltFromGround.tsx` → verify → commit.

### Task 3.6: "Perks"
- [ ] Measure → build `Perks.tsx` → verify → commit.

### Task 3.7: "Invite 3–5 artists you respect"
- [ ] Measure → build `InviteArtists.tsx` (incl. its CTA) → verify → commit.

### Task 3.8: `/artist` full-page verification
- [ ] `node scripts/compare.mjs /artist /artist` top-to-bottom at 3 breakpoints; fix diffs; confirm footer overlap fixed; commit.

---

## Phase 4 — Legal pages

> terms-of-use, privacy, community-guidelines — mostly type. One task each: measure Framer page → match content + type/spacing → verify → commit.

### Task 4.1: Terms of Service
- [ ] Measure `https://songcry.app/legal/terms-of-use` (verify exact Framer path) → match `app/legal/terms-of-use/page.tsx` content + styling → `node scripts/compare.mjs /legal/terms-of-use /legal/terms-of-use` → commit.

### Task 4.2: Privacy Policy
- [ ] Same loop for `app/legal/privacy/page.tsx`.

### Task 4.3: Community Guidelines
- [ ] Same loop for `app/legal/community-guidelines/page.tsx`.

---

## Phase 5 — Secondary routes + cleanup

### Task 5.1: Social redirect routes
**Files:** Modify `next.config` (redirects) or create `app/{youtube,x,tiktok}/route.ts`
- [ ] Add 301 redirects `/youtube → YouTube`, `/x → X`, `/tiktok → TikTok`, reusing the exact channel URLs captured for the footer socials. Verify with `curl -sI localhost:3000/tiktok`. Commit.

### Task 5.2: Remove typo route + dead code
**Files:** Delete `app/legal/community-guidlines/`
- [ ] Delete the misspelled `community-guidlines` route; grep for references and repoint to `community-guidelines`; remove now-unused redesign-only components if any remain imported. `npm run build` clean. Commit.

---

## Phase 6 — Full-site parity pass

### Task 6.1: Cross-page verification
- [ ] Run `scripts/compare.mjs` for every route (`/`, `/artist`, 3 legal) at all 3 breakpoints. For each, confirm Framer-vs-local match. Fix diffs; commit per fix.

### Task 6.2: Parity report + bug-fix log
**Files:** Create `docs/parity-report.md`
- [ ] Write a table: each page × each breakpoint → ✅ matched / ⚠️ flagged. List every clear-layout-bug fix made (e.g. `/artist` footer overlap) for TJ approval. List any effect that couldn't be made exactly identical. Commit.

### Task 6.3: Meta/SEO/links/404 sweep
- [ ] Verify per page: title, description, OG tags, favicon match Framer; all internal links resolve; external (App Store, socials) correct; 404 behaves. Commit fixes.

---

## Phase 7 — Cutover prep (no DNS flip yet)

### Task 7.1: Vercel deploy + preview validation
- [ ] Push `feat/framer-clone-cutover`; confirm the Vercel preview deploy renders correctly (no dev-only image/optimizer issues — these must be clean in the production build). Run `scripts/compare.mjs` against the Vercel preview URL instead of localhost for a production-accurate check. Fix any prod-only diffs. Commit.

### Task 7.2: Document the DNS flip (execute later, TJ-owned)
**Files:** Create `docs/cutover-runbook.md`
- [ ] Write the exact steps to flip `songcry.app` from Framer to Vercel: add the domain in the Vercel project, the DNS records to set at the registrar, the TTL/propagation note, and the rollback (point DNS back to Framer). Mark "execute when TJ is ready." Commit.

---

## Self-Review (completed at plan-write time)

- **Spec coverage:** every spec section maps to tasks — tokens/fonts (0.4), measurement method (0.2/0.3), nav+footer (Phase 1), Home (Phase 2), /artist (Phase 3), legal (Phase 4), stub redirects + typo cleanup (Phase 5), full parity + SEO + report (Phase 6), cutover prep + DNS runbook (Phase 7), redesign preservation (0.1), bug-fix-and-flag (1.2, 6.2).
- **Placeholder note:** exact pixel/color values are intentionally measured at execution time per Approach A (approved) — the measurement command + properties are concrete; the values are that command's output. This is the nature of a measure-and-match clone, not a TBD.
- **Type/naming consistency:** scripts `measure.mjs` / `compare.mjs` referenced consistently; section components namespaced under `components/sections/{home,artist}/`.
