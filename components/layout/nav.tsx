'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { appStoreUrl, trackAppStoreClick } from '@/lib/appstore'

export default function Nav({ variant = 'home' }: { variant?: 'home' | 'artist' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/*
        We need two different phone layouts depending on variant:
        - "home":   standard floating pill (same as desktop/tablet but with 12px side margins)
        - "artist": transparent top bar with logo + hamburger

        We handle this by rendering two separate nav roots and showing/hiding via CSS.
        Both are always in the DOM so SSR works; only one is visible at a time on phone.
      */}

      {/* ── Pill nav (Desktop + Tablet + Phone "home") ── */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          zIndex: 50,
          /* Default: desktop — 64px side padding */
          paddingLeft: '64px',
          paddingRight: '64px',
          /* On artist variant, hide on phone */
        }}
        className={[
          'nav-pill-wrapper',
          variant === 'artist' ? 'artist-pill-hidden-on-phone' : '',
        ].join(' ')}
      >
        {/* The pill itself */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.64)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '99px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            /* Desktop: height 56px, padding 12px 24px */
            height: '56px',
            padding: '12px 24px',
          }}
          className="nav-pill-inner"
        >
          {/* Left: flame icon + wordmark */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <Image
              src="/framer/nav-flame.svg"
              alt=""
              width={36}
              height={29}
              priority
              style={{ height: '29px', width: 'auto' }}
            />
            <Image
              src="/framer/nav-logo.png"
              alt="Songcry"
              width={84}
              height={24}
              priority
              className="nav-wordmark"
              style={{ height: '24px', width: 'auto' }}
            />
          </Link>

          {/* Right: Download button */}
          <DownloadButton />
        </div>
      </div>

      {/* ── Artist phone nav: transparent top bar with hamburger ── */}
      {variant === 'artist' && (
        <>
          {/* Only shown on phone (≤817px) */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: '60px',
              padding: '0 24px',
              background: 'transparent',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className="artist-phone-bar"
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Image
                src="/framer/nav-flame.svg"
                alt=""
                width={36}
                height={29}
                priority
                style={{ height: '29px', width: 'auto' }}
              />
              <Image
                src="/framer/nav-logo.png"
                alt="Songcry"
                width={84}
                height={24}
                priority
                style={{ height: '24px', width: 'auto' }}
              />
            </Link>

            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {menuOpen ? <X size={24} color="#ffffff" /> : <Menu size={24} color="#ffffff" />}
            </button>
          </div>

          {/* Overlay menu */}
          {menuOpen && (
            <div
              style={{
                position: 'fixed',
                top: '60px',
                left: 0,
                right: 0,
                zIndex: 49,
                background: 'rgba(0, 0, 0, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              className="artist-phone-bar"
            >
              <a
                href={appStoreUrl('nav-mobile')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackAppStoreClick('nav-mobile'); setMenuOpen(false) }}
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-albert-sans), system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                Download on the App Store
              </a>
            </div>
          )}
        </>
      )}

      {/* ── Responsive overrides via a style tag ── */}
      <style>{`
        /* Tablet: 818–1199px */
        @media (max-width: 1199px) {
          .nav-pill-wrapper {
            padding-left: 48px;
            padding-right: 48px;
          }
          .nav-pill-inner {
            height: 64px !important;
            padding: 16px !important;
          }
        }

        /* Phone: 817px and below. TJ 2026-08-25: the pill was cramped and the Download
           button could sit over the wordmark / the hero copy scrolling beneath the
           translucent pill. Solid-er background, guaranteed gap, smaller wordmark.

           NOTE: this style string must stay free of apostrophes, quotes, ampersands
           and angle brackets, even inside comments. React escapes them during SSR,
           browsers do not decode entities inside style elements, and the resulting
           text mismatch makes React throw away the whole server-rendered document.
           The previous version of this very comment spelled out the forbidden
           characters literally and so caused the bug it was warning about. */
        @media (max-width: 817px) {
          .nav-pill-wrapper {
            padding-left: 12px;
            padding-right: 12px;
          }
          .nav-pill-inner {
            height: 52px !important;
            padding: 10px 10px 10px 16px !important;
            gap: 12px;
            flex-wrap: nowrap;
            background: rgba(0, 0, 0, 0.85) !important;
          }
          .nav-wordmark {
            height: 20px !important;
          }

          /* On artist variant, hide the pill nav on phone */
          .artist-pill-hidden-on-phone {
            display: none;
          }

          /* Download button: compact but tappable */
          .nav-dl-btn {
            padding: 8px 14px !important;
            flex-shrink: 0;
          }
          .nav-dl-btn span {
            font-size: 15px !important;
          }
        }

        /* Show artist phone bar only on phone; hide on tablet/desktop */
        .artist-phone-bar {
          display: none;
        }
        @media (max-width: 817px) {
          .artist-phone-bar {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}

function DownloadButton() {
  return (
    <a
      href={appStoreUrl('nav-desktop')}
      onClick={() => trackAppStoreClick('nav-desktop')}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-dl-btn"
      style={{
        background: '#ffffff',
        borderRadius: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        textDecoration: 'none',
        transition: 'opacity 180ms ease-out, transform 180ms ease-out',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.opacity = '0.88'
        e.currentTarget.style.transform = 'scale(1.02)'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-albert-sans), system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          color: 'var(--nav-pill-text, rgb(41, 41, 41))',
          lineHeight: '1.2',
        }}
      >
        Download
      </span>
    </a>
  )
}
