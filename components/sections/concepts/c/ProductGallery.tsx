'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * Concept C signature motion: the gallery columns travel at different rates.
 *
 * C is the product-forward concept and the only one carrying no photography,
 * because the app IS its identity. So its one motion idea belongs to the
 * product grid rather than to a hero: as the gallery crosses the viewport its
 * three columns drift apart slightly, the way a well-made product page lets a
 * catalogue breathe. A the ghost numerals, B the city wall lighting up, D the
 * wall answering the scroll, C the gallery columns. One move each.
 *
 * Three separations of concern that keep this from fighting itself:
 *   - The static middle-column stagger stays in CSS on .cc-cell.
 *   - The scroll parallax is a motion wrapper INSIDE the cell, so the two never
 *     write the same transform.
 *   - The parallax is gated to desktop, because below 817px the grid becomes a
 *     horizontal swipe row where a vertical drift would read as a bug. The gate
 *     starts false and only turns on in an effect, so the server and the first
 *     client render agree and hydration stays clean.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export type GalleryItem = { src: string; alt: string; caption: string }

/** Per-column travel in px across the whole scroll pass. Deliberately uneven. */
const COL_RATE = [-34, 18, -52]

function Cell({
  item,
  rate,
  progress,
}: {
  item: GalleryItem
  rate: number
  progress: MotionValue<number>
}) {
  const y = useTransform(progress, [0, 1], [0, rate])
  return (
    <article className="cc-cell">
      <motion.div className="cc-par" style={{ y }}>
        <div className="cc-tile">
          <Image
            src={item.src}
            alt={item.alt}
            width={380}
            height={732}
            sizes="(max-width: 817px) 66vw, (max-width: 1199px) 30vw, 360px"
          />
        </div>
        <p className="cc-cap">{item.caption}</p>
      </motion.div>
    </article>
  )
}

export default function ProductGallery({ items }: { items: GalleryItem[] }) {
  const reduced = useReducedMotion()
  const [wide, setWide] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 818px)')
    const apply = () => setWide(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const live = wide && !reduced

  return (
    <section className="cc-gallery" aria-label="Inside the app">
      <div className="cc-gallery-wrap">
        <div className="cc-grid">
          {items.map((g, i) => (
            <Cell key={g.src} item={g} progress={scrollYProgress} rate={live ? COL_RATE[i % 3] : 0} />
          ))}
        </div>
      </div>

      <style>{`
        .cc-gallery {
          padding: 24px 0 0;
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
        /* Static stagger stays here so it never collides with the parallax. */
        .cc-cell:nth-child(3n+2) {
          transform: translateY(48px);
        }
        .cc-par {
          will-change: transform;
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

        @media (max-width: 1199px) {
          .cc-gallery-wrap {
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
        }
        @media (max-width: 817px) {
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
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-tile {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
