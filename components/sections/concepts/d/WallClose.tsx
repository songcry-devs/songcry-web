'use client'

import Image from 'next/image'
import { APP_STORE_URL, trackAppStoreClick } from '@/lib/appstore'

/**
 * Concept D close: the wall returns, out of focus.
 *
 * Replaces the shared CtaBand for D, which now belongs to concept A. Same
 * approved copy and the same tracked App Store handler, but the flat panel is
 * replaced by a defocused, dimmed reprise of the hero wall so the page ends in
 * the room it opened in.
 *
 * Client component for the same reason CtaBand is one: the App Store link has
 * to report through the single tracked handler in lib/appstore.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const REPRISE = [
  '/concepts/feed-baltimore.png',
  '/concepts/feed-thank-you.png',
  '/concepts/artist-profile-rose-gold.png',
  '/concepts/upload-editor.png',
  '/concepts/filter-sheet.png',
]

export default function WallClose({ placement }: { placement: string }) {
  return (
    <section className="wc-section" aria-label="Join Songcry">
      <div className="wc-reprise" aria-hidden="true">
        {REPRISE.map((src) => (
          <div className="wc-tile" key={src}>
            <Image src={src} alt="" width={380} height={732} sizes="220px" />
          </div>
        ))}
      </div>
      <div className="wc-scrim" aria-hidden="true" />

      <div className="wc-wrap">
        <h2 className="wc-heading">Put your city on.</h2>
        <a className="wc-btn" href="#join">
          Join the beta
        </a>
        <a
          className="wc-store"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAppStoreClick(placement)}
        >
          Download on the App Store
        </a>
      </div>

      <style>{`
        .wc-section {
          position: relative;
          overflow: hidden;
          background: rgb(8, 7, 7);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding: 112px 40px 120px;
          text-align: center;
        }
        .wc-reprise {
          position: absolute;
          left: 50%;
          bottom: -120px;
          transform: translateX(-50%) rotate(-4deg);
          display: flex;
          gap: 22px;
          filter: blur(5px);
          opacity: 0.58;
          pointer-events: none;
        }
        .wc-tile {
          width: 220px;
          flex-shrink: 0;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 10px;
        }
        .wc-tile img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 12px;
        }
        .wc-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(760px 420px at 50% 42%, rgba(8, 7, 7, 0.9), rgba(8, 7, 7, 0.58) 68%, rgba(8, 7, 7, 0.32));
        }
        .wc-wrap {
          position: relative;
          z-index: 1;
        }
        .wc-heading {
          font-family: var(--font-albert);
          font-size: clamp(36px, 4vw, 56px);
          line-height: 1.06;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 32px;
        }
        .wc-btn {
          display: inline-block;
          background: var(--pink);
          color: #ffffff;
          border-radius: 999px;
          padding: 15px 40px;
          font-family: var(--font-albert);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .wc-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .wc-btn:active {
          transform: scale(0.975);
        }
        .wc-store {
          display: block;
          margin-top: 20px;
          font-family: var(--font-albert);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.58);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(255, 255, 255, 0.25);
          transition: color 160ms ease;
        }
        .wc-store:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        .wc-btn:focus-visible,
        .wc-store:focus-visible {
          outline: 2px solid var(--pink);
          outline-offset: 3px;
          border-radius: 999px;
        }

        /* globals.css already zeroes animation and transition DURATION
        site-wide under reduced motion, with a priority flag. What it cannot do
        is remove a positional change: a hover lift still happens, just
        instantly. An instant lift is still movement to someone with vestibular
        sensitivity, so the transform is dropped here. The duration lines below
        are deliberate belt-and-braces in case the global reset is ever
        narrowed. */
        @media (prefers-reduced-motion: reduce) {
          .wc-btn,
          .wc-store {
            transition: none;
          }
          .wc-btn:hover,
          .wc-btn:active {
            transform: none;
          }
        }

        @media (max-width: 817px) {
          .wc-section {
            padding: 80px 24px 88px;
          }
          .wc-reprise {
            bottom: -140px;
            gap: 14px;
            filter: blur(5px);
            opacity: 0.5;
          }
          .wc-tile {
            width: 150px;
          }
        }
      `}</style>
    </section>
  )
}
