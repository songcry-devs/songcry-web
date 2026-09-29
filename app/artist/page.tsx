import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import ArtistHero from '@/components/sections/artist/ArtistHero'
import CallingIntro from '@/components/sections/artist/CallingIntro'
import FeatureRow from '@/components/sections/artist/FeatureRow'
import CityBand from '@/components/sections/artist/CityBand'
import WhatWeNeed from '@/components/sections/artist/WhatWeNeed'
import { pageMetadata } from '@/lib/seo'

// /artist is the "Songcry for artists" showcase (TJ, 2026-09-25). artists.songcry.app is the
// separate sign-up funnel that outreach and paid ads point at. Never redirect one to the other.
// Phase 6 of the web sweep rebuilds this page; Phase 1A (2026-09-25) only removed what was false
// on it: mockups of screens and artists that are not ours, a perks list, a testimonial ask.
//
// Brand rules for this page's words: Songcry never SongCry, no dashes as punctuation, and the
// word local never appears.
export const metadata = pageMetadata({
  title: 'For Artists | Songcry',
  description:
    'Get heard by real listeners near you. Songcry is a geolocation music platform where '
    + 'independent artists get discovered by the people close enough to show up.',
  path: '/artist',
})

export default function ArtistPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="artist" />
      <main id="main">
        <ArtistHero />
        <CallingIntro />
        {/* Real beta screens, the same set the homepage gallery shows, with the same alt text. */}
        <FeatureRow
          imageSide="left"
          image="/app-screens/feed-baltimore.png"
          imageAlt="The Songcry feed showing a song rising in Baltimore"
          heading="Take Over Your City"
          body="Home is where the 🤍 is. Your city and nearby areas discover you first."
        />
        <FeatureRow
          imageSide="right"
          image="/app-screens/feed-la-drummer.png"
          imageAlt="A drummer performing in the Songcry feed"
          heading="Rise in Your Neighborhood"
          body="Fans discover you because you’re trending where they live. Street buzz made digital."
        />
        <FeatureRow
          imageSide="left"
          image="/app-screens/artist-profile-rose-gold.png"
          imageAlt="An artist profile on Songcry"
          heading="Built From the Ground Up"
          body="No shortcuts. Just real growth driven by genuine listeners and steady momentum."
        />
        <CityBand />
        <WhatWeNeed />
      </main>
      <Footer />
    </>
  )
}
