import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import Reveal from '@/components/motion/Reveal'
import ProductGallery, { type GalleryItem } from '@/components/sections/concepts/c/ProductGallery'

/**
 * Concept C — Product forward. The app itself is the hero: a complete framed
 * phone over a soft pink glow, then a staggered gallery of complete phones
 * with clean labels underneath, the manifesto, and the form band.
 *
 * C is the one concept that stays product-only. Every other concept got a
 * photograph in the 2026-08-25 fork (A the maker, B the city, D the room);
 * here the product IS the identity, so adding photography would have blurred
 * the thing that makes C a distinct choice rather than a variation.
 *
 * HEADLINE (added 2026-08-26): this page previously had NO visible headline at
 * all. Its h1 was the screen-reader-only word Songcry, so a sighted visitor met
 * a phone and a subline and nothing telling them what they were looking at.
 * That is a conversion problem, not a style choice. The phone still leads
 * visually; the headline is sized under it on purpose. Wording is pending TJ
 * sign-off, as all outward copy is.
 *
 * TJ critiques fixed earlier:
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

const GALLERY: GalleryItem[] = [
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
    src: '/concepts/feed-comments.png',
    alt: 'The comment sheet on a song, showing fan comments and replies',
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

          <Reveal y={22}>
            <h1 className="cc-h1">Full songs from your city.</h1>
          </Reveal>
          <Reveal y={22} delay={0.08}>
            <p className="cc-sub">
              Songcry is where fans decide what rises, and artists see momentum by city.
            </p>
          </Reveal>
          <Reveal y={22} delay={0.16}>
            <div className="cc-cta-row">
              <a className="cc-btn-pink" href="#join">Join the beta</a>
            </div>
          </Reveal>
        </section>

        <ProductGallery items={GALLERY} />

        {/* ── Manifesto ── */}
        <section className="cc-manifesto" aria-label="Manifesto">
          <div className="cc-manifesto-wrap">
            <Reveal y={30}>
              {/* The literal spaces between spans matter: on phone the spans
                  render inline, and JSX strips newline-only whitespace. */}
              <p>
                <span>Real listeners. Real cities.</span>{' '}
                <span className="cc-quiet">Music that travels because</span>{' '}
                <span>people carry it.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Form band ── */}
        <section className="cc-band" id="join" aria-label="Join the beta">
          <div className="cc-band-wrap">
            <Reveal y={24}>
              <div>
                <h2 className="cc-band-h2">Join the beta</h2>
                <p className="cc-lede">Free for artists. Zero ads. No pay-to-play.</p>
              </div>
            </Reveal>
            <Reveal y={24} delay={0.1}>
              <div className="cc-band-form">
                <JoinForm />
              </div>
            </Reveal>
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
          .cc-phone-wrap {
            position: relative;
            width: min(400px, 76vw);
            margin: 0 auto 32px;
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
          /* Sized so the phone still leads. This is a caption to the product,
             not a billboard over it. */
          .cc-h1 {
            position: relative;
            font-family: var(--font-albert);
            font-size: clamp(32px, 3.6vw, 50px);
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.04;
            color: #ffffff;
            margin: 0 auto 18px;
            max-width: 14em;
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
          /* The only call to action in this hero, so it is sized as one.
             Download was removed 2026-08-26 (TJ): it stays in the nav. */
          .cc-btn-pink {
            display: inline-block;
            background: var(--pink);
            color: #ffffff;
            border-radius: 999px;
            padding: 17px 48px;
            font-family: var(--font-albert);
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.01em;
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

          /* ── Manifesto ── */
          .cc-manifesto {
            padding: 120px 0;
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
            padding: 120px 0;
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
            .cc-manifesto-wrap, .cc-band-wrap {
              padding: 0 48px;
            }
          }
          @media (max-width: 980px) {
            .cc-manifesto {
              padding: 96px 0;
            }
            .cc-band {
              padding: 96px 0;
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
            .cc-manifesto {
              padding: 80px 0;
            }
            .cc-manifesto-wrap, .cc-band-wrap {
              padding: 0 24px;
            }
            .cc-manifesto p span {
              display: inline;
            }
            .cc-band {
              padding: 80px 0;
            }
          }

          .cc-btn-pink:focus-visible {
            outline: 2px solid var(--pink);
            outline-offset: 3px;
            border-radius: 999px;
          }

          /* globals.css already zeroes animation and transition DURATION
          site-wide under reduced motion, with a priority flag. What it cannot do
          is remove a positional change: a hover lift still happens, just
          instantly. An instant 6px jump is still movement to someone with
          vestibular sensitivity, so the transform is dropped here. The
          duration lines below are deliberate belt-and-braces in case the
          global reset is ever narrowed. */
          @media (prefers-reduced-motion: reduce) {
            .cc-btn-pink {
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
