import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: 'Terms of Use | Songcry',
  description: 'Terms and conditions for using Songcry.',
}

const sections = [
  {
    heading: '1. Acceptance and Changes to Terms',
    body: `By downloading, accessing, or using the Songcry mobile application and related services (the "App"), you agree to these Terms of Service (the "Terms"). If you do not agree, do not use the App.

If you are using the App on behalf of a company or other entity, you represent that you have authority to bind that entity, and "you" includes that entity.

These Terms incorporate our Privacy Policy (songcry.app/legal/privacy) and any additional policies we post.`,
  },
  {
    heading: '2. About Songcry',
    body: `Songcry, Inc. (the "Company", "we", "us", "our") provides a location-based music streaming and discovery platform where artists upload user-generated content and listeners stream and interact with that content through the App.`,
  },
  {
    heading: '3. Accounts and Eligibility',
    body: `You must be at least 18 years old to use the App.

Create an account using email and password or Single Sign-On. You are responsible for your credentials and all activity under your account.

Artist vs Fan accounts: The App may offer different features depending on whether you register as an artist or a fan. An artist account may include fan functionality, but a fan account does not include artist upload functionality.`,
  },
  {
    heading: '4. Beta Program Notice',
    body: `The App is in beta and provided for evaluation only. Features may change, may be limited, and may be disabled or withdrawn without notice. The beta is currently closed and invite-only; access is granted at Songcry's sole discretion.

Beta features are not guaranteed to be included in any future commercial release.`,
  },
  {
    heading: '5. License and Use Restrictions',
    body: `We grant you a limited, revocable, non-exclusive, non-transferable license to use the App in accordance with these Terms for your personal use and, if you are an artist or rights-holder, to promote and share your own content.

You must not: copy, modify, adapt, translate, reverse engineer, or create derivative works from the App; access it without authorization; scrape or harvest data using automated means; sell or commercially exploit access to the App; or use the App for unlawful, harmful, or fraudulent activity.`,
  },
  {
    heading: '6. Location Features, Permissions, and Safety',
    body: `The App's core functionality is location-based. To access key features, you must enable location services. If you do not grant location permission, some or all features of the App may not function.

The App collects precise GPS data from your device but uses it only to assign you to a geographic zone. Raw GPS coordinates are not stored or displayed beyond that initial zone assignment.

Safety notice: Do not use the App in a way that distracts you from obeying traffic, safety, or other laws, including while driving or operating machinery.`,
  },
  {
    heading: '7. User Content (UGC) and Licenses',
    body: `You retain ownership of content you submit to the App. However, you grant us a worldwide, non-exclusive, royalty-free, sublicensable license to host, store, cache, reproduce, transmit, stream, and distribute your content as necessary to operate and provide the Services.

Only artist accounts may upload content to the App. Audio uploads are currently limited to .WAV format. Video uploads are also supported.

If you upload music or other content, you represent and warrant that you own or control all rights necessary to upload and license the content to us, and the content does not infringe any third-party rights.

Except as expressly set out by Songcry in a separate written program, Songcry does not pay royalties or other compensation for plays, streams, or listening activity through the App during beta.`,
  },
  {
    heading: '8. Copyright and DMCA Takedowns',
    body: `If you believe that content available through the App infringes your copyright, you may submit a notice under the U.S. DMCA by contacting our Designated Agent:

Designated Agent: Legal Department (DMCA Agent)
Email: support@songcry.app
Address: 2360 Shasta Way, Unit G, Simi Valley, CA 93065`,
  },
  {
    heading: '9. Acceptable Use',
    body: 'You must comply with Songcry\'s Community Guidelines (songcry.app/legal/community-guidelines). You agree not to:',
    items: [
      'Violate any applicable law or regulation.',
      'Interfere with or disrupt the App, its servers, networks, or security features.',
      'Attempt to gain unauthorized access to the App, other accounts, or our systems.',
      'Use the App to transmit malware, spam, viruses, or other harmful code or content.',
      'Impersonate another person or entity, or misrepresent your affiliation.',
      'Harvest, scrape, or collect information about other users without their consent.',
      'Upload content that is unlawful, harmful, obscene, pornographic, exploitative, or abusive.',
      'Upload content that is hateful or discriminatory, or that promotes violence or hatred.',
      'Upload any content involving the sexual exploitation of minors (CSAM).',
      'Use bots, scripts, VPNs, spoofed locations, or other methods to manipulate location, plays, or App metrics.',
    ],
  },
  {
    heading: '10. Moderation and Enforcement',
    body: `We may suspend your access, restrict features, limit visibility, remove content, or otherwise limit account functionality if you breach these Terms, pose a security or legal risk, or engage in conduct harmful to us or other users.

We may also restrict features or limit visibility if we believe an account is engaged in spam, fraud, artificial engagement, botting, or location spoofing.`,
  },
  {
    heading: '11. Termination',
    body: `We may terminate or suspend your access to the App at any time, with or without notice, for any reason, including if you breach these Terms or pose a security or legal risk.

You may stop using the App at any time. To close your account, use the App settings or contact us.`,
  },
  {
    heading: '12. Disclaimers',
    body: `The App is provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.

We do not warrant that the App will be uninterrupted, error-free, or meet your needs.`,
  },
  {
    heading: '13. Limitation of Liability',
    body: `To the fullest extent permitted by law, Songcry, Inc. and its officers, directors, employees, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of or inability to use the App, even if we have been advised of the possibility of such damages.

Our total liability to you for all claims arising out of or relating to these Terms or your use of the App shall not exceed $100 USD.`,
  },
  {
    heading: '14. Governing Law',
    body: `These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Los Angeles County, California, except where prohibited by law.`,
  },
  {
    heading: '15. Contact Us',
    body: `Email: support@songcry.app
Mail: Songcry, Inc., 2360 Shasta Way, Unit G, Simi Valley, CA 93065`,
  },
]

export default function TermsPage() {
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
          Terms of Use (BETA)
        </h1>
        <p style={{ fontSize: '15px', color: '#6B6B6B', marginBottom: '64px' }}>
          Last updated: March 30, 2026
        </p>

        {sections.map(section => (
          <div key={section.heading} style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.375rem, 1vw + 1rem, 1.75rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              {section.heading}
            </h2>

            {section.body && (
              <p
                style={{
                  fontSize: '17px',
                  color: '#ABABAB',
                  lineHeight: 1.75,
                  marginBottom: section.items ? '16px' : 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {section.body}
              </p>
            )}

            {section.items && (
              <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', counterReset: 'items' }}>
                {section.items.map((item, i) => (
                  <li
                    key={item}
                    style={{
                      fontSize: '17px',
                      color: '#ABABAB',
                      lineHeight: 1.7,
                      paddingLeft: '32px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#F819C0',
                        fontWeight: 700,
                        fontSize: '14px',
                      }}
                    >
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}
