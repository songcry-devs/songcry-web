'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Delay in ms before this block starts its reveal. */
  delay?: number
  /** Optional className passthrough to the wrapper. */
  className?: string
  /** Y offset in px (default 24). */
  y?: number
  /** Blur amount in px (default 6). */
  blur?: number
  /** Reveal duration in ms (default 600). */
  duration?: number
  /** Viewport amount (0-1) required before firing. */
  amount?: number
}

/**
 * SectionReveal — consistent scroll-triggered reveal primitive.
 * Fires once when the element reaches `amount` visibility.
 * Respects prefers-reduced-motion (renders statically).
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
  y = 24,
  blur = 6,
  duration = 600,
  amount = 0.25,
}: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: duration / 1000, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
