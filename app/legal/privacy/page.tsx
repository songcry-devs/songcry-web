import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Privacy Policy - Songcry',
  description: 'How Songcry collects, uses, and protects your information.',
}

const sections = [
  {
    heading: 'Introduction',
    body: `This Privacy Policy explains how Songcry, Inc. ("Songcry," "we," "us," "our") collects, uses, discloses, and protects information when you access or use our mobile application and related services, which we refer to as the "Services."

If you do not agree with this Privacy Policy, do not use the Services.`,
  },
  {
    heading: 'Geographic Availability',
    body: `The Services are controlled and operated from California, United States and are intended for use by residents of the United States. If you access the Services from outside the U.S., your information may be processed in the U.S. and other jurisdictions as described below.`,
  },
  {
    heading: 'Notice at Collection (California)',
    body: `At or before the point of collection, we collect the categories of personal information described under "Information We Collect" and use them for the business and commercial purposes described under "How We Use Information."

We do not sell personal information, and we do not share personal information for cross-context behavioral advertising during the beta.`,
  },
  {
    heading: 'Information We Collect',
    body: `We collect information in three ways: information you provide, information collected automatically, and information from third parties.`,
    subsections: [
      {
        heading: 'Information You Provide',
        items: [
          'Account and profile information: email address, username or handle, profile photo, bio, and other details you choose to provide.',
          'Authentication information: password stored as a hash and other account settings.',
          'Account type information: artist or fan. Features may vary by account type.',
          'User Content: content you upload, post, or otherwise submit, such as audio, video, and related metadata.',
          'Reports and complaints: information you submit when you report content or user conduct.',
          'Support communications: the information you provide when you contact us or participate in surveys.',
          'We do not currently offer direct messaging between users.',
        ],
      },
      {
        heading: 'Information Collected Automatically',
        items: [
          'Device and usage information: device type, operating system, app version, language settings, IP address, device identifiers, log data, and in-app activity.',
          'Diagnostics and performance data during beta: crash reports, diagnostics, and performance information.',
          'Location information: the Services are location-based. Location permission is required. The App collects precise GPS data but uses it only to assign you to a geographic zone. Raw GPS coordinates are not stored or displayed beyond that initial zone assignment.',
        ],
      },
      {
        heading: 'Information From Third Parties',
        items: [
          'Single Sign-On (SSO): if you sign in using Apple or Google, we receive information needed to authenticate you and create or link your account.',
          'App Store or Google Play: those platforms may collect information about you and your device governed by their own privacy policies.',
        ],
      },
    ],
  },
  {
    heading: 'How We Use Information',
    body: 'We use information to:',
    items: [
      'Provide and operate the Services, including account creation, authentication, streaming, and feature delivery.',
      'Enable location-based functionality and prevent misuse of location-dependent features.',
      'Communicate with you, including service, security, and administrative messages.',
      'Send push notifications for service-related and operational purposes.',
      'Improve and develop the Services, including diagnostics, crash reporting, analytics, and performance measurement.',
      'Conduct testing and research during beta, including A/B testing.',
      'Moderate content and handle reports to help keep the Services safe and enforce our Terms and Community Guidelines.',
      'Protect platform integrity and security, including detecting and preventing fraud, botting, and location spoofing.',
      'Comply with law and enforce agreements.',
    ],
  },
  {
    heading: 'How We Share Information',
    body: 'We may disclose information:',
    items: [
      'To service providers that help us operate the Services (hosting, storage, authentication, diagnostics, email delivery, customer support).',
      'For legal and safety reasons, to comply with law, respond to valid legal process, and enforce our Terms.',
      'In connection with a business transaction such as merger, acquisition, or sale of assets, subject to appropriate protections.',
      'With your direction, when you choose to connect a third-party integration or share content publicly.',
    ],
  },
  {
    heading: 'No Sale or Targeted Advertising During Beta',
    body: 'We do not sell personal information, and we do not share personal information for cross-context behavioral advertising during the beta.',
  },
  {
    heading: 'Your Choices',
    items: [
      'Location permissions: you can enable or disable location access in device settings. Certain features may not function without location access.',
      'Push notifications: you can control push notifications through your device settings.',
      'Marketing communications: you can opt out of promotional emails using the unsubscribe link. Service messages may still be sent.',
      'Account information: you may be able to update certain account and profile information within the App.',
      'Account security: contact us at support@songcry.app if you suspect unauthorized access.',
    ],
  },
  {
    heading: 'Data Retention',
    body: 'We retain information for as long as reasonably necessary to provide the Services and for legitimate business purposes such as security, fraud prevention, compliance, and dispute resolution. Location data and account data are retained until the user deletes their account.',
  },
  {
    heading: 'Data Security',
    body: 'We use reasonable administrative, technical, and organizational safeguards designed to protect information. However, no system is completely secure. If you believe you have found a security vulnerability, please contact us at support@songcry.app.',
  },
  {
    heading: 'California Privacy Rights',
    body: 'If you are a California resident, you may have the right to request access to, deletion of, and correction of personal information, subject to verification requirements and exceptions. We do not sell personal information and do not share for cross-context behavioral advertising during beta.',
  },
  {
    heading: 'How to Submit a Request',
    body: 'Email support@songcry.app with the subject line "Privacy Request" or "California Privacy Request" if applicable. We will take reasonable steps to verify your request. We will not discriminate against you for exercising your privacy rights.',
  },
  {
    heading: "Children's Privacy",
    body: 'The Services are not intended for anyone under 18, and we do not knowingly collect personal information from anyone under 18. If we learn we have collected personal information from someone under 18, we will take steps to delete it.',
  },
  {
    heading: 'Contact Us',
    body: `Email: support@songcry.app
Mail: Songcry, Inc., 2360 Shasta Way, Unit G, Simi Valley, CA 93065

Copyright and DMCA notices: support@songcry.app
Designated Agent: Legal Department (DMCA Agent), 2360 Shasta Way, Unit G, Simi Valley, CA 93065`,
  },
  {
    heading: 'Changes to This Privacy Policy',
    body: 'We may update this Privacy Policy from time to time. We will update the "Last Updated" date above. If we make material changes, we may provide additional notice before changes take effect.',
  },
]

export default function PrivacyPage() {
  return (
    <LegalLayout heading="Privacy Policy (BETA)" updated="Last Updated: March 30, 2026">
      {sections.map(section => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body && (
            <p style={{ whiteSpace: 'pre-line' }}>{section.body}</p>
          )}
          {section.items && (
            <ul>
              {section.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.subsections?.map(sub => (
            <div key={sub.heading}>
              <h3>{sub.heading}</h3>
              <ul>
                {sub.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </LegalLayout>
  )
}
