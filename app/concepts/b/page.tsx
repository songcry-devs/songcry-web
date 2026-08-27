import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import Reveal from '@/components/motion/Reveal'
import WordReveal from '@/components/craft/WordReveal'
import CitySteps from '@/components/sections/concepts/b/CitySteps'

/**
 * Concept B — City first. Live city ticker, the big centered hero and form,
 * ghost-numeral steps, the three-phone angled collage, and the typographic
 * city wall as the close.
 *
 * TJ critiques fixed here: the For artists / For fans dual-panel section is
 * DELETED (the form’s own toggle does that job); the ghost-numeral
 * how-it-works rows from concept A fill that slot so the page keeps its
 * substance.
 *
 * Design-concept preview for TJ — never indexed.
 */
export const metadata: Metadata = {
  title: 'Songcry concept B · City first',
  description: 'A live city ticker, then the city line as the hero. The city is the organizing idea all the way down the page.',
  robots: { index: false, follow: false },
  // Each concept overrides the inherited root openGraph. Without this all four
  // unfurl as the identical homepage card, so a link pasted into Slack gives no
  // clue which concept it points at. These are review aids on a noindex page.
  openGraph: {
    type: 'website',
    title: 'Songcry concept B · City first',
    description: 'A live city ticker, then the city line as the hero. The city is the organizing idea all the way down the page.',
  },
}

const CITIES = [
  'Los Angeles CA',
  'Atlanta GA',
  'Baltimore MD',
  'Oakland CA',
  'Boston MA',
  'Philadelphia PA',
  'Portland ME',
  'Boise ID',
]

/** The typographic wall. Sizes are deliberately mixed so it reads as a wall, not a list. */
const WALL = [
  { name: 'Los Angeles', cls: 'cb-s1' },
  { name: 'Atlanta', cls: 'cb-s2' },
  { name: 'Oakland', cls: 'cb-s1 cb-hotname' },
  { name: 'Portland ME', cls: 'cb-s3' },
  { name: 'Baltimore', cls: 'cb-s1' },
  { name: 'Boston', cls: 'cb-s2' },
  { name: 'Philadelphia', cls: 'cb-s2' },
  { name: 'Boise', cls: 'cb-s3' },
]

/** One full pass of the city list; the track renders it twice for a seamless loop. */
function TickerSeq() {
  return (
    <span className="cb-seq">
      {CITIES.map((c) => (
        <span key={c} className={c === 'Oakland CA' ? 'cb-city cb-hot' : 'cb-city'}>
          {c}
          <span className="cb-dot">·</span>
        </span>
      ))}
    </span>
  )
}

export default function ConceptB() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        {/* ── City ticker ── */}
        <div className="cb-ticker" aria-hidden="true">
          <div className="cb-track">
            <TickerSeq />
            <TickerSeq />
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="cb-hero" aria-label="Hero">
          <div className="cb-hero-light" aria-hidden="true" />
          <Reveal y={24}>
            <h1 className="cb-h1">
              <WordReveal text={'Your city\nhears you first'} />
            </h1>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <p className="cb-sub">Your music starts in your city. Real listeners carry it further.</p>
          </Reveal>

          <Reveal y={24} delay={0.16}>
            <div className="cb-form" id="join">
              <JoinForm />
            </div>
          </Reveal>
        </section>

        {/* ── How it works (replaces the deleted dual panels) ── */}
        <CitySteps />

        {/* ── Three-phone angled collage ── */}
        <section className="cb-collage" aria-label="Inside the app">
          <Reveal y={20}>
            <p className="cb-eyebrow cb-collage-eyebrow">Inside the app</p>
          </Reveal>
          <Reveal y={32}>
            <div className="cb-collage-inner">
              <div className="cb-stage">
                <div className="cb-phones">
                  <Image
                    className="cb-ph cb-ph-l"
                    src="/concepts/filter-sheet.png"
                    alt="The filter sheet with city and genre chips"
                    width={380}
                    height={732}
                    sizes="(max-width: 980px) 240px, 320px"
                  />
                  <Image
                    className="cb-ph cb-ph-c"
                    src="/concepts/feed-thank-you.png"
                    alt="The Songcry feed playing Thank You by Pseudo Black"
                    width={380}
                    height={732}
                    sizes="(max-width: 980px) 240px, 320px"
                  />
                  <Image
                    className="cb-ph cb-ph-r"
                    src="/concepts/feed-baltimore.png"
                    alt="The Baltimore feed playing Space Jam by BRM Stuntin"
                    width={380}
                    height={732}
                    sizes="(max-width: 980px) 240px, 320px"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <ul className="cb-caps">
              <li>Filter by city and genre</li>
              <li>Your music starts in your city</li>
              <li>Every city has its own feed</li>
            </ul>
          </Reveal>
        </section>

        {/* ── Typographic city wall ── */}
        <section className="cb-wall" aria-label="Cities in the feed">
          <div className="cb-wall-photo" aria-hidden="true">
            <Image
              src="/framer/artist-band-1.png"
              alt=""
              width={3366}
              height={1886}
              sizes="100vw"
            />
          </div>
          <div className="cb-wall-scrim" aria-hidden="true" />

          <div className="cb-wall-wrap">
            <Reveal y={20}>
              <p className="cb-eyebrow">In the feed</p>
            </Reveal>
            <div className="cb-names">
              {WALL.map((c, i) => (
                <Reveal className="cb-name" key={c.name} y={18} amount={0.05} delay={0.07 * i}>
                  <span className={c.cls}>{c.name}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          /* ── Ticker ── */
          .cb-ticker {
            margin-top: 96px;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            overflow: hidden;
            padding: 11px 0;
            white-space: nowrap;
          }
          .cb-track {
            display: flex;
            width: max-content;
            animation: cb-marquee 44s linear infinite;
          }
          .cb-seq {
            display: inline-flex;
            flex-shrink: 0;
          }
          .cb-city {
            font-family: var(--font-albert);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.4);
          }
          .cb-hot {
            color: #ffffff;
          }
          .cb-dot {
            margin: 0 14px;
            opacity: 0.55;
            color: rgba(255, 255, 255, 0.4);
          }
          @keyframes cb-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .cb-track {
              animation: none;
            }
          }

          /* ── Hero ── */
          .cb-hero {
            position: relative;
            text-align: center;
            padding: 96px 24px 112px;
          }
          .cb-hero-light {
            position: absolute;
            inset: 0;
            background: radial-gradient(1000px 520px at 50% -10%, rgba(255, 255, 255, 0.04), transparent 65%);
            pointer-events: none;
          }
          .cb-h1 {
            position: relative;
            font-family: var(--font-albert);
            font-size: clamp(52px, 7.2vw, 100px);
            font-weight: 600;
            line-height: 0.98;
            letter-spacing: -0.035em;
            color: #ffffff;
            max-width: 9.5em;
            margin: 0 auto 28px;
          }
          .cb-sub {
            position: relative;
            font-family: var(--font-albert);
            font-size: 18px;
            line-height: 1.55;
            color: rgba(255, 255, 255, 0.65);
            max-width: 560px;
            margin: 0 auto 48px;
          }
          .cb-form {
            position: relative;
            max-width: 440px;
            margin: 0 auto;
            text-align: left;
          }

          /* ── Collage ── */
          .cb-collage {
            background: #0e0d0d;
            padding: 120px 0;
            overflow: hidden;
          }
          .cb-collage-inner {
            display: flex;
            justify-content: center;
            padding: 0 40px;
          }
          /* The chips hang off the phone cluster, so they anchor to this stage
             rather than to the middle of the viewport. Anchored to the viewport
             they drifted out into empty space as the window got wider. */
          .cb-stage {
            position: relative;
            width: 100%;
            max-width: 940px;
            /* The outer phones are rotated and pushed down, and a transform does
               not grow the layout box, so they hang 77px below it at desktop.
               Measured, not guessed. Without this the caption row lands on top
               of the phones, which is the bug it was meant to fix. */
            padding-bottom: 84px;
          }
          .cb-phones {
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }
          .cb-ph {
            width: 320px;
            height: auto;
            position: relative;
          }
          .cb-ph-l {
            transform: rotate(-6deg) translateY(48px);
            margin-right: -72px;
            z-index: 1;
          }
          .cb-ph-c {
            z-index: 3;
          }
          .cb-ph-r {
            transform: rotate(5deg) translateY(64px);
            margin-left: -72px;
            z-index: 2;
          }
          /* The labels used to be pills floating ON the phones. TJ, 2026-08-26:
             ugly and placed weird. They were: the middle one sat over the centre
             phone screen and the outer two clipped their own phones, so the
             product screenshots were being covered by their own captions. They
             are a caption row underneath now, which also suits B being the
             typographic concept. */
          .cb-collage-eyebrow {
            max-width: 1240px;
            margin: 0 auto 44px;
            padding: 0 40px;
            text-align: center;
          }
          .cb-caps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            list-style: none;
            width: 100%;
            max-width: 940px;
            margin: 24px auto 0;
            padding: 22px 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            box-sizing: border-box;
          }
          .cb-caps li {
            font-family: var(--font-albert);
            font-size: 15px;
            font-weight: 600;
            letter-spacing: -0.01em;
            line-height: 1.45;
            color: rgba(255, 255, 255, 0.72);
            text-align: center;
          }

          /* ── City wall ── */
          .cb-wall {
            background: #040404;
            position: relative;
            overflow: hidden;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            padding: 120px 0;
          }
          /* B photography: the skyline sits under the city wall, the one place
             on this page where the picture and the typography say the same
             thing. Each concept places its photograph differently on purpose. */
          .cb-wall-photo {
            position: absolute;
            inset: 0;
            opacity: 0.42;
            pointer-events: none;
          }
          .cb-wall-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 64%;
          }
          .cb-wall-scrim {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(to bottom, rgb(8, 7, 7) 3%, rgba(8, 7, 7, 0.6) 46%, rgb(8, 7, 7) 97%);
          }
          .cb-wall-wrap {
            position: relative;
            z-index: 1;
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 40px;
          }
          .cb-name {
            display: block;
          }
          .cb-eyebrow {
            font-family: var(--font-albert);
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.4);
            margin: 0 0 36px;
          }
          .cb-names {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            column-gap: 36px;
            row-gap: 8px;
            font-family: var(--font-albert);
            font-weight: 600;
            letter-spacing: -0.03em;
            line-height: 1.05;
            color: rgba(255, 255, 255, 0.13);
          }
          .cb-names span {
            transition: color 260ms ease;
            cursor: default;
          }
          .cb-names span:hover {
            color: rgba(255, 255, 255, 0.4);
          }
          .cb-s1 { font-size: clamp(44px, 6vw, 88px); }
          .cb-s2 { font-size: clamp(30px, 4.2vw, 60px); }
          .cb-s3 { font-size: clamp(24px, 3.2vw, 44px); }
          .cb-hotname { color: #ffffff; }
          .cb-names .cb-hotname:hover { color: #ffffff; }

          /* ── Responsive ── */
          @media (max-width: 980px) {
            .cb-ph { width: 240px; }
            .cb-ph-l { margin-right: -56px; }
            .cb-ph-r { margin-left: -56px; }
            .cb-caps { gap: 16px; }
          }
          @media (max-width: 817px) {
            .cb-hero { padding: 64px 24px 80px; }
            .cb-sub { margin-bottom: 40px; }
            .cb-collage { padding: 80px 0; }
            .cb-collage-inner { padding: 0 24px; }
            .cb-ph { width: 180px; }
            .cb-ph-l { margin-right: -64px; transform: rotate(-6deg) translateY(28px); }
            .cb-ph-r { margin-left: -64px; transform: rotate(5deg) translateY(40px); }
            .cb-collage-eyebrow { margin-bottom: 32px; padding: 0 24px; }
            .cb-stage { padding-bottom: 48px; }
            .cb-caps {
              grid-template-columns: 1fr;
              gap: 12px;
              margin-top: 20px;
              padding: 20px 24px 0;
            }
            .cb-caps li { font-size: 14px; }
            .cb-ticker { margin-top: 88px; }
            .cb-wall { padding: 80px 0; }
            .cb-wall-photo { opacity: 0.34; }
            .cb-wall-wrap { padding: 0 24px; }
          }
        `}</style>
      </main>

      <Footer />
    </>
  )
}
