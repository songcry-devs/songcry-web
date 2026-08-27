import type { Metadata } from 'next'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import Reveal from '@/components/motion/Reveal'
import WordReveal from '@/components/craft/WordReveal'
import WallScene from '@/components/sections/concepts/d/WallScene'
import WallSteps from '@/components/sections/concepts/d/WallSteps'
import CrowdBand from '@/components/sections/concepts/d/CrowdBand'
import WallClose from '@/components/sections/concepts/d/WallClose'

/**
 * Concept D — The wall. A perspective-tilted wall of complete framed phones
 * behind a floating join panel, then a page that stays in that room: the three
 * beats as a descent, the crowd band, and a defocused reprise of the wall as
 * the close.
 *
 * Forked from the shared concept components (TJ, 2026-08-25). GhostSteps,
 * PhoneTileRow and CtaBand now belong to concept A, which is the editorial
 * read. Below the hero D and A used to be the same three sections in a
 * different order, so the pick was really only a hero pick. D now owns its own
 * body: WallSteps, CrowdBand, WallClose.
 *
 * Photography is differentiated on purpose rather than applied evenly: the
 * performer sits behind WallSteps and the crowd carries CrowdBand, both already
 * live on the artists site. Nothing photographic in the hero, where the wall is
 * already the statement.
 *
 * Design-concept preview for TJ — never indexed.
 */
export const metadata: Metadata = {
  title: 'Songcry concept D · The wall',
  description: 'A floating panel over a drifting wall of framed phones. The most atmospheric of the four.',
  robots: { index: false, follow: false },
  // Each concept overrides the inherited root openGraph. Without this all four
  // unfurl as the identical homepage card, so a link pasted into Slack gives no
  // clue which concept it points at. These are review aids on a noindex page.
  openGraph: {
    type: 'website',
    title: 'Songcry concept D · The wall',
    description: 'A floating panel over a drifting wall of framed phones. The most atmospheric of the four.',
  },
}

export default function ConceptD() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        {/* ── Hero: floating panel over the scroll-reactive wall ── */}
        <section className="cd-hero" aria-label="Hero">
          <div className="cd-hero-wrap">
            <div className="cd-panel" id="join">
              <Reveal y={20}>
                <h1 className="cd-h1">
                  <WordReveal text={'This is Songcry'} />
                </h1>
                <p className="cd-sub">Free for artists. Zero ads. No pay-to-play.</p>
              </Reveal>
              <Reveal y={20} delay={0.1}>
                <JoinForm compact />
              </Reveal>
            </div>
          </div>

          <WallScene />

          <style>{`
            .cd-hero {
              position: relative;
              min-height: 880px;
              background: rgb(8, 7, 7);
              overflow: hidden;
            }
            .cd-hero-wrap {
              position: relative;
              z-index: 2;
              max-width: 1280px;
              margin: 0 auto;
              padding: 0 40px;
              min-height: 880px;
              display: flex;
              align-items: center;
            }
            .cd-panel {
              width: 100%;
              max-width: 460px;
              background: rgba(10, 9, 9, 0.82);
              backdrop-filter: blur(14px);
              -webkit-backdrop-filter: blur(14px);
              border: 1px solid rgba(255, 255, 255, 0.07);
              border-radius: 28px;
              padding: 32px;
              box-shadow: 0 40px 100px rgba(0, 0, 0, 0.65);
            }
            .cd-h1 {
              font-family: var(--font-albert);
              font-size: clamp(42px, 4.8vw, 68px);
              font-weight: 600;
              line-height: 1.02;
              letter-spacing: -0.03em;
              color: #ffffff;
              margin: 0 0 12px;
            }
            .cd-sub {
              font-family: var(--font-albert);
              font-size: 17px;
              line-height: 1.5;
              color: rgba(255, 255, 255, 0.65);
              margin: 0 0 24px;
            }

            @media (max-width: 900px) {
              .cd-hero {
                min-height: 0;
              }
              .cd-hero-wrap {
                min-height: 0;
                padding-top: 120px;
                padding-bottom: 8px;
              }
              .cd-panel {
                margin: 0 auto;
                max-width: 520px;
              }
            }
            @media (max-width: 560px) {
              .cd-hero-wrap {
                padding-left: 20px;
                padding-right: 20px;
              }
              .cd-panel {
                padding: 24px;
              }
            }
          `}</style>
        </section>

        {/* ── D-owned body ── */}
        <WallSteps />
        <CrowdBand />
        <WallClose placement="concept-d-cta" />
      </main>

      <Footer />
    </>
  )
}
