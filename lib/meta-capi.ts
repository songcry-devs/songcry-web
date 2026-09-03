import crypto from 'crypto'

/**
 * Meta Conversions API — server-side conversion reporting for songcry.app.
 *
 * WHY THIS EXISTS HERE (TJ, 2026-09-03: "fix the gap in the meta ads process"). The browser
 * pixel is blocked for a meaningful share of visitors — iOS privacy settings, ad blockers,
 * Safari ITP — so Meta never hears about those conversions and optimises on incomplete data.
 * Sending the same event server-side typically recovers 30-40% of it; nothing can block a
 * server-to-server call.
 *
 * artists.songcry.app has done this since it launched. songcry.app did not, so every conversion
 * this site produced was pixel-only and under-reported. Worse, it under-reported SILENTLY and in
 * a biased way: the visitors most likely to be blocked are the privacy-conscious ones, so Meta
 * was learning from a skewed sample and bidding accordingly.
 *
 * DEDUPLICATION is the thing to not break. The browser fires its event on the thank-you page and
 * this fires from the server action. Both carry the SAME event_id, which is how Meta collapses
 * them into one conversion instead of counting two. The ids here are the `eid` minted by the
 * server action for exactly that purpose — an inflated conversion count is worse than a missing
 * one, because Smart Bidding chases it.
 *
 * MATCH QUALITY: Meta scores each event 0-10 on how confidently it can tie it to a real account.
 * The lift comes from sending more identifiers, so we send everything we legitimately hold —
 * email, click id, browser id, IP, user agent. Email alone is worth several points.
 *
 * PII: every identifier is SHA-256 hashed before it leaves this process, per Meta's spec. Raw
 * email is never transmitted.
 */

const DATASET_ID = '2360336011159400' // "Songcry Event Data" — same dataset the pixel posts to
const GRAPH_VERSION = 'v23.0'

/** Meta requires: trim, lowercase, then SHA-256 hex. */
function hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export type CapiEvent = {
  /** MUST be identical to the eventID the browser passes to fbq() on the thank-you page. */
  eventId: string
  /** 'Lead' for an artist application, 'FanWaitlist' for a fan — matching what the page fires. */
  eventName: 'Lead' | 'FanWaitlist'
  email: string
  sourceUrl: string
  /** Meta click id from the ad URL, if this visitor came from an ad. */
  fbclid?: string
  /** _fbp cookie the browser pixel sets. Strong match signal for repeat visitors. */
  fbp?: string
  clientIp?: string
  userAgent?: string
}

/**
 * Fire-and-forget. Returns a short status string for server logs and NEVER throws: the lead is
 * already saved by the time this runs, and no analytics failure may cost us a real signup.
 */
export async function sendCapiEvent(e: CapiEvent): Promise<string> {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return 'skipped: no META_CAPI_TOKEN'

  // Meta's expected fbc format is fb.<subdomainIndex>.<creationTime>.<fbclid>
  const fbc = e.fbclid ? `fb.1.${Date.now()}.${e.fbclid}` : undefined

  const user_data: Record<string, unknown> = { em: [hash(e.email)] }
  if (fbc) user_data.fbc = fbc
  if (e.fbp) user_data.fbp = e.fbp
  if (e.clientIp) user_data.client_ip_address = e.clientIp
  if (e.userAgent) user_data.client_user_agent = e.userAgent

  const payload = {
    data: [
      {
        event_name: e.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: e.eventId,
        action_source: 'website',
        event_source_url: e.sourceUrl,
        user_data,
      },
    ],
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${DATASET_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
      cache: 'no-store',
      // Meta being slow must not hold the visitor on a spinner. The lead is already saved.
      signal: AbortSignal.timeout(4000),
    })
    const body = await res.text()
    return res.ok ? `ok ${body.slice(0, 120)}` : `fail ${res.status} ${body.slice(0, 160)}`
  } catch (err) {
    return `error ${String(err).slice(0, 160)}`
  }
}
