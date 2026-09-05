import Link from 'next/link'

import {
  ArrowRightIcon,
  BarChart3Icon,
  BookOpenCheckIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  LightbulbIcon,
  TagsIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { SiteLang } from '@/lib/language'

type GuideCopy = {
  eyebrow: string
  title: string
  introduction: string
  whyTitle: string
  whyBody: string
  sourceLabel: string
  parametersTitle: string
  parametersDescription: string
  required: string
  optional: string
  tableHeaders: [string, string, string]
  parameters: Array<{
    name: string
    status: 'required' | 'optional'
    purpose: string
    example: string
  }>
  examplesTitle: string
  examplesDescription: string
  examples: Array<{ channel: string; note: string; url: string }>
  stepsTitle: string
  stepsDescription: string
  steps: Array<{ title: string; body: string }>
  practicesTitle: string
  practicesDescription: string
  practices: string[]
  faqEyebrow: string
  faqTitle: string
  faqDescription: string
  faqs: Array<{ question: string; answer: string }>
}

export const utmBuilderGuideCopy: Record<SiteLang, GuideCopy> = {
  en: {
    eyebrow: 'UTM tracking guide',
    title: 'What is a UTM link—and how should you build one?',
    introduction:
      'A UTM link is a normal destination URL with campaign parameters appended to it. When someone clicks the link, GA4 can use those values to identify the source, medium, campaign, keyword, and creative behind the visit.',
    whyTitle: 'Why use UTM parameters?',
    whyBody:
      'Consistent UTM tracking turns otherwise ambiguous visits into usable campaign data. It helps teams compare email, paid social, partnerships, creator campaigns, and other traffic sources without relying on guesswork.',
    sourceLabel: 'Read Google Analytics guidance',
    parametersTitle: 'The six UTM parameters explained',
    parametersDescription:
      'Use source, medium, and campaign for every manually tagged link. Add term, content, or campaign ID when you need more detail.',
    required: 'Required',
    optional: 'Optional',
    tableHeaders: ['Parameter', 'What it identifies', 'Example value'],
    parameters: [
      {
        name: 'utm_source',
        status: 'required',
        purpose: 'The platform or referrer sending traffic',
        example: 'google, linkedin, newsletter'
      },
      {
        name: 'utm_medium',
        status: 'required',
        purpose: 'The marketing channel or traffic type',
        example: 'cpc, paid_social, email'
      },
      {
        name: 'utm_campaign',
        status: 'required',
        purpose: 'The campaign, promotion, or launch',
        example: 'spring_launch'
      },
      { name: 'utm_term', status: 'optional', purpose: 'A paid keyword or audience segment', example: 'utm_builder' },
      {
        name: 'utm_content',
        status: 'optional',
        purpose: 'The creative, CTA, or link variation',
        example: 'hero_cta, video_a'
      },
      { name: 'utm_id', status: 'optional', purpose: 'The campaign identifier from your platform', example: '123456' }
    ],
    examplesTitle: 'Ready-to-use UTM examples by channel',
    examplesDescription:
      'Keep the taxonomy stable across campaigns. Change the values—not the rules—when you launch a new channel or creative.',
    examples: [
      {
        channel: 'Email newsletter',
        note: 'Track a product-launch link in a newsletter.',
        url: 'https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=product_launch'
      },
      {
        channel: 'LinkedIn paid social',
        note: 'Separate one video creative from the rest of a paid campaign.',
        url: 'https://example.com/demo?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q4_demo&utm_content=video_a'
      },
      {
        channel: 'Creator partnership',
        note: 'Attribute traffic from a specific creator collaboration.',
        url: 'https://example.com/offer?utm_source=creator_name&utm_medium=influencer&utm_campaign=summer_launch'
      }
    ],
    stepsTitle: 'How to create and track a campaign URL in GA4',
    stepsDescription: 'Build a clean URL now, then keep the same naming system when your campaign scales.',
    steps: [
      { title: 'Enter the landing page', body: 'Paste the complete destination URL, including https://.' },
      {
        title: 'Add campaign details',
        body: 'Complete source, medium, and campaign. Add optional fields only when they improve analysis.'
      },
      {
        title: 'Copy and publish',
        body: 'Use the generated URL in your ad, email, social post, partner link, or QR-code destination.'
      },
      {
        title: 'Review results in GA4',
        body: 'Open Reports → Acquisition → Traffic acquisition, then inspect the manual campaign dimensions.'
      }
    ],
    practicesTitle: 'UTM naming conventions that keep reports clean',
    practicesDescription:
      'GA4 treats parameter values as case-sensitive. A shared naming convention prevents one campaign from being split across multiple rows.',
    practices: [
      'Use lowercase values consistently across every channel.',
      'Choose one separator—this builder converts spaces to underscores.',
      'Keep a shared list of approved source and medium values.',
      'Use utm_content for creative variants and utm_term for keywords or audiences.',
      'Never include names, email addresses, or other personal data in UTM parameters.'
    ],
    faqEyebrow: 'UTM FAQ',
    faqTitle: 'Common UTM builder questions',
    faqDescription: 'Quick answers for marketers setting up campaign tracking in Google Analytics 4.',
    faqs: [
      {
        question: 'What does UTM stand for?',
        answer:
          'UTM stands for Urchin Tracking Module. Today, the term describes campaign parameters added to a URL so analytics platforms can identify where a visit came from.'
      },
      {
        question: 'Which UTM parameters should I always use?',
        answer:
          'For manually tagged campaign links, use utm_source, utm_medium, and utm_campaign together. Add utm_term, utm_content, and utm_id when you need keyword, creative, or campaign-ID detail.'
      },
      {
        question: 'Does this UTM generator work with GA4?',
        answer:
          'Yes. The generated parameters populate GA4 manual campaign dimensions when someone visits your site through the tagged URL.'
      },
      {
        question: 'Are UTM parameters case-sensitive?',
        answer:
          'Yes. Values such as LinkedIn and linkedin can appear as separate rows. Use lowercase values and a consistent naming system to avoid fragmented reports.'
      },
      {
        question: 'Where can I find UTM campaign data in GA4?',
        answer:
          'Go to Reports, then Acquisition and Traffic acquisition. You can review session source, medium, campaign, and other manual campaign dimensions there.'
      },
      {
        question: 'Should I add UTM parameters to Google Ads links?',
        answer:
          'If your Google Ads account is linked to GA4 and auto-tagging is enabled, rely on auto-tagging for its richer advertising dimensions. Use manual UTMs for other channels or when your reporting plan specifically requires them.'
      }
    ]
  },
  zh: {
    eyebrow: 'UTM 追踪指南',
    title: 'UTM 链接是什么？应该如何正确生成？',
    introduction:
      'UTM 链接是在普通目标网址后添加广告系列参数的可追踪链接。用户点击后，GA4 可以根据这些参数识别访问对应的来源、媒介、广告系列、关键词和素材。',
    whyTitle: '为什么要使用 UTM 参数？',
    whyBody:
      '统一的 UTM 追踪规范，可以把难以判断的访问转化为清晰的广告系列数据，帮助团队比较邮件、付费社交、合作伙伴、达人推广等渠道的实际表现。',
    sourceLabel: '查看 Google Analytics 官方指南',
    parametersTitle: '六个 UTM 参数完整解释',
    parametersDescription:
      '手动标记链接时应使用来源、媒介和广告系列；需要更细粒度分析时，再加入关键词、内容或广告系列 ID。',
    required: '必填',
    optional: '选填',
    tableHeaders: ['参数', '用于识别', '示例值'],
    parameters: [
      {
        name: 'utm_source',
        status: 'required',
        purpose: '带来流量的平台或来源',
        example: 'google、linkedin、newsletter'
      },
      { name: 'utm_medium', status: 'required', purpose: '营销渠道或流量类型', example: 'cpc、paid_social、email' },
      { name: 'utm_campaign', status: 'required', purpose: '广告系列、活动或产品发布', example: 'spring_launch' },
      { name: 'utm_term', status: 'optional', purpose: '付费关键词或受众分组', example: 'utm_builder' },
      { name: 'utm_content', status: 'optional', purpose: '广告素材、按钮或链接版本', example: 'hero_cta、video_a' },
      { name: 'utm_id', status: 'optional', purpose: '广告平台中的广告系列编号', example: '123456' }
    ],
    examplesTitle: '不同渠道的 UTM 链接示例',
    examplesDescription: '每次推广都沿用同一套命名规则，只修改对应值，避免同一渠道或广告系列在报告中被拆散。',
    examples: [
      {
        channel: '邮件营销',
        note: '追踪 Newsletter 中的产品发布链接。',
        url: 'https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=product_launch'
      },
      {
        channel: 'LinkedIn 付费社交',
        note: '区分付费广告系列中的某条视频素材。',
        url: 'https://example.com/demo?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q4_demo&utm_content=video_a'
      },
      {
        channel: '达人或合作伙伴推广',
        note: '识别某位达人合作带来的访问。',
        url: 'https://example.com/offer?utm_source=creator_name&utm_medium=influencer&utm_campaign=summer_launch'
      }
    ],
    stepsTitle: '如何创建 UTM 链接并在 GA4 中查看数据',
    stepsDescription: '先生成规范链接，再在整个广告系列中持续沿用同一套命名方式。',
    steps: [
      { title: '输入目标网址', body: '粘贴包含 https:// 的完整落地页地址。' },
      { title: '填写广告系列信息', body: '填写来源、媒介和广告系列；只在需要进一步分析时添加选填参数。' },
      { title: '复制并投放', body: '把生成的网址用于广告、邮件、社交帖子、合作伙伴链接或二维码落地页。' },
      { title: '在 GA4 查看结果', body: '进入“报告 → 获取 → 流量获取”，查看手动广告系列相关维度。' }
    ],
    practicesTitle: '保持 GA4 报告整洁的 UTM 命名规范',
    practicesDescription: 'GA4 会区分参数值的大小写。统一命名可以避免同一广告系列被拆分到多行数据中。',
    practices: [
      '所有渠道的参数值统一使用小写字母。',
      '固定使用一种分隔符；本工具会自动把空格转换为下划线。',
      '维护一份团队共用的 source 和 medium 标准值清单。',
      '用 utm_content 区分素材，用 utm_term 区分关键词或受众。',
      'UTM 参数中不要填写姓名、邮箱或其他个人信息。'
    ],
    faqEyebrow: 'UTM 常见问题',
    faqTitle: 'UTM 链接生成器 FAQ',
    faqDescription: '帮助营销团队正确设置 Google Analytics 4 广告系列追踪。',
    faqs: [
      {
        question: 'UTM 是什么意思？',
        answer: 'UTM 是 Urchin Tracking Module 的缩写，现在通常指添加在网址后的广告系列追踪参数，用于识别访问来源。'
      },
      {
        question: '哪些 UTM 参数必须填写？',
        answer: '手动标记广告系列链接时，建议同时填写 utm_source、utm_medium 和 utm_campaign；其他参数按分析需求选填。'
      },
      {
        question: '这个 UTM 生成器支持 GA4 吗？',
        answer: '支持。用户通过生成的链接访问网站后，对应参数会进入 GA4 的手动广告系列维度。'
      },
      {
        question: 'UTM 参数区分大小写吗？',
        answer: '区分。LinkedIn 和 linkedin 可能显示为两行数据，建议统一使用小写并维护固定命名规则。'
      },
      {
        question: '在哪里查看 GA4 的 UTM 数据？',
        answer: '进入“报告 → 获取 → 流量获取”，即可查看会话来源、媒介、广告系列等手动广告系列维度。'
      },
      {
        question: 'Google Ads 链接还需要添加 UTM 参数吗？',
        answer:
          '如果 Google Ads 已连接 GA4 并开启自动标记，通常优先使用自动标记获取更完整的广告维度；其他渠道或特殊报告需求再使用手动 UTM。'
      }
    ]
  }
}

const UtmBuilderGuide = ({ lang }: { lang: SiteLang }) => {
  const copy = utmBuilderGuideCopy[lang]

  return (
    <div className='border-t'>
      <section className='px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-start'>
          <div>
            <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
              <BookOpenCheckIcon className='size-3.5' /> {copy.eyebrow}
            </Badge>
            <h2 className='max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>{copy.title}</h2>
            <p className='text-muted-foreground mt-5 max-w-3xl text-base leading-8 sm:text-lg'>{copy.introduction}</p>
            <Link
              href='https://support.google.com/analytics/answer/10917952?hl=en'
              target='_blank'
              rel='noreferrer'
              className='mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline'
            >
              {copy.sourceLabel}
              <ExternalLinkIcon className='size-4' />
            </Link>
          </div>

          <Card className='bg-muted/35 gap-0 shadow-none'>
            <CardContent className='p-6 sm:p-7'>
              <div className='bg-background mb-5 flex size-11 items-center justify-center rounded-xl border shadow-sm'>
                <BarChart3Icon className='size-5' />
              </div>
              <h3 className='text-xl font-semibold'>{copy.whyTitle}</h3>
              <p className='text-muted-foreground mt-3 leading-7'>{copy.whyBody}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='bg-muted/20 border-y px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.parametersTitle}</h2>
            <p className='text-muted-foreground mt-4 text-base leading-7 sm:text-lg'>{copy.parametersDescription}</p>
          </div>

          <div className='bg-background mt-9 overflow-hidden rounded-2xl border shadow-sm'>
            <div className='hidden grid-cols-[1fr_1.5fr_1.25fr] border-b px-6 py-4 text-xs font-medium tracking-wide uppercase sm:grid'>
              {copy.tableHeaders.map(header => (
                <span key={header}>{header}</span>
              ))}
            </div>
            {copy.parameters.map(parameter => (
              <div
                key={parameter.name}
                className='grid gap-3 border-b px-5 py-5 last:border-b-0 sm:grid-cols-[1fr_1.5fr_1.25fr] sm:items-center sm:px-6'
              >
                <div className='flex flex-wrap items-center gap-2'>
                  <code className='font-mono text-sm font-semibold'>{parameter.name}</code>
                  <Badge variant={parameter.status === 'required' ? 'default' : 'outline'} className='text-[10px]'>
                    {parameter.status === 'required' ? copy.required : copy.optional}
                  </Badge>
                </div>
                <p className='text-muted-foreground text-sm leading-6'>{parameter.purpose}</p>
                <code className='bg-muted w-fit max-w-full rounded-md px-2 py-1 font-mono text-xs break-words'>
                  {parameter.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.examplesTitle}</h2>
            <p className='text-muted-foreground mt-4 text-base leading-7 sm:text-lg'>{copy.examplesDescription}</p>
          </div>
          <div className='mt-9 grid gap-5 lg:grid-cols-3'>
            {copy.examples.map((example, index) => (
              <Card key={example.channel} className='gap-0 overflow-hidden py-0 shadow-sm'>
                <CardContent className='flex h-full flex-col p-6'>
                  <div className='flex items-center gap-3'>
                    <span className='bg-muted flex size-9 items-center justify-center rounded-lg border text-sm font-semibold'>
                      {index + 1}
                    </span>
                    <h3 className='font-semibold'>{example.channel}</h3>
                  </div>
                  <p className='text-muted-foreground mt-4 text-sm leading-6'>{example.note}</p>
                  <code className='bg-muted/60 mt-5 block rounded-lg border p-3 font-mono text-xs leading-5 break-all'>
                    {example.url}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-foreground text-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.stepsTitle}</h2>
            <p className='text-background/65 mt-4 text-base leading-7 sm:text-lg'>{copy.stepsDescription}</p>
          </div>
          <div className='mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4'>
            {copy.steps.map((step, index) => (
              <div key={step.title} className='bg-foreground p-6'>
                <span className='text-background/45 font-mono text-sm'>0{index + 1}</span>
                <h3 className='mt-8 text-lg font-semibold'>{step.title}</h3>
                <p className='text-background/65 mt-3 text-sm leading-6'>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
          <div>
            <span className='bg-muted mb-5 flex size-11 items-center justify-center rounded-xl border'>
              <TagsIcon className='size-5' />
            </span>
            <h2 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>{copy.practicesTitle}</h2>
            <p className='text-muted-foreground mt-4 leading-7'>{copy.practicesDescription}</p>
          </div>
          <Card className='gap-0 shadow-sm'>
            <CardContent className='divide-y p-0'>
              {copy.practices.map(practice => (
                <div key={practice} className='flex gap-3 px-5 py-4 sm:px-6'>
                  <CheckCircle2Icon className='mt-0.5 size-5 shrink-0' />
                  <p className='text-muted-foreground leading-7'>{practice}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='bg-muted/20 border-t px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]'>
          <div>
            <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
              <LightbulbIcon className='size-3.5' /> {copy.faqEyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.faqTitle}</h2>
            <p className='text-muted-foreground mt-4 leading-7'>{copy.faqDescription}</p>
          </div>
          <div className='divide-y border-y'>
            {copy.faqs.map(faq => (
              <details key={faq.question} className='group py-5'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none'>
                  {faq.question}
                  <ArrowRightIcon className='size-4 shrink-0 transition-transform group-open:rotate-90' />
                </summary>
                <p className='text-muted-foreground max-w-3xl pt-4 pr-8 leading-7'>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default UtmBuilderGuide
