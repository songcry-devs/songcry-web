import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        {/* Home sections (Hero, How Songcry Works, Download) mounted in Phase 2 tasks */}
      </main>
      <Footer />
    </>
  )
}
