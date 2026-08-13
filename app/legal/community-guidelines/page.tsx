import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  alternates: { canonical: '/legal/community-guidelines' },
  title: 'Community Guidelines - Songcry',
  description: 'Songcry community guidelines for artists and fans.',
}

const guidelines = [
  {
    num: '1',
    title: 'Be Respectful',
    body: 'Do not harass, threaten, bully, or target others. No hate speech, slurs, or discriminatory content.',
  },
  {
    num: '2',
    title: 'No Impersonation or Deception',
    body: 'Do not impersonate other people, artists, brands, or organizations. Do not mislead users about who you are or what you represent.',
  },
  {
    num: '3',
    title: 'Respect Intellectual Property',
    body: 'Only upload music, artwork, and content you own or have permission to use. Do not upload copyrighted material without rights or authorization.',
  },
  {
    num: '4',
    title: 'No Unlawful, Dangerous, or Exploitative Content',
    body: 'No content that promotes illegal activity, violence, self-harm, exploitation, or sexual violence. No sexual content involving minors.',
  },
  {
    num: '5',
    title: 'No Doxxing or Sharing Private Information',
    body: "Do not post or solicit someone's private or sensitive information (addresses, phone numbers, private messages, IDs), or encourage others to do so.",
  },
  {
    num: '6',
    title: 'No Spam or Manipulation',
    body: 'No spam, scams, phishing, fake engagement, or attempts to game rankings, placement, or discovery. No malware or harmful links.',
  },
  {
    num: '7',
    title: 'Location Integrity',
    body: 'Do not falsify or manipulate location signals to misrepresent where content was created or placed. Do not use location features to stalk, intimidate, or target anyone.',
  },
  {
    num: '8',
    title: 'No Harassment',
    body: 'Do not encourage harassment, brigading, or retaliatory behavior. Do not upload content intended to provoke or incite abuse.',
  },
  {
    num: '9',
    title: 'Reporting',
    body: 'If you see content or behavior that violates these Guidelines, report it in the app or contact us at support@songcry.app.',
  },
  {
    num: '10',
    title: 'Enforcement',
    body: 'We may remove content, restrict features, suspend accounts, or ban users for violations of these Guidelines or the Terms. We may also cooperate with legal requests where required.',
  },
  {
    num: '11',
    title: 'Changes',
    body: 'These Guidelines may be updated over time. The latest version will be posted here with the "Last updated" date.',
  },
]

export default function CommunityGuidelinesPage() {
  return (
    <LegalLayout heading="Community Guidelines (BETA)" updated="Last updated: March 9, 2026">
      <p>
        Songcry is a fan-first app that helps you discover new music and emerging artists near you.
        By using Songcry, you agree to follow these Community Guidelines.
      </p>

      {guidelines.map(g => (
        <div key={g.num}>
          <h2>{g.num}. {g.title}</h2>
          <p>{g.body}</p>
        </div>
      ))}

      <div
        style={{
          marginTop: '48px',
          padding: '24px 32px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
        }}
      >
        <p style={{ marginBottom: 0 }}>
          Contact:{' '}
          <a href="mailto:support@songcry.app" style={{ color: '#F819C0', textDecoration: 'none' }}>
            support@songcry.app
          </a>
          {' '}· Copyright and DMCA notices:{' '}
          <a href="mailto:support@songcry.app" style={{ color: '#F819C0', textDecoration: 'none' }}>
            support@songcry.app
          </a>
        </p>
      </div>
    </LegalLayout>
  )
}
