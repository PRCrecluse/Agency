import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowUpRightIcon, BotIcon, ChartNoAxesCombinedIcon, Link2Icon, WrenchIcon } from 'lucide-react'

import { getLocalizedPath, toLocalizedHref, type SiteLang } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createLocalizedAlternates } from '@/lib/seo'

const pageCopy = {
  en: {
    title: 'Free SEO & Marketing Tools | Meridian',
    description: 'Explore Meridian’s free tools for SEO prompts, UTM campaign links, and Twitter/X post analytics.',
    keywords: ['free marketing tools', 'seo tools', 'utm builder', 'seo prompt library', 'twitter analytics tool'],
    eyebrow: 'Free tools',
    headline: 'Practical tools for modern growth teams.',
    introduction: 'Plan, track, and improve your growth work with focused utilities built by Meridian.'
  },
  zh: {
    title: '免费 SEO 与营销工具 | Meridian',
    description: '使用 Meridian 的免费工具，获取 SEO 提示词、生成 UTM 营销追踪链接，并分析 Twitter/X 帖子表现。',
    keywords: ['免费营销工具', 'SEO 工具', 'UTM 链接生成器', 'SEO 提示词库', 'Twitter 数据分析工具'],
    eyebrow: '免费工具',
    headline: '为增长团队打造的实用工具。',
    introduction: '使用 Meridian 打造的实用工具，规划增长工作、追踪营销表现，并持续优化执行效果。'
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const copy = pageCopy[lang]

  return buildMetadata({
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    path: getLocalizedPath('/tools', lang),
    alternates: createLocalizedAlternates('/tools', lang),
    language: lang
  })
}

const getTools = (lang: SiteLang) => [
  {
    title: lang === 'zh' ? 'SEO 提示词库' : 'SEO Prompt Library',
    description:
      lang === 'zh'
        ? '复制即可使用的提示词，覆盖关键词研究、内容创作、技术 SEO 和效果报告。'
        : 'Copy execution-ready prompts for research, content, technical SEO, and reporting.',
    href: '/seo-prompts',
    icon: BotIcon,
    label: lang === 'zh' ? 'SEO 与内容' : 'SEO & content'
  },
  {
    title: lang === 'zh' ? 'UTM 链接生成器' : 'UTM Builder',
    description:
      lang === 'zh'
        ? '为社交媒体、邮件和付费广告生成规范的营销追踪链接，方便统计与分析。'
        : 'Create clean campaign tracking URLs for analytics, social, email, and paid media.',
    href: '/utm-builder',
    icon: Link2Icon,
    label: lang === 'zh' ? '营销追踪' : 'Campaign tracking'
  },
  {
    title: lang === 'zh' ? 'Twitter（X）帖子数据追踪' : 'Twitter (X) Post Analytics Tracker',
    description:
      lang === 'zh'
        ? '持续追踪公开帖子的曝光、互动、链接点击和互动率，了解数据随时间的变化。'
        : 'Track a public post’s impressions, engagements, link clicks, and engagement rate over time.',
    href: '/twitter-monitor',
    icon: ChartNoAxesCombinedIcon,
    label: lang === 'zh' ? '社交数据分析' : 'Social analytics'
  }
]

const ToolsPage = async () => {
  const lang = await getRequestLanguage()
  const copy = pageCopy[lang]
  const tools = getTools(lang)

  return (
    <>
      <section className='relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='bg-primary/10 absolute top-0 left-1/3 -z-10 size-80 rounded-full blur-3xl' />
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl'>
            <div className='bg-background text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm'>
              <WrenchIcon className='size-4' />
              {copy.eyebrow}
            </div>
            <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
              {copy.headline}
            </h1>
            <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-8 text-pretty'>{copy.introduction}</p>
          </div>
        </div>
      </section>

      <section className='border-t px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-3'>
          {tools.map(tool => {
            const Icon = tool.icon

            return (
              <Link
                key={tool.href}
                href={toLocalizedHref(tool.href, lang)}
                className='group bg-card hover:border-foreground/25 hover:shadow-primary/5 flex min-h-72 flex-col rounded-3xl border p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7'
              >
                <div className='flex items-start justify-between gap-4'>
                  <span className='bg-muted flex size-12 items-center justify-center rounded-2xl border'>
                    <Icon className='size-5' />
                  </span>
                  <ArrowUpRightIcon className='text-muted-foreground size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                </div>
                <div className='mt-auto pt-12'>
                  <p className='text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase'>{tool.label}</p>
                  <h2 className='mt-2 text-2xl font-semibold tracking-tight'>{tool.title}</h2>
                  <p className='text-muted-foreground mt-3 leading-7'>{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ToolsPage
