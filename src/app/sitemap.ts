import type { MetadataRoute } from 'next'

import { aboutStories } from '@/content/about-stories'
import { serviceSlugs } from '@/content/services'
import { getPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const now = new Date()

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: absoluteUrl('/services/reddit-services'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/seo-services/on-page-seo'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/seo-services/technical-seo'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/seo-services/programmatic-seo'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/seo-services/link-building'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/seo-services/keyword-research'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/reddit-services/community-management'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/services/reddit-services/reddit-campaigns'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/terms-conditions'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    ...serviceSlugs.map(slug => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    })),
    ...aboutStories.map(story => ({
      url: absoluteUrl(`/about/stories/${story.slug}`),
      lastModified: new Date(story.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    })),
    ...posts.map(post => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  ]
}
