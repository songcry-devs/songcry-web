'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: scrolled ? 'rgba(8,7,7,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'background 250ms cubic-bezier(0.25,1,0.5,1), border-color 250ms',
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/logo/songcry-flame-circle.svg" alt="Songcry" width={36} height={36} priority />
          <span style={{ fontFamily: 'var(--font-albert-sans), system-ui, sans-serif', fontWeight: 600, fontSize: '18px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>Songcry</span>
        </Link>
        <Link
          href="#waitlist"
          style={{
            background: '#FFFFFF',
            color: '#080707',
            fontFamily: 'var(--font-albert-sans), system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            padding: '0 24px',
            height: '40px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'opacity 250ms, transform 250ms',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.opacity = '0.9'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Get Early Access
        </Link>
      </div>
    </nav>
  )
}
