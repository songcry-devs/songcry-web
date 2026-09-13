import Link from 'next/link'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import SupportIndex from '@/components/sections/support/SupportIndex'

/*
 * songcry.app/support
 *
 * This is the App Store Support URL and the Google Play support link, so it has
 * hard requirements before it has a design:
 *   - Apple 1.5: real contact info. A homepage, a social profile or a legal doc
 *     as the Support URL has been rejected. Email and mailing address sit at the top.
 *   - Google Play: a web path to request account deletion that names the app.
 *   - DMCA 512(c)(2): the designated agent contact, publicly on the site.
 *   - TAKE IT DOWN Act: a plain-language removal process for intimate images.
 *
 * Every answer below was checked against the shipping app (songcry-app main,
 * 1.5.0) and the live legal pages on 2026-09-13. Wording follows the app: 72 hours
 * for artist review, up to 24 hours for a song, 3 songs in the feed, WAV or MP3
 * up to 120 MB, reset links valid for 1 hour. Before changing an answer, check the
 * app string it mirrors. Nothing here describes a feature that is not live.
 *
 * Answers are always expanded (no accordions): scanning a page beats opening
 * twenty toggles, and it needs no ARIA machinery. Headings are tasks, not
 * questions, because tasks scan faster.
 */

export const metadata = {
  alternates: { canonical: '/support' },
  title: 'Songcry Support',
  description:
    'Get help with Songcry: reset your password, delete your account, check an artist review, report a song, copyright notices, and how to reach us.',
}

const sections = [
  { id: 'start', label: 'Getting started' },
  { id: 'artists', label: 'For artists' },
  { id: 'account', label: 'Your account' },
  { id: 'safety', label: 'Safety and reporting' },
  { id: 'copyright', label: 'Copyright' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'contact', label: 'Still need help' },
]

const tasks = [
  { href: '#reset-password', title: 'Reset your password', hint: 'Get a login link by email' },
  { href: '#delete-account', title: 'Delete your account', hint: 'In the app, or by email' },
  { href: '#review', title: 'Check your artist review', hint: 'What each status means' },
  { href: '#report', title: 'Report a song', hint: 'Or block someone' },
  { href: '#copyright', title: 'Send a copyright notice', hint: 'Our DMCA agent' },
  { href: '#intimate-images', title: 'Remove an intimate image', hint: 'No account needed' },
]

function Task({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <article id={id} className="support-task">
      <h3 className="support-task-title">{title}</h3>
      <div className="support-task-body">{children}</div>
    </article>
  )
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="support-section">
      <p className="support-eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className="support-section-title">{title}</h2>
      <div className="support-tasks">{children}</div>
    </section>
  )
}

export default function SupportPage() {
  return (
    <div className="support-page">
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav variant="home" />

      <main id="main">
        {/* Band 1: the answer to "how do I reach you", then the six things people come here for */}
        <header className="support-hero">
          <div className="support-hero-inner">
            <div className="support-hero-copy">
              <p className="support-eyebrow">Support</p>
              <h1 className="support-h1">Get help with Songcry</h1>
              <p className="support-lead">
                Answers to what we hear most, and a real person on the other end when you need one.
              </p>
            </div>

            <aside className="support-contact" aria-label="Contact Songcry">
              <p className="support-contact-label">Email us</p>
              <a href="mailto:support@songcry.app" className="support-contact-email">support@songcry.app</a>
              <p className="support-contact-note">
                Include the email on your account, your iPhone model, and a screenshot if something looks wrong.
              </p>
              <p className="support-contact-address">
                Songcry, Inc.
                <br />
                20950 Warner Center Ln, Suite A
                <br />
                Woodland Hills, CA 91367
              </p>
            </aside>
          </div>

          <nav aria-label="Common tasks" className="support-tasks-grid">
            {tasks.map((t) => (
              <a key={t.href} href={t.href} className="support-tile">
                <span className="support-tile-title">{t.title}</span>
                <span className="support-tile-hint">{t.hint}</span>
                <span className="support-tile-arrow" aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </header>

        {/* Band 2: every answer, with the section rail pinned beside it */}
        <div className="support-body">
          <div className="support-rail">
            <SupportIndex sections={sections} />
          </div>

          <div className="support-content">
            <Section id="start" eyebrow="Getting started" title="What Songcry is and who can use it">
              <Task title="What Songcry is">
                <p>
                  Songcry is a music discovery app built around cities. Flip through any city’s feed to hear the artists
                  making noise there, filter by city and genre, and like, host, comment on and share the songs you love.
                  There are no ads in the music feed.
                </p>
              </Task>
              <Task title="Who can join">
                <p>
                  Artists can apply now. Fan accounts aren’t open yet: choose Fan when you sign up to join the waitlist,
                  and we’ll email you the moment they open. Until then, anyone can open the app and listen without an
                  account.
                </p>
              </Task>
              <Task title="Where Songcry works">
                <p>
                  Songcry is on iPhone, running iOS 15.6 or later, in the United States. Android is on the way. You need
                  to be 18 or older to create an account.
                </p>
              </Task>
              <Task title="What it costs">
                <p>Songcry is free to join. There are no subscriptions or in-app purchases, and nobody pays to be heard.</p>
              </Task>
            </Section>

            <Section id="artists" eyebrow="For artists" title="Applying, review and your songs">
              <Task title="Apply as an artist">
                <p>
                  Download Songcry, tap Sign Up and choose Artist. To show you’re the artist, connect two of X, TikTok or
                  YouTube, or upload a document that confirms you as an artist, up to 15 MB per file. A document can take
                  a little longer to review.
                </p>
              </Task>
              <Task id="review" title="How review works">
                <p>
                  Your review starts once your profile is complete and you’ve uploaded your first song. The checklist on
                  your profile shows what’s left: profile photo, banner, bio, hometown, base city, genre, subgenre and a
                  song. Every application is reviewed by a person, and we’ll email you within 72 hours.
                </p>
              </Task>
              <Task title="What your status means">
                <dl className="support-statuses">
                  <div>
                    <dt>Under review</dt>
                    <dd>We’re reviewing your profile. It stays hidden until you’re approved.</dd>
                  </div>
                  <div>
                    <dt>Awaiting approval</dt>
                    <dd>You passed review and you’re in line for the next round of approvals.</dd>
                  </div>
                  <div>
                    <dt>Needs changes</dt>
                    <dd>
                      Make the suggested changes and tap Apply Again. You can submit up to 3 times. After that, email us and
                      we’ll take it from there.
                    </dd>
                  </div>
                  <div>
                    <dt>Not approved</dt>
                    <dd>Email us if you’d like to talk it through.</dd>
                  </div>
                  <div>
                    <dt>Approved</dt>
                    <dd>Your profile goes live. If your profile shows a Publish button, tap it to go live.</dd>
                  </div>
                </dl>
              </Task>
              <Task title="Upload a song">
                <p>
                  Tap the plus button to upload. Audio can be WAV or MP3, up to 120 MB. Pair it with a music video, a
                  clip, a short loop or up to 5 photos, and use Auto-Sync to line them up. Every song is reviewed before it
                  plays, which can take up to 24 hours.
                </p>
                <p>Three songs can be in the feed at a time, and every approved song lives in Singles on your profile.</p>
              </Task>
              <Task title="Edit, hide or delete a song">
                <p>
                  Open Manage Songs. Edits to a song that’s already live are reviewed within 24 hours before they show in
                  the feed. A song you take out of the feed can go back in from History. Deleting a song removes it from
                  the feed and can’t be undone.
                </p>
              </Task>
            </Section>

            <Section id="account" eyebrow="Your account" title="Signing in, settings and deleting your account">
              <Task title="Sign in">
                <p>Use the same method you signed up with: email or username, Apple, or Google.</p>
              </Task>
              <Task id="reset-password" title="Reset your password">
                <p>
                  On the Log In screen, tap Forgot Password?, enter your email or username and tap Send Login Link. We’ll
                  email you a link to set a new password. The link works for 1 hour.
                </p>
              </Task>
              <Task title="Turn notifications on or off">
                <p>
                  Use the Allow Notifications switch in {'Account & Settings'}, or go to iPhone Settings, then Songcry,
                  then Notifications. We send notifications about things like review decisions on your profile and songs.
                </p>
              </Task>
              <Task title="Location">
                <p>
                  Songcry uses your location while you’re using the app, so it can show you your city’s feed. Your exact
                  location is never shown to other people. To share an approximate location instead, go to iPhone
                  Settings, then Songcry, then Location, and turn off Precise Location.
                </p>
              </Task>
              <Task id="delete-account" title="Delete your Songcry account">
                <p>
                  In the app, go to your profile, open {'Account & Settings'}, tap Delete Account and type DELETE to
                  confirm. Deletion happens right away and can’t be undone.
                </p>
                <p>
                  Can’t get into the app? Email{' '}
                  <a href="mailto:support@songcry.app?subject=Delete%20my%20account" className="support-link">
                    support@songcry.app
                  </a>{' '}
                  from the email address on your account with the subject “Delete my account”, and we’ll verify it’s you
                  and delete it.
                </p>
                <p>
                  <Link href="/legal/delete-account" className="support-link">
                    See what’s deleted and what’s kept
                  </Link>
                </p>
              </Task>
            </Section>

            <Section id="safety" eyebrow="Safety" title="Reporting, blocking and removal requests">
              <Task id="report" title="Report a song or comment">
                <p>
                  In the feed, tap the three dots on the song, then Report Song, and choose a reason. For a comment, open
                  its options and tap Report. Reports go to our team for review, and we never tell anyone who reported
                  them.
                </p>
              </Task>
              <Task title="Report an artist or account">
                <p>
                  Email{' '}
                  <a href="mailto:support@songcry.app" className="support-link">
                    support@songcry.app
                  </a>{' '}
                  with the artist’s name and what happened.
                </p>
              </Task>
              <Task title="Block someone">
                <p>
                  Open the artist’s profile, tap the three dots and choose Block, or block from a comment’s options.
                  Blocked accounts can’t see your profile or your songs.
                </p>
              </Task>
              <Task id="intimate-images" title="Remove an intimate image">
                <p>
                  If an intimate image or video of you was shared on Songcry without your consent, email{' '}
                  <a href="mailto:takedown@songcry.app" className="support-link">
                    takedown@songcry.app
                  </a>
                  . You don’t need an account. We remove the content within 48 hours of a valid request and look for
                  copies.
                </p>
                <p>
                  <Link href="/legal/removing-intimate-images" className="support-link">
                    What to include in your request
                  </Link>
                </p>
              </Task>
            </Section>

            <Section id="copyright" eyebrow="Copyright" title="Copyright notices">
              <Task title="Send a copyright notice">
                <p>
                  If you believe something on Songcry infringes your copyright, send a notice to our designated agent. It
                  needs your signature, the work you own, where the material appears on Songcry, your contact details, a
                  statement that you believe in good faith the use isn’t authorized, and a statement that your notice is
                  accurate and that you’re the owner or authorized to act for them.
                </p>
                <address className="support-address">
                  Legal Department (DMCA Agent)
                  <br />
                  Songcry, Inc.
                  <br />
                  20950 Warner Center Ln, Suite A
                  <br />
                  Woodland Hills, CA 91367
                  <br />
                  <a href="mailto:dmca@songcry.app" className="support-link">
                    dmca@songcry.app
                  </a>
                </address>
              </Task>
              <Task title="If your content was removed">
                <p>
                  If you think your content was removed by mistake, you can send a counter notice to the same agent. The
                  full process is in our{' '}
                  <Link href="/legal/terms-of-use" className="support-link">
                    Terms of Use
                  </Link>
                  .
                </p>
              </Task>
            </Section>

            <Section id="privacy" eyebrow="Privacy" title="Your data">
              <Task title="Request your data, a correction or deletion">
                <p>
                  Email{' '}
                  <a href="mailto:support@songcry.app?subject=Privacy%20Request" className="support-link">
                    support@songcry.app
                  </a>{' '}
                  with the subject “Privacy Request”. If you live in California, use “California Privacy Request”. Read
                  how we handle your data in our{' '}
                  <Link href="/legal/privacy" className="support-link">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </Task>
            </Section>
          </div>
        </div>

        {/* Band 3: the ground changes to close. Contact again, for whoever scrolled this far. */}
        <section id="contact" aria-labelledby="contact-title" className="support-close">
          <div className="support-close-inner">
            <div>
              <p className="support-eyebrow support-eyebrow-dark">Still need help</p>
              <h2 id="contact-title" className="support-close-title">Write to us. A person reads every email.</h2>
            </div>
            <div className="support-close-detail">
              <a href="mailto:support@songcry.app" className="support-close-button">
                Email support@songcry.app
              </a>
              <p>
                Tell us the email on your account, your iPhone model and iOS version, the app version, and what happened.
                A screenshot helps.
              </p>
              <p className="support-close-links">
                <Link href="/legal/terms-of-use">Terms of Use</Link>
                <Link href="/legal/privacy">Privacy Policy</Link>
                <Link href="/legal/community-guidelines">Community Guidelines</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .support-page {
          background: #080707;
          color: #ffffff;
          min-height: 100vh;
        }

        .support-eyebrow {
          font-size: 14px;
          line-height: 1.45;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #F819C0;
          margin: 0 0 16px;
        }

        /* Band 1 */
        .support-hero {
          background: #110E10;
          padding: 152px 48px 72px;
        }
        .support-hero-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 48px;
          align-items: end;
        }
        .support-h1 {
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1.06;
          letter-spacing: -0.02em;
          font-weight: 600;
          margin: 0 0 20px;
          text-wrap: balance;
        }
        .support-lead {
          font-size: 21px;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
          max-width: 34ch;
        }
        .support-contact {
          background: #080707;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 28px;
        }
        .support-contact-label {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 6px;
        }
        .support-contact-email {
          display: inline-block;
          font-size: 21px;
          line-height: 1.3;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          border-bottom: 2px solid #F819C0;
          padding-bottom: 2px;
          margin-bottom: 16px;
        }
        .support-contact-email:hover { color: #F819C0; }
        .support-contact-note,
        .support-contact-address {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }
        .support-contact-address {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .support-tasks-grid {
          max-width: 1180px;
          margin: 56px auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .support-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 22px 56px 22px 22px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          text-decoration: none;
          transition: background 200ms ease, border-color 200ms ease;
        }
        .support-tile:hover {
          background: rgba(248, 25, 192, 0.08);
          border-color: rgba(248, 25, 192, 0.4);
        }
        .support-tile-title {
          font-size: 17px;
          line-height: 1.3;
          font-weight: 600;
        }
        .support-tile-hint {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.6);
        }
        .support-tile-arrow {
          position: absolute;
          right: 22px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 17px;
          color: #F819C0;
        }

        /* Band 2 */
        .support-body {
          max-width: 1276px;
          margin: 0 auto;
          padding: 96px 48px 120px;
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 72px;
        }
        .support-rail { position: relative; }
        .support-index {
          position: sticky;
          top: 112px;
        }
        .support-index-title {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 12px;
        }
        .support-index ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 2px;
        }
        .support-index-link {
          display: block;
          font-size: 14px;
          line-height: 1.45;
          padding: 7px 0 7px 16px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          border-left: 2px solid rgba(255, 255, 255, 0.08);
          transition: color 160ms ease, border-color 160ms ease;
        }
        .support-index-link:hover { color: #ffffff; }
        .support-index-link[aria-current=true] {
          color: #ffffff;
          border-left-color: #F819C0;
        }

        .support-content { max-width: 700px; }
        .support-section {
          padding: 0 0 80px;
          scroll-margin-top: 104px;
        }
        .support-section-title {
          font-size: 36px;
          line-height: 1.12;
          letter-spacing: -0.015em;
          font-weight: 600;
          margin: 0 0 32px;
          text-wrap: balance;
        }
        .support-tasks {
          display: grid;
          gap: 36px;
        }
        .support-task { scroll-margin-top: 104px; }
        .support-task-title {
          font-size: 21px;
          line-height: 1.3;
          font-weight: 600;
          margin: 0 0 10px;
        }
        .support-task-body {
          display: grid;
          gap: 14px;
        }
        .support-task-body p,
        .support-statuses dd {
          font-size: 17px;
          line-height: 1.55;
          color: #D6D6D6;
          margin: 0;
        }
        .support-link {
          color: #ffffff;
          text-decoration: underline;
          text-decoration-color: rgba(248, 25, 192, 0.7);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .support-link:hover { color: #F819C0; }

        .support-statuses {
          margin: 0;
          display: grid;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .support-statuses div {
          display: grid;
          grid-template-columns: 168px minmax(0, 1fr);
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .support-statuses dt {
          font-size: 17px;
          line-height: 1.55;
          font-weight: 600;
          color: #ffffff;
        }

        .support-address {
          font-style: normal;
          font-size: 17px;
          line-height: 1.55;
          color: #D6D6D6;
          padding: 18px 20px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Band 3 */
        .support-close {
          background: #F4F0F3;
          color: #121012;
          padding: 96px 48px;
          scroll-margin-top: 80px;
        }
        .support-close-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: start;
        }
        .support-eyebrow-dark { color: #B0107F; }
        .support-close-title {
          font-size: 36px;
          line-height: 1.12;
          letter-spacing: -0.015em;
          font-weight: 600;
          margin: 0;
          text-wrap: balance;
        }
        .support-close-detail {
          display: grid;
          gap: 16px;
        }
        .support-close-detail p {
          font-size: 17px;
          line-height: 1.55;
          color: #4A4448;
          margin: 0;
        }
        .support-close-button {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          height: 52px;
          padding: 0 26px;
          border-radius: 9999px;
          background: #121012;
          color: #ffffff;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .support-close-button:hover { background: #F819C0; color: #121012; }
        .support-close-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }
        .support-close-links a {
          color: #121012;
          font-size: 14px;
          text-underline-offset: 3px;
        }

        .support-page a:focus-visible {
          outline: 2px solid #F819C0;
          outline-offset: 3px;
          border-radius: 6px;
        }

        @media (prefers-reduced-motion: no-preference) {
          html:has(.support-page) { scroll-behavior: smooth; }
        }

        /* Tablet */
        @media (max-width: 1100px) {
          .support-tasks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .support-body { grid-template-columns: minmax(0, 1fr); gap: 0; }
          .support-rail { display: none; }
          .support-content { max-width: 760px; margin: 0 auto; width: 100%; }
        }

        /* Phone */
        @media (max-width: 817px) {
          .support-hero { padding: 128px 20px 48px; }
          .support-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 32px; }
          .support-lead { font-size: 17px; line-height: 1.55; }
          .support-tasks-grid { grid-template-columns: minmax(0, 1fr); margin-top: 32px; gap: 8px; }
          .support-body { padding: 64px 20px 72px; }
          .support-section { padding-bottom: 56px; }
          .support-section-title { font-size: 28px; line-height: 1.14; margin-bottom: 24px; }
          .support-tasks { gap: 28px; }
          .support-statuses div { grid-template-columns: minmax(0, 1fr); gap: 2px; }
          .support-close { padding: 64px 20px; }
          .support-close-inner { grid-template-columns: minmax(0, 1fr); gap: 24px; }
          .support-close-title { font-size: 28px; line-height: 1.14; }
        }
      `}</style>
    </div>
  )
}
