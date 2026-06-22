import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import Hero from '@/components/sections/home/Hero'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <Hero />
        {/* How Songcry Works + Download sections mounted in subsequent Phase 2 tasks */}
      </main>
      <Footer />
    </>
  )
}
