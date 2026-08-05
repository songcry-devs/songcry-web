/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Backward-compat: Framer's live footer linked the misspelled path.
      {
        source: '/legal/community-guidlines',
        destination: '/legal/community-guidelines',
        statusCode: 301,
      },
      // Empty Framer stub routes → matching social channel (handle "songcrymusic").
      {
        source: '/tiktok',
        destination:
          'https://www.tiktok.com/@songcrymusic?_r=1&_t=ZP-93oAI22lOJz',
        statusCode: 301,
      },
      // NOTE: youtube/x handles inferred from the @songcrymusic IG/TikTok handle — confirm with TJ.
      {
        source: '/youtube',
        destination: 'https://www.youtube.com/@songcrymusic',
        statusCode: 301,
      },
      {
        source: '/x',
        destination: 'https://x.com/songcrymusic',
        statusCode: 301,
      },
      // CUTOVER PARITY (2026-08-04). These paths return 200 on the live Framer site and are
      // listed in its sitemap, so without them the migration would 404 URLs Google already
      // knows. /youtube/callback is a real Framer page (a nonsense path correctly 404s there,
      // this one does not) — nothing in songcry-be references it, so it is treated as a stub
      // and sent home rather than dropped. ⚠️ Confirm with Reggie before go-live in case an
      // external OAuth app has it registered as a redirect URI.
      {
        source: '/youtube/callback',
        destination: '/',
        statusCode: 302,
      },
      // Serves text/html on Framer, not an image — a dead route that is nonetheless indexed.
      {
        source: '/contents/mail-banner.png',
        destination: '/',
        statusCode: 301,
      },
    ]
  },
}

module.exports = nextConfig
