'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { submitArtist, submitFan, type JoinState } from '@/app/join/actions'

const INITIAL: JoinState = {}

/**
 * One form, two paths, chosen by the segmented toggle (artist preselected).
 * Each path has its own server action and its own error state, so switching
 * the toggle never shows the other path's error. The email input stays mounted
 * across the switch so a typed address survives changing your mind.
 *
 * `compact` tightens paddings and control heights so the card sits well
 * inside the homepage hero. Default (false) keeps the /join page look.
 */
export default function JoinForm({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<'artist' | 'fan'>('artist')
  const [artistState, artistAction] = useFormState(submitArtist, INITIAL)
  const [fanState, fanAction] = useFormState(submitFan, INITIAL)

  // Landing-page query string, captured client-side for the hidden `qs` field
  // so the server action can attribute the lead (utm_*, gclid, fbclid).
  const [qs, setQs] = useState('')
  useEffect(() => {
    setQs(window.location.search.replace(/^\?/, ''))
  }, [])

  const isArtist = mode === 'artist'
  const error = isArtist ? artistState.error : fanState.error

  return (
    <form
      action={isArtist ? artistAction : fanAction}
      className={compact ? 'join-form join-form--compact' : 'join-form'}
    >
      {/* ── Segmented toggle ── */}
      <div className="join-toggle" role="group" aria-label="I am joining as">
        <button
          type="button"
          aria-pressed={isArtist}
          onClick={() => setMode('artist')}
        >
          I&apos;m an artist
        </button>
        <button
          type="button"
          aria-pressed={!isArtist}
          onClick={() => setMode('fan')}
        >
          I&apos;m a fan
        </button>
      </div>

      {/* ── Name field (differs per path, so rendered per mode) ── */}
      {isArtist ? (
        <div className="join-field">
          <label className="join-label" htmlFor="join-artist-name">
            Artist or band name
          </label>
          <input
            id="join-artist-name"
            className="join-input"
            type="text"
            name="artist_name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your artist name"
          />
        </div>
      ) : (
        <div className="join-field">
          <label className="join-label" htmlFor="join-fan-name">
            Name
          </label>
          <input
            id="join-fan-name"
            className="join-input"
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
      )}

      {/* ── Email (shared — stays mounted across the toggle) ── */}
      <div className="join-field">
        <label className="join-label" htmlFor="join-email">
          Email
        </label>
        <input
          id="join-email"
          className="join-input"
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
        />
      </div>

      {/* ── Instagram (artist only, optional) ── */}
      {isArtist && (
        <div className="join-field">
          <label className="join-label" htmlFor="join-instagram">
            Instagram handle <span className="join-optional">(optional)</span>
          </label>
          <input
            id="join-instagram"
            className="join-input"
            type="text"
            name="instagram"
            maxLength={31}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="@yourhandle"
          />
        </div>
      )}

      {/* ── Honeypot — humans never see or tab into this. Bots fill it and get
             a silent pretend-success from the server action. ── */}
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="join-website">Website</label>
        <input
          id="join-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Attribution passthrough for the server action. */}
      <input type="hidden" name="qs" value={qs} />

      <SubmitButton label={isArtist ? 'Join the beta' : 'Join the waitlist'} />

      {error && (
        <p className="join-error" role="alert">
          {error}
        </p>
      )}

      {/* Trust line — sibling of the artists.songcry.app form's reassurance. */}
      <p className="join-trust">
        {isArtist
          ? "Invite-only. We'll only use this to reach you. No spam."
          : "We'll only use this to reach you. No spam."}
      </p>

      {/* Scoped responsive styles — follows Hero.tsx / nav.tsx pattern */}
      <style>{`
        /* ── Card — mirrors the artists.songcry.app form card (24px radius,
               hairline border, raised surface, clamp padding) using this
               site surface values. Controls inside sit on the page
               black so they read inset against the card, the same
               card/field relationship the artists form has.
               NOTE: keep this whole style string free of apostrophes,
               quotes, ampersands and angle brackets. React escapes them
               during SSR but browsers do not decode entities inside
               style elements, which breaks hydration. ── */
        .join-form {
          width: 100%;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: clamp(1.75rem, 4vw, 2.5rem);
        }

        /* ── Segmented toggle ── */
        .join-toggle {
          display: flex;
          gap: 4px;
          padding: 4px;
          background: rgb(8, 7, 7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }
        .join-toggle button {
          flex: 1;
          min-height: 44px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: var(--text-60);
          font-family: var(--font-albert);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 180ms ease-out, color 180ms ease-out;
        }
        .join-toggle button:hover {
          color: #ffffff;
        }
        .join-toggle button[aria-pressed=true] {
          background: #ffffff;
          color: rgb(41, 41, 41);
        }
        .join-toggle button[aria-pressed=true]:hover {
          color: rgb(41, 41, 41);
        }

        /* ── Fields ── */
        .join-field {
          margin-top: 20px;
        }
        .join-label {
          display: block;
          font-family: var(--font-albert);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .join-optional {
          color: var(--text-dim);
          font-weight: 400;
        }
        .join-input {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          background: rgb(8, 7, 7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          color: #ffffff;
          font-family: var(--font-albert);
          /* 16px minimum so iOS Safari does not zoom the page on focus */
          font-size: 16px;
          transition: border-color 180ms ease-out;
        }
        .join-input::placeholder {
          color: var(--text-dim);
        }
        .join-input:hover {
          border-color: rgba(255, 255, 255, 0.24);
        }

        /* ── Honeypot: visually hidden, still in the DOM for bots ── */
        .join-hp {
          position: absolute;
          left: -9999px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        /* ── Submit — brand pink, press feedback matching the artists
               Request-access button (transform-only transition, scale
               down on :active, dimmed while pending; no hover shift). ── */
        .join-submit {
          width: 100%;
          height: 52px;
          margin-top: 28px;
          border: none;
          border-radius: 999px;
          background: var(--pink);
          color: #ffffff;
          font-family: var(--font-albert);
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 160ms ease-out, opacity 180ms ease-out;
        }
        .join-submit:active:not(:disabled) {
          transform: scale(0.975);
        }
        .join-submit:disabled {
          opacity: 0.7;
          cursor: progress;
        }

        /* ── Inline error ── */
        .join-error {
          margin: 16px 0 0;
          font-family: var(--font-albert);
          font-size: 15px;
          line-height: 1.5;
          color: #F34655;
        }

        /* ── Trust line ── */
        .join-trust {
          margin: 16px 0 0;
          font-family: var(--font-albert);
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-dim);
        }

        /* ── Compact variant (homepage hero) ── */
        /* Tighter card padding and shorter controls; input font stays 16px
           so iOS Safari does not zoom the page on focus. */
        .join-form--compact {
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
        }
        .join-form--compact .join-toggle button {
          min-height: 40px;
          font-size: 15px;
        }
        .join-form--compact .join-field {
          margin-top: 14px;
        }
        .join-form--compact .join-label {
          font-size: 13px;
          margin-bottom: 6px;
        }
        .join-form--compact .join-input {
          height: 46px;
        }
        .join-form--compact .join-submit {
          height: 48px;
          margin-top: 22px;
          font-size: 16px;
        }
        .join-form--compact .join-error {
          margin-top: 12px;
          font-size: 14px;
        }
        .join-form--compact .join-trust {
          margin-top: 12px;
          font-size: 12px;
        }
      `}</style>
    </form>
  )
}

/**
 * Child component so useFormStatus sees the surrounding <form> — it only
 * reports pending state from inside the form tree.
 */
function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button className="join-submit" type="submit" disabled={pending}>
      {pending ? 'Sending...' : label}
    </button>
  )
}
