'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Three columns of real app screens travelling at three different rates.
 *
 * Measured on apple.com/iphone-17-pro: media-gallery-item-1 through -6 each
 * carry their OWN scroll-driven transform, so the items move against each other
 * rather than as one block. That difference in rate is what reads as depth, and
 * it costs nothing: no 3D, no canvas, two transforms.
 *
 * These are real screens from the beta, not mockups of an imagined product. That
 * matters more than the motion does. The screens are 380x732 originals.
 *
 * Reduced motion collapses every rate to zero, so the columns sit still and the
 * grid is simply a grid. The tree is identical either way.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const COLUMNS: { src: string; alt: string }[][] = [
  [
    { src: '/concepts/feed-baltimore.png', alt: 'The Songcry feed showing a song rising in Baltimore' },
    { src: '/concepts/feed-who-am-i.png', alt: 'A full song playing in the Songcry feed' },
    { src: '/concepts/upload-picker.png', alt: 'Choosing a track to upload in Songcry' },
  ],
  [
    { src: '/concepts/feed-la-drummer.png', alt: 'A drummer performing in the Songcry feed' },
    { src: '/concepts/artist-profile-rose-gold.png', alt: 'An artist profile on Songcry' },
    { src: '/concepts/feed-comments.png', alt: 'Comments on a song in the Songcry feed' },
  ],
  [
    { src: '/concepts/filter-sheet.png', alt: 'Filtering the Songcry feed by city and genre' },
    { src: '/concepts/upload-editor.png', alt: 'The Songcry in-app editor with audio and video sync' },
    { src: '/concepts/feed-thank-you.png', alt: 'An artist thanking listeners in the Songcry feed' },
  ],
]

// Distinct travel per column. Middle column runs against the outer two.
const RATES = [-96, 54, -140]

export default function DriftGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y0 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : RATES[0]])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : RATES[1]])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : RATES[2]])
  const ys = [y0, y1, y2]

  return (
    <section className="dg-section" aria-label="Inside the app">
      <div className="dg-wrap" ref={ref}>
        <p className="dg-eyebrow">Real screens from the beta</p>
        <div className="dg-grid">
          {COLUMNS.map((col, ci) => (
            <motion.div className="dg-col" key={ci} style={{ y: ys[ci] }}>
              {col.map((shot) => (
                <div className="dg-shot" key={shot.src}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={380}
                    height={732}
                    sizes="(max-width: 980px) 44vw, 30vw"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .dg-section {
          background: var(--e-ground-1);
          padding: 132px 0 156px;
          overflow: hidden;
        }
        .dg-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .dg-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--e-t4);
          margin: 0 0 56px;
        }
        .dg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: start;
        }
        .dg-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .dg-col:nth-child(2) {
          margin-top: 64px;
        }
        .dg-shot {
          border-radius: 18px;
          overflow: hidden;
          background: var(--e-ground-2);
          border: 1px solid rgba(255, 255, 255, 0.07);
          line-height: 0;
        }
        .dg-shot img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 980px) {
          .dg-section {
            padding: 96px 0 112px;
          }
          .dg-wrap {
            padding: 0 28px;
          }
          .dg-grid {
            gap: 16px;
          }
          .dg-col {
            gap: 16px;
          }
          .dg-col:nth-child(2) {
            margin-top: 34px;
          }
          .dg-shot {
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  )
}
