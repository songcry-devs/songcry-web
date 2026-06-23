import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

const APP_STORE_URL = 'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

// Server component — centered dark hero for the /artist (Green Room) page
export default function ArtistHero() {
  return (
    <section className="artist-hero-section" aria-label="Green Room Invite">
      {/* Sparkle starfield (matches Framer) */}
      <div className="artist-stars" aria-hidden="true" />

      {/* Animated purple globe — a glowing sphere (dark core + purple atmosphere
          rim) with rotating swirl bands on its surface. Sits behind the copy. */}
      <div className="artist-globe" aria-hidden="true">
        <div className="globe-sphere">
          <div className="globe-ring globe-ring-1" />
          <div className="globe-ring globe-ring-2" />
          <div className="globe-shade" />
        </div>
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
                  d="M13 22L22 13M22 13H15.5M22 13V19.5"
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
          /* Match Framer: script lands ~y286, headline ~y406, section ~800 tall */
          padding-top: 280px;
          padding-bottom: 206px;
          overflow: hidden;
        }

        /* ── Sparkle starfield ── */
        .artist-stars {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            radial-gradient(2px 2px at 7% 20%, rgba(255,255,255,0.95), transparent),
            radial-gradient(1.6px 1.6px at 13% 52%, rgba(255,255,255,0.75), transparent),
            radial-gradient(1.8px 1.8px at 19% 78%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1.5px 1.5px at 24% 34%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2.1px 2.1px at 30% 62%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 36% 14%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.7px 1.7px at 41% 86%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 47% 44%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 55% 24%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.6px 1.6px at 60% 70%, rgba(255,255,255,0.75), transparent),
            radial-gradient(1.8px 1.8px at 66% 40%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1.5px 1.5px at 72% 84%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2.1px 2.1px at 78% 28%, rgba(255,255,255,0.95), transparent),
            radial-gradient(1.6px 1.6px at 83% 58%, rgba(255,255,255,0.75), transparent),
            radial-gradient(1.8px 1.8px at 88% 80%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1.5px 1.5px at 93% 36%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.7px 1.7px at 50% 90%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 4% 66%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.6px 1.6px at 96% 16%, rgba(255,255,255,0.8), transparent);
        }

        /* ── Animated purple globe (sphere) ── */
        .artist-globe {
          position: absolute;
          top: 197px;
          left: 50%;
          transform: translateX(-50%);
          width: 406px;
          height: 406px;
          z-index: 0;
          pointer-events: none;
        }
        /* the sphere body: dark core, soft purple atmosphere, gentle rim + halo */
        .globe-sphere {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          background: radial-gradient(
            circle at 50% 42%,
            #0c0a14 0%,
            #161026 46%,
            rgba(96, 50, 150, 0.4) 74%,
            rgba(150, 86, 206, 0.5) 90%,
            rgba(110, 56, 176, 0) 100%
          );
          box-shadow:
            0 0 110px 16px rgba(120, 62, 190, 0.3),
            inset 0 -28px 80px rgba(0, 0, 0, 0.66),
            inset 0 22px 56px rgba(130, 80, 200, 0.16);
        }
        /* rotating swirl bands across the sphere surface */
        .globe-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          mix-blend-mode: screen;
          background: linear-gradient(
            229deg,
            rgb(223, 122, 254) 13%,
            rgba(201, 110, 240, 0) 35%,
            rgba(164, 92, 219, 0) 64%,
            rgb(129, 74, 200) 88%
          );
        }
        .globe-ring-1 {
          width: 456px;
          height: 456px;
          margin: -228px 0 0 -228px;
          opacity: 0.42;
          animation: globe-spin 26s linear infinite;
        }
        .globe-ring-2 {
          width: 356px;
          height: 356px;
          margin: -178px 0 0 -178px;
          opacity: 0.3;
          animation: globe-spin 19s linear infinite reverse;
        }
        /* darken the centre so the white copy stays readable */
        .globe-shade {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 44%, rgba(8, 7, 7, 0.72) 30%, rgba(8, 7, 7, 0) 64%);
          pointer-events: none;
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
          transition: background 220ms ease;
        }
        .artist-hero-cta-label {
          font-family: var(--font-albert);
          font-size: 19px;
          font-weight: 500;
          line-height: 22.8px;
          color: #fff;
          white-space: nowrap;
          transition: color 220ms ease;
        }
        /* Reverse on hover (matches Framer) */
        .artist-hero-cta-icon svg circle { transition: fill 220ms ease; }
        .artist-hero-cta-icon svg path { transition: stroke 220ms ease; }
        .artist-hero-cta-pill:hover { background: #ffffff; }
        .artist-hero-cta-pill:hover .artist-hero-cta-label { color: #0a0a0a; }
        .artist-hero-cta-pill:hover .artist-hero-cta-icon svg circle { fill: #141414; }
        .artist-hero-cta-pill:hover .artist-hero-cta-icon svg path { stroke: #ffffff; }
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
            padding-top: 190px;
            padding-bottom: 120px;
          }
          .artist-globe {
            width: 320px;
            height: 320px;
            top: 150px;
          }
          .globe-ring-1 { width: 356px; height: 356px; margin: -178px 0 0 -178px; }
          .globe-ring-2 { width: 256px; height: 256px; margin: -128px 0 0 -128px; }
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
