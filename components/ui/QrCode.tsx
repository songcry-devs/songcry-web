import { qrSvg } from '@/lib/qr'

/**
 * The smart QR code (2026-09-28): dark modules on white, error-correction level M, a quiet zone
 * of at least 2 modules (lib/qr.ts, tested in tests/qr.test.ts). Pure and server-renderable — no
 * client JavaScript runs to draw it, so it works the same inside a server-rendered close band and
 * inside a client-rendered popover.
 *
 * The SVG itself carries no ARIA — role="img" and the accessible name live on this wrapping div,
 * so a screen reader announces the code once, not twice.
 */
export default function QrCode({
  value,
  size = 168,
  className,
}: {
  /** The absolute URL this code encodes. Callers build it with lib/store-links.ts qrGetUrl(). */
  value: string
  /** Rendered box size in pixels. The code is scalable, so this is pure CSS sizing. */
  size?: number
  className?: string
}) {
  return (
    <div
      className={className}
      role="img"
      aria-label="QR code that opens the App Store or Google Play"
      style={{ width: size, height: size, lineHeight: 0 }}
      // eslint-disable-next-line react/no-danger -- markup is our own qrcode-generator output, never user input
      dangerouslySetInnerHTML={{ __html: qrSvg(value) }}
    />
  )
}
