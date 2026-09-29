'use server'

import { randomUUID } from 'crypto'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sendCapiEvent } from '@/lib/meta-capi'
import { signupGate } from '@/lib/environment'
import { channelFromUtm, pickCampaignParams, sourcePageFromReferer } from '@/lib/attribution'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const IG_RE = /^[A-Za-z0-9._]{1,30}$/

const GENERIC_ERROR = 'Something went wrong on our end. Please try again.'

// TJ 2026-08-24: the artist thank-you IS the artists-site thank-you (its Meta pixel Lead and
// Google Ads label fire there, keyed to the lead- eid minted here). A direct visit with no eid
// fires nothing.
const ARTIST_THANKS = 'https://artists.songcry.app/thanks'

/** A write that takes longer than this shows the visitor an error instead of a spinner. */
const WRITE_TIMEOUT_MS = 8000

export type JoinState = { error?: string; preview?: boolean }

/** Bots fill every field, including the visually hidden one. */
function honeypotTripped(formData: FormData): boolean {
  return String(formData.get('website') ?? '').trim() !== ''
}

/**
 * The host this request was made to, as the platform actually reports it. Vercel proxies the
 * request in front of the Function, and Next's own Server Actions CSRF check (action-handler.js)
 * prefers x-forwarded-host over host for exactly that reason; the fallback to host covers a
 * request that arrives with no x-forwarded-host at all (e.g. local `next start`).
 */
function requestHost(): string | null {
  return headers().get('x-forwarded-host') ?? headers().get('host')
}

/**
 * Artist submit. Validates; on production inserts one access_requests row, reports the Lead to
 * Meta CAPI and redirects to the artists-site thank-you with the eid. Anywhere else it stops
 * after validation (lib/environment.ts): nothing is written, no conversion fires, and the form
 * says "Preview: nothing was saved."
 */
export async function submitArtist(_prev: JoinState, formData: FormData): Promise<JoinState> {
  if (honeypotTripped(formData)) redirect(ARTIST_THANKS)

  const artistName = String(formData.get('artist_name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const instagram = String(formData.get('instagram') ?? '')
    .trim()
    .replace(/^@+/, '')

  if (!artistName) return { error: 'Enter your artist or band name.' }
  if (!EMAIL_RE.test(email)) return { error: 'Enter a valid email address.' }
  if (instagram && !IG_RE.test(instagram)) {
    return { error: 'Enter a valid Instagram handle: letters, numbers, . or _ only.' }
  }

  const utm = pickCampaignParams(String(formData.get('qs') ?? ''))
  const sourcePage = sourcePageFromReferer(headers().get('referer'))

  const gate = signupGate(process.env, requestHost())
  if (gate.mode === 'preview') {
    // No email in the log: Vercel logs are not a place for personal data.
    console.info(
      `[signup-preview] nothing saved env=${process.env.VERCEL_ENV ?? 'unset'} form=artist page=${sourcePage} utm=${Object.keys(utm).join('+') || '-'}`
    )
    return { preview: true }
  }
  if (gate.mode === 'misconfigured') {
    console.error(
      `[signup-config-missing] form=artist missing=${gate.missing.join(',') || '-'} invalid=${gate.invalid.join(',') || '-'}`
    )
    return { error: GENERIC_ERROR }
  }
  if (gate.envMismatch) {
    console.warn(`[signup-env-mismatch] env=${process.env.VERCEL_ENV ?? 'unset'} form=artist`)
  }
  const { supabaseUrl, supabaseAnonKey } = gate.config

  let res: Response
  try {
    res = await fetch(`${supabaseUrl}/rest/v1/access_requests`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email,
        artist_name: artistName,
        ...(instagram ? { instagram } : {}),
        source_page: sourcePage,
        ...(Object.keys(utm).length ? { utm } : {}),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
    })
  } catch (err) {
    console.error('artist insert unreachable', String(err).slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('artist insert failed', res.status, detail.slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  // Server-side twin of the thank-you page pixel, same event_id so Meta dedupes the pair.
  // Awaited: a serverless function can be frozen the moment it responds.
  const eid = `lead-${randomUUID()}`
  const capi = await sendCapiEvent({
    eventId: eid,
    eventName: 'Lead',
    email,
    sourceUrl: headers().get('referer') ?? 'https://songcry.app/join',
    fbclid: utm.fbclid,
    fbp: cookies().get('_fbp')?.value,
    clientIp: headers().get('x-forwarded-for')?.split(',')[0]?.trim(),
    userAgent: headers().get('user-agent') ?? undefined,
  })
  if (!capi.startsWith('ok')) console.warn('artist capi', capi)

  redirect(`${ARTIST_THANKS}?eid=${encodeURIComponent(eid)}`)
}

/**
 * Fan submit. On production POSTs to the public fan-waitlist endpoint (204 on success and on a
 * duplicate, 422 on validation; never read a body), reports FanWaitlist to Meta CAPI and
 * redirects to the fan thank-you. Anywhere else it stops after validation, like the artist path.
 */
export async function submitFan(_prev: JoinState, formData: FormData): Promise<JoinState> {
  if (honeypotTripped(formData)) redirect('/join/thanks-fan')

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()

  if (!name) return { error: 'Enter your name.' }
  if (!EMAIL_RE.test(email)) return { error: 'Enter a valid email address.' }

  const clientIp = headers().get('x-forwarded-for')?.split(',')[0]?.trim()
  const utm = pickCampaignParams(String(formData.get('qs') ?? ''))
  const source = channelFromUtm(utm)

  const gate = signupGate(process.env, requestHost())
  if (gate.mode === 'preview') {
    console.info(
      `[signup-preview] nothing saved env=${process.env.VERCEL_ENV ?? 'unset'} form=fan source=${source} utm=${Object.keys(utm).join('+') || '-'}`
    )
    return { preview: true }
  }
  if (gate.mode === 'misconfigured') {
    console.error(
      `[signup-config-missing] form=fan missing=${gate.missing.join(',') || '-'} invalid=${gate.invalid.join(',') || '-'}`
    )
    return { error: GENERIC_ERROR }
  }
  if (gate.envMismatch) {
    console.warn(`[signup-env-mismatch] env=${process.env.VERCEL_ENV ?? 'unset'} form=fan`)
  }

  let res: Response
  try {
    res = await fetch(gate.config.fanWaitlistUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(clientIp ? { 'X-Forwarded-For': clientIp } : {}),
      },
      body: JSON.stringify({ email, name, source, ...(Object.keys(utm).length ? { utm } : {}) }),
      cache: 'no-store',
      signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
    })
  } catch (err) {
    console.error('fan waitlist unreachable', String(err).slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  if (res.status === 422) return { error: 'Check your name and email, then try again.' }
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('fan waitlist failed', res.status, detail.slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  // Server-side twin of the thank-you page fbq trackCustom FanWaitlist, same eid, same name.
  const eid = `fan-${randomUUID()}`
  const capi = await sendCapiEvent({
    eventId: eid,
    eventName: 'FanWaitlist',
    email,
    sourceUrl: headers().get('referer') ?? 'https://songcry.app/join',
    fbclid: utm.fbclid,
    fbp: cookies().get('_fbp')?.value,
    clientIp,
    userAgent: headers().get('user-agent') ?? undefined,
  })
  if (!capi.startsWith('ok')) console.warn('fan capi', capi)

  redirect(`/join/thanks-fan?eid=${encodeURIComponent(eid)}`)
}
