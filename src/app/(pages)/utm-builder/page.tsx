import type { Metadata } from 'next'

import UtmBuilder from '@/components/tools/utm-builder'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const path = getLocalizedPath('/utm-builder', lang)

  return buildMetadata({
    title: lang === 'zh' ? '免费 UTM 链接生成器 | Meridian' : 'Free UTM Builder | Meridian',
    description:
      lang === 'zh'
        ? '快速生成适用于 Google Analytics、社交媒体、邮件和付费投放的规范 UTM 跟踪链接。'
        : 'Build clean campaign tracking URLs for Google Analytics, social, email, and paid media in seconds.',
    path,
    keywords: ['utm builder', 'campaign url builder', 'utm link generator', 'campaign tracking'],
    alternates: createLocalizedAlternates('/utm-builder', lang),
    language: lang
  })
}

const UtmBuilderPage = async () => <UtmBuilder lang={await getRequestLanguage()} />

export default UtmBuilderPage
