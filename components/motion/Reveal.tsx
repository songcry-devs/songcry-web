'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal wrapper matching the live Framer site's feel:
 * fade in + a gentle rise as the element enters the viewport, once.
 * GPU-friendly (opacity + transform only).
 *
 * Reduced-motion is handled globally by <MotionConfig reducedMotion="user">
 * in the root layout (framer-motion then skips the transform for users who
 * prefer reduced motion). This component renders ONE consistent tree on
 * server + client to avoid hydration mismatches.
 *
 * - `delay` staggers siblings (cards/text) in sequence.
 * - `y` overrides the rise distance (default 28px).
 * - `amount` is how much of the element must be visible before it triggers.
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
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
