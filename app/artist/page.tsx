import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import ArtistHero from '@/components/sections/artist/ArtistHero'
import CallingIntro from '@/components/sections/artist/CallingIntro'
import FeatureRow from '@/components/sections/artist/FeatureRow'
import CityBand from '@/components/sections/artist/CityBand'
import Perks from '@/components/sections/artist/Perks'
import WhatWeNeed from '@/components/sections/artist/WhatWeNeed'

// Title and description are the page's own, not the homepage's. /artist is the destination
// Reggie's Google campaigns and our Meta ads point at, so its title is the line that shows in
// a search result and in a shared link. Inheriting "Songcry | Geolocation Based Music Platform"
// told an artist nothing about why the page was for them.
//
// Wording follows the page: it leads on "Calling All Music Artists" and the Green Room Invite,
// and the artist-intent keywords Reggie's research surfaced are "get heard" and "get
// discovered". Brand rules applied: Songcry never SongCry, no dashes as punctuation, and
// "local" never appears even though the product is geolocation based.
export const metadata = {
  title: 'For Artists | Songcry',
  description:
    'Get heard by real listeners near you. Songcry is a geolocation music platform where '
    + 'independent artists get discovered by the people close enough to show up.',
  alternates: { canonical: '/artist' },
  openGraph: {
    title: 'For Artists | Songcry',
    description:
      'Get heard by real listeners near you. Songcry is a geolocation music platform where '
      + 'independent artists get discovered by the people close enough to show up.',
    url: 'https://songcry.app/artist',
  },
}

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
        <Perks />
        <WhatWeNeed />
      </main>
      <Footer />
    </>
  )
}
