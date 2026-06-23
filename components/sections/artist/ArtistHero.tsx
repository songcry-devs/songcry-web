import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

const APP_STORE_URL = 'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

// Server component — centered dark hero for the /artist (Green Room) page
export default function ArtistHero() {
  return (
    <section className="artist-hero-section" aria-label="Green Room Invite">
      {/* Background glow — FLAG: radial-gradient is approximate; not pixel-exact from Framer */}
      <div className="artist-hero-glow" aria-hidden="true" />

      {/* Content column */}
      <div className="artist-hero-content">
        {/* Script image — "yours, not theirs" cursive, sits above headline */}
        <Reveal delay={0}>
          <div className="artist-hero-script">
            <Image
              src="/framer/artist-script.png"
              alt="yours, not theirs"
              width={327}
              height={121}
              priority
            />
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h1 className="artist-hero-headline">Green Room Invite</h1>
        </Reveal>

        {/* Tagline */}
        <Reveal delay={0.16}>
          <p className="artist-hero-tagline">
            MUSIC ARTISTS: BECOME A PART OF MUSIC HISTORY WITH SONGCRY
          </p>
        </Reveal>

        {/* CTA pill — FLAG: Framer links to /#form; we point to App Store (TJ to confirm) */}
        <Reveal delay={0.24}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="artist-hero-cta-pill"
            aria-label="Get Early Access on the App Store"
          >
            <span className="artist-hero-cta-label">Get Early Access</span>
            {/* Arrow circle icon — same SVG as Home Hero */}
            <span className="artist-hero-cta-icon" aria-hidden="true">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17.5" cy="17.5" r="17.5" fill="rgba(255,255,255,0.18)" />
                {/* Up-right arrow (↗) */}
                <path
                  d="M12 23L23 12M23 12H15M23 12V20"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </Reveal>
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / HowItWorks.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .artist-hero-section {
          position: relative;
          width: 100%;
          background: rgb(8, 7, 7);
          padding-top: 150px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        /* ── Background glow ── */
        /* FLAG: radial-gradient values are approximate — review in screenshot diff */
        .artist-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 50% 40% at 50% 30%,
            rgba(130, 60, 210, 0.35),
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Content column — centered ── */
        .artist-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* ── Script image ── */
        .artist-hero-script {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
        }

        /* ── Headline ── */
        .artist-hero-headline {
          font-family: var(--font-albert);
          font-size: 70px;
          font-weight: 600;
          line-height: 77px;
          letter-spacing: -2.2px;
          color: #fff;
          margin: 0;
        }

        /* ── Tagline ── */
        .artist-hero-tagline {
          font-family: var(--font-albert);
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: 2.8px;
          color: #fff;
          margin: 12px 0 0 0;
          text-transform: uppercase;
        }

        /* ── CTA pill — identical styling to Home hero .hero-cta-pill ── */
        .artist-hero-cta-pill {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          background: rgb(77, 77, 77);
          border-radius: 100px;
          padding: 10px 11px 10px 21px;
          margin-top: 24px;
          text-decoration: none;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
        }
        .artist-hero-cta-pill:hover {
          opacity: 0.88;
          transform: scale(1.02);
        }

        .artist-hero-cta-label {
          font-family: var(--font-albert);
          font-size: 19px;
          font-weight: 500;
          line-height: 22.8px;
          color: #fff;
          white-space: nowrap;
        }

        .artist-hero-cta-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 35px;
          height: 35px;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          /* Headline + glow remain the same at tablet */
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .artist-hero-section {
            padding-top: 130px;
            padding-bottom: 60px;
          }
          .artist-hero-headline {
            font-size: 48px !important;
            line-height: 52.8px !important;
            letter-spacing: -2.2px !important;
          }
          .artist-hero-script img {
            width: 220px !important;
            height: 81px !important;
          }
        }
      `}</style>
    </section>
  )
}
