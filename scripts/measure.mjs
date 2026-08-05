// scripts/measure.mjs — node scripts/measure.mjs <url> "<selector>"
import { chromium } from 'playwright'
const [,, url, selector] = process.argv
const BPS = { desktop: 1440, tablet: 1000, phone: 390 }
const PROPS = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color',
  'background','backgroundColor','backgroundImage','padding','margin','gap','width','height',
  'maxWidth','borderRadius','border','boxShadow','textAlign','transition','transform','opacity',
  'display','flexDirection','justifyContent','alignItems']
const b = await chromium.launch()
for (const [name, w] of Object.entries(BPS)) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } })
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(800)
  const data = await p.$$eval(selector, (els, props) => els.slice(0,1).map(el => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect()
    const o = { rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } }
    for (const k of props) o[k] = cs[k]
    return o
  }), PROPS)
  console.log(`\n=== ${name} (${w}px) ===`); console.log(JSON.stringify(data[0] ?? 'NOT FOUND', null, 2))
  await p.close()
}
await b.close()
