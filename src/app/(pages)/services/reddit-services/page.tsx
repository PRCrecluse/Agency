import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  ClipboardCheckIcon,
  Clock3Icon,
  FileCheck2Icon,
  GaugeIcon,
  HeartHandshakeIcon,
  MessageCircleMoreIcon,
  MessagesSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersRoundIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FAQ from '@/components/blocks/faq/faq'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'

export const metadata: Metadata = {
  title: 'Reddit Marketing Services | Meridian',
  description: 'Reddit marketing packages, campaign execution, delivery standards, and service guarantees.'
}

const servicePackages = [
  {
    level: '附加',
    name: '仅发帖',
    price: '$60 / 帖',
    description: '适合需要单篇 Reddit 内容发布支持的品牌。',
    items: ['1 篇在 Reddit 可见并在线满 7 天的帖子', '7 天内未存活则免费重写并补发至达量', '按社区规则与内容语境选择合适发布路径'],
    impact: 'Reddit 流量：中 · SEO：中 · GEO：中'
  },
  {
    level: 'A',
    name: '精准评论',
    price: '$1,000',
    description: '以真实讨论语境覆盖目标受众与高意图问题场景。',
    items: ['40 条精准评论', '围绕目标产品、痛点与真实问答场景策划', '适合长期 SEO 与 GEO 内容信号积累'],
    impact: 'Reddit 流量：低 · SEO：高 · GEO：高（训练后）'
  },
  {
    level: 'B',
    name: '清单帖',
    price: '$1,000',
    description: '以共同使用场景聚合工具与产品，兼顾内容覆盖与自然发现。',
    items: ['16 篇清单帖', '发布前提供涉及品牌与场景的内容审核', '纯文字内容；同一清单可由多个客户共同参与'],
    impact: 'Reddit 流量：高 · SEO：中 · GEO：中（训练后）'
  },
  {
    level: 'C',
    name: '专属帖',
    price: '$1,000',
    description: '面向品牌叙事、搜索排名与 AI 引用的定制内容。',
    items: ['5 篇专属帖，故事型与 SEO 型可自由搭配', '每篇配 8+ 条高质量评论', '每篇最多 1 张图片与 1 个付费加购链接'],
    impact: 'Reddit 流量：高 · SEO：中至高 · GEO：中至高'
  },
  {
    level: 'D',
    name: '品牌社区',
    price: '$1,000',
    description: '建立和运营品牌专属社区，沉淀可持续的用户讨论与内容资产。',
    items: ['社区创建、规则与版主机制设计', '每周帖子和评论运营', '适合建立品牌话题、信任与 GEO 信号'],
    impact: 'Reddit 流量：中 · SEO：中 · GEO：高'
  },
  {
    level: '组合',
    name: '任选 2 个套餐',
    price: '$1,800',
    description: '从 A–D 中任选两项，以更平衡的方式覆盖内容、互动与社区。',
    items: ['任选 A–D 中的 2 个套餐', '按单次 campaign 报价', '组合套餐享 9 折'],
    impact: 'Reddit 流量：高 · SEO：高 · GEO：高'
  },
  {
    level: '专业',
    name: '全服务',
    price: '$3,200',
    description: '以完整服务组合承接 Reddit 内容、评论、专属帖、社区与 PR 推广。',
    items: ['覆盖 A–D 全部服务', '包含 PR 推广方向', '按单次 campaign 报价，组合享 8 折'],
    impact: 'Reddit 流量：极高 · SEO：极高 · GEO：极高'
  }
]

const guaranteeItems = [
  {
    icon: ShieldCheckIcon,
    title: '交付总量保障',
    description:
      '我们保障的是合同约定的有效交付总量，而不是某一篇内容必然留在某个指定版块。若内容在 7 天窗口内被删除，不计入交付，并会免费重写、调整角度或更换合适社区补发，直至约定的存活数量达标。'
  },
  {
    icon: Clock3Icon,
    title: '7 天存活计入交付',
    description:
      '一篇内容在 Reddit 上可见并在线满 7 天，才会计入该套餐的交付总量。7 天后视为交付完成，后续因版主清理或平台批量处理而发生的变化不再回溯。Campaign 批次另提供发布后 3 个自然日内的免费补发保障。'
  },
  {
    icon: ClipboardCheckIcon,
    title: '透明审核与状态追踪',
    description:
      '专属帖与清单帖均在发布前进入内容审核；评论可按约定自动化执行。Dashboard 会记录发布状态、链接、删除情况与补发记录，让每一项交付都可追踪、可核对。'
  },
  {
    icon: FileCheck2Icon,
    title: '事实准确性保障',
    description: '如已交付内容出现事实性错误，我们将免费修正或重新创建，确保品牌、产品与关键信息表达准确。'
  }
]

const addOns = [
  { title: '浏览量承诺', price: '+20%', description: '如需将浏览量承诺写入 campaign 范围，按对应套餐价格加收 20%。' },
  { title: '帖内链接', price: '+30%', description: '帖子正文链接并非默认交付。购买加购项后，才会在专属帖或清单帖中配置链接，并始终遵循 subreddit 规则。' },
  { title: '高级存活保障', price: '+30%', description: '在 7 天窗口内提升“有效交付”判定标准：未折叠、账号状态、原帖与评论状态均需满足约定，否则免费补发。' }
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
    answer:
      '不一定，也不会把单一 karma 数字当成唯一标准。\n\n我们更看重账号是否健康、历史行为是否自然、和目标 Subreddit 的语境是否匹配，以及账号过往的发帖和评论记录。有些项目会使用更成熟的账号，但不会承诺“全部账号 post karma 都在 200 以上”，因为不同社区的门槛、偏好和通过率并不一样。'
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
        <div className='bg-primary/12 absolute -left-24 top-14 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-16 bottom-0 size-72 rounded-full blur-3xl' />

        <div className='relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end'>
          <div className='space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Reddit Services
            </Badge>
            <div className='max-w-4xl space-y-5'>
              <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>Reddit 营销服务：套餐、交付与保障</h1>
              <p className='text-muted-foreground max-w-3xl text-lg leading-8'>
                从精准评论、清单帖和专属帖，到品牌社区与完整 Campaign 执行，我们将 Reddit 原生内容、社区语境和可追踪交付整合为一套可按目标灵活组合的服务。
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

          <Card className='border bg-card/85 backdrop-blur-sm'>
            <CardContent className='grid gap-5 p-6 sm:p-8'>
              <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
                <GaugeIcon className='size-5' />
              </div>
              <div className='space-y-3'>
                <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>服务总览</p>
                <p className='text-xl font-semibold tracking-tight'>把内容、社区与可见性放进同一套 Reddit 增长系统。</p>
                <div className='grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
                  <div className='rounded-2xl border bg-background/65 p-4'>
                    <p className='text-muted-foreground text-xs'>套餐选择</p>
                    <p className='mt-1 font-semibold'>单项、组合或全服务</p>
                  </div>
                  <div className='rounded-2xl border bg-background/65 p-4'>
                    <p className='text-muted-foreground text-xs'>活动周期</p>
                    <p className='mt-1 font-semibold'>每个 campaign 1 个月起</p>
                  </div>
                  <div className='rounded-2xl border bg-background/65 p-4'>
                    <p className='text-muted-foreground text-xs'>交付方式</p>
                    <p className='mt-1 font-semibold'>Dashboard 实时追踪</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section id='service-overview' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              价格总览
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>按增长目标选择最合适的 Reddit 服务组合。</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              所有价格按单次 campaign 计算，单个 campaign 周期为 1 个月或以上，可根据品牌发布节奏安排为快节奏（约 1 个月）或稳健节奏（2–3 个月）。
            </p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {servicePackages.map(servicePackage => (
              <Card key={servicePackage.name} className='flex h-full flex-col border bg-card/85'>
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
                  <p className='text-muted-foreground mt-auto rounded-xl border bg-background/60 px-3 py-2 text-xs leading-5'>
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
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Campaign 投放服务
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>20 条帖子 / 批次，$2,500 USD。</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              Campaign 适合已有内容初稿、需要集中在目标社区完成沟通、润色、排期和发布执行的团队。客户提供初稿，我们完成 Reddit 风格的内容优化与全流程发布跟进。
            </p>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border bg-card/80 p-4'>
                <p className='text-muted-foreground text-xs'>标准批次</p>
                <p className='mt-1 text-lg font-semibold'>20 条帖子</p>
              </div>
              <div className='rounded-2xl border bg-card/80 p-4'>
                <p className='text-muted-foreground text-xs'>单条均价</p>
                <p className='mt-1 text-lg font-semibold'>$125 USD</p>
              </div>
            </div>
          </div>
          <div className='grid gap-4'>
            {campaignSteps.map(([title, description], index) => (
              <div key={title} className='flex gap-4 rounded-2xl border bg-card/80 p-5'>
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
      </section>

      <SectionSeparator />

      <section id='service-guarantee' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-4xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              服务承诺与保障
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>用可验证的交付标准，替代无法控制的结果承诺。</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              我们的保障针对已审核并交付的 Reddit 内容，包括帖子、评论、点赞与互动。历史数据或下游转化，如浏览量、点赞、注册、付费、GitHub Star、安装和预约，仅用于帮助理解过往表现，不构成结果承诺。
            </p>
          </div>

          <div className='grid gap-5 md:grid-cols-2'>
            {guaranteeItems.map(item => {
              const Icon = item.icon

              return (
                <Card key={item.title} className='border bg-card/85'>
                  <CardContent className='flex gap-4 p-6'>
                    <div className='bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-2xl'>
                      <Icon className='size-5' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-lg font-semibold'>{item.title}</h3>
                      <p className='text-muted-foreground text-sm leading-6'>{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className='grid gap-5 lg:grid-cols-3'>
            <Card className='border bg-background/75'>
              <CardContent className='space-y-3 p-6'>
                <MessagesSquareIcon className='text-primary size-5' />
                <h3 className='font-semibold'>专属帖的交付边界</h3>
                <p className='text-muted-foreground text-sm leading-6'>每篇专属帖承诺配置 8+ 条高质量评论。历史上出现的点赞或浏览量为观测值，受产品、版块和发布时间影响，不作为保证。</p>
              </CardContent>
            </Card>
            <Card className='border bg-background/75'>
              <CardContent className='space-y-3 p-6'>
                <MessageCircleMoreIcon className='text-primary size-5' />
                <h3 className='font-semibold'>链接与图片规则</h3>
                <p className='text-muted-foreground text-sm leading-6'>专属帖最多包含 1 张图片和 1 个链接。正文链接属于付费加购项；评论链接是否可用须由社区规则与讨论语境决定。</p>
              </CardContent>
            </Card>
            <Card className='border bg-background/75'>
              <CardContent className='space-y-3 p-6'>
                <UsersRoundIcon className='text-primary size-5' />
                <h3 className='font-semibold'>社区选择原则</h3>
                <p className='text-muted-foreground text-sm leading-6'>若某社区连续两次拒绝内容，我们将更换条件相近的版块，而非持续冲击同一社区或消耗账号。保障的是有效数量，不是指定版块。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              加购与付款方式
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>在执行前明确需要的保障等级与协作节奏。</h2>
            <p className='text-muted-foreground text-base leading-7'>
              支持两种里程碑付款：签约支付 70%，campaign 结束验收后支付 30%；或签约支付 50%，交付量达到 50%（以 Dashboard 数据为准）时支付剩余 50%。如当期款项未到账，后续交付可暂停并在恢复后顺延。
            </p>
            <div className='rounded-2xl border bg-card/80 p-5'>
              <div className='flex items-start gap-3'>
                <CircleDollarSignIcon className='text-primary mt-0.5 size-5 shrink-0' />
                <p className='text-sm leading-6'>服务价格与加购项均在 campaign 确认前写入合作范围；需要定制内容创作、额外 PR 或更高保障等级时，可在策略沟通中单独确定。</p>
              </div>
            </div>
          </div>
          <div className='grid gap-4'>
            {addOns.map(addOn => (
              <Card key={addOn.title} className='border bg-card/85'>
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

      <FAQ
        faqItems={redditFaqItems}
        eyebrow='Reddit FAQ'
        title='关于 Reddit 服务，先把最关键的问题说清楚'
        description='从 Subreddit 筛选、账号要求到效果衡量和内容边界，这里是合作前最常被问到的几个核心问题。'
        visualVariant='compact'
      />

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <Card className='mx-auto max-w-7xl overflow-hidden border bg-card/85'>
          <CardContent className='relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12'>
            <div className='bg-primary/10 absolute -right-20 -top-20 size-64 rounded-full blur-3xl' />
            <div className='relative max-w-2xl space-y-4'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                <HeartHandshakeIcon className='size-5' />
              </div>
              <h2 className='text-3xl font-semibold tracking-tight'>想确认哪种 Reddit 组合更适合当前目标？</h2>
              <p className='text-muted-foreground text-base leading-7'>
                我们可以围绕目标用户、产品成熟度、内容素材与风险偏好，推荐从评论、清单帖、专属帖、社区或 Campaign 中优先启动的组合。
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
