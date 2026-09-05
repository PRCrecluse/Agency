import Link from 'next/link'
import type { Metadata } from 'next'

import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'

import BookingLink from '@/components/analytics/booking-link'
import CTASection from '@/components/blocks/cta/cta'
import SectionSeparator from '@/components/section-separator'
import SubServiceCards from '@/components/services/sub-service-cards'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import { geoMethodology as method, geoMethodologyPath } from '@/content/geo-methodology'
import { geoServices } from '@/content/geo-services'
import { resolveLocalizedText, type LocalizedText } from '@/content/services'
import { getLocalizedPath, toLocalizedHref } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createBreadcrumbSchema, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()

  return buildMetadata({
    title: `${method.title[lang]} | Meridian`,
    description: method.description[lang],
    keywords:
      lang === 'zh'
        ? ['GEO 方法', 'GEO 方法论', '生成式引擎优化', 'AI 可见度']
        : ['GEO methodology', 'generative engine optimization process', 'AI visibility'],
    path: getLocalizedPath(geoMethodologyPath, lang),
    alternates: createLocalizedAlternates(geoMethodologyPath, lang),
    language: lang
  })
}

const GeoMethodologyPage = async () => {
  const lang = await getRequestLanguage()
  const zh = lang === 'zh'
  const text = (value: LocalizedText) => resolveLocalizedText(value, lang)
  const path = getLocalizedPath(geoMethodologyPath, lang)

  const navigation = [
    { id: 'workflow', title: zh ? '六步执行方法' : 'Six-stage method' },
    { id: 'example', title: zh ? '完整执行示例' : 'Worked example' },
    { id: 'measurement', title: zh ? '如何衡量效果' : 'Measurement' },
    { id: 'collaboration', title: zh ? '协作与节奏' : 'Working together' },
    { id: 'sources', title: zh ? '方法依据' : 'Our sources' }
  ]

  const example = [
    {
      title: zh ? '01 · 把需求变成问题' : '01 · Frame the question',
      body: zh
        ? '目标客户是 20 人双语销售团队。问题具体到中英文混合会议、CRM 跟进和团队权限；先与客户验证这些条件，再纳入研究与采样。'
        : 'The buyer is a 20-person bilingual sales team. The question includes mixed-language calls, CRM follow-up, and team access. Validate these conditions before including the prompt in research and sampling.'
    },
    {
      title: zh ? '02 · 确定需要哪些证据' : '02 · Define the evidence',
      body: zh
        ? '需要带日期的产品文档、可复现的会议测试、CRM 字段说明和套餐限制。厂商陈述与实测结果分别标注，未验证能力不写成确定结论。'
        : 'Gather dated product docs, a reproducible meeting test, CRM field details, and plan limits. Distinguish vendor statements from tested findings and label unverified capabilities.'
    },
    {
      title: zh ? '03 · 制作并发布对应页面' : '03 · Produce and publish',
      body: zh
        ? '将问题交给选型指南承接，正文包含评估维度、测试方法、对比证据和试用检查表；链接到集成文档与产品页，审核后记录上线 URL 和版本。'
        : 'Create or improve an evaluation guide with criteria, test methods, comparison evidence, and a trial checklist. Link it to integration docs and the product page; record the approved URL and version after publishing.'
    },
    {
      title: zh ? '04 · 用观测结果决定下一步' : '04 · Use observations to act',
      body: zh
        ? '按原问题集合复查。如果品牌出现但能力描述错误，先修正事实来源和相关说明页；如果内容未被引用，检查访问、问题覆盖和现有引用来源，再决定修改内容或补充证据。'
        : 'Recheck the original prompt cohort. If the brand appears with incorrect capabilities, verify and clarify the source pages. If content is not cited, inspect access, question coverage, and the cited sources before choosing the next edit or evidence requirement.'
    }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema({
        path,
        title: `${text(method.title)} | Meridian`,
        description: text(method.description),
        language: lang
      }),
      createBreadcrumbSchema(
        [
          { name: zh ? '首页' : 'Home', path: '/' },
          { name: zh ? '服务' : 'Services', path: '/services' },
          { name: zh ? 'GEO 服务' : 'GEO Services', path: '/services/geo-services' },
          { name: text(method.title), path: geoMethodologyPath }
        ],
        lang
      )
    ]
  }

  return (
    <>
      <section className='bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <nav aria-label={zh ? '面包屑导航' : 'Breadcrumb'}>
            <ol className='text-muted-foreground flex flex-wrap gap-2 text-sm'>
              <li>
                <Link href={toLocalizedHref('/services', lang)}>{zh ? '服务' : 'Services'}</Link>
              </li>
              <li aria-hidden='true'>/</li>
              <li>
                <Link href={toLocalizedHref('/services/geo-services', lang)}>{zh ? 'GEO 服务' : 'GEO Services'}</Link>
              </li>
              <li aria-hidden='true'>/</li>
              <li aria-current='page' className='text-foreground'>
                {zh ? 'GEO 方法' : 'Our method'}
              </li>
            </ol>
          </nav>
          <div className='max-w-4xl space-y-5'>
            <p className='text-sm font-medium'>MERIDIAN · {zh ? 'GEO 方法' : 'GEO METHODOLOGY'}</p>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>{text(method.title)}</h1>
            <p className='text-muted-foreground text-base leading-8 sm:text-lg'>{text(method.description)}</p>
          </div>
          <div className='flex flex-wrap gap-4'>
            <PrimaryFlowButton asChild>
              <BookingLink
                ctaLocation='hero'
                pageType='service_methodology'
                serviceType='geo'
                language={lang}
                target='_blank'
                rel='noreferrer'
              >
                {zh ? '讨论你的 GEO 计划' : 'Discuss your GEO plan'}
                <ArrowRightIcon />
              </BookingLink>
            </PrimaryFlowButton>
            <SecondaryFlowButton asChild>
              <Link href='#workflow'>{zh ? '查看六步执行方法' : 'Explore the six stages'}</Link>
            </SecondaryFlowButton>
          </div>
        </div>
      </section>

      <nav aria-label={zh ? '本页目录' : 'On this page'} className='border-y px-4 py-5 sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3'>
          {navigation.map(item => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className='text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline'
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <section id='workflow' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-10'>
          <div className='max-w-3xl space-y-4'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {zh ? '把 GEO 拆成可以执行和复盘的六步' : 'Six stages with clear work and review criteria'}
            </h2>
            <p className='text-muted-foreground text-base leading-8'>{text(method.thesis)}</p>
          </div>
          <ol className='divide-y rounded-2xl border'>
            {method.stages.map((stage, index) => (
              <li key={stage.id} id={stage.id} className='scroll-mt-24 p-5 sm:p-8'>
                <div className='grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-12'>
                  <div className='space-y-4'>
                    <span className='bg-muted inline-flex size-10 items-center justify-center rounded-xl text-sm font-medium tabular-nums'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='text-2xl font-semibold tracking-tight'>{text(stage.title)}</h3>
                    <p className='text-muted-foreground text-sm leading-7'>{text(stage.summary)}</p>
                    <div className='border-l-2 pl-4'>
                      <p className='mb-2 text-xs font-semibold'>{zh ? '输入资料' : 'Inputs'}</p>
                      <p className='text-muted-foreground text-sm leading-7'>{text(stage.input)}</p>
                    </div>
                  </div>
                  <div className='space-y-5'>
                    <ul className='space-y-3'>
                      {stage.actions.map(action => (
                        <li key={action.en} className='flex items-start gap-3 text-sm leading-7'>
                          <CheckCircle2Icon className='mt-1.5 size-4 shrink-0' />
                          <span>{text(action)}</span>
                        </li>
                      ))}
                    </ul>
                    <dl className='bg-muted/30 grid gap-5 rounded-xl p-5 sm:grid-cols-2'>
                      <div>
                        <dt className='mb-2 text-xs font-semibold'>{zh ? '交付结果' : 'Output'}</dt>
                        <dd className='text-muted-foreground text-sm leading-7'>{text(stage.output)}</dd>
                      </div>
                      <div>
                        <dt className='mb-2 text-xs font-semibold'>{zh ? '完成标准' : 'Review criteria'}</dt>
                        <dd className='text-muted-foreground text-sm leading-7'>{text(stage.gate)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SectionSeparator />
      <section id='example' className='bg-muted/20 scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-4'>
            <p className='text-muted-foreground text-sm font-medium'>
              {zh ? '完整执行示例 · 非真实客户案例' : 'Worked example · illustrative scenario'}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {zh ? '一个选型问题，如何走完整个 GEO 流程' : 'Follow one buying question through the process'}
            </h2>
            <p className='text-muted-foreground text-base leading-7'>
              {zh
                ? '以双语销售团队选择 AI 会议助手为例，说明各环节如何交接。以下内容用于展示方法，不包含真实品牌结果或效果承诺。'
                : 'A bilingual sales team choosing an AI meeting assistant shows how the stages connect. This example demonstrates the workflow; it contains no client results or performance forecast.'}
            </p>
          </div>
          <div className='grid gap-5 md:grid-cols-2'>
            {example.map(item => (
              <div key={item.title} className='bg-background space-y-4 rounded-2xl border p-6'>
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p className='text-muted-foreground text-sm leading-7'>{item.body}</p>
              </div>
            ))}
          </div>
          <Link
            href={toLocalizedHref('/services/geo-services/article-production#example', lang)}
            className='inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4'
          >
            {zh ? '展开查看这份文章 Brief 的具体字段' : 'See the full article brief for this example'}
            <ArrowRightIcon className='size-4' />
          </Link>
        </div>
      </section>

      <SectionSeparator />
      <section id='measurement' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-4'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {zh ? '我们如何判断工作有没有推动目标' : 'How we evaluate progress toward the goal'}
            </h2>
            <p className='text-muted-foreground text-base leading-7'>
              {zh
                ? '我们采用以下项目内指标，按约定的平台、语言与问题版本分别报告。它们描述实际观测范围；引用、访问和转化分别衡量。'
                : 'We use these project-level definitions and report by the agreed platform, language, and prompt version. Each metric describes its observed scope; citations, visits, and conversions are measured separately.'}
            </p>
          </div>
          <dl className='grid gap-5 md:grid-cols-2'>
            {method.metrics.map(metric => (
              <div key={metric.title.en} className='space-y-4 rounded-2xl border p-6'>
                <dt className='text-xl font-semibold'>{text(metric.title)}</dt>
                <dd className='space-y-4'>
                  <p className='bg-muted/50 rounded-lg p-4 text-sm leading-6'>{text(metric.formula)}</p>
                  <p className='text-muted-foreground text-sm leading-7'>{text(metric.meaning)}</p>
                </dd>
              </div>
            ))}
          </dl>
          <p className='text-muted-foreground max-w-4xl text-sm leading-7'>
            {zh
              ? '复盘会同时附上样本量、失败次数、内容改动日期与平台条件。不同来源的数据不直接拼成一个“全网排名”；出现波动时先回查证据，再确定下一轮测试。'
              : 'Reviews include sample counts, failed attempts, content change dates, and platform conditions. We preserve the distinctions between data sources and investigate the evidence behind changes before choosing the next test.'}
          </p>
          <Link
            href={toLocalizedHref('/services/geo-services/geo-monitoring#example', lang)}
            className='inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4'
          >
            {zh ? '查看监控样本与指标计算示例' : 'See the sample and metric calculations'}
            <ArrowRightIcon className='size-4' />
          </Link>
        </div>
      </section>

      <SectionSeparator />
      <section id='collaboration' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-4'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {zh ? '一套持续推进的合作节奏' : 'A working rhythm that keeps delivery moving'}
            </h2>
            <p className='text-muted-foreground text-base leading-7'>
              {zh
                ? '完整 GEO 项目以六个月为执行节奏，首期建立基础，之后按周推进、按月复盘。具体首批排期根据资料、审核和上线条件确认；单项服务按实际范围约定。'
                : 'The full GEO program follows a six-month cadence, beginning with foundations and continuing through weekly working sessions and monthly reviews. Initial batch dates depend on evidence, approvals, and publishing readiness; focused services are scoped separately.'}
            </p>
          </div>
          <ol className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {method.cadence.map(item => (
              <li key={item.title.en} className='space-y-3 border-t pt-5'>
                <h3 className='font-semibold'>{text(item.title)}</h3>
                <p className='text-muted-foreground text-sm leading-7'>{text(item.description)}</p>
              </li>
            ))}
          </ol>
          <div className='bg-muted/30 grid gap-6 rounded-2xl p-6 sm:p-8 md:grid-cols-2'>
            <div className='space-y-3'>
              <h3 className='font-semibold'>{zh ? 'Meridian 负责' : 'Meridian owns'}</h3>
              <p className='text-muted-foreground text-sm leading-7'>
                {zh
                  ? '研究、策略、Brief、文章与审核材料、技术建议、约定的分发工作、监控记录和复盘；每轮给出明确的下一步建议。'
                  : 'Research, strategy, briefs, articles and review materials, technical recommendations, agreed distribution work, monitoring records, and reporting with clear next actions.'}
              </p>
            </div>
            <div className='space-y-3'>
              <h3 className='font-semibold'>{zh ? '客户配合' : 'The client provides'}</h3>
              <p className='text-muted-foreground text-sm leading-7'>
                {zh
                  ? '准确的产品事实、一手资料、必要权限、指定审核人、官网发布与技术实施。需要视频分发时，提供频道权限、成片与封面素材。'
                  : 'Accurate product facts, first-hand material, necessary access, an approval owner, website publishing, and technical implementation. Video distribution also requires channel access, final videos, and thumbnail assets.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />
      <section id='sources' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-4'>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {zh ? '方法的依据与适用边界' : 'The evidence and scope behind our method'}
            </h2>
            <p className='text-muted-foreground text-base leading-7'>
              {zh
                ? '以上六步是 Meridian 将研究与交付串联的工作方法。我们结合下列公开资料持续调整具体做法，并根据各平台的实际访问和测量条件执行。'
                : 'The six stages above are Meridian’s working process for connecting research and delivery. We use the public guidance below to inform and refine execution within each platform’s actual access and measurement conditions.'}
            </p>
          </div>
          <ul className='divide-y'>
            {method.sources.map(source => (
              <li key={source.href} className='py-5 first:pt-0'>
                <a
                  href={source.href}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sm font-semibold underline underline-offset-4'
                >
                  {source.title}
                </a>
                <p className='text-muted-foreground mt-3 max-w-4xl text-sm leading-7'>{text(source.note)}</p>
              </li>
            ))}
          </ul>
          <p className='text-muted-foreground max-w-4xl border-l-2 pl-4 text-sm leading-7'>
            {zh
              ? '项目承诺的是约定的研究、内容、实施建议与复盘交付。AI 答案由平台生成，我们以可核对的观察持续改进工作，并在报告中说明尚未验证的判断。'
              : 'The engagement commits to the agreed research, content, implementation guidance, and reviews. Platforms generate their own answers; we improve the work through verifiable observations and label conclusions that still need testing.'}
          </p>
        </div>
      </section>

      <SectionSeparator />
      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <h2 className='text-3xl font-semibold tracking-tight'>
            {zh ? '按你当前的阶段，选择需要的服务' : 'Choose the service that fits your next stage'}
          </h2>
          <SubServiceCards services={geoServices} parentSlug='geo-services' lang={lang} />
        </div>
      </section>
      <CTASection
        title={zh ? '把这套方法落到你的品牌上' : 'Apply this method to your brand'}
        description={
          zh
            ? '一起确认你的客户在问什么、现有内容缺什么，以及第一轮最值得推进的工作。'
            : 'Review the questions your buyers ask, the evidence your content needs, and the first work worth prioritizing.'
        }
        buttonLabel={zh ? '预约 GEO 策略沟通' : 'Book a GEO strategy call'}
        pageType='service_methodology'
        serviceType='geo'
        language={lang}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default GeoMethodologyPage
