'use client'

import { useEffect, useState } from 'react'
import { readFirstTouch } from '@/lib/attribution'

function sessionStore(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

/**
 * The visitor's campaign params as a query string: the first campaign this tab arrived with
 * (lib/attribution.ts readFirstTouch), else the current page's. '' on the server and the first
 * client render, so hydration matches, then the real value after mount.
 */
export function useCampaignQs(): string {
  const [qs, setQs] = useState('')
  useEffect(() => {
    setQs(readFirstTouch(sessionStore(), window.location.search))
  }, [])
  return qs
}
