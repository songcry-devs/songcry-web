import Image from 'next/image'
import Script from 'next/script'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import AppStoreLink from '@/components/ui/AppStoreLink'

export const metadata = {
  title: "You're on the waitlist | Songcry",
  robots: { index: false, follow: false },
}

/**
 * Fan thank-you page. Copy is claims-locked (TJ approved) — do not reword.
 *
 * `eid` is minted by the fan server action on a REAL successful signup and
 * gates the conversion script below. Fans fire a CUSTOM event only — never
 * 'Lead' and never the Google Ads lead conversion — so fan signups can never
 * pollute artist-lead ad optimization.
 */
export default function ThanksFanPage({
  searchParams,
}: {
  searchParams: { eid?: string }
}) {
  const { eid } = searchParams

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <section className="thanks-section" aria-label="You are on the waitlist">
          <div className="thanks-container">
            <h1 className="thanks-heading">You&apos;re on the waitlist.</h1>
            <p className="thanks-body">
              Songcry is in artist beta right now. When it opens up to fans,
              you&apos;ll be one of the first we email.
            </p>
            <p className="thanks-body">
              Get the app now. The artist beta is live inside it, and
              you&apos;ll be first in the door when fan access opens.
            </p>
            <AppStoreLink
              placement="thanks-fan"
              className="thanks-badge-link"
              ariaLabel="Download Songcry on the App Store"
            >
              <Image
                src="/framer/appstore-badge.svg"
                alt="Download on the App Store"
                width={162}
                height={54}
                style={{ display: 'block' }}
              />
            </AppStoreLink>
          </div>
        </section>
      </main>
      <Footer />

      {/* Scoped responsive styles — follows Hero.tsx / LegalLayout.tsx pattern */}
      <style>{`
        .thanks-section {
          background: rgb(8, 7, 7);
          padding: 152px 24px 96px;
        }
        .thanks-container {
          max-width: 560px;
          margin: 0 auto;
        }
        .thanks-heading {
          font-family: var(--font-albert);
          font-size: var(--fs-cta);           /* 42px */
          font-weight: 600;
          line-height: var(--lh-cta);         /* 46.2px */
          letter-spacing: var(--ls-cta);      /* -0.42px */
          color: #ffffff;
          margin: 0;
        }
        .thanks-body {
          font-family: var(--font-albert);
          font-size: var(--fs-body-lg);       /* 20px */
          font-weight: 400;
          line-height: var(--lh-body-lg);     /* 30px */
          letter-spacing: var(--ls-body-lg);  /* -0.4px */
          color: var(--text-85);
          margin: 20px 0 0;
          max-width: 46ch;
        }
        .thanks-badge-link {
          display: inline-block;
          margin-top: 32px;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
        }
        .thanks-badge-link:hover {
          opacity: 0.88;
          transform: scale(1.02);
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .thanks-section {
            padding-top: 128px;
          }
          .thanks-heading {
            font-size: 30px;
            line-height: 34px;
            letter-spacing: -0.3px;
          }
          .thanks-body {
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.32px;
          }
        }
      `}</style>

      {/* Fan waitlist reporting to Meta ONLY, as a custom event.
          - fbq('trackCustom','FanWaitlist') — deliberately NOT 'Lead' and NOT
            the Google Ads lead conversion: artist-lead ad optimization must
            never learn from fan signups.
          - Fires only when a real fan eid (minted by the fan server action) is
            present, so direct visits and honeypot redirects fire nothing.
          - eventID dedupes repeat views of this page.
          - Polls because the base pixel script in the root layout and this
            script are both afterInteractive, so ordering is not guaranteed.
            Gives up after ~5s rather than looping forever. */}
      <Script id="fan-waitlist-conversion" strategy="afterInteractive">
        {`(function(){var id=${JSON.stringify(eid ?? null)};if(!id||id.indexOf('fan-')!==0)return;
var n=0;
(function f(){
if(window.fbq){window.fbq('trackCustom','FanWaitlist',{},{eventID:id});return;}
if(++n<25){setTimeout(f,200);}
})();})();`}
      </Script>
    </>
  )
}
