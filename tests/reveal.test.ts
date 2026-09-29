import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shouldHoldBack } from '../lib/reveal.ts'

const VH = 900

test('content on screen at hydration is never held back', () => {
  assert.equal(shouldHoldBack({ top: 100 }, VH, false), false)
  assert.equal(shouldHoldBack({ top: 899 }, VH, false), false)
})

test('content above the viewport (landed mid-page or scrolled before hydration) is never held back', () => {
  assert.equal(shouldHoldBack({ top: -500 }, VH, false), false)
})

test('content below the fold is held back for its reveal', () => {
  assert.equal(shouldHoldBack({ top: 900 }, VH, false), true)
  assert.equal(shouldHoldBack({ top: 4000 }, VH, false), true)
})

test('reduced motion never holds anything back', () => {
  assert.equal(shouldHoldBack({ top: 4000 }, VH, true), false)
})
