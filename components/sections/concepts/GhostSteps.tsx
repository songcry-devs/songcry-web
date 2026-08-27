'use client'

import PinnedTrack from '@/components/craft/PinnedTrack'

/**
 * Concept A how-it-works, as a PINNED editorial sequence. Concept A only.
 *
 * Was three rows you scrolled past, each with a ghost numeral drifting against
 * it. TJ, 2026-08-27: give A through D the devices, not just the craft
 * corrections. So the rows became a device.
 *
 * A is the editorial, typographic concept and carries no photography, so its pin
 * is built entirely out of type: the numeral goes enormous and sits BEHIND the
 * words as a stage rather than beside them as an ornament, and the beats change
 * against it while the page holds still. Nothing here is shared with B or D
 * beyond the PinnedTrack mechanism, which is the point. See the chassis comment.
 *
 * The 01/02/03 numbering is justified structure: the three beats are a real
 * sequence, so the numerals encode order the reader needs.
 *
 * Copy is claims-locked from the approved concept comps. Do not edit these lines
 * without a copy ruling.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const STEPS = [
  {
    n: '01',
    title: 'Upload where you are',
    body: 'Your tracks enter your city’s feed the day you post them.',
  },
  {
    n: '02',
    title: 'Real listeners decide',
    body: 'Likes, hosts and shares from people near you move your song up.',
  },
  {
    n: '03',
    title: 'It travels city to city',
    body: 'When a listener hosts your track, it starts playing in their city too.',
  },
]

export default function GhostSteps() {
  return (
    <section className="gs-section" aria-label="How Songcry works">
      <PinnedTrack count={STEPS.length} track="330vh" className="gs-pin">
        {({ active, reduced }) => (
          <>
            <p className="gs-eyebrow">How it works</p>

            <div className={reduced ? 'gs-stage gs-stage-static' : 'gs-stage'}>
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className={
                    reduced
                      ? 'gs-beat gs-beat-static'
                      : `gs-beat${i === active ? ' is-active' : ''}`
                  }
                >
                  <span className="gs-ghost" aria-hidden="true">
                    {s.n}
                  </span>
                  <div className="gs-copy">
                    <h3 className="gs-title">{s.title}</h3>
                    <p className="gs-body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </PinnedTrack>

      <style>{`
        .gs-section {
          background: #0e0d0d;
        }
        .gs-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin: 0 0 64px;
        }
        .gs-stage {
          position: relative;
          min-height: 340px;
        }
        .gs-stage-static {
          min-height: 0;
        }
        .gs-beat {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 640ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 640ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .gs-beat.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .gs-beat-static {
          position: relative;
          inset: auto;
          opacity: 1;
          transform: none;
          transition: none;
          pointer-events: auto;
          margin-bottom: 84px;
        }

        /* The numeral is the STAGE, not an ornament beside the words. */
        .gs-ghost {
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-54%);
          font-family: var(--font-albert);
          font-size: clamp(180px, 26vw, 380px);
          font-weight: 700;
          line-height: 0.8;
          letter-spacing: -0.05em;
          color: rgba(255, 255, 255, 0.045);
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }
        .gs-copy {
          position: relative;
          z-index: 1;
          max-width: 720px;
          padding-left: clamp(0px, 6vw, 96px);
        }
        .gs-title {
          font-family: var(--font-albert);
          font-size: clamp(34px, 5.2vw, 66px);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 26px;
        }
        .gs-body {
          font-family: var(--font-albert);
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.46);
          max-width: 540px;
          margin: 0;
        }

        @media (max-width: 980px) {
          .gs-eyebrow {
            margin-bottom: 44px;
          }
          .gs-stage {
            min-height: 380px;
          }
          .gs-ghost {
            top: -6%;
            transform: none;
          }
          .gs-copy {
            padding-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-ghost {
            position: static;
            display: block;
            transform: none;
            font-size: 84px;
            margin-bottom: 8px;
          }
          .gs-copy {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  )
}
