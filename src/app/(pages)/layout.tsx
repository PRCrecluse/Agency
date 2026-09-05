import { Suspense, type ReactNode } from 'react'

import { headers } from 'next/headers'

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
import type { Navigation } from '@/components/layout/header-navigation'
import { getTranslatedPostSlugs } from '@/lib/posts'

const navigationData: Navigation[] = [
  {
    title: 'Services',
    contentClassName: 'w-full grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_minmax(20rem,0.9fr)] gap-x-10 xl:gap-x-14',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'SEO services',
        items: [
          {
            title: 'SEO Services',
            href: '/services/seo-services',
            description: 'Plan on-page, technical, and programmatic SEO inside one structured service page.',
            icon: <LayoutDashboardIcon className='size-4' />
          },
          {
            title: 'On-page SEO',
            href: '/services/seo-services/on-page-seo',
            description: 'Improve page targeting, content signals, and internal linking for important URLs.',
            icon: <LayoutDashboardIcon className='size-4' />
          },
          {
            title: 'Technical SEO',
            href: '/services/seo-services/technical-seo',
            description: 'Resolve crawl, indexing, performance, and site architecture issues.',
            icon: <TelescopeIcon className='size-4' />
          },
          {
            title: 'Programmatic SEO',
            href: '/services/seo-services/programmatic-seo',
            description: 'Scale high-intent landing pages with structured, reusable templates.',
            icon: <ChartScatterIcon className='size-4' />
          },
          {
            title: 'Link Building',
            href: '/services/seo-services/link-building',
            description: 'Earn relevant authority through editorial outreach, digital PR, and linkable assets.',
            icon: <LinkIcon className='size-4' />
          },
          {
            title: 'Keyword Research',
            href: '/services/seo-services/keyword-research',
            description: 'Map search intent, topic clusters, and priority keywords to the right pages.',
            icon: <SearchCheckIcon className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Reddit services',
        items: [
          {
            title: 'Reddit Services Overview',
            href: '/services/reddit-services#service-overview',
            description: 'Compare comments, list posts, dedicated posts, brand communities, and full-service packages.',
            icon: <ChartPieIcon className='size-4' />
          },
          {
            title: 'Reddit Community Management',
            href: '/services/reddit-services/community-management',
            description: 'Build trust, manage discussions, and grow brand presence in relevant subreddits.',
            icon: <ChartPieIcon className='size-4' />
          },
          {
            title: 'Reddit Campaigns',
            href: '/services/reddit-services/reddit-campaigns',
            description: 'Launch targeted Reddit campaigns to drive awareness, traffic, and conversions.',
            icon: <GitPullRequestIcon className='size-4' />
          }
        ]
      },
      {
        type: 'section',
        title: 'GEO services',
        items: [
          {
            title: 'Generative Engine Optimization',
            href: '/services/geo-services',
            description: 'Position your brand to appear more often in AI-generated answers and discovery flows.',
            icon: <SparklesIcon className='size-4' />
          }
        ]
      }
    ]
  },
  {
    title: 'Products',
    dropdownClassName: 'w-[min(30rem,calc(100vw-2rem))]',
    items: [
      {
        title: 'GoGlobal.to',
        href: 'https://www.goglobal.to',
        description: 'Reddit Marketing SaaS',
        icon: <MegaphoneIcon className='size-4' />
      },
      {
        title: 'Volumn.ai',
        href: 'https://volumn.ai',
        description: 'Twitter (X) Marketing SaaS',
        icon: <AtSignIcon className='size-4' />
      }
    ]
  },
  {
    title: 'Resources',
    dropdownClassName: 'w-[min(64rem,calc(100vw-2rem))]',
    contentClassName: 'sm:grid-cols-3',
    items: [
      {
        title: 'Free Tools',
        href: '/tools',
        description: 'Explore our practical SEO, campaign tracking, and social monitoring tools in one place.',
        icon: <WrenchIcon className='size-4' />
      },
      {
        title: 'Blog & Insights',
        href: '/blog',
        activeMatch: 'prefix',
        description: 'Practical thinking on SaaS SEO, Reddit growth, GEO, and AI-native demand.',
        icon: <FileSearchIcon className='size-4' />
      },
      {
        title: '社群',
        href: '/community',
        description: '添加社群小助理，加入出海增长与实战交流社群。',
        icon: <MessagesSquareIcon className='size-4' />
      }
    ]
  }
]

const PagesLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const lang = (await headers()).get('x-page-locale') === 'zh-CN' ? 'zh' : 'en'
  const translatedBlogSlugs = await getTranslatedPostSlugs()

  return (
    <div className='flex flex-col bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--border)40%,transparent)0,color-mix(in_oklab,var(--border)40%,transparent)1px,transparent_0,transparent_50%)] bg-size-[12px_12px] bg-fixed'>
      <div className='mx-auto h-full w-full max-w-336 px-4 sm:px-6 lg:px-8'>
        <div className='bg-background h-full w-full max-w-7xl border-x'>
          {/* Header Section */}
          <Suspense fallback={<div aria-hidden='true' className='h-16 border-b' />}>
            <Header navigationData={navigationData} translatedBlogSlugs={translatedBlogSlugs} />
          </Suspense>

          {/* Main Content */}
          <main className='flex flex-1 flex-col *:scroll-mt-16'>{children}</main>

          {/* Footer Section */}
          <Footer lang={lang} />
          <FloatingContact />
        </div>
      </div>
    </div>
  )
}

export default PagesLayout
