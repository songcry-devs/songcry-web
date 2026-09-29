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
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/artist`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/join`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/support`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/legal/terms-of-use`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/community-guidelines`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/removing-intimate-images`, changeFrequency: 'yearly', priority: 0.3 },
    // Reviewed more often than the other legal pages on purpose: section 3 lists the
    // barriers we know about, and it changes as we fix them.
    { url: `${BASE}/legal/accessibility`, changeFrequency: 'monthly', priority: 0.3 },
    // The delete-account page Google Play requires. Linked from the Play listing.
    { url: `${BASE}/legal/delete-account`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
