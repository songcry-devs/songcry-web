'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Display text split into words so they arrive independently.
 *
 * Apple does this: a class named `words` shows up in the scroll-driven set on
 * apple.com/apple-music. A headline that fades in as one block reads as a block
 * that faded in. A headline whose words arrive in sequence reads as a sentence
 * being spoken, which is the whole point of a display line.
 *
 * Whitespace is preserved with a real trailing space inside each span plus
 * white-space pre, NOT a non-breaking space. A non-breaking space would stop the
 * headline wrapping at all, which breaks it on every narrow viewport. Line breaks are honoured by splitting on a literal newline first,
 * so a caller can control the wrap instead of leaving it to the container.
 *
 * Reduced motion renders the identical tree with the animation collapsed, so
 * there is no hydration difference and no layout shift.
 */
export default function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  y = 22,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  y?: number
}) {
  const reduced = useReducedMotion()
  const lines = text.split('\n')
  let index = 0

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="wr-line">
          {line.split(' ').map((word) => {
            const i = index++
            return (
              <motion.span
                key={`${word}-${i}`}
                className="wr-word"
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: reduced ? 0 : 0.62,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduced ? 0 : delay + i * stagger,
                }}
              >
                {word + ' '}
              </motion.span>
            )
          })}
        </span>
      ))}

      <style>{`
        .wr-line {
          display: block;
        }
        .wr-word {
          display: inline-block;
          white-space: pre;
        }
      `}</style>
    </span>
  )
}
