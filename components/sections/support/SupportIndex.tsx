'use client'

import { useEffect, useState } from 'react'

type Section = { id: string; label: string }

/**
 * The "On this page" rail for /support.
 *
 * A support page is scanned, not read: someone arrives with one problem and
 * wants the section for it. The rail stays pinned beside the answers and marks
 * the section currently in view, so the reader always knows where they are and
 * can jump sideways without scrolling back to the top.
 *
 * The active state comes from an IntersectionObserver band across the upper
 * middle of the viewport, which picks the section being read rather than the
 * one whose top edge happens to be showing. No scroll listener, no layout work
 * on scroll.
 */
export default function SupportIndex({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="support-index">
      <p className="support-index-title">On this page</p>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className="support-index-link"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
