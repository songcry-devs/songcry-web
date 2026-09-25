import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Accessibility | Songcry',
  description:
    'How accessible Songcry is today, the limitations we know about, and how to tell us about a barrier.',
  path: '/legal/accessibility',
})

export default function AccessibilityPage() {
  const doc = loadLegalDoc('accessibility')

  return (
    <LegalLayout heading={doc.title} updated={`Last updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
