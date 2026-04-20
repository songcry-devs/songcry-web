---
name: songcry-design-tokens
description: Codified Songcry brand tokens. Read whenever implementing colors, fonts, spacing, or any visual element on the Songcry website.
---

# Songcry Design Tokens

## Colors

| Token | Value |
|-------|-------|
| Primary pink | `rgb(248, 25, 192)` / `#F819C0` |
| Background dark | `#080707` |
| Body text secondary | `#ABABAB` |
| Text primary | `#FFFFFF` |

## Fonts

- **Albert Sans** — already loaded via `next/font/google`. Reference via `var(--font-albert-sans)` in CSS or apply the Tailwind class wired to that variable.

## Type scale

| Element | Size | Weight | Line-height | Letter-spacing |
|---------|------|--------|-------------|----------------|
| Hero H1 | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | 700 | 1.08 | -0.02em |
| Body | `clamp(1.125rem, 0.5vw + 0.875rem, 1.25rem)` | 400 | 1.6 | — |

## Buttons

- Pill shape: `border-radius: 9999px`
- Hero button height: 52px
- Nav button height: 40px
- Font weight: 600

## Nav

- Height: 64px
- Sticky positioned
- On scroll > 10px: blur backdrop + darken background

## Brand name rule

Always written as **Songcry** — capital S, lowercase rest.

Never:
- ~~SongCry~~
- ~~SONGCRY~~
- ~~song cry~~
- ~~songcry~~ (lowercase only is wrong too)
