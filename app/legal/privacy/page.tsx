import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy | Songcry',
  description: 'How Songcry collects, uses, and protects your information.',
  path: '/legal/privacy',
})

export default function PrivacyPage() {
  const doc = loadLegalDoc('privacy-policy')

  return (
    <LegalLayout heading={doc.title} updated={`Last Updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
