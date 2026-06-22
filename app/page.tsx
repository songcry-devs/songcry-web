'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Sparkles,
  Radio,
  Users,
  Headphones,
  Flame,
  ArrowUpRight,
} from 'lucide-react'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { KineticHeadline } from '@/components/motion/KineticHeadline'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { WaveDivider } from '@/components/motion/WaveDivider'
import { ParallaxPhone } from '@/components/motion/ParallaxPhone'

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const APP_STORE_URL =
  'https://apps.apple.com/us/app/songcry-new-music-near-you/id6760088416'

const HOW_IT_SPREADS = [
  {
    num: '01',
    title: 'Upload & Claim',
    body: 'Artists upload and claim their city. Music gets served to fans in your geographic zone — starting in your neighborhood, moving outward as it earns listens.',
    visual: 'flame' as const,
  },
  {
    num: '02',
    title: 'Discover Locally',
    body: 'Fans swipe a personalized feed of songs rising in their city. No virality games — just what’s actually playing near you.',
    visual: 'wave' as const,
  },
  {
    num: '03',
    title: 'Real Listeners',
    body: 'Growth comes from people who chose to listen. No bots, no paid plays, no shortcuts. Music earns its audience.',
    visual: 'avatars' as const,
  },
] as const

const FAN_PERKS = [
  {
    Icon: MapPin,
    title: 'First in your city',
    body: 'Hear the rising artists on your block before they cross the river.',
  },
  {
    Icon: Sparkles,
    title: 'Shape your scene',
    body: 'Your listens are signal. What you play moves the map for everyone near you.',
  },
  {
    Icon: Radio,
    title: 'Local, not algorithmic',
    body: 'No engagement chase. Just what is actually playing in your neighborhood, today.',
  },
  {
    Icon: Users,
    title: 'Show up early',
    body: 'Be in the room when a Songcry artist plays their first show — before the hype.',
  },
  {
    Icon: Headphones,
    title: 'Built for headphones',
    body: 'A feed of full songs, not 15-second clips. Made for actually listening.',
  },
  {
    Icon: Flame,
    title: 'Keep it human',
    body: 'People, not playlists. The music rising near you was picked by the people next to you.',
  },
] as const

const GALLERY_ITEMS = [
  { src: '/images/gallery-1.jpg', alt: 'Crowd at a live show', aspect: '3 / 4' },
  { src: '/images/avatar-1.png', alt: 'Fan portrait', aspect: '1 / 1' },
  { src: '/images/gallery-2.png', alt: 'City street at night', aspect: '4 / 3' },
  { src: '/images/avatar-2.jpg', alt: 'Fan portrait', aspect: '1 / 1' },
  { src: '/images/gallery-3.jpg', alt: 'Rooftop gathering', aspect: '4 / 5' },
  { src: '/images/avatar-3.png', alt: 'Fan portrait', aspect: '1 / 1' },
  { src: '/images/gallery-4.jpg', alt: 'Local venue', aspect: '3 / 4' },
] as const

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function FanHomepage() {
  return (
    <div style={{ background: '#080707', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main">
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
          {/* Ambient aurora */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 60% 40% at 18% 30%, rgba(248,25,192,0.16) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 85% 70%, rgba(120,40,200,0.12) 0%, transparent 70%), #080707',
            }}
          />

          {/* Concert photo as bottom vignette — emotional edge, not decoration */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/backgrounds/hero-concert-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 70%',
              opacity: 0.32,
              maskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Dot grain */}
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
            className="hero-inner"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '96px 24px 80px',
              width: '100%',
            }}
          >
            <div className="hero-grid">
              {/* Left column */}
              <div className="hero-copy">
                <div style={{ marginBottom: '20px', display: 'inline-block' }}>
                  <Image
                    src="/images/yours-not-theirs-script.png"
                    alt="yours, not theirs"
                    width={220}
                    height={48}
                    priority
                    style={{
                      width: 'auto',
                      height: 'clamp(32px, 3.4vw, 44px)',
                      transform: 'rotate(-3deg)',
                      transformOrigin: 'left center',
                      opacity: 0.92,
                    }}
                  />
                </div>

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
                    Built for fans who hear it first, and the artists who made it in their city.
                  </p>
                </SectionReveal>
                <SectionReveal delay={900}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      Download on the App Store
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </a>
                    <Link
                      href="/artist"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        fontSize: '15px',
                        padding: '0 20px',
                        height: '52px',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.14)',
                        background: 'rgba(255,255,255,0.02)',
                        transition: 'border-color 200ms, background 200ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(248,25,192,0.45)'
                        e.currentTarget.style.background = 'rgba(248,25,192,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                      }}
                    >
                      For artists
                      <ArrowUpRight size={15} strokeWidth={2} />
                    </Link>
                  </div>
                </SectionReveal>
              </div>

              {/* Right column: parallax phone */}
              <div className="hero-phone">
                <ParallaxPhone
                  src="/images/phone-mockup-app.png"
                  alt="Songcry app showing a feed of music rising in your city"
                />
              </div>
            </div>
          </div>

          {/* Responsive rules for hero grid */}
          <style>{`
            .hero-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 48px;
              align-items: center;
            }
            @media (min-width: 720px) {
              .hero-grid { gap: 40px; }
            }
            @media (min-width: 960px) {
              .hero-grid {
                grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
                gap: 56px;
              }
            }
            .hero-phone { display: none; }
            @media (min-width: 720px) { .hero-phone { display: block; max-width: 380px; margin: 0 auto; } }
            @media (min-width: 960px) { .hero-phone { max-width: none; margin: 0; } }
          `}</style>
        </section>

        {/* ─── Waveform divider ─── */}
        <div style={{ padding: '0 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <WaveDivider />
          </div>
        </div>

        {/* ─── Fan gallery strip (social proof / city texture) ─── */}
        <section
          style={{
            padding: '48px 0 72px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <SectionReveal>
            <div style={{ maxWidth: '1200px', margin: '0 auto 32px', padding: '0 24px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#F819C0',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Real people, real scenes
              </div>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 0.5vw + 0.875rem, 1.375rem)',
                  color: '#E7E7E7',
                  maxWidth: '640px',
                  lineHeight: 1.45,
                }}
              >
                The rooms you already know. The faces you see on the train. The sound of a city at street level.
              </p>
            </div>
          </SectionReveal>

          <div
            className="marquee"
            aria-hidden="true"
            style={{
              position: 'relative',
              maskImage:
                'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
            }}
          >
            <div
              className="marquee-track"
              style={{
                display: 'flex',
                gap: '16px',
                width: 'max-content',
                padding: '4px 0',
              }}
            >
              {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    height: '260px',
                    aspectRatio: item.aspect,
                    flexShrink: 0,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="260px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it spreads ─── */}
        <section style={{ padding: '96px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <SectionReveal>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginBottom: '16px',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.08,
                }}
              >
                How it spreads.
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                  color: '#ABABAB',
                  textAlign: 'center',
                  maxWidth: '560px',
                  margin: '0 auto 64px',
                  lineHeight: 1.6,
                }}
              >
                Three beats. No algorithm games. Music earns its audience one neighborhood at a time.
              </p>
            </SectionReveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {HOW_IT_SPREADS.map((card, i) => (
                <SectionReveal key={card.num} delay={i * 120}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '40px 32px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ marginBottom: '24px', height: '56px', display: 'flex', alignItems: 'center' }}>
                      {card.visual === 'flame' && (
                        <Image
                          src="/logo/songcry-flame-circle.svg"
                          alt=""
                          width={56}
                          height={56}
                          style={{ opacity: 0.92 }}
                        />
                      )}
                      {card.visual === 'wave' && (
                        <svg width="96" height="40" viewBox="0 0 96 40" fill="none" aria-hidden="true">
                          <path
                            d="M0 20 C 8 8, 16 32, 24 20 S 40 8, 48 20 S 64 32, 72 20 S 88 8, 96 20"
                            stroke="#F819C0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.85"
                          />
                        </svg>
                      )}
                      {card.visual === 'avatars' && (
                        <div style={{ display: 'flex' }}>
                          {['/images/avatar-1.png', '/images/avatar-2.jpg', '/images/avatar-3.png'].map(
                            (src, idx) => (
                              <div
                                key={src}
                                style={{
                                  position: 'relative',
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '9999px',
                                  overflow: 'hidden',
                                  border: '2px solid #111',
                                  marginLeft: idx === 0 ? 0 : '-14px',
                                }}
                              >
                                <Image src={src} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        background: 'linear-gradient(135deg, #F819C0, #9B59B6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '10px',
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
                        marginBottom: '14px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.0625rem)',
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

        {/* ─── Your city, not theirs — editorial moment ─── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(96px, 12vw, 160px) 0',
            overflow: 'hidden',
          }}
        >
          {/* Portrait as emotional backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/artist-photo-woman.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              opacity: 0.5,
            }}
          />
          {/* Heavy darkening overlay + pink wash */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(8,7,7,0.96) 0%, rgba(8,7,7,0.78) 50%, rgba(8,7,7,0.92) 100%), radial-gradient(ellipse 60% 50% at 20% 40%, rgba(248,25,192,0.18) 0%, transparent 70%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <SectionReveal>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#F819C0',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                Home is where the ♡ is
              </div>
            </SectionReveal>
            <SectionReveal delay={100}>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 6vw + 1rem, 5rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.02,
                  letterSpacing: '-0.025em',
                  marginBottom: '28px',
                  maxWidth: '900px',
                }}
              >
                Your city.<br />
                <span style={{ color: '#F819C0' }}>Not theirs.</span>
              </h2>
            </SectionReveal>
            <SectionReveal delay={240}>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 0.5vw + 1rem, 1.375rem)',
                  color: '#D7D7D7',
                  lineHeight: 1.5,
                  maxWidth: '620px',
                }}
              >
                Every song on Songcry is tied to a place. A block, a venue, a scene. When you listen here you are not streaming someone else&apos;s global feed — you are lighting up a corner of your own city.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* ─── Fan perks ─── */}
        <section
          style={{
            padding: '96px 0',
            background:
              'linear-gradient(to bottom, transparent, #0A0909 20%, #0A0909 80%, transparent)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <SectionReveal>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#F819C0',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  For fans
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1,
                    marginBottom: '16px',
                  }}
                >
                  What you get when you show up early.
                </h2>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                    color: '#ABABAB',
                    maxWidth: '580px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                  }}
                >
                  The best part of finding new music has always been telling a friend. Songcry just gives you a better map.
                </p>
              </div>
            </SectionReveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {FAN_PERKS.map((perk, i) => {
                const Icon = perk.Icon
                return (
                  <SectionReveal key={perk.title} delay={i * 80}>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '14px',
                        padding: '28px 26px',
                        height: '100%',
                        transition: 'border-color 200ms, transform 200ms',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background:
                            'linear-gradient(135deg, rgba(248,25,192,0.22), rgba(155,89,182,0.12))',
                          border: '1px solid rgba(248,25,192,0.28)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '18px',
                          color: '#F819C0',
                        }}
                      >
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          marginBottom: '8px',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {perk.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '1rem',
                          color: '#ABABAB',
                          lineHeight: 1.6,
                        }}
                      >
                        {perk.body}
                      </p>
                    </div>
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Artist teaser ─── */}
        <section style={{ padding: '72px 0 48px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
            <SectionReveal>
              <Link
                href="/artist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '24px 28px',
                  background:
                    'linear-gradient(90deg, rgba(248,25,192,0.04) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(248,25,192,0.18)',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  transition: 'border-color 200ms, background 200ms, transform 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248,25,192,0.42)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248,25,192,0.18)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    flex: '0 0 64px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Image
                    src="/images/artist-photo-man.png"
                    alt=""
                    fill
                    sizes="64px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: '#F819C0',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Are you an artist?
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(1.0625rem, 0.5vw + 0.875rem, 1.25rem)',
                      fontWeight: 500,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                    }}
                  >
                    Claim your city. Green Room applications are open.
                  </div>
                </div>
                <ArrowUpRight
                  size={22}
                  strokeWidth={2}
                  style={{ flex: '0 0 auto', color: '#FFFFFF', opacity: 0.9 }}
                />
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* ─── Download ─── */}
        <section
          id="download"
          style={{
            padding: '96px 0 112px',
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(248,25,192,0.08) 0%, transparent 70%)',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '0 24px',
              textAlign: 'center',
            }}
          >
            <SectionReveal>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: '0 auto 20px',
                  lineHeight: 1.08,
                  letterSpacing: '-0.015em',
                }}
              >
                Download Songcry.
              </h2>
            </SectionReveal>
            <SectionReveal delay={120}>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 0.5vw + 0.875rem, 1.375rem)',
                  color: '#E7E7E7',
                  margin: '0 auto 12px',
                  maxWidth: '520px',
                  lineHeight: 1.45,
                }}
              >
                Start discovering music where it&apos;s actually moving.
              </p>
            </SectionReveal>
            <SectionReveal delay={200}>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#F819C0',
                  textTransform: 'uppercase',
                  marginBottom: '36px',
                }}
              >
                Available now on the App Store
              </p>
            </SectionReveal>
            <SectionReveal delay={280}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Songcry on the App Store"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 250ms, transform 250ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Image
                  src="/icons/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={168}
                  height={56}
                  priority
                />
              </a>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
