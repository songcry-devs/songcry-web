'use client'

import { APP_STORE_URL, trackAppStoreClick } from '@/lib/appstore'

/**
 * A tracked App Store link.
 *
 * Exists as its own client component so the hero sections can stay SERVER components — they
 * only need an onClick on one anchor, and marking a whole hero 'use client' to get it would
 * ship its markup to the browser for no reason.
 *
 * `placement` is passed through to the Meta event so we can tell WHICH button converts
 * (nav vs home hero vs artist hero). Without it every click looks identical and the creative
 * and layout lessons are invisible.
 */
export default function AppStoreLink({
  placement,
  className,
  ariaLabel,
  children,
}: {
  placement: string
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackAppStoreClick(placement)}
    >
      {children}
    </a>
  )
}
