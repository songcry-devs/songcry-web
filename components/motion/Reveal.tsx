'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useRevealOnScroll } from './useRevealOnScroll'

/**
 * Fade in and rise as the element enters the viewport, once.
 *
 * Progressive enhancement (2026-09-25): server-rendered visible, never opacity 0. Only content
 * below the fold at hydration is held back (useRevealOnScroll). Content already on screen, such
 * as the home hero and its form, is simply there at first paint. Styles: app/globals.css.
 *
 * - `delay` staggers siblings. - `y` is the rise distance. - `amount` is how much must be visible.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  amount = 0.2,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  amount?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useRevealOnScroll(ref, amount)
  const vars = { '--rv-y': `${y}px`, '--rv-delay': `${delay}s` } as CSSProperties
  return (
    <div ref={ref} className={className ? `rv ${className}` : 'rv'} style={{ ...vars, ...style }}>
      {children}
    </div>
  )
}
