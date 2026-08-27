'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'

/**
 * Homepage how-it-works, as three numbered rows with drifting ghost numerals.
 *
 * Replaces the text-only HowItWorks section (TJ, 2026-08-26). That section was a
 * heading and two paragraphs of prose, which is the flattest thing on the page.
 * This is the same explanation with structure: three beats the reader can scan.
 *
 * Lifted from concept A GhostSteps rather than imported from it, on purpose. The
 * concept pages live only on staging and get deleted when a direction is picked,
 * so an import would tie the live homepage to a folder that is scheduled to be
 * removed. It also means concept A stays byte-identical while Jack is reviewing
 * it, which matters more than avoiding the duplication.
 *
 * Two deliberate deviations from the concept A original:
 *   1. Explicit background, matching Hero and Download, so there is no seam.
 *   2. 96px top padding rather than 120px. Bottom padding is 64px, NOT 96px:
 *      section padding stacks, so a matching 96px here plus Download 96px put
 *      192px of air above the Join early block against 64px below it. See the
 *      centering note in Download.tsx.
 *
 * Copy is claims-locked and identical, character for character, to the version in
 * all four concepts. Do not edit these lines without a copy ruling.
 *
 * The 01/02/03 numbering is justified structure, not decoration: the three beats
 * are a real sequence, so the numerals encode order the reader needs.
 *
 * Type, corrected 2026-08-27 against the measured Apple ladder in
 * docs/research/2026-08-27-high-end-web-craft-teardown.md. Both headings shipped
 * with NO line-height, so they inherited the body 1.5 and carried half a line of
 * air inside them, which is the single clearest tell of untouched defaults. The
 * heading also sat 4px from the Download headline, close enough to read as noise
 * rather than hierarchy. Now 32px at 1.12 and 24px at 1.16, both weight 600.
 *
 * The ghost numeral stays at weight 700 on purpose. It is a graphic element where
 * weight reads as mass, not a piece of text in the hierarchy.
 *
 * Reduced motion: a scroll binding is a direct style write, so the MotionConfig in
 * the root layout does not neutralise it. useReducedMotion collapses the drift to
 * zero instead, and the render tree is identical either way.
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

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = reduced ? 0 : 30
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  return (
    <div className="hiw-step" ref={ref}>
      <motion.div className="hiw-num" aria-hidden="true" style={{ y }}>
        {n}
      </motion.div>
      <h3 className="hiw-title">{title}</h3>
      <p className="hiw-body">{body}</p>
    </div>
  )
}

export default function HowItWorksSteps() {
  return (
    <section className="hiw-section" aria-label="How Songcry Works">
      <div className="hiw-wrap">
        <Reveal y={24}>
          <h2 className="hiw-heading">How it works</h2>
        </Reveal>

        {STEPS.map((s) => (
          <Step key={s.n} n={s.n} title={s.title} body={s.body} />
        ))}
      </div>

      <style>{`
        .hiw-section {
          background: rgb(8, 7, 7);
          padding: 96px 0 64px;
        }
        .hiw-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hiw-heading {
          font-family: var(--font-albert);
          font-size: clamp(26px, 2.4vw, 32px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 56px;
        }
        .hiw-step {
          display: grid;
          grid-template-columns: 180px 1fr 1.1fr;
          gap: 32px;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding: 48px 0;
        }
        .hiw-step:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .hiw-num {
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
        .hiw-step:hover .hiw-num {
          color: rgba(248, 25, 192, 0.22);
        }
        .hiw-title {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 600;
          line-height: 1.16;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
        }
        .hiw-body {
          font-family: var(--font-albert);
          font-size: 17px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          max-width: 440px;
          margin: 0;
        }

        @media (max-width: 1199px) {
          .hiw-wrap {
            padding: 0 48px;
          }
        }
        @media (max-width: 980px) {
          .hiw-section {
            padding: 88px 0 64px;
          }
          .hiw-step {
            grid-template-columns: 110px 1fr;
            row-gap: 8px;
          }
          .hiw-num {
            font-size: 84px;
            grid-row: span 2;
          }
          .hiw-body {
            grid-column: 2;
          }
        }
        @media (max-width: 817px) {
          .hiw-section {
            padding: 72px 0 56px;
          }
          .hiw-wrap {
            padding: 0 24px;
          }
          .hiw-heading {
            margin-bottom: 36px;
          }
          .hiw-step {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 36px 0;
          }
          .hiw-num {
            font-size: 64px;
            grid-row: auto;
          }
          .hiw-body {
            grid-column: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hiw-num {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
