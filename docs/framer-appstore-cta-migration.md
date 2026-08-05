# Waitlist → App Store Download CTA — Framer migration steps

**Date:** 2026-06-22
**Why:** Songcry is no longer running a beta-code / waitlist flow. The app is live on the
App Store, so the public site must push users to **download** instead of collecting
name/email/waitlist signups.

**App Store listing (use verbatim):**
`https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416`
(On iPhone this link opens the App Store app straight to the Songcry listing.)

---

## UPDATE 2026-06-22 — scope narrowed to form-only swap (TJ)

TJ clarified the intent: **do not rewrite the section heading/subhead.** Keep the
existing copy and only replace the *form* (name/email/"Join Waitlist") with an App Store
download action.

**Locked copy for the download section (both surfaces must match exactly):**
- Heading: `Join early and discover what's rising near you.`
- Subhead: `The beta is live. Artists can join now — fan access is coming soon.`
- **No kicker line.**
- App Store badge linking to the listing (new tab).

This **supersedes** the original "Download Songcry." / "Start discovering music where it's
actually moving." / "Available now on the App Store" rewrite described below.

**Status:**
- **Framer (`songcry.app`):** done on branch `update-call-actions` (form removed, badge
  added + linked new-tab, hero + nav buttons → App Store, original heading/subhead kept,
  kicker removed). **Not published** — held for TJ to eyeball + publish.
- **Vercel (`songcry-web`):** `app/page.tsx` reverted to the locked minimal copy above
  (kicker block removed, badge CTA kept). Build passes.

> Goal: Vercel must be **100% identical** to the live Framer site so we can retire Framer
> and serve `songcry.app` from this repo. This CTA section now matches in copy + structure;
> full pixel-parity across the whole site remains the larger cutover effort.

---

## ✅ Done in the Vercel version (`songcry-web`)

Branch `feat/website-refresh-2026`. The waitlist CTA was replaced with an App Store
download CTA in code:

| File | Change |
|------|--------|
| `app/page.tsx` | `#waitlist` section (name+email form, "Join Waitlist", "Be first in your city") → new `#download` section: heading **"Download Songcry."**, subhead **"Start discovering music where it's actually moving."**, kicker **"Available now on the App Store"**, and the **official Apple "Download on the App Store" badge** linking to the listing. All form state/handler/honeypot removed. |
| `app/page.tsx` | Hero CTA "Get Early Access" (→ `#waitlist`) → **"Download on the App Store"** linking directly to the App Store (new tab). |
| `components/layout/nav.tsx` | Nav pill "Get Early Access" (→ `#waitlist`) → **"Download"** linking directly to the App Store (new tab). |
| `app/api/waitlist/route.ts` | **Deleted** (endpoint no longer called). |
| `public/icons/app-store-badge.svg` | Added official Apple badge SVG. |

Verified with `npm run build` (clean) + rendered HTML check (3 App Store links present, 0
waitlist strings remaining).

**Deliberately NOT changed** (out of scope — separate decisions):
- `app/artist/page.tsx` — "Green Room Invite / Apply for Early Access" is the **artist
  application program**, a real separate flow, not the fan app download.
- Legal pages' "(BETA)" labels + beta-program clauses (`app/legal/*`) — legal copy.

---

## 🟡 TODO on the live Framer site (`songcry.app`)

The live marketing site is still the **Framer** project (no repo; edited in the Framer
editor). Apply the same change there. Steps:

> ⚠️ **Apply to ALL THREE breakpoints: Desktop/PC, Tablet, and Mobile.** Framer keeps
> independent layouts per breakpoint. The waitlist→download swap, the nav button, and the
> hero button must each be updated (and verified) in all three, or the live site will be
> inconsistent across devices. Check each breakpoint in the editor before publishing.

### 1. Replace the waitlist section

1. Open the Framer project for `songcry.app` and select the home page.
2. Scroll to the waitlist section (the one with the name + email fields and the
   **"Join Waitlist"** button, headed something like *"Join early and discover what's
   rising near you"* / *"Be first in your city"*).
3. Delete the **form** (name field, email field, submit button) and any
   waitlist/beta-code helper text.
4. Keep the section frame + background. Replace the contents with:
   - **Heading:** `Download Songcry.`
   - **Subhead:** `Start discovering music where it's actually moving.`
   - **Kicker (small, pink, uppercase):** `Available now on the App Store`
   - **Apple App Store badge** image (see step 3 for the asset).

### 2. Fix the header + hero buttons

- **Top nav button** — currently "Get Early Access" linking to the waitlist section.
  Change label to **"Download"** and set the link to the App Store URL above.
  Set link target to **"New Tab"**.
- **Hero button** — currently "Get Early Access" linking to the waitlist section.
  Change label to **"Download on the App Store"** and link to the App Store URL,
  **New Tab**.

### 3. Add the Apple badge

Use Apple's official badge (matches what's in the Vercel version):
- Either drag in `public/icons/app-store-badge.svg` from this repo, or
- Download fresh from Apple Marketing Tools:
  `https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us`
- Set the badge's link to the App Store URL above, **New Tab**.
- Suggested height ~56px; keep aspect ratio (badge is ~3:1).

### 4. Remove waitlist data plumbing

- If the Framer waitlist form posts to a CMS collection, a webhook, an automation, or an
  email/airtable integration, **disconnect / disable it** so no new signups are collected.
- Check for any other "waitlist" / "early access" / "beta" wording elsewhere on the page
  (e.g. footer, popups) and update to download-focused copy.

### 5. Publish

- Preview, then **Publish** the Framer site.
- Sanity check on an iPhone: tapping any download button should open the App Store app
  on the Songcry listing.

---

## Long-term: Framer → Vercel cutover

TJ wants to retire Framer and serve `songcry.app` from this Vercel project once it's
pixel-perfect. When that cutover happens, this CTA change is already in place here — no
re-work needed. Until then, **both surfaces must stay in sync**: any future homepage CTA
change should be made in this repo *and* mirrored in Framer (or the cutover should be
completed so there's only one surface).
