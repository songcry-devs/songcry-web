// Server component — centered "Calling All Music Artists" intro section
export default function CallingIntro() {
  return (
    <section className="calling-section" aria-label="Calling All Music Artists">
      <div className="calling-content">
        {/* Heading */}
        <h2 className="calling-heading">Calling All Music Artists</h2>

        {/* Subtitle — brand casing normalized to "Songcry" (FLAG: live Framer renders "SongCry" — brand typo, fixed here) */}
        <p className="calling-subtitle">
          Songcry is the only platform that helps you build a real fanbase in your city and beyond.
        </p>
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / HowItWorks.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .calling-section {
          width: 100%;
          background: rgb(8, 7, 7);
          padding-top: 96px;
          padding-bottom: 0;
        }

        /* ── Content column — centered ── */
        .calling-content {
          max-width: 687px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          text-align: center;
        }

        /* ── Heading ── */
        .calling-heading {
          font-family: var(--font-albert);
          font-size: 54px;
          font-weight: 600;
          line-height: 54px;
          letter-spacing: normal;
          color: #fff;
          margin: 0;
        }

        /* ── Subtitle ── */
        .calling-subtitle {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
          color: var(--text-60);   /* rgba(255,255,255,0.6) */
          margin: 16px 0 0 0;
          max-width: 687px;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          /* Heading + subtitle remain same at tablet per brief */
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .calling-section {
            padding-top: 96px;
          }
          .calling-heading {
            font-size: 24px !important;
            line-height: 28.8px !important;
          }
          .calling-subtitle {
            font-size: 15px !important;
            line-height: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
