'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Props = {
  /** Array of lines; each line is an array of word tokens. */
  lines: string[][]
  /** Optional accent word — rendered in the Songcry pink. Matched by exact string. */
  accent?: string
  className?: string
  /** Delay before the whole headline begins (ms). */
  delay?: number
}

/**
 * Kinetic headline — each word enters with a blur-from-zero + translateY(24→0)
 * staggered by 80ms. Respects prefers-reduced-motion (falls back to plain text).
 *
 * Motion language comes from PROPOSAL.md Direction 1:
 *   filter: blur(8px)→0, translateY(24→0), 500ms, cubic-bezier(0.16, 1, 0.3, 1)
 */
export function KineticHeadline({ lines, accent, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()

  let wordIndex = 0
  return (
    <h1
      className={cn(
        'font-sans text-white',
        'font-bold leading-[1.08] tracking-[-0.02em]',
        'text-[clamp(2.5rem,5vw+1rem,4.5rem)]',
        className,
      )}
      style={{ fontFamily: 'var(--font-albert-sans), system-ui, sans-serif' }}
    >
      {lines.map((words, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden pb-1">
          {words.map((word, wIdx) => {
            const index = wordIndex++
            const isAccent = accent && word.replace(/[.,]/g, '') === accent
            return (
              <motion.span
                key={`${lineIdx}-${wIdx}`}
                className="inline-block whitespace-pre"
                initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: delay / 1000 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={isAccent ? { color: '#F819C0' } : undefined}
              >
                {word}
                {wIdx < words.length - 1 ? ' ' : ''}
              </motion.span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
