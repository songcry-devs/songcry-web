import { qrSvg } from '@/lib/qr'

/**
 * The smart QR code (2026-09-28): dark modules on white, error-correction level M, a quiet zone
 * of at least 2 modules (lib/qr.ts, tested in tests/qr.test.ts). Pure and server-renderable — no
 * client JavaScript runs to draw it, so it works the same inside a server-rendered close band and
 * inside a client-rendered popover.
 *
 * The SVG itself carries no ARIA — role="img" and the accessible name live on this outer div, so
 * a screen reader announces the code once, not twice. `className` (the caller's padding and white
 * background, e.g. .qr-dl-code / .cbnd-qr) lands on this same outer div, so it wraps the code the
 * way the approved mockup's .qrbox wraps its svg: `size` is the QR code's own pixel size, and the
 * caller's padding is chrome around it, not eaten out of it.
 *
 * lib/qr.ts renders the svg with no width/height (scalable: true) on purpose, so it never fights
 * a fixed pixel size baked into the markup. But a sizeless, block-level replaced element does not
 * stretch to fill a parent on its own — nothing does that for it by default. `size` is applied to
 * the inner data-qr-svg div, not the outer one: every codebase caller runs under Tailwind
 * preflight's global box-sizing: border-box, so sizing the OUTER div (the one that also carries
 * the caller's padding) would make that padding eat into the requested size instead of sitting
 * outside it. The `[data-qr-svg] svg` rule below (a descendant selector, not a child combinator:
 * scripts/check-style-literals.mjs forbids angle brackets inside this style literal, and the
 * injected markup only ever has one svg here anyway) is what actually makes `size` real: it
 * forces the injected svg to fill that inner, padding-free div. Found in review round 1 on PR
 * #39: the size prop reached neither the svg nor an unpadded box before this fix.
 */
export default function QrCode({
  value,
  size = 168,
  className,
}: {
  /** The absolute URL this code encodes. Callers build it with lib/store-links.ts qrGetUrl(). */
  value: string
  /** The QR code's own rendered size in pixels. The code is scalable, so this is pure CSS sizing. */
  size?: number
  className?: string
}) {
  return (
    <div className={className} role="img" aria-label="QR code that opens the App Store or Google Play">
      <div
        data-qr-svg
        style={{ width: size, height: size, lineHeight: 0 }}
        // eslint-disable-next-line react/no-danger -- markup is our own qrcode-generator output, never user input
        dangerouslySetInnerHTML={{ __html: qrSvg(value) }}
      />
      <style>{`
        [data-qr-svg] svg {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
