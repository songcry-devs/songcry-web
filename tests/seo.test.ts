import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
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

test('the sitemap lists every public page, delete-account included, with no fake lastmod', () => {
  const require = createRequire(import.meta.url)
  const sitemap = require('../app/sitemap.ts').default
  const entries = sitemap()
  const urls = entries.map((e: { url: string }) => e.url)
  assert.ok(urls.includes('https://songcry.app/legal/delete-account'))
  assert.equal(urls.length, 10)
  for (const e of entries) assert.equal(e.lastModified, undefined)
})

test('guessable legal URLs redirect to the real pages', async () => {
  const require = createRequire(import.meta.url)
  const nextConfig = require('../next.config.js') as { redirects: () => Promise<Array<{ source: string; destination: string; statusCode?: number }>> }
  const redirects = await nextConfig.redirects()
  const to = (source: string) => redirects.find((r: { source: string }) => r.source === source)
  assert.deepEqual([to('/privacy')?.destination, to('/privacy')?.statusCode], ['/legal/privacy', 301])
  assert.deepEqual([to('/terms')?.destination, to('/terms')?.statusCode], ['/legal/terms-of-use', 301])
  assert.deepEqual([to('/legal')?.destination, to('/legal')?.statusCode], ['/legal/terms-of-use', 301])
})

test('root path sets both canonical and openGraph url', () => {
  const m = pageMetadata({ title: 'x', path: '/' })
  assert.equal(m.alternates?.canonical, '/')
  assert.equal(m.openGraph?.url, '/')
})
