import type { MetadataRoute } from 'next'

import { aboutStories } from '@/content/about-stories'
import { geoMethodologyPath } from '@/content/geo-methodology'
import { serviceSectionParams, serviceSlugs } from '@/content/services'
import { getPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/seo'

const specializedServicePaths = [
  geoMethodologyPath,
  '/services/seo-services/on-page-seo',
  '/services/seo-services/technical-seo',
  '/services/seo-services/programmatic-seo',
  '/services/seo-services/link-building',
  '/services/seo-services/keyword-research',
  '/services/reddit-services/community-management',
  '/services/reddit-services/reddit-campaigns'
]

const specializedServicePathSet = new Set(specializedServicePaths)

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const zhPosts = await getPosts(undefined, 'zh')
  const englishPostSlugs = new Set(posts.map(post => post.slug))
  const zhPostSlugs = new Set(zhPosts.map(post => post.slug))

  const postLastModified = (post: (typeof posts)[number]) =>
    post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : undefined

  const localizedEntries = (path: string) => {
    const englishPath = path.replace(/^\/zh(?=\/|$)/, '')
    const chinesePath = `/zh${englishPath}`

    const alternates = {
      languages: {
        en: absoluteUrl(englishPath),
        'zh-CN': absoluteUrl(chinesePath),
        'x-default': absoluteUrl(englishPath)
      }
    }

    return [englishPath, chinesePath].map(localizedPath => ({
      url: absoluteUrl(localizedPath),
      alternates
    }))
  }

  return [
    {
      url: absoluteUrl('/')
    },
<<<<<<< HEAD
    ...localizedEntries('/about', 0.8, 'monthly'),
    ...localizedEntries('/blog', 0.8),
    ...localizedEntries('/services', 0.9),
    ...localizedEntries('/services/reddit-services', 0.8),
    ...localizedEntries('/utm-builder', 0.6, 'monthly'),
    ...localizedEntries('/tools', 0.8, 'monthly'),
    ...specializedServicePaths.flatMap(path => localizedEntries(path, 0.8)),
    ...['/seo-prompts', '/community', '/twitter-monitor'].map(pagePath => ({
      url: absoluteUrl(pagePath),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })),
    {
      url: absoluteUrl('/seo-course'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
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
    ...serviceSlugs.flatMap(slug => localizedEntries(`/services/${slug}`, 0.7)),
    ...serviceSectionParams
      .filter(({ slug, sectionSlug }) => !specializedServicePathSet.has(`/services/${slug}/${sectionSlug}`))
      .flatMap(({ slug, sectionSlug }) => localizedEntries(`/services/${slug}/${sectionSlug}`, 0.7)),
    ...aboutStories.flatMap(story =>
      localizedEntries(`/about/stories/${story.slug}`, 0.6, 'monthly').map(entry => ({
        ...entry,
        lastModified: new Date(story.date)
      }))
    ),
=======
    {
      url: absoluteUrl('/about')
    },
    ...localizedEntries('/blog'),
    ...localizedEntries('/services'),
    ...localizedEntries('/services/reddit-services'),
    ...localizedEntries('/utm-builder'),
    ...specializedServicePaths.flatMap(path => localizedEntries(path)),
    {
      url: absoluteUrl('/zh/seo-prompts')
    },
    {
      url: absoluteUrl('/products/goglobal')
    },
    {
      url: absoluteUrl('/terms-conditions')
    },
    {
      url: absoluteUrl('/privacy-policy')
    },
    ...serviceSlugs.flatMap(slug => localizedEntries(`/services/${slug}`)),
    ...serviceSectionParams
      .filter(({ slug, sectionSlug }) => !specializedServicePathSet.has(`/services/${slug}/${sectionSlug}`))
      .flatMap(({ slug, sectionSlug }) => localizedEntries(`/services/${slug}/${sectionSlug}`)),
    ...aboutStories.map(story => ({
      url: absoluteUrl(`/about/stories/${story.slug}`),
      lastModified: new Date(story.date)
    })),
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
    ...posts.map(post => {
      const englishPath = `/blog/${post.slug}`
      const chinesePath = `/zh/blog/${post.slug}`

      return {
        url: absoluteUrl(englishPath),
        lastModified: postLastModified(post),
        alternates: zhPostSlugs.has(post.slug)
          ? {
              languages: {
                en: absoluteUrl(englishPath),
                'zh-CN': absoluteUrl(chinesePath),
                'x-default': absoluteUrl(englishPath)
              }
            }
          : undefined
      }
    }),
    ...zhPosts.map(post => ({
      url: absoluteUrl(`/zh/blog/${post.slug}`),
      lastModified: postLastModified(post),
      alternates: englishPostSlugs.has(post.slug)
        ? {
            languages: {
              en: absoluteUrl(`/blog/${post.slug}`),
              'zh-CN': absoluteUrl(`/zh/blog/${post.slug}`),
              'x-default': absoluteUrl(`/blog/${post.slug}`)
            }
          }
        : undefined
    }))
  ]
}
