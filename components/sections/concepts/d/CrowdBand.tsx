import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

/**
 * Concept D second act: the human half.
 *
 * Replaces the shared PhoneTileRow for D. The critique this answers is that D
 * already shows eight phones in the hero wall, so following it with four more
 * phones in cards showed the same thing twice. The listeners are the half the
 * hero cannot show, so this band is a full-bleed crowd photograph instead, and
 * PhoneTileRow now belongs to concept A.
 *
 * Copy: every line here is an approved anchor line from the brand voice canon,
 * checked against the NEVER SAY list. No counts, no guarantees, no pricing.
 * The heading and claim three are anchor lines verbatim; claim one is the
 * approved replacement for the retired fan-powered line; claim two states the
 * host mechanic, which is live. Deliberately does NOT reuse the step-02 title,
 * which WallSteps already carries as locked copy.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const CLAIMS = [
  'Driven by real listeners, not algorithms.',
  'Host a song and you become part of how it travels.',
  'Nobody pays to be heard, and ranking is not for sale.',
]

export default function CrowdBand() {
  return (
    <section className="cb2-section" aria-label="The people who carry it">
      <div className="cb2-photo" aria-hidden="true">
        <Image
          src="/framer/artist-band-2.png"
          alt=""
          width={3102}
          height={2006}
          sizes="100vw"
        />
      </div>
      <div className="cb2-scrim" aria-hidden="true" />

      <div className="cb2-wrap">
        <Reveal y={28}>
          <p className="cb2-eyebrow">The people who carry it</p>
          <h2 className="cb2-heading">
            Music taste is local.
            <br />
            Now discovery is too.
          </h2>
        </Reveal>

        <Reveal y={24} delay={0.1}>
          <ul className="cb2-claims">
            {CLAIMS.map((c) => (
              <li className="cb2-claim" key={c}>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <style>{`
        .cb2-section {
          position: relative;
          overflow: hidden;
          min-height: 620px;
          display: flex;
          align-items: flex-end;
          background: rgb(8, 7, 7);
        }
        .cb2-photo {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cb2-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 42%;
        }
        .cb2-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(to top, rgba(8, 7, 7, 0.96) 12%, rgba(8, 7, 7, 0.55) 55%, rgba(8, 7, 7, 0.85)),
            radial-gradient(900px 500px at 20% 80%, rgba(248, 25, 192, 0.12), transparent 70%);
        }
        .cb2-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 120px 40px 72px;
        }
        .cb2-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 20px;
        }
        .cb2-heading {
          font-family: var(--font-albert);
          font-size: clamp(38px, 4.6vw, 64px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.04;
          color: #ffffff;
          margin: 0 0 48px;
        }
        .cb2-claims {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }
        .cb2-claim {
          font-family: var(--font-albert);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.85);
          padding: 24px 32px 0 0;
          border-right: 1px solid rgba(255, 255, 255, 0.12);
        }
        .cb2-claim:not(:first-child) {
          padding-left: 32px;
        }
        .cb2-claim:last-child {
          border-right: none;
          padding-right: 0;
        }

        @media (max-width: 1199px) {
          .cb2-wrap {
            padding: 112px 48px 64px;
          }
        }
        @media (max-width: 817px) {
          .cb2-section {
            min-height: 0;
          }
          .cb2-wrap {
            padding: 88px 24px 56px;
          }
          .cb2-heading {
            margin-bottom: 32px;
          }
          .cb2-photo img {
            object-position: 50% 35%;
          }
          .cb2-claims {
            grid-template-columns: 1fr;
          }
          .cb2-claim {
            padding: 18px 0;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }
          .cb2-claim:not(:first-child) {
            padding-left: 0;
          }
          .cb2-claim:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  )
}
