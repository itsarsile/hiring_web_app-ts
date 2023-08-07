const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'csvfiihajydzfkqwwhnu.supabase.co',
      }
    ]
  },
}

module.exports = nextConfig
