import { ArrowUpRightIcon } from 'lucide-react'

import BookingLink from '@/components/analytics/booking-link'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { cn } from '@/lib/utils'

type ContextualBlogCtaProps = {
  slug: string
  topic?: string
  locale?: 'en' | 'zh'
  className?: string
}

const SEO_BOOKING_URL = 'https://cal.com/team/meridian-growth/book-a-call-for-seo-services'
const GEO_BOOKING_URL = 'https://cal.com/team/meridian-growth/book-a-call-for-geo-services'
const REDDIT_BOOKING_URL = 'https://cal.com/team/meridian-growth/book-a-demo'

export type BlogCtaContent = {
  eyebrow?: string
  title: string
  description: string
  buttonLabel: string
  href: string
  serviceType: string
}

export function getBlogCtaContent({
  slug,
  topic,
  locale = 'en'
}: Omit<ContextualBlogCtaProps, 'className'>): BlogCtaContent {
  const normalizedTopic = topic?.toLowerCase()
  const isBlackHatArticle = slug.includes('black-hat') || slug.includes('blackhat')
  const isRedditArticle = normalizedTopic === 'reddit' || slug.includes('reddit')

  if (isBlackHatArticle) {
    return {
      eyebrow: locale === 'zh' ? '更稳健的增长方式' : 'A safer path to growth',
      title: locale === 'zh' ? '白帽稳健 SEO 服务' : 'Sustainable White-Hat SEO',
      description:
        locale === 'zh'
          ? '用透明、可核验的方法建立长期搜索增长，避免黑帽策略带来的排名与品牌风险。'
          : 'Build durable search growth with transparent, verifiable methods—without black-hat risk.',
      buttonLabel: locale === 'zh' ? '咨询 SEO 服务' : 'Discuss your SEO strategy',
      href: SEO_BOOKING_URL,
      serviceType: 'seo'
    }
  }

  if (isRedditArticle) {
    return {
      eyebrow: locale === 'zh' ? '把洞察变成增长' : 'Turn insight into growth',
      title: locale === 'zh' ? '专业 Reddit 增长服务' : 'Reddit Growth Services',
      description:
        locale === 'zh'
          ? '从社区研究、内容策略到长期运营，建立可信且可持续的 Reddit 增长渠道。'
          : 'Build a credible, sustainable Reddit channel through research, strategy, and community operations.',
      buttonLabel: locale === 'zh' ? '咨询 Reddit 服务' : 'Discuss Reddit growth',
      href: REDDIT_BOOKING_URL,
      serviceType: 'reddit'
    }
  }

  if (normalizedTopic === 'geo') {
    return {
      eyebrow: locale === 'zh' ? '提升 AI 搜索可见性' : undefined,
      title: locale === 'zh' ? '让品牌出现在 AI 答案中' : 'Earn Visibility in AI Search',
      description:
        locale === 'zh'
          ? '通过可引用的内容、技术 SEO 与权威信号，让品牌更容易被 ChatGPT、Google AI Overviews 等平台发现和引用。'
          : 'Build citable content, technical foundations, and authority signals that help AI search platforms discover and reference your brand.',
      buttonLabel: locale === 'zh' ? '预约 GEO Demo' : 'Book a GEO demo call',
      href: GEO_BOOKING_URL,
      serviceType: 'geo'
    }
  }

  if (normalizedTopic === 'seo' || normalizedTopic === 'agency' || slug.includes('seo')) {
    return {
      eyebrow: locale === 'zh' ? '把搜索需求变成增长' : undefined,
      title: locale === 'zh' ? '为你的产品建立可持续 SEO 渠道' : "Grow your website's seo with experts",
      description:
        locale === 'zh'
          ? '从技术基础、关键词策略到高意图内容，建立能够持续带来合格流量与转化的自然增长系统。'
          : 'Connect technical SEO, search strategy, and high-intent content to create a durable source of qualified traffic and conversions.',
      buttonLabel: locale === 'zh' ? '咨询 SEO 服务' : 'Book a demo',
      href: SEO_BOOKING_URL,
      serviceType: 'seo'
    }
  }

  return {
    eyebrow: locale === 'zh' ? '找到合适的增长渠道' : 'Find your best growth channel',
    title: locale === 'zh' ? '把增长洞察转化为可执行策略' : 'Turn Growth Insight Into an Actionable Strategy',
    description:
      locale === 'zh'
        ? '一起判断 SEO、GEO 或 Reddit 是否适合你的产品，并确定最值得优先验证的增长机会。'
        : 'Identify whether SEO, GEO, or Reddit fits your product and choose the highest-value opportunity to validate first.',
    buttonLabel: locale === 'zh' ? '预约增长咨询' : 'Book a growth consultation',
    href: SEO_BOOKING_URL,
    serviceType: 'growth_strategy'
  }
}

export default function ContextualBlogCta({ slug, topic, locale = 'en', className }: ContextualBlogCtaProps) {
  const cta = getBlogCtaContent({ slug, topic, locale })

  return (
    <aside className={cn('bg-card rounded-2xl border p-5 shadow-sm', className)} aria-label={cta.title}>
      {cta.eyebrow ? (
        <p className='text-primary text-xs font-semibold tracking-[0.16em] uppercase'>{cta.eyebrow}</p>
      ) : null}
      <h2 className={cn('text-xl leading-tight font-semibold', cta.eyebrow && 'mt-3')}>{cta.title}</h2>
      <p className='text-muted-foreground mt-3 text-sm leading-6'>{cta.description}</p>
      <PrimaryFlowButton asChild className='mt-5 w-full *:w-full'>
        <BookingLink
          href={cta.href}
          ctaLocation='inline_article'
          pageType='blog_article'
          serviceType={cta.serviceType}
          language={locale}
          target='_blank'
          rel='noreferrer'
        >
          {cta.buttonLabel}
          <ArrowUpRightIcon />
        </BookingLink>
      </PrimaryFlowButton>
    </aside>
  )
}
