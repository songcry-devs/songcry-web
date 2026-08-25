import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'

export const metadata = {
  title: 'Join Songcry',
  description:
    'Artists join the Songcry beta. Fans join the waitlist for first access when it opens.',
  alternates: { canonical: '/join' },
}

// Server component — the interactivity lives in JoinForm.
export default function JoinPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <section className="join-section" aria-label="Join Songcry">
          <div className="join-container">
            <h1 className="join-heading">Join Songcry</h1>
            <p className="join-subhead">
              Artists get the beta now. Fans get first access when it opens.
            </p>
            <JoinForm />
          </div>
        </section>
      </main>
      <Footer />

      {/* Scoped responsive styles — follows Hero.tsx / LegalLayout.tsx pattern */}
      <style>{`
        .join-section {
          background: rgb(8, 7, 7);
          /* Clear the fixed pill nav (top 16px + 56px tall) with room to breathe */
          padding: 152px 24px 96px;
        }
        .join-container {
          max-width: 480px;
          margin: 0 auto;
        }
        .join-heading {
          font-family: var(--font-albert);
          font-size: var(--fs-cta);           /* 42px */
          font-weight: 600;
          line-height: var(--lh-cta);         /* 46.2px */
          letter-spacing: var(--ls-cta);      /* -0.42px */
          color: #ffffff;
          margin: 0;
        }
        .join-subhead {
          font-family: var(--font-albert);
          font-size: 17px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-60);
          margin: 12px 0 32px;
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .join-section {
            padding-top: 128px;
          }
          .join-heading {
            font-size: 30px;
            line-height: 34px;
            letter-spacing: -0.3px;
          }
          .join-subhead {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  )
}
