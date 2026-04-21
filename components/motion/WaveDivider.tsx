'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  /** Tailwind/CSS color for the stroke. Defaults to Songcry pink. */
  color?: string
  /** Opacity of the stroke (0-1). */
  opacity?: number
  /** Height of the divider in px. */
  height?: number
  className?: string
}

/**
 * WaveDivider — Songcry visual device.
 * Thin pink SVG waveform used as an editorial section separator. Pure inline SVG,
 * zero runtime cost, zero image weight. Animates its stroke-dasharray to draw in
 * on scroll, respecting prefers-reduced-motion.
 */
export function WaveDivider({
  color = '#F819C0',
  opacity = 0.6,
  height = 24,
  className,
}: Props) {
  const reduce = useReducedMotion()
  // Pseudo-random but stable waveform path — a long repeating cubic wave.
  // Viewbox is 1200x24 — scales to container width via preserveAspectRatio.
  const path =
    'M0 12 C 25 2, 50 22, 75 12 S 125 2, 150 12 S 200 22, 225 12 S 275 2, 300 12 S 350 22, 375 12 S 425 2, 450 12 S 500 22, 525 12 S 575 2, 600 12 S 650 22, 675 12 S 725 2, 750 12 S 800 22, 825 12 S 875 2, 900 12 S 950 22, 975 12 S 1025 2, 1050 12 S 1100 22, 1125 12 S 1175 2, 1200 12'

  return (
    <div
      className={className}
      style={{ width: '100%', display: 'flex', justifyContent: 'center', opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1200 24`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        style={{ display: 'block', maxWidth: '1200px' }}
      >
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  )
}
