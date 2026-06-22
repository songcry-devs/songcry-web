import Image from 'next/image'

const APP_STORE_URL = 'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

// Server component — no client interactivity needed; hover via CSS class
export default function Hero() {
  return (
    <section className="hero-section" aria-label="Hero">
      {/* Full-bleed background image */}
      <div className="hero-bg-wrap" aria-hidden="true">
        <Image
          src="/framer/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Bottom gradient overlay — fades into page bg (rgb(8,7,7)) */}
        <div className="hero-fade" aria-hidden="true" />
      </div>

      {/* Content layer */}
      <div className="hero-content">
        {/* Text column */}
        <div className="hero-text">
          <h1 className="hero-headline">Music spreads through fans</h1>
          <p className="hero-sub">
            Songcry is where fans decide what rises — and artists see momentum by city.
          </p>

          {/* CTA pill */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-pill"
            aria-label="Download on the App Store"
          >
            <span className="hero-cta-label">Download on the App Store</span>
            {/* Arrow circle icon — FLAG: exact circle/arrow styling is approximate */}
            <span className="hero-cta-icon" aria-hidden="true">
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
        </div>

        {/* Phone mockup — hidden on phone breakpoint here; shown separately below on phone */}
        <div className="hero-phone-desktop">
          <Image
            src="/framer/hero-phone.png"
            alt="Songcry app on iPhone"
            width={307}
            height={595}
            priority
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Phone mockup — phone breakpoint only, below CTA */}
      <div className="hero-phone-mobile">
        <Image
          src="/framer/hero-phone.png"
          alt="Songcry app on iPhone"
          width={200}
          height={380}
          priority
          style={{ display: 'block' }}
        />
      </div>

      {/* Scoped responsive styles — follows nav.tsx / footer.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .hero-section {
          position: relative;
          /* Desktop height */
          min-height: 784px;
          background: rgb(8, 7, 7);
          overflow: hidden;
        }

        /* ── Background image wrapper ── */
        .hero-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        /* ── Bottom gradient fade to page bg ── */
        /* FLAG: gradient stop/length is approximate — not pixel-exact; review in screenshot diff */
        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(to bottom, transparent, rgb(8, 7, 7));
          z-index: 1;
        }

        /* ── Content wrapper ── */
        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          /* Desktop: symmetric inset ~184px (phone right edge aligns to content box) */
          padding-left: 184px;
          padding-right: 184px;
          /* Headline top ≈ y227 — nav is fixed ~72px, add padding-top to clear it */
          padding-top: 227px;
        }

        /* ── Text column ── */
        .hero-text {
          flex: 1;
          min-width: 0;
          max-width: 663px;
        }

        /* ── Headline ── */
        .hero-headline {
          font-family: var(--font-albert);
          font-size: var(--fs-hero);           /* 84px */
          font-weight: 600;
          line-height: var(--lh-hero);         /* 84px */
          letter-spacing: var(--ls-hero);      /* -1.68px */
          color: #fff;
          margin: 0;
          max-width: 663px;
        }

        /* ── Subtext ── */
        .hero-sub {
          font-family: var(--font-albert);
          font-size: var(--fs-body-lg);        /* 20px */
          font-weight: 400;
          line-height: var(--lh-body-lg);      /* 30px */
          letter-spacing: var(--ls-body-lg);   /* -0.4px */
          color: var(--text-85);               /* rgba(255,255,255,0.85) */
          margin: 24px 0 0 0;
          max-width: 663px;
        }

        /* ── CTA pill ── */
        .hero-cta-pill {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          background: rgb(77, 77, 77);
          border-radius: 100px;
          padding: 10px 11px 10px 21px;
          margin-top: 40px;
          text-decoration: none;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
        }
        .hero-cta-pill:hover {
          opacity: 0.88;
          transform: scale(1.02);
        }

        .hero-cta-label {
          font-family: var(--font-albert);
          font-size: var(--fs-badge);          /* 19px */
          font-weight: 500;
          line-height: var(--lh-badge);        /* 22.8px */
          color: #fff;
          white-space: nowrap;
        }

        .hero-cta-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 35px;
          height: 35px;
        }

        /* ── Phone mockup — desktop/tablet (right column) ── */
        .hero-phone-desktop {
          flex-shrink: 0;
          margin-left: auto;
          /* Align so left edge ≈ x949 at 1440 → relative right-column positioning */
          padding-left: 40px;
        }

        /* Phone breakpoint version hidden by default */
        .hero-phone-mobile {
          display: none;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          .hero-section {
            min-height: 638px;
          }
          .hero-content {
            padding-left: 159px;
            padding-right: 159px;
            padding-top: 200px;
          }
          /* Scale down phone image on tablet */
          .hero-phone-desktop img {
            width: 263px !important;
            height: 510px !important;
          }
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .hero-section {
            min-height: 762px;
          }
          .hero-content {
            flex-direction: column;
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 160px;
          }
          .hero-headline {
            font-size: 38px !important;
            line-height: 43.7px !important;
            letter-spacing: -0.76px !important;
          }
          .hero-sub {
            font-size: 15px !important;
            line-height: 24px !important;
            letter-spacing: -0.3px !important;
          }
          /* Hide the desktop phone image */
          .hero-phone-desktop {
            display: none;
          }
          /* Show mobile phone image below CTA */
          .hero-phone-mobile {
            display: flex;
            justify-content: center;
            padding: 40px 0 0 0;
            position: relative;
            z-index: 2;
          }
        }
      `}</style>
    </section>
  )
}
