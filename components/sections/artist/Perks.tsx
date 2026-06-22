import { Building2, Star, Crown, Phone, Network, TrendingUp } from 'lucide-react'

// Server component — icons from lucide-react (static render, no interactivity)
const PERKS = [
  {
    Icon: Building2,
    title: 'Claim your city from day one',
    body: 'Plant your flag before anyone else.',
  },
  {
    Icon: Star,
    title: 'Featured placement',
    body: 'Priority in discovery feeds and city pages',
  },
  {
    Icon: Crown,
    title: 'Unlimited Premium Tier',
    body: 'Free forever for new artists on Songcry',
  },
  {
    Icon: Phone,
    title: 'Direct line to the team',
    body: 'White-glove support',
  },
  {
    Icon: Network,
    title: 'Exclusive Network',
    body: 'Connect and collaborate with other hand-picked artists in your city',
  },
  {
    Icon: TrendingUp,
    title: 'Shape the platform',
    body: 'Your feedback builds what comes next',
  },
]

export default function Perks() {
  return (
    <section className="perks-section" aria-label="Green Room Perks">
      {/* Section header */}
      <div className="perks-header">
        <h2 className="perks-heading">Green Room Perks</h2>
        <p className="perks-subtitle">Your city&rsquo;s music is calling for change. Be the first.</p>
      </div>

      {/* Perk card grid */}
      <div className="perks-grid">
        {PERKS.map(({ Icon, title, body }) => (
          <div key={title} className="perk-card">
            <span className="perk-icon" aria-hidden="true">
              <Icon size={32} color="rgb(248,25,192)" strokeWidth={1.8} />
            </span>
            <h3 className="perk-title">{title}</h3>
            <p className="perk-body">{body}</p>
          </div>
        ))}
      </div>

      {/* Scoped responsive styles — follows Hero.tsx / CityBand.tsx pattern */}
      <style>{`
        /* ── Section shell ── */
        .perks-section {
          background: rgb(8, 7, 7);
          padding-top: 96px;
          padding-bottom: 96px;
        }

        /* ── Centered header block ── */
        .perks-header {
          text-align: center;
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* ── Section heading ── */
        .perks-heading {
          font-family: var(--font-albert);
          font-size: 54px;
          font-weight: 600;
          line-height: 54px;
          color: #fff;
          margin: 0;
        }

        /* ── Subtitle ── */
        .perks-subtitle {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
          color: var(--text-60);
          margin: 16px 0 0 0;
        }

        /* ── Card grid ── */
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(3, 312px);
          gap: 48px;
          max-width: 1032px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* ── Individual card ── */
        .perk-card {
          background: rgba(20, 20, 20, 0.8);
          border-radius: 8px;
          padding: 32px;
          min-height: 288px;
          display: flex;
          flex-direction: column;
        }

        /* ── Icon wrapper ── */
        .perk-icon {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 48px;
          height: 48px;
          margin-bottom: 24px;
          flex-shrink: 0;
        }

        /* ── Card title ── */
        .perk-title {
          font-family: var(--font-albert);
          font-size: 28px;
          font-weight: 600;
          line-height: 32px;
          color: #fff;
          margin: 0 0 12px 0;
        }

        /* ── Card body ── */
        .perk-body {
          font-family: var(--font-albert);
          font-size: 24px;
          font-weight: 400;
          line-height: 28px;
          color: var(--text-60);
          margin: 0;
        }

        /* ── Tablet: 818–1199px — 2 columns ── */
        @media (max-width: 1199px) {
          .perks-grid {
            grid-template-columns: repeat(2, 312px);
          }
        }

        /* ── Phone: ≤817px — 1 column ── */
        @media (max-width: 817px) {
          .perks-section {
            padding-left: 24px;
            padding-right: 24px;
          }
          .perks-heading {
            font-size: 24px !important;
            line-height: 28.8px !important;
          }
          .perks-subtitle {
            font-size: 15px !important;
            line-height: 24px !important;
          }
          .perks-grid {
            grid-template-columns: 1fr;
            padding-left: 0;
            padding-right: 0;
          }
          .perk-card {
            min-height: unset;
          }
        }
      `}</style>
    </section>
  )
}
