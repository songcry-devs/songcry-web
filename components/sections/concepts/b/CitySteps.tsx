'use client'

import PinnedTrack from '@/components/craft/PinnedTrack'

/**
 * Concept B how-it-works, as a PINNED city sequence. Concept B only.
 *
 * B is the city-led concept, so its pin is led by the city: a real city name sits
 * behind each beat and changes with it, so the sequence reads as the same song
 * moving through places rather than three abstract steps. A uses the same
 * PinnedTrack chassis and renders enormous numerals instead; D descends a wall.
 * Shared mechanism, bespoke instance, which is the answer to the recycled-modules
 * critique rather than an exception to it.
 *
 * The cities are the ones already named on this page's wall, so nothing new is
 * being claimed. NEVER state a city count anywhere, per the CITY ruling in the
 * voice canon.
 *
 * Copy is claims-locked and identical, character for character, to the version in
 * the other concepts. Do not edit without a copy ruling.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const STEPS = [
  {
    n: '01',
    city: 'Baltimore',
    title: 'Upload where you are',
    body: 'Your tracks enter your city’s feed the day you post them.',
  },
  {
    n: '02',
    city: 'Atlanta',
    title: 'Real listeners decide',
    body: 'Likes, hosts and shares from people near you move your song up.',
  },
  {
    n: '03',
    city: 'Oakland',
    title: 'It travels city to city',
    body: 'When a listener hosts your track, it starts playing in their city too.',
  },
]

export default function CitySteps() {
  return (
    <section className="cs-section" aria-label="How Songcry works">
      <PinnedTrack count={STEPS.length} track="330vh">
        {({ active, reduced }) => (
          <>
            <p className="cs-eyebrow">How it works</p>

            <div className={reduced ? 'cs-stage cs-stage-static' : 'cs-stage'}>
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className={
                    reduced ? 'cs-beat cs-beat-static' : `cs-beat${i === active ? ' is-active' : ''}`
                  }
                >
                  <span className="cs-city" aria-hidden="true">
                    {s.city}
                  </span>
                  <div className="cs-copy">
                    <span className="cs-num">{s.n}</span>
                    <h3 className="cs-title">{s.title}</h3>
                    <p className="cs-body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </PinnedTrack>

      <style>{`
        .cs-section {
          background: #0e0d0d;
        }
        .cs-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin: 0 0 56px;
        }
        .cs-stage {
          position: relative;
          min-height: 360px;
        }
        .cs-stage-static {
          min-height: 0;
        }
        .cs-beat {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 640ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 640ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .cs-beat.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .cs-beat-static {
          position: relative;
          inset: auto;
          opacity: 1;
          transform: none;
          transition: none;
          pointer-events: auto;
          margin-bottom: 76px;
        }

        /* The city is the stage on this concept, the way the numeral is on A. */
        .cs-city {
          display: block;
          font-family: var(--font-albert);
          font-size: clamp(52px, 9vw, 128px);
          font-weight: 600;
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: rgba(255, 255, 255, 0.07);
          user-select: none;
          margin-bottom: -18px;
        }
        .cs-copy {
          position: relative;
          max-width: 680px;
        }
        .cs-num {
          display: block;
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 18px;
        }
        .cs-title {
          font-family: var(--font-albert);
          font-size: clamp(30px, 4.2vw, 54px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 22px;
        }
        .cs-body {
          font-family: var(--font-albert);
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.46);
          max-width: 520px;
          margin: 0;
        }

        @media (max-width: 980px) {
          .cs-eyebrow {
            margin-bottom: 40px;
          }
          .cs-stage {
            min-height: 400px;
          }
          .cs-city {
            margin-bottom: -10px;
          }
        }
      `}</style>
    </section>
  )
}
