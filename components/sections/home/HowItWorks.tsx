import Reveal from '@/components/motion/Reveal'

// Server component — text-only centered section, no interactivity
export default function HowItWorks() {
  return (
    <section className="howitworks-section" aria-label="How Songcry Works">
      <div className="howitworks-content">
        <Reveal delay={0}>
          <h2 className="howitworks-heading">How Songcry Works</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="howitworks-body">
            Songcry is a geolocation-based music discovery app. Artists upload songs and grow their audience city by city. Fans swipe through a personalized feed of music rising in their area — driven by real listeners, not algorithms.
          </p>
          <p className="howitworks-body howitworks-body-2">
            Create your account with Google, Apple, or email to start discovering what&apos;s next in your city.
          </p>
        </Reveal>
      </div>

      {/* Scoped responsive styles — follows Hero.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .howitworks-section {
          background: rgb(8, 7, 7);
          padding-top: 64px;
          padding-bottom: 64px;
        }

        /* ── Content wrapper ── */
        .howitworks-content {
          max-width: 680px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          text-align: center;
        }

        /* ── Heading ── */
        .howitworks-heading {
          font-family: var(--font-albert);
          font-size: var(--fs-h2);           /* 54px */
          font-weight: 600;
          line-height: var(--lh-h2);         /* 59.4px */
          letter-spacing: var(--ls-h2);      /* -1.08px */
          color: #fff;
          margin: 0;
        }

        /* ── Body paragraph ── */
        .howitworks-body {
          font-family: var(--font-albert);
          font-size: var(--fs-body-xl);      /* 24px */
          font-weight: 400;
          line-height: var(--lh-body-xl);    /* 38.4px */
          letter-spacing: var(--ls-body-xl); /* -0.48px */
          color: var(--text-60);             /* rgba(255,255,255,0.6) */
          margin: 8px 0 0 0;
          max-width: 680px;
        }
        /* Framer renders the body as two paragraphs with a blank-line gap */
        .howitworks-body-2 {
          margin-top: 38px;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          .howitworks-section {
            padding-top: 64px;
            padding-bottom: 64px;
          }
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .howitworks-heading {
            font-size: 28px !important;
            line-height: 33.6px !important;
            letter-spacing: -0.56px !important;
          }
          .howitworks-body {
            font-size: 15px !important;
            line-height: 25.5px !important;
            letter-spacing: -0.3px !important;
          }
        }
      `}</style>
    </section>
  )
}
