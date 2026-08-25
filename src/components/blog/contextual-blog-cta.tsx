import Link from 'next/link'
import { ArrowUpRightIcon } from 'lucide-react'

import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { cn } from '@/lib/utils'

type ContextualBlogCtaProps = {
  slug: string
  topic?: string
  locale?: 'en' | 'zh'
  className?: string
}

const SEO_BOOKING_URL = 'https://cal.com/team/meridian-growth/book-a-call-for-seo-services'
const REDDIT_BOOKING_URL = 'https://cal.com/team/meridian-growth/book-a-demo'

function getCtaContent({ slug, topic, locale = 'en' }: Omit<ContextualBlogCtaProps, 'className'>) {
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
      href: SEO_BOOKING_URL
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
      href: REDDIT_BOOKING_URL
    }
  }

  return null
}

export default function ContextualBlogCta({ slug, topic, locale = 'en', className }: ContextualBlogCtaProps) {
  const cta = getCtaContent({ slug, topic, locale })

  if (!cta) return null

  return (
    <aside className={cn('bg-card rounded-2xl border p-5 shadow-sm', className)} aria-label={cta.title}>
      <p className='text-primary text-xs font-semibold tracking-[0.16em] uppercase'>{cta.eyebrow}</p>
      <h2 className='mt-3 text-xl leading-tight font-semibold'>{cta.title}</h2>
      <p className='text-muted-foreground mt-3 text-sm leading-6'>{cta.description}</p>
      <PrimaryFlowButton asChild className='mt-5 w-full *:w-full'>
        <Link href={cta.href} target='_blank' rel='noreferrer'>
          Book a demo
          <ArrowUpRightIcon />
        </Link>
      </PrimaryFlowButton>
    </aside>
  )
}

