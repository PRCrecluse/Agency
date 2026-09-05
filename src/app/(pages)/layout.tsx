import { Suspense, type ReactNode } from 'react'

import {
  LayoutDashboardIcon,
  TelescopeIcon,
  ChartScatterIcon,
  ChartPieIcon,
  GitPullRequestIcon,
  SparklesIcon,
  LinkIcon,
  SearchCheckIcon,
  FileSearchIcon,
  MegaphoneIcon,
  MessagesSquareIcon,
  WrenchIcon,
  AtSignIcon
} from 'lucide-react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingContact from '@/components/layout/floating-contact'
import { geoServices } from '@/content/geo-services'
import { geoMethodologyPath } from '@/content/geo-methodology'
import type { Navigation } from '@/components/layout/header-navigation'
import { getTranslatedPostSlugs } from '@/lib/posts'
<<<<<<< HEAD
import type { SiteLang } from '@/lib/language'
=======
import { getRequestLanguage } from '@/lib/request-language'
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7

const getNavigationData = (lang: SiteLang): Navigation[] => [
  {
    title: lang === 'zh' ? '服务' : 'Services',
    contentClassName: 'w-full grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_minmax(20rem,0.9fr)] gap-x-10 xl:gap-x-14',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: lang === 'zh' ? 'SEO 服务' : 'SEO services',
        items: [
          {
            title: lang === 'zh' ? 'SEO 服务' : 'SEO Services',
            href: '/services/seo-services',
            description:
              lang === 'zh'
                ? '系统规划页面 SEO、技术 SEO 与程序化 SEO。'
                : 'Plan on-page, technical, and programmatic SEO inside one structured service page.',
            icon: <LayoutDashboardIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '页面 SEO' : 'On-page SEO',
            href: '/services/seo-services/on-page-seo',
            description:
              lang === 'zh'
                ? '优化重点页面的关键词定位、内容信号与内部链接。'
                : 'Improve page targeting, content signals, and internal linking for important URLs.',
            icon: <LayoutDashboardIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '技术 SEO' : 'Technical SEO',
            href: '/services/seo-services/technical-seo',
            description:
              lang === 'zh'
                ? '解决网站抓取、索引、性能与架构问题。'
                : 'Resolve crawl, indexing, performance, and site architecture issues.',
            icon: <TelescopeIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '程序化 SEO' : 'Programmatic SEO',
            href: '/services/seo-services/programmatic-seo',
            description:
              lang === 'zh'
                ? '通过结构化、可复用的模板，规模化建设高意向落地页。'
                : 'Scale high-intent landing pages with structured, reusable templates.',
            icon: <ChartScatterIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '外链建设' : 'Link Building',
            href: '/services/seo-services/link-building',
            description:
              lang === 'zh'
                ? '通过媒体合作、数字公关与优质内容，积累相关领域的权威外链。'
                : 'Earn relevant authority through editorial outreach, digital PR, and linkable assets.',
            icon: <LinkIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '关键词研究' : 'Keyword Research',
            href: '/services/seo-services/keyword-research',
            description:
              lang === 'zh'
                ? '将搜索意图、主题集群与重点关键词匹配到合适的页面。'
                : 'Map search intent, topic clusters, and priority keywords to the right pages.',
            icon: <SearchCheckIcon className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: lang === 'zh' ? 'Reddit 服务' : 'Reddit services',
        items: [
          {
            title: lang === 'zh' ? 'Reddit 服务概览' : 'Reddit Services Overview',
            href: '/services/reddit-services#service-overview',
            description:
              lang === 'zh'
                ? '了解评论、榜单帖、独立帖子、品牌社群及全托管服务。'
                : 'Compare comments, list posts, dedicated posts, brand communities, and full-service packages.',
            icon: <ChartPieIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? 'Reddit 社群管理' : 'Reddit Community Management',
            href: '/services/reddit-services/community-management',
            description:
              lang === 'zh'
                ? '在相关 subreddit 中建立信任、管理讨论并提升品牌影响力。'
                : 'Build trust, manage discussions, and grow brand presence in relevant subreddits.',
            icon: <ChartPieIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? 'Reddit 营销活动' : 'Reddit Campaigns',
            href: '/services/reddit-services/reddit-campaigns',
            description:
              lang === 'zh'
                ? '通过有针对性的 Reddit 活动，提升品牌认知、流量与转化。'
                : 'Launch targeted Reddit campaigns to drive awareness, traffic, and conversions.',
            icon: <GitPullRequestIcon className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: lang === 'zh' ? 'GEO 服务' : 'GEO services',
        items: [
          {
            title: lang === 'zh' ? '生成式引擎优化' : 'Generative Engine Optimization',
            href: '/services/geo-services',
            description:
              lang === 'zh'
                ? '提升品牌在 AI 生成答案与推荐中的曝光机会。'
                : 'Position your brand to appear more often in AI-generated answers and discovery flows.',
            icon: <SparklesIcon className='size-4' />
          },
          {
            title: lang === 'zh' ? '我们如何做 GEO' : 'Our GEO Method',
            href: geoMethodologyPath,
            description: lang === 'zh' ? '了解研究、证据、内容、发布与监测如何衔接。' : 'Our process for research, evidence, content, publishing, and measurement.',
            icon: <FileSearchIcon className='size-4' />
          },
          ...geoServices.map((service, index) => ({
            title: service.title[lang],
            href: `/services/geo-services/${service.slug}`,
            description: service.description[lang],
            icon: index === 0
              ? <SearchCheckIcon className='size-4' />
              : index === 1
                ? <FileSearchIcon className='size-4' />
                : <ChartScatterIcon className='size-4' />
          }))
        ]
      }
    ]
  },
  {
    title: lang === 'zh' ? '产品' : 'Products',
    dropdownClassName: 'w-[min(30rem,calc(100vw-2rem))]',
    items: [
      {
        title: 'GoGlobal.to',
        href: 'https://www.goglobal.to',
        description: lang === 'zh' ? 'Reddit 营销 SaaS' : 'Reddit Marketing SaaS',
        icon: <MegaphoneIcon className='size-4' />
      },
      {
        title: 'Volumn.ai',
        href: 'https://volumn.ai',
        description: lang === 'zh' ? 'Twitter（X）营销 SaaS' : 'Twitter (X) Marketing SaaS',
        icon: <AtSignIcon className='size-4' />
      }
    ]
  },
  {
    title: lang === 'zh' ? '资源' : 'Resources',
    dropdownClassName: 'w-[min(64rem,calc(100vw-2rem))]',
    contentClassName: 'sm:grid-cols-3',
    items: [
      {
<<<<<<< HEAD
        title: lang === 'zh' ? '小工具' : 'Free Tools',
        href: '/tools',
        description:
          lang === 'zh'
            ? '集中使用实用的 SEO、营销追踪与社交监测工具。'
            : 'Explore our practical SEO, campaign tracking, and social monitoring tools in one place.',
        icon: <WrenchIcon className='size-4' />
=======
        title: 'SEO Prompt Library',
        href: '/zh/seo-prompts',
        localize: false,
        description: 'Copy execution-ready prompts for research, content, technical SEO, and reporting.',
        icon: <BotIcon className='size-4' />
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
      },
      {
        title: lang === 'zh' ? '博客与洞察' : 'Blog & Insights',
        href: '/blog',
        activeMatch: 'prefix',
        description:
          lang === 'zh'
            ? '分享 SaaS SEO、Reddit 增长、GEO 与 AI 原生需求增长的实战洞察。'
            : 'Practical thinking on SaaS SEO, Reddit growth, GEO, and AI-native demand.',
        icon: <FileSearchIcon className='size-4' />
      },
      {
        title: lang === 'zh' ? '社群' : 'Community',
        href: '/community',
        description:
          lang === 'zh'
            ? '添加社群小助理，加入出海增长与实战交流社群。'
            : 'Connect with our community assistant to join conversations on global growth and practical experience.',
        icon: <MessagesSquareIcon className='size-4' />
      }
    ]
  }
]

const PagesLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
<<<<<<< HEAD
  const lang = (await headers()).get('x-page-locale') === 'zh-CN' ? 'zh' : 'en'
  const translatedBlogSlugs = await getTranslatedPostSlugs()
=======
  const [translatedBlogSlugs, lang] = await Promise.all([getTranslatedPostSlugs(), getRequestLanguage()])
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7

  return (
    <div className='flex flex-col bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--border)40%,transparent)0,color-mix(in_oklab,var(--border)40%,transparent)1px,transparent_0,transparent_50%)] bg-size-[12px_12px] bg-fixed'>
      <div className='mx-auto h-full w-full max-w-336 px-4 sm:px-6 lg:px-8'>
        <div className='bg-background h-full w-full max-w-7xl border-x'>
          {/* Header Section */}
          <Suspense fallback={<div aria-hidden='true' className='h-16 border-b' />}>
<<<<<<< HEAD
            <Header lang={lang} navigationData={getNavigationData(lang)} translatedBlogSlugs={translatedBlogSlugs} />
=======
            <Header navigationData={navigationData} translatedBlogSlugs={translatedBlogSlugs} currentLang={lang} />
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
          </Suspense>

          {/* Main Content */}
          <main className='flex flex-1 flex-col *:scroll-mt-16'>{children}</main>

          {/* Footer Section */}
          <Footer lang={lang} />
          <FloatingContact lang={lang} />
        </div>
      </div>
    </div>
  )
}

export default PagesLayout
