'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Props = {
  children: React.ReactNode
  className?: string
  /** Delay before reveal begins (ms). */
  delay?: number
  /** How far into the viewport before firing (framer-motion margin syntax). */
  margin?: string
}

/**
 * Fades + blurs + translates a section into view on scroll.
 * Fires once (viewport.once). Respects prefers-reduced-motion.
 */
export function SectionReveal({ children, className, delay = 0, margin = '-80px' }: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
