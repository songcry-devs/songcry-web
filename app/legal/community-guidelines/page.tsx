import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'

export const metadata = {
  alternates: { canonical: '/legal/community-guidelines' },
  title: 'Community Guidelines - Songcry',
  description: 'Songcry community guidelines for artists and fans.',
}

export default function CommunityGuidelinesPage() {
  const doc = loadLegalDoc('community-guidelines')

  return (
    <LegalLayout heading={doc.title} updated={`Last updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
