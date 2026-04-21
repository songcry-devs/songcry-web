'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { KineticHeadline } from '@/components/motion/KineticHeadline'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { WaveDivider } from '@/components/motion/WaveDivider'
import { ParallaxPhone } from '@/components/motion/ParallaxPhone'

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Upload & Claim',
    body: 'Artists upload songs and claim their city. Your music gets served to fans in your geographic zone — starting in your neighborhood.',
  },
  {
    num: '02',
    title: 'Discover Locally',
    body: 'Fans swipe through a personalized feed of songs rising in their city. No algorithms gaming virality — just music from real artists near you.',
  },
  {
    num: '03',
    title: 'Real Listeners',
    body: 'Growth is driven by genuine fans who chose to listen. No bots, no paid plays, no shortcuts. Music that earns its audience.',
  },
] as const

export default function FanHomepage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (website) return // honeypot triggered — silent ignore
    if (!name.trim() || !email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Try again.')
    }
  }

  return (
    <div style={{ background: '#080707', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main">
      {/* ─── Hero — Kinetic Type + Scroll Velocity ─── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Ambient dark backdrop with a low-intensity pink aurora, no photo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 40% at 18% 30%, rgba(248,25,192,0.14) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 85% 70%, rgba(120,40,200,0.10) 0%, transparent 70%), #080707',
          }}
        />
        {/* Subtle grain overlay for premium feel */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            mixBlendMode: 'overlay',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '96px 24px 80px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Left: kinetic copy */}
          <div style={{ flex: '0 0 58%', maxWidth: '620px' }}>
            <KineticHeadline
              lines={[
                ['Music', 'spreads'],
                ['through', 'fans.'],
              ]}
              accent="fans."
            />
            <SectionReveal delay={650}>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 0.5vw + 0.875rem, 1.25rem)',
                  color: '#ABABAB',
                  lineHeight: 1.6,
                  marginTop: '28px',
                  marginBottom: '40px',
                  maxWidth: '520px',
                }}
              >
                Songcry is where fans decide what rises. Discover music from artists in your city — before anyone else does.
              </p>
            </SectionReveal>
            <SectionReveal delay={900}>
              <a
                href="#waitlist"
                className="hero-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FFFFFF',
                  color: '#080707',
                  fontWeight: 600,
                  fontSize: '16px',
                  padding: '0 28px',
                  height: '52px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                }}
              >
                Get Early Access
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </a>
            </SectionReveal>
          </div>

          {/* Right: parallax phone */}
          <div style={{ flex: '0 0 38%' }}>
            <ParallaxPhone
              src="/images/phone-mockup-app.png"
              alt="Songcry app showing music feed"
            />
          </div>
        </div>

        {/* Scroll chevron */}
        <div
          className="bounce-chevron"
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            color: 'rgba(255,255,255,0.4)',
            fontSize: '24px',
          }}
          aria-hidden="true"
        >
          ↓
        </div>
      </section>

      {/* ─── Waveform divider (Songcry visual device) ─── */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <WaveDivider />
        </div>
      </div>

      {/* ─── How Songcry Works ─── */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: '64px',
                letterSpacing: '-0.01em',
              }}
            >
              How Songcry Works
            </h2>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {HOW_IT_WORKS.map((card, i) => (
              <SectionReveal key={card.num} delay={i * 120}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '40px 32px',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      background: 'linear-gradient(135deg, #F819C0, #9B59B6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-albert-sans), system-ui',
                    }}
                  >
                    {card.num}
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.375rem, 1vw + 1rem, 1.75rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em',
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
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Waitlist Form ─── */}
      <section
        id="waitlist"
        style={{
          padding: '96px 0',
          background:
            'linear-gradient(to bottom, transparent, #0C0C0C 30%, #0C0C0C 70%, transparent)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <SectionReveal>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                maxWidth: '700px',
                margin: '0 auto 24px',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Join early and discover what&apos;s rising near you.
            </h2>
          </SectionReveal>
          <SectionReveal delay={120}>
            <p
              style={{
                fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                color: '#ABABAB',
                marginBottom: '48px',
              }}
            >
              The beta is live. Artists can join now — fan access is coming soon.
            </p>
          </SectionReveal>

          {status === 'success' ? (
            <SectionReveal>
              <div
                style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                  padding: '32px',
                  background: 'rgba(248,25,192,0.08)',
                  border: '1px solid rgba(248,25,192,0.24)',
                  borderRadius: '16px',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎵</div>
                <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>
                  You&apos;re on the list.
                </p>
                <p style={{ color: '#ABABAB', fontSize: '15px' }}>
                  We&apos;ll reach out when fan access opens in your city.
                </p>
              </div>
            </SectionReveal>
          ) : (
            <SectionReveal delay={200}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                  }}
                />

                <input
                  className="field-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  className="field-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {errorMsg && (
                  <p style={{ color: '#F34655', fontSize: '14px', textAlign: 'left' }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="cta-button"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            </SectionReveal>
          )}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
