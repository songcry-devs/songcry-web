import type { Metadata } from 'next'

/**
 * Homepage concept review page. Built for Jack, 2026-08-26.
 *
 * TJ asked for the Claude comparison artifact rebuilt on Vercel so it can just be
 * sent as a link. Jack opens it on a phone first, so every preview is a DESKTOP
 * render (1440 CSS px captured at 2x) rather than a mobile one. He would otherwise
 * judge four desktop layouts by their phone views.
 *
 * The previews are static captures, so the signature motion of each concept is not
 * in them. That is what the live links are for, and the page says so rather than
 * letting the captures quietly misrepresent the pages.
 *
 * CONCEPT E IS A FILMSTRIP, not a full-page shot. E pins a section and changes the
 * content under you, so a tall screenshot of it came out as one beat followed by
 * thousands of pixels of empty track. That is not a worse preview, it is a wrong
 * one. Its six frames are captured at chosen scroll positions and stacked with
 * ffmpeg, and the caption says so.
 *
 * Captures: scripted with Playwright against the DEPLOYED staging preview, not
 * localhost, which sidesteps the stale-dev-server trap entirely. The script scrolls
 * the whole page first so every whileInView Reveal has fired, otherwise a full-page
 * screenshot catches half the page still at zero opacity.
 *
 * REGENERATE after any concept change:
 *   node <scratch>/capture.mjs <outdir>  then cwebp -q 82 -m 6 -sharp_yuv
 * Stale captures are worse than no captures, because they read as current.
 *
 * DELETE THIS ROUTE before staging is merged to main. It is a review tool and has
 * no business on the live site. Noindex is a backstop, not the plan.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export const metadata: Metadata = {
  title: 'Songcry homepage concepts · review',
  description: 'Four homepage directions plus a craft pass, side by side, with desktop previews and live links.',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    title: 'Songcry homepage concepts · review',
    description: 'Four homepage directions plus a craft pass, side by side, with desktop previews and live links.',
  },
}

const BASE = 'https://songcry-web-git-staging-tjsongcrys-projects.vercel.app'

const CONCEPTS = [
  {
    key: 'a',
    name: 'Sharpen',
    line: 'Editorial and typographic. The page holds still and an enormous numeral becomes the stage as each beat changes against it. No photography anywhere.',
    w: 2880,
    h: 10800,
    film: true,
  },
  {
    key: 'b',
    name: 'City First',
    line: 'The city is the headline. The page holds still and a real city stands behind each beat, so it reads as one song moving through places.',
    w: 2880,
    h: 10800,
    film: true,
  },
  {
    key: 'c',
    name: 'Product Forward',
    line: 'The app is the argument. Deliberately the only one that does not hold you still: the product talks continuously while three gallery columns travel at different rates.',
    w: 2880,
    h: 8818,
    film: false,
  },
  {
    key: 'd',
    name: 'The Wall',
    line: 'The most atmospheric. The performer stays behind you while the beats descend the wall, one at a time.',
    w: 2880,
    h: 10800,
    film: true,
  },
  {
    key: 'e',
    name: 'The Craft Pass',
    line: 'The live homepage words, rebuilt with the devices measured off Apple. The page stops and the content advances, one beat at a time.',
    w: 2880,
    h: 10800,
    film: true,
  },
]

export default function Review() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <main id="main" className="rv">
        <header className="rv-head">
          <p className="rv-eyebrow">Songcry homepage · design review</p>
          <h1 className="rv-h1">Four directions, and one craft pass.</h1>
          <p className="rv-lead">
            All five are real working pages, not mockups. Nothing is shared between them any
            more, so this is a real choice rather than one page wearing four hats. A, B, C and D
            were also given a craft pass on 2026-08-27, so the type, the spacing and the colour
            are corrected on every one of them.
          </p>
          <p className="rv-lead">
            Every preview below is the <strong>desktop</strong> version, captured at full width,
            so you can judge the real layout even while you read this on your phone. Scroll
            inside a preview to move through the page. The previews are still images, so the
            motion is not in them, and motion is a real part of what separates these. Open the
            live page for that.
          </p>
        </header>

        <section className="rv-note" aria-label="About concept E">
          <h2 className="rv-note-h">Read the previews carefully</h2>
          <p className="rv-note-p">
            A, B, D and E now hold you in place and change what you are looking at while you
            scroll. A single screenshot of a page like that is not a worse preview, it is a
            wrong one, so those four are shown as six frames from one scroll, top to bottom. C
            is the exception and is a real full-page shot, because C is deliberately the one
            concept that never stops you. All five are worth opening live.
          </p>
          <p className="rv-note-p">
            E is also not a fifth direction competing with the other four. It is the live
            homepage words rebuilt with better craft, so the only thing that changes between it
            and songcry.app is the craft itself.
          </p>
        </section>

        <section className="rv-note" aria-label="About the imagery">
          <h2 className="rv-note-h">Before you judge the pictures</h2>
          <p className="rv-note-p">
            The imagery is placeholder. The photos and the phone screens are stand ins or pulled
            from the artists site. The real source is the footage from the two shoot days: stills
            lifted from the video for the page images, and clips of Jack talking embedded in the
            page. That swap is the biggest single upgrade available to whichever direction wins,
            and it makes the page ours instead of generic. So judge these on structure, motion
            and words rather than on the photographs.
          </p>
        </section>

        {CONCEPTS.map((c) => {
          const href = `${BASE}/concepts/${c.key}`
          return (
            <section key={c.key} className="rv-card" aria-label={`Concept ${c.key.toUpperCase()}, ${c.name}`}>
              <div className="rv-card-head">
                <span className="rv-badge" aria-hidden="true">{c.key.toUpperCase()}</span>
                <div className="rv-card-title">
                  <h2 className="rv-name">{c.name}</h2>
                  <p className="rv-line">{c.line}</p>
                </div>
              </div>

              <div className="rv-frame">
                <div className="rv-chrome">
                  <span className="rv-dot rv-dot-1" aria-hidden="true" />
                  <span className="rv-dot rv-dot-2" aria-hidden="true" />
                  <span className="rv-dot rv-dot-3" aria-hidden="true" />
                  <span className="rv-url">songcry.app/concepts/{c.key}</span>
                  <span className="rv-tag">desktop</span>
                </div>
                <div className="rv-scroll" tabIndex={0} role="region" aria-label={`Scrollable desktop preview of concept ${c.key.toUpperCase()}`}>
                  <img
                    className="rv-shot"
                    src={`/review/concept-${c.key}.webp`}
                    width={c.w}
                    height={c.h}
                    loading="lazy"
                    decoding="async"
                    alt={`Full desktop homepage for concept ${c.key.toUpperCase()}, ${c.name}`}
                  />
                </div>
                <p className="rv-hint">
                  {c.film
                    ? 'Six frames from one scroll, top to bottom. This page holds you in place and changes what you are looking at, so a single screenshot cannot show it. Open the live page.'
                    : 'Scroll inside the frame to move down the page'}
                </p>
              </div>

              <div className="rv-actions">
                <a className="rv-btn" href={href} target="_blank" rel="noopener noreferrer">
                  Open the live page
                </a>
                <a className="rv-btn rv-btn-quiet" href={`/review/concept-${c.key}.webp`} target="_blank" rel="noopener noreferrer">
                  Full size image
                </a>
              </div>
            </section>
          )
        })}

        <section className="rv-ask" aria-label="What we need back">
          <h2 className="rv-ask-h">What would help most</h2>
          <ul className="rv-ul">
            <li>Pick the direction that feels most like Songcry, and say why in a sentence.</li>
            <li>
              Notes on a single section are just as useful as a verdict on the whole page. If two
              are close, say what you would take from the one that loses.
            </li>
            <li>
              One known snag on B: the line about your music starting in your city appears twice,
              once in the hero and again over the phones. It is locked copy, so it stays until
              there is a ruling. Worth a note if it bothers you.
            </li>
          </ul>
          <p className="rv-foot">
            Previews captured 26 August 2026 from the staging build. Whichever one wins replaces
            the homepage, so the pick is the thing that unblocks the rest.
          </p>
        </section>
      </main>

      <style>{`
        .rv {
          background: var(--bg, #080707);
          color: var(--text-primary, #ffffff);
          font-family: var(--font-sans);
          min-height: 100vh;
          padding: 56px 20px 96px;
          max-width: 880px;
          margin: 0 auto;
        }

        .rv-head {
          padding-bottom: 8px;
        }
        .rv-eyebrow {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent, #f819c0);
          margin: 0 0 18px;
          font-weight: 600;
        }
        .rv-h1 {
          font-size: clamp(30px, 6vw, 48px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          font-weight: 600;
          margin: 0 0 22px;
        }
        .rv-lead {
          font-size: 17px;
          line-height: 1.65;
          color: var(--text-secondary, #ababab);
          margin: 0 0 16px;
        }
        .rv-lead strong {
          color: var(--text-primary, #ffffff);
          font-weight: 600;
        }

        .rv-note {
          border-left: 2px solid var(--accent, #f819c0);
          background: var(--surface-100, #0c0c0c);
          border-radius: 0 12px 12px 0;
          padding: 22px 24px;
          margin: 34px 0 8px;
        }
        .rv-note-h {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        .rv-note-p {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary, #ababab);
          margin: 0;
        }

        .rv-card {
          margin-top: 56px;
          padding-top: 34px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .rv-card-head {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .rv-badge {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--surface-400, #1e1e1e);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.02em;
        }
        .rv-card-title {
          min-width: 0;
        }
        .rv-name {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 4px 0 6px;
        }
        .rv-line {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary, #ababab);
          margin: 0;
        }

        .rv-frame {
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          overflow: hidden;
          background: var(--surface-200, #121212);
        }
        .rv-chrome {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          background: var(--surface-300, #141414);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .rv-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex: 0 0 auto;
        }
        .rv-dot-1 { background: #4a4a4a; }
        .rv-dot-2 { background: #3d3d3d; }
        .rv-dot-3 { background: #313131; }
        .rv-url {
          margin-left: 8px;
          font-size: 12px;
          color: var(--text-tertiary, #8a8a8a);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rv-tag {
          margin-left: auto;
          flex: 0 0 auto;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary, #8a8a8a);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          padding: 3px 9px;
        }

        .rv-scroll {
          height: 66vh;
          max-height: 620px;
          overflow-y: auto;
          overflow-x: hidden;
          background: #080707;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
          overscroll-behavior: contain;
          scroll-behavior: auto;
        }
        .rv-scroll:focus-visible {
          outline: 2px solid var(--accent, #f819c0);
          outline-offset: -2px;
        }
        .rv-shot {
          display: block;
          width: 100%;
          height: auto;
        }
        .rv-hint {
          margin: 0;
          padding: 9px 14px;
          font-size: 12px;
          color: var(--text-tertiary, #8a8a8a);
          background: var(--surface-300, #141414);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rv-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
        .rv-btn {
          display: inline-block;
          background: var(--accent, #f819c0);
          color: #ffffff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 999px;
          transition: background 160ms ease;
        }
        .rv-btn:hover {
          background: var(--accent-dark, #d907a4);
        }
        .rv-btn-quiet {
          background: transparent;
          color: var(--text-secondary, #ababab);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .rv-btn-quiet:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .rv-ask {
          margin-top: 64px;
          padding-top: 34px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .rv-ask-h {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .rv-ul {
          margin: 0;
          padding-left: 20px;
          color: var(--text-secondary, #ababab);
          font-size: 16px;
          line-height: 1.65;
        }
        .rv-ul li {
          margin-bottom: 12px;
        }
        .rv-foot {
          margin: 26px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-tertiary, #8a8a8a);
        }

        @media (max-width: 600px) {
          .rv {
            padding: 40px 16px 72px;
          }
          .rv-scroll {
            height: 72vh;
          }
          .rv-url {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  )
}
