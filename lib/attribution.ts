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
 * Which page a sign-up came from, from the Referer. Values carry a web: prefix so songcry.app
 * rows stay distinct from artists.songcry.app rows in the shared access_requests table. Falls
 * back to web:join when the Referer is missing or not ours; a lead is never rejected over it.
 */
export function sourcePageFromReferer(referer: string | null): string {
  const fallback = 'web:join'
  if (!referer) return fallback
  try {
    const u = new URL(referer)
    if (u.hostname !== 'songcry.app' && !u.hostname.endsWith('.songcry.app')) return fallback
    const path = u.pathname.replace(/^\/+|\/+$/g, '')
    return path === '' ? 'web:root' : `web:${path}`
  } catch {
    return fallback
  }
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

/** sessionStorage key for the first campaign this tab arrived with. */
export const FIRST_TOUCH_KEY = 'songcry.firstTouch'

export type KeyValueStore = { getItem(key: string): string | null; setItem(key: string, value: string): void }

/**
 * First-touch campaign for this session (2026-09-25). A visitor who lands on /artist from an ad,
 * clicks the logo and signs up on the homepage used to be recorded with no campaign, because
 * the form only read the page it sat on. The first campaign a tab arrives with is kept for the
 * session and wins over later ones. Storage can be missing or throw (private browsing, blocked
 * site data, some in-app webviews): then the current page's params are used and nothing throws.
 */
export function readFirstTouch(store: KeyValueStore | null, currentSearch: string): string {
  const current = campaignQs(currentSearch)
  let stored = ''
  try {
    stored = campaignQs(store?.getItem(FIRST_TOUCH_KEY) ?? '')
  } catch {
    stored = ''
  }
  if (stored) return stored
  if (current) {
    try {
      store?.setItem(FIRST_TOUCH_KEY, current)
    } catch {
      // Storage blocked or full: this page still attributes from its own URL.
    }
  }
  return current
}

/** Append params the way link_router tag() does: '?' when the URL has none, '&' otherwise. */
export function tagUrl(url: string, params: URLSearchParams): string {
  const qs = params.toString()
  if (!qs) return url
  // The query goes before any #fragment: after it, the params never reach the server.
  const hashAt = url.indexOf('#')
  const base = hashAt === -1 ? url : url.slice(0, hashAt)
  const hash = hashAt === -1 ? '' : url.slice(hashAt)
  return `${base}${base.includes('?') ? '&' : '?'}${qs}${hash}`
}
