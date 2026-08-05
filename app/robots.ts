import type { MetadataRoute } from 'next'

/** Matches what the Framer site serves today, so cutover changes nothing for crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://songcry.app/sitemap.xml',
  }
}
