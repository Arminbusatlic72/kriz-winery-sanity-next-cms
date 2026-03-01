import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'node:path'

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://cdn.sanity.io https://*.tile.openstreetmap.org;
  connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://vitals.vercel-insights.com;
  font-src 'self' data:;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`.replace(/\n/g, '')

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
        ],
      },
    ]
  },
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
// export default nextConfig
