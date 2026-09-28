import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const CLOSE_BAND_PATH = fileURLToPath(
  new URL('../components/sections/home/CloseBand.tsx', import.meta.url),
)

test('CloseBand keeps the id="get-the-app" anchor DESKTOP_GET_PATH targets', () => {
  const src = readFileSync(CLOSE_BAND_PATH, 'utf8')
  assert.ok(
    src.includes('id="get-the-app"'),
    'CloseBand.tsx must carry id="get-the-app" — /get sends every computer to /#get-the-app',
  )
})
