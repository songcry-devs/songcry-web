import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

interface LegalLayoutProps {
  heading: string
  updated?: string
  children: React.ReactNode
}

// Server component
export default function LegalLayout({ heading, updated, children }: LegalLayoutProps) {
  return (
    <div style={{ background: '#080707', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        <div className="legal-container">
          <h1 className="legal-heading">{heading}</h1>
          {updated && (
            <p className="legal-updated">{updated}</p>
          )}
          <div className="legal-body">
            {children}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .legal-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 96px 48px 80px;
        }

        .legal-heading {
          font-size: 42px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 12px 0;
          line-height: 1.1;
        }

        .legal-updated {
          font-size: 15px;
          color: #7A7A7A;
          margin: 0 0 48px 0;
        }

        /* ── Body content styles ── */
        .legal-body h2 {
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          margin: 40px 0 12px;
          line-height: 1.3;
        }

        .legal-body h3 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin: 24px 0 10px;
          line-height: 1.3;
        }

        .legal-body p {
          font-size: 16px;
          color: #D6D6D6;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .legal-body li {
          font-size: 16px;
          color: #D6D6D6;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .legal-body ul,
        .legal-body ol {
          padding-left: 24px;
          margin-bottom: 16px;
        }

        .legal-body ul {
          list-style: disc;
        }

        .legal-body ol {
          list-style: decimal;
        }

        /* ── Phone breakpoint ── */
        @media (max-width: 817px) {
          .legal-container {
            padding: 120px 24px 64px;
          }

          .legal-heading {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  )
}
