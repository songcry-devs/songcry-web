import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import ArtistHero from '@/components/sections/artist/ArtistHero'
import CallingIntro from '@/components/sections/artist/CallingIntro'

export default function ArtistPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="artist" />
      <main id="main">
        <ArtistHero />
        <CallingIntro />
      </main>
      <Footer />
    </>
  )
}
