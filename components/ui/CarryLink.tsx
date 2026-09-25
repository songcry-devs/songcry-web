'use client'

import type { ReactNode } from 'react'
import { FORM_KEYS, outboundParams, tagUrl } from '@/lib/attribution'
import { useCampaignQs } from '@/lib/use-campaign-qs'

/**
 * A link to artists.songcry.app that carries the visitor's campaign (all form keys, since its
 * form keeps them in access_requests.utm) or, with none, tags the hop as web plus the placement.
 * Without it every arrival from songcry.app looked direct.
 */
export default function CarryLink({
  href,
  placement,
  className,
  children,
}: {
  href: string
  placement: string
  className?: string
  children: ReactNode
}) {
  const qs = useCampaignQs()
  return (
    <a href={tagUrl(href, outboundParams(placement, qs, FORM_KEYS))} className={className}>
      {children}
    </a>
  )
}
