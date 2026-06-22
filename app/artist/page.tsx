import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

export default function ArtistPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="artist" />
      <main id="main">
        {/* /artist (Green Room) sections mounted in Phase 3 tasks */}
      </main>
      <Footer />
    </>
  )
}
