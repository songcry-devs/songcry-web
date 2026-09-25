import { UTM_KEYS, cleanToken, outboundParams } from './attribution.ts'

/**
 * Store URLs and the device-aware "get the app" routing, in one pure module shared by the
 * client controls and the /get route handler (a route handler cannot import from a
 * 'use client' file, which is why lib/appstore.ts is replaced rather than extended).
 *
 * Mirrors songcry-artists src/lib/store-links.ts and src/app/get/route.ts (read 2026-09-25).
 * Not imported across repos on purpose: two deploys, two release cadences.
 */

export const APP_STORE_URL = 'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

/** Google Play listing for applicationId app.songcry. Live since 2026-09-24. */
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.songcry'

/** Where /get sends a computer: the home close band, which shows both store badges. */
export const DESKTOP_GET_PATH = '/#get-the-app'

export type Device = 'ios' | 'android' | 'desktop'

/**
 * Coarse device class from a user agent. iPadOS Safari reports itself as a Mac, so an iPad in
 * desktop mode is 'desktop' here and lands on both badges, the same trade-off artists.songcry.app
 * made. In-app browsers keep the platform word (Android, iPhone) in their user agent.
 */
export function deviceFromUA(ua: string): Device {
  if (/android/i.test(ua)) return 'android'
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios'
  return 'desktop'
}

/** Apple ct for a songcry.app placement. Same scheme as the live links: web-nav-desktop, web-thanks-fan. */
export function webCt(placement: string): string {
  return cleanToken(`web-${placement}`, 40)
}

/**
 * App Store URL with Apple's campaign params. Without the provider token Apple ignores ct, so
 * this returns the bare URL until NEXT_PUBLIC_APPLE_PROVIDER_TOKEN is set (it is set for
 * Production and Development, not Preview, so preview links are bare on purpose).
 */
export function appStoreUrl(
  ct: string,
  pt: string | undefined = process.env.NEXT_PUBLIC_APPLE_PROVIDER_TOKEN,
): string {
  const token = (pt ?? '').trim()
  const safe = cleanToken(ct, 40)
  if (!token || !safe) return APP_STORE_URL
  return `${APP_STORE_URL}?${new URLSearchParams({ pt: token, ct: safe, mt: '8' }).toString()}`
}

/** Play Store URL carrying the utm_* as Play's install referrer, the shape artists.songcry.app/get sends. */
export function playStoreUrl(params: URLSearchParams): string {
  const utm = new URLSearchParams()
  for (const k of UTM_KEYS) {
    const v = cleanToken(params.get(k), 60)
    if (v) utm.set(k, v)
  }
  const qs = utm.toString()
  return qs ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(qs)}` : PLAY_STORE_URL
}

/** The on-site href of a device-aware "get the app" control. */
export function getHref(placement: string, qs: string): string {
  const q = new URLSearchParams({ ct: webCt(placement) })
  outboundParams(placement, qs, UTM_KEYS).forEach((v, k) => q.set(k, v))
  return `/get?${q.toString()}`
}

/**
 * Where /get sends one request. The result is always apps.apple.com, play.google.com or our own
 * DESKTOP_GET_PATH: nothing in the query can choose a host.
 */
export function getAppTarget({ userAgent, search, pt }: { userAgent: string; search: string; pt?: string }): string {
  const q = new URLSearchParams(search)
  const device = deviceFromUA(userAgent)
  if (device === 'ios') return appStoreUrl(cleanToken(q.get('ct'), 40) || 'web-get', pt)
  if (device === 'android') return playStoreUrl(q)
  return DESKTOP_GET_PATH
}
