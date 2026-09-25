import Link from 'next/link'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { pageMetadata } from '@/lib/seo'

// Next adds noindex to this page itself, so pageMetadata gets no path (claims no URL, per
// lib/seo.ts) and no noindex flag (Next's own robots meta on this route already covers it).
export const metadata = pageMetadata({
  title: 'Page not found | Songcry',
  description: 'This page isn’t here.',
})

export default function NotFound() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <section className="nf-section" aria-labelledby="nf-title">
          <div className="nf-container">
            <h1 id="nf-title" className="nf-heading">This page isn’t here.</h1>
            <p className="nf-body">The link may be old, or the address may have a typo.</p>
            <Link href="/" className="nf-home">
              Go to the homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .nf-section {
          background: rgb(8, 7, 7);
          padding: 152px 24px 120px;
        }
        .nf-container {
          max-width: 560px;
          margin: 0 auto;
        }
        .nf-heading {
          font-family: var(--font-albert);
          font-size: 42px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0;
        }
        .nf-body {
          font-family: var(--font-albert);
          font-size: 20px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-85);
          margin: 20px 0 0;
          max-width: 46ch;
        }
        .nf-home {
          display: inline-flex;
          align-items: center;
          min-height: 48px;
          margin-top: 32px;
          padding: 12px 24px;
          border-radius: 999px;
          background: #ffffff;
          color: rgb(41, 41, 41);
          font-family: var(--font-albert);
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
        }
        @media (max-width: 817px) {
          .nf-section {
            padding-top: 128px;
          }
          .nf-heading {
            font-size: 30px;
            line-height: 1.13;
          }
          .nf-body {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  )
}
