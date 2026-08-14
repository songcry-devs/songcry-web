import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'

export const metadata = {
  alternates: { canonical: '/legal/terms-of-use' },
  title: 'Terms of Use - Songcry',
  description: 'The terms that apply when you use Songcry.',
}

export default function TermsPage() {
  const doc = loadLegalDoc('terms-of-use')

  return (
    <LegalLayout heading={doc.title} updated={`Last updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
