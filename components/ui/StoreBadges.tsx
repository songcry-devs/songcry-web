'use client'

import Image from 'next/image'
import { UTM_KEYS, outboundParams } from '@/lib/attribution'
import { appStoreUrl, playStoreUrl, webCt } from '@/lib/store-links'
import { trackStoreClick } from '@/lib/track'
import { useCampaignQs } from '@/lib/use-campaign-qs'

/**
 * Both official store badges, each tracked and tagged. Used wherever the layout shows badges.
 * Single "get the app" buttons use GetAppLink instead.
 *
 * The badge image is the accessible name (its alt is the badge text), so the name matches
 * what a sighted reader sees (WCAG 2.5.3).
 *
 * The Google Play art is Google official PNG, 646x250 with 41px of transparent padding. It is
 * shown at 80px tall inside a 181x54 window, so the visible badge matches the App Store badge.
 * 181, not 180: the visible art scales to 193.86px of the 207px render, and a 180px window
 * clipped 0.9px off Google's right border.
 *
 * NOTE: the style string below must stay free of apostrophes, quotes, ampersands and angle
 * brackets, comments included. See scripts/check-style-literals.mjs.
 */
export default function StoreBadges({ placement, className }: { placement: string; className?: string }) {
  const qs = useCampaignQs()
  return (
    <div className={className ? `store-badges ${className}` : 'store-badges'}>
      <a
        className="store-badge"
        href={appStoreUrl(webCt(placement))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick('app-store', placement)}
      >
        <Image src="/framer/appstore-badge.svg" alt="Download on the App Store" width={162} height={54} style={{ display: 'block' }} />
      </a>
      <a
        className="store-badge"
        href={playStoreUrl(outboundParams(placement, qs, UTM_KEYS))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick('google-play', placement)}
      >
        <span className="store-badge-play">
          <Image
            src="/badges/google-play-badge.png"
            alt="Get it on Google Play"
            width={207}
            height={80}
            unoptimized
          />
        </span>
      </a>

      <style>{`
        .store-badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
        }
        .store-badge {
          display: inline-block;
          line-height: 0;
          transition: opacity 180ms ease;
        }
        .store-badge:hover {
          opacity: 0.88;
        }
        .store-badge-play {
          display: block;
          width: 181px;
          height: 54px;
          overflow: hidden;
        }
        .store-badge-play img {
          display: block;
          width: 207px;
          height: 80px;
          max-width: none;
          margin: -13px 0 0 -13px;
        }
      `}</style>
    </div>
  )
}
