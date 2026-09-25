/**
 * Campaign attribution for songcry.app. Pure and framework-free so `node --test` loads it
 * directly (tests/attribution.test.ts).
 *
 * The UTM authority for every Songcry surface is songcry-outreach/bin/link_router.py tag(), and
 * its vocabulary is bin/attribution.py SOURCES and MEDIUMS. Nothing here invents a value:
 *   web             arrived at songcry.app carrying no campaign params (SOURCES)
 *   google, meta    a paid click we only know from gclid or fbclid, medium cpc (MEDIUMS)
 *   utm_content     the on-site placement, a free label exactly as tag() allows
 * When the vocabulary has no medium for a hop (a link on our own site), medium is left out.
 *
 * Imports inside lib modules that tests load must be relative with a .ts extension. Node
 * resolves them without Next's bundler, so the @/ alias would not load.
 */

/** Keys the sign-up forms keep in access_requests.utm. Same list as artists.songcry.app. */
export const FORM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const

/** The keys link_router tag() writes and a Google Play install referrer carries. */
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

/** Lowercase, [a-z0-9-] only, collapsed, trimmed, capped. Same as songcry-artists lib/store-links. */
export function cleanToken(raw: string | null | undefined, max: number): string {
  return (raw ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, max)
}

/** The whitelisted campaign params in a query string. Empty values are dropped. */
export function pickCampaignParams(qs: string): Record<string, string> {
  const params = new URLSearchParams(qs)
  const out: Record<string, string> = {}
  for (const k of FORM_KEYS) {
    const v = params.get(k)
    if (v) out[k] = v
  }
  return out
}

/** The whitelisted campaign params re-serialised in FORM_KEYS order, or '' when there are none. */
export function campaignQs(qs: string): string {
  return new URLSearchParams(pickCampaignParams(qs)).toString()
}

/**
 * One coarse channel name, for fan_waitlist.source (a VARCHAR(50), one word not a blob).
 * 'web' means the visitor arrived carrying no campaign params at all.
 */
export function channelFromUtm(utm: Record<string, string>): string {
  if (utm.utm_source) return utm.utm_source.slice(0, 50)
  if (utm.gclid) return 'google'
  if (utm.fbclid) return 'meta'
  return 'web'
}

/**
 * The params for a link that leaves this page for a store or for artists.songcry.app.
 * Carries the visitor's own campaign when they have one. Otherwise tags the hop as web plus
 * the placement, so the arrival is attributable instead of looking direct. link_router tag()
 * says why that matters: an untagged link lands as an unattributable row.
 */
export function outboundParams(placement: string, qs: string, keys: readonly string[]): URLSearchParams {
  const found = pickCampaignParams(qs)
  const out = new URLSearchParams()
  if (found.utm_source) {
    for (const k of keys) if (found[k]) out.set(k, found[k])
    return out
  }
  if (found.gclid || found.fbclid) {
    out.set('utm_source', channelFromUtm(found))
    out.set('utm_medium', 'cpc')
    for (const k of keys) if (!out.has(k) && found[k]) out.set(k, found[k])
    return out
  }
  out.set('utm_source', 'web')
  out.set('utm_content', cleanToken(placement, 60))
  return out
}
