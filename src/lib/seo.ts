import type { Metadata } from 'next'

import { getLanguageTag, getLocalizedPath, type SiteLang } from '@/lib/language'

const PRODUCTION_SITE_URL = 'https://withmeridian.org'

const normalizeSiteUrl = (value: string) => value.trim().replace(/\/+$/, '')

const resolveSiteUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl)
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (vercelProductionUrl) {
    return normalizeSiteUrl(`https://${vercelProductionUrl}`)
  }

  const vercelUrl = process.env.VERCEL_URL

  if (vercelUrl) {
    return normalizeSiteUrl(`https://${vercelUrl}`)
  }

  return PRODUCTION_SITE_URL
}

export const siteUrl = resolveSiteUrl()
export const siteName = 'Meridian'
export const siteTitle = 'AI Growth Agency for SaaS Companies | Meridian'
export const siteDescription =
  'Meridian is an AI-native growth agency for SaaS and AI companies, combining technical SEO, programmatic SEO, Reddit growth, GEO, and content systems to build durable demand.'
export const siteKeywords = [
  'ai growth agency',
  'saas seo agency',
  'technical seo services',
  'programmatic seo agency',
  'reddit marketing agency',
  'reddit growth services',
  'geo agency',
  'ai search optimization',
  'b2b saas seo',
  'organic growth agency'
]
export const socialProfiles = [
  'https://x.com/Yiwei_growth',
  'https://www.youtube.com/@Goglobal.to_SaaS',
  'https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726'
]

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString()

export const createLocalizedAlternates = (path: string, language: SiteLang = 'en'): Metadata['alternates'] => {
  const englishPath = path.replace(/^\/zh(?=\/|$)/, '') || '/'
  const chinesePath = englishPath === '/' ? '/zh' : `/zh${englishPath}`

  return {
    canonical: language === 'zh' ? chinesePath : englishPath,
    languages: {
      en: englishPath,
      'zh-CN': chinesePath,
      'x-default': englishPath
    }
  }
}

export const defaultOgImage = {
  url: absoluteUrl('/images/og-image.png'),
  width: 1200,
  height: 630,
  alt: 'Meridian AI growth agency'
}

export const buildMetadata = ({
  title,
  description,
  path,
  keywords,
  alternates,
  language = 'en'
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  alternates?: Metadata['alternates']
  language?: SiteLang
}): Metadata => ({
  title,
  description,
  keywords,
  alternates: alternates ?? {
    canonical: path
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName,
    locale: language === 'zh' ? 'zh_CN' : 'en_US',
    images: [defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultOgImage.url]
  }
})

export const createOrganizationSchema = () => ({
  '@type': 'ProfessionalService',
  '@id': absoluteUrl('/#organization'),
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl('/favicon/apple-touch-icon.png'),
  image: absoluteUrl('/images/og-image.png'),
  description: siteDescription,
  sameAs: socialProfiles,
  founder: {
    '@type': 'Person',
    name: 'Yiwei'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://cal.com/team/meridian-growth',
      availableLanguage: ['English', 'Chinese']
    }
  ],
  areaServed: 'Worldwide'
})

export const createWebsiteSchema = (language: SiteLang = 'en') => ({
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: getLanguageTag(language)
})

export const createWebPageSchema = ({
  path,
  title,
  description,
  language = 'en'
}: {
  path: string
  title: string
  description: string
  language?: SiteLang
}) => ({
  '@type': 'WebPage',
  '@id': absoluteUrl(`${path}#webpage`),
  name: title,
  description,
  url: absoluteUrl(path),
  isPartOf: {
    '@id': absoluteUrl('/#website')
  },
  inLanguage: getLanguageTag(language)
})

export const createBreadcrumbSchema = (
  items: Array<{
    name: string
    path: string
  }>,
  language: SiteLang = 'en'
) => ({
  '@type': 'BreadcrumbList',
  inLanguage: getLanguageTag(language),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(getLocalizedPath(item.path, language))
  }))
})

export const createFAQSchema = (
  items: Array<{
    question: string
    answer: string
  }>
) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
})
