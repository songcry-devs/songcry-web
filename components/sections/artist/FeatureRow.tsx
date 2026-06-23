import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

interface FeatureRowProps {
  heading: string
  body: string
  image: string
  imageAlt: string
  imageSide: 'left' | 'right'
}

// Server component — no client interactivity
export default function FeatureRow({ heading, body, image, imageAlt, imageSide }: FeatureRowProps) {
  const isLeft = imageSide === 'left'

  return (
    <section
      className={`fr-section ${isLeft ? 'fr-image-left' : 'fr-image-right'}`}
      aria-label={heading}
    >
      <div className="fr-container">
        {/* Image card column */}
        <div className="fr-image-col">
          <Reveal delay={0.1} y={36}>
            <div className="fr-card">
              <Image
                src={image}
                alt={imageAlt}
                width={398}
                height={865}
                style={{ display: 'block', borderRadius: '24px', margin: '0 auto' }}
              />
            </div>
          </Reveal>
        </div>

        {/* Text column */}
        <div className="fr-text-col">
          <Reveal delay={0} y={36}>
            <h2 className="fr-heading">{heading}</h2>
            <p className="fr-body">{body}</p>
          </Reveal>
        </div>
      </div>

      <style>{`
        /* ── Section shell ── */
        .fr-section {
          background: rgb(8, 7, 7);
          padding: 48px 0;
        }

        /* ── Centered container ── */
        .fr-container {
          max-width: 1256px;
          margin: 0 auto;
          padding: 0 92px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 64px;
        }

        /* ── Column ordering ── */
        /* image-left: image col first, text col second (default flex order) */
        .fr-image-left .fr-image-col { order: 1; }
        .fr-image-left .fr-text-col  { order: 2; }

        /* image-right: text col first, image col second */
        .fr-image-right .fr-text-col  { order: 1; }
        .fr-image-right .fr-image-col { order: 2; }

        /* ── Text column ── */
        .fr-text-col {
          flex: 1;
          min-width: 0;
          max-width: 623px;
        }

        .fr-heading {
          font-family: var(--font-albert);
          font-size: 42px;
          font-weight: 600;
          line-height: 42px;
          color: #fff;
          margin: 0;
          text-align: left;
        }

        .fr-body {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
          color: var(--text-60);
          margin: 16px 0 0 0;
          max-width: 623px;
          text-align: left;
        }

        /* ── Image card column ── */
        .fr-image-col {
          flex-shrink: 0;
        }

        .fr-card {
          background: rgb(20, 20, 20);
          border-radius: 18px;
          padding: 50px 50px 0;
          overflow: hidden;
          width: 585px;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          .fr-container {
            padding: 0 48px;
            gap: 48px;
          }

          .fr-card {
            width: 460px;
            padding: 40px 40px 0;
          }

          .fr-heading {
            font-size: 42px;
            line-height: 42px;
          }

          .fr-body {
            font-size: 24px;
            line-height: 32px;
          }
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .fr-container {
            flex-direction: column;
            padding: 0 24px;
            gap: 32px;
          }

          /* On phone: heading, body, then image below — always */
          .fr-image-left .fr-image-col,
          .fr-image-right .fr-image-col { order: 2; }
          .fr-image-left .fr-text-col,
          .fr-image-right .fr-text-col  { order: 1; }

          .fr-text-col {
            max-width: 100%;
          }

          .fr-heading {
            font-size: 24px !important;
            line-height: 28.8px !important;
          }

          .fr-body {
            font-size: 15px !important;
            line-height: 24px !important;
          }

          .fr-image-col {
            width: 100%;
          }

          .fr-card {
            width: 100%;
            padding: 32px 32px 0;
            box-sizing: border-box;
          }

          .fr-card img {
            width: 80% !important;
            height: auto !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
