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
    {
      url: absoluteUrl('/about')
    },
    ...localizedEntries('/blog'),
    ...localizedEntries('/services'),
    ...localizedEntries('/services/reddit-services'),
    ...localizedEntries('/utm-builder'),
    ...specializedServicePaths.flatMap(path => localizedEntries(path)),
    {
      url: absoluteUrl('/seo-prompts')
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
