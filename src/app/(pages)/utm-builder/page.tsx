import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import ToolBreadcrumb from '@/components/layout/tool-breadcrumb'
import UtmBuilder from '@/components/tools/utm-builder'
import UtmBuilderGuide from '@/components/tools/utm-builder-guide'
import { UTM_BUILDER_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'

import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createBreadcrumbSchema, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const path = getLocalizedPath('/utm-builder', lang)

  return buildMetadata({
    title:
      lang === 'zh'
        ? '免费 UTM 链接生成器｜GA4 广告系列网址构建工具'
        : 'Free UTM Builder for GA4 Campaign URLs | Meridian',
    description:
      lang === 'zh'
        ? '免费生成适用于 GA4、社交媒体、邮件和付费广告的 UTM 追踪链接，附参数解释、渠道示例、命名规范与常见问题。'
        : 'Generate free UTM tracking links for GA4, email, paid social, and partner campaigns. Includes parameter guidance, examples, naming rules, and FAQs.',
    path,
    keywords:
      lang === 'zh'
        ? ['utm 链接生成器', 'utm 参数', 'utm 追踪', 'utm 生成器', 'ga4 网址构建工具']
        : [
            'utm builder',
            'free utm builder',
            'utm generator',
            'campaign url builder',
            'utm link generator',
            'ga4 utm builder',
            'google analytics campaign url builder',
            'utm tracking parameters'
          ],
    alternates: createLocalizedAlternates('/utm-builder', lang),
    language: lang
  })
}

const UtmBuilderPage = async () => {
  const cookieStore = await cookies()
  const accessGranted = Boolean(verifyAccessToken(cookieStore.get(UTM_BUILDER_ACCESS_COOKIE)?.value))
  const lang = await getRequestLanguage()
  const path = getLocalizedPath('/utm-builder', lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema({
        path,
        title: lang === 'zh' ? '免费 UTM 链接生成器' : 'Free UTM Builder for GA4 Campaign URLs',
        description:
          lang === 'zh'
            ? '生成规范的 UTM 追踪链接，并学习参数、命名和 GA4 查看方法。'
            : 'Generate clean UTM tracking links and learn campaign parameters, naming conventions, and GA4 reporting.',
        language: lang
      }),
      createBreadcrumbSchema(
        [
          { name: lang === 'zh' ? '首页' : 'Home', path: '/' },
          { name: lang === 'zh' ? '免费工具' : 'Free tools', path: '/tools' },
          { name: lang === 'zh' ? 'UTM 链接生成器' : 'UTM Builder', path: '/utm-builder' }
        ],
        lang
      )
    ]
  }

  return (
    <>
      <ToolBreadcrumb currentLabel={lang === 'zh' ? 'UTM 链接生成器' : 'UTM Builder'} lang={lang} />
      <UtmBuilder lang={lang} initialAccessGranted={accessGranted} />
      <UtmBuilderGuide lang={lang} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default UtmBuilderPage
