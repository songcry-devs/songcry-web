import type { Metadata, Viewport } from 'next'
import { Albert_Sans, Inter } from 'next/font/google'
import './tokens.css'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://songcry.app'),
  title: 'Songcry | Geolocation Based Music Platform',
  description:
    'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
  alternates: { canonical: '/' },
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
    images: ['/framer/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Songcry | Geolocation Based Music Platform',
    description:
      'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
    images: ['/framer/og-image.png'],
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
      <body>{children}</body>
    </html>
  )
}
