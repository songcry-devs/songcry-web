import type { Metadata, Viewport } from 'next'
import { Albert_Sans } from 'next/font/google'
import './globals.css'

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-albert-sans',
})

export const metadata: Metadata = {
  title: 'Songcry | Geolocation Based Music Platform',
  description: 'Geo-based music platform empowering artists to publish, grow, and connect with real listeners in their city.',
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
    <html lang="en" className={albertSans.variable}>
      <body>{children}</body>
    </html>
  )
}
