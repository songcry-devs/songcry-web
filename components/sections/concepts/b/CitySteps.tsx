import Reveal from '@/components/motion/Reveal'

/**
 * Concept B how-it-works: the three beats as a row, city-tagged.
 *
 * B used the shared GhostSteps until the concepts were forked. GhostSteps and
 * its ghost numerals are the editorial read and belong to A; B is the
 * typographic, centred, city-led concept, so its beats sit across the page as
 * three tagged columns rather than stacked rows. That also keeps the vertical
 * rhythm short, which matters here because B already carries a ticker, a
 * collage and the city wall.
 *
 * Copy is claims-locked and identical to GhostSteps, character for character.
 * Do not edit these lines without a copy ruling.
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

export default function CitySteps() {
  return (
    <section className="cs-section" aria-label="How Songcry works">
      <div className="cs-wrap">
        <Reveal y={24}>
          <h2 className="cs-heading">How it works</h2>
        </Reveal>

        <div className="cs-row">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} y={28} delay={0.08 * i} className="cs-cell">
              <div className="cs-step">
                <span className="cs-num" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="cs-title">{s.title}</h3>
                <p className="cs-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .cs-section {
          background: #0e0d0d;
          padding: 120px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .cs-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .cs-heading {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3vw, 38px);
          line-height: 1.12;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 56px;
          text-align: center;
        }
        .cs-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        .cs-cell {
          height: 100%;
        }
        .cs-step {
          height: 100%;
          padding-top: 26px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          transition: border-color 300ms ease;
        }
        .cs-step:hover {
          border-top-color: var(--pink);
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
          font-size: clamp(22px, 2vw, 27px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.14;
          color: #ffffff;
          margin: 0 0 12px;
        }
        .cs-body {
          font-family: var(--font-albert);
          font-size: 17px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        @media (max-width: 1199px) {
          .cs-wrap {
            padding: 0 48px;
          }
          .cs-row {
            gap: 32px;
          }
        }
        @media (max-width: 980px) {
          .cs-section {
            padding: 96px 0;
          }
          .cs-row {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .cs-heading {
            text-align: left;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 817px) {
          .cs-section {
            padding: 80px 0;
          }
          .cs-wrap {
            padding: 0 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-step {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
