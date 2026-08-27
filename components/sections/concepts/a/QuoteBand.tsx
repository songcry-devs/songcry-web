import Reveal from '@/components/motion/Reveal'

/**
 * Concept A editorial pause.
 *
 * Was MakerBand: the same line set beside a photograph of someone at a home
 * studio setup. TJ, 2026-08-26: that picture felt random and too pronounced,
 * and he was right. It was a large, prominent photograph of a stranger with no
 * connection to Songcry, which reads as stock filler on a page whose whole
 * argument is real artists and real listeners. The available alternatives were
 * already spoken for by B and D, and none of them were of anyone we know.
 *
 * So the band keeps the thing that was actually working, the line, and drops
 * the thing that was not. A now carries no photography, which is fine: its
 * differentiator is the editorial treatment and the ghost numerals, not a
 * picture. If owned photography of a real Songcry artist ever exists, this is
 * the section it belongs in.
 *
 * Copy is one approved anchor line from the brand voice canon. The word local
 * never appears on this site, see app/artist/page.tsx.
 *
 * The turn used to be set in brand pink, which is the single clearest AI tell on
 * the site: a two-line statement with the punchline coloured in. TJ named it
 * 2026-08-27. Measured, Apple Music ships ZERO two-tone headings and Linear
 * builds its whole hierarchy out of four greys. So the emphasis is now a VALUE
 * step: the setup recedes to 42 percent white and the turn lands at full white.
 * Same emphasis, more of it, no hue.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export default function QuoteBand() {
  return (
    <section className="qb-section" aria-label="Why we built Songcry">
      <div className="qb-wrap">
        <Reveal y={24}>
          <p className="qb-eyebrow">Why we built it</p>
        </Reveal>
        <Reveal y={30} delay={0.08}>
          <blockquote className="qb-quote">
            Making the song isn’t the hard part anymore.
            <br />
            <span className="qb-turn">Being heard is.</span>
          </blockquote>
        </Reveal>
      </div>

      <style>{`
        .qb-section {
          background: #040404;
          padding: 120px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .qb-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .qb-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin: 0 0 36px;
        }
        .qb-quote {
          font-family: var(--font-albert);
          font-size: clamp(32px, 4.4vw, 62px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: rgba(255, 255, 255, 0.42);
          margin: 0;
          max-width: 20ch;
        }
        /* The turn is the whole point of the line, so it gets the emphasis. */
        .qb-turn {
          color: #ffffff;
        }

        @media (max-width: 1199px) {
          .qb-wrap {
            padding: 0 48px;
          }
        }
        @media (max-width: 980px) {
          .qb-section {
            padding: 96px 0;
          }
        }
        @media (max-width: 817px) {
          .qb-section {
            padding: 80px 0;
          }
          .qb-wrap {
            padding: 0 24px;
          }
          .qb-eyebrow {
            margin-bottom: 24px;
          }
          .qb-quote {
            max-width: none;
          }
        }
      `}</style>
    </section>
  )
}
