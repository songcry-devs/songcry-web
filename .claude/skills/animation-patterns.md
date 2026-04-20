---
name: animation-patterns
description: Choose the right animation library for the job. Read when implementing any animation, transition, scroll effect, or interactive motion on the Songcry website.
---

# Animation Patterns

The Songcry web project ships four animation primitives. Pick the smallest tool that fits the job.

## framer-motion — default for ~80% of cases

Use for: React state transitions, page transitions, gesture-driven UI, layout animations, variants, presence/exit animations.

```tsx
'use client'
import { motion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}
```

## GSAP — scroll timelines, SVG morphs, complex choreography

Use for: ScrollTrigger sequences, SVG path/morph animations, multi-element timelines, precise control, anything outside React's render cycle.

Import only what is needed:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export function ScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y: 40, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <div ref={ref}>...</div>
}
```

**Rule:** Never load GSAP ScrollTrigger on the server. Use dynamic import with `ssr: false` or gate registration inside `useEffect`.

## Lottie (lottie-react) — designer-handoff animations

Use when a designer hands off an After Effects export (`.json`). Drop the file in `public/lottie/` and render:

```tsx
'use client'
import Lottie from 'lottie-react'
import animationData from '@/public/lottie/hero.json'

export function HeroAnim() {
  return <Lottie animationData={animationData} loop autoplay />
}
```

## CSS / Tailwind transitions — simple hover & focus

Don't pull in a library for a 200ms opacity fade. Use Tailwind:

```tsx
<button className="opacity-80 transition-opacity duration-200 hover:opacity-100">Tap</button>
```

## Decision shortcut

| Need | Tool |
|------|------|
| Hover/focus state | Tailwind transitions |
| Mount/unmount, layout, gestures | framer-motion |
| Scroll-triggered timeline, SVG morph | GSAP |
| Designer-supplied .json | lottie-react |
