import { afterEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { STORE_CLICK_CONVERSION, isLiveHost, trackGetAppClick, trackStoreClick } from '../lib/track.ts'

type Call = unknown[]
const g = globalThis as unknown as { window?: unknown }
const realNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')

/** A fake window whose gtag and fbq record their calls instead of sending anything. */
function recordTags(): Call[] {
  const calls: Call[] = []
  g.window = {
    gtag: (...args: unknown[]) => calls.push(['gtag', ...args]),
    fbq: (...args: unknown[]) => calls.push(['fbq', ...args]),
  }
  return calls
}

function setUserAgent(userAgent: string) {
  Object.defineProperty(globalThis, 'navigator', { value: { userAgent }, configurable: true })
}

afterEach(() => {
  delete g.window
  if (realNavigator) Object.defineProperty(globalThis, 'navigator', realNavigator)
})

const LIVE = 'songcry.app'
const GADS: Call = ['gtag', 'event', 'conversion', { send_to: STORE_CLICK_CONVERSION }]

test('isLiveHost is true only for the apex and www host', () => {
  assert.equal(isLiveHost('songcry.app'), true)
  assert.equal(isLiveHost('www.songcry.app'), true)
  assert.equal(isLiveHost('songcry-web-git-x.vercel.app'), false)
  assert.equal(isLiveHost('localhost'), false)
  assert.equal(isLiveHost('songcry.app.evil.com'), false)
  assert.equal(isLiveHost(''), false)
})

test('an App Store tap on the live host fires the store-click conversion and Meta AppStoreClick', () => {
  const calls = recordTags()
  trackStoreClick('app-store', 'home-close', LIVE)
  assert.deepEqual(calls, [GADS, ['fbq', 'trackCustom', 'AppStoreClick', { placement: 'home-close' }]])
})

test('a Google Play tap on the live host fires the SAME conversion label and Meta PlayStoreClick with a -play placement', () => {
  const calls = recordTags()
  trackStoreClick('google-play', 'home-close', LIVE)
  assert.deepEqual(calls, [GADS, ['fbq', 'trackCustom', 'PlayStoreClick', { placement: 'home-close-play' }]])
})

test('a tap on either live host, apex or www, fires', () => {
  for (const host of ['songcry.app', 'www.songcry.app']) {
    const calls = recordTags()
    trackStoreClick('app-store', 'home-close', host)
    assert.deepEqual(
      calls,
      [GADS, ['fbq', 'trackCustom', 'AppStoreClick', { placement: 'home-close' }]],
      `host ${host}`,
    )
  }
})

test('a tap off the live host (a Vercel preview, localhost, or a lookalike domain) sends nothing', () => {
  for (const host of ['songcry-web-git-x.vercel.app', 'localhost', 'songcry.app.evil.com']) {
    const calls = recordTags()
    trackStoreClick('app-store', 'home-close', host)
    assert.deepEqual(calls, [], `host ${host} must send nothing`)
  }
})

test('with no host argument at all, outside a browser, a tap sends nothing and never throws', () => {
  const calls = recordTags()
  assert.doesNotThrow(() => trackStoreClick('google-play', 'home-close'))
  assert.deepEqual(calls, [])
})

test('a device-aware tap on the live host reports the store this device is sent to, and nothing on a computer', () => {
  let calls = recordTags()
  setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36')
  trackGetAppClick('nav-desktop', LIVE)
  assert.deepEqual(calls, [GADS, ['fbq', 'trackCustom', 'PlayStoreClick', { placement: 'nav-desktop-play' }]])

  calls = recordTags()
  setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15')
  trackGetAppClick('nav-desktop', LIVE)
  assert.deepEqual(calls, [GADS, ['fbq', 'trackCustom', 'AppStoreClick', { placement: 'nav-desktop' }]])

  calls = recordTags()
  setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
  trackGetAppClick('nav-desktop', LIVE)
  assert.deepEqual(calls, [])
})

test('a device-aware tap off the live host sends nothing, even on a phone', () => {
  const calls = recordTags()
  setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15')
  trackGetAppClick('nav-desktop', 'songcry-web-git-x.vercel.app')
  assert.deepEqual(calls, [])
})

test('blocked tags never break a tap, on the live host', () => {
  g.window = {}
  assert.doesNotThrow(() => trackStoreClick('google-play', 'home-close', LIVE))
})

test('a gtag that throws (a blocker stub, not just a missing tag) does not stop fbq from firing', () => {
  const calls: Call[] = []
  g.window = {
    gtag: () => {
      throw new Error('blocked')
    },
    fbq: (...args: unknown[]) => calls.push(['fbq', ...args]),
  }
  assert.doesNotThrow(() => trackStoreClick('app-store', 'home-close', LIVE))
  assert.deepEqual(calls, [['fbq', 'trackCustom', 'AppStoreClick', { placement: 'home-close' }]])
})

test('an fbq that throws does not stop gtag from firing', () => {
  const calls: Call[] = []
  g.window = {
    gtag: (...args: unknown[]) => calls.push(['gtag', ...args]),
    fbq: () => {
      throw new Error('blocked')
    },
  }
  assert.doesNotThrow(() => trackStoreClick('app-store', 'home-close', LIVE))
  assert.deepEqual(calls, [GADS])
})
