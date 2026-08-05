'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Wraps the app so framer-motion automatically respects the user's
 * prefers-reduced-motion setting (skips transform animations, keeps a
 * simple opacity transition) — without any render-tree branching, so
 * SSR and client hydration stay identical.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
