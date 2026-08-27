import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import Reveal from '@/components/motion/Reveal'
import GhostSteps from '@/components/sections/concepts/GhostSteps'
import PhoneTileRow from '@/components/sections/concepts/PhoneTileRow'
import CtaBand from '@/components/sections/concepts/CtaBand'
import QuoteBand from '@/components/sections/concepts/a/QuoteBand'

/**
 * Concept A — Sharpen. Editorial split hero (copy + form left, glowing phone
 * right) over a grain-textured stage, then the complete-phone tile strip,
 * ghost-numeral steps and the closing CTA band.
 *
 * TJ critique fixed here: the 4-tile strip previously cropped the phones at
 * the bottom. PhoneTileRow renders the COMPLETE framed phones with no fixed
 * tile height (contain, never crop).
 *
 * Design-concept preview for TJ — never indexed.
 */
export const metadata: Metadata = {
  title: 'Songcry concept A · Sharpen',
  description: 'The homepage you have now, tightened. Editorial split hero with the copy and form on the left, the phone on the right.',
  robots: { index: false, follow: false },
  // Each concept overrides the inherited root openGraph. Without this all four
  // unfurl as the identical homepage card, so a link pasted into Slack gives no
  // clue which concept it points at. These are review aids on a noindex page.
  openGraph: {
    type: 'website',
    title: 'Songcry concept A · Sharpen',
    description: 'The homepage you have now, tightened. Editorial split hero with the copy and form on the left, the phone on the right.',
  },
}

const TILES = [
  {
    src: '/concepts/feed-la-drummer.png',
    alt: 'The Los Angeles feed playing Wonderful Life',
    caption: 'Every city has its own feed',
  },
  {
    src: '/concepts/filter-sheet.png',
    alt: 'The filter sheet with city and genre chips',
    caption: 'Filter by city and genre',
  },
  {
    src: '/concepts/artist-profile-rose-gold.png',
    alt: 'Rose Gold’s artist profile',
    caption: 'All your music in one place',
  },
  {
    src: '/concepts/upload-editor.png',
    alt: 'The upload editor with waveform sync',
    caption: 'Bring your song to life',
  },
]

export default function ConceptA() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        <section className="ca-hero" aria-label="Hero">
          {/* Stage light + film grain, both decorative */}
          <div className="ca-light" aria-hidden="true" />
          <svg className="ca-grain" aria-hidden="true">
            <filter id="ca-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#ca-noise)" />
          </svg>

          <div className="ca-hero-wrap">
            <div className="ca-hero-copy">
              <Reveal y={22}>
                <p className="ca-eyebrow">Invite-only beta</p>
                <h1 className="ca-h1">Music spreads through fans</h1>
              </Reveal>
              <Reveal y={22} delay={0.08}>
                <p className="ca-sub">
                  Songcry is where fans decide what rises, and artists see momentum by city.
                </p>
              </Reveal>

              <Reveal y={22} delay={0.16}>
                <div className="ca-form" id="join">
                  <JoinForm compact />
                </div>
              </Reveal>
            </div>

            <div className="ca-hero-phone">
              <div className="ca-phone-glow" aria-hidden="true" />
              <Image
                className="ca-phone-img"
                src="/framer/hero-phone-feed.png"
                alt="The Songcry feed playing Thank You by Pseudo Black in the Los Angeles feed"
                width={690}
                height={1330}
                priority
                sizes="(max-width: 980px) 76vw, 440px"
              />
            </div>
          </div>

          <style>{`
            .ca-hero {
              position: relative;
              background: rgb(8, 7, 7);
              overflow: hidden;
            }
            .ca-light {
              position: absolute;
              inset: 0;
              background:
                radial-gradient(900px 600px at 78% 12%, rgba(255, 255, 255, 0.045), transparent 60%),
                radial-gradient(700px 500px at 8% 90%, rgba(248, 25, 192, 0.05), transparent 60%);
              pointer-events: none;
            }
            .ca-grain {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
              mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
            }
            .ca-hero-wrap {
              position: relative;
              z-index: 1;
              max-width: 1240px;
              margin: 0 auto;
              padding: 152px 40px 104px;
              display: grid;
              grid-template-columns: 1.05fr 0.95fr;
              gap: 72px;
              align-items: center;
            }
            .ca-eyebrow {
              font-family: var(--font-albert);
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.4);
              margin: 0 0 24px;
            }
            .ca-h1 {
              font-family: var(--font-albert);
              font-size: clamp(48px, 5.6vw, 82px);
              font-weight: 600;
              line-height: 1.0;
              letter-spacing: -0.03em;
              color: #ffffff;
              margin: 0 0 24px;
              max-width: 9em;
            }
            .ca-sub {
              font-family: var(--font-albert);
              font-size: 18px;
              line-height: 1.55;
              color: rgba(255, 255, 255, 0.65);
              max-width: 460px;
              margin: 0 0 36px;
            }
            .ca-form {
              max-width: 420px;
            }
            .ca-hero-phone {
              position: relative;
              display: flex;
              justify-content: center;
            }
            .ca-phone-glow {
              position: absolute;
              width: 130%;
              aspect-ratio: 1;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: radial-gradient(closest-side, rgba(248, 25, 192, 0.16), rgba(248, 25, 192, 0.05) 55%, transparent 75%);
              pointer-events: none;
            }
            .ca-phone-img {
              position: relative;
              width: min(440px, 100%);
              height: auto;
            }

            @media (max-width: 1199px) {
              .ca-hero-wrap {
                padding: 140px 48px 88px;
                gap: 48px;
              }
            }
            @media (max-width: 980px) {
              .ca-hero-wrap {
                grid-template-columns: 1fr;
                gap: 56px;
              }
              .ca-phone-img {
                width: min(360px, 76vw);
              }
            }
            @media (max-width: 817px) {
              .ca-hero-wrap {
                padding: 120px 24px 64px;
              }
              .ca-h1 {
                font-size: 44px;
              }
              .ca-form {
                max-width: none;
              }
            }
          `}</style>
        </section>

        <PhoneTileRow tiles={TILES} />
        <QuoteBand />
        <GhostSteps />
        <CtaBand placement="concept-a-cta" />
      </main>

      <Footer />
    </>
  )
}
