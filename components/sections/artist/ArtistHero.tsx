import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

const APP_STORE_URL = 'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

// Server component — centered dark hero for the /artist (Green Room) page
export default function ArtistHero() {
  return (
    <section className="artist-hero-section" aria-label="Green Room Invite">
      {/* Animated purple swirl globe — two rotating purple-gradient rings,
          measured off Framer (gradient stops + sizes). Sits behind the copy. */}
      <div className="artist-globe" aria-hidden="true">
        <div className="globe-ring globe-ring-1" />
        <div className="globe-ring globe-ring-2" />
        <div className="globe-disc" />
        <div className="globe-core" />
      </div>

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
            {/* White circle + dark right-arrow — matches Framer */}
            <span className="artist-hero-cta-icon" aria-hidden="true">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17.5" cy="17.5" r="17.5" fill="#ffffff" />
                <path
                  d="M11.5 17.5H23M18 12.5L23 17.5L18 22.5"
                  stroke="#0a0a0a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </Reveal>
      </div>

      {/* Scoped responsive styles */}
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

        /* ── Animated swirl globe ── */
        .artist-globe {
          position: absolute;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          width: 460px;
          height: 460px;
          z-index: 0;
          pointer-events: none;
          /* soft outer purple halo around the globe */
          filter: drop-shadow(0 0 90px rgba(150, 70, 220, 0.45));
        }
        /* feathered disc gives the rings a soft glowing-sphere edge */
        .globe-disc {
          position: absolute;
          inset: 26px;
          border-radius: 50%;
          -webkit-mask: radial-gradient(circle at 50% 50%, #000 58%, transparent 78%);
          mask: radial-gradient(circle at 50% 50%, #000 58%, transparent 78%);
          box-shadow: inset 0 0 60px 10px rgba(8, 7, 7, 0.55);
          pointer-events: none;
        }
        .globe-ring {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          /* feather edges */
          -webkit-mask: radial-gradient(circle at 50% 50%, #000 56%, transparent 80%);
          mask: radial-gradient(circle at 50% 50%, #000 56%, transparent 80%);
          background: linear-gradient(
            229deg,
            rgb(223, 122, 254) 13%,
            rgba(201, 110, 240, 0) 35%,
            rgba(164, 92, 219, 0) 64%,
            rgb(129, 74, 200) 88%
          );
        }
        .globe-ring-1 {
          width: 460px;
          height: 460px;
          margin: -230px 0 0 -230px;
          animation: globe-spin 22s linear infinite;
        }
        .globe-ring-2 {
          width: 340px;
          height: 340px;
          margin: -170px 0 0 -170px;
          opacity: 0.85;
          animation: globe-spin 16s linear infinite reverse;
        }
        /* dark center so the copy stays readable */
        .globe-core {
          position: absolute;
          inset: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 45%, rgba(8,7,7,0) 30%, rgba(8,7,7,0.85) 70%);
        }
        @keyframes globe-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-ring-1, .globe-ring-2 { animation: none; }
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

        /* ── CTA pill ── */
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

        /* ── Phone: max-width 817px ── */
        @media (max-width: 817px) {
          .artist-hero-section {
            padding-top: 130px;
            padding-bottom: 60px;
          }
          .artist-globe {
            width: 340px;
            height: 340px;
            top: 96px;
          }
          .globe-ring-1 { width: 340px; height: 340px; margin: -170px 0 0 -170px; }
          .globe-ring-2 { width: 250px; height: 250px; margin: -125px 0 0 -125px; }
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
