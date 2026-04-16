'use client'

import Image from 'next/image'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

export default function ArtistPage() {
  return (
    <div style={{ background: '#080707', minHeight: '100vh' }}>
      <Nav />

      {/* ─── Hero ─── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Ambient gradient blobs */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(248,25,192,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 45% at 70% 60%, rgba(120,40,200,0.10) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '760px',
            padding: '120px 24px 96px',
          }}
        >
          {/* "yours, not theirs" script */}
          <div
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              color: '#ABABAB',
              fontStyle: 'italic',
              marginBottom: '24px',
              display: 'block',
              transform: 'rotate(-2deg)',
              transformOrigin: 'left center',
            }}
          >
            yours, not theirs
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Green Room<br />Invite
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.125rem, 0.5vw + 0.875rem, 1.25rem)',
              color: '#ABABAB',
              lineHeight: 1.65,
              marginBottom: '40px',
              maxWidth: '540px',
              margin: '0 auto 40px',
            }}
          >
            Music artists: become a part of music history with Songcry. The first platform built for your city.
          </p>

          <a
            href="#apply"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              color: '#080707',
              fontWeight: 600,
              fontSize: '16px',
              padding: '0 32px',
              height: '52px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'opacity 150ms ease-out, transform 150ms ease-out',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            Apply for Early Access
          </a>
        </div>
      </section>

      {/* ─── Why Songcry for Artists ─── */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Why Songcry for Artists
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                color: '#ABABAB',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              The only platform that helps you build a real fanbase in your city and beyond.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: '🏙️',
                title: 'Takeover Your City',
                body: 'Your city and nearby areas discover you first. Songcry surfaces your music to fans in your geographic zone before it travels anywhere else.',
              },
              {
                icon: '📍',
                title: 'Rise in Your Neighborhood',
                body: 'Fans discover you because you are trending in their area. Local momentum builds real community — people who will actually show up.',
              },
              {
                icon: '📈',
                title: 'Built From the Ground Up',
                body: 'No shortcuts. Just real growth driven by genuine fans who chose to listen. Your numbers mean something because they are earned.',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{card.icon}</div>
                <h3
                  style={{
                    fontSize: 'clamp(1.375rem, 1vw + 1rem, 1.75rem)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '16px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                    color: '#ABABAB',
                    lineHeight: 1.65,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Green Room Perks ─── */}
      <section
        style={{
          padding: '96px 0',
          background: 'linear-gradient(to bottom, transparent, #0C0C0C 30%, #0C0C0C 70%, transparent)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Green Room Perks
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                color: '#ABABAB',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Your city&apos;s music is calling for change. Be the first.
            </p>
          </div>

          {/* 2×2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Claim Your City From Day One',
                body: 'Plant your flag before anyone else. Early artists on Songcry have the advantage of being the first name fans recognize when the platform grows in their area.',
              },
              {
                title: 'Geo-Targeted Fanbase',
                body: 'Build listeners in your city who actually come to your shows. Location-based discovery creates fans who are already nearby — not just streams from somewhere across the world.',
              },
              {
                title: 'Real Analytics',
                body: 'See exactly where your music is trending and who is listening. City-level and neighborhood-level data, not vanity metrics. Know where your fans actually are.',
              },
              {
                title: 'Early Mover Advantage',
                body: 'Get in before the platform scales. First artists get the most attention as Songcry grows. Your early presence compounds over time.',
              },
            ].map(perk => (
              <div
                key={perk.title}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.375rem, 1vw + 1rem, 1.75rem)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    lineHeight: 1.25,
                  }}
                >
                  {perk.title}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                    color: '#ABABAB',
                    lineHeight: 1.65,
                  }}
                >
                  {perk.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What We Need From You ─── */}
      <section style={{ padding: '96px 0' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            What We Need From You
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
              color: '#ABABAB',
              marginBottom: '48px',
              lineHeight: 1.65,
            }}
          >
            We bring the platform and audience. You bring the energy.
          </p>

          <div
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[
              'Upload at least 3 original tracks',
              'Complete your artist profile',
              'Agree to community guidelines',
              'Be ready to engage with your local fans',
            ].map(item => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                }}
              >
                <span
                  style={{
                    color: '#F819C0',
                    fontWeight: 700,
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: '17px', color: '#FFFFFF', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section
        id="apply"
        style={{
          padding: '96px 0',
          textAlign: 'center',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(248,25,192,0.07) 0%, transparent 70%)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '32px',
              lineHeight: 1.2,
            }}
          >
            Ready to Claim<br />Your City?
          </h2>

          <a
            href="https://apps.apple.com/app/songcry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              color: '#080707',
              fontWeight: 600,
              fontSize: '17px',
              padding: '0 36px',
              height: '56px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'opacity 150ms ease-out, transform 150ms ease-out',
              marginBottom: '32px',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            Apply for Early Access
          </a>
        </div>
      </section>

      {/* Pre-footer link */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <a
          href="/"
          style={{
            fontSize: '15px',
            color: '#ABABAB',
            textDecoration: 'none',
            transition: 'color 150ms ease-out',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#ABABAB')}
        >
          Are you a fan? Discover music rising near you →
        </a>
      </div>

      <Footer />
    </div>
  )
}
