export type ServiceLang = 'en' | 'zh'

export type LocalizedText = {
  en: string
  zh: string
}

export type ServiceFaqItem = {
  question: LocalizedText
  answer: LocalizedText
}

export type ServiceSection = {
  id: string
  title: LocalizedText
  description: LocalizedText
  bullets: LocalizedText[]
}

export type ServicePage = {
  slug: string
  category: LocalizedText
  title: LocalizedText
  description: LocalizedText
  intro: LocalizedText
  keywords: LocalizedText[]
  highlights: LocalizedText[]
  serviceIncludes?: LocalizedText[]
  sections: ServiceSection[]
  outcomes: LocalizedText[]
  deliveryDescription?: LocalizedText
  deliveryPresentation?: 'cards' | 'table'
  faqItems?: ServiceFaqItem[]
  hideBreadcrumb?: boolean
  hideOutcomes?: boolean
}

export const resolveLocalizedText = (value: LocalizedText, lang: ServiceLang) => value[lang]

export const servicePageCopy = {
  en: {
    languageLabel: 'Language',
    english: 'English',
    chinese: '中文',
    home: 'Home',
    services: 'Services',
    bookCall: 'Book a call',
    allServices: 'All services',
    programSnapshot: 'Program snapshot',
    programSnapshotDescription: 'Jump into the exact workstream you want to review first.',
    onThisPage: 'On this page',
    step: 'Step',
    whatThisServiceIncludes: 'What this service includes?',
    whyThisServiceWorks: 'Why this service works',
    whyThisServiceWorksTitle: 'Built to feel like a real program, not a list of tactics',
    whyThisServiceWorksDescription:
      'We package the delivery into clear workstreams so teams can see what gets prioritized first, how execution moves, and which outcomes the engagement is meant to unlock.',
    delivery: 'Delivery',
    serviceBreakdown: 'Service breakdown',
    outcomes: 'Outcomes',
    whatClientsShouldExpect: 'What clients should expect',
    nextStep: 'Next step',
    nextStepTitle: 'Want the same structure tailored to your acquisition goals?',
    nextStepDescription:
      'We can map the priority channels, recommend the first workstream, and show how the engagement would be scoped around your growth motion.',
    bookStrategyCall: 'Book a strategy call',
    workstreams: 'Workstreams',
    deliverables: 'Deliverables',
    outcomeTargets: 'Outcome targets',
    faqTopics: 'FAQ topics',
    tableStep: 'Step',
    tableWorkstream: 'Workstream',
    tableFocus: 'Focus',
    tableDeliverables: 'Deliverables',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqDescription: 'A few quick answers about how we approach SEO, Reddit, and AI-discovery growth work.',
    servicesBadge: 'Services',
    servicesTitle: 'Growth services built around how buyers discover you',
    servicesDescription:
      'Choose the lane that matters most right now: search visibility on your site, trust and demand from Reddit, or discoverability inside AI-generated answers.',
    viewPage: 'View page'
  },
  zh: {
    languageLabel: '语言',
    english: 'English',
    chinese: '中文',
    home: '首页',
    services: '服务',
    bookCall: '预约通话',
    allServices: '全部服务',
    programSnapshot: '服务概览',
    programSnapshotDescription: '先查看你最想了解的工作模块。',
    onThisPage: '本页内容',
    step: '步骤',
    whatThisServiceIncludes: 'What this service includes?',
    whyThisServiceWorks: '为什么这个服务有效',
    whyThisServiceWorksTitle: '它更像一套真实可执行的增长方案，而不是零散战术清单',
    whyThisServiceWorksDescription:
      '我们把交付拆成清晰的工作流，让团队知道应该先做什么、执行如何推进，以及这次合作最终希望带来什么结果。',
    delivery: '交付方式',
    serviceBreakdown: '服务拆解',
    outcomes: '预期结果',
    whatClientsShouldExpect: '客户可以期待什么',
    nextStep: '下一步',
    nextStepTitle: '想把这套结构映射到你的获客目标上吗？',
    nextStepDescription: '我们可以一起梳理优先渠道，推荐先做哪条工作流，并明确整个合作范围应该如何设计。',
    bookStrategyCall: '预约策略沟通',
    workstreams: '工作模块',
    deliverables: '交付项',
    outcomeTargets: '结果目标',
    faqTopics: 'FAQ 主题数',
    tableStep: '步骤',
    tableWorkstream: '工作模块',
    tableFocus: '重点内容',
    tableDeliverables: '具体交付',
    faqEyebrow: 'FAQ',
    faqTitle: '常见问题',
    faqDescription: '这里整理了一些关于 SEO、Reddit 与 AI 搜索增长服务的常见问题。',
    servicesBadge: '服务',
    servicesTitle: '围绕用户如何发现你而设计的增长服务',
    servicesDescription:
      '你可以优先选择当前最重要的方向：站内搜索可见性、Reddit 上的信任与需求获取，或 AI 生成答案中的品牌发现机会。',
    viewPage: '查看详情'
  }
} as const

export const servicePages: ServicePage[] = [
  {
    slug: 'seo-services',
    category: { en: 'SEO Services', zh: 'SEO 服务' },
    title: { en: 'SEO Services', zh: 'SEO 服务' },
    description: {
      en: 'Build a stronger organic growth engine with aligned on-page SEO, technical SEO, and programmatic SEO systems.',
      zh: '通过页面 SEO、技术 SEO 与程序化 SEO 的协同，建立更稳固的自然增长引擎。'
    },
    intro: {
      en: 'This page covers the full structure behind our SEO delivery. We start with page-level priorities, support them with technical fixes, and scale winning patterns with programmatic systems where they make sense.',
      zh: '这一页展示了我们 SEO 服务的完整结构。我们会先明确页面层级的优先事项，再用技术修复做支撑，并在合适的场景下用程序化系统放大已经验证有效的模式。'
    },
    keywords: [
      { en: 'on-page seo', zh: '页面 SEO' },
      { en: 'technical seo', zh: '技术 SEO' },
      { en: 'programmatic seo', zh: '程序化 SEO' },
      { en: 'seo services', zh: 'SEO 服务' },
      { en: 'internal linking', zh: '内链优化' }
    ],
    highlights: [
      {
        en: 'Turn important landing pages into clearer ranking targets',
        zh: '让关键落地页拥有更清晰的排名目标'
      },
      {
        en: 'Support content work with crawl, indexation, and performance fixes',
        zh: '用抓取、收录与性能修复为内容增长提供基础支撑'
      },
      {
        en: 'Scale repeatable page templates without sacrificing search intent',
        zh: '在不牺牲搜索意图匹配的前提下，放大可复制页面模板'
      }
    ],
    serviceIncludes: [
      { en: 'SEO strategy', zh: 'SEO 策略' },
      { en: 'On-page SEO', zh: '页面 SEO' },
      { en: 'Technical SEO', zh: '技术 SEO' },
      { en: 'Programmatic SEO', zh: '程序化 SEO' },
      { en: 'Local SEO', zh: '本地 SEO' }
    ],
    sections: [
      {
        id: 'seo-strategy',
        title: { en: 'SEO strategy', zh: 'SEO 策略' },
        description: {
          en: 'We define the SEO priorities first so the workstream follows the right acquisition goals, search intent clusters, and business opportunities.',
          zh: '我们会先明确 SEO 优先级，让执行路径围绕正确的获客目标、搜索意图簇和业务机会展开。'
        },
        bullets: [
          {
            en: 'Keyword and search intent mapping aligned with product priorities',
            zh: '结合产品优先级梳理关键词与搜索意图'
          },
          {
            en: 'Opportunity sizing across landing pages, content clusters, and conversion paths',
            zh: '评估落地页、内容主题簇与转化路径中的机会规模'
          },
          {
            en: 'Execution roadmap that sequences quick wins and longer-term bets',
            zh: '制定兼顾短期收益与长期布局的执行路线图'
          }
        ]
      },
      {
        id: 'on-page-seo',
        title: { en: 'On-page SEO foundations', zh: '页面 SEO 基础优化' },
        description: {
          en: 'We tighten page-level signals so search engines and users immediately understand what each page is meant to rank for.',
          zh: '我们会强化页面层级信号，让搜索引擎和用户都能更快理解每个页面应该匹配什么搜索需求。'
        },
        bullets: [
          {
            en: 'Search intent mapping for primary and secondary keywords',
            zh: '围绕主关键词与次关键词匹配搜索意图'
          },
          {
            en: 'Title, meta description, heading, and body copy refinement',
            zh: '优化标题、描述、标题层级与正文文案'
          },
          {
            en: 'Internal linking updates to strengthen topic clusters',
            zh: '调整内链结构，强化主题簇之间的关联'
          }
        ]
      },
      {
        id: 'technical-seo',
        title: { en: 'Technical SEO support', zh: '技术 SEO 支持' },
        description: {
          en: 'We remove the technical blockers that quietly suppress discovery, crawling, rendering, and indexation.',
          zh: '我们会移除那些悄悄压制发现、抓取、渲染与收录的技术性阻碍。'
        },
        bullets: [
          {
            en: 'Crawl path, sitemap, and indexation issue review',
            zh: '检查抓取路径、站点地图与收录问题'
          },
          {
            en: 'Performance and Core Web Vitals recommendations tied to SEO impact',
            zh: '给出与 SEO 结果相关的性能和 Core Web Vitals 优化建议'
          },
          {
            en: 'Structured data, canonical, and page architecture guidance',
            zh: '提供结构化数据、规范链接与页面架构优化建议'
          }
        ]
      },
      {
        id: 'programmatic-seo',
        title: { en: 'Programmatic SEO systems', zh: '程序化 SEO 系统' },
        description: {
          en: 'When repeatable search demand exists, we design scalable landing page patterns that still match user intent.',
          zh: '当搜索需求存在可重复模式时，我们会设计可规模化的落地页体系，同时保证内容仍然贴合用户意图。'
        },
        bullets: [
          {
            en: 'Template planning for high-intent page families',
            zh: '为高意图页面族群规划模板结构'
          },
          {
            en: 'Content field and metadata systems for reusable generation',
            zh: '建立可复用的内容字段与元数据系统'
          },
          {
            en: 'Quality controls to prevent thin, duplicate, or off-target pages',
            zh: '建立质量控制机制，避免内容薄弱、重复或偏题'
          }
        ]
      },
      {
        id: 'local-seo',
        title: { en: 'Local SEO support', zh: '本地 SEO 支持' },
        description: {
          en: 'When local intent matters, we improve the location signals that help your business show up for nearby searches and service-area demand.',
          zh: '如果本地搜索意图很重要，我们会强化地理位置信号，帮助你的业务更容易出现在附近搜索和服务区域需求中。'
        },
        bullets: [
          {
            en: 'Local landing page recommendations and location signal cleanup',
            zh: '优化本地落地页与位置相关信号'
          },
          {
            en: 'Google Business Profile and citation consistency guidance',
            zh: '提供 Google Business Profile 与本地引用一致性建议'
          },
          {
            en: 'Review, trust, and local relevance opportunities tied to conversion',
            zh: '围绕评价、信任与本地相关性寻找转化机会'
          }
        ]
      }
    ],
    outcomes: [
      { en: 'Sharper page targeting and better topical relevance', zh: '页面目标更清晰，主题相关性更强' },
      { en: 'Stronger internal authority flow across your important URLs', zh: '重要 URL 之间的内部权重传递更顺畅' },
      { en: 'A delivery path that connects content, technical fixes, and scale', zh: '内容、技术修复与规模化之间形成连贯的交付路径' }
    ],
    deliveryDescription: { en: 'Detailed deliverables table', zh: '具体交付内容表格' },
    deliveryPresentation: 'table',
    hideOutcomes: true,
    faqItems: [
      {
        question: {
          en: 'Should we prioritize social media or SEO first?',
          zh: '我应该优先做社媒，还是做 SEO？'
        },
        answer: {
          en: 'That depends on your product type and growth goals.\n\nIf users are already actively searching on Google for related problems or solutions, and the buying cycle is relatively long, SEO is usually the better long-term acquisition channel.\n\nIf the product relies more on visual presentation, trend-driven distribution, founder influence, or community interaction, social media may be better for early feedback.\n\nIn many cases, this is not an either-or decision. A more effective approach is to validate content directions quickly through social media, then turn the proven themes into sustainable SEO content that can keep earning search traffic. We will recommend the right mix based on your stage.',
          zh: '这取决于产品类型和增长目标。\n\n如果用户已经在 Google 主动搜索相关问题或解决方案，并且产品决策周期较长，SEO 通常更适合作为长期获客渠道。\n\n如果产品更依赖视觉展示、热点传播、创始人影响力或社区互动，社媒可能更容易获得早期反馈。\n\n很多产品并不需要二选一。更有效的方式通常是：通过社媒快速验证内容方向，再将验证有效的主题沉淀为可持续获得搜索流量的 SEO 内容。我们会根据您的产品阶段给出具体建议。'
        }
      },
      {
        question: {
          en: 'How long does SEO usually take to show results?',
          zh: 'SEO 一般多久见效？'
        },
        answer: {
          en: 'Long-tail keywords may show early ranking movement within 2-3 months, but stable traffic usually takes 3-6 months, and highly competitive markets can take longer.\n\nThe timeline depends on the site foundation, domain history, content quality, technical condition, and competitive landscape. That is why we usually start with a diagnosis before giving a more realistic expectation.',
          zh: '长尾关键词可能在 2—3 个月内出现早期排名，但形成稳定流量通常需要 3—6 个月，竞争激烈的市场可能需要更长时间。\n\n网站基础、域名历史、内容质量、技术状况和竞争程度都会影响实际周期。因此，我们会先进行诊断，再给出更符合项目情况的预期。'
        }
      },
      {
        question: {
          en: 'If we are unhappy after signing a three-month service, do you support refunds?',
          zh: '我担心签订三个月服务后没有效果，是否支持退款？'
        },
        answer: {
          en: 'Yes.\n\nIf after one month you are not satisfied with the service, you can stop the engagement at any time. Any remaining work that has not yet started or has not yet been completed can be refunded without additional justification.\n\nCompleted and delivered work such as diagnostics, strategy, content, page optimization, or other execution items will be settled according to the pricing terms in the contract.\n\nWe want to build long-term trust through transparent process and real delivery, not through contract lock-in.',
          zh: '支持。\n\n如果合作一个月后，您对我们的服务不满意，可以随时终止合作。对于尚未开始、尚未完成的剩余服务，我们支持无理由退款。\n\n已经完成并交付的诊断、策略、内容、页面优化或其他工作，将按照合同中约定的对应费用结算。\n\n我们希望通过透明的工作过程和实际交付建立长期合作，而不是依赖长期合同绑定客户。'
        }
      },
      {
        question: {
          en: 'Can you guarantee first-page rankings on Google?',
          zh: '你们能够保证 Google 首页排名吗？'
        },
        answer: {
          en: 'No, and no professional team should promise that.\n\nSearch rankings depend on Google’s algorithms, market competition, and the long-term quality of the site. No agency can directly control those outcomes. What we can do is choose better keyword opportunities, improve site and content quality, and keep optimizing toward rankings and conversions with real data.',
          zh: '不能，也不应该有任何专业团队做出这样的保证。\n\n搜索排名由 Google 的算法、市场竞争和网站长期表现共同决定，任何机构都无法直接控制。我们能够做的是选择更合理的关键词机会、提高网站和内容质量，并持续根据数据优化排名与转化。'
        }
      },
      {
        question: {
          en: 'Do you use AI to produce content?',
          zh: '你们是否使用 AI 生产内容？'
        },
        answer: {
          en: 'Yes, but we do not publish raw AI output as final content without review.\n\nAI can help with research organization, keyword analysis, content outlining, and first-draft support. Final content still goes through human editing, fact checking, brand voice adjustment, and SEO review. The goal is higher production efficiency, not low-quality publishing.',
          zh: '会使用，但不会把未经审核的 AI 文本直接当作最终内容发布。\n\nAI 会参与资料整理、关键词分析、内容框架和初稿辅助；最终内容需要经过人工编辑、事实检查、品牌语言调整和 SEO 审核。我们的目标是提高生产效率，而不是制造低质量内容。'
        }
      }
    ]
  },
  {
    slug: 'reddit-services',
    category: { en: 'Reddit Services', zh: 'Reddit 服务' },
    title: { en: 'Reddit Services', zh: 'Reddit 服务' },
    description: {
      en: 'Build a credible Reddit presence with structured community participation, campaign execution, and reporting that respects platform context.',
      zh: '通过有结构的社区参与、广告投放与复盘机制，建立更可信的 Reddit 品牌存在感。'
    },
    intro: {
      en: 'Reddit works when brands show up like informed contributors, not generic advertisers. We combine community management with campaign strategy so organic trust and paid distribution reinforce each other.',
      zh: '在 Reddit 上，品牌要像真正了解社区的参与者，而不是泛化广告主，效果才会出来。我们把社区运营与广告策略结合起来，让自然信任和付费分发相互强化。'
    },
    keywords: [
      { en: 'reddit marketing', zh: 'Reddit 营销' },
      { en: 'reddit community management', zh: 'Reddit 社区运营' },
      { en: 'reddit campaigns', zh: 'Reddit 广告投放' },
      { en: 'reddit services', zh: 'Reddit 服务' }
    ],
    highlights: [
      {
        en: 'Build trust inside relevant subreddits before asking for conversion',
        zh: '先在相关 subreddit 建立信任，再推动转化'
      },
      {
        en: 'Coordinate organic participation and paid campaigns in one workflow',
        zh: '把自然参与与付费投放放进同一套执行流程'
      },
      {
        en: 'Measure sentiment, traffic quality, and conversion contribution',
        zh: '衡量情绪反馈、流量质量与转化贡献'
      }
    ],
    serviceIncludes: [
      { en: 'Reddit strategy', zh: 'Reddit 策略' },
      { en: 'Community management', zh: '社区运营' },
      { en: 'Reddit campaigns', zh: 'Reddit 投放' },
      { en: 'Landing page alignment', zh: '落地页对齐' },
      { en: 'Measurement & iteration', zh: '数据复盘与迭代' }
    ],
    sections: [
      {
        id: 'reddit-strategy',
        title: { en: 'Reddit strategy', zh: 'Reddit 策略' },
        description: {
          en: 'We define where your brand should participate, what narratives should lead, and how Reddit fits into your broader acquisition motion.',
          zh: '我们会先确定品牌应该进入哪些社区、用什么叙事切入，以及 Reddit 在整体获客体系中应该扮演什么角色。'
        },
        bullets: [
          {
            en: 'Subreddit and audience research based on product-category fit',
            zh: '基于产品类型匹配 subreddit 与受众'
          },
          {
            en: 'Narrative and positioning guidance for community-native participation',
            zh: '为更贴近社区语境的参与方式制定叙事与定位'
          },
          {
            en: 'Execution roadmap across organic presence, paid tests, and reporting',
            zh: '规划自然曝光、付费测试与复盘分析的执行路径'
          }
        ]
      },
      {
        id: 'community-management',
        title: { en: 'Community management', zh: '社区运营' },
        description: {
          en: 'We help your brand participate in the right conversations with a tone, cadence, and value exchange that fits each subreddit.',
          zh: '我们帮助品牌以适合各个 subreddit 的语气、频率和价值交换方式参与正确的讨论。'
        },
        bullets: [
          {
            en: 'Subreddit discovery and prioritization by audience fit',
            zh: '按受众匹配度筛选并排序目标 subreddit'
          },
          {
            en: 'Response playbooks, moderation awareness, and escalation rules',
            zh: '制定回复策略、版规意识和升级处理规则'
          },
          {
            en: 'Ongoing discussion support to build recognition over time',
            zh: '持续支持讨论参与，逐步建立品牌识别度'
          }
        ]
      },
      {
        id: 'reddit-campaigns',
        title: { en: 'Reddit campaigns', zh: 'Reddit 广告投放' },
        description: {
          en: 'We plan and launch campaigns that align creative, targeting, offer design, and landing page intent around Reddit-native behavior.',
          zh: '我们会围绕 Reddit 用户行为习惯，规划并启动与创意、定向、报价设计和落地页意图相匹配的广告投放。'
        },
        bullets: [
          {
            en: 'Campaign structure and audience strategy',
            zh: '设计投放结构与受众策略'
          },
          {
            en: 'Creative angle testing for different subreddit contexts',
            zh: '针对不同 subreddit 语境测试创意角度'
          },
          {
            en: 'Landing page and conversion-path alignment with campaign intent',
            zh: '让落地页与转化路径匹配投放意图'
          }
        ]
      },
      {
        id: 'measurement',
        title: { en: 'Measurement and iteration', zh: '数据复盘与迭代' },
        description: {
          en: 'We connect platform activity back to business impact so the program can improve with evidence instead of guesswork.',
          zh: '我们把平台上的行为数据回连到业务结果，让后续优化建立在证据之上，而不是靠猜测。'
        },
        bullets: [
          {
            en: 'Weekly performance reviews across engagement and acquisition signals',
            zh: '每周复盘互动与获客信号'
          },
          {
            en: 'Sentiment monitoring and narrative risk tracking',
            zh: '监测社区情绪反馈与叙事风险'
          },
          {
            en: 'Iteration roadmap for messaging, placement, and offer changes',
            zh: '围绕信息表达、投放位置和 offer 调整迭代路线图'
          }
        ]
      }
    ],
    outcomes: [
      { en: 'A more credible presence inside the communities that influence buyers', zh: '在影响买家的社区中建立更可信的品牌存在感' },
      { en: 'Campaigns designed for Reddit behavior instead of generic social playbooks', zh: '基于 Reddit 行为设计投放，而不是套用泛社媒模板' },
      { en: 'Clearer visibility into which conversations and campaigns move pipeline', zh: '更清楚知道哪些讨论和投放真正推动了线索与转化' }
    ],
    deliveryDescription: { en: 'Detailed deliverables table', zh: '具体交付内容表格' },
    deliveryPresentation: 'table',
    hideOutcomes: true,
    faqItems: [
      {
        question: {
          en: 'Should we start with community management or Reddit ads?',
          zh: '应该先做社区运营，还是先做 Reddit 广告？'
        },
        answer: {
          en: 'That depends on how much trust your brand already has inside relevant subreddits.\n\nIf you are entering Reddit from scratch, community management usually comes first because it helps the team learn tone, objections, and discussion patterns before spending on distribution.\n\nIf you already know the audience and have a clear offer, paid campaigns can run earlier, but they still perform better when the creative and landing page reflect Reddit-native expectations.',
          zh: '这取决于你的品牌在相关 subreddit 里是否已经拥有一定信任基础。\n\n如果你是第一次认真进入 Reddit，通常应先做社区运营，因为这能帮助团队在投放前理解社区语气、用户异议和讨论模式。\n\n如果你已经非常了解目标受众，而且 offer 也很明确，那么广告可以更早开始，但前提仍然是创意与落地页需要符合 Reddit 用户预期。'
        }
      },
      {
        question: {
          en: 'Can Reddit work for B2B products?',
          zh: 'Reddit 适合 B2B 产品吗？'
        },
        answer: {
          en: 'Yes, especially when buyers actively discuss workflows, tools, pain points, and alternatives in niche communities.\n\nThe key is not treating Reddit like a generic ad platform. B2B success usually comes from a better mix of useful participation, sharper audience selection, and landing pages that match the intent behind the discussion.',
          zh: '适合，尤其是在目标买家会在垂直社区里主动讨论工作流、工具、痛点和替代方案的时候。\n\n关键在于不要把 Reddit 当成普通广告平台来用。B2B 在 Reddit 上更容易成功的方式，通常是更有价值的参与、更精准的受众选择，以及更贴合讨论意图的落地页。'
        }
      },
      {
        question: {
          en: 'How do you avoid getting the brand downvoted or ignored?',
          zh: '你们怎么避免品牌内容被点踩或者被无视？'
        },
        answer: {
          en: 'We reduce that risk by aligning with subreddit norms before posting, avoiding over-promotional language, and choosing conversation angles that add value first.\n\nReddit usually reacts poorly when brands try to force conversion too early. A better approach is to earn relevance through context, timing, and clarity.',
          zh: '我们会在发言前先对齐 subreddit 的规范，避免过强的营销话术，并优先选择能真正提供价值的讨论切入点，从而降低这种风险。\n\n当品牌过早强推转化时，Reddit 的反应通常会很差。更好的方式是通过合适的语境、时机和清晰表达，逐步建立相关性。'
        }
      },
      {
        question: {
          en: 'What should we expect from the first month?',
          zh: '合作的第一个月通常能期待什么？'
        },
        answer: {
          en: 'The first month is usually about learning, calibration, and early signal gathering rather than immediate scale.\n\nWe use that time to identify the best communities, refine response patterns, test campaign angles where relevant, and build a clearer view of what messaging actually earns attention and clicks.',
          zh: '第一个月通常更偏向学习、校准和收集早期信号，而不是马上放大规模。\n\n我们会用这段时间找出最合适的社区、优化互动方式、在适合的情况下测试投放角度，并更清楚地判断什么样的信息表达真正能获得注意力和点击。'
        }
      },
      {
        question: {
          en: 'Do you handle both organic Reddit work and paid campaigns together?',
          zh: '你们会同时负责 Reddit 的自然运营和付费投放吗？'
        },
        answer: {
          en: 'Yes.\n\nIn many cases, that combination works better than treating them as separate channels. Organic participation helps uncover useful language and objections, while paid campaigns can scale the angles that already show signs of resonance.',
          zh: '会。\n\n很多时候，把这两部分放在一起做，比把它们当成完全独立的渠道更有效。自然参与能帮助我们发现有效的话术和常见异议，而付费投放则能放大那些已经显示出共鸣的方向。'
        }
      }
    ]
  },
  {
    slug: 'geo-services',
    category: { en: 'GEO Services', zh: 'GEO 服务' },
    title: { en: 'GEO Services', zh: 'GEO 服务' },
    description: {
      en: 'Increase the odds that your brand appears in AI-generated answers by improving source clarity, entity signals, and content structure.',
      zh: '通过提升来源清晰度、实体信号和内容结构，提高品牌出现在 AI 生成答案中的概率。'
    },
    intro: {
      en: 'Generative Engine Optimization focuses on how your brand gets cited, summarized, and surfaced in AI discovery flows. We strengthen the signals that make your site easier for answer engines to understand and reuse.',
      zh: 'Generative Engine Optimization 关注的是你的品牌如何在 AI 发现路径中被引用、被总结和被展示。我们会强化那些让回答引擎更容易理解和复用你网站内容的信号。'
    },
    keywords: [
      { en: 'geo services', zh: 'GEO 服务' },
      { en: 'generative engine optimization', zh: '生成式引擎优化' },
      { en: 'ai search', zh: 'AI 搜索' },
      { en: 'llm visibility', zh: 'LLM 可见性' }
    ],
    highlights: [
      {
        en: 'Make your brand easier for answer engines to recognize and trust',
        zh: '让回答引擎更容易识别并信任你的品牌'
      },
      {
        en: 'Strengthen source pages that are likely to feed AI discovery journeys',
        zh: '强化更可能进入 AI 发现链路的来源页面'
      },
      {
        en: 'Align entity, content, and citation signals around authority topics',
        zh: '围绕权威主题对齐实体、内容和引用信号'
      }
    ],
    serviceIncludes: [
      { en: 'GEO strategy', zh: 'GEO 策略' },
      { en: 'Source-page optimization', zh: '来源页优化' },
      { en: 'Citation readiness', zh: '引用准备度' },
      { en: 'Entity signal alignment', zh: '实体信号对齐' },
      { en: 'Topic expansion roadmap', zh: '主题扩展路线图' }
    ],
    sections: [
      {
        id: 'geo-strategy',
        title: { en: 'GEO strategy', zh: 'GEO 策略' },
        description: {
          en: 'We define which topics, source pages, and visibility opportunities matter most so GEO work supports real discovery and demand capture.',
          zh: '我们会先定义哪些主题、哪些来源页面以及哪些可见性机会最重要，让 GEO 真正服务于发现和需求承接。'
        },
        bullets: [
          {
            en: 'Priority topic mapping across AI discovery, search demand, and conversion paths',
            zh: '围绕 AI 发现、搜索需求和转化路径梳理优先主题'
          },
          {
            en: 'Source-page selection for the highest-leverage visibility opportunities',
            zh: '筛选最值得优先优化的来源页面'
          },
          {
            en: 'Roadmap for sequencing structural fixes, content updates, and expansion work',
            zh: '规划结构修复、内容更新与扩展工作的优先顺序'
          }
        ]
      },
      {
        id: 'generative-engine-optimization',
        title: { en: 'Generative answer visibility', zh: '生成式答案可见性' },
        description: {
          en: 'We identify the pages and themes most likely to influence AI-generated answers, then improve how clearly those sources communicate expertise.',
          zh: '我们会找出最有可能影响 AI 生成答案的页面和主题，并提升这些来源内容表达专业性的清晰度。'
        },
        bullets: [
          {
            en: 'Entity and authority mapping for priority topics',
            zh: '围绕优先主题梳理实体与权威信号'
          },
          {
            en: 'Source-page refinement for answer extraction and summarization',
            zh: '优化来源页，提升被抽取和总结的可能性'
          },
          {
            en: 'Coverage planning for question patterns common in AI search journeys',
            zh: '围绕 AI 搜索常见问题模式规划内容覆盖'
          }
        ]
      },
      {
        id: 'citation-readiness',
        title: { en: 'Citation readiness', zh: '引用准备度' },
        description: {
          en: 'We improve the trust signals that help your content qualify as a source worth citing, referencing, or paraphrasing.',
          zh: '我们会提升内容中的信任信号，让它更有机会成为值得引用、参考或转述的来源。'
        },
        bullets: [
          {
            en: 'Clear authorship, proof points, and claim support review',
            zh: '检查作者署名、证据支撑与主张可信度'
          },
          {
            en: 'Structured formatting for easier extraction and reuse',
            zh: '优化结构化格式，提升被提取和复用的便利性'
          },
          {
            en: 'Cross-channel consistency between site, brand, and topic pages',
            zh: '对齐网站、品牌页与主题页之间的跨渠道一致性'
          }
        ]
      },
      {
        id: 'topic-expansion',
        title: { en: 'Topic expansion roadmap', zh: '主题扩展路线图' },
        description: {
          en: 'We turn early signals into a repeatable roadmap so your AI search footprint can grow without becoming noisy or unfocused.',
          zh: '我们会把早期信号转化成可重复执行的路线图，让你的 AI 搜索可见性扩展得更稳，而不是越做越杂。'
        },
        bullets: [
          {
            en: 'Gap analysis across topic clusters and comparison queries',
            zh: '分析主题簇与对比型查询中的内容缺口'
          },
          {
            en: 'New page recommendations tied to entity depth and question demand',
            zh: '根据实体深度和问题需求提出新页面建议'
          },
          {
            en: 'Prioritized roadmap based on likely visibility gains',
            zh: '按潜在可见性收益排序执行路线'
          }
        ]
      }
    ],
    outcomes: [
      { en: 'Stronger source pages for AI answer generation and brand discovery', zh: '更强的来源页面，支撑 AI 回答生成和品牌发现' },
      { en: 'Cleaner topic and entity signals across your content ecosystem', zh: '更清晰的主题与实体信号贯穿整个内容体系' },
      { en: 'A roadmap for expanding visibility in emerging search interfaces', zh: '更清楚的路线图，用于扩展新型搜索界面的可见性' }
    ],
    deliveryDescription: { en: 'Detailed deliverables table', zh: '具体交付内容表格' },
    deliveryPresentation: 'table',
    hideBreadcrumb: true,
    hideOutcomes: true,
    faqItems: [
      {
        question: {
          en: 'What is the difference between GEO and SEO?',
          zh: 'GEO 和 SEO 的区别是什么？'
        },
        answer: {
          en: 'SEO is primarily about improving visibility in traditional search results, while GEO focuses on increasing the likelihood that your brand appears in AI-generated answers and discovery flows.\n\nThey overlap, but they are not identical. GEO usually requires stronger source clarity, better entity signals, and content formatting that answer engines can interpret and reuse more easily.',
          zh: 'SEO 主要关注传统搜索结果中的可见性，而 GEO 更关注品牌在 AI 生成答案和 AI 发现路径中被看到的概率。\n\n两者有交集，但并不相同。GEO 通常更依赖清晰的来源表达、更强的实体信号，以及更容易被回答引擎理解和复用的内容结构。'
        }
      },
      {
        question: {
          en: 'Does GEO replace SEO?',
          zh: 'GEO 会取代 SEO 吗？'
        },
        answer: {
          en: 'No.\n\nIn most cases, GEO should build on top of solid SEO rather than replace it. The strongest results usually come from a site that already has clear information architecture, credible content, and technically accessible source pages.',
          zh: '不会。\n\n大多数情况下，GEO 应该建立在扎实的 SEO 基础之上，而不是替代它。最好的结果通常来自信息架构清晰、内容可信、来源页面技术可访问性良好的网站。'
        }
      },
      {
        question: {
          en: 'How do you measure GEO progress if rankings are less direct?',
          zh: '如果没有传统排名那样直接的指标，GEO 进展怎么衡量？'
        },
        answer: {
          en: 'We look at a combination of signals, including source-page quality, citation readiness, topic coverage, referral patterns, branded search behavior, and whether your content is positioned to be reused in answer-generation contexts.\n\nThe measurement model is broader than standard keyword ranking, because visibility in AI interfaces is less linear and often distributed across multiple touchpoints.',
          zh: '我们会综合多个信号来衡量，包括来源页质量、引用准备度、主题覆盖、引荐流量模式、品牌搜索行为，以及内容是否更适合在答案生成场景中被复用。\n\n相比传统关键词排名，GEO 的衡量模型会更宽，因为 AI 界面中的可见性通常不是线性的，也分散在多个接触点上。'
        }
      },
      {
        question: {
          en: 'Do we need to publish a lot more content to improve GEO?',
          zh: '要提升 GEO，是不是必须发更多内容？'
        },
        answer: {
          en: 'Not always.\n\nMany teams first need better source pages, clearer expertise signals, and tighter topic structure before they need more volume. Expansion works best after the foundation is strong enough for answer engines to understand what the brand should be cited for.',
          zh: '不一定。\n\n很多团队在增加内容量之前，更需要先把来源页做好、把专业信号表达清楚，并理顺主题结构。只有当基础足够清晰，回答引擎才能更准确理解这个品牌应该因为什么被引用。'
        }
      },
      {
        question: {
          en: 'How quickly can GEO work influence visibility?',
          zh: 'GEO 多久会开始影响可见性？'
        },
        answer: {
          en: 'Some structural improvements can help relatively early, but broader visibility gains usually depend on how strong the current site foundation is and how competitive the topic space has become.\n\nThat is why we typically begin with diagnosis, then prioritize the highest-leverage fixes before expanding coverage.',
          zh: '有些结构性优化可能较早带来帮助，但更明显的可见性提升通常仍取决于网站当前基础强弱，以及所在主题赛道的竞争程度。\n\n所以我们通常会先做诊断，再优先处理杠杆最大的修复项，最后再逐步扩展覆盖。'
        }
      }
    ]
  }
]

export const serviceSlugs = servicePages.map(service => service.slug)

export const getServiceBySlug = (slug: string) => servicePages.find(service => service.slug === slug)
