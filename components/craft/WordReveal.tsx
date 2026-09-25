'use client'

import { useRef, type CSSProperties } from 'react'
import { useRevealOnScroll } from '@/components/motion/useRevealOnScroll'

/**
 * Display text split into words so they arrive independently (Apple's `words` device).
 *
 * Whitespace is a real trailing space inside each span plus white-space pre, never a
 * non-breaking space, so headlines still wrap. A literal newline in `text` forces a line.
 *
 * Progressive enhancement (2026-09-25): words render visible on the server. Only a line still
 * below the fold at hydration is held back and revealed word by word. Its CSS lives in
 * app/globals.css, not in a style element here, so no CSS text ends up inside a heading.
 */
export default function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  y = 22,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  y?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useRevealOnScroll(ref, 0.4)
  const lines = text.split('\n')
  let index = 0

  return (
    <span ref={ref} className={className ? `wr ${className}` : 'wr'} style={{ '--wr-y': `${y}px` } as CSSProperties}>
      {lines.map((line, li) => (
        <span key={li} className="wr-line">
          {line.split(' ').map((word) => {
            const i = index++
            return (
              <span
                key={`${word}-${i}`}
                className="wr-word"
                style={{ '--wr-d': `${(delay + i * stagger).toFixed(3)}s` } as CSSProperties}
              >
                {word + ' '}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
