import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FIRST_TOUCH_KEY,
  FORM_KEYS,
  UTM_KEYS,
  campaignQs,
  channelFromUtm,
  cleanToken,
  outboundParams,
  pickCampaignParams,
  readFirstTouch,
  sourcePageFromReferer,
  tagUrl,
} from '../lib/attribution.ts'

// Copied from songcry-outreach/bin/attribution.py on 2026-09-25. If that file gains a key,
// add it here; if a value we mint is not in these sets, the test must fail.
const SOURCES = new Set([
  'outreach', 'x', 'instagram', 'facebook', 'tiktok', 'youtube', 'google', 'meta',
  'bounty', 'founder', 'app', 'web', 'deeplink',
])
const MEDIUMS = new Set(['email', 'dm', 'reply', 'post', 'bio', 'cpc', 'referral'])

test('cleanToken lowercases, keeps a-z 0-9 and hyphen, collapses, trims and caps', () => {
  assert.equal(cleanToken('Web Nav__Desktop', 40), 'web-nav-desktop')
  assert.equal(cleanToken('--x--', 40), 'x')
  assert.equal(cleanToken(null, 40), '')
  assert.equal(cleanToken(undefined, 40), '')
  assert.equal(cleanToken('abcdef', 3), 'abc')
})

test('pickCampaignParams keeps only the form whitelist and drops empty values', () => {
  assert.deepEqual(pickCampaignParams('utm_source=meta&utm_medium=cpc&x=1&gclid=&fbclid=f1'), {
    utm_source: 'meta',
    utm_medium: 'cpc',
    fbclid: 'f1',
  })
  assert.deepEqual(pickCampaignParams('?utm_campaign=fall'), { utm_campaign: 'fall' })
  assert.deepEqual(pickCampaignParams(''), {})
})

test('campaignQs re-serialises only whitelisted params in FORM_KEYS order', () => {
  assert.equal(campaignQs('a=1&gclid=g&utm_source=x'), 'utm_source=x&gclid=g')
  assert.equal(campaignQs('a=1'), '')
})

test('channelFromUtm collapses to one word', () => {
  assert.equal(channelFromUtm({ utm_source: 'instagram' }), 'instagram')
  assert.equal(channelFromUtm({ gclid: 'g' }), 'google')
  assert.equal(channelFromUtm({ fbclid: 'f' }), 'meta')
  assert.equal(channelFromUtm({}), 'web')
  assert.equal(channelFromUtm({ utm_source: 'a'.repeat(80) }).length, 50)
})

test('outboundParams tags a visitor with no campaign as web plus the placement', () => {
  assert.equal(outboundParams('nav-desktop', '', UTM_KEYS).toString(), 'utm_source=web&utm_content=nav-desktop')
})

test('outboundParams carries a visitor campaign, limited to the requested keys', () => {
  const qs = 'utm_source=meta&utm_medium=cpc&utm_campaign=fall&fbclid=f1&utm_term=t'
  assert.equal(outboundParams('nav-desktop', qs, UTM_KEYS).toString(), 'utm_source=meta&utm_medium=cpc&utm_campaign=fall')
  assert.equal(
    outboundParams('nav-desktop', qs, FORM_KEYS).toString(),
    'utm_source=meta&utm_medium=cpc&utm_campaign=fall&utm_term=t&fbclid=f1',
  )
})

test('outboundParams names a click-id-only visitor google or meta, medium cpc', () => {
  assert.equal(outboundParams('x', 'gclid=g1', UTM_KEYS).toString(), 'utm_source=google&utm_medium=cpc')
  assert.equal(outboundParams('x', 'gclid=g1', FORM_KEYS).toString(), 'utm_source=google&utm_medium=cpc&gclid=g1')
  assert.equal(outboundParams('x', 'fbclid=f1', UTM_KEYS).toString(), 'utm_source=meta&utm_medium=cpc')
})

test('every source and medium we mint ourselves is in the attribution.py vocabulary', () => {
  for (const qs of ['', 'gclid=g', 'fbclid=f']) {
    const p = outboundParams('any-placement', qs, FORM_KEYS)
    assert.ok(SOURCES.has(p.get('utm_source') ?? ''), `source ${p.get('utm_source')}`)
    const medium = p.get('utm_medium')
    if (medium) assert.ok(MEDIUMS.has(medium), `medium ${medium}`)
  }
})

function memoryStore(initial: Record<string, string> = {}) {
  const data = { ...initial }
  return {
    data,
    getItem: (k: string) => (k in data ? data[k] : null),
    setItem: (k: string, v: string) => { data[k] = v },
  }
}

test('readFirstTouch stores the first campaign of the session and returns it', () => {
  const s = memoryStore()
  assert.equal(readFirstTouch(s, '?utm_source=meta&utm_medium=cpc&x=1'), 'utm_source=meta&utm_medium=cpc')
  assert.equal(s.data[FIRST_TOUCH_KEY], 'utm_source=meta&utm_medium=cpc')
})

test('readFirstTouch keeps the first touch across internal pages and later campaigns', () => {
  const s = memoryStore({ [FIRST_TOUCH_KEY]: 'utm_source=meta&utm_medium=cpc' })
  assert.equal(readFirstTouch(s, ''), 'utm_source=meta&utm_medium=cpc')
  assert.equal(readFirstTouch(s, '?utm_source=google&utm_medium=cpc'), 'utm_source=meta&utm_medium=cpc')
  assert.equal(s.data[FIRST_TOUCH_KEY], 'utm_source=meta&utm_medium=cpc')
})

test('readFirstTouch stores nothing for a visit with no campaign', () => {
  const s = memoryStore()
  assert.equal(readFirstTouch(s, '?ref=x'), '')
  assert.equal(FIRST_TOUCH_KEY in s.data, false)
})

test('readFirstTouch ignores a stored value that is not a campaign', () => {
  const s = memoryStore({ [FIRST_TOUCH_KEY]: 'junk=1' })
  assert.equal(readFirstTouch(s, '?utm_source=x'), 'utm_source=x')
})

test('readFirstTouch survives a storage that throws, and no storage at all', () => {
  const throwing = {
    getItem: () => { throw new Error('SecurityError') },
    setItem: () => { throw new Error('QuotaExceededError') },
  }
  assert.equal(readFirstTouch(throwing, '?utm_source=x&gclid=g'), 'utm_source=x&gclid=g')
  assert.equal(readFirstTouch(null, '?utm_source=x'), 'utm_source=x')
})

test('tagUrl appends like link_router tag(): ? first, & after', () => {
  const p = new URLSearchParams('utm_source=web&utm_content=footer-for-artists')
  assert.equal(tagUrl('https://artists.songcry.app', p), 'https://artists.songcry.app?utm_source=web&utm_content=footer-for-artists')
  assert.equal(tagUrl('https://artists.songcry.app/?a=1', p), 'https://artists.songcry.app/?a=1&utm_source=web&utm_content=footer-for-artists')
  assert.equal(tagUrl('https://artists.songcry.app', new URLSearchParams()), 'https://artists.songcry.app')
})

test('sourcePageFromReferer accepts songcry.app hosts only', () => {
  assert.equal(sourcePageFromReferer('https://songcry.app/'), 'web:root')
  assert.equal(sourcePageFromReferer('https://songcry.app/join'), 'web:join')
  assert.equal(sourcePageFromReferer('https://www.songcry.app/artist/'), 'web:artist')
  // endsWith('songcry.app') used to accept this lookalike.
  assert.equal(sourcePageFromReferer('https://evilsongcry.app/x'), 'web:join')
  // Previews no longer write, so a preview host is never a real source page.
  assert.equal(sourcePageFromReferer('https://songcry-web-git-x-tjsongcrys-projects.vercel.app/join'), 'web:join')
  assert.equal(sourcePageFromReferer(null), 'web:join')
  assert.equal(sourcePageFromReferer('not a url'), 'web:join')
})
