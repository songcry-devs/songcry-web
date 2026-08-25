'use server'

import { randomUUID } from 'crypto'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const IG_RE = /^[A-Za-z0-9._]{1,30}$/

const GENERIC_ERROR = 'Something went wrong on our end. Please try again.'

// TJ 2026-08-24: the artist thank-you IS the artists-site thank-you — one approved
// page, one conversion surface (its Meta pixel Lead + Google Ads label are already
// live there, keyed to the same `lead-` eid this action mints; a direct visit with
// no eid fires nothing). songcry-web keeps only the fan thank-you.
const ARTIST_THANKS = 'https://artists.songcry.app/thanks'

export type JoinState = { error?: string }

/**
 * Which page the visitor submitted from. Derived from the Referer rather than
 * hardcoded — the artists.songcry.app waitlist learned this the hard way when
 * its form spread to 39 pages and every lead claimed to come from the homepage.
 *
 * Values carry a "web:" prefix so rows from THIS site (songcry.app) stay
 * distinguishable from artists.songcry.app rows ("root-landing",
 * "hiphop/losangeles", ...) in the shared `access_requests` table. Falls back
 * to "web:join" (the only page the form ships on today) when the Referer is
 * missing or foreign — a lead is never rejected over provenance.
 */
function sourcePageFromReferer(referer: string | null): string {
  const fallback = 'web:join'
  if (!referer) return fallback
  try {
    const u = new URL(referer)
    // Production domain or a Vercel preview of this project.
    if (!u.hostname.endsWith('songcry.app') && !u.hostname.endsWith('.vercel.app')) {
      return fallback
    }
    const path = u.pathname.replace(/^\/+|\/+$/g, '')
    return path === '' ? 'web:root' : `web:${path}`
  } catch {
    return fallback
  }
}

/**
 * Attribution: known campaign params from the landing-page query string
 * (captured client-side into a hidden `qs` field), same pattern and key list
 * as the artists.songcry.app waitlist so the jsonb `utm` column stays uniform.
 */
function utmFromQs(qs: string): Record<string, string> {
  const params = new URLSearchParams(qs)
  const utm: Record<string, string> = {}
  for (const k of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
  ]) {
    const v = params.get(k)
    if (v) utm[k] = v
  }
  return utm
}

/** Bots fill every field, including the visually hidden one. */
function honeypotTripped(formData: FormData): boolean {
  return String(formData.get('website') ?? '').trim() !== ''
}

/**
 * Artist submit. Validates, inserts one row into the Supabase `access_requests`
 * table (same table, project, and key as the artists.songcry.app waitlist),
 * then redirects to the artist thank-you page with a fresh event id so the
 * conversion pixels fire exactly once per real lead — a direct visit to the
 * thanks page fires nothing.
 */
export async function submitArtist(
  _prev: JoinState,
  formData: FormData
): Promise<JoinState> {
  // Honeypot: silently pretend success. No eid in the redirect, so the thanks
  // page renders but no conversion event fires for bot traffic.
  if (honeypotTripped(formData)) redirect(ARTIST_THANKS)

  const artistName = String(formData.get('artist_name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const instagram = String(formData.get('instagram') ?? '')
    .trim()
    .replace(/^@+/, '')

  if (!artistName) {
    return { error: 'Enter your artist or band name.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Enter a valid email address.' }
  }
  if (instagram && !IG_RE.test(instagram)) {
    return {
      error: 'Enter a valid Instagram handle: letters, numbers, . or _ only.',
    }
  }

  const utm = utmFromQs(String(formData.get('qs') ?? ''))

  // Supabase outreach project + publishable "anon" key. The anon key is public
  // by design and restricted to INSERT-only on `access_requests` via RLS (it
  // cannot read the table), so it is safe in source. Inlined rather than read
  // from env to avoid a mispasted Vercel value silently breaking submissions.
  // The key JWT is signed for this exact project ref — URL and key must match.
  const url = 'https://rfhoabrrptakkoygrrgw.supabase.co'
  const key =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmaG9hYnJycHRha2tveWdycmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NTM1NTksImV4cCI6MjEwMDMyOTU1OX0.tB4Q0G9lKlmv4k3nHBFkqy4NNxfAFYOyPHenAsJ3d2k'

  let res: Response
  try {
    res = await fetch(`${url}/rest/v1/access_requests`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email,
        artist_name: artistName,
        ...(instagram ? { instagram } : {}),
        source_page: sourcePageFromReferer(headers().get('referer')),
        ...(Object.keys(utm).length ? { utm } : {}),
      }),
      cache: 'no-store',
    })
  } catch (err) {
    console.error('artist insert unreachable', String(err).slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  if (!res.ok) {
    // Server log only — helps diagnose via Vercel runtime logs, not shown to user.
    const detail = await res.text().catch(() => '')
    console.error('artist insert failed', res.status, detail.slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  redirect(`${ARTIST_THANKS}?eid=${encodeURIComponent(`lead-${randomUUID()}`)}`)
}

/**
 * Fan submit. POSTs to the public fan-waitlist endpoint on the Songcry backend
 * (no auth — intentionally), then redirects to the fan thank-you page.
 *
 * Endpoint semantics (CRITICAL):
 * - Success is HTTP 204 with NO body. Never call res.json().
 * - Duplicate emails also return 204 — that is fine, the person is on the list.
 * - 422 is a validation rejection — shown inline.
 * - X-Forwarded-For is set to the real client IP (first entry of the incoming
 *   chain) so the backend records the visitor, not Vercel's egress IP.
 */
export async function submitFan(
  _prev: JoinState,
  formData: FormData
): Promise<JoinState> {
  if (honeypotTripped(formData)) redirect('/join/thanks-fan')

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()

  if (!name) {
    return { error: 'Enter your name.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Enter a valid email address.' }
  }

  // x-forwarded-for is a comma-separated chain; the client is the first entry.
  const clientIp = headers().get('x-forwarded-for')?.split(',')[0]?.trim()

  let res: Response
  try {
    res = await fetch('https://api.songcry.app/api/v1/fan-waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(clientIp ? { 'X-Forwarded-For': clientIp } : {}),
      },
      body: JSON.stringify({ email, name }),
      cache: 'no-store',
    })
  } catch (err) {
    console.error('fan waitlist unreachable', String(err).slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  if (res.status === 422) {
    return { error: 'Check your name and email, then try again.' }
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('fan waitlist failed', res.status, detail.slice(0, 200))
    return { error: GENERIC_ERROR }
  }

  // 204 — success (or a duplicate, which is just as good). No body to read.
  redirect(`/join/thanks-fan?eid=${encodeURIComponent(`fan-${randomUUID()}`)}`)
}
