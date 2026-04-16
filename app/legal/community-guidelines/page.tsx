import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: 'Community Guidelines | Songcry',
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
    <div style={{ background: '#080707', minHeight: '100vh' }}>
      <Nav />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 3vw + 1.25rem, 3.5rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '12px',
          }}
        >
          Community Guidelines (BETA)
        </h1>
        <p style={{ fontSize: '15px', color: '#6B6B6B', marginBottom: '16px' }}>
          Last updated: March 9, 2026
        </p>
        <p
          style={{
            fontSize: '17px',
            color: '#ABABAB',
            lineHeight: 1.7,
            marginBottom: '64px',
          }}
        >
          Songcry is a fan-first app that helps you discover new music and emerging artists near you.
          By using Songcry, you agree to follow these Community Guidelines.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {guidelines.map(g => (
            <div
              key={g.num}
              style={{
                display: 'flex',
                gap: '24px',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(248,25,192,0.12)',
                  border: '1px solid rgba(248,25,192,0.24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#F819C0',
                  marginTop: '2px',
                }}
              >
                {g.num}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: '19px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}
                >
                  {g.title}
                </h2>
                <p
                  style={{
                    fontSize: '17px',
                    color: '#ABABAB',
                    lineHeight: 1.7,
                  }}
                >
                  {g.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '64px',
            padding: '24px 32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
          }}
        >
          <p style={{ fontSize: '15px', color: '#ABABAB' }}>
            Contact:{' '}
            <a
              href="mailto:support@songcry.app"
              style={{ color: '#F819C0', textDecoration: 'none' }}
            >
              support@songcry.app
            </a>
            {' '}· Copyright and DMCA notices:{' '}
            <a
              href="mailto:support@songcry.app"
              style={{ color: '#F819C0', textDecoration: 'none' }}
            >
              support@songcry.app
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
