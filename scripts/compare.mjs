// scripts/compare.mjs — node scripts/compare.mjs <framerPath> <localPath>
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
const [,, fPath='/', lPath='/'] = process.argv
const BPS = { desktop: 1440, tablet: 1000, phone: 390 }
const slug = lPath.replace(/[^a-z0-9]+/gi,'_') || 'home'
const dir = `verify/${slug}`; mkdirSync(dir, { recursive: true })
const b = await chromium.launch()
for (const [name, w] of Object.entries(BPS)) {
  for (const [label, base, path] of [['framer','https://songcry.app',fPath],['local','http://localhost:3000',lPath]]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } })
    await p.goto(base+path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1000)
    await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)) } window.scrollTo(0,0) })
    await p.waitForTimeout(400)
    await p.screenshot({ path: `${dir}/${name}-${label}.png`, fullPage: true })
    await p.close()
  }
}
await b.close()
console.log(`Wrote screenshots to ${dir}/`)
