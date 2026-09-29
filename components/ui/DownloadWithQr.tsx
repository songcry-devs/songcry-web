'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import GetAppLink from '@/components/ui/GetAppLink'
import QrCode from '@/components/ui/QrCode'
import StoreBadges from '@/components/ui/StoreBadges'
import { qrGetUrl } from '@/lib/store-links'

/**
 * The smart QR download control (2026-09-28): on a computer, "Download" opens a small panel with
 * a QR code instead of leaving the page; on a phone, nothing changes. Approved design: the
 * /artist mockup (search "smart QR" and "qrpop" there).
 *
 * Device is decided in the browser, at click time, by (hover: hover) and (pointer: fine) — never
 * by width alone, and never server-side, so the server-rendered markup stays device-neutral (no
 * layout shift) and a visitor with JavaScript off still gets a plain, working /get link: the
 * click handler that would intercept the navigation simply never runs.
 *
 * `placement` is unchanged: it is GetAppLink's own click-tracking and /get ct/utm_content, exactly
 * as before this control existed. `qrPlacement` is the smart-QR-only label (nav, artist-hero,
 * home-close) that becomes the QR's own qr-<placement> ct/utm_content (lib/store-links.ts
 * qrGetUrl) — kept distinct so a QR scan is attributable separately from a direct tap.
 */
export default function DownloadWithQr({
  placement,
  qrPlacement,
  align = 'center',
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  placement: string
  qrPlacement: string
  /** Which side of the trigger the panel hangs from. 'end' keeps it clear of a viewport edge. */
  align?: 'end' | 'center'
  className?: string
  style?: CSSProperties
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  // Esc and click-outside close the panel; focus returns to the trigger either way.
  useEffect(() => {
    if (!open) return

    function close() {
      setOpen(false)
      triggerRef.current?.focus()
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  return (
    <span className="qr-dl-wrap">
      <GetAppLink
        ref={triggerRef}
        placement={placement}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(e) => {
          // No hover, no fine pointer: this is a phone. Let the real /get href navigate,
          // exactly as it always has, so the click still works with JavaScript off.
          const isComputer =
            typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
          if (!isComputer) return
          e.preventDefault()
          setOpen((o) => !o)
        }}
      >
        {children}
      </GetAppLink>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Get Songcry on your phone"
          className="qr-dl-panel"
          data-align={align}
        >
          <p className="qr-dl-title">Get Songcry on your phone</p>
          <QrCode value={qrGetUrl(qrPlacement)} size={168} className="qr-dl-code" />
          <p className="qr-dl-sub">
            Point your phone&apos;s camera here. It opens the App Store or Google Play, whichever
            your phone uses.
          </p>
          <StoreBadges placement={`qr-${qrPlacement}`} className="qr-dl-badges" />
        </div>
      )}

      <style>{`
        .qr-dl-wrap {
          position: relative;
          display: inline-flex;
        }
        .qr-dl-panel {
          position: absolute;
          top: calc(100% + 12px);
          width: 280px;
          background: var(--bg, rgb(8, 7, 7));
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 20px;
          padding: 20px;
          display: grid;
          gap: 12px;
          justify-items: center;
          text-align: center;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6);
          z-index: 60;
          opacity: 1;
        }
        .qr-dl-panel[data-align=end] {
          right: 0;
        }
        .qr-dl-panel[data-align=center] {
          left: 50%;
          transform: translateX(-50%);
        }
        .qr-dl-title {
          font-family: var(--font-albert, inherit);
          font-size: 15px;
          font-weight: 600;
          color: var(--text, #fff);
          margin: 0;
        }
        .qr-dl-code {
          background: #fff;
          border-radius: 14px;
          padding: 10px;
        }
        .qr-dl-sub {
          font-family: var(--font-albert, inherit);
          font-size: 12px;
          line-height: 1.33;
          color: var(--text-60, rgba(255, 255, 255, 0.6));
          margin: 0;
        }
        .qr-dl-badges {
          transform: scale(0.72);
          transform-origin: center;
          margin: -12px 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .qr-dl-panel {
            animation: qr-dl-in 160ms ease-out;
          }
        }
        @keyframes qr-dl-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  )
}
