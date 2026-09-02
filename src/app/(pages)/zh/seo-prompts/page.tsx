import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, BotIcon, CheckCircle2Icon, SearchCheckIcon, ShieldCheckIcon } from 'lucide-react'

import SeoPromptLibrary from '@/components/tools/seo-prompt-library'
import { Badge } from '@/components/ui/badge'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import { seoPromptCategories, seoPrompts } from '@/content/seo-prompts'
import { absoluteUrl, buildMetadata, createOrganizationSchema, createWebPageSchema } from '@/lib/seo'

const title = '20 个可直接执行的 SEO 实战 Prompt | Meridian'

const description =
  '免费使用 20 个可直接执行的 SEO Prompt，覆盖关键词研究、内容策略、技术 SEO、电商 SEO、外链与 GSC 数据诊断。'

const canonicalPath = '/zh/seo-prompts'

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: canonicalPath,
  keywords: ['SEO Prompt', 'SEO 提示词', 'SEO 实战', '关键词研究 Prompt', '技术 SEO 审计'],
  language: 'zh'
})

const evidenceRules = [
  '必须访问真实网页或读取提供的数据，不凭域名、摘要或常识下结论。',
  '事实、推断与建议分开，并附 URL、字段、状态码或数据来源。',
  '缺少 GSC、GA4、日志或第三方工具数据时标记 N/A，不编造数字。',
  '建议按 P0–P3 排序，并写清问题、证据、修改方式与验收标准。'
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...createWebPageSchema({ path: canonicalPath, title, description, language: 'zh' }),
      '@type': 'CollectionPage',
      inLanguage: 'zh-CN',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: seoPrompts.length,
        itemListElement: seoPrompts.map((prompt, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: prompt.title,
          description: prompt.summary,
          url: absoluteUrl(canonicalPath)
        }))
      }
    },
    createOrganizationSchema()
  ]
}

const SeoPromptsPage = () => {
  return (
    <div lang='zh-CN' className='relative overflow-hidden'>
      <section className='relative border-b px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/10 absolute top-0 -left-28 size-80 rounded-full blur-3xl' />
        <div className='bg-muted absolute -right-24 bottom-0 size-72 rounded-full blur-3xl' />
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] bg-size-[48px_48px]' />

        <div className='relative mx-auto max-w-7xl'>
          <div className='max-w-4xl'>
            <Badge
              variant='outline'
              className='bg-background/70 mb-6 h-auto gap-1.5 rounded-full px-3 py-1 text-sm font-normal backdrop-blur-sm'
            >
              <BotIcon /> Meridian 免费资源
            </Badge>
            <h1 className='text-4xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl'>
              20 个能直接开工的
              <span className='text-muted-foreground block'>SEO 实战 Prompt</span>
            </h1>
            <p className='text-muted-foreground mt-6 max-w-2xl text-base leading-7 sm:text-lg'>
              从关键词地图到技术审计，从电商页面到月度复盘。选中任务、补全变量，交给具备联网或文件分析能力的 AI
              直接执行。
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <PrimaryFlowButton asChild>
                <Link href='#prompt-library'>
                  浏览全部 Prompt
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='/services/seo-services'>了解 SEO 服务</Link>
              </SecondaryFlowButton>
            </div>
          </div>

          <div className='bg-background/70 mt-12 grid max-w-3xl grid-cols-3 divide-x rounded-2xl border py-5 backdrop-blur-sm'>
            {[
              { value: '20', label: '执行级 Prompt' },
              { value: String(seoPromptCategories.length), label: '核心工作流' },
              { value: '1-click', label: '一键复制' }
            ].map(item => (
              <div key={item.label} className='px-3 text-center sm:px-6 sm:text-left'>
                <p className='text-xl font-semibold tracking-tight sm:text-2xl'>{item.value}</p>
                <p className='text-muted-foreground mt-1 text-xs sm:text-sm'>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 py-10 sm:px-6 lg:px-8'>
        <div className='bg-card/60 mx-auto grid max-w-7xl gap-6 rounded-2xl border p-5 sm:p-7 lg:grid-cols-[minmax(15rem,0.48fr)_minmax(0,1.52fr)] lg:gap-10'>
          <div>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <ShieldCheckIcon className='size-4' /> 所有 Prompt 共享的证据规则
            </div>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              让结果可复核，也让 AI 明确知道哪些信息不能猜。
            </p>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            {evidenceRules.map(rule => (
              <div key={rule} className='flex items-start gap-2.5 text-sm leading-6'>
                <CheckCircle2Icon className='mt-1 size-4 shrink-0' />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <SeoPromptLibrary prompts={seoPrompts} categories={seoPromptCategories} />

      <section className='px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8'>
        <div className='bg-foreground text-background relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12'>
          <div className='bg-background/10 absolute -top-24 -right-20 size-72 rounded-full blur-3xl' />
          <div className='relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <div className='text-background/65 mb-4 flex items-center gap-2 text-sm'>
                <SearchCheckIcon className='size-4' /> 从 Prompt 到增长结果
              </div>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>不只想拿模板，还想把它真正执行完？</h2>
              <p className='text-background/65 mt-4 leading-7'>
                Meridian 可以帮你完成数据采集、技术诊断、内容规划与落地，并把建议变成可验收的增长任务。
              </p>
            </div>
            <PrimaryFlowButton
              className='shrink-0 [--primary-foreground:var(--foreground)] [--primary:var(--background)]'
              asChild
            >
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                预约一次沟通
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
          </div>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  )
}

export default SeoPromptsPage
