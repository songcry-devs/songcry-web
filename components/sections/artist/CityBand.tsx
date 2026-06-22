import Image from 'next/image'

// Server component — decorative city-skyline band
export default function CityBand() {
  return (
    <section className="cb-section" aria-label="City photography">
      <div className="cb-container">
        <div className="cb-image-wrap">
          <Image
            src="/framer/artist-band-2.png"
            alt="City skyline"
            width={590}
            height={282}
            style={{ borderRadius: '18px', objectFit: 'cover', display: 'block', width: '100%', height: '100%' }}
          />
        </div>
        <div className="cb-image-wrap">
          <Image
            src="/framer/artist-band-1.png"
            alt="City skyline"
            width={590}
            height={282}
            style={{ borderRadius: '18px', objectFit: 'cover', display: 'block', width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <style>{`
        /* ── Section shell ── */
        .cb-section {
          background: rgb(8, 7, 7);
          padding: 48px 0;
        }

        /* ── Centered container ── */
        .cb-container {
          max-width: 1256px;
          margin: 0 auto;
          padding: 0 92px;
          display: flex;
          flex-direction: row;
          gap: 24px;
        }

        /* ── Each image wrapper ── */
        .cb-image-wrap {
          flex: 1;
          min-width: 0;
          height: 282px;
          border-radius: 18px;
          overflow: hidden;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          .cb-container {
            padding: 0 48px;
          }

          .cb-image-wrap {
            height: 220px;
          }
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .cb-container {
            flex-direction: column;
            padding: 0 24px;
          }

          .cb-image-wrap {
            height: 180px;
          }
        }
      `}</style>
    </section>
  )
}
