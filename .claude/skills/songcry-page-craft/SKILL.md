---
name: songcry-page-craft
description: Use BEFORE designing or building any Songcry page, section, or marketing surface, and before proposing a layout or a type scale. Encodes the measured craft bar from the 2026-08-27 Apple teardown, set after Jack's critique that the sites read as recycled modules. Triggers include "build a landing page", "new section", "concept", "redesign", "make it look better", "the spacing is off", or any visual work on songcry-web.
---

# Songcry page craft

The standard Jack set is Apple. This skill is the measured version of that bar, not a vibe.
Full teardown with the raw numbers: `docs/research/2026-08-27-high-end-web-craft-teardown.md`.

**The critique this exists to fix, in Jack's words via TJ:** the pages use recycled modules
instead of custom ones. He is right. Do not design a page by choosing which familiar blocks to
stack.

---

## The three hard rules

### 1. Line-height tightens as size grows. No exceptions.

Measured off Apple: 128px sets at 1.00, 96px at 1.04, 64px at 1.06, 48px at 1.08, 28px at 1.14,
24px at 1.17, 17px at 1.24, 12px at 1.33.

**Never set a heading at body line-height.** A 38px heading at 1.5 has half a line of air inside
it and instantly reads as untouched default. Use this ladder:

| Size range | Line-height |
|---|---|
| 80px and up | 1.00 to 1.05 |
| 48 to 79px | 1.05 to 1.10 |
| 28 to 47px | 1.10 to 1.16 |
| 20 to 27px | 1.16 to 1.35 |
| under 20px, reading copy | 1.45 to 1.55 |

Letter-spacing goes **more negative as size grows**, roughly -0.01em to -0.02em on display sizes,
normal below 20px.

Prefer weight **600** over 700. If the hierarchy needs bold to read, the size relationship is wrong.

### 2. Steps in the scale must be big enough to perceive.

Two sizes four pixels apart are not hierarchy, they are noise. If two sizes are within ~15% of
each other, delete one. Aim for five or six sizes on a page, not eight.

Below 28px, a size may appear **twice with two line-heights**: tight for display support (an intro
line, a caption under a headline), loose for reading copy. That is one size doing two jobs, and it
is deliberate. It is not the same as having two sizes that look alike.

### 3. Sections butt at zero gap. Each section owns all of its own vertical space.

Measured gaps between consecutive Apple sections: 0, 0, 0, 0, 0, 0, 0.

Never create space with the gap between two sections, and **never set a section's padding to match
its neighbour's** as a way to create rhythm. Padding stacks: 96px meeting 96px is 192px, and this
exact mistake shipped on songcry.app on 2026-08-26. See `lesson_section_padding_stacks`.

Before tuning any vertical spacing, measure the real band in a browser: from the last visible
element above to the first below. Do not eyeball it.

---

## The device catalogue: how Apple actually presents things

Type and spacing are the floor. **The critique is about devices** — the mechanisms that present an
idea. Measured across apple-music, airpods-pro, iphone-17-pro, apple-vision-pro, apple-tv-plus.

### 1. Scroll IS the playhead (the signature device)

Tall parent, `position: sticky` child, muted video inside. **Drive `video.currentTime` from scroll
progress.** Measured on Vision Pro: across one pinned block the video runs 0.67s to 3.49s, linear
with scroll. Scroll up and the film reverses. The reader is handling an object, not reading a page.

- `muted`, and **never** `autoplay`. Attach on intersection or sixteen videos destroy the page.
- Keep a **start-frame poster at opacity 0** over the first frame until the video decodes, then fade
  it. Without it you get a flash before the video is ready.
- Apple uses **zero canvas**. Real video, not image sequences.
- Needs footage. Cannot be faked in CSS.

### 2. The module that takes over

Apple's own class is `all-access-pass`, toggling `inactive` and `activated`. A section claims the
viewport, develops one idea over thousands of pixels, then releases. Measured parent heights up to
**9,300px for a single module**.

A normal section states a thing and hands off. An activated module **holds you**. This is the
difference between a page that feels authored and a page that feels like a list.

### 3. Named bespoke tiles on a shared chassis

**This is the direct answer to the recycled-modules critique, and it is not what you would guess.**

Apple Music ships `tile tile-rounded` as a shared chassis, then every instance gets its own named
modifier: `tile-music-live`, `tile-music-sing`, `tile-shared-listening`, `tile-classical`,
`tile-shazam`. `tile` appears **348 times** on iPhone 17 Pro.

So Apple is not avoiding components. **Recycled means pouring different copy into the same
presentation.** Keep the chassis. Give every idea its own device.

### 4. Multi-rate galleries

`media-gallery-item-1` through `-6`, each with its **own** scroll-driven transform so items travel
at different rates against each other. Depth without 3D. Also real horizontal scrollers for
browsing sets.

### 5. Text as an animated material

A `words` class in the scroll-driven set: display lines are **split into words** and revealed
independently, not faded in as one block.

Typography classes are **roles, not sizes**: `eyebrow`, `elevated`, `ps-headline-eyebrow`,
`typography-ps-body`, `caption`. Name the role; let size vary per breakpoint. Raw sizes drift.

### 6. Purpose-built ornament

`ripple-1`, `ripple-2`, `circle`, `parallax-item float`. Hand-built graphics animated for one
specific section. Not a library effect applied evenly across the page.

### 7. The ground changes constantly

`theme-dark` and `media-full-bleed` are per-tile modifiers; section backgrounds alternate
`#f5f5f7`, `#1d1d1f`, `#000`. Rhythm comes from the floor changing under you. **One continuous dark
field gives every section identical weight and emphasises nothing.**

---

## The structural rule, which is the actual critique

**Thin is what reads as recycled.** Songcry's homepage is 2,600px in three blocks: say the thing,
list three steps, ask for the download. Apple Music is 13,021px, and **one of its sections is
5,274px on its own.**

Apple does not use more sections. It uses sections that **develop one idea over thousands of
pixels**. A section that states a point and moves on is a module. A section that opens a point,
demonstrates it, and lands it is design.

**Before building, ask: what is the ONE idea this page develops, and what does it look like to
spend 4,000px on it?** If the answer is a stack of familiar blocks, start again.

Do not ship four concepts that differ only at the hero. That is one idea in four hats.

---

## Media is not decoration, it is the medium

| | Apple Music | AirPods Pro | songcry.app |
|---|---|---|---|
| Videos | 4 | 16 | 0 |
| Art-directed `picture` | 42 of 42 | — | 0 |

- Every video: `muted`, `loop`, **not** `autoplay`. Start them on intersection, or sixteen videos
  destroy the page.
- **Every image in a `picture` element** with a different crop per breakpoint. A single image
  squeezed across widths is wrong at most of them.
- The reference standard is carried by owned motion and imagery. **A page in this class cannot be
  reached with type and CSS alone.** When there is no footage, say so plainly rather than
  compensating with more layout.

Stock photography is not a substitute. It was pulled from concept A for exactly this reason.

---

## Colour

- Near-black, not pure black. Songcry ships `rgb(8,7,7)`, which is correct. Reserve pure black for
  full-bleed media.
- **Alternate the ground section by section.** Apple's rhythm comes from light and dark trading
  places as you scroll. A page that is one continuous dark field gives every section identical
  weight and emphasises nothing.
- Songcry accent is `#F819C0`. It is a punctuation mark, not a surface.

---

## Motion

- `will-change` is not the default. Apple carries 369 transformed elements on Apple Music with
  `will-change` on **zero** of them. Add it only after measuring a problem.
- Every scroll-bound animation needs a reduced-motion path. A scroll binding is a direct style
  write, so a global `MotionConfig` does **not** neutralise it. Collapse the value to zero with
  `useReducedMotion` and keep the render tree identical.
- Motion should carry structure, not ornament it. If removing the animation loses nothing, it was
  ornament.

---

## Before you call a page done

0. **Name the devices on this page.** If the answer is "a hero, some cards and a CTA", it is
   recycled and it will read that way no matter how good the type is. Every idea gets its own
   device on a shared chassis.
1. List every font size on the page. More than six, or any pair within 15%, means fix it.
2. Check every heading's line-height against the ladder.
3. Measure the real gap between each pair of sections in a browser at 1440 and 390.
4. Count the videos and art-directed images. Zero of both means say so out loud.
5. Ask whether the skeleton would look generic with someone else's logo on it. If yes, it is
   recycled, and that is the thing Jack is objecting to.

Related: `feedback_deliberate_design_jack_guardrail`, `feedback_pixel_scan_dont_eyeball`,
`lesson_section_padding_stacks`, `feedback_mobile_design_system_fidelity`.
