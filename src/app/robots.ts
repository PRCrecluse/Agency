import type { MetadataRoute } from 'next'

import { absoluteUrl, isProductionDeployment, siteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    }
  }

  return {
    host: siteUrl,
    sitemap: absoluteUrl('/sitemap.xml'),
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/']
      }
    ]
  }
}
