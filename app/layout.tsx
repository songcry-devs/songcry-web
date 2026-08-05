import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Albert_Sans, Inter } from 'next/font/google'
import './tokens.css'
import './globals.css'
import MotionProvider from '@/components/motion/MotionProvider'

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-albert-sans',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
})

// Resolve absolute URLs (OG/Twitter image, canonical) to the right host:
// production → songcry.app; Vercel previews → the deployment URL (so shared
// preview links show the card); local → localhost.
const baseUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://songcry.app'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Songcry | Geolocation Based Music Platform',
  description:
    'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
  // NO canonical here. Root-layout metadata is INHERITED by every page, so a canonical
  // set here made /artist and all three legal pages declare the HOMEPAGE as their
  // canonical URL — telling Google they are duplicates of / and should be dropped from
  // the index. The live Framer site self-canonicalises correctly, so shipping this would
  // have been a real SEO REGRESSION at cutover, on the artist funnel entry point.
  // Each page declares its own canonical instead.
  icons: {
    icon: '/framer/favicon.svg',
    apple: '/framer/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://songcry.app/',
    title: 'Songcry | Geolocation Based Music Platform',
    description:
      'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
    images: [{ url: '/framer/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Songcry | Geolocation Based Music Platform',
    description:
      'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
    images: ['/framer/og-card.png'],
  },
  robots: 'max-image-preview:large',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#080707',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${albertSans.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2360336011159400&ev=PageView&noscript=1"
          />
        </noscript>
      </body>

      {/*
        MEASUREMENT — added 2026-08-04.

        songcry.app had NO analytics of any kind: no Meta pixel, no Google tag, no click
        tracking, on the live Framer site AND on this replacement. We could not see a visit,
        let alone an App Store click, on our primary domain. Every ad we run would have been
        unmeasurable at the destination.

        Matches artists.songcry.app exactly (same pixel dataset, same Google Ads conversion
        ID) so both properties report into one place and audiences accumulate together.
        Meta and Google do not share signal — both tags are required.
      */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18264662044"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18264662044');`}
      </Script>
      {/* Meta pixel — dataset "Songcry Event Data" (2360336011159400). PageView fires here;
          AppStoreClick is a custom event fired from the download buttons, because Meta has no
          standard event for app-store intent from a website. */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2360336011159400');
fbq('track', 'PageView');`}
      </Script>
    </html>
  )
}
