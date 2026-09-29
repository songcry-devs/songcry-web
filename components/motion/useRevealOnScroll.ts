'use client'

import type { RefObject } from 'react'
import { shouldHoldBack } from '@/lib/reveal'
import { useIsoLayoutEffect } from './useIsoLayoutEffect'

/**
 * Progressive enhancement for scroll reveals (2026-09-25). The server renders the element
 * visible. Before the first post-hydration paint, an element still below the fold gets
 * data-pending (hidden by app/globals.css) and loses it when it scrolls into view. Each element
 * decides for itself, so there is no global switch whose timing could hide something on screen.
 */
export function useRevealOnScroll(ref: RefObject<HTMLElement | null>, amount: number) {
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!shouldHoldBack(el.getBoundingClientRect(), window.innerHeight, reduced)) return

    el.setAttribute('data-pending', '')
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.removeAttribute('data-pending')
          io.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.removeAttribute('data-pending')
    }
  }, [amount])
}
