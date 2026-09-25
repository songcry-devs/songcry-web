import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FORM_KEYS,
  UTM_KEYS,
  campaignQs,
  channelFromUtm,
  cleanToken,
  outboundParams,
  pickCampaignParams,
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
