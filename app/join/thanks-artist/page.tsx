import Image from 'next/image'
import Script from 'next/script'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import AppStoreLink from '@/components/ui/AppStoreLink'

export const metadata = {
  title: "You're in | Songcry",
  robots: { index: false, follow: false },
}

/**
 * Artist thank-you page. Copy is claims-locked (TJ approved) — do not reword.
 *
 * `eid` is minted by the artist server action on a REAL successful insert and
 * gates the conversion script below: a direct visit or bookmark of this page
 * fires nothing, and honeypot redirects arrive without an eid on purpose.
 */
export default function ThanksArtistPage({
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
        <section className="thanks-section" aria-label="You are in">
          <div className="thanks-container">
            <h1 className="thanks-heading">You&apos;re in.</h1>
            <p className="thanks-body">
              The app is artist-only during beta. Download it and post three
              tracks worth leading with.
            </p>
            <AppStoreLink
              placement="thanks-artist"
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
            <p className="thanks-note">We&apos;ll email you as things move.</p>
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
        .thanks-note {
          font-family: var(--font-albert);
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-60);
          margin: 24px 0 0;
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

      {/* Lead conversion reporting to Meta AND Google Ads, in one script.
          - Fires ONLY when a real lead eid (minted by the artist server action)
            is present: direct visits, refreshes without the param, and honeypot
            redirects fire nothing.
          - The Google conversion label comes from env NEXT_PUBLIC_GADS_LEAD_LABEL
            because the conversion action must first be created in the Google Ads
            UI (TJ). Until it is set, the Google half stays silent while Meta
            still fires — a graceful no-op, not an error.
          - transaction_id (Google) / eventID (Meta) dedupe repeat views of this
            page, and eventID lets a future server-side CAPI event pair with the
            pixel instead of double counting.
          - Polls because the base pixel/gtag scripts in the root layout and this
            script are all afterInteractive, so ordering is not guaranteed.
            Gives up after ~5s rather than looping forever. */}
      <Script id="artist-lead-conversions" strategy="afterInteractive">
        {`(function(){var id=${JSON.stringify(eid ?? null)};if(!id||id.indexOf('lead-')!==0)return;
var n=0,fb=0,g=0,label=${JSON.stringify(process.env.NEXT_PUBLIC_GADS_LEAD_LABEL ?? '')};
(function f(){
if(!fb&&window.fbq){fb=1;window.fbq('track','Lead',{},{eventID:id});}
if(!g&&label&&window.gtag){g=1;window.gtag('event','conversion',{send_to:'AW-18264662044/'+label,transaction_id:id});}
if((!fb||(!g&&label))&&++n<25){setTimeout(f,200);}
})();})();`}
      </Script>
    </>
  )
}
