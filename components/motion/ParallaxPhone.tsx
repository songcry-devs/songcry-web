'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  src: string
  alt: string
  /** Parallax strength (0 = static, 1 = scrolls 1:1). Default 0.4. */
  strength?: number
  className?: string
}

/**
 * ParallaxPhone — phone mockup that drifts on scroll at a fraction of the
 * viewport rate (default 40% = 0.6x effective). Tilts slightly at rest,
 * straightens as you scroll past the hero. prefers-reduced-motion safe.
 */
export function ParallaxPhone({ src, alt, strength = 0.4, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 120 * strength])
  const rotate = useTransform(scrollYProgress, [0, 1], [6, 0])

  return (
    <div ref={ref} className={className} style={{ display: 'flex', justifyContent: 'center' }}>
      <motion.div
        style={{
          perspective: 1000,
          y: reduce ? 0 : y,
          rotate: reduce ? 0 : rotate,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={340}
          height={630}
          priority
          style={{ width: '100%', maxWidth: '340px', height: 'auto', display: 'block' }}
        />
      </motion.div>
    </div>
  )
}
