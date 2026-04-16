export const metadata = {
  title: 'Songcry | Geolocation Based Music Platform',
  description: 'Geo-based music platform empowering artists to publish, grow, and connect with real listeners intentionally.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
