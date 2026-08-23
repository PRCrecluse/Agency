import type { MetadataRoute } from 'next'

import { absoluteUrl, siteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    sitemap: absoluteUrl('/sitemap.xml'),
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/*?*',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password'
        ]
      }
    ]
  }
}
