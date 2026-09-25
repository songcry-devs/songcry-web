import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  APP_STORE_URL,
  DESKTOP_GET_PATH,
  PLAY_STORE_URL,
  appStoreUrl,
  deviceFromUA,
  getAppTarget,
  getHref,
  playStoreUrl,
  webCt,
} from '../lib/store-links.ts'

const UA = {
  iphoneSafari:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
  iphoneInstagram:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22F76 Instagram 390.0.0.28.85 (iPhone15,3; iOS 18_5; en_US; en; scale=3.00; 1290x2796; 758233370)',
  ipadDesktopMode:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15',
  androidChrome:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
  androidFacebook:
    'Mozilla/5.0 (Linux; Android 14; SM-S918U Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/483.0.0.53.109;]',
  windowsChrome:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  tiktokIphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_2023808 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/en Region/US isDarkMode/0 InHouse/0 WKWebView/1',
  tiktokAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.119 Mobile Safari/537.36 musical_ly_2023808 JsSdk/2.0 NetType/WIFI Channel/googleplay AppName/musical_ly app_version/32.5.3 ByteLocale/en',
  // Real iPad UA, NOT desktop mode. iPadOS Safari with Request Desktop Website off still says iPad.
  ipadRealUA:
    'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  // Android tablet with Desktop site requested. Chrome sends a bare Linux desktop UA with no
  // Android or Mobile token, the same trade-off as the iPad-in-desktop-mode case above.
  androidTabletDesktopMode:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
}
const PT = '128612241' // the live provider token, visible in every live App Store link

test('deviceFromUA: phones, in-app browsers, iPad in desktop mode, computers', () => {
  assert.equal(deviceFromUA(UA.iphoneSafari), 'ios')
  assert.equal(deviceFromUA(UA.iphoneInstagram), 'ios')
  assert.equal(deviceFromUA(UA.androidChrome), 'android')
  assert.equal(deviceFromUA(UA.androidFacebook), 'android')
  // iPadOS Safari says Macintosh. Same rule as artists.songcry.app/get: it lands on both badges.
  assert.equal(deviceFromUA(UA.ipadDesktopMode), 'desktop')
  assert.equal(deviceFromUA(UA.windowsChrome), 'desktop')
  assert.equal(deviceFromUA(''), 'desktop')
  // TikTok's in-app browser keeps the underlying platform token on both OSes.
  assert.equal(deviceFromUA(UA.tiktokIphone), 'ios')
  assert.equal(deviceFromUA(UA.tiktokAndroid), 'android')
  // A real iPad UA (not desktop mode) still says iPad, so it lands on the App Store, not both badges.
  assert.equal(deviceFromUA(UA.ipadRealUA), 'ios')
  // An Android tablet in desktop mode drops the Android token entirely, same as the iPad case.
  assert.equal(deviceFromUA(UA.androidTabletDesktopMode), 'desktop')
})

test('webCt keeps the live ct scheme', () => {
  assert.equal(webCt('nav-desktop'), 'web-nav-desktop')
  assert.equal(webCt('thanks-fan'), 'web-thanks-fan')
})

test('appStoreUrl is bare without a provider token and tagged with one', () => {
  assert.equal(appStoreUrl('web-nav-desktop', ''), APP_STORE_URL)
  assert.equal(appStoreUrl('web-nav-desktop', PT), `${APP_STORE_URL}?pt=${PT}&ct=web-nav-desktop&mt=8`)
})

test('playStoreUrl carries utm_* as the install referrer, cleaned', () => {
  assert.equal(playStoreUrl(new URLSearchParams()), PLAY_STORE_URL)
  assert.equal(
    playStoreUrl(new URLSearchParams('utm_source=web&utm_content=nav-desktop&gclid=g')),
    `${PLAY_STORE_URL}&referrer=utm_source%3Dweb%26utm_content%3Dnav-desktop`,
  )
})

test('getHref builds the on-site device-aware link', () => {
  assert.equal(getHref('nav-desktop', ''), '/get?ct=web-nav-desktop&utm_source=web&utm_content=nav-desktop')
  assert.equal(
    getHref('thanks-fan', 'utm_source=meta&utm_medium=cpc&utm_campaign=fall&fbclid=f1'),
    '/get?ct=web-thanks-fan&utm_source=meta&utm_medium=cpc&utm_campaign=fall',
  )
})

test('getAppTarget routes each device', () => {
  const search = '?ct=web-nav-desktop&utm_source=web&utm_content=nav-desktop'
  assert.equal(
    getAppTarget({ userAgent: UA.iphoneSafari, search, pt: PT }),
    `${APP_STORE_URL}?pt=${PT}&ct=web-nav-desktop&mt=8`,
  )
  assert.equal(getAppTarget({ userAgent: UA.iphoneSafari, search: '', pt: PT }), `${APP_STORE_URL}?pt=${PT}&ct=web-get&mt=8`)
  assert.equal(getAppTarget({ userAgent: UA.iphoneSafari, search, pt: '' }), APP_STORE_URL)
  assert.equal(
    getAppTarget({ userAgent: UA.androidFacebook, search, pt: PT }),
    `${PLAY_STORE_URL}&referrer=utm_source%3Dweb%26utm_content%3Dnav-desktop`,
  )
  assert.equal(getAppTarget({ userAgent: UA.androidChrome, search: '', pt: PT }), PLAY_STORE_URL)
  assert.equal(getAppTarget({ userAgent: UA.windowsChrome, search, pt: PT }), DESKTOP_GET_PATH)
  assert.equal(getAppTarget({ userAgent: UA.ipadDesktopMode, search, pt: PT }), DESKTOP_GET_PATH)
  assert.equal(
    getAppTarget({ userAgent: UA.tiktokIphone, search, pt: PT }),
    `${APP_STORE_URL}?pt=${PT}&ct=web-nav-desktop&mt=8`,
  )
  assert.equal(
    getAppTarget({ userAgent: UA.tiktokAndroid, search, pt: PT }),
    `${PLAY_STORE_URL}&referrer=utm_source%3Dweb%26utm_content%3Dnav-desktop`,
  )
  assert.equal(
    getAppTarget({ userAgent: UA.ipadRealUA, search, pt: PT }),
    `${APP_STORE_URL}?pt=${PT}&ct=web-nav-desktop&mt=8`,
  )
  assert.equal(getAppTarget({ userAgent: UA.androidTabletDesktopMode, search, pt: PT }), DESKTOP_GET_PATH)
})

test('getAppTarget never takes a host from the query', () => {
  const search =
    '?ct=%3Cscript%3Ealert(1)%3C%2Fscript%3E&utm_source=javascript%3Aalert(1)&utm_medium=https%3A%2F%2Fevil.example'
  const ios = getAppTarget({ userAgent: UA.iphoneSafari, search, pt: PT })
  assert.equal(ios, `${APP_STORE_URL}?pt=${PT}&ct=script-alert-1-script&mt=8`)
  assert.equal(new URL(ios).host, 'apps.apple.com')
  const android = getAppTarget({ userAgent: UA.androidChrome, search, pt: PT })
  assert.equal(new URL(android).host, 'play.google.com')
  assert.equal(
    new URL(android).searchParams.get('referrer'),
    'utm_source=javascript-alert-1&utm_medium=https-evil-example',
  )
  assert.equal(getAppTarget({ userAgent: UA.windowsChrome, search, pt: PT }), DESKTOP_GET_PATH)
})
