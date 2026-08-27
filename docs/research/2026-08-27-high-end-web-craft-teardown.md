# How Apple actually builds a page: a device catalogue

_2026-08-27. Prompted by Jack's critique via TJ: our pages read as recycled modules, Apple is
the bar._

**Revised the same day.** The first version of this document measured typography and spacing and
called itself a teardown. TJ was right to push back: font size is the shallowest layer. The
interesting part is the **devices** — the mechanisms Apple uses to present things — and how they
are built. That is what this version is about. Type has been demoted to an appendix.

**Method: measured on the live pages, not read about.** Headless browser at 1440px, scrolling the
full page, sampling computed styles, sticky geometry, and `video.currentTime` at multiple scroll
depths to detect what is actually driven by scroll.

Pages profiled: `apple-music`, `airpods-pro`, `iphone-17-pro`, `apple-vision-pro`, `apple-tv-plus`,
`apple.com`.

---

## 0. The number that frames everything

| Page | Height | Videos | Scroll-driven elements |
|---|---|---|---|
| iPhone 17 Pro | **36,126px** | 17 | 36 |
| Apple Vision Pro | **32,678px** | — | — |
| AirPods Pro | **29,010px** | 16 | — |
| Apple Music | **13,021px** | 4 | 18 |
| **songcry.app** | **2,600px** | **0** | 3 |

On iPhone 17 Pro a **single module** holds the viewport for **9,300px** of scrolling. That is three
and a half times our entire homepage, for one idea.

---

## 1. The signature device: scroll IS the playhead

This is the one to understand first, because most of the others are variations of it.

**Structure:** a tall parent, a `position: sticky` child, and a muted video inside it.

**Mechanism, measured on the Vision Pro design section.** Walking through one pinned block, the
sticky child's offset travels from `+200px` to `-700px` while:

| Progress through block | `video.currentTime` |
|---|---|
| 0% | 0.67s |
| 25% | 1.38s |
| 50% | 2.08s |
| 75% | 2.78s |
| 100% | 3.49s |

Linear. **The scroll wheel is not triggering the video, it is scrubbing it.** You are not watching
an animation that happens to start when you arrive; you are dragging the playhead with your finger.
Scroll up and the film runs backwards. That is why it feels like an object you are handling rather
than a page you are reading.

`videoTimeChanges: true` on every product page profiled. This is the house style, not a one-off.

**Two details that make it survive contact with reality:**

- Every video is `muted` and **not** `autoplay`. Sixteen autoplaying videos would destroy the page.
  They are attached on intersection.
- There is a **start-frame poster element** in the DOM (`overview-design-design-startframe`) held at
  `opacity: 0`. It covers the first frame until the video has decoded, then fades out. Without it
  you get a flash of nothing before the video is ready. Zero canvases anywhere: Apple stopped using
  canvas image sequences and drives real video instead.

**What this needs:** footage. It cannot be faked with CSS.

## 2. `all-access-pass`: the module that takes over

Apple's own class name, and it appears on iPhone 17 Pro, AirPods Pro and Vision Pro. It toggles
between `inactive` and `activated`.

The pattern: a section **claims the viewport**, plays through its idea over thousands of pixels of
scroll, then releases you. Measured parent heights: **9,300px**, 3,970px, 2,575px, 2,470px, 1,292px.

This is the structural answer to why their pages feel authored and ours feels like a list. A normal
section says a thing and hands off. An activated module **holds you and develops the thing**.

## 3. Named bespoke tiles on a shared chassis

**This is the direct answer to Jack's critique, and it is the opposite of what I assumed.**

Apple is not avoiding modules. Apple Music's classes:

```
tile tile-rounded tile-music-live      theme-dark media-full-bleed
tile tile-rounded tile-music-sing
tile tile-rounded tile-shared-listening
tile tile-rounded tile-classical       theme-dark media-full-bleed
tile tile-rounded tile-shazam          theme-dark media-full-bleed
```

There **is** a shared chassis: `tile`, `tile-rounded`. But every single instance carries its own
named modifier with its own bespoke content, media and behaviour. `tile-shazam` is not
`tile-classical` with different words in it.

`tile` appears **348 times** on iPhone 17 Pro. The system is heavily reused; the *contents* are
custom every time.

**So "recycled modules" is not about having a component system.** It is about pouring different
copy into the same presentation and shipping it. The fix is not to abandon reusable components. It
is that **each idea earns its own device.**

## 4. Multi-rate galleries

`media-gallery-item-1` through `media-gallery-item-6`, each carrying its **own** scroll-driven
transform, so the items travel at different rates against each other. Depth without 3D.

Also present: real horizontal scrollers (`scroll-container`, `scrolling-container`, `product-list`)
for browsing sets, and `compare` (180 occurrences on iPhone 17 Pro) for spec comparison.

## 5. Text as an animated material

A `words` class shows up in the scroll-driven set: **text split into individual words** so they can
be revealed and moved independently, not faded in as one block.

Typography classes are **roles, not sizes**: `eyebrow`, `elevated`, `ps-headline-eyebrow`,
`ps-headline-elevated`, `typography-ps-body`, `caption`. A named role can change size per breakpoint
while staying the same idea. We have sizes, which is why ours drifts.

## 6. Purpose-built ornament

`ripple-1`, `ripple-2`, `circle`, `parallax-item float`, `parallax animate`. These are hand-built
graphics animated for one specific section. Not a library, not a generic effect applied evenly.

## 7. The ground changes constantly

`theme-dark` and `media-full-bleed` are per-tile modifiers, and Apple's section backgrounds
alternate `#f5f5f7`, `#1d1d1f`, `#000` down the page. Rhythm comes from the floor changing under you.

songcry.app is one continuous dark field top to bottom, so every section carries identical weight
and nothing is emphasised by contrast.

## 8. Sections butt at zero gap

Measured gaps between consecutive Apple sections: **0, 0, 0, 0, 0, 0, 0**. Every section owns all of
its own vertical space.

This is the discipline that makes yesterday's padding-stacking bug on songcry.app impossible by
construction. See `lesson_section_padding_stacks`.

---

## What this means for Songcry, concretely

**The honest gap is not polish, it is that we have no devices at all.** Our homepage has three
static blocks and one small motion touch. Nothing on it holds a reader, develops an idea, or
responds to them.

Reachable **without** footage:

- Sections butting at zero gap, each owning its space.
- Alternating ground so the page has rhythm.
- Typography as named roles rather than raw sizes.
- Per-word reveal on the display lines.
- One multi-rate gallery of real app screens, which we already have.
- One pinned module that holds the reader while a single idea develops.

Needs footage, and is where the real jump is:

- Scroll-scrubbed video. A song travelling city to city, scrubbed by the reader's own scroll, is
  the Songcry idea expressed as a device rather than described in a paragraph.
- Full-bleed media tiles with the ground going dark under them.
- Bespoke tiles per idea, each with its own clip.

**Jack's shoot is not an asset drop that improves the page. It is the raw material the entire
reference class is built from.** Apple ships 16 and 17 videos per page. We ship zero.

---

## Appendix: type, from the first pass

Still true, still worth keeping, just not the interesting part.

Apple's line-height tightens monotonically as size grows: 128px at 1.00, 96px at 1.04, 64px at 1.06,
48px at 1.08, 28px at 1.14, 24px at 1.17, 17px at 1.24, 12px at 1.33. Letter-spacing goes more
negative as size grows. Weight is almost entirely **600**; they do not reach for 700.

Every size below 28px appears **twice with two line-heights** — tight for display support, loose for
reading copy. One size, two roles.

Fixed on our side in `fix/type-scale-craft-pass`: two headings had shipped with no line-height at
all and inherited the body 1.5. Corrected to 32px/1.12 and 24px/1.16 at weight 600.

**Correction to the first pass:** it claimed 16px and 17px were a near-duplicate pair. Mapping every
size to its element showed the 16px is all footer chrome and never sits beside the 17px body copy.
Not a real conflict.

## Sources

Primary measurement is the substance. Supporting:

- [Apple HIG, Typography](https://developers.apple.com/design/human-interface-guidelines/ios/visual-design/typography/)
- [The details of UI typography, WWDC20](https://developer.apple.com/videos/play/wwdc2020/10175/)
- [SF Pro: variable axes and optical sizing](https://blakecrosley.com/blog/sf-pro-typography-system)
- [Award-winning websites of 2026, judged](https://www.hontran.dev/blog/best-award-winning-websites-2026)
- [Why immersive experiences dominate the 2026 Awwwards](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/)
- [Awwwards: scroll-driven storytelling](https://www.awwwards.com/inspiration/scroll-driven-storytelling-synapser-studio)
