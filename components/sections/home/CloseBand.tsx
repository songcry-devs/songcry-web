import StoreBadges from '@/components/ui/StoreBadges'
import Reveal from '@/components/motion/Reveal'
import WordReveal from '@/components/craft/WordReveal'

/**
 * The closing band, brought over from concept E.
 *
 * TJ, 2026-08-27, comparing the live page against concept E: "those two sections
 * down at the bottom work better than our current landing page." He is right, and
 * the reason is spacing and a seam. The old Download section sat under a purple
 * glow and a perspective floor grid inherited from the Framer site, with the
 * headline, the subline and the badge crammed into the last 380px of the page.
 * Here the ground lifts, which draws a real line between the turn and the close,
 * and the block gets room to land.
 *
 * The headline wraps to two lines on purpose. A 20ch measure at this size reads as
 * a statement; the single 42px line it replaces read as a caption.
 *
 * REPLACES Download.tsx, which stays in the tree unused. Reverting to it is NOT a one-line
 * swap: whatever section lands here must still carry id="get-the-app" and both store badges,
 * or /get breaks for computers (the anchor and the Play badge vanish). What goes with a
 * revert: the purple glow and the floor grid. That is brand furniture from the old site, and
 * it is the one thing to put back first if this ever feels too bare.
 *
 * Copy is unchanged. Since 2026-09-25 the band shows both official store badges, each tracked
 * and tagged (the old App Store badge was a bare link that fired no conversion), and it is the
 * #get-the-app target that /get sends computers to.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export default function CloseBand() {
  return (
    <section className="cbnd-section" id="get-the-app" aria-label="Join Songcry">
      <div className="cbnd-inner">
        <h2 className="cbnd-heading">
          <WordReveal text={'Join early and discover what’s rising near you.'} stagger={0.04} />
        </h2>

        <Reveal y={16} delay={0.36}>
          <p className="cbnd-sub">
            The beta is live. Artists can join now, and fan access is coming soon.
          </p>
        </Reveal>

        <Reveal y={16} delay={0.46}>
          <StoreBadges placement="home-close" className="cbnd-badges" />
        </Reveal>
      </div>

      <style>{`
        .cbnd-section {
          background: var(--e-ground-1);
          padding: 156px 0 168px;
          text-align: center;
        }
        .cbnd-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cbnd-heading {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3.6vw, 52px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--e-t1);
          margin: 0 0 26px;
          max-width: 20ch;
        }
        .cbnd-sub {
          font-family: var(--font-albert);
          font-size: clamp(17px, 1.6vw, 22px);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--e-t3);
          max-width: 46ch;
          margin: 0 auto;
        }
        .cbnd-badges {
          margin-top: 40px;
          justify-content: center;
        }

        @media (max-width: 980px) {
          .cbnd-section {
            padding: 112px 0 120px;
          }
          .cbnd-inner {
            padding: 0 28px;
          }
        }
      `}</style>
    </section>
  )
}
