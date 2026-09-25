import { deviceFromUA } from './store-links.ts'
import { isProductionHost } from './environment.ts'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/** Google Ads "store click" conversion. The same label the nav has fired since 2026-08-04. */
export const STORE_CLICK_CONVERSION = 'AW-18264662044/9e3nCICO5cccEJzAooVE'

/**
 * True only for the live site's own hosts. PR 1 ships before PR 3's server-side production
 * gate, and TJ taps these controls on the Vercel preview during review. A preview tap, a
 * localhost tap, or a lookalike domain must never record a real ad conversion. Exact match
 * only: a lookalike like songcry.app.evil.com is a DIFFERENT host that merely contains our
 * name, so it must fail this check, not pass it.
 *
 * Delegates to lib/environment.ts's isProductionHost so this repo has one definition of "the
 * production host", not two that could drift apart.
 */
export function isLiveHost(host: string): boolean {
  return isProductionHost(host)
}

/** The page's own host, or '' outside a browser, so a missing `location` never throws. */
function currentHost(): string {
  return typeof location === 'undefined' ? '' : location.hostname
}

/**
 * Calls a possibly-undefined tag function and never lets it break the caller. Each tag gets its
 * own guard, so one platform's tag being missing, blocked, or throwing (a blocker stub commonly
 * throws rather than being merely undefined) can never suppress or break the other platform's
 * call. Optional chaining alone only covers "undefined"; it does nothing once a stub is defined
 * and throws, which is why this exists instead.
 */
function safeCall(fn: ((...args: unknown[]) => void) | undefined, ...args: unknown[]) {
  if (!fn) return
  try {
    fn(...args)
  } catch {
    // A blocked or broken tag must never break the tap it is attached to, or the other tag.
  }
}

/**
 * A tap on a store link, told to both ad platforms (they share no signal). The rule, the same on
 * songcry.app and artists.songcry.app (coordinator, 2026-09-25):
 *   Google Ads  both stores fire this ONE store-click conversion, so Ads optimises on one signal.
 *   Meta        App Store fires AppStoreClick; Google Play fires PlayStoreClick, the event
 *               artists.songcry.app already fires live, so its reporting stays continuous.
 *   placement   a Google Play tap carries placement-play.
 * This is intent, not an install: no store reports an install back to a web pixel.
 * Each platform is called through safeCall, so a blocked, missing, or throwing tag can never
 * break the link and can never stop the other platform's call from firing.
 *
 * `host` defaults to the page's own host and is only ever overridden by a test. Never send a
 * real ad conversion off the live site: a Vercel preview, localhost, or a lookalike domain
 * sends nothing to either platform.
 */
export function trackStoreClick(
  store: 'app-store' | 'google-play',
  placement: string,
  host: string = currentHost(),
) {
  if (!isLiveHost(host)) return
  safeCall(window.gtag, 'event', 'conversion', { send_to: STORE_CLICK_CONVERSION })
  if (store === 'google-play') {
    safeCall(window.fbq, 'trackCustom', 'PlayStoreClick', { placement: `${placement}-play` })
  } else {
    safeCall(window.fbq, 'trackCustom', 'AppStoreClick', { placement })
  }
}

/**
 * A tap on a device-aware control. Classified with the same rule the /get route uses, so the
 * event names the store this device is actually sent to. A computer is sent to the badges and
 * reports nothing here: its badge tap reports instead, so a click is never counted twice.
 *
 * `host` defaults to the page's own host, same live-site gate as trackStoreClick.
 */
export function trackGetAppClick(placement: string, host: string = currentHost()) {
  const device = deviceFromUA(navigator.userAgent)
  if (device === 'ios') trackStoreClick('app-store', placement, host)
  else if (device === 'android') trackStoreClick('google-play', placement, host)
}
