import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'

export const metadata = {
  alternates: { canonical: '/legal/removing-intimate-images' },
  title: 'Removing Intimate Images - Songcry',
  description:
    'How to ask Songcry to remove an intimate image or video of you that was posted without your consent. We remove valid requests within 48 hours.',
}

export default function RemovingIntimateImagesPage() {
  const doc = loadLegalDoc('removing-intimate-images')

  return (
    <LegalLayout heading={doc.title} updated={`Last updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
