import type { MetadataRoute } from 'next'

import { serviceSlugs } from '@/content/services'
import { getPosts } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const routes = [
    '' /* This is equivalent to / */,
    '/blog',
    '/services',
    '/terms-conditions',
    '/privacy-policy',
    ...serviceSlugs.map(slug => `/services/${slug}`),
    ...posts.map(post => `/blog/${post.slug}`)
  ]

  return routes.map(route => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${route}`
  }))
}
