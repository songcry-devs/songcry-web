import fs from 'fs'
import path from 'path'

export interface LegalDoc {
  title: string
  version: string
  lastUpdated: string
  supersedes?: string
  blocks: LegalBlock[]
}

export type LegalBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }

/**
 * The markdown files under content/legal are the canonical, dated copies of
 * Songcry's legal documents — the same text that gets published to the live
 * marketing site. Editing the markdown is the only way these pages change,
 * so the repo carries a versioned history of every published wording.
 */
export function loadLegalDoc(slug: string): LegalDoc {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', `${slug}.md`),
    'utf8',
  )

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`Legal doc ${slug} is missing frontmatter`)

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    meta[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
  }

  return {
    title: meta.title,
    version: meta.version,
    lastUpdated: meta.lastUpdated,
    supersedes: meta.supersedes,
    blocks: parseBlocks(match[2]),
  }
}

function parseBlocks(body: string): LegalBlock[] {
  const blocks: LegalBlock[] = []
  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ kind: 'ul', items: listBuffer })
      listBuffer = []
    }
  }

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }
    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
      continue
    }
    flushList()
    if (line.startsWith('### ')) blocks.push({ kind: 'h3', text: line.slice(4) })
    else if (line.startsWith('## ')) blocks.push({ kind: 'h2', text: line.slice(3) })
    else blocks.push({ kind: 'p', text: line })
  }
  flushList()

  return blocks
}
