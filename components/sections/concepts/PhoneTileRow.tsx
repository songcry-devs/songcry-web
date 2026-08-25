import Image from 'next/image'

/**
 * A strip of app-screen tiles, shared by concepts A and D.
 *
 * TJ ruling (concept A): the phones must be COMPLETE — the tile grows to fit
 * the full framed screenshot instead of cropping it at a fixed height. Every
 * source image is a whole 380x732 framed phone, rendered contain-style with
 * padding on all four sides, so nothing amputates at any width.
 *
 * At the phone breakpoint the grid becomes a swipeable overflow-x row with
 * scroll snap (global critique: 390w tiles swipe, never squeeze).
 *
 * Captions are claims-locked tile captions from the approved comps.
 *
 * NOTE: keep the style string free of apostrophes, quotes, ampersands and
 * angle brackets (see JoinForm.tsx).
 */

export type PhoneTile = {
  src: string
  alt: string
  caption: string
}

export default function PhoneTileRow({
  eyebrow = 'Inside the app',
  note = 'Real screens from the beta',
  tiles,
}: {
  eyebrow?: string
  note?: string
  tiles: PhoneTile[]
}) {
  return (
    <section className="ptr-section" aria-label={eyebrow}>
      <div className="ptr-wrap">
        <div className="ptr-head">
          <p className="ptr-eyebrow">{eyebrow}</p>
          <p className="ptr-note">{note}</p>
        </div>

        <div className="ptr-tiles">
          {tiles.map((t) => (
            <article className="ptr-tile" key={t.src}>
              <h3 className="ptr-caption">{t.caption}</h3>
              <div className="ptr-phone">
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={380}
                  height={732}
                  sizes="(max-width: 817px) 66vw, (max-width: 1199px) 40vw, 280px"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .ptr-section {
          padding: 96px 0 8px;
        }
        .ptr-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ptr-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
        }
        .ptr-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }
        .ptr-note {
          font-family: var(--font-albert);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }
        .ptr-tiles {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .ptr-tile {
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 24px;
          padding: 24px 24px 28px;
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .ptr-tile:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
        }
        .ptr-caption {
          font-family: var(--font-albert);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0 0 20px;
        }
        /* The complete-phone fix: no fixed tile height, no overflow crop.
           The image keeps its intrinsic 380x732 ratio and simply scales. */
        .ptr-phone img {
          display: block;
          width: 100%;
          max-width: 250px;
          height: auto;
          margin: 0 auto;
        }

        @media (max-width: 1199px) {
          .ptr-wrap {
            padding: 0 48px;
          }
          .ptr-tiles {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 817px) {
          .ptr-section {
            padding: 64px 0 8px;
          }
          .ptr-wrap {
            padding: 0 24px;
          }
          .ptr-head {
            flex-direction: column;
            gap: 6px;
            margin-bottom: 24px;
          }
          /* Swipeable row: the container scrolls, the page never does. */
          .ptr-tiles {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 14px;
            margin: 0 -24px;
            padding: 4px 24px 12px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .ptr-tiles::-webkit-scrollbar {
            display: none;
          }
          .ptr-tile {
            flex: 0 0 66%;
            max-width: 280px;
            scroll-snap-align: center;
          }
          .ptr-tile:hover {
            transform: none;
            box-shadow: none;
          }
        }

        /* globals.css already zeroes animation and transition DURATION
        site-wide under reduced motion, with !important. What it cannot do
        is remove a positional change: a hover lift still happens, just
        instantly. An instant 6px jump is still movement to someone with
        vestibular sensitivity, so the transform is dropped here. The
        duration lines below are deliberate belt-and-braces in case the
        global reset is ever narrowed. */
        @media (prefers-reduced-motion: reduce) {
          .ptr-tile {
            transition: none;
          }
          .ptr-tile:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
