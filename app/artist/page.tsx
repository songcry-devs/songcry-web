import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import ArtistHero from '@/components/sections/artist/ArtistHero'
import CallingIntro from '@/components/sections/artist/CallingIntro'
import FeatureRow from '@/components/sections/artist/FeatureRow'
import CityBand from '@/components/sections/artist/CityBand'

export default function ArtistPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="artist" />
      <main id="main">
        <ArtistHero />
        <CallingIntro />
        <FeatureRow
          imageSide="left"
          image="/framer/artist-phone-1.png"
          imageAlt="Songcry city map view"
          heading="Takeover Your City"
          body="Home is where the 🤍 is. Your city and nearby areas discover you first."
        />
        <FeatureRow
          imageSide="right"
          image="/framer/artist-phone-2.png"
          imageAlt="Songcry feed"
          heading="Rise in Your Neighborhood"
          body="Fans discover you because you’re trending where they live. Street buzz made digital."
        />
        <FeatureRow
          imageSide="left"
          image="/framer/artist-phone-3.png"
          imageAlt="Songcry app"
          heading="Built From the Ground Up"
          body="No shortcuts. Just real growth driven by genuine listeners and steady momentum."
        />
        <CityBand />
      </main>
      <Footer />
    </>
  )
}
