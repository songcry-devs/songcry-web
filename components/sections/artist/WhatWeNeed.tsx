import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

// Server component — no client interactivity needed
// NOTE: Card 3 title "Drop exclusives" is the corrected spelling;
// the live Framer site has a typo "Drop exlusives" — this is intentional.

const CARDS = [
  {
    image: '/framer/needs-card-1.jpg',
    imageAlt: 'Artist performing on stage',
    title: 'Post your 3 greatest tracks',
    body: 'Choose wisely — these are your hero songs that will shape your scene',
  },
  {
    image: '/framer/needs-card-2.png',
    imageAlt: 'Artist engaging with fans on phone',
    title: 'Engage your fans.',
    body: 'Reply when they reach out. Keep in touch with them often',
  },
  {
    image: '/framer/hero-bg.png',
    imageAlt: 'Live music performance with crowd',
    title: 'Drop exclusives',
    body: 'A single, demo, live recording, or unreleased track sent through Songcry before it hits other platforms',
  },
  {
    image: '/framer/needs-card-4.jpg',
    imageAlt: 'Artist sharing growth metrics on device',
    title: 'Share your growth story after 90 days.',
    body: 'Video testimonial showing real metrics',
  },
  {
    image: '/framer/needs-card-5.jpg',
    imageAlt: 'Group of artists collaborating',
    title: 'Invite 3–5 artists you respect.',
    body: 'Help us build quality, not quantity',
  },
]

export default function WhatWeNeed() {
  return (
    <section className="wwn-section" aria-label="What We Need From You">
      {/* Section header */}
      <Reveal delay={0}>
        <div className="wwn-header">
          {/* Pink Songcry wordmark graphic */}
          <div className="wwn-graphic-wrap" aria-hidden="true">
            <Image
              src="/framer/artist-needs-graphic.png"
              alt="Songcry wordmark"
              width={339}
              height={72}
              style={{ display: 'block' }}
            />
          </div>

          <h2 className="wwn-heading">What We Need From You</h2>
          <p className="wwn-subtitle">We bring the platform and audience. You bring the energy.</p>
        </div>
      </Reveal>

      {/* Card grid */}
      <div className="wwn-grid">
        {CARDS.map(({ image, imageAlt, title, body }, i) => (
          <Reveal key={title} delay={i * 0.08} className="wwn-card">
            <Image
              src={image}
              alt={imageAlt}
              width={312}
              height={265}
              className="wwn-card-img"
              style={{ objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
            <h3 className="wwn-card-title">{title}</h3>
            <p className="wwn-card-body">{body}</p>
          </Reveal>
        ))}
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / Perks.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .wwn-section {
          background: rgb(8, 7, 7);
          padding-top: 96px;
          padding-bottom: 96px;
        }

        /* ── Centered header block ── */
        .wwn-header {
          text-align: center;
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* ── Graphic wrapper ── */
        .wwn-graphic-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        /* ── Section heading ── */
        .wwn-heading {
          font-family: var(--font-albert);
          font-size: 54px;
          font-weight: 600;
          line-height: 54px;
          color: #fff;
          margin: 0;
        }

        /* ── Subtitle ── */
        .wwn-subtitle {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
          color: var(--text-60);
          margin: 16px 0 0 0;
        }

        /* ── Card grid — 3 columns desktop, last row 2 cards centered ── */
        /* FLAG: Centering the last row (2 of 5 cards) is achieved with
           justify-content:center so the 2-card final row is center-aligned.
           This matches Framer visual output. */
        .wwn-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          /* 1036px content (1084 - 48 gutters) fits 3x312 + 2x48 with slack,
             landing the top row at Framer x=204/564/924. */
          max-width: 1084px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* ── Individual card — transparent, no bg ── */
        .wwn-card {
          width: 312px;
          flex-shrink: 0;
        }

        /* ── Card image ── */
        /* FLAG: border-radius:12px on the image is approximate — measured from
           live Framer (~rounded corners). Exact pixel value may vary slightly. */
        .wwn-card-img {
          width: 312px !important;
          height: 265px !important;
        }

        /* ── Card title ── */
        .wwn-card-title {
          font-family: var(--font-albert);
          font-size: 28px;
          font-weight: 600;
          line-height: 32px;
          color: #fff;
          margin: 16px 0 0 0;
        }

        /* ── Card body ── */
        .wwn-card-body {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 28px;
          color: var(--text-60);
          margin: 8px 0 0 0;
        }

        /* ── Tablet: 818–1199px — 2 columns ── */
        @media (max-width: 1199px) {
          .wwn-grid {
            max-width: 720px;
          }
        }

        /* ── Phone: ≤817px — 1 column ── */
        @media (max-width: 817px) {
          .wwn-section {
            padding-left: 24px;
            padding-right: 24px;
          }
          .wwn-heading {
            font-size: 24px !important;
            line-height: 28.8px !important;
          }
          .wwn-subtitle {
            font-size: 15px !important;
            line-height: 24px !important;
          }
          .wwn-grid {
            flex-direction: column;
            align-items: center;
            padding-left: 0;
            padding-right: 0;
            gap: 48px;
          }
          .wwn-card {
            width: 100%;
            max-width: 312px;
          }
          .wwn-card-img {
            width: 100% !important;
            max-width: 312px !important;
          }
        }
      `}</style>
    </section>
  )
}
