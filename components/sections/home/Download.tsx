import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

// Server component — centered CTA section with App Store badge
export default function Download() {
  return (
    <section className="download-section" aria-label="Download Songcry">
      {/* Purple/pink glow + perspective floor grid that RISE from the footer
          boundary up into the section (the footer panel itself stays clean). */}
      <div className="download-glow" aria-hidden="true" />
      <div className="download-floor" aria-hidden="true">
        <div className="download-floor-grid" />
      </div>

      <div className="download-content">
        {/* Heading */}
        <Reveal delay={0}>
          <h2 className="download-heading">Join early and discover what&apos;s rising near you.</h2>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={0.08}>
          <p className="download-subhead">
            The beta is live. Artists can join now — fan access is coming soon.
          </p>
        </Reveal>

        {/* App Store badge link */}
        <Reveal delay={0.16}>
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
        </Reveal>
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / HowItWorks.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        /* overflow visible so the tall purple glow can RISE up out of this
           section into the area above (matches Framer, where the purple
           reaches ~500px above the footer boundary). */
        .download-section {
          position: relative;
          background: rgb(8, 7, 7);
          padding-top: 96px;
          padding-bottom: 64px;
        }

        /* Tall purple/pink glow that rises ~520px from the footer boundary up
           into the section above, fading gradually (measured off Framer). */
        .download-glow {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 780px;
          z-index: 0;
          pointer-events: none;
          /* Purer, dimmer magenta (R close to B, low green) so it is not blown
             out and the grid shows through — matches Framer peak rgb(54,7,53). */
          background:
            radial-gradient(58% 120% at 50% 100%, rgba(200, 14, 194, 0.25), rgba(168, 22, 190, 0.09) 54%, transparent 88%),
            radial-gradient(40% 104% at 22% 100%, rgba(176, 18, 196, 0.12), transparent 80%);
          -webkit-mask: linear-gradient(to top, #000 0%, #000 6%, transparent 100%);
          mask: linear-gradient(to top, #000 0%, #000 6%, transparent 100%);
        }

        /* Perspective floor: a grid tilted away from the viewer so it recedes
           UPWARD from the footer boundary (angled tiles, not flat squares). */
        .download-floor {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 360px;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          perspective: 420px;
          perspective-origin: 50% 100%;
          -webkit-mask: linear-gradient(to top, #000 6%, transparent 82%);
          mask: linear-gradient(to top, #000 6%, transparent 82%);
        }
        .download-floor-grid {
          position: absolute;
          left: -60%;
          right: -60%;
          bottom: 0;
          height: 600px;
          transform-origin: 50% 100%;
          transform: rotateX(74deg);
          background:
            repeating-linear-gradient(0deg, rgba(236, 150, 224, 0.26) 0 1px, transparent 1px 46px),
            repeating-linear-gradient(90deg, rgba(236, 150, 224, 0.2) 0 1px, transparent 1px 46px);
        }

        /* ── Content wrapper ── */
        .download-content {
          position: relative;
          z-index: 1;
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
          margin: 0 auto;
          max-width: 900px;
          /* balance the wrap so it never leaves a lone word on line 2 */
          text-wrap: balance;
        }

        /* ── Subhead ── */
        .download-subhead {
          font-family: var(--font-albert);
          font-size: var(--fs-body-lg);       /* 20px */
          font-weight: 400;
          line-height: var(--lh-body-lg);     /* 30px */
          letter-spacing: var(--ls-body-lg);  /* -0.4px */
          color: var(--text-60);              /* rgba(255,255,255,0.6) */
          margin: 24px auto 0;                /* auto = keep the max-width block centered */
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
