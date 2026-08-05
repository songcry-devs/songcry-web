'use client'

/**
 * The App Store link and its click tracking, in ONE place.
 *
 * The URL was previously duplicated across three components (nav, home hero, artist hero).
 * Duplication is how a link gets tracking on two buttons and not the third, and the resulting
 * numbers look real while under-counting — the worst kind of measurement bug because nothing
 * errors. One export, one tracked handler, every download button.
 */
export const APP_STORE_URL =
  'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Fires on App Store click, to BOTH ad platforms — they share no signal, so each needs telling.
 *
 * This is intent, not installation: Apple reports nothing back to a web pixel, so we can never
 * see whether the install happened or who the person was. That is precisely why the request
 * form matters — it gives us a person we can follow through to a published song. Track both;
 * the click optimises ad delivery, the form gives attribution.
 *
 * Optional chaining throughout so a blocked or slow tag can never break navigation, and the
 * link opens in a new tab so neither call delays the user.
 */
export function trackAppStoreClick(placement: string) {
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-18264662044/9e3nCICO5cccEJzAooVE',
  })
  window.fbq?.('trackCustom', 'AppStoreClick', { placement })
}
