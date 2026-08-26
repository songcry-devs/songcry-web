/**
 * Ghost-numeral how-it-works rows, shared by concepts A and B.
 *
 * D used these too until it forked its body on 2026-08-25. The ghost numerals are
 * the editorial read and belong to A; D stages the same three beats as a descent
 * in WallSteps.
 *
 * The 01/02/03 numbering is justified structure, not decoration: the three
 * beats are a real sequence (upload, listeners decide, the song travels), so
 * the numerals encode order the reader needs. Copy is claims-locked from the
 * approved concept comps — do not edit lines here without a copy ruling.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes,
 * ampersands and angle brackets — React escapes them during SSR and browsers
 * do not decode entities inside style elements (see JoinForm.tsx).
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
      <div className="gs-wrap">
        <h2 className="gs-heading">How it works</h2>

        {STEPS.map((s) => (
          <div className="gs-step" key={s.n}>
            <div className="gs-num" aria-hidden="true">
              {s.n}
            </div>
            <h3 className="gs-title">{s.title}</h3>
            <p className="gs-body">{s.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        .gs-section {
          padding: 104px 0 48px;
        }
        .gs-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .gs-heading {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 48px;
        }
        .gs-step {
          display: grid;
          grid-template-columns: 180px 1fr 1.1fr;
          gap: 32px;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding: 44px 0;
        }
        .gs-step:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .gs-num {
          font-family: var(--font-albert);
          font-size: 120px;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: rgba(255, 255, 255, 0.08);
          user-select: none;
          transition: color 260ms ease;
        }
        .gs-step:hover .gs-num {
          color: rgba(248, 25, 192, 0.22);
        }
        .gs-title {
          font-family: var(--font-albert);
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
        }
        .gs-body {
          font-family: var(--font-albert);
          font-size: 17px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          max-width: 440px;
          margin: 0;
        }

        @media (max-width: 1199px) {
          .gs-wrap {
            padding: 0 48px;
          }
        }
        @media (max-width: 980px) {
          .gs-step {
            grid-template-columns: 110px 1fr;
            row-gap: 8px;
          }
          .gs-num {
            font-size: 84px;
            grid-row: span 2;
          }
          .gs-body {
            grid-column: 2;
          }
        }
        @media (max-width: 817px) {
          .gs-section {
            padding: 72px 0 32px;
          }
          .gs-wrap {
            padding: 0 24px;
          }
          .gs-heading {
            margin-bottom: 32px;
          }
          .gs-step {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 32px 0;
          }
          .gs-num {
            font-size: 64px;
            grid-row: auto;
          }
          .gs-body {
            grid-column: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-step {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
