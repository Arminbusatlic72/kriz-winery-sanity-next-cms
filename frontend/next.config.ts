import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

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
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
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
