#!/usr/bin/env node
/**
 * Craft checker. Audits a rendered page against the measured Apple bar in
 * docs/research/2026-08-27-high-end-web-craft-teardown.md.
 *
 * Written after Jack's critique that our pages read as recycled modules. The
 * teardown alone would have been a file nobody opened; this makes the standard
 * runnable, so a regression is a failed check rather than a matter of taste.
 *
 * Usage:  node scripts/check-craft.mjs <url> [<url> ...]
 *
 * It reports, it does not fail the build. Some findings are judgement calls and
 * a page can have a good reason. Read them, do not silence them.
 */
import { chromium } from 'playwright'

const BRAND = { r: 248, g: 25, b: 192 }

// Measured off Apple: line-height tightens monotonically as size grows.
function ladder(size) {
  if (size >= 80) return [0.98, 1.06]
  if (size >= 48) return [1.02, 1.12]
  if (size >= 28) return [1.06, 1.2]
  if (size >= 20) return [1.1, 1.4]
  return [1.2, 1.7]
}

const parseRGB = (s) => {
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  return m ? { r: +m[1], g: +m[2], b: +m[3] } : null
}
const nearBrand = (c) =>
  c && Math.abs(c.r - BRAND.r) < 46 && Math.abs(c.g - BRAND.g) < 60 && Math.abs(c.b - BRAND.b) < 46

/**
 * Chroma, 0 to 255. An achromatic colour (any grey, white, black) has chroma 0.
 *
 * This is the difference between the rule and a false positive. The rule is
 * "emphasis comes from a VALUE step, never a hue", so a grey line above a white
 * line is CORRECT and must not be flagged, while a pink line inside a white
 * heading is the defect. Comparing colour strings cannot tell those apart: the
 * first version of this checker flagged concept E's grey-to-white ramp eleven
 * times, and a checker that cries wolf gets ignored.
 */
const chroma = (c) => (c ? Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) : 0)
const CHROMATIC = 26

const urls = process.argv.slice(2)
if (!urls.length) {
  console.error('usage: node scripts/check-craft.mjs <url> [<url> ...]')
  process.exit(1)
}

const browser = await chromium.launch()
let totalFindings = 0

for (const url of urls) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push(String(e)))

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  // Slowly, so every whileInView reveal actually fires and settles.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 250) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 130))
    }
  })
  await page.waitForTimeout(1400)

  const data = await page.evaluate(() => {
    const px = (v) => Math.round(parseFloat(v))
    const headings = [...document.querySelectorAll('main h1, main h2, main h3')]
    const heads = headings.map((e) => {
      const c = getComputedStyle(e)
      return {
        size: px(c.fontSize),
        weight: c.fontWeight,
        lh: +(parseFloat(c.lineHeight) / parseFloat(c.fontSize)).toFixed(3),
        text: (e.textContent || '').trim().slice(0, 40),
        cls: e.className.toString().slice(0, 40),
      }
    })

    // accent applied to text
    const accentText = []
    document.querySelectorAll('main *').forEach((e) => {
      const own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
      if (!own) return
      accentText.push({
        color: getComputedStyle(e).color,
        text: (e.textContent || '').trim().slice(0, 44),
        cls: e.className.toString().slice(0, 40),
      })
    })

    // two-tone headings and gradient text
    // Display text = headings AND blockquotes. The pink line hid in a blockquote,
    // which is exactly why the first detector missed it.
    let twoTone = [], gradient = 0
    const display = [...headings, ...document.querySelectorAll('main blockquote')]
    display.forEach((h) => {
      const base = getComputedStyle(h).color
      h.querySelectorAll('span,em,strong,b,i').forEach((c) => {
        const cs = getComputedStyle(c)
        if (cs.color !== base && cs.color !== 'rgba(0, 0, 0, 0)' && (c.textContent || '').trim())
          twoTone.push({ color: cs.color, parent: base, text: (c.textContent || '').trim().slice(0, 34) })
        if (cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') gradient++
      })
      if (getComputedStyle(h).backgroundClip === 'text') gradient++
    })

    const sizes = [...new Set(heads.map((h) => h.size))].sort((a, b) => b - a)

    // section gaps and grounds
    const secs = [...document.querySelectorAll('main > section, main > div > section')]
    const gaps = []
    for (let i = 1; i < secs.length; i++) {
      const a = secs[i - 1].getBoundingClientRect(), b = secs[i].getBoundingClientRect()
      gaps.push({ gap: Math.round(b.top - a.bottom), after: secs[i - 1].getAttribute('aria-label') || '?' })
    }
    const grounds = secs.map((s) => getComputedStyle(s).backgroundColor)

    return {
      heads, accentText, twoTone, gradient, sizes, gaps, grounds,
      sectionCount: secs.length,
      pageHeight: document.body.scrollHeight,
      videos: document.querySelectorAll('video').length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      unsettled: [...document.querySelectorAll('main *')].filter((e) => {
        const o = +getComputedStyle(e).opacity
        return o > 0 && o < 0.92 && (e.textContent || '').trim().length > 1
      }).length,
    }
  })

  const f = []

  data.accentText.filter((t) => nearBrand(parseRGB(t.color))).forEach((t) =>
    f.push(`ACCENT ON TEXT   "${t.text}" (${t.cls}) is set in the brand colour. Emphasis is a VALUE step, not a hue.`))
  const hueShifts = data.twoTone.filter((t) => {
    const c = parseRGB(t.color), pc = parseRGB(t.parent)
    // A value step down a neutral ramp is the CORRECT way to emphasise. Only a
    // hue introduced against a neutral parent is the defect.
    return chroma(c) >= CHROMATIC && chroma(pc) < CHROMATIC
  })
  const seenTT = new Set()
  hueShifts.forEach((t) => {
    const k = t.text + t.color
    if (seenTT.has(k)) return
    seenTT.add(k)
    f.push(`TWO-TONE DISPLAY "${t.text}" introduces a hue (${t.color}) inside neutral display text. Apple Music ships zero of these.`)
  })
  if (data.gradient) f.push(`GRADIENT TEXT    ${data.gradient} element(s) use background-clip text.`)

  data.heads.forEach((h) => {
    const [lo, hi] = ladder(h.size)
    if (h.lh < lo || h.lh > hi)
      f.push(`LINE-HEIGHT      ${h.size}px heading at ${h.lh} (want ${lo} to ${hi}) - "${h.text}"`)
    if (+h.weight >= 700)
      f.push(`WEIGHT           ${h.size}px heading at ${h.weight}. Apple headings are 600 - "${h.text}"`)
  })

  for (let i = 1; i < data.sizes.length; i++) {
    const big = data.sizes[i - 1], small = data.sizes[i]
    if (big / small < 1.15)
      f.push(`NEAR-DUPLICATE   ${big}px and ${small}px are ${((big / small - 1) * 100).toFixed(0)}% apart. Not perceivable as hierarchy.`)
  }
  if (data.sizes.length > 6)
    f.push(`SCALE SPRAWL     ${data.sizes.length} heading sizes (${data.sizes.join('/')}). Aim for 6 or fewer.`)

  data.gaps.filter((g) => g.gap > 2).forEach((g) =>
    f.push(`SECTION GAP      ${g.gap}px after "${g.after}". Apple measures 0. Each section owns its own space.`))

  const distinctGrounds = new Set(data.grounds.filter((g) => g && g !== 'rgba(0, 0, 0, 0)'))
  if (distinctGrounds.size <= 1 && data.sectionCount > 2)
    f.push(`ONE GROUND       ${data.sectionCount} sections share a single background. Nothing is emphasised by contrast.`)

  if (data.overflow) f.push('OVERFLOW         page scrolls horizontally at 1440.')
  if (data.unsettled) f.push(`UNSETTLED        ${data.unsettled} text element(s) below full opacity after a slow scroll.`)
  errors.forEach((e) => f.push(`CONSOLE          ${e.slice(0, 120)}`))

  totalFindings += f.length
  console.log(`\n${'='.repeat(78)}\n${url}`)
  console.log(`${data.pageHeight}px · ${data.sectionCount} sections · ${data.videos} videos · heading sizes ${data.sizes.join('/')}`)
  if (!f.length) console.log('  ✓ clean')
  else f.forEach((x) => console.log('  • ' + x))
  await ctx.close()
}

console.log(`\n${'='.repeat(78)}\n${totalFindings} finding(s) across ${urls.length} page(s).`)
await browser.close()
