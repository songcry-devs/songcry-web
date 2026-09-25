import type { NextRequest } from 'next/server'
import { getAppTarget } from '@/lib/store-links'

/**
 * The device-aware "get the app" link for songcry.app (2026-09-25). Every single download
 * control on this site points here:
 *   iPhone and iPad (mobile Safari UA)  App Store, carrying the link's own ct
 *   Android                             Google Play, utm_* as the install referrer
 *   anything else                       /#get-the-app, the home band with both badges
 * The routing decision lives in lib/store-links.ts, where it is unit tested.
 * 302 plus no-store, so a cached answer for one device never serves another.
 */
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const target = getAppTarget({
    userAgent: request.headers.get('user-agent') ?? '',
    search: request.nextUrl.search,
    pt: process.env.NEXT_PUBLIC_APPLE_PROVIDER_TOKEN,
  })
  return new Response(null, {
    status: 302,
    headers: { Location: new URL(target, request.url).toString(), 'Cache-Control': 'no-store' },
  })
}

// Link scanners use HEAD. Answer it the same way instead of 405-ing.
export const HEAD = GET
