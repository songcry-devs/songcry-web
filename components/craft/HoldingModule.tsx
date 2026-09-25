'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEnhancedMotion } from '@/components/motion/useEnhancedMotion'
import { useIsoLayoutEffect } from '@/components/motion/useIsoLayoutEffect'

/**
 * The module that takes over. Apple calls its version all-access-pass and
 * toggles it between inactive and activated.
 *
 * Lives in components/craft because it is a DEVICE, not a concept section. The
 * concepts folder gets deleted when a direction is picked; these do not.
 *
 * The pattern, measured on apple.com/iphone-17-pro and apple-vision-pro: a tall
 * parent holds a sticky child that fills the viewport. The reader keeps
 * scrolling, but the page stops moving and the CONTENT advances instead. When
 * the idea is finished, the block releases. Measured parent heights on Apple go
 * up to 9,300px for a single module.
 *
 * This is the structural answer to the recycled-modules critique. A normal
 * section states a thing and hands off, which is why a stack of them reads as a
 * list. A module that holds you can DEVELOP one thing, and development is what
 * separates an authored page from a template.
 *
 * Here the three beats are the same claims-locked copy the live homepage runs as
 * three static rows. Same words, different device: instead of scanning three
 * rows you are walked through a sequence, one beat at a time, with a rail
 * showing where you are in it.
 *
 * Apple drives a video playhead from this scroll position. We have no footage
 * yet, so the same mechanism drives opacity and position instead. When Jack's
 * footage lands, the clip goes in the frame and its currentTime binds to this
 * same progress value. The structure is already correct for it.
 *
 * The track length is a prop. On the homepage it is shorter than on a concept
 * page: the homepage is a conversion surface, and holding a visitor for three
 * and a half viewport heights before they can reach the download is a real cost.
 * Long enough to develop the idea, short enough not to trap anyone.
 *
 * Progressive enhancement (2026-09-25): the default render is the static stack, so a reader
 * without JavaScript or with reduced motion gets all three beats, no pinned track and no blank
 * stretch. The pinned, one-beat-at-a-time layout applies only under .hm-on, which is added after
 * hydration when motion is allowed. The track height is a custom property for the same reason:
 * an inline height beat the reduced-motion media query and left about two screens of blank.
 *
 * Final-review fix (2026-09-25): motion being allowed is not enough on its own. A visitor who
 * arrives already past this module, or lands straight on a hash (the nav Download tap goes
 * through /get to /#get-the-app), must not have the track grow under them: growing from the
 * static height to the pinned track height AFTER the browser has already started its smooth
 * scroll to the anchor pushes that anchor down and the scroll lands short. landedPast is decided
 * once, in a layout effect that runs before the first post-hydration paint, and it wins over
 * motionOk. A visitor starting at the top of the page still gets the pinned version.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands
 * and angle brackets, comments included. See scripts/check-style-literals.mjs.
 */

const BEATS = [
  {
    n: '01',
    title: 'Upload where you are',
    body: 'Every song is reviewed first. Then it starts in your city’s feed.',
  },
  {
    n: '02',
    title: 'Real listeners decide',
    body: 'Likes and hosts from people near you move your song up.',
  },
  {
    n: '03',
    title: 'It travels city to city',
    body: 'When a listener hosts your track, it starts playing in their city too.',
  },
]

function Beat({ beat, active }: { beat: (typeof BEATS)[number]; active: boolean }) {
  return (
    <div className={active ? 'hm-beat is-active' : 'hm-beat'}>
      <span className="hm-beat-n">{beat.n}</span>
      <h3 className="hm-beat-title">{beat.title}</h3>
      <p className="hm-beat-body">{beat.body}</p>
    </div>
  )
}

export default function HoldingModule({ track = '340vh' }: { track?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionOk = useEnhancedMotion()
  const [landedPast, setLandedPast] = useState(false)
  useIsoLayoutEffect(() => {
    const r = ref.current?.getBoundingClientRect()
    if (window.location.hash || (r && r.bottom <= 0)) setLandedPast(true)
  }, [])
  const enhanced = motionOk && !landedPast
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [active, setActive] = useState(0)

  // One state change per beat boundary, rather than three scroll-bound opacity
  // transforms. The transform version silently went stale: at 98% of the track
  // the rail read 0.98 while the beats were still showing 02, from the same
  // motion value. A single index is deterministic, cheap, and can be asserted in
  // a test, which the interpolated version could not.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(BEATS.length - 1, Math.max(0, Math.floor(v * BEATS.length)))
    setActive((prev) => (prev === next ? prev : next))
  })

  return (
    <section className={enhanced ? 'hm-section hm-on' : 'hm-section'} aria-label="How Songcry works">
      <div className="hm-track" ref={ref} style={{ '--hm-track': track } as CSSProperties}>
        <div className="hm-sticky">
          <div className="hm-inner">
            <h2 className="hm-eyebrow">How it works</h2>

            <div className="hm-stage">
              {BEATS.map((b, i) => (
                <Beat key={b.n} beat={b} active={i === active} />
              ))}
            </div>

            <div className="hm-rail" aria-hidden="true">
              <motion.div className="hm-rail-fill" style={{ scaleX: railScale }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hm-section {
          background: var(--e-ground-2);
        }
        .hm-track {
          position: relative;
        }
        .hm-sticky {
          padding: 128px 0;
        }
        .hm-inner {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hm-eyebrow {
          font-family: var(--font-albert);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--e-t3);
          margin: 0 0 72px;
        }
        .hm-stage {
          position: relative;
        }
        .hm-beat {
          max-width: 900px;
          margin-bottom: 72px;
        }
        .hm-beat:last-child {
          margin-bottom: 0;
        }
        .hm-beat-n {
          display: block;
          font-family: var(--font-albert);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--e-t3);
          margin-bottom: 26px;
        }
        .hm-beat-title {
          font-family: var(--font-albert);
          font-size: clamp(38px, 5.4vw, 68px);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: var(--e-t1);
          margin: 0 0 28px;
        }
        .hm-beat-body {
          font-family: var(--font-albert);
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 400;
          line-height: 1.5;
          color: var(--e-t3);
          max-width: 560px;
          margin: 0;
        }
        .hm-rail {
          display: none;
          margin-top: 84px;
          height: 1px;
          width: 100%;
          max-width: 900px;
          background: rgba(255, 255, 255, 0.09);
          overflow: hidden;
        }
        .hm-rail-fill {
          height: 100%;
          width: 100%;
          transform-origin: 0 50%;
          background: var(--e-mark);
        }

        /* Enhanced: pinned, one beat at a time. Only after hydration and only when motion
           is allowed, so the static stack above is what a reader without JavaScript or with
           reduced motion gets. */
        .hm-on .hm-track {
          height: var(--hm-track);
        }
        .hm-on .hm-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0;
        }
        .hm-on .hm-stage {
          min-height: 320px;
        }
        .hm-on .hm-beat {
          position: absolute;
          inset: 0;
          margin: 0;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 620ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .hm-on .hm-beat.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .hm-on .hm-rail {
          display: block;
        }

        @media (max-width: 980px) {
          .hm-inner {
            padding: 0 28px;
          }
          .hm-eyebrow {
            margin-bottom: 48px;
          }
          .hm-on .hm-stage {
            min-height: 360px;
          }
          .hm-rail {
            margin-top: 56px;
          }
        }
      `}</style>
    </section>
  )
}
