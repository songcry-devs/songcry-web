import { test } from 'node:test'
import assert from 'node:assert/strict'
import { qrGetUrl } from '../lib/store-links.ts'
import { QUIET_ZONE_MODULES, qrModuleCount, qrSvg } from '../lib/qr.ts'

test('qrGetUrl builds the exact absolute URL for each smart-QR placement', () => {
  assert.equal(
    qrGetUrl('nav'),
    'https://songcry.app/get?ct=web-qr-nav&utm_source=web&utm_content=qr-nav',
  )
  assert.equal(
    qrGetUrl('artist-hero'),
    'https://songcry.app/get?ct=web-qr-artist-hero&utm_source=web&utm_content=qr-artist-hero',
  )
  assert.equal(
    qrGetUrl('home-close'),
    'https://songcry.app/get?ct=web-qr-home-close&utm_source=web&utm_content=qr-home-close',
  )
})

test('qrGetUrl caps Apple ct at 40 characters, same rule as every other placement', () => {
  const url = qrGetUrl('x'.repeat(60))
  const ct = new URL(url).searchParams.get('ct')
  assert.ok(ct, 'ct must be present')
  assert.ok(ct!.length <= 40, `ct was ${ct!.length} characters: ${ct}`)
  assert.equal(ct, `web-qr-${'x'.repeat(33)}`)
  // utm_content is not Apple's field, so it keeps its own 60-character cap unchanged.
  assert.equal(new URL(url).searchParams.get('utm_content'), `qr-${'x'.repeat(57)}`)
})

test('qrGetUrl carries no campaign params of its own: a QR is scanned on a second device', () => {
  const url = new URL(qrGetUrl('nav'))
  assert.deepEqual([...url.searchParams.keys()].sort(), ['ct', 'utm_content', 'utm_source'])
  assert.equal(url.searchParams.get('utm_source'), 'web')
})

test('qrSvg encodes the given text: same value produces the same code every time', () => {
  const value = qrGetUrl('nav')
  const svg = qrSvg(value)
  assert.match(svg, /^<svg /)
  assert.match(svg, /viewBox="0 0 (\d+) \1"/, 'the code must be square')
  assert.equal(svg, qrSvg(value), 'the cached render must be byte-identical')
})

test('qrSvg is dark modules on a white background', () => {
  const svg = qrSvg(qrGetUrl('artist-hero'))
  assert.match(svg, /fill="white"/)
  assert.match(svg, /fill="black"/)
})

test('qrSvg carries a quiet zone of at least 2 modules on every side, at any cell size', () => {
  const value = qrGetUrl('home-close')
  const modules = qrModuleCount(value)
  assert.ok(QUIET_ZONE_MODULES >= 2, 'the brief requires at least 2 modules of quiet zone')
  for (const cellSize of [1, 4, 8]) {
    const svg = qrSvg(value, { cellSize })
    const [, size] = /viewBox="0 0 (\d+) \d+"/.exec(svg) ?? []
    assert.equal(Number(size), (modules + QUIET_ZONE_MODULES * 2) * cellSize)
  }
})

test('qrSvg is scalable: the outer svg element carries no fixed width/height, so CSS sizes it', () => {
  const svg = qrSvg(qrGetUrl('nav'))
  const openTag = svg.slice(0, svg.indexOf('>') + 1)
  assert.ok(!/\swidth=/.test(openTag), `svg tag must not carry width: ${openTag}`)
  assert.ok(!/\sheight=/.test(openTag), `svg tag must not carry height: ${openTag}`)
  assert.match(openTag, /viewBox="0 0 \d+ \d+"/)
})

test('qrSvg differs for different placements: each QR encodes its own URL, not a shared one', () => {
  const nav = qrSvg(qrGetUrl('nav'))
  const heroSvg = qrSvg(qrGetUrl('artist-hero'))
  assert.notEqual(nav, heroSvg)
})
