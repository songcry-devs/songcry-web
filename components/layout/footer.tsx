import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 24px 40px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 4-col grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
              <Image src="/logo/songcry-flame-icon.svg" alt="Songcry flame" width={32} height={26} />
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>Songcry</span>
            </Link>
            <p style={{ fontSize: '14px', color: '#6B6B6B', marginTop: '8px' }}>yours, not theirs</p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '13px', color: '#ABABAB', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/" style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
                >
                  Fan App
                </Link>
              </li>
              <li>
                <Link href="/artist" style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
                >
                  Artist Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '13px', color: '#ABABAB', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/legal/terms-of-use" style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/legal/community-guidelines" style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '13px', color: '#ABABAB', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</h4>
            <a
              href="mailto:support@songcry.app"
              style={{ color: '#ABABAB', textDecoration: 'none', fontSize: '14px', transition: 'color 250ms' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ABABAB' }}
            >
              support@songcry.app
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#6B6B6B' }}>
            &copy; 2025 Songcry. All rights reserved.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://instagram.com/songcry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Songcry on Instagram"
              style={{ opacity: 0.4, transition: 'opacity 250ms', display: 'flex', alignItems: 'center', minWidth: '44px', minHeight: '44px', justifyContent: 'center' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
            >
              <img src="/icons/instagram.svg" alt="Instagram" width={20} height={20} />
            </a>
            <a
              href="https://tiktok.com/@songcry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Songcry on TikTok"
              style={{ opacity: 0.4, transition: 'opacity 250ms', display: 'flex', alignItems: 'center', minWidth: '44px', minHeight: '44px', justifyContent: 'center' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
            >
              <img src="/icons/tiktok.svg" alt="TikTok" width={20} height={20} />
            </a>
            <a
              href="https://facebook.com/songcry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Songcry on Facebook"
              style={{ opacity: 0.4, transition: 'opacity 250ms', display: 'flex', alignItems: 'center', minWidth: '44px', minHeight: '44px', justifyContent: 'center' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
            >
              <img src="/icons/facebook.svg" alt="Facebook" width={20} height={20} />
            </a>
            <a
              href="https://linkedin.com/company/songcry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Songcry on LinkedIn"
              style={{ opacity: 0.4, transition: 'opacity 250ms', display: 'flex', alignItems: 'center', minWidth: '44px', minHeight: '44px', justifyContent: 'center' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.4' }}
            >
              <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
