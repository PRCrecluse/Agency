import CTASection from '@/components/blocks/cta/cta'
import { getBlogCtaContent } from '@/components/blog/contextual-blog-cta'

type BlogCtaSectionProps = {
  slug: string
  topic?: string
  locale?: 'en' | 'zh'
}

export default function BlogCtaSection({ slug, topic, locale = 'en' }: BlogCtaSectionProps) {
  const cta = getBlogCtaContent({ slug, topic, locale })

  return (
    <CTASection
      title={cta.title}
      description={cta.description}
      buttonLabel={cta.buttonLabel}
      href={cta.href}
    />
  )
}
