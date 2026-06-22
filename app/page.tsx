import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import Hero from '@/components/sections/home/Hero'
import HowItWorks from '@/components/sections/home/HowItWorks'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
