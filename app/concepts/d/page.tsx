import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import GhostSteps from '@/components/sections/concepts/GhostSteps'
import PhoneTileRow from '@/components/sections/concepts/PhoneTileRow'
import CtaBand from '@/components/sections/concepts/CtaBand'

/**
 * Concept D — The wall. A perspective-tilted wall of complete framed phones
 * drifting slowly behind a floating join panel, then a full page underneath:
 * ghost-numeral how-it-works, a complete-phone tile row with captions, and
 * the closing CTA band.
 *
 * TJ critiques fixed here: the approved wall hero now leads a COMPLETE page
 * instead of standing alone. The wall uses complete phones with a subtle CSS
 * drift (disabled under prefers-reduced-motion) and one pink-glow tile.
 *
 * Design-concept preview for TJ — never indexed.
 */
export const metadata: Metadata = {
  title: 'Songcry concept D',
  robots: { index: false, follow: false },
}

const WALL_COL_A = [
  { src: '/concepts/feed-la-drummer.png', glow: false },
  { src: '/concepts/feed-thank-you.png', glow: true },
  { src: '/concepts/artist-profile-rose-gold.png', glow: false },
  { src: '/concepts/upload-picker.png', glow: false },
]

const WALL_COL_B = [
  { src: '/concepts/filter-sheet.png', glow: false },
  { src: '/concepts/feed-who-am-i.png', glow: false },
  { src: '/concepts/upload-editor.png', glow: false },
  { src: '/concepts/feed-baltimore.png', glow: false },
]

const TILES = [
  {
    src: '/concepts/feed-thank-you.png',
    alt: 'The Songcry feed playing Thank You by Pseudo Black in the Los Angeles feed',
    caption: 'Your music starts in your city',
  },
  {
    src: '/concepts/feed-baltimore.png',
    alt: 'The Baltimore feed playing Space Jam by BRM Stuntin',
    caption: 'Every city has its own feed',
  },
  {
    src: '/concepts/feed-who-am-i.png',
    alt: 'Song title and lyric caption in the feed',
    caption: 'Hear what fans think',
  },
  {
    src: '/concepts/artist-profile-rose-gold.png',
    alt: 'Rose Gold’s artist profile',
    caption: 'All your music in one place',
  },
]

function WallColumn({ tiles, className }: { tiles: { src: string; glow: boolean }[]; className: string }) {
  return (
    <div className={className}>
      {tiles.map((t) => (
        <div className={t.glow ? 'cd-tile cd-tile-glow' : 'cd-tile'} key={t.src}>
          <Image src={t.src} alt="" width={380} height={732} sizes="(max-width: 900px) 44vw, 300px" />
        </div>
      ))}
    </div>
  )
}

export default function ConceptD() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        {/* ── Hero: floating panel over the drifting wall ── */}
        <section className="cd-hero" aria-label="Hero">
          <div className="cd-hero-wrap">
            <div className="cd-panel" id="join">
              <h1 className="cd-h1">This is Songcry</h1>
              <p className="cd-sub">Free for artists. Zero ads. No pay-to-play.</p>
              <JoinForm compact />
            </div>
          </div>

          <div className="cd-scene" aria-hidden="true">
            <div className="cd-wall">
              <WallColumn tiles={WALL_COL_A} className="cd-col cd-col-a" />
              <WallColumn tiles={WALL_COL_B} className="cd-col cd-col-b" />
            </div>
          </div>

          <div className="cd-fade cd-fade-t" aria-hidden="true" />
          <div className="cd-fade cd-fade-b" aria-hidden="true" />

          <style>{`
            .cd-hero {
              position: relative;
              min-height: 880px;
              background: rgb(8, 7, 7);
              overflow: hidden;
            }

            /* ── The wall ── */
            .cd-scene {
              position: absolute;
              top: -160px;
              right: -24px;
              width: 62%;
              height: calc(100% + 320px);
              perspective: 1600px;
              z-index: 0;
            }
            .cd-wall {
              display: flex;
              gap: 24px;
              justify-content: flex-end;
              transform: rotateY(-8deg) rotateX(4deg);
              transform-origin: 50% 50%;
            }
            .cd-col {
              display: flex;
              flex-direction: column;
              gap: 24px;
              width: 300px;
              flex-shrink: 0;
            }
            .cd-col-a {
              animation: cd-drift-a 18s ease-in-out infinite;
            }
            .cd-col-b {
              margin-top: -170px;
              animation: cd-drift-b 23s ease-in-out infinite;
            }
            @keyframes cd-drift-a {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-26px); }
            }
            @keyframes cd-drift-b {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(22px); }
            }
            @media (prefers-reduced-motion: reduce) {
              .cd-col-a, .cd-col-b {
                animation: none;
              }
            }
            .cd-tile {
              background: #121212;
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 24px;
              padding: 12px;
              box-shadow: 0 32px 64px rgba(0, 0, 0, 0.55);
              transition: border-color 240ms ease;
            }
            .cd-tile:hover {
              border-color: rgba(255, 255, 255, 0.28);
            }
            .cd-tile img {
              display: block;
              width: 100%;
              height: auto;
              border-radius: 14px;
            }
            .cd-tile-glow {
              border-color: rgba(248, 25, 192, 0.55);
              box-shadow: 0 0 90px rgba(248, 25, 192, 0.3), 0 32px 64px rgba(0, 0, 0, 0.55);
            }
            .cd-tile-glow:hover {
              border-color: rgba(248, 25, 192, 0.8);
            }

            /* ── Edge fades ── */
            .cd-fade {
              position: absolute;
              left: 0;
              right: 0;
              pointer-events: none;
              z-index: 1;
            }
            .cd-fade-t {
              top: 0;
              height: 120px;
              background: linear-gradient(rgb(8, 7, 7), transparent);
            }
            .cd-fade-b {
              bottom: 0;
              height: 200px;
              background: linear-gradient(transparent, rgb(8, 7, 7) 92%);
            }

            /* ── The floating panel ── */
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
              font-size: clamp(36px, 3.6vw, 50px);
              font-weight: 700;
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

            /* ── Responsive ── */
            @media (max-width: 1080px) {
              .cd-scene {
                width: 72%;
                right: -160px;
              }
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
              .cd-scene {
                position: relative;
                top: auto;
                right: auto;
                width: 100%;
                height: 540px;
                overflow: hidden;
                margin-top: 24px;
              }
              .cd-wall {
                justify-content: center;
                transform: rotateY(-8deg) rotateX(4deg) scale(0.82);
                /* Pull the wall up so the pink-glow tile sits inside the
                   visible window on phone instead of below the fade. */
                margin-top: -200px;
              }
              .cd-col {
                width: 44vw;
                max-width: 280px;
              }
              .cd-col-b {
                margin-top: -120px;
              }
              .cd-fade-t {
                display: none;
              }
              .cd-fade-b {
                height: 160px;
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
              .cd-scene {
                height: 420px;
              }
            }
          `}</style>
        </section>

        {/* ── The build-out TJ asked for ── */}
        <GhostSteps />
        <PhoneTileRow tiles={TILES} />
        <CtaBand placement="concept-d-cta" />
      </main>

      <Footer />
    </>
  )
}
