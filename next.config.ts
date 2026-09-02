import type { NextConfig } from 'next'

const noindexHeaders = [
  {
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow'
  }
]

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async headers() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig['headers']>>> = [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<vercelHost>.*\\.vercel\\.app)'
          }
        ],
        headers: noindexHeaders
      }
    ]

    if (process.env.VERCEL_ENV !== 'production') {
      rules.push({
        source: '/:path*',
        headers: noindexHeaders
      })
    }

    return rules
  },
  async redirects() {
    return [
      {
        source: '/services/reddit-services/measurement',
        destination: '/services/reddit-services#add-ons-and-payment',
        permanent: true
      },
      {
        source: '/zh/services/reddit-services/measurement',
        destination: '/zh/services/reddit-services#add-ons-and-payment',
        permanent: true
      }
    ]
  }
}

export default nextConfig
