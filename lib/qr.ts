import qrcode from 'qrcode-generator'

/**
 * The smart QR code's own rendering rules (2026-09-28), split out from components/ui/QrCode.tsx
 * so tests/qr.test.ts can load it directly with `node --test`, the same reason lib/store-links.ts
 * and lib/attribution.ts are plain modules instead of living inside a component.
 *
 * Error-correction level M and a quiet zone of at least 2 modules, dark modules on white: the
 * shape TJ approved in the /artist mockup (search "smart QR" there for the reference markup).
 */

/** Error-correction level the brief locks: M, the same level the approved mockup used. */
const ERROR_CORRECTION_LEVEL = 'M'

/** The minimum quiet zone the brief requires, in QR modules (not pixels). */
export const QUIET_ZONE_MODULES = 2

export type QrSvgOptions = {
  /** Pixel width of one QR module before scaling. Default 4, the approved mockup's own value. */
  cellSize?: number
}

/** One QRCode instance per distinct value, computed once and reused for the rest of the session. */
const qrCache = new Map<string, ReturnType<typeof qrcode>>()

function qrFor(value: string): ReturnType<typeof qrcode> {
  const cached = qrCache.get(value)
  if (cached) return cached
  // Type number 0: let the library pick the smallest version that fits `value`.
  const qr = qrcode(0, ERROR_CORRECTION_LEVEL)
  qr.addData(value)
  qr.make()
  qrCache.set(value, qr)
  return qr
}

/**
 * The module grid size (excluding the quiet zone) qrcode-generator picked for `value`. Exposed
 * so a caller — or a test — can check the rendered SVG's geometry without re-implementing the
 * QR spec: total SVG size is `(qrModuleCount(value) + QUIET_ZONE_MODULES * 2) * cellSize`.
 */
export function qrModuleCount(value: string): number {
  return qrFor(value).getModuleCount()
}

const svgCache = new Map<string, string>()

/**
 * Inline SVG markup for `value`: dark modules on white (the library's own default fill), a
 * quiet zone of exactly QUIET_ZONE_MODULES modules on every side, and no width/height attributes
 * (`scalable: true`) so CSS controls the rendered size — the same trick the approved mockup used
 * so the code stays crisp inside both the 168px popover box and the 120px close-band box.
 *
 * Computed once per (value, cellSize) pair and cached at module scope: opening the same panel
 * twice, or rendering the same close-band QR on every page load, never re-runs the QR algorithm.
 */
export function qrSvg(value: string, { cellSize = 4 }: QrSvgOptions = {}): string {
  const key = `${cellSize}:${value}`
  const cached = svgCache.get(key)
  if (cached) return cached
  const svg = qrFor(value).createSvgTag({
    cellSize,
    margin: cellSize * QUIET_ZONE_MODULES,
    scalable: true,
  })
  svgCache.set(key, svg)
  return svg
}
