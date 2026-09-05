import type { SiteLang } from '@/lib/language'

export type ServiceNavigationItem = {
  path: string
  title: Record<SiteLang, string>
  description: Record<SiteLang, string>
}

export type ServiceNavigationFamily = ServiceNavigationItem & {
  children: ServiceNavigationItem[]
}

export const serviceNavigationTree: ServiceNavigationFamily[] = [
  {
    path: '/services/seo-services',
    title: { en: 'SEO Services', zh: 'SEO 服务' },
    description: {
      en: 'Build search visibility through focused page, technical, scalable-content, authority, and keyword programs.',
      zh: '通过页面优化、技术治理、规模化内容、权威建设与关键词规划提升搜索可见度。'
    },
    children: [
      {
        path: '/services/seo-services/on-page-seo',
        title: { en: 'On-page SEO', zh: '页面 SEO' },
        description: {
          en: 'Improve page targeting, content signals, and internal linking for priority URLs.',
          zh: '优化重点页面的搜索意图、内容信号与内部链接。'
        }
      },
      {
        path: '/services/seo-services/technical-seo',
        title: { en: 'Technical SEO', zh: '技术 SEO' },
        description: {
          en: 'Resolve crawl, indexing, rendering, performance, and site architecture issues.',
          zh: '解决抓取、索引、渲染、性能与网站架构问题。'
        }
      },
      {
        path: '/services/seo-services/programmatic-seo',
        title: { en: 'Programmatic SEO', zh: '程序化 SEO' },
        description: {
          en: 'Scale high-intent landing pages with structured, reusable templates.',
          zh: '通过结构化、可复用模板规模化建设高意图落地页。'
        }
      },
      {
        path: '/services/seo-services/link-building',
        title: { en: 'Link Building', zh: '外链建设' },
        description: {
          en: 'Earn relevant authority through editorial outreach, digital PR, and linkable assets.',
          zh: '通过内容外联、数字公关与可链接资产积累相关权威。'
        }
      },
      {
        path: '/services/seo-services/keyword-research',
        title: { en: 'Keyword Research', zh: '关键词研究' },
        description: {
          en: 'Map search intent, topic clusters, and priority keywords to the right pages.',
          zh: '将搜索意图、主题集群与重点关键词匹配到正确页面。'
        }
      }
    ]
  },
  {
    path: '/services/reddit-services',
    title: { en: 'Reddit Services', zh: 'Reddit 服务' },
    description: {
      en: 'Build trust and demand through Reddit-native community participation and campaign execution.',
      zh: '通过符合 Reddit 社区语境的参与和 Campaign 执行建立信任与需求。'
    },
    children: [
      {
        path: '/services/reddit-services/community-management',
        title: { en: 'Reddit Community Management', zh: 'Reddit 社区运营' },
        description: {
          en: 'Build trust, manage discussions, and grow brand presence in relevant subreddits.',
          zh: '在相关 subreddit 中建立信任、管理讨论并扩大品牌影响。'
        }
      },
      {
        path: '/services/reddit-services/reddit-campaigns',
        title: { en: 'Reddit Campaigns', zh: 'Reddit Campaigns' },
        description: {
          en: 'Launch targeted Reddit campaigns to drive awareness, traffic, and conversions.',
          zh: '通过精准的 Reddit Campaigns 提升认知、流量与转化。'
        }
      }
    ]
  },
  {
    path: '/services/geo-services',
    title: { en: 'GEO Services', zh: 'GEO 服务' },
    description: {
      en: 'Improve how your brand is recognized, retrieved, cited, and recommended in AI-generated answers.',
      zh: '提升品牌在 AI 生成答案中被识别、检索、引用与推荐的机会。'
    },
    children: []
  }
]

const normalizeServicePath = (path: string) => path.replace(/^\/zh(?=\/|$)/, '').replace(/\/$/, '') || '/'

export const getServiceFamily = (path: string) => {
  const normalizedPath = normalizeServicePath(path)

  return serviceNavigationTree.find(
    family => family.path === normalizedPath || family.children.some(child => child.path === normalizedPath)
  )
}

export const getServiceBreadcrumbItems = (path: string, lang: SiteLang) => {
  const normalizedPath = normalizeServicePath(path)
  const family = getServiceFamily(normalizedPath)

  if (!family) return []

  const items = [
    { name: lang === 'zh' ? '服务' : 'Services', path: '/services' },
    { name: family.title[lang], path: family.path }
  ]

  const child = family.children.find(item => item.path === normalizedPath)

  if (child) items.push({ name: child.title[lang], path: child.path })

  return items
}

export const getRelatedServiceItems = (path: string) => {
  const normalizedPath = normalizeServicePath(path)
  const family = getServiceFamily(normalizedPath)

  if (!family) return null

  return {
    family,
    isFamilyPage: family.path === normalizedPath,
    items:
      family.path === normalizedPath ? family.children : family.children.filter(child => child.path !== normalizedPath)
  }
}
