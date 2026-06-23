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
    ]
  },
}

module.exports = nextConfig
