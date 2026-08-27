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
 * COPY RULE, do not undo: the word local never appears on this site, even
 * though the product is geolocation based. The rule is recorded on
 * app/artist/page.tsx next to the Songcry capitalisation rule. The brand voice
 * bank does carry an anchor line using that word; the bank is a resource, and
 * TJ is the arbiter. He ruled against it here on 2026-08-25 because local
 * artist reads as small time. The city is the brand word, not local.
 *
 * The remaining lines are approved anchor lines checked against the NEVER SAY
 * list. No counts, no guarantees, no pricing. Deliberately does not reuse the
 * step-02 title, which WallSteps already carries as locked copy.
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
            Discovery starts with the people
            <br />
            close enough to show up.
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
          min-height: 560px;
          display: flex;
          align-items: center;
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
            linear-gradient(to top, rgba(8, 7, 7, 0.96) 6%, rgba(8, 7, 7, 0.5) 50%, rgba(8, 7, 7, 0.9)),
            radial-gradient(900px 500px at 20% 70%, rgba(248, 25, 192, 0.12), transparent 70%);
        }
        .cb2-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 104px 40px;
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
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.06;
          color: #ffffff;
          margin: 0 0 56px;
        }
        /* Three even columns under one rule. No vertical dividers: the claims
           set different line counts, so dividers rendered as ragged stubs. */
        .cb2-claims {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 48px;
          row-gap: 20px;
          list-style: none;
          margin: 0;
          padding: 28px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }
        .cb2-claim {
          font-family: var(--font-albert);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
          max-width: 30ch;
        }

        @media (max-width: 1199px) {
          .cb2-wrap {
            padding: 96px 48px;
          }
          .cb2-claims {
            column-gap: 32px;
          }
        }
        @media (max-width: 980px) {
          .cb2-claims {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 24px;
          }
        }
        @media (max-width: 817px) {
          .cb2-section {
            min-height: 0;
          }
          .cb2-wrap {
            padding: 80px 24px;
          }
          .cb2-heading {
            margin-bottom: 36px;
          }
          .cb2-photo img {
            object-position: 50% 35%;
          }
          .cb2-claims {
            grid-template-columns: 1fr;
            row-gap: 18px;
            padding-top: 22px;
          }
          .cb2-claim {
            max-width: none;
          }
        }
      `}</style>
    </section>
  )
}
