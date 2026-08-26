'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Concept D signature motion: the wall answers the scroll.
 *
 * Two columns of complete framed phones sit on a perspective plane. As the hero
 * scrolls past, the columns travel at different rates and the plane rotates
 * slightly toward the viewer, so the room reads as something you move through
 * rather than a flat backdrop.
 *
 * The slow idle drift stays as the at-rest state and lives on an INNER element,
 * so the CSS keyframes and the scroll-driven transform never write the same
 * property. Same reason the responsive scale lives on a wrapper: perspective
 * applies to direct children only, so the wrapper owns both the perspective and
 * the scale and the rotated wall stays its direct child.
 *
 * Reduced motion: a framer-motion scroll binding is a direct style write, so the
 * MotionConfig in the root layout does not neutralise it. useReducedMotion
 * collapses the travel to zero instead. The render tree is identical either way
 * and every value is zero at scroll position zero, so hydration stays clean.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const COL_A = [
  { src: '/concepts/feed-la-drummer.png', glow: false },
  { src: '/concepts/feed-thank-you.png', glow: true },
  { src: '/concepts/artist-profile-rose-gold.png', glow: false },
  { src: '/concepts/upload-picker.png', glow: false },
]

const COL_B = [
  { src: '/concepts/filter-sheet.png', glow: false },
  { src: '/concepts/feed-who-am-i.png', glow: false },
  { src: '/concepts/upload-editor.png', glow: false },
  { src: '/concepts/feed-baltimore.png', glow: false },
]

function Column({
  tiles,
  className,
}: {
  tiles: { src: string; glow: boolean }[]
  className: string
}) {
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

export default function WallScene() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const travel = reduced ? 0 : 1
  const yA = useTransform(scrollYProgress, [0, 1], [0, -150 * travel])
  const yB = useTransform(scrollYProgress, [0, 1], [0, 44 * travel])
  const openY = useTransform(scrollYProgress, [0, 1], [-8, -8 + 5 * travel])

  return (
    <>
      <div className="cd-scene" aria-hidden="true" ref={ref}>
        <div className="cd-wall-scale">
          <motion.div className="cd-wall" style={{ rotateX: 4, rotateY: openY }}>
            <motion.div className="cd-par" style={{ y: yA }}>
              <Column tiles={COL_A} className="cd-col cd-col-a" />
            </motion.div>
            <motion.div className="cd-par" style={{ y: yB }}>
              <Column tiles={COL_B} className="cd-col cd-col-b" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="cd-fade cd-fade-t" aria-hidden="true" />
      <div className="cd-fade cd-fade-b" aria-hidden="true" />

      <style>{`
        .cd-scene {
          position: absolute;
          top: -160px;
          right: -24px;
          width: 62%;
          height: calc(100% + 320px);
          z-index: 0;
        }
        .cd-wall-scale {
          perspective: 1600px;
          transform-origin: 50% 50%;
        }
        .cd-wall {
          display: flex;
          gap: 24px;
          justify-content: flex-end;
          transform-origin: 50% 50%;
        }
        .cd-par {
          flex-shrink: 0;
          will-change: transform;
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

        @media (max-width: 1080px) {
          .cd-scene {
            width: 72%;
            right: -160px;
          }
        }
        @media (max-width: 900px) {
          .cd-scene {
            position: relative;
            top: auto;
            right: auto;
            width: 100%;
            height: 540px;
            overflow: hidden;
            margin-top: 24px;
          }
          /* Pull the wall up so the pink-glow tile sits inside the visible
             window on phone instead of below the fade. */
          .cd-wall-scale {
            transform: scale(0.82);
            margin-top: -200px;
          }
          .cd-wall {
            justify-content: center;
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
          .cd-scene {
            height: 420px;
          }
        }
      `}</style>
    </>
  )
}
