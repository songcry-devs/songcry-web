import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import Hero from '@/components/sections/home/Hero'
import Download from '@/components/sections/home/Download'
import WordReveal from '@/components/craft/WordReveal'
import HoldingModule from '@/components/craft/HoldingModule'
import DriftGallery from '@/components/craft/DriftGallery'

/**
 * The homepage, rebuilt with the devices measured off Apple.
 *
 * Jack, via TJ: our pages read as recycled modules. He was right, and the shape
 * of it was that the page was THIN. Hero, three steps, CTA is the skeleton under
 * every SaaS template, which is why it read as off-the-shelf no matter how good
 * the words were. Apple Music is 13,021px and one iPhone 17 Pro module holds the
 * viewport for 9,300px on its own. This page was 2,600px in three blocks.
 *
 * Devices now on it, from docs/research/2026-08-27-high-end-web-craft-teardown.md:
 *
 *  - HoldingModule replaces the three static rows. The page stops and the CONTENT
 *    advances, one beat at a time, with a rail showing position. Same locked copy.
 *  - DriftGallery: nine real beta screens in three columns at three rates, which
 *    is how Apple gets depth without 3D. Real screens, not mockups.
 *  - Display lines are split into words so a headline arrives as a sentence being
 *    spoken rather than a block that faded in.
 *  - The ground CHANGES section to section. The old page was one unbroken dark
 *    field, so every section carried identical weight and nothing was emphasised.
 *  - Sections butt at zero gap, each owning its own vertical space. Measured on
 *    Apple as 0, 0, 0, 0, 0, 0, 0, and it makes the padding-stacking bug of
 *    2026-08-26 impossible by construction.
 *
 * COLOUR: emphasis is a VALUE step, never the brand colour. Measured, Apple Music
 * ships zero two-tone headings and Linear builds its hierarchy out of four greys.
 * The turn below recedes its setup and lands its payoff in white. Brand pink
 * appears on this page as the progress rail and the buttons. Never in a sentence.
 *
 * KEPT DELIBERATELY: Hero and Download. Hero carries the signup form and is the
 * conversion surface; Download carries the App Store badge and the floor grid.
 * This is a craft pass on a page that works, not a rewrite of what it does.
 *
 * All copy already ran on the live site or in the approved concept set. Nothing
 * here needs a copy ruling.
 *
 * Superseded: fix/type-scale-craft-pass. The steps section it corrected is no
 * longer on the homepage.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export const metadata = { alternates: { canonical: '/' } }

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main" className="home-craft">
        <Hero />
        <HoldingModule track="300vh" />
        <DriftGallery />

        {/* The turn. Emphasis by value: the setup recedes, the payoff lands. */}
        <section className="hc-turn" aria-label="Why we built Songcry">
          <div className="hc-turn-inner">
            <blockquote className="hc-quote">
              <span className="hc-quote-recede">
                <WordReveal text={'Making the song isn’t the hard part anymore.'} stagger={0.04} />
              </span>
              <span className="hc-quote-land">
                <WordReveal text={'Being heard is.'} delay={0.28} stagger={0.05} />
              </span>
            </blockquote>
          </div>
        </section>

        <Download />
      </main>
      <Footer />

      <style>{`
        .home-craft {
          /* Ground ramp. Near-black, never pure black, and it CHANGES per section. */
          --e-ground-0: #080707;
          --e-ground-1: #0e0d0d;
          --e-ground-2: #040404;

          /* Value ramp. This carries hierarchy, so colour never has to. */
          --e-t1: #ffffff;
          --e-t2: rgba(255, 255, 255, 0.74);
          --e-t3: rgba(255, 255, 255, 0.46);
          --e-t4: rgba(255, 255, 255, 0.3);

          --e-mark: #f819c0;

          background: var(--e-ground-0);
        }

        .hc-turn {
          background: var(--e-ground-0);
          padding: 152px 0;
        }
        .hc-turn-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hc-quote {
          font-family: var(--font-albert);
          font-size: clamp(28px, 4.2vw, 58px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin: 0;
          max-width: 20ch;
        }
        .hc-quote-recede {
          display: block;
          color: var(--e-t3);
        }
        .hc-quote-land {
          display: block;
          color: var(--e-t1);
        }

        @media (max-width: 980px) {
          .hc-turn {
            padding: 108px 0;
          }
          .hc-turn-inner {
            padding: 0 28px;
          }
        }
      `}</style>
    </>
  )
}
