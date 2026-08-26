import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import Hero from '@/components/sections/home/Hero'
import HowItWorksSteps from '@/components/sections/home/HowItWorksSteps'
import Download from '@/components/sections/home/Download'

// HowItWorks (the text-only prose version) is intentionally left in the tree
// rather than deleted. This swap is a hold until one of the four homepage
// concepts is picked, so reverting should stay a one-line import change.

export const metadata = { alternates: { canonical: '/' } }

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />
      <main id="main">
        <Hero />
        <HowItWorksSteps />
        <Download />
      </main>
      <Footer />
    </>
  )
}
