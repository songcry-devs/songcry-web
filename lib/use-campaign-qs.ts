'use client'

import { useEffect, useState } from 'react'
import { campaignQs } from '@/lib/attribution'

/**
 * The visitor's campaign params as a query string, for outbound links and the sign-up form.
 * It is '' on the server and on the first client render, so hydration always matches, then
 * the real value after mount.
 */
export function useCampaignQs(): string {
  const [qs, setQs] = useState('')
  useEffect(() => {
    setQs(campaignQs(window.location.search))
  }, [])
  return qs
}
