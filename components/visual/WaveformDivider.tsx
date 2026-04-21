type Props = {
  /** Vertical padding around the waveform (px). */
  padding?: number
  /** Optional aria-label. Defaults to decorative (aria-hidden). */
  label?: string
  className?: string
}

/**
 * Thin pink waveform divider. Inline SVG, zero-runtime, full-bleed width.
 * Used to separate hero/sections without the flatness of an <hr />.
 */
export function WaveformDivider({ padding = 48, label, className }: Props) {
  return (
    <div
      className={className}
      style={{ width: '100%', padding: `${padding}px 24px` }}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <svg
        viewBox="0 0 1200 40"
        width="100%"
        height="40"
        preserveAspectRatio="none"
        style={{ display: 'block', maxWidth: '1200px', margin: '0 auto' }}
      >
        <path
          d="M0 20 Q 30 2, 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 420 20 T 480 20 T 540 20 T 600 20 T 660 20 T 720 20 T 780 20 T 840 20 T 900 20 T 960 20 T 1020 20 T 1080 20 T 1140 20 T 1200 20"
          fill="none"
          stroke="#F819C0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
