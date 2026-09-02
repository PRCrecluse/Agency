import type { MetadataRoute } from 'next'

import { aboutStories } from '@/content/about-stories'
import { serviceSectionParams, serviceSlugs } from '@/content/services'
import { getPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/seo'

const specializedServicePaths = [
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
  const now = new Date()

  const postLastModified = (post: (typeof posts)[number]) =>
    post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : now

  const localizedEntries = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'weekly') => {
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
      lastModified: now,
      changeFrequency,
      priority,
      alternates
    }))
  }

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
<<<<<<< HEAD
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: absoluteUrl('/blog'),
          'zh-CN': absoluteUrl('/zh/blog'),
          'x-default': absoluteUrl('/blog')
        }
      }
    },
    {
      url: absoluteUrl('/zh/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: absoluteUrl('/blog'),
          'zh-CN': absoluteUrl('/zh/blog'),
          'x-default': absoluteUrl('/blog')
        }
      }
    },
    {
      url: absoluteUrl('/services'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: absoluteUrl('/seo-prompts'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/products/goglobal'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    localizedServiceEntry('/zh/services', 0.9),
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
=======
    ...localizedEntries('/blog', 0.8),
    ...localizedEntries('/services', 0.9),
    ...localizedEntries('/services/reddit-services', 0.8),
    ...localizedEntries('/utm-builder', 0.6, 'monthly'),
    ...specializedServicePaths.flatMap(path => localizedEntries(path, 0.8)),
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
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
    ...aboutStories.map(story => ({
      url: absoluteUrl(`/about/stories/${story.slug}`),
      lastModified: new Date(story.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    })),
    ...posts.map(post => {
      const englishPath = `/blog/${post.slug}`
      const chinesePath = `/zh/blog/${post.slug}`

      return {
        url: absoluteUrl(englishPath),
        lastModified: postLastModified(post),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
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
      changeFrequency: 'monthly' as const,
      priority: 0.7,
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
