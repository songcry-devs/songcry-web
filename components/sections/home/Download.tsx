import Image from 'next/image'

// Server component — centered CTA section with App Store badge
export default function Download() {
  return (
    <section className="download-section" aria-label="Download Songcry">
      <div className="download-content">
        {/* Heading */}
        <h2 className="download-heading">Join early and discover what’s rising near you.</h2>

        {/* Subhead */}
        <p className="download-subhead">
          The beta is live. Artists can join now — fan access is coming soon.
        </p>

        {/* App Store badge link */}
        <a
          href="https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416"
          target="_blank"
          rel="noopener noreferrer"
          className="download-badge-link"
          aria-label="Download Songcry on the App Store"
        >
          <Image
            src="/framer/appstore-badge.svg"
            alt="Download on the App Store"
            width={162}
            height={54}
            style={{ display: 'block' }}
          />
        </a>
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / HowItWorks.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .download-section {
          background: rgb(8, 7, 7);
          padding-top: 96px;
          padding-bottom: 64px;
        }

        /* ── Content wrapper ── */
        .download-content {
          /* 900px heading usable width (matches Framer one-line heading) + 24px gutters */
          max-width: 948px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          text-align: center;
        }

        /* ── Heading ── */
        .download-heading {
          font-family: var(--font-albert);
          font-size: var(--fs-cta);           /* 42px */
          font-weight: 600;
          line-height: var(--lh-cta);         /* 46.2px */
          letter-spacing: var(--ls-cta);      /* -0.42px */
          color: #fff;
          margin: 0;
          max-width: 900px;
        }

        /* ── Subhead ── */
        .download-subhead {
          font-family: var(--font-albert);
          font-size: var(--fs-body-lg);       /* 20px */
          font-weight: 400;
          line-height: var(--lh-body-lg);     /* 30px */
          letter-spacing: var(--ls-body-lg);  /* -0.4px */
          color: var(--text-60);              /* rgba(255,255,255,0.6) */
          margin: 24px 0 0 0;
          max-width: 728px;
        }

        /* ── Badge link ── */
        .download-badge-link {
          display: inline-block;
          margin-top: 24px;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
        }
        .download-badge-link:hover {
          opacity: 0.88;
          transform: scale(1.02);
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          /* No changes needed for tablet — inherit desktop values */
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .download-heading {
            font-size: 24px !important;
            line-height: 28.8px !important;
            letter-spacing: -0.24px !important;
          }
          .download-subhead {
            font-size: 15px !important;
            line-height: 24px !important;
            letter-spacing: -0.3px !important;
          }
        }
      `}</style>
    </section>
  )
}
