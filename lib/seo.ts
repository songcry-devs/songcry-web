import type { Metadata } from 'next'

export const HOME_TITLE = 'Songcry | Geolocation Based Music Platform'
export const HOME_DESCRIPTION =
  'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.'

/** The one share image for now. A per-page card is Phase 6 work. */
export const OG_IMAGE = { url: '/framer/og-card.png', width: 1200, height: 630 }

type PageMeta = { title: string; description: string; path?: string; noindex?: boolean }

/**
 * Everything a page needs for search and sharing. Next REPLACES the layout's openGraph and
 * twitter objects when a page sets its own, so a page must carry the whole set or it loses
 * the image (/artist did) or inherits the homepage title and URL (every other page did).
 * Relative paths resolve against metadataBase in app/layout.tsx.
 */
export function pageMetadata({ title, description, path, noindex = false }: PageMeta): Metadata {
  return {
    title,
    description,
    ...(path && !noindex ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: 'website',
      siteName: 'Songcry',
      title,
      description,
      images: [OG_IMAGE],
      ...(path ? { url: path } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
