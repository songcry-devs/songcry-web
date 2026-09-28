'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { getHref } from '@/lib/store-links'
import { trackGetAppClick } from '@/lib/track'
import { useCampaignQs } from '@/lib/use-campaign-qs'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { placement: string }

/**
 * The one device-aware "get the app" control on songcry.app. Links to /get, which sends an
 * iPhone to the App Store, an Android phone to Google Play and a computer to the home band
 * with both badges. Opens in the same tab: the target is a redirect, and on a computer it is
 * our own page. Works without JavaScript because the server-rendered href is already valid.
 */
export default function GetAppLink({ placement, onClick, children, ...rest }: Props) {
  const qs = useCampaignQs()
  return (
    <a
      {...rest}
      href={getHref(placement, qs)}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        trackGetAppClick(placement)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
