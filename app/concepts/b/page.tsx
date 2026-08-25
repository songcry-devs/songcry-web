import type { Metadata } from 'next'
import Image from 'next/image'

import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import JoinForm from '@/components/sections/join/JoinForm'
import GhostSteps from '@/components/sections/concepts/GhostSteps'

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
          <h1 className="cb-h1">
            Your city
            <br />
            hears you first
          </h1>
          <p className="cb-sub">Your music starts in your city. Real listeners carry it further.</p>

          <div className="cb-form" id="join">
            <JoinForm />
          </div>
        </section>

        {/* ── How it works (replaces the deleted dual panels) ── */}
        <GhostSteps />

        {/* ── Three-phone angled collage ── */}
        <section className="cb-collage" aria-label="Inside the app">
          <div className="cb-collage-inner">
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
            <div className="cb-chip cb-chip-l">Filter by city and genre</div>
            <div className="cb-chip cb-chip-c">Your music starts in your city</div>
            <div className="cb-chip cb-chip-r">Every city has its own feed</div>
          </div>
        </section>

        {/* ── Typographic city wall ── */}
        <section className="cb-wall" aria-label="Cities in the feed">
          <div className="cb-wall-wrap">
            <p className="cb-eyebrow">In the feed</p>
            <div className="cb-names">
              <span className="cb-s1">Los Angeles</span>
              <span className="cb-s2">Atlanta</span>
              <span className="cb-s1 cb-hotname">Oakland</span>
              <span className="cb-s3">Portland ME</span>
              <span className="cb-s1">Baltimore</span>
              <span className="cb-s2">Boston</span>
              <span className="cb-s2">Philadelphia</span>
              <span className="cb-s3">Boise</span>
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
            color: var(--pink);
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
            padding: 88px 24px 96px;
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
            font-weight: 700;
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
            padding: 96px 0 128px;
            overflow: hidden;
          }
          .cb-collage-inner {
            position: relative;
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
          .cb-chip {
            position: absolute;
            background: #161616;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 999px;
            padding: 9px 16px;
            font-family: var(--font-albert);
            font-size: 13px;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: #ffffff;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
            white-space: nowrap;
            z-index: 4;
            transition: border-color 200ms ease, transform 200ms ease;
          }
          .cb-chip:hover {
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
          .cb-chip-l { left: calc(50% - 480px); top: 96px; }
          .cb-chip-c { left: 50%; transform: translateX(-50%); bottom: 40px; }
          .cb-chip-c:hover { transform: translateX(-50%) translateY(-2px); }
          .cb-chip-r { right: calc(50% - 470px); top: 200px; }

          /* ── City wall ── */
          .cb-wall {
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            padding: 96px 0 112px;
          }
          .cb-wall-wrap {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 40px;
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
            font-weight: 700;
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
          .cb-hotname { color: var(--pink); }
          .cb-names .cb-hotname:hover { color: var(--pink); }

          /* ── Responsive ── */
          @media (max-width: 980px) {
            .cb-ph { width: 240px; }
            .cb-ph-l { margin-right: -56px; }
            .cb-ph-r { margin-left: -56px; }
            .cb-chip-l { left: 8px; top: 48px; }
            .cb-chip-r { right: 8px; top: 140px; }
          }
          @media (max-width: 817px) {
            .cb-hero { padding: 64px 24px 80px; }
            .cb-sub { margin-bottom: 40px; }
            .cb-collage { padding: 64px 0 104px; }
            .cb-ph { width: 180px; }
            .cb-ph-l { margin-right: -64px; transform: rotate(-6deg) translateY(28px); }
            .cb-ph-r { margin-left: -64px; transform: rotate(5deg) translateY(40px); }
            .cb-chip { font-size: 12px; padding: 8px 13px; }
            .cb-chip-c { bottom: 24px; }
            .cb-ticker { margin-top: 88px; }
            .cb-wall { padding: 72px 0 88px; }
            .cb-wall-wrap { padding: 0 24px; }
          }
        `}</style>
      </main>

      <Footer />
    </>
  )
}
