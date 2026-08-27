import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import Reveal from '@/components/motion/Reveal'
import WordReveal from '@/components/sections/concepts/e/WordReveal'
import HoldingModule from '@/components/sections/concepts/e/HoldingModule'
import DriftGallery from '@/components/sections/concepts/e/DriftGallery'

/**
 * Concept E — the craft pass.
 *
 * Built 2026-08-27 after Jack, via TJ, said our pages read as recycled modules
 * and named Apple as the bar, then after TJ pushed back that studying font sizes
 * was not the point: the devices are.
 *
 * IT USES THE LIVE HOMEPAGE COPY, WORD FOR WORD. That is deliberate. Every line
 * here already runs on songcry.app or in the approved concept set, so the only
 * variable between this page and the live one is craft. Nothing here needs a copy
 * ruling and nothing is being argued with new words.
 *
 * What is different is the devices, from the measured catalogue in
 * docs/research/2026-08-27-high-end-web-craft-teardown.md:
 *
 *  1. A module that HOLDS the reader (Apple ships this as all-access-pass, up to
 *     9,300px for a single idea). The three beats stop being three rows to scan
 *     and become a sequence you are walked through.
 *  2. A multi-rate gallery: three columns of real beta screens travelling at
 *     three different rates, which is how Apple gets depth without 3D.
 *  3. Display text split into words so a headline arrives as a sentence being
 *     spoken rather than a block that faded in.
 *  4. The ground changes under you, section to section. The live page is one
 *     unbroken dark field, so every section carries identical weight and nothing
 *     is ever emphasised.
 *  5. Sections butt at ZERO gap and each owns all its own vertical space. That
 *     is Apple measured (gaps of 0, 0, 0, 0, 0, 0, 0) and it makes the padding
 *     stacking bug of 2026-08-26 impossible by construction.
 *
 * THE COLOUR RULE, which is the specific thing TJ called the AI look:
 * emphasis comes from VALUE, never from the brand colour. Measured, Apple Music
 * runs zero two-tone headings and zero gradient text; Linear builds its whole
 * hierarchy from four greys. Our own concept A coloured the punchline of a quote
 * pink, which is the tell. Here the turn is emphasised by making the first line
 * recede down the value ramp and the second land at full white. Pink appears
 * once on this page, as a one-pixel progress rail. It is punctuation, never a
 * sentence.
 *
 * What is still missing, honestly: footage. Apple's signature device drives a
 * video playhead from scroll position, measured on Vision Pro at 0.67s to 3.49s
 * across one pinned block. HoldingModule is built on that exact mechanism with
 * opacity standing in for currentTime, so when Jack's footage lands the clip
 * drops into the frame and binds to the same progress value.
 *
 * Design-concept preview. Never indexed.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export const metadata: Metadata = {
  title: 'Songcry concept E · The craft pass',
  description:
    'The live homepage copy, rebuilt with the devices measured off Apple. Same words, different craft.',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    title: 'Songcry concept E · The craft pass',
    description:
      'The live homepage copy, rebuilt with the devices measured off Apple. Same words, different craft.',
  },
}

export default function ConceptE() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main" className="ce-root">
        {/* ── Opening. One line, arriving word by word, with room to land. ── */}
        <section className="ce-open" aria-label="Songcry">
          <div className="ce-open-inner">
            <Reveal y={16}>
              <p className="ce-eyebrow">Invite-only beta</p>
            </Reveal>

            <h1 className="ce-h1">
              <WordReveal text={'Music spreads\nthrough fans'} delay={0.12} />
            </h1>

            <Reveal y={18} delay={0.62}>
              <p className="ce-lead">
                Songcry is where fans decide what rises, and artists see momentum by city.
              </p>
            </Reveal>

            <Reveal y={18} delay={0.72}>
              <div className="ce-open-actions">
                <a className="ce-btn" href="/join">Join the beta</a>
                <a
                  className="ce-quiet"
                  href="https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get the app
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── The module that holds you. Three beats as a sequence, not a list. ── */}
        <HoldingModule />

        {/* ── Real beta screens, three columns at three rates. ── */}
        <DriftGallery />

        {/* ── The turn. Emphasis by VALUE, never by colour. ── */}
        <section className="ce-turn" aria-label="Why we built Songcry">
          <div className="ce-turn-inner">
            <blockquote className="ce-quote">
              <span className="ce-quote-recede">
                <WordReveal text={'Making the song isn’t the hard part anymore.'} stagger={0.04} />
              </span>
              <span className="ce-quote-land">
                <WordReveal text={'Being heard is.'} delay={0.3} stagger={0.05} />
              </span>
            </blockquote>
          </div>
        </section>

        {/* ── Close. ── */}
        <section className="ce-close" aria-label="Join Songcry">
          <div className="ce-close-inner">
            <h2 className="ce-h2">
              <WordReveal text={'Join early and discover what’s rising near you.'} stagger={0.04} />
            </h2>
            <Reveal y={16} delay={0.36}>
              <p className="ce-lead ce-lead-center">
                The beta is live. Artists can join now, and fan access is coming soon.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.46}>
              <a
                className="ce-badge"
                href="https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Songcry on the App Store"
              >
                <Image
                  src="/framer/appstore-badge.svg"
                  alt="Download on the App Store"
                  width={162}
                  height={54}
                  style={{ display: 'block' }}
                />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .ce-root {
          /* Ground ramp. Near-black, never pure black, and it CHANGES per section. */
          --e-ground-0: #0a0909;
          --e-ground-1: #100f0f;
          --e-ground-2: #050505;

          /* Value ramp. This carries hierarchy. Emphasis is a step on this ramp,
             not a change of hue. */
          --e-t1: #ffffff;
          --e-t2: rgba(255, 255, 255, 0.74);
          --e-t3: rgba(255, 255, 255, 0.46);
          --e-t4: rgba(255, 255, 255, 0.3);

          /* The one place brand colour is allowed on this page: a rule, a marker,
             a button. Never a sentence. */
          --e-mark: #f819c0;

          background: var(--e-ground-0);
        }

        /* ── Opening ── */
        .ce-open {
          background: var(--e-ground-0);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 168px 0 120px;
        }
        .ce-open-inner {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ce-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--e-t4);
          margin: 0 0 40px;
        }
        .ce-h1 {
          font-family: var(--font-albert);
          font-size: clamp(46px, 8.2vw, 116px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: var(--e-t1);
          margin: 0 0 40px;
          max-width: 15ch;
        }
        .ce-lead {
          font-family: var(--font-albert);
          font-size: clamp(17px, 1.6vw, 22px);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--e-t3);
          max-width: 46ch;
          margin: 0;
        }
        .ce-lead-center {
          margin: 0 auto;
          text-align: center;
        }
        .ce-open-actions {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        .ce-btn {
          display: inline-block;
          background: var(--e-mark);
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-albert);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 15px 30px;
          border-radius: 999px;
          transition: opacity 180ms ease;
        }
        .ce-btn:hover {
          opacity: 0.9;
        }
        .ce-quiet {
          font-family: var(--font-albert);
          font-size: 16px;
          font-weight: 500;
          color: var(--e-t2);
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
          padding-bottom: 3px;
          transition: color 180ms ease, border-color 180ms ease;
        }
        .ce-quiet:hover {
          color: var(--e-t1);
          border-bottom-color: rgba(255, 255, 255, 0.5);
        }

        /* ── The turn ── */
        .ce-turn {
          background: var(--e-ground-0);
          padding: 168px 0;
        }
        .ce-turn-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ce-quote {
          font-family: var(--font-albert);
          font-size: clamp(30px, 4.4vw, 62px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin: 0;
          max-width: 20ch;
        }
        .ce-quote-recede {
          display: block;
          color: var(--e-t3);
        }
        .ce-quote-land {
          display: block;
          color: var(--e-t1);
        }

        /* ── Close ── */
        .ce-close {
          background: var(--e-ground-1);
          padding: 156px 0 168px;
          text-align: center;
        }
        .ce-close-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ce-h2 {
          font-family: var(--font-albert);
          font-size: clamp(30px, 3.6vw, 52px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--e-t1);
          margin: 0 0 26px;
          max-width: 20ch;
        }
        .ce-badge {
          display: inline-block;
          margin-top: 40px;
          transition: opacity 180ms ease;
        }
        .ce-badge:hover {
          opacity: 0.88;
        }

        @media (max-width: 980px) {
          .ce-open {
            padding: 132px 0 96px;
            min-height: 92vh;
          }
          .ce-open-inner,
          .ce-turn-inner,
          .ce-close-inner {
            padding: 0 28px;
          }
          .ce-h1 {
            max-width: 12ch;
            margin-bottom: 32px;
          }
          .ce-turn {
            padding: 120px 0;
          }
          .ce-close {
            padding: 112px 0 120px;
          }
          .ce-open-actions {
            margin-top: 40px;
            gap: 22px;
          }
        }
      `}</style>
    </>
  )
}
