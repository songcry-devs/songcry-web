import React from 'react'
import type { LegalBlock } from '@/lib/legal'

/**
 * Renders the parsed markdown of a legal document. Inline syntax is limited
 * on purpose — bold and links only — so the published wording stays a faithful
 * rendering of the source file rather than something a markdown engine
 * reinterprets.
 */
export default function LegalDocument({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return <h2 key={i}>{inline(block.text)}</h2>
          case 'h3':
            return <h3 key={i}>{inline(block.text)}</h3>
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </ul>
            )
          default:
            return <p key={i}>{inline(block.text)}</p>
        }
      })}
    </>
  )
}

// **bold** and [text](href)
function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>)
    } else {
      nodes.push(
        <a key={key++} href={match[3]} target="_blank" rel="noopener noreferrer">
          {match[2]}
        </a>,
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))

  return nodes
}
