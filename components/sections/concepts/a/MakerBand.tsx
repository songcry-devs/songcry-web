import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

/**
 * Concept A editorial band: the artist the product is for.
 *
 * A is the editorial read, so this is deliberately NOT the full-bleed treatment
 * concept D uses for its crowd band. The photograph is contained, ruled and set
 * beside a pull quote, the way a magazine sets a picture against a standfirst.
 * Same photography decision made four different ways across the concepts: A the
 * maker, B the city, C nothing because the product is its identity, D the room.
 *
 * Copy is one approved anchor line from the brand voice canon. The word local
 * never appears on this site, see app/artist/page.tsx.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export default function MakerBand() {
  return (
    <section className="mb-section" aria-label="Why we built Songcry">
      <div className="mb-wrap">
        <Reveal y={32}>
          <figure className="mb-figure">
            <Image
              src="/framer/needs-card-4.jpg"
              alt="An independent artist working at a home studio setup"
              width={1080}
              height={720}
              sizes="(max-width: 980px) 100vw, 56vw"
            />
          </figure>
        </Reveal>

        <Reveal y={32} delay={0.1}>
          <div className="mb-copy">
            <p className="mb-eyebrow">Why we built it</p>
            <blockquote className="mb-quote">
              Making the song isn’t the hard part anymore. Being heard is.
            </blockquote>
          </div>
        </Reveal>
      </div>

      <style>{`
        .mb-section {
          padding: 120px 0;
        }
        .mb-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 64px;
          align-items: center;
        }
        .mb-figure {
          margin: 0;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.09);
        }
        .mb-figure img {
          display: block;
          width: 100%;
          height: auto;
        }
        .mb-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .mb-quote {
          font-family: var(--font-albert);
          font-size: clamp(28px, 2.9vw, 40px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.14;
          color: #ffffff;
          margin: 0;
        }

        @media (max-width: 1199px) {
          .mb-wrap {
            padding: 0 48px;
            gap: 48px;
          }
        }
        @media (max-width: 980px) {
          .mb-section {
            padding: 96px 0;
          }
          .mb-wrap {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 817px) {
          .mb-section {
            padding: 80px 0;
          }
          .mb-wrap {
            padding: 0 24px;
          }
          .mb-eyebrow {
            margin-bottom: 20px;
            padding-bottom: 20px;
          }
        }
      `}</style>
    </section>
  )
}
