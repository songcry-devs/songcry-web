'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'

/**
 * Ghost-numeral how-it-works rows. Concept A only.
 *
 * B and D used these too until the concepts were forked. D stages the same three
 * beats as a descent in its own WallSteps; B lays them across the page in
 * CitySteps. The ghost numerals are the editorial read, so they stayed with A.
 *
 * Concept A signature motion: each ghost numeral drifts against its own row as
 * that row crosses the viewport. It is the one editorial move on the page, the
 * counterpart to D wall answering the scroll, and it is per-row rather than
 * per-section, which is why each row owns its own scroll tracking in a child
 * component. Hooks cannot run in a loop, hence GhostStep.
 *
 * Reduced motion: a scroll binding is a direct style write, so the MotionConfig
 * in the root layout does not neutralise it. useReducedMotion collapses the
 * drift to zero instead, and the render tree is identical either way.
 *
 * The 01/02/03 numbering is justified structure, not decoration: the three
 * beats are a real sequence (upload, listeners decide, the song travels), so
 * the numerals encode order the reader needs. Copy is claims-locked from the
 * approved concept comps — do not edit lines here without a copy ruling.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes,
 * ampersands and angle brackets, comments included. See
 * scripts/check-style-literals.mjs.
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

function GhostStep({ n, title, body }: { n: string; title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = reduced ? 0 : 30
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  return (
    <div className="gs-step" ref={ref}>
      <motion.div className="gs-num" aria-hidden="true" style={{ y }}>
        {n}
      </motion.div>
      <h3 className="gs-title">{title}</h3>
      <p className="gs-body">{body}</p>
    </div>
  )
}

export default function GhostSteps() {
  return (
    <section className="gs-section" aria-label="How Songcry works">
      <div className="gs-wrap">
        <Reveal y={24}>
          <h2 className="gs-heading">How it works</h2>
        </Reveal>

        {STEPS.map((s) => (
          <GhostStep key={s.n} n={s.n} title={s.title} body={s.body} />
        ))}
      </div>

      <style>{`
        .gs-section {
          background: #0e0d0d;
          padding: 120px 0;
        }
        .gs-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .gs-heading {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3vw, 38px);
          line-height: 1.12;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 56px;
        }
        .gs-step {
          display: grid;
          grid-template-columns: 180px 1fr 1.1fr;
          gap: 32px;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding: 48px 0;
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
          will-change: transform;
        }
        .gs-step:hover .gs-num {
          color: rgba(248, 25, 192, 0.22);
        }
        .gs-title {
          font-family: var(--font-albert);
          font-size: 26px;
          line-height: 1.16;
          font-weight: 600;
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
          .gs-section {
            padding: 96px 0;
          }
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
            padding: 80px 0;
          }
          .gs-wrap {
            padding: 0 24px;
          }
          .gs-heading {
            margin-bottom: 36px;
          }
          .gs-step {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 36px 0;
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
          .gs-num {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
