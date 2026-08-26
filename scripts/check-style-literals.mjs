#!/usr/bin/env node
/**
 * Guards the hydration bug that has now shipped three times.
 *
 * React entity-escapes < > " ' and & when it server-renders the text child of a
 * style element. Browsers never decode entities inside style, so the client text
 * and the server text differ, React treats the document as mismatched and throws
 * away the entire server render. It fails silently: the page still looks right,
 * it just rebuilds itself on the client. The symptom is minified React errors
 * 425, 418 and 423 in the console and a much later LCP.
 *
 * Comments count. The third incident was caused by a warning comment that spelled
 * out the forbidden characters literally.
 *
 * Run: node scripts/check-style-literals.mjs
 */
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const FORBIDDEN = ['<', '>', '"', "'", '&']
const files = globSync('**/*.tsx', { exclude: (p) => p.includes('node_modules') || p.includes('.next') })

let checked = 0
const failures = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/<style>\{`([\s\S]*?)`\}<\/style>/g)) {
    checked++
    const body = m[1]
    const hits = FORBIDDEN.filter((c) => body.includes(c))
    if (hits.length) {
      const lines = body
        .split('\n')
        .map((l, i) => [i + 1, l])
        .filter(([, l]) => FORBIDDEN.some((c) => l.includes(c)))
        .slice(0, 5)
      failures.push({ file, hits, lines })
    }
  }
}

if (failures.length) {
  console.error(`\nstyle-literal check FAILED: ${failures.length} of ${checked} literal(s) unsafe\n`)
  for (const f of failures) {
    console.error(`  ${f.file}  contains ${f.hits.map((c) => JSON.stringify(c)).join(' ')}`)
    for (const [n, l] of f.lines) console.error(`    line ${n}: ${l.trim().slice(0, 100)}`)
  }
  console.error('\nRewrite the offending text in prose. Say "angle brackets", not the characters.\n')
  process.exit(1)
}

console.log(`style-literal check passed: ${checked} literal(s), all clean`)
