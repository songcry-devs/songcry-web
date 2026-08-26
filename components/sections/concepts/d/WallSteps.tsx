import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

/**
 * Concept D how-it-works: the three beats as a descent through the room.
 *
 * Replaces the shared GhostSteps for D. GhostSteps and its giant ghost numerals
 * now belong to concept A, which is the editorial read. D is the atmospheric
 * one, so the same three beats are staged instead as a staircase: each step
 * indents further and hangs off a thin rule, with the performer photograph
 * behind.
 *
 * Spacing pass (TJ, 2026-08-25): the first cut set the step measure at 520px
 * inside an 1160px container, so the staircase only crossed half the section
 * and the right side read as dead space. The measure and the indents now scale
 * with the container, so the descent actually travels across it, the bodies sit
 * on one line each instead of orphaning a word, and the rules come out the same
 * height. Section padding is symmetric and the gap between beats is constant.
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

export default function WallSteps() {
  return (
    <section className="ws-section" aria-label="How Songcry works">
      <div className="ws-photo" aria-hidden="true">
        <Image
          src="/backgrounds/hero-concert-bg.png"
          alt=""
          width={1440}
          height={843}
          sizes="100vw"
        />
      </div>
      <div className="ws-scrim" aria-hidden="true" />

      <div className="ws-wrap">
        <Reveal y={24}>
          <h2 className="ws-heading">How it works</h2>
        </Reveal>

        {STEPS.map((s, i) => (
          <Reveal key={s.n} y={32} delay={0.06 * i}>
            <div className={`ws-step ws-step-${s.n}`}>
              <p className="ws-marker" aria-hidden="true">
                Step {s.n}
              </p>
              <h3 className="ws-title">{s.title}</h3>
              <p className="ws-body">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        .ws-section {
          position: relative;
          overflow: hidden;
          padding: 120px 0;
          background: rgb(8, 7, 7);
        }
        .ws-photo {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to left, black 22%, transparent 94%);
          mask-image: linear-gradient(to left, black 22%, transparent 94%);
        }
        .ws-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 62% 38%;
        }
        /* Two jobs: keep the section edges reading as one dark room, and hold a
           dark floor under the copy column so the staircase stays legible as it
           travels right into the brighter part of the frame. */
        .ws-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(to right, rgb(8, 7, 7) 10%, rgba(8, 7, 7, 0.55) 48%, transparent 76%),
            linear-gradient(to bottom, rgb(8, 7, 7), transparent 20%, transparent 80%, rgb(8, 7, 7));
        }
        .ws-wrap {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ws-heading {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 64px;
        }
        .ws-step {
          position: relative;
          padding: 4px 0 4px 28px;
          margin-bottom: 52px;
          max-width: 660px;
          border-left: 1px solid rgba(248, 25, 192, 0.45);
          transition: border-color 300ms ease;
        }
        .ws-step:hover {
          border-left-color: rgba(248, 25, 192, 0.95);
        }
        /* The descent: each beat steps further into the room. The indents are
           percentages of the container so the staircase crosses the full width
           at every desktop size instead of stopping halfway. */
        .ws-step-02 {
          margin-left: 16%;
        }
        .ws-step-03 {
          margin-left: 32%;
          margin-bottom: 0;
        }
        .ws-marker {
          font-family: var(--font-albert);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.74);
          margin: 0 0 14px;
        }
        .ws-title {
          font-family: var(--font-albert);
          font-size: clamp(28px, 2.8vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: #ffffff;
          margin: 0 0 14px;
        }
        .ws-body {
          font-family: var(--font-albert);
          font-size: 18px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.68);
          margin: 0;
        }

        @media (max-width: 1199px) {
          .ws-wrap {
            padding: 0 48px;
          }
          .ws-step {
            max-width: 600px;
          }
          .ws-step-02 {
            margin-left: 12%;
          }
          .ws-step-03 {
            margin-left: 24%;
          }
        }
        @media (max-width: 980px) {
          .ws-section {
            padding: 96px 0;
          }
          .ws-step {
            max-width: 560px;
            margin-bottom: 44px;
          }
          .ws-step-02 {
            margin-left: 8%;
          }
          .ws-step-03 {
            margin-left: 16%;
          }
        }
        @media (max-width: 817px) {
          .ws-section {
            padding: 80px 0;
          }
          .ws-wrap {
            padding: 0 24px;
          }
          .ws-heading {
            margin-bottom: 40px;
          }
          .ws-photo {
            opacity: 0.34;
            -webkit-mask-image: linear-gradient(to top, black 18%, transparent 94%);
            mask-image: linear-gradient(to top, black 18%, transparent 94%);
          }
          .ws-scrim {
            background: linear-gradient(to bottom, rgb(8, 7, 7), transparent 18%, transparent 78%, rgb(8, 7, 7));
          }
          .ws-step {
            max-width: none;
            margin-bottom: 36px;
            padding-left: 20px;
          }
          .ws-step-02, .ws-step-03 {
            margin-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ws-step {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
