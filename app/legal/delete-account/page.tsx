import LegalLayout from '@/components/legal/LegalLayout'
import LegalDocument from '@/components/legal/LegalDocument'
import { loadLegalDoc } from '@/lib/legal'

export const metadata = {
  alternates: { canonical: '/legal/delete-account' },
  title: 'Delete Your Account - Songcry',
  description:
    'How to delete your Songcry account from inside the app or by email, and what happens to your data when you do.',
}

export default function DeleteAccountPage() {
  const doc = loadLegalDoc('delete-account')

  return (
    <LegalLayout heading={doc.title} updated={`Last updated: ${doc.lastUpdated}`}>
      <LegalDocument blocks={doc.blocks} />
    </LegalLayout>
  )
}
