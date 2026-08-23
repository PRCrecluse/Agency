import type { MetadataRoute } from 'next'

import { serviceSlugs } from '@/content/services'
import { getPosts } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const routes = [
    '' /* This is equivalent to / */,
    '/blog',
    '/services',
    '/services/seo-services/on-page-seo',
    '/services/seo-services/technical-seo',
    '/services/seo-services/programmatic-seo',
    '/services/seo-services/link-building',
    '/services/seo-services/keyword-research',
    '/services/reddit-services/community-management',
    '/services/reddit-services/reddit-campaigns',
    '/terms-conditions',
    '/privacy-policy',
    ...serviceSlugs.map(slug => `/services/${slug}`),
    ...posts.map(post => `/blog/${post.slug}`)
  ]

  return routes.map(route => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${route}`
  }))
}
