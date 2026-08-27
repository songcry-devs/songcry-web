# High-end web craft: a measured teardown, and what Songcry gets wrong

_2026-08-27. Prompted by Jack's critique, relayed by TJ: the sites read as recycled modules
rather than something designed. He named Apple as the bar._

**Method: measured, not read.** Everything in the Apple tables below was pulled out of the live
pages with a headless browser reading `getComputedStyle` and `getBoundingClientRect` at 1440px,
after scrolling the full page so lazy content mounted. Blog posts about Apple's design are
mostly wrong or a decade stale. The numbers here are what the pages actually ship.

Pages profiled: `apple.com/apple-music/`, `apple.com/airpods-pro/`, `apple.com/`.
Songcry profiled: `songcry.app/` as shipped 2026-08-26.

---

## 1. The type system, measured

Apple, across both product pages. Line-height is expressed as a **ratio** because that is the
part that is systematic.

| Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|
| 128px | 600 | **1.00** | -0.256px |
| 96px | 600 | **1.04** | -1.44px |
| 64px | 600 | **1.06** | -0.576px |
| 56px | 600 | **1.07** | -0.28px |
| 48px | 600 | **1.08** | -0.144px |
| 28px | 600 | **1.14** | +0.196px |
| 24px | — | 1.17 / 1.33 | — |
| 21px | — | 1.19 / 1.38 | — |
| 17px | 600 | 1.24 / 1.47 | -0.374px |
| 12px | 400 | 1.33 | -0.12px |

**Two laws fall straight out of this.**

**Law 1: line-height tightens as size grows.** 1.00 at 128px climbing to 1.33 at 12px, monotonic.
Large type is a shape, so it wants to close up. Small type is read left to right, so it wants air.
There is no size at which Apple sets a heading at body line-height.

**Law 2: every size below 28px appears TWICE with two different line-heights.** 17px exists at
1.24 and at 1.47. 21px at 1.19 and 1.38. 24px at 1.17 and 1.33. That is not sloppiness, it is two
roles: the tight one is display support, an intro line or a caption sitting under a headline; the
loose one is reading copy in a paragraph. **One size, two jobs, two settings.**

Weight is almost entirely **600**. Apple does not reach for 700. The hierarchy is carried by size
and spacing, not by getting heavier.

### What Songcry ships

| Size | Weight | Line-height | Verdict |
|---|---|---|---|
| 84px | 600 | 1.00 | fine |
| 42px | 600 | 1.10 | fine |
| 38px | 700 | **1.50** | **wrong** |
| 26px | 700 | **1.50** | **wrong** |
| 20px | 400 | 1.50 | fine, body |
| 17px | 400 | 1.55 | fine, body |
| 16px | 400 | 1.50 | near-duplicate of 17px |
| 12px | 400 | 1.50 | loose |

**Two headings are set at body line-height.** A 38px heading at 1.50 has half a line of air inside
it. Apple sets 48px at 1.08. That single number is most of the difference between "designed" and
"a heading with default spacing on it", and it is on the live site right now.

**Eight sizes with two near-duplicate pairs.** 38 and 42 are four pixels apart doing the same job.
16 and 17 likewise. A reader cannot perceive a 4px step as hierarchy, so it reads as noise. Apple's
steps are 128 / 96 / 64 / 56 / 48 / 28, which are large, confident jumps.

**Weight 700 where Apple uses 600.** Reaching for bold is what you do when the size relationship
is not doing the work.

---

## 2. Structure

**Section gaps measured between consecutive sections on Apple Music: 0, 0, 0, 0, 0, 0, 0.**

Every section butts directly against the next. Each one owns its entire vertical space internally.
Nothing is spaced by the gap between two elements.

This is not a style preference, it is the discipline that makes a long page survive editing. It is
also **exactly the bug shipped on songcry.app on 2026-08-26**: two sections each owning padding,
96px meeting 96px, producing 192px of air nobody chose. See
`lesson_section_padding_stacks`. Apple's rule makes that class of bug impossible.

**Page length.** Apple Music is **13,021px** tall. AirPods Pro is comparable. Songcry's homepage is
**2,600px**, of which one section is a 377px CTA.

One Apple Music section on its own is **5,274px** tall. It is a single sustained scroll sequence.
Songcry has three sections and the whole page is half the height of one Apple section.

**This is the actual shape of the critique.** Songcry's page is not badly built, it is *thin*. Three
blocks stacked: say the thing, list three steps, ask for the download. That skeleton is the same one
under ten thousand SaaS templates, which is precisely why it reads as recycled. Apple does not have
more sections, it has sections that **develop an idea over thousands of pixels**.

---

## 3. Media

| | Apple Music | AirPods Pro | songcry.app |
|---|---|---|---|
| Videos | 4 | **16** | **0** |
| Images | 42 | — | a handful |
| Art-directed `picture` | **42 of 42** | — | 0 |

Every video is `muted`, `loop`, and **not** `autoplay`. They are started by script when they enter
the viewport, which is what keeps sixteen of them on one page from destroying it.

**Every single image is wrapped in `picture`.** Not one plain `img`. Apple ships a different crop
per breakpoint, so the composition is correct at every width rather than one image being squeezed.

The gap is not subtle: **the reference standard is carried by motion and owned imagery, and Songcry
currently has neither.** This is the strongest possible argument for the footage. Jack's two shoot
days are not a nice-to-have that improves the page, they are the raw material the entire reference
class is built from. A page like this cannot be reached with type and CSS alone.

---

## 4. Colour and measure

Apple's backgrounds, by frequency: `#f5f5f7`, `#1d1d1f`, `#000`, with translucent
`rgba(250,250,252,0.8)` for the sticky nav.

Note `#1d1d1f`, not `#000`. Their "black" is a warm near-black; pure black is reserved for
full-bleed media sections. Songcry uses `rgb(8,7,7)` throughout, which is the same instinct, so
this one is already right.

Apple alternates light and dark **section by section**. The page has rhythm because the ground
changes under you. Songcry's homepage is one continuous dark field from top to bottom, so every
section reads with the same weight and nothing is emphasised by contrast.

**Text measure**: clusters at 920px and 1000px for display copy, plus tight 120 to 200px columns for
captions. Songcry uses 663 / 728 / 900 / 440. Comparable, this is not a problem area.

**369 elements carrying a transform** on Apple Music, and `will-change` set on **zero** of them.
Worth noting because I put `will-change: transform` on the homepage numerals. Apple animates far
more than we do and does not reach for that hint. It is not free, and it is not the default.

---

## 5. The honest read on Jack's critique

He is right, and the measurements say where.

**Where he is right.**

- The page skeleton is the generic one. Hero, three steps, CTA. The content is ours; the structure
  is off the shelf. That is the definition of recycled.
- The type scale is not a scale. Eight sizes, two near-duplicate pairs, and two headings set at
  body line-height. That is assembled, not designed.
- There is no owned imagery and no motion carrying anything. What signature motion exists, the
  drifting numerals, is a small touch on a conventional layout, not a structural idea.
- Four concepts differing mainly at the hero, over bodies that were until recently shared, is
  four variations on one idea rather than four ideas.

**Where the critique needs qualifying, because scaling matters.**

- Apple ships 16 art-directed videos per page against a photo library we do not have yet. The
  first fix is not more CSS, it is footage.
- Apple's pages have no form and one job. Songcry's has to convert an artist signup, which is a
  real constraint they do not carry.

Neither of those excuses the type scale or the generic skeleton. Those are free to fix.

---

## Sources

Primary measurement is the substance here. Supporting reading:

- [Apple Human Interface Guidelines, Typography](https://developers.apple.com/design/human-interface-guidelines/ios/visual-design/typography/)
- [The details of UI typography, WWDC20](https://developer.apple.com/videos/play/wwdc2020/10175/)
- [SF Pro: variable axes, optical sizing, the Dynamic Type contract](https://blakecrosley.com/blog/sf-pro-typography-system)
- [Making typography right for every screen size](https://medium.com/@iam.hari/how-to-make-typography-effortlessly-right-for-every-screen-size-1a82ece4926d)
- [Award-winning websites of 2026, judged](https://www.hontran.dev/blog/best-award-winning-websites-2026)
- [Why immersive experiences dominate the 2026 Awwwards](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/)
- [Awwwards, scroll-driven storytelling](https://www.awwwards.com/inspiration/scroll-driven-storytelling-synapser-studio)
