import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  HeartHandshakeIcon,
  SparklesIcon,
  ShieldCheckIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FAQ from '@/components/blocks/faq/faq'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import CampaignPriceCalculator from '@/components/services/campaign-price-calculator'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import { logos } from '@/assets/data/trusted-brands'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Reddit Marketing Services | Meridian',
  description: 'Reddit marketing packages, campaign execution, delivery standards, and service guarantees for brands that need native community growth.',
  path: '/services/reddit-services',
  keywords: ['reddit marketing services', 'reddit campaign services', 'reddit community management']
})

const servicePackages = [
  {
    level: 'A',
    name: '精准评论',
    price: '$1,500 起',
    description: '以真实讨论语境覆盖目标受众与高意图问题场景。',
    items: ['40 条精准评论', '围绕目标产品、痛点与真实问答场景策划', '适合长期 SEO 与 GEO 内容信号积累'],
    impact: 'Reddit 流量：低 · SEO：高 · GEO：高（训练后）'
  },
  {
    level: 'B',
    name: '品牌社区代运营',
    price: '$1,000 起',
    description: '建立并运营品牌自有 subreddit，沉淀长期可持续的社区讨论与内容资产。',
    items: [
      '品牌专属 subreddit 创建与基础配置',
      '社区规则、版主机制与内容框架设计',
      '每周帖子与评论运营，持续积累品牌话题与 GEO 信号'
    ],
    impact: 'Reddit 流量：中 · SEO：中 · GEO：高'
  },
  {
    level: 'C',
    name: 'Campaign 事件营销',
    price: '$2,500 起',
    description: '面向目标 subreddit 的批次化内容投放与执行，适合活动、节点传播与集中曝光。',
    items: [
      '20 条帖子 / 批次',
      '客户提供初稿后，我们负责 Reddit 风格润色、排期与发布',
      '发布后 3 个自然日内未达量可免费补发'
    ],
    impact: 'Reddit 流量：高 · SEO：中 · GEO：中'
  }
]

const guaranteeChecklist = [
  {
    title: '3 天存活记录说明',
    description: '单篇帖子在线满 3 天才会计入数据。'
  },
  {
    title: '交付总量保障',
    description:
      '我们保障的是合同约定的有效交付总量，而不是某一篇内容必然留在某个指定版块。若内容在 7 天窗口内被删除，不计入交付，并会免费重写、调整角度或更换合适社区补发，直至约定的存活数量达标。'
  },
  {
    title: '透明审核与状态追踪',
    description:
      '社区运营内容与 Campaign 帖子会在发布前进入审核；评论按约定节奏执行。Dashboard 会记录发布状态、链接、删除情况与补发记录，让每一项交付都可追踪、可核对。'
  },
  {
    title: '完整的 Proposal 和交付结案报告',
    description: '每个项目都会提供完整的 proposal，并在交付完成后提供结案报告，方便复盘与归档。'
  },
  {
    title: '链接与图片规则',
    description:
      '帖子类内容是否包含图片与链接，需由社区规则、内容语境与合作范围共同决定。正文链接属于付费加购项；评论链接是否可用也以实际社区规则为准。'
  }
]

const addOns = [
  { title: '浏览量承诺', price: '+20%', description: '如需将浏览量承诺写入 campaign 范围，按对应套餐价格加收 20%。' },
  {
    title: '帖内链接',
    price: '+30%',
    description:
      '帖子正文链接并非默认交付。购买加购项后，才会在社区内容或 Campaign 帖子中配置链接，并始终遵循 subreddit 规则。'
  },
  {
    title: '高级存活保障',
    price: '+30%',
    description: '在 7 天窗口内提升“有效交付”判定标准：未折叠、账号状态、原帖与评论状态均需满足约定，否则免费补发。'
  }
]

const campaignSteps = [
  ['Subreddit 沟通对接', '在每个 campaign 开始前沟通目标社区的规则、内容方向与排期。'],
  ['Reddit 风格润色', '基于客户提供的初稿完成 20 篇内容的 Reddit 原生化润色，降低审核与营销感风险。'],
  ['20 条帖子执行发布', '按照目标 Subreddit 与美国用户活跃时段，完成定时发布与发布记录。'],
  ['3 天补发保障', '帖子在发布后 3 个自然日内因删除或审核失败未达量，将免费补发，补发数量不超过原批次。']
]

const redditFaqItems = [
  {
    question: 'Subreddit 怎么找？',
    answer:
      '我们不会只看订阅量或表面热度，而是先根据产品品类、目标用户、关键词、历史讨论主题和社区规则做筛选。\n\n实际执行时会重点看：是否真的有目标用户、版规是否允许相关内容、社区对品牌或链接的容忍度、近期活跃度，以及相似内容过去的表现。通常会先建立候选池，再小范围测试，再逐步放大。'
  },
  {
    question: '你们账号 karma 值怎么样，post 全部都是 200 以上的吗？',
    answer: '是的，发帖账号会使用 post karma 200 以上的账号。'
  },
  {
    question: '如何衡量 Reddit 服务效果？',
    answer:
      '我们会根据项目目标跟踪以下指标：\n\n- 发布及留存的帖子和评论\n- 内容是否在目标 Subreddit 成功上线并存活\n- 评论、回复、点赞等基础互动\n- 品牌提及、搜索收录、AI 引用或导流表现（如项目范围内可追踪）\n\n核心不是只看单条爆款，而是看一段时间内是否稳定产出可留存、可被用户看到、并对品牌发现有帮助的内容资产。'
  },
  {
    question: '你们能保证帖子不会被删除吗？',
    answer:
      '不能保证。帖子是否保留由 Reddit 平台、Subreddit 版主和社区规则决定。\n\n我们会提前研究规则，控制发布频率、内容表达、链接和品牌提及方式，尽量降低删除或账号受限的风险，但不会作出“永久留帖”或“零封号”的承诺。'
  },
  {
    question: '内容会直接推广我们的产品吗？',
    answer:
      '不一定。Reddit 用户通常不喜欢明显的广告内容，因此我们会根据具体场景选择合适的品牌露出方式。\n\n内容可能包括经验分享、问题解答、产品对比、使用案例、行业讨论或资源推荐。只有在品牌确实能解决用户问题时，才会自然提及产品。'
  }
]

const RedditServicesPage = () => {
  return (
    <>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-14 -left-24 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-16 bottom-0 size-72 rounded-full blur-3xl' />

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Reddit Services
            </Badge>
            <div className='max-w-4xl space-y-5'>
              <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                Reddit 营销服务：套餐、交付与保障
              </h1>
              <p className='text-muted-foreground max-w-3xl text-lg leading-8'>
                从精准评论、品牌社区代运营到 Campaign 事件营销，我们将 Reddit
                原生内容、社区语境和可追踪交付整合为三种更清晰的服务选择。
              </p>
            </div>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  预约 Reddit 策略沟通
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='#service-guarantee'>查看服务保障</Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <TrustedBrands brandLogos={logos} title='服务过从初创公司到行业头部企业的团队。' />

      <SectionSeparator />

      <section id='service-overview' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              价格总览
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>按增长目标选择三种核心 Reddit 服务。</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              所有价格按单次 campaign 计算，单个 campaign 周期为 1 个月或以上，可根据品牌发布节奏安排为快节奏（约 1
              个月）或稳健节奏（2–3 个月）。
            </p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {servicePackages.map(servicePackage => (
              <Card key={servicePackage.name} className='bg-card/85 flex h-full flex-col border'>
                <CardHeader className='space-y-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <Badge variant='outline' className='h-auto px-3 py-1 text-xs font-medium'>
                      {servicePackage.level}
                    </Badge>
                    <span className='text-primary text-xl font-semibold'>{servicePackage.price}</span>
                  </div>
                  <div className='space-y-2'>
                    <CardTitle className='text-2xl'>{servicePackage.name}</CardTitle>
                    <CardDescription className='text-sm leading-6'>{servicePackage.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className='flex flex-1 flex-col gap-5'>
                  <ul className='space-y-3'>
                    {servicePackage.items.map(item => (
                      <li key={item} className='flex items-start gap-3 text-sm leading-6'>
                        <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className='text-muted-foreground bg-background/60 mt-auto rounded-xl border px-3 py-2 text-xs leading-5'>
                    {servicePackage.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section id='campaign-execution' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start'>
            <div className='space-y-5'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                Campaign 投放服务
              </Badge>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>20 条帖子 / 批次，$2,500 起。</h2>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
                Campaign
                适合已有内容初稿、需要集中在目标社区完成沟通、润色、排期和发布执行的团队。客户提供初稿，我们完成 Reddit
                风格的内容优化与全流程发布跟进。
              </p>
              <div className='grid gap-3'>
                <div className='bg-card/80 rounded-2xl border p-4'>
                  <p className='text-muted-foreground text-xs'>标准批次</p>
                  <p className='mt-1 text-lg font-semibold'>20 条帖子</p>
                </div>
              </div>
            </div>

            <div className='grid gap-4'>
              {campaignSteps.map(([title, description], index) => (
                <div key={title} className='bg-card/80 flex gap-4 rounded-2xl border p-5'>
                  <span className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className='space-y-1.5'>
                    <h3 className='font-semibold'>{title}</h3>
                    <p className='text-muted-foreground text-sm leading-6'>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CampaignPriceCalculator />
        </div>
      </section>

      <SectionSeparator />

      <section id='service-guarantee' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-4xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              服务承诺与保障
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>我们的服务承诺与保障</h2>
          </div>

          <Card className='bg-card/85 border'>
            <CardContent className='p-0'>
              <ul className='divide-border divide-y'>
                {guaranteeChecklist.map(item => (
                  <li key={item.title} className='flex gap-4 px-6 py-5 sm:px-7'>
                    <div className='bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl'>
                      <ShieldCheckIcon className='size-4' />
                    </div>
                    <div className='space-y-1.5'>
                      <h3 className='text-base font-semibold sm:text-lg'>{item.title}</h3>
                      <p className='text-muted-foreground text-sm leading-6 whitespace-pre-line sm:text-[15px]'>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              加购与付款方式
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              在执行前明确需要的保障等级与协作节奏。
            </h2>
            <p className='text-muted-foreground text-base leading-7'>
              支持两种里程碑付款：签约支付 70%，campaign 结束验收后支付 30%；或签约支付 50%，交付量达到 50%（以
              Dashboard 数据为准）时支付剩余 50%。如当期款项未到账，后续交付可暂停并在恢复后顺延。
            </p>
            <div className='bg-card/80 rounded-2xl border p-5'>
              <div className='flex items-start gap-3'>
                <CircleDollarSignIcon className='text-primary mt-0.5 size-5 shrink-0' />
                <p className='text-sm leading-6'>
                  服务价格与加购项均在 campaign 确认前写入合作范围；需要定制内容创作、额外 PR
                  或更高保障等级时，可在策略沟通中单独确定。
                </p>
              </div>
            </div>
          </div>
          <div className='grid gap-4'>
            {addOns.map(addOn => (
              <Card key={addOn.title} className='bg-card/85 border'>
                <CardContent className='flex gap-4 p-5'>
                  <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl'>
                    <SparklesIcon className='size-4' />
                  </div>
                  <div className='space-y-1.5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h3 className='font-semibold'>{addOn.title}</h3>
                      <Badge variant='outline' className='h-auto px-2 py-0.5 text-xs'>
                        {addOn.price}
                      </Badge>
                    </div>
                    <p className='text-muted-foreground text-sm leading-6'>{addOn.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <FAQ faqItems={redditFaqItems} eyebrow='Reddit FAQ' title='常见问题' description='' visualVariant='compact' />

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <Card className='bg-card/85 mx-auto max-w-7xl overflow-hidden border'>
          <CardContent className='relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12'>
            <div className='bg-primary/10 absolute -top-20 -right-20 size-64 rounded-full blur-3xl' />
            <div className='relative max-w-2xl space-y-4'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                <HeartHandshakeIcon className='size-5' />
              </div>
              <h2 className='text-3xl font-semibold tracking-tight'>想确认哪种 Reddit 组合更适合当前目标？</h2>
              <p className='text-muted-foreground text-base leading-7'>
                我们可以围绕目标用户、产品成熟度、内容素材与风险偏好，推荐从精准评论、品牌社区代运营或 Campaign
                中优先启动的一种。
              </p>
            </div>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                预约咨询
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default RedditServicesPage
