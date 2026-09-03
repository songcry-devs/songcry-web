import { NextRequest, NextResponse } from 'next/server'

/**
 * Click tracking for every link we send — songcry.app/r/<code>.
 *
 * TJ, 2026-09-03: "can we put download links in our emails and dm's now and track if someone
 * actually used it and downloaded the app?" The funnel had a hole between "we sent it" and "they
 * filled the form". A link straight to the App Store produced no observable event at all, and a
 * link to our own site only became visible if the person filled the form — so someone who
 * clicked, read and left looked exactly like someone who never opened the message.
 *
 * Codes are minted by songcry-outreach/bin/links.py, which stores the destination already
 * utm/ct tagged. This route logs the click and forwards.
 *
 * THREE RULES THIS FILE EXISTS TO HOLD:
 *
 * 1. THE REDIRECT ALWAYS HAPPENS. An artist clicked a link in a message from us; a logging
 *    failure, a missing env var or a database outage must never strand them on an error page.
 *    Every failure path falls through to FALLBACK. Tracking is the secondary job here.
 *
 * 2. THE KEY IS NEVER IN SOURCE. This repository is public. The Supabase service key comes from
 *    the environment; if it is absent the route still redirects, silently, and simply records
 *    nothing.
 *
 * 3. BOTS ARE MARKED, NOT DROPPED. X, Meta, Slack, iMessage and every email security scanner
 *    fetch a link the moment it is sent, before a human sees it. Unflagged they would roughly
 *    double every click count and make an unopened DM look read. They are written with
 *    is_bot = true so the count can exclude them and the raw record still exists.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Where a click goes when we cannot resolve it. Never an error page. */
const FALLBACK = 'https://artists.songcry.app'

const SUPABASE_URL = 'https://rfhoabrrptakkoygrrgw.supabase.co'

/**
 * Anything that fetches a URL without a person behind it. Deliberately broad: a false "bot" costs
 * one click in a report, while a false "human" corrupts the reply-rate number we make send-volume
 * decisions on. Ordered roughly by how often we expect to see them.
 */
const BOT_PATTERNS = [
  'bot', 'crawler', 'spider', 'preview', 'scanner', 'fetcher', 'monitor',
  'twitterbot', 'facebookexternalhit', 'slackbot', 'linkedinbot', 'discordbot',
  'telegrambot', 'whatsapp', 'skypeuripreview', 'applebot', 'bingpreview',
  'proofpoint', 'mimecast', 'barracuda', 'symantec', 'messagelabs', 'safelinks',
  'go-http-client', 'python-requests', 'curl/', 'wget', 'axios', 'okhttp',
  'headlesschrome', 'phantomjs', 'lighthouse', 'pingdom', 'uptime',
]

function looksLikeBot(userAgent: string | null, method: string): boolean {
  // A HEAD request is a scanner checking the link resolves; a person's browser sends GET.
  if (method === 'HEAD') return true
  if (!userAgent) return true // no UA at all is not a browser
  const ua = userAgent.toLowerCase()
  return BOT_PATTERNS.some((p) => ua.includes(p))
}

/**
 * First two octets of an IPv4 / first two groups of an IPv6.
 *
 * We already know WHO from the code, so a full address would be personal data collected for no
 * purpose. The prefix is only ever used to notice a burst of clicks from one network, which is
 * how a scanner farm shows up when its user-agent is honest enough to look like a browser.
 */
function ipPrefix(ip: string | null): string | null {
  if (!ip) return null
  const first = ip.split(',')[0].trim()
  if (first.includes(':')) return first.split(':').slice(0, 2).join(':') + '::'
  const parts = first.split('.')
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.0.0` : null
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const key = process.env.SUPABASE_SERVICE_KEY

  // Deliberately WIDER than the alphabet links.py mints random codes from, for two reasons:
  // vanity codes for human-readable surfaces use the full alphabet and can be as short as two
  // characters ("ig"), and a code minted under an older alphabet must keep resolving forever.
  // Rejecting anything outside this still keeps junk and probe traffic out of the database.
  if (!/^[a-z0-9-]{2,24}$/.test(code) || !key) {
    return NextResponse.redirect(FALLBACK, 302)
  }

  let destination = FALLBACK
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/outbound_links?select=destination&code=eq.${encodeURIComponent(code)}`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store',
        signal: AbortSignal.timeout(2500),
      }
    )
    if (res.ok) {
      const rows = (await res.json()) as Array<{ destination?: string }>
      const d = rows?.[0]?.destination
      // Only ever forward to https. A stored value that is not one means the row was tampered
      // with or mis-minted, and an open redirect on our brand domain is a phishing gift.
      if (d && d.startsWith('https://')) destination = d
    }
  } catch {
    // Timeout or outage — fall through to FALLBACK. Rule 1.
  }

  // Awaited, not fire-and-forget: a serverless function can be frozen the instant it responds, so
  // a detached promise here would drop clicks unpredictably. ~50ms against a 2.5s ceiling is a
  // price worth paying for a number we make spend decisions on.
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/link_clicks`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        code,
        user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
        referer: req.headers.get('referer')?.slice(0, 500) ?? null,
        ip_prefix: ipPrefix(req.headers.get('x-forwarded-for')),
        is_bot: looksLikeBot(req.headers.get('user-agent'), req.method),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    })
  } catch {
    // Never let a logging failure cost us the click. Rule 1.
  }

  return NextResponse.redirect(destination, 302)
}

// Link scanners overwhelmingly use HEAD. Handling it explicitly means they resolve correctly and
// get recorded as bots, instead of 405-ing and making a real link look broken to the platform
// generating the preview.
export const HEAD = GET
