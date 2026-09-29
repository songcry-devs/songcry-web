'use client'

import { useState } from 'react'
import { useIsoLayoutEffect } from './useIsoLayoutEffect'

/**
 * True only after hydration AND when the reader has not asked for reduced motion. False on the
 * server and on the first client render, so the static, readable layout is the default for
 * no-JS, failed-JS and reduced-motion readers, and hydration always matches.
 */
export function useEnhancedMotion(): boolean {
  const [enhanced, setEnhanced] = useState(false)
  useIsoLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnhanced(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return enhanced
}
