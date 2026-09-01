import type { SpecializedServiceLang } from '@/content/specialized-service-pages'

type RedditServicePackage = {
  level: string
  name: string
  price: string
  description: string
  items: string[]
  impact: string
}

type RedditServiceListItem = {
  title: string
  description: string
}

type RedditFaqItem = {
  question: string
  answer: string
}

export type RedditServicesContent = {
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    badge: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
  trustedBrandsTitle: string
  overview: {
    eyebrow: string
    title: string
    description: string
  }
  servicePackages: RedditServicePackage[]
  campaign: {
    eyebrow: string
    title: string
    description: string
    batchLabel: string
    batchValue: string
    steps: Array<[string, string]>
    calculator: {
      title: string
      description: string
      quantityLabel: string
      quantitySuffix: string
      adjustLabel: string
      ariaLabel: string
      estimateLabel: string
      estimateNote: string
    }
  }
  guarantee: {
    eyebrow: string
    title: string
    items: RedditServiceListItem[]
  }
  addOns: {
    eyebrow: string
    title: string
    description: string
    paymentNote: string
    items: Array<RedditServiceListItem & { price: string }>
  }
  faq: {
    eyebrow: string
    title: string
    items: RedditFaqItem[]
  }
  closing: {
    title: string
    description: string
    cta: string
  }
}

export const redditServicesContent: Record<SpecializedServiceLang, RedditServicesContent> = {
  en: {
    metadata: {
      title: 'Reddit Marketing Services, Packages & Delivery | Meridian',
      description:
        'Compare Reddit marketing packages, community management, campaign execution, delivery standards, and service guarantees from Meridian.',
      keywords: ['reddit marketing services', 'reddit campaign services', 'reddit community management']
    },
    hero: {
      badge: 'Reddit Services',
      title: 'Reddit Marketing Services: Packages, Delivery, and Guarantees',
      description:
        'Choose from targeted comments, brand community management, and campaign execution—each designed around Reddit-native content, community context, and trackable delivery.',
      primaryCta: 'Book a Reddit Strategy Call',
      secondaryCta: 'Review Delivery Standards'
    },
    trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
    overview: {
      eyebrow: 'Package Overview',
      title: 'Choose the Reddit service that matches your growth objective.',
      description:
        'Pricing is scoped per campaign. A campaign runs for at least one month and can follow a focused one-month schedule or a steadier two-to-three-month cadence.'
    },
    servicePackages: [
      {
        level: 'A',
        name: 'Targeted Comments',
        price: 'From $1,500',
        description: 'Join relevant, high-intent conversations with useful responses shaped for the community context.',
        items: [
          '40 targeted comments',
          'Planned around product fit, buyer pain points, and real question threads',
          'Designed to support durable SEO and GEO signals'
        ],
        impact: 'Reddit traffic: Low · SEO: High · GEO: High over time'
      },
      {
        level: 'B',
        name: 'Brand Community Management',
        price: 'From $1,000',
        description: 'Build and operate a branded subreddit that can compound into a durable community asset.',
        items: [
          'Branded subreddit setup and configuration',
          'Community rules, moderation model, and content framework',
          'Weekly posts and comment participation to build ongoing discussion signals'
        ],
        impact: 'Reddit traffic: Medium · SEO: Medium · GEO: High'
      },
      {
        level: 'C',
        name: 'Campaign Execution',
        price: 'From $2,500',
        description:
          'Run a coordinated batch of Reddit-native posts for launches, events, and concentrated visibility.',
        items: [
          '20 posts per batch',
          'Your team provides initial drafts; we adapt, schedule, and publish them for Reddit',
          'Replacement support when the agreed three-day delivery threshold is not met'
        ],
        impact: 'Reddit traffic: High · SEO: Medium · GEO: Medium'
      }
    ],
    campaign: {
      eyebrow: 'Campaign Execution',
      title: '20 posts per batch, starting at $2,500.',
      description:
        'Campaign execution is designed for teams that already have initial material and need subreddit planning, Reddit-native editing, scheduling, publishing, and transparent delivery tracking.',
      batchLabel: 'Standard batch',
      batchValue: '20 posts',
      steps: [
        [
          'Subreddit alignment',
          'Confirm community rules, content direction, and publishing windows before each campaign.'
        ],
        [
          'Reddit-native editing',
          'Adapt 20 initial drafts to reduce promotional friction and better match Reddit conventions.'
        ],
        ['Batch publishing', 'Publish across the agreed subreddits and timing windows with a visible status record.'],
        [
          'Three-day replacement support',
          'Replace posts that fail the agreed three-day delivery threshold, up to the original batch size.'
        ]
      ],
      calculator: {
        title: 'Campaign Price Calculator',
        description: 'Adjust the post count to estimate execution budget at the current rate of $125 USD per post.',
        quantityLabel: 'Post count',
        quantitySuffix: 'posts',
        adjustLabel: 'Drag to adjust',
        ariaLabel: 'Campaign post count',
        estimateLabel: 'Estimated total',
        estimateNote:
          'A 20-post batch starts at $2,500 USD. Links, view guarantees, and enhanced delivery terms are priced separately.'
      }
    },
    guarantee: {
      eyebrow: 'Delivery Standards',
      title: 'How delivery, review, and replacement are handled',
      items: [
        {
          title: 'Three-day live-status record',
          description: 'A post is counted in the delivery record after it has remained live for three days.'
        },
        {
          title: 'Total delivery commitment',
          description:
            'The commitment applies to the contracted volume of qualifying deliveries. If a post is removed within the seven-day window, it is excluded and replaced through a rewrite, angle adjustment, or better-matched community until the agreed live volume is reached.'
        },
        {
          title: 'Review and status tracking',
          description:
            'Community and campaign posts enter review before publishing; comments follow the agreed operating rhythm. The delivery log records URLs, publishing status, removals, and replacements.'
        },
        {
          title: 'Proposal and completion report',
          description:
            'Each engagement includes a proposal and a completion report for review and internal recordkeeping.'
        },
        {
          title: 'Link and image rules',
          description:
            'Images and links depend on subreddit rules, content context, and the agreed scope. In-post links are an add-on; comment links remain subject to the rules of the relevant community.'
        }
      ]
    },
    addOns: {
      eyebrow: 'Add-ons and Payment',
      title: 'Set the delivery standard and collaboration rhythm before execution.',
      description:
        'Choose either 70% at signing and 30% after campaign acceptance, or 50% at signing and 50% when half of the agreed delivery volume is recorded. Delivery may pause when a scheduled payment is overdue and resume on an adjusted timeline after payment.',
      paymentNote:
        'Campaign pricing and add-ons are documented before execution. Custom content creation, additional PR support, and enhanced delivery terms can be scoped separately.',
      items: [
        {
          title: 'View guarantee',
          price: '+20%',
          description: 'Add a defined campaign-level view commitment for 20% of the applicable package price.'
        },
        {
          title: 'In-post links',
          price: '+30%',
          description: 'Add links to eligible community or campaign posts while following the rules of each subreddit.'
        },
        {
          title: 'Enhanced live-status standard',
          price: '+30%',
          description:
            'Apply stricter seven-day qualification rules covering visibility, account status, original-post status, and comment status, with replacement support when the agreed conditions are not met.'
        }
      ]
    },
    faq: {
      eyebrow: 'Reddit FAQ',
      title: 'Common questions about Reddit marketing services',
      items: [
        {
          question: 'How do you select subreddits?',
          answer:
            'We evaluate product-category fit, target users, keywords, recent discussion themes, and community rules—not just subscriber count.\n\nThe shortlist is reviewed for audience relevance, rule compatibility, activity, tolerance for brand mentions or links, and the performance of similar content. We usually start with a focused test before expanding.'
        },
        {
          question: 'What account standards do you use for posting?',
          answer:
            'Posting accounts are selected according to the requirements of the target subreddit and the agreed risk controls. For campaign posting, the current operating standard uses accounts with at least 200 post karma.'
        },
        {
          question: 'How do you measure performance?',
          answer:
            'Measurement depends on the engagement goal and can include published and retained posts or comments, successful placement in target subreddits, replies and votes, brand mentions, search visibility, AI citations, and attributable referral traffic when tracking is available.\n\nThe aim is to evaluate whether the program consistently creates useful, discoverable content assets—not whether one post becomes an isolated spike.'
        },
        {
          question: 'Can you guarantee that posts will never be removed?',
          answer:
            'No. Reddit, subreddit moderators, and community rules determine whether a post remains live.\n\nWe reduce avoidable risk through rule research, publishing cadence, content fit, and careful use of links and brand mentions. Permanent survival and zero account restrictions cannot be guaranteed.'
        },
        {
          question: 'Will every post directly promote our product?',
          answer:
            'No. Reddit users typically reject obvious advertising. The right approach depends on the discussion context.\n\nContent may take the form of practical experience, answers, comparisons, use cases, industry discussion, or resource recommendations. A product is mentioned only when it is genuinely relevant to the problem being discussed.'
        }
      ]
    },
    closing: {
      title: 'Which Reddit service should you start with?',
      description:
        'We can recommend a focused starting point across targeted comments, brand community management, and campaign execution based on your audience, product maturity, available material, and risk tolerance.',
      cta: 'Book a Strategy Call'
    }
  },
  zh: {
    metadata: {
      title: 'Reddit 营销服务、套餐与交付 | Meridian',
      description: '查看 Meridian 的 Reddit 营销套餐、社区代运营、Campaign 执行、交付标准与服务保障。',
      keywords: ['Reddit 营销服务', 'Reddit Campaign 服务', 'Reddit 社区代运营']
    },
    hero: {
      badge: 'Reddit 服务',
      title: 'Reddit 营销服务：套餐与交付保障',
      description:
        '从精准评论、品牌社区代运营到 Campaign 执行，我们将 Reddit 原生内容、社区语境和可追踪交付整理为三种清晰选择。',
      primaryCta: '预约 Reddit 策略沟通',
      secondaryCta: '查看交付标准'
    },
    trustedBrandsTitle: '服务经验覆盖初创公司与行业头部企业团队。',
    overview: {
      eyebrow: '套餐总览',
      title: '按增长目标选择合适的 Reddit 服务。',
      description: '所有价格按单次 Campaign 计算，周期至少一个月，可安排为约一个月的集中节奏，或两至三个月的稳健节奏。'
    },
    servicePackages: [
      {
        level: 'A',
        name: '精准评论',
        price: '$1,500 起',
        description: '在相关的高意图讨论中提供符合社区语境的有效回复。',
        items: ['40 条精准评论', '围绕产品匹配度、受众痛点与真实问答场景策划', '用于持续积累 SEO 与 GEO 信号'],
        impact: 'Reddit 流量：低 · SEO：高 · GEO：长期高'
      },
      {
        level: 'B',
        name: '品牌社区代运营',
        price: '$1,000 起',
        description: '建立并运营品牌自有 subreddit，沉淀可持续的社区内容资产。',
        items: [
          '品牌 subreddit 创建与基础配置',
          '社区规则、版主机制与内容框架设计',
          '通过每周帖子和评论持续积累讨论信号'
        ],
        impact: 'Reddit 流量：中 · SEO：中 · GEO：高'
      },
      {
        level: 'C',
        name: 'Campaign 执行',
        price: '$2,500 起',
        description: '面向上线、活动和集中曝光需求，执行批次化 Reddit 原生内容。',
        items: [
          '20 条帖子 / 批次',
          '合作团队提供初稿，我们负责 Reddit 风格润色、排期与发布',
          '未达到约定的三天交付标准时提供补发支持'
        ],
        impact: 'Reddit 流量：高 · SEO：中 · GEO：中'
      }
    ],
    campaign: {
      eyebrow: 'Campaign 执行',
      title: '20 条帖子 / 批次，$2,500 起。',
      description: '适合已有初始素材，需要完成 subreddit 规划、Reddit 风格润色、排期、发布和透明交付追踪的团队。',
      batchLabel: '标准批次',
      batchValue: '20 条帖子',
      steps: [
        ['Subreddit 对接', '在每轮 Campaign 前确认社区规则、内容方向与发布时间。'],
        ['Reddit 风格润色', '将 20 篇初稿调整为营销感更低、更符合 Reddit 习惯的内容。'],
        ['批次发布', '按照约定的 subreddit 与活跃时段完成发布，并保留状态记录。'],
        ['三天补发支持', '未达到约定三天交付标准的帖子可补发，补发数量不超过原批次。']
      ],
      calculator: {
        title: 'Campaign 价格计算器',
        description: '调整帖子数量，按当前每条 $125 USD 估算执行预算。',
        quantityLabel: '帖子数量',
        quantitySuffix: '条',
        adjustLabel: '拖动调整',
        ariaLabel: 'Campaign 帖子数量',
        estimateLabel: '预估总价',
        estimateNote: '20 条帖子批次起步价为 $2,500 USD。链接、浏览量承诺和更高交付标准单独计费。'
      }
    },
    guarantee: {
      eyebrow: '交付标准',
      title: '交付、审核与补发如何处理',
      items: [
        { title: '三天在线状态记录', description: '单篇帖子在线满三天后计入交付记录。' },
        {
          title: '交付总量承诺',
          description:
            '保障范围以合同约定的有效交付总量为准。帖子在七天窗口内被删除时不计入交付，并通过重写、调整角度或更换合适社区完成补发，直至达到约定在线数量。'
        },
        {
          title: '审核与状态追踪',
          description:
            '社区内容和 Campaign 帖子在发布前进入审核；评论按约定节奏执行。交付日志记录链接、发布状态、删除情况与补发记录。'
        },
        {
          title: 'Proposal 与结案报告',
          description: '每项合作均提供 Proposal，并在交付完成后提供结案报告，方便复盘与归档。'
        },
        {
          title: '链接与图片规则',
          description:
            '图片和链接根据 subreddit 规则、内容语境与合作范围决定。帖内链接属于加购项；评论链接仍需遵循对应社区规则。'
        }
      ]
    },
    addOns: {
      eyebrow: '加购与付款',
      title: '执行前确认交付标准与协作节奏。',
      description:
        '可选择签约支付 70%、Campaign 验收后支付 30%；也可签约支付 50%，约定交付量完成一半时支付剩余 50%。约定款项逾期时交付可暂停，到账后按调整后的时间继续。',
      paymentNote: 'Campaign 价格与加购项在执行前写入合作范围。定制内容创作、额外 PR 支持和更高交付标准可以单独确认。',
      items: [
        { title: '浏览量承诺', price: '+20%', description: '增加 Campaign 级浏览量承诺，费用为对应套餐价格的 20%。' },
        { title: '帖内链接', price: '+30%', description: '在符合社区规则的帖子中增加链接。' },
        {
          title: '高级在线状态标准',
          price: '+30%',
          description:
            '在七天窗口内增加可见状态、账号状态、原帖状态和评论状态等判定条件，未达到约定条件时提供补发支持。'
        }
      ]
    },
    faq: {
      eyebrow: 'Reddit FAQ',
      title: 'Reddit 营销服务常见问题',
      items: [
        {
          question: '如何选择 Subreddit？',
          answer:
            '我们会综合产品类型、目标用户、关键词、近期讨论主题和社区规则，不只看订阅量。\n\n候选社区需要审查受众相关度、版规兼容性、活跃度、对品牌提及或链接的接受度，以及相似内容的历史表现。通常先进行小范围测试，再逐步扩大。'
        },
        {
          question: '发帖账号采用什么标准？',
          answer:
            '发帖账号会根据目标 subreddit 的要求和约定的风险控制标准进行选择。Campaign 发帖当前采用 post karma 不低于 200 的账号。'
        },
        {
          question: '如何衡量 Reddit 服务效果？',
          answer:
            '指标根据合作目标确定，可以包括已发布和留存的帖子或评论、目标 subreddit 上线情况、回复与点赞、品牌提及、搜索可见度、AI 引用，以及具备追踪条件时的引荐流量。\n\n重点在于持续形成有用、可被发现的内容资产，单条帖子的短期峰值只作为其中一个观察信号。'
        },
        {
          question: '可以保证帖子永远不被删除吗？',
          answer:
            '无法保证。帖子是否保留由 Reddit 平台、subreddit 版主和社区规则决定。\n\n我们通过规则研究、发布节奏、内容匹配，以及谨慎使用链接与品牌提及来降低可避免的风险。永久留帖和账号零限制无法承诺。'
        },
        {
          question: '每篇内容都会直接推广产品吗？',
          answer:
            '不会。Reddit 用户通常排斥明显广告，具体方式需要根据讨论语境判断。\n\n内容可能是经验分享、问题解答、产品对比、使用案例、行业讨论或资源推荐。只有产品确实与当前问题相关时，才会自然提及。'
        }
      ]
    },
    closing: {
      title: '当前应该从哪项 Reddit 服务开始？',
      description:
        '我们可以根据目标用户、产品成熟度、现有素材和风险偏好，在精准评论、品牌社区代运营与 Campaign 执行中推荐一个聚焦的起点。',
      cta: '预约策略沟通'
    }
  }
}
