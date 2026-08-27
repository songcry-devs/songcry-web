'use client'

import { APP_STORE_URL, trackAppStoreClick } from '@/lib/appstore'

/**
 * Closing CTA band. Concept A only.
 *
 * Was shared with D until D forked its body on 2026-08-25; D closes on WallClose
 * instead, which reprises its hero wall behind the same approved copy.
 *
 * Client component so the App Store link reports through the one tracked
 * handler in lib/appstore (same reason the nav Download button is tracked).
 * The primary button anchors back to the hero form (#join).
 *
 * NOTE: keep the style string free of apostrophes, quotes, ampersands and
 * angle brackets (see JoinForm.tsx).
 */
export default function CtaBand({ placement }: { placement: string }) {
  return (
    <section className="ctab-section" aria-label="Join Songcry">
      <h2 className="ctab-heading">Put your city on.</h2>
      <a className="ctab-btn" href="#join">
        Join the beta
      </a>
      <a
        className="ctab-store"
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAppStoreClick(placement)}
      >
        Download on the App Store
      </a>

      <style>{`
        .ctab-section {
          background: #121212;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          text-align: center;
          padding: 120px 40px;
        }
        .ctab-heading {
          font-family: var(--font-albert);
          font-size: clamp(36px, 4vw, 56px);
          line-height: 1.06;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 32px;
        }
        .ctab-btn {
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
        .ctab-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .ctab-btn:active {
          transform: scale(0.975);
        }
        .ctab-store {
          display: block;
          margin-top: 20px;
          font-family: var(--font-albert);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(255, 255, 255, 0.25);
          transition: color 160ms ease;
        }
        .ctab-store:hover {
          color: rgba(255, 255, 255, 0.65);
        }

        .ctab-btn:focus-visible,
        .ctab-store:focus-visible {
          outline: 2px solid var(--pink);
          outline-offset: 3px;
          border-radius: 999px;
        }

        /* globals.css already zeroes animation and transition DURATION
        site-wide under reduced motion, with !important. What it cannot do
        is remove a positional change: a hover lift still happens, just
        instantly. An instant 6px jump is still movement to someone with
        vestibular sensitivity, so the transform is dropped here. The
        duration lines below are deliberate belt-and-braces in case the
        global reset is ever narrowed. */
        @media (prefers-reduced-motion: reduce) {
          .ctab-btn,
          .ctab-store {
            transition: none;
          }
          .ctab-btn:hover,
          .ctab-btn:active {
            transform: none;
          }
        }

        @media (max-width: 817px) {
          .ctab-section {
            padding: 80px 24px;
          }
        }
      `}</style>
    </section>
  )
}
