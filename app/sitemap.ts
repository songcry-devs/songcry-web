import type { MetadataRoute } from 'next'

const BASE = 'https://songcry.app'

/**
 * Sitemap for the main site.
 *
 * The Framer site it replaces has one at /sitemap.xml, so shipping without this would be a
 * REGRESSION at cutover — Google would lose the map of a domain it already crawls. Listed
 * explicitly rather than globbed: these are the only public routes, and a wrong URL in a
 * sitemap is worse than a missing one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/artist`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/join`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/legal/terms-of-use`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/community-guidelines`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/removing-intimate-images`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
