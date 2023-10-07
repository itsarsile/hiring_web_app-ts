/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'csvfiihajydzfkqwwhnu.supabase.co'
      }
    ]
  },
  env: {
    SUPABASE_URL: 'https://cprrapvuctesdfpzjoys.supabase.co',
    SUPABASE_API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwcnJhcHZ1Y3Rlc2RmcHpqb3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNTM0NTQsImV4cCI6MjAwNjYyOTQ1NH0.P6cPkKd9jbTine1Z1fbQIWTvBwmOIAl63GczdPCqKo8',
  }
}

module.exports = nextConfig
