'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * The pin chassis. A tall track holds a sticky child, so the page stops moving
 * and the CONTENT advances instead.
 *
 * Apple ships this as all-access-pass, toggling inactive and activated, with
 * measured parent heights up to 9,300px for a single idea. See
 * docs/research/2026-08-27-high-end-web-craft-teardown.md.
 *
 * THIS IS THE CHASSIS, NOT THE SECTION. That distinction is the whole answer to
 * Jack's recycled-modules critique. Apple uses `tile` 348 times on one page and
 * every instance carries its own named modifier with bespoke content. Recycled
 * does not mean sharing a mechanism, it means pouring different copy into the
 * same presentation. So the mechanics live here once and each concept renders
 * its own thing inside via the render prop: A gets editorial rows, B lights its
 * city wall, D descends its wall. Same pin, four different pages.
 *
 * Active index is STATE, driven by useMotionValueEvent, not three interpolated
 * opacity transforms. The transform version silently went stale while building
 * concept E: at 98 percent of the track the rail read 0.98 while the content was
 * still showing beat 2, from the same motion value. A single index is
 * deterministic and can be asserted in a test.
 *
 * Reduced motion collapses the whole thing: the track loses its height, the
 * sticky child becomes static, and `reduced` is passed to the child so it can
 * render every item stacked and readable with no scroll choreography.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

export default function PinnedTrack({
  count,
  track = '320vh',
  rail = true,
  className = '',
  children,
}: {
  count: number
  track?: string
  rail?: boolean
  className?: string
  children: (state: { active: number; reduced: boolean; count: number }) => ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    setActive((prev) => (prev === next ? prev : next))
  })

  return (
    <div className={`pt-track ${className}`} ref={ref} style={{ height: reduced ? 'auto' : track }}>
      <div className="pt-sticky">
        <div className="pt-inner">
          {children({ active, reduced, count })}

          {rail ? (
            <div className="pt-rail" aria-hidden="true">
              <motion.div
                className="pt-rail-fill"
                style={reduced ? { transform: 'scaleX(1)' } : { scaleX: railScale }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        .pt-track {
          position: relative;
        }
        .pt-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .pt-inner {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .pt-rail {
          margin-top: 72px;
          height: 1px;
          width: 100%;
          max-width: 900px;
          background: rgba(255, 255, 255, 0.09);
          overflow: hidden;
        }
        .pt-rail-fill {
          height: 100%;
          width: 100%;
          transform-origin: 0 50%;
          background: var(--pt-mark, #f819c0);
        }

        @media (max-width: 980px) {
          .pt-inner {
            padding: 0 28px;
          }
          .pt-rail {
            margin-top: 48px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-sticky {
            position: relative;
            height: auto;
            padding: 120px 0;
          }
        }
      `}</style>
    </div>
  )
}
