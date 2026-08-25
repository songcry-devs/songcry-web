import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import JoinForm from '@/components/sections/join/JoinForm'


// Server component shell; interactivity lives in JoinForm (client).
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
          <Reveal delay={0}>
            <h1 className="hero-headline">Music spreads through fans</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="hero-sub">
              Songcry is where fans decide what rises — and artists see momentum by city.
            </p>
          </Reveal>

          {/* Primary CTA: the signup form, embedded like the artists site
              embeds its form card. The download path lives in the nav. */}
          <Reveal delay={0.16}>
            <div className="hero-form">
              <JoinForm compact />
            </div>
          </Reveal>
        </div>

        {/* Phone mockup — hidden on phone breakpoint here; shown separately below on phone */}
        <div className="hero-phone-desktop">
          <Reveal delay={0.12}>
            <Image
              src="/framer/hero-phone-feed.png"
              alt="Songcry feed"
              width={307}
              height={592}
              priority
              style={{ display: 'block' }}
            />
          </Reveal>
        </div>
      </div>

      {/* Phone mockup — phone breakpoint only, below the form */}
      <div className="hero-phone-mobile">
        <Image
          src="/framer/hero-phone-feed.png"
          alt="Songcry feed"
          width={200}
          height={386}
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

        /* ── Signup form card in the hero ── */
        /* Capped at 440px so it reads as a card next to the phone on desktop;
           on phones the column is narrower than the cap, so the card is
           naturally full width inside the 24px page margins. */
        .hero-form {
          width: 100%;
          max-width: 440px;
          margin-top: 40px;
        }

        /* ── Phone mockup — desktop/tablet (right column) ── */
        .hero-phone-desktop {
          flex-shrink: 0;
          margin-left: auto;
          /* Align so left edge ≈ x949 at 1440 → relative right-column positioning */
          padding-left: 40px;
          /* Framer places the phone higher than the text (top ≈ y95 vs text y227) */
          margin-top: -132px;
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
            /* Was a fixed 159px per side; the form needs more column width
               than the old pill did, so the inset now eases down with the
               viewport instead of squeezing the card. */
            padding-left: clamp(48px, 8vw, 120px);
            padding-right: clamp(48px, 8vw, 120px);
            padding-top: 200px;
          }
          /* Scale down phone image on tablet */
          .hero-phone-desktop img {
            width: 263px !important;
            height: 507px !important;
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
          .hero-form {
            margin-top: 32px;
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
