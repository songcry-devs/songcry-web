'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { KineticHeadline } from '@/components/motion/KineticHeadline'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { WaveformDivider } from '@/components/visual/WaveformDivider'

export default function FanHomepage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const reduce = useReducedMotion()

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
      <Nav />

      {/* ─── Hero ─── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background concert photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/backgrounds/hero-concert-bg.png"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(8,7,7,0.3) 0%, rgba(8,7,7,0.55) 50%, #080707 100%)',
            }}
          />
        </div>

        {/* Hero content */}
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
          {/* Left: copy */}
          <div style={{ flex: '0 0 58%', maxWidth: '620px' }}>
            <KineticHeadline
              lines={[['Music', 'spreads'], ['through', 'fans.']]}
              accent="fans"
              className="mb-6"
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 0.5vw + 0.875rem, 1.25rem)',
                  color: '#ABABAB',
                  lineHeight: 1.6,
                  marginBottom: '40px',
                  maxWidth: '520px',
                }}
              >
                Songcry is where fans decide what rises. Discover music from artists in your city — before anyone else does.
              </p>
              <a
                href="#waitlist"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  color: '#080707',
                  fontWeight: 600,
                  fontSize: '16px',
                  padding: '0 28px',
                  height: '52px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'opacity 150ms ease-out, transform 150ms ease-out',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                }}
              >
                Get Early Access
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </a>
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <div
            className="float-animation"
            style={{
              flex: '0 0 38%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/phone-mockup-app.png"
              alt="Songcry app showing music feed"
              width={300}
              height={560}
              priority
              style={{ width: '100%', maxWidth: '340px', height: 'auto' }}
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
        >
          ↓
        </div>
      </section>

      {/* ─── Waveform divider ─── */}
      <WaveformDivider />

      {/* ─── How Songcry Works ─── */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.5rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            How Songcry Works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Upload & Share',
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
                body: 'Growth is driven by genuine fans who chose to listen. No bots, no paid plays, no shortcuts. Just music that earns its audience.',
              },
            ].map((card, i) => (
              <SectionReveal key={card.num} delay={i * 120}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '40px 32px',
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

      {/* ─── Waveform divider ─── */}
      <WaveformDivider />

      {/* ─── Waitlist Form ─── */}
      <section
        id="waitlist"
        style={{
          padding: '96px 0',
          background: 'linear-gradient(to bottom, transparent, #0C0C0C 30%, #0C0C0C 70%, transparent)',
        }}
      >
        <SectionReveal>
        <div
          style={{
            maxWidth: '1200px',
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
              maxWidth: '700px',
              margin: '0 auto 24px',
              lineHeight: 1.2,
            }}
          >
            Join early and discover what&apos;s rising near you.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
              color: '#ABABAB',
              marginBottom: '48px',
            }}
          >
            The beta is live. Artists can join now — fan access is coming soon.
          </p>

          {status === 'success' ? (
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
              <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>You&apos;re on the list.</p>
              <p style={{ color: '#ABABAB', fontSize: '15px' }}>We&apos;ll reach out when fan access opens in your city.</p>
            </div>
          ) : (
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
                onChange={e => setWebsite(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
              />

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  background: '#1E1E1E',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  height: '52px',
                  padding: '0 16px',
                  fontSize: '16px',
                  color: '#FFFFFF',
                  width: '100%',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#F819C0'
                  e.target.style.boxShadow = '0 0 0 3px rgba(248,25,192,0.12)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.target.style.boxShadow = 'none'
                }}
              />

              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  background: '#1E1E1E',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  height: '52px',
                  padding: '0 16px',
                  fontSize: '16px',
                  color: '#FFFFFF',
                  width: '100%',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#F819C0'
                  e.target.style.boxShadow = '0 0 0 3px rgba(248,25,192,0.12)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.target.style.boxShadow = 'none'
                }}
              />

              {errorMsg && (
                <p style={{ color: '#F34655', fontSize: '14px', textAlign: 'left' }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: '#FFFFFF',
                  color: '#080707',
                  fontWeight: 600,
                  fontSize: '16px',
                  height: '52px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                  transition: 'opacity 150ms ease-out, transform 150ms ease-out',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.opacity = status === 'loading' ? '0.6' : '1'
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}

          {/* Social proof */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '32px',
            }}
          >
            <div style={{ display: 'flex' }}>
              {['/images/avatar-1.png', '/images/avatar-2.jpg', '/images/avatar-3.png'].map(
                (src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={36}
                    height={36}
                    style={{
                      borderRadius: '50%',
                      border: '2px solid #080707',
                      marginLeft: i === 0 ? 0 : -8,
                      objectFit: 'cover',
                    }}
                  />
                )
              )}
            </div>
            <span style={{ fontSize: '15px', color: '#ABABAB' }}>
              Join others on the waitlist
            </span>
          </div>
        </div>
        </SectionReveal>
      </section>

      <Footer />
    </div>
  )
}
