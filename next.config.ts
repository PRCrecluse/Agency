import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
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
