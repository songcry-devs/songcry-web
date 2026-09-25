import { test } from 'node:test'
import assert from 'node:assert/strict'
import { OG_IMAGE, pageMetadata } from '../lib/seo.ts'

test('pageMetadata gives a page its own canonical, share card and twitter card', () => {
  const m = pageMetadata({ title: 'For Artists | Songcry', description: 'd', path: '/artist' })
  assert.equal(m.title, 'For Artists | Songcry')
  assert.deepEqual(m.alternates, { canonical: '/artist' })
  assert.equal(m.openGraph?.url, '/artist')
  assert.equal(m.openGraph?.title, 'For Artists | Songcry')
  assert.deepEqual(m.openGraph?.images, [OG_IMAGE])
  const tw = m.twitter as { card?: string; title?: string; images?: unknown }
  assert.equal(tw.card, 'summary_large_image')
  assert.equal(tw.title, 'For Artists | Songcry')
  assert.deepEqual(tw.images, [OG_IMAGE.url])
  assert.equal(m.robots, undefined)
})

test('noindex pages get robots and no canonical', () => {
  const m = pageMetadata({ title: 't', description: 'd', path: '/join/thanks-fan', noindex: true })
  assert.deepEqual(m.robots, { index: false, follow: false })
  assert.equal(m.alternates, undefined)
})

test('a page with no path (the 404) claims no URL', () => {
  const m = pageMetadata({ title: 't', description: 'd' })
  assert.equal(m.alternates, undefined)
  assert.equal(m.openGraph?.url, undefined)
})
