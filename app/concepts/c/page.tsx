import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'

// Server component: hardcoded like the home Download section (lib/appstore is
// a client module, so its export cannot be read from a server component).
const APP_STORE_URL =
  'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

/**
 * Concept C — Product forward. The app itself is the hero: a complete framed
 * phone over a soft pink glow, then a staggered gallery of complete phones
 * with clean labels underneath, the manifesto, and the form band.
 *
 * TJ critiques fixed here:
 * - No cropped or zoomed UI fragments anywhere — the gallery uses complete
 *   framed phones only.
 * - No floating caption sentences on tiles — captions are small clean labels
 *   UNDER the tiles, using only the locked tile captions.
 * - The giant outlined ghost Songcry wordmark behind the hero phone is gone,
 *   replaced with a subtle radial pink glow behind the phone.
 *
 * Design-concept preview for TJ — never indexed.
 */
export const metadata: Metadata = {
  title: 'Songcry concept C · Product forward',
  description: 'The app leads. A complete framed phone as the hero, then the gallery, then the manifesto.',
  robots: { index: false, follow: false },
  // Each concept overrides the inherited root openGraph. Without this all four
  // unfurl as the identical homepage card, so a link pasted into Slack gives no
  // clue which concept it points at. These are review aids on a noindex page.
  openGraph: {
    type: 'website',
    title: 'Songcry concept C · Product forward',
    description: 'The app leads. A complete framed phone as the hero, then the gallery, then the manifesto.',
  },
}

const GALLERY = [
  {
    src: '/concepts/feed-thank-you.png',
    alt: 'The Songcry feed playing Thank You by Pseudo Black in the Los Angeles feed',
    caption: 'Your music starts in your city',
  },
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
  {
    src: '/concepts/feed-who-am-i.png',
    alt: 'Song title and lyric caption in the feed',
    caption: 'Hear what fans think',
  },
]

export default function ConceptC() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        {/* ── Hero: the product leads ── */}
        <section className="cc-hero" aria-label="Hero">
          <h1 className="cc-srh1">Songcry</h1>

          <div className="cc-phone-wrap">
            <div className="cc-glow" aria-hidden="true" />
            <Image
              className="cc-phone-img"
              src="/framer/hero-phone-feed.png"
              alt="The Songcry feed playing Thank You by Pseudo Black in the Los Angeles feed"
              width={690}
              height={1330}
              priority
              sizes="(max-width: 817px) 76vw, 400px"
            />
          </div>

          <p className="cc-sub">
            Songcry is where fans decide what rises, and artists see momentum by city.
          </p>
          <div className="cc-cta-row">
            <a className="cc-btn-pink" href="#join">Join the beta</a>
            <a
              className="cc-btn-ghost"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        </section>

        {/* ── Complete-phone gallery ── */}
        <section className="cc-gallery" aria-label="Inside the app">
          <div className="cc-gallery-wrap">
            <div className="cc-grid">
              {GALLERY.map((g) => (
                <article className="cc-cell" key={g.src}>
                  <div className="cc-tile">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={380}
                      height={732}
                      sizes="(max-width: 817px) 66vw, (max-width: 1199px) 30vw, 360px"
                    />
                  </div>
                  <p className="cc-cap">{g.caption}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Manifesto ── */}
        <section className="cc-manifesto" aria-label="Manifesto">
          <div className="cc-manifesto-wrap">
            {/* The literal spaces between spans matter: on phone the spans
                render inline, and JSX strips newline-only whitespace. */}
            <p>
              <span>Real listeners. Real cities.</span>{' '}
              <span className="cc-quiet">Music that travels because</span>{' '}
              <span>people carry it.</span>
            </p>
          </div>
        </section>

        {/* ── Form band ── */}
        <section className="cc-band" id="join" aria-label="Join the beta">
          <div className="cc-band-wrap">
            <div>
              <h2 className="cc-band-h2">Join the beta</h2>
              <p className="cc-lede">Free for artists. Zero ads. No pay-to-play.</p>
            </div>
            <div className="cc-band-form">
              <JoinForm />
            </div>
          </div>
        </section>

        <style>{`
          /* ── Hero ── */
          .cc-hero {
            position: relative;
            text-align: center;
            padding: 128px 24px 96px;
            overflow: hidden;
          }
          .cc-srh1 {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
          }
          .cc-phone-wrap {
            position: relative;
            width: min(400px, 76vw);
            margin: 0 auto 16px;
          }
          /* The subtle radial pink glow that replaced the ghost wordmark */
          .cc-glow {
            position: absolute;
            inset: -28%;
            background: radial-gradient(closest-side, rgba(248, 25, 192, 0.17), rgba(248, 25, 192, 0.06) 55%, transparent 78%);
            pointer-events: none;
          }
          .cc-phone-img {
            position: relative;
            width: 100%;
            height: auto;
          }
          .cc-sub {
            position: relative;
            font-family: var(--font-albert);
            font-size: 18px;
            line-height: 1.55;
            color: rgba(255, 255, 255, 0.65);
            max-width: 480px;
            margin: 0 auto 32px;
          }
          .cc-cta-row {
            position: relative;
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .cc-btn-pink {
            display: inline-block;
            background: var(--pink);
            color: #ffffff;
            border-radius: 999px;
            padding: 14px 34px;
            font-family: var(--font-albert);
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            transition: transform 160ms ease, filter 160ms ease;
          }
          .cc-btn-pink:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
          }
          .cc-btn-pink:active {
            transform: scale(0.975);
          }
          .cc-btn-ghost {
            display: inline-block;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 999px;
            padding: 14px 34px;
            font-family: var(--font-albert);
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            text-decoration: none;
            transition: border-color 160ms ease, background 160ms ease;
          }
          .cc-btn-ghost:hover {
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.04);
          }

          /* ── Gallery: complete phones, labels under tiles ── */
          .cc-gallery {
            padding: 32px 0 0;
          }
          .cc-gallery-wrap {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 40px;
          }
          .cc-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 20px;
            row-gap: 56px;
            padding-bottom: 56px;
          }
          /* Middle column rides lower for the gallery stagger */
          .cc-cell {
            transition: transform 220ms ease;
          }
          .cc-cell:nth-child(3n+2) {
            transform: translateY(48px);
          }
          .cc-tile {
            background: #121212;
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 24px;
            padding: 22px;
            transition: border-color 220ms ease, box-shadow 220ms ease;
          }
          .cc-cell:hover .cc-tile {
            border-color: rgba(255, 255, 255, 0.16);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
          }
          .cc-tile img {
            display: block;
            width: 100%;
            height: auto;
          }
          .cc-cap {
            margin: 14px 0 0;
            font-family: var(--font-albert);
            font-size: 14px;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: rgba(255, 255, 255, 0.65);
            text-align: center;
          }

          /* ── Manifesto ── */
          .cc-manifesto {
            padding: 150px 0 140px;
          }
          .cc-manifesto-wrap {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 40px;
          }
          .cc-manifesto p {
            font-family: var(--font-albert);
            font-size: clamp(38px, 4.8vw, 66px);
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.12;
            color: #ffffff;
            margin: 0;
          }
          .cc-manifesto p span {
            display: block;
          }
          .cc-quiet {
            color: rgba(255, 255, 255, 0.35);
          }

          /* ── Form band ── */
          .cc-band {
            background: #0C0C0C;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            padding: 96px 0;
          }
          .cc-band-wrap {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 40px;
            display: grid;
            grid-template-columns: 1fr 440px;
            gap: 72px;
            align-items: center;
          }
          .cc-band-h2 {
            font-family: var(--font-albert);
            font-size: clamp(34px, 3.6vw, 46px);
            font-weight: 700;
            letter-spacing: -0.03em;
            color: #ffffff;
            margin: 0 0 16px;
          }
          .cc-lede {
            font-family: var(--font-albert);
            font-size: 18px;
            line-height: 1.55;
            color: rgba(255, 255, 255, 0.65);
            max-width: 380px;
            margin: 0;
          }

          /* ── Responsive ── */
          @media (max-width: 1199px) {
            .cc-gallery-wrap, .cc-manifesto-wrap, .cc-band-wrap {
              padding: 0 48px;
            }
          }
          @media (max-width: 980px) {
            .cc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .cc-cell:nth-child(3n+2) {
              transform: none;
            }
            .cc-cell:nth-child(2n) {
              transform: translateY(48px);
            }
            .cc-band-wrap {
              grid-template-columns: 1fr;
              gap: 48px;
            }
            .cc-band-form {
              max-width: 440px;
            }
          }
          @media (max-width: 817px) {
            .cc-hero {
              padding: 112px 20px 72px;
            }
            .cc-gallery-wrap {
              padding: 0 24px;
            }
            /* Swipeable row: the container scrolls, the page never does. */
            .cc-grid {
              display: flex;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              gap: 14px;
              margin: 0 -24px;
              padding: 4px 24px 12px;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
            }
            .cc-grid::-webkit-scrollbar {
              display: none;
            }
            .cc-cell {
              flex: 0 0 66%;
              max-width: 280px;
              scroll-snap-align: center;
            }
            .cc-cell:nth-child(3n+2), .cc-cell:nth-child(2n) {
              transform: none;
            }
            .cc-manifesto {
              padding: 96px 0;
            }
            .cc-manifesto-wrap, .cc-band-wrap {
              padding: 0 24px;
            }
            .cc-manifesto p span {
              display: inline;
            }
            .cc-band {
              padding: 72px 0;
            }
          }

          .cc-btn-pink:focus-visible,
          .cc-btn-ghost:focus-visible {
            outline: 2px solid var(--pink);
            outline-offset: 3px;
            border-radius: 999px;
          }

          /* globals.css already zeroes animation and transition DURATION
          site-wide under reduced motion, with !important. What it cannot do
          is remove a positional change: a hover lift still happens, just
          instantly. An instant 6px jump is still movement to someone with
          vestibular sensitivity, so the transform is dropped here. The
          duration lines below are deliberate belt-and-braces in case the
          global reset is ever narrowed. */
          @media (prefers-reduced-motion: reduce) {
            .cc-btn-pink,
            .cc-btn-ghost,
            .cc-cell,
            .cc-tile {
              transition: none;
            }
            .cc-btn-pink:hover {
              transform: none;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  )
}
