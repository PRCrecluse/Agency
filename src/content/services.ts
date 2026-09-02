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

export type ServicePackage = {
  id: string
  title: LocalizedText
  description: LocalizedText
  deliveryNote?: LocalizedText
  sections: ServiceSection[]
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
  packages?: ServicePackage[]
  sections: ServiceSection[]
  outcomes: LocalizedText[]
  deliveryDescription?: LocalizedText
  deliveryPresentation?: 'cards' | 'table'
  faqItems?: ServiceFaqItem[]
  hideOutcomes?: boolean
}

export const resolveLocalizedText = (value: LocalizedText, lang: ServiceLang) => value[lang]

export const servicePageCopy = {
  en: {
    metadata: {
      title: 'SEO, Reddit & GEO Services | Meridian',
      description:
        'Explore Meridian services across technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native organic demand.',
      keywords: ['seo services', 'reddit marketing services', 'geo services', 'technical seo agency']
    },
    english: 'English',
    chinese: '中文',
    home: 'Home',
    services: 'Services',
    bookCall: 'Book a call',
    allServices: 'All services',
    step: 'Step',
    package: 'Package',
    deliveryPackages: 'Delivery packages',
    whatThisServiceIncludes: 'What this service includes',
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
    metadata: {
      title: 'SEO、Reddit 与 GEO 服务 | Meridian',
      description: '了解 Meridian 的技术 SEO、程序化 SEO、Reddit 增长、GEO 与 AI 原生自然增长服务。',
      keywords: ['SEO 服务', 'Reddit 营销服务', 'GEO 服务', '技术 SEO 公司']
    },
    english: 'English',
    chinese: '中文',
    home: '首页',
    services: '服务',
    bookCall: '预约通话',
    allServices: '全部服务',
    step: '步骤',
    package: '方案',
    deliveryPackages: '交付方案',
    whatThisServiceIncludes: '服务包含什么',
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
      en: 'Choose a hands-on SEO growth coaching program or a managed SEO delivery program, with a clear scope for strategy, content, on-page work, technical guidance, authority building, and reporting.',
      zh: '根据团队执行能力选择 SEO 增长陪跑或 SEO 全包交付；两种方案均明确覆盖策略、内容、页面优化、技术建议、权威建设与复盘。'
    },
    intro: {
      en: 'Our SEO service has two clearly scoped delivery models. Growth Coaching gives your internal team strategy, review, training, and execution accountability. Managed Delivery adds a larger monthly production scope and delivered backlink assets, while both models keep the implementation responsibilities transparent.',
      zh: 'SEO 服务分为两种清晰的交付模式：增长陪跑为内部团队提供策略、审核、培训和执行推进；全包交付则增加更大规模的月度内容、页面优化和外链资产。两种模式都会明确双方的实际执行责任。'
    },
    keywords: [
      { en: 'seo growth coaching', zh: 'SEO 增长陪跑' },
      { en: 'managed seo delivery', zh: 'SEO 全包交付' },
      { en: 'on-page seo', zh: '页面 SEO' },
      { en: 'technical seo', zh: '技术 SEO' },
      { en: 'programmatic seo', zh: '程序化 SEO' }
    ],
    highlights: [
      {
        en: 'Growth Coaching: your team executes with our strategy, review, training, and weekly accountability',
        zh: '增长陪跑：你的团队执行，我们提供策略、审核、培训与每周推进'
      },
      {
        en: 'Managed Delivery: a larger monthly scope for content briefs, page optimization, and backlink delivery',
        zh: '全包交付：以更大规模完成内容 Brief、页面优化与外链资产交付'
      },
      {
        en: 'One connected growth system across keyword strategy, technical priorities, content, pages, and authority',
        zh: '围绕关键词策略、技术优先级、内容、页面与权威建设形成一套连贯增长系统'
      }
    ],
    packages: [
      {
        id: 'seo-growth-coaching',
        title: { en: 'SEO Growth Coaching', zh: 'SEO 增长陪跑版' },
        description: {
          en: 'A three-month minimum engagement for teams that have internal execution capacity and need an expert partner to set priorities, review work, remove blockers, and build repeatable SEO capability.',
          zh: '适合已有网站基础或内部执行团队的企业。服务周期 3 个月起，由我们提供策略、诊断、审核、答疑、培训与复盘，客户团队负责实际落地。'
        },
        deliveryNote: {
          en: 'Client team implements content production, page publishing, and technical fixes. We provide the strategy, review standards, execution guidance, and acceptance criteria.',
          zh: '客户团队负责内容生产、页面上线与技术修复；我们负责策略、审核标准、执行建议与验收口径。'
        },
        sections: [
          {
            id: 'coaching-strategy-foundation',
            title: { en: 'Strategy, diagnosis, and growth foundation', zh: '策略、诊断与增长基础' },
            description: {
              en: 'Build the priorities, measurement baseline, and information architecture that guide the first three months of work.',
              zh: '建立目标、复盘口径与信息架构，为前三个月执行确定优先级。'
            },
            bullets: [
              { en: 'One complete SEO audit in month one, then monthly issue follow-up across crawlability, indexing, content relevance, structure, internal linking, and conversion paths', zh: '首月交付 1 份完整 SEO 诊断，后续按月跟进抓取、收录、内容相关性、结构、内链与转化路径问题' },
              { en: 'One keyword strategy with monthly priority updates, including core, long-tail, commercial, and content terms with intent and page recommendations', zh: '交付 1 套关键词策略并按月更新重点，覆盖核心词、长尾词、商业词、内容词、搜索意图与页面承接建议' },
              { en: 'One site architecture and content-cluster plan, plus a light programmatic SEO assessment where scalable pages are relevant', zh: '交付 1 套网站目录与内容集群规划；如适用，提供轻量程序化 SEO 可行性与页面规则建议' },
              { en: 'One competitor growth analysis in month one, with monthly updates on the most relevant competitive changes', zh: '首月交付 1 份竞品增长分析，并按月更新最重要的竞品变化与可借鉴动作' }
            ]
          },
          {
            id: 'coaching-content-pages',
            title: { en: 'Content and page optimization guidance', zh: '内容与页面优化指导' },
            description: {
              en: 'Give the internal team an execution-ready queue for content creation and the pages with the greatest ranking potential.',
              zh: '为内部团队提供可直接执行的内容队列，以及最有排名潜力页面的优化清单。'
            },
            bullets: [
              { en: '10 content briefs or topic directions per month, 30 in total, covering target keyword, intent, title, structure, FAQ, internal links, and CTA', zh: '每月 10 篇内容 Brief 或选题建议，共 30 篇，覆盖目标词、意图、标题、结构、FAQ、内链与 CTA' },
              { en: 'On-page recommendations for 5 priority pages per month, 15 in total, covering title, meta, headings, relevance, internal links, and conversion path', zh: '每月优化建议 5 个重点页面，共 15 个，覆盖标题、Meta、H 标签、相关性、内链与转化路径' },
              { en: 'GEO and AI-search coordination in content, entities, FAQs, structured expression, and citable answer formats', zh: '在内容、实体信息、FAQ、结构化表达与可引用答案中同步覆盖 GEO 与 AI 搜索协同建议' }
            ]
          },
          {
            id: 'coaching-technical-authority',
            title: { en: 'Technical and authority-building guidance', zh: '技术与权威建设指导' },
            description: {
              en: 'Keep foundational technical risks and off-site authority opportunities visible without disguising advisory work as execution.',
              zh: '持续跟进技术风险和站外权威建设机会，同时明确本模块以策略、建议和审核为主。'
            },
            bullets: [
              { en: 'Monthly technical SEO follow-up covering sitemap, robots, performance, structured data, duplicate content, canonical, hreflang, and prioritized repair guidance', zh: '每月跟进技术 SEO，包括 sitemap、robots、性能、结构化数据、重复内容、canonical、hreflang 与修复优先级' },
              { en: '5 backlink opportunity directions or resource suggestions per month, 15 in total, with target-page, anchor-text, quality, and risk guidance', zh: '每月提供 5 个外链机会方向或资源建议，共 15 个，包含目标页、锚文本、质量与风险建议' },
              { en: 'One light PR and community strategy for brand mentions, resource pages, partnerships, and natural-link opportunities', zh: '提供 1 套轻量 PR 与社区策略，规划品牌提及、资源页、合作内容与自然外链机会' }
            ]
          },
          {
            id: 'coaching-enablement-review',
            title: { en: 'Coaching, enablement, and review', zh: '陪跑、能力建设与复盘' },
            description: {
              en: 'Create an operating rhythm that helps the client team ship work, resolve questions, and continue after the engagement ends.',
              zh: '建立持续推进的协作节奏，帮助客户团队完成上线、解决问题，并在服务结束后继续执行。'
            },
            bullets: [
              { en: 'One weekly SEO coaching call, approximately 12 sessions across three months, with progress, blockers, next priorities, and meeting notes', zh: '每周 1 次 SEO 陪跑会，3 个月约 12 次，覆盖进度、问题、下周优先级与会议纪要' },
              { en: 'Ongoing execution Q&A and one practical SEO training session per month, 3 sessions in total', zh: '服务期内持续执行答疑，并每月提供 1 次 SEO 实操培训，共 3 次' },
              { en: 'Three monthly reviews plus one reusable SOP and template pack for keyword tracking, content briefs, on-page checks, backlink opportunities, and reporting', zh: '交付 3 份月度复盘，以及 1 套可复用的关键词、内容 Brief、页面检查、外链机会与复盘 SOP 模板包' }
            ]
          }
        ]
      },
      {
        id: 'managed-seo-delivery',
        title: { en: 'Managed SEO Delivery', zh: 'SEO 全包交付版' },
        description: {
          en: 'A three-month minimum program for brands that need a broader, managed monthly scope. We own the strategy, deliverable production, backlink delivery records, and reporting; the client supplies access, business inputs, approval, publishing, and necessary technical support.',
          zh: '适合需要更大规模交付的品牌。服务周期 3 个月起，我们负责策略、文档与交付资产、外链记录和复盘；客户提供权限、业务资料、审核、上线与必要技术支持。'
        },
        deliveryNote: {
          en: 'This program delivers briefs, optimization recommendations, and backlink assets. Website development, code changes, and the client’s internal publishing and technical implementation remain outside the delivery scope.',
          zh: 'Blog、代码改造交付内容视情况而定。'
        },
        sections: [
          {
            id: 'managed-seo-strategy',
            title: { en: 'Diagnosis and search strategy', zh: '诊断与搜索策略' },
            description: {
              en: 'Create the foundation for a managed SEO program, including the strategy and prioritization needed to move from research to production.',
              zh: '完成全包 SEO 项目的策略与优先级基础，将研究成果转化为持续生产计划。'
            },
            bullets: [
              { en: 'One SEO audit per month, 3 in total, covering indexing, crawlability, structure, content relevance, internal links, conversion paths, issues, and priorities', zh: '每月 1 份 SEO 诊断，共 3 份，覆盖收录、抓取、结构、内容相关性、内链、转化路径、问题与优先级' },
              { en: 'One complete keyword strategy including industry, competitor, long-tail, intent, priority, and page-matching recommendations', zh: '交付 1 套完整关键词策略，覆盖行业词、竞品词、长尾词、搜索意图、优先级与页面承接建议' },
              { en: 'One site architecture plan, one programmatic SEO plan where applicable, and 3 monthly competitor growth analyses', zh: '交付 1 套网站结构规划、如适用的 1 套程序化 SEO 规划，以及每月 1 份竞品增长分析，共 3 份' }
            ]
          },
          {
            id: 'managed-seo-content-pages',
            title: { en: 'Content and on-page delivery', zh: '内容与页面优化交付' },
            description: {
              en: 'Supply a larger monthly production queue for content and high-potential existing pages, designed for approval and publishing by the client team.',
              zh: '为客户团队提供更大规模的内容与页面优化队列，便于审核、上线与持续迭代。'
            },
            bullets: [
              { en: '20 execution-ready content briefs per month, 60 in total, for landing pages, blogs, resource pages, or tool pages; each includes keyword, intent, title, structure, writing points, and SEO requirements', zh: '每月交付 20 篇可执行内容 Brief，共 60 篇，适用于落地页、博客、资源页或工具页；每篇包含关键词、意图、标题、结构、写作要点与 SEO 要点' },
              { en: 'On-page optimization recommendations for 10 priority pages per month, 30 in total, including title, meta description, headings, content structure, relevance, internal links, CTA, and conversion path', zh: '每月交付 10 个重点页面优化建议，共 30 个，覆盖标题、Meta Description、H 标签、内容结构、相关性、内链、CTA 与转化路径' },
              { en: 'GEO coordination across content structure, entity information, FAQ, citable expression, and page-topic clarity', zh: '在内容结构、实体信息、FAQ、可引用表达与页面主题清晰度上同步交付 GEO 协同建议' }
            ]
          },
          {
            id: 'managed-seo-technical-authority',
            title: { en: 'Technical guidance and authority delivery', zh: '技术建议与权威资产交付' },
            description: {
              en: 'Identify technical priorities and provide transparent, recorded off-site authority delivery tied to target pages.',
              zh: '明确技术优化优先级，并围绕目标页面交付可记录、可验收的站外权威资产。'
            },
            bullets: [
              { en: 'One technical SEO follow-up per month, 3 in total, with prioritized recommendations for sitemap, robots, indexing, duplicate content, structured data, speed, mobile experience, and internal links', zh: '每月跟进 1 次技术 SEO，共 3 次，针对 sitemap、robots、收录、重复内容、结构化数据、速度、移动端体验与内链提供优先级建议' },
              { en: '30 relevant, high-quality backlink placements across 3 months, with a delivery record for source URL, target page, anchor text, publish status, and notes', zh: '3 个月共交付 30 条真实、相关的高质量外链，并提供来源 URL、目标页面、锚文本、发布状态与备注的记录表' },
              { en: 'One PR and community backlink strategy covering channel types, brand mentions, target pages, anchor-text approach, and reuse paths', zh: '交付 1 套 PR 与社区外链策略，覆盖渠道类型、品牌提及、目标页面、锚文本策略与后续复用路径' }
            ]
          },
          {
            id: 'managed-seo-reporting-handover',
            title: { en: 'Reporting and project handover', zh: '复盘与项目交接' },
            description: {
              en: 'Make monthly progress visible and leave the client with a complete set of SEO assets for continued execution.',
              zh: '让月度进展透明可见，并在项目结束时沉淀可持续执行的 SEO 资产。'
            },
            bullets: [
              { en: 'One monthly data review, 3 in total, covering rankings, indexing, organic traffic, content and page progress, backlinks, issues, and next actions', zh: '每月交付 1 份数据复盘，共 3 份，覆盖排名、收录、自然流量、内容与页面进度、外链、问题与下一步动作' },
              { en: 'One final project delivery pack containing the keyword strategy, site structure, content plan, optimization lists, backlink record, monthly reviews, and next-stage recommendations', zh: '服务期末交付 1 套完整项目资料包，汇总关键词策略、网站结构、内容规划、优化清单、外链记录、月度复盘与下一阶段建议' }
            ]
          }
        ]
      }
    ],
    sections: [],
    outcomes: [],
    deliveryDescription: { en: 'Compare the two delivery models below. Each workstream states what is delivered, how often it is delivered, and where the client team remains responsible for implementation.', zh: '请在下方对比两种交付模式。每个工作模块均明确列出交付物、交付频率，以及客户团队仍需负责的实际执行环节。' },
    deliveryPresentation: 'table',
    hideOutcomes: true,
    faqItems: [
      {
        question: { en: 'What is the difference between SEO Growth Coaching and Managed SEO Delivery?', zh: 'SEO 增长陪跑和 SEO 全包交付有什么区别？' },
        answer: {
          en: 'Growth Coaching is designed for teams with execution capacity. We diagnose, prioritize, review, train, and keep the work moving, while your team produces content, publishes changes, and completes technical fixes. Managed SEO Delivery adds a larger monthly scope of content briefs, page recommendations, recorded backlink delivery, and project documentation. It still does not include website development or code implementation unless separately agreed.',
          zh: '增长陪跑适合已有执行能力的团队：我们负责诊断、优先级、审核、培训与推进，客户团队负责内容生产、页面上线和技术修复。全包交付则增加更大规模的内容 Brief、页面优化建议、可记录外链交付和项目资料包；除非另行约定，仍不包含网站开发或代码实施。'
        }
      },
      {
        question: { en: 'What does the client team need to do in the coaching program?', zh: '选择陪跑版后，客户团队需要负责什么？' },
        answer: {
          en: 'The client team is responsible for content production, page edits and publishing, technical fixes, and providing the necessary website and analytics access. We provide the roadmap, briefs, review criteria, recurring guidance, and acceptance standards so those tasks are completed in the right order.',
          zh: '客户团队负责内容生产、页面修改与上线、技术修复，并提供必要的网站和数据权限。我们提供路线图、内容 Brief、审核标准、持续指导与验收口径，确保这些工作按正确优先级完成。'
        }
      },
      {
        question: { en: 'Does the managed program include written articles and website development?', zh: '全包交付是否包含文章代写和网站开发？' },
        answer: {
          en: 'The managed program includes execution-ready content briefs and page optimization recommendations, not final article ghostwriting, website development, or code changes. These items can be scoped separately when needed.',
          zh: '全包交付包含可执行的内容 Brief 与页面优化建议，不包含文章代写、网站开发或代码改造；如有需要，可另行确定范围。'
        }
      },
      {
        question: { en: 'Can you guarantee first-page rankings or a fixed traffic increase?', zh: '可以保证 Google 首页排名或固定流量增长吗？' },
        answer: {
          en: 'No. Search outcomes depend on the site foundation, competition, publishing speed, technical implementation, and search-engine changes. We commit to a transparent scope of work, a clear delivery record, and data-informed priorities—not a ranking guarantee.',
          zh: '不能。搜索结果受网站基础、竞争程度、内容上线速度、技术实施效率和搜索引擎变化等因素影响。我们承诺透明的工作范围、清晰的交付记录和基于数据的优先级，而不承诺固定排名。'
        }
      }
    ]
  },
  {
    slug: 'reddit-services',
    category: { en: 'Reddit Services', zh: 'Reddit 服务' },
    title: { en: 'Reddit Services', zh: 'Reddit 服务' },
    description: {
      en: 'Compare Reddit marketing packages, campaign execution, delivery standards, and service guarantees in one clear program overview.',
      zh: '在同一页清晰查看 Reddit 营销套餐、Campaign 执行、交付标准与服务保障。'
    },
    intro: {
      en: 'This overview helps teams choose the right Reddit service mix—from targeted comments and list posts to dedicated posts, brand communities, and 20-post campaigns—while making delivery rules, replacement standards, add-ons, and responsibilities transparent.',
      zh: '本页帮助团队在精准评论、清单帖、专属帖、品牌社区与 20 条帖子 Campaign 中选择合适组合，并清楚说明交付规则、补发标准、加购项与双方责任。'
    },
    keywords: [
      { en: 'reddit marketing', zh: 'Reddit 营销' },
      { en: 'reddit community management', zh: 'Reddit 社区运营' },
      { en: 'reddit campaigns', zh: 'Reddit 广告投放' },
      { en: 'reddit services', zh: 'Reddit 服务' }
    ],
    highlights: [],
    serviceIncludes: [],
    sections: [
      {
        id: 'reddit-strategy',
        title: { en: 'Package overview', zh: '服务套餐总览' },
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
        title: { en: 'Campaign execution', zh: 'Campaign 执行' },
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
        title: { en: 'Service guarantees', zh: '服务承诺与保障' },
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
      en: 'Build durable visibility in AI discovery with a measured GEO program that combines AI visibility diagnosis, LLM-friendly content, community participation, video publishing, technical guidance, and recurring review.',
      zh: '通过 AI 可见度诊断、LLM 友好内容、社区运营、视频发布、技术建议与持续复盘，建立更稳定的 AI 搜索发现能力。'
    },
    intro: {
      en: 'This GEO program is designed for brands that want to improve how they are recognized, cited, and recommended in AI search experiences. It starts with a visibility baseline, then runs a high-frequency monthly content, community, and video distribution rhythm with clear client-side approval and implementation responsibilities.',
      zh: '该 GEO 项目面向希望提升品牌在 AI 搜索中被识别、引用和推荐概率的企业。服务从可见度基线开始，再以高频内容、社区和视频分发节奏持续执行，同时明确客户侧的审核、发布与技术实施责任。'
    },
    keywords: [
      { en: 'geo services', zh: 'GEO 服务' },
      { en: 'generative engine optimization', zh: '生成式引擎优化' },
      { en: 'ai search visibility', zh: 'AI 搜索可见度' },
      { en: 'llm-friendly content', zh: 'LLM 友好内容' },
      { en: 'reddit community strategy', zh: 'Reddit 社区策略' }
    ],
    highlights: [
      { en: '30 keyword and topic groups per month to guide AI-discovery content', zh: '每月 30 组关键词与话题策略，指导 AI 搜索内容布局' },
      { en: '30 LLM-friendly articles, 20 Reddit comments, and 10 YouTube video releases per month', zh: '每月 30 篇 LLM 友好文章、20 条 Reddit 评论与 10 条 YouTube 视频发布' },
      { en: 'A six-month operating rhythm with weekly working sessions and monthly visibility reviews', zh: '以 6 个月为执行节奏，包含每周推进会和月度可见度复盘' }
    ],
    serviceIncludes: [
      { en: 'AI visibility diagnosis', zh: 'AI 可见度诊断' },
      { en: '30 topic groups / month', zh: '每月 30 组话题策略' },
      { en: '30 LLM-friendly articles / month', zh: '每月 30 篇 LLM 友好文章' },
      { en: '20 Reddit comments / month', zh: '每月 20 条 Reddit 评论' },
      { en: '10 YouTube releases / month', zh: '每月 10 条 YouTube 视频发布' }
    ],
    sections: [
      {
        id: 'geo-baseline-strategy',
        title: { en: 'AI visibility baseline and topic strategy', zh: 'AI 可见度基线与话题策略' },
        description: {
          en: 'Establish the baseline, research the questions users ask AI systems, and turn the findings into a repeatable content direction.',
          zh: '建立品牌当前 AI 可见度基线，研究用户向 AI 提问的真实场景，并形成可重复执行的内容方向。'
        },
        bullets: [
          { en: 'One complete AI visibility diagnosis in month one, with monthly follow-up across ChatGPT, Claude, Perplexity, Gemini, and relevant real-time search scenarios', zh: '首月交付 1 份完整 AI 可见度诊断，后续按月跟进 ChatGPT、Claude、Perplexity、Gemini 等主流 AI 与相关实时搜索场景' },
          { en: '30 keyword and topic groups per month, covering core, long-tail, question, comparison, and intent-led AI discovery scenarios', zh: '每月 30 组关键词与话题策略，覆盖核心词、长尾词、问答词、对比词与不同 AI 搜索意图场景' },
          { en: 'Competitor GEO analysis for 3–5 key competitors, first delivered in month one and refreshed as priorities change', zh: '覆盖 3—5 个主要竞品的 GEO 分析，首月交付并根据优先级持续更新' },
          { en: 'One evolving prompt library and LLM-friendly writing SOP with structure templates, evidence signals, and citation-oriented guidance', zh: '交付 1 套持续迭代的 Prompt 库与 LLM 友好写作 SOP，包含结构模板、证据与 E-E-A-T 信号、引用导向建议' }
        ]
      },
      {
        id: 'geo-content-production',
        title: { en: 'LLM-friendly content production and distribution', zh: 'LLM 友好内容生产与分发' },
        description: {
          en: 'Produce structured, high-information content that gives AI systems clear material to retrieve, summarize, and cite.',
          zh: '生产结构清晰、信息密度高的内容，为 AI 系统提供更易检索、总结和引用的材料。'
        },
        bullets: [
          { en: '30 LLM-friendly articles per month, typically 800–2,000 words, across blogs, resource centers, FAQs, and comparison pages', zh: '每月产出 30 篇 LLM 友好文章，建议单篇 800—2,000 字，覆盖博客、资源中心、FAQ 与对比页等形式' },
          { en: 'Each article is built around the selected topic group with information-dense structure, headings, and schema recommendations where appropriate', zh: '每篇内容围绕当月话题策略撰写，具备高信息密度、清晰标题结构，并在适用处给出 Schema 建议' },
          { en: 'Distribution recommendations across the brand site and selected third-party platforms to diversify retrievable sources', zh: '为品牌官网与选定的第三方平台提供内容分发布局建议，增加可被 AI 检索的来源多样性' }
        ]
      },
      {
        id: 'geo-community-answers',
        title: { en: 'Reddit community and answer-scenario participation', zh: 'Reddit 社区与问答场景布局' },
        description: {
          en: 'Build trustworthy, context-aware participation in the places where users discuss products, workflows, and alternatives.',
          zh: '在用户讨论产品、工作流和替代方案的场景中，以符合社区语境的方式建立可信参与。'
        },
        bullets: [
          { en: '20 original, high-quality Reddit comments per month in relevant subreddits, designed as useful experience sharing rather than hard promotion', zh: '每月在相关 subreddit 发布 20 条原创高质量评论，以有价值的经验分享为主，不采用硬广表达' },
          { en: 'Question-and-answer scenario coverage on Reddit and other suitable high-authority Q&A platforms, coordinated with target topics', zh: '结合目标话题，在 Reddit 及其他适合的高权重问答平台布局专业回答场景' },
          { en: 'Community-specific tone, moderation, and posting guidance to reduce avoidable platform and brand risk', zh: '提供符合社区语气、版规与发布规范的建议，降低可避免的平台与品牌风险' }
        ]
      },
      {
        id: 'geo-video-distribution',
        title: { en: 'YouTube video publishing and metadata optimization', zh: 'YouTube 视频发布与元数据优化' },
        description: {
          en: 'Expand the brand’s searchable video footprint with keyword-aligned publishing and a consistent metadata workflow.',
          zh: '通过关键词对齐的发布与一致的元数据工作流，扩大品牌可检索的视频资产覆盖。'
        },
        bullets: [
          { en: '10 YouTube video releases per month, including channel publishing, title, description, tags, thumbnail setup, and basic metadata configuration', zh: '每月发布 10 条 YouTube 视频，包含频道发布、标题、描述、标签、封面配置与基础元数据设置' },
          { en: 'SEO and GEO optimization of video metadata around the selected monthly keywords and content topics', zh: '围绕当月关键词和内容话题，对视频元数据进行 SEO 与 GEO 优化' },
          { en: 'Client provides channel access, final video files, and thumbnail assets for each release', zh: '客户需提供频道权限、最终视频文件与每条视频所需的封面素材' }
        ]
      },
      {
        id: 'technical-geo-foundation',
        title: { en: 'Technical GEO foundation', zh: '技术 GEO 基础优化' },
        description: {
          en: 'Identify technical conditions that could limit AI crawlers’ access to content and provide an implementation-ready priority list.',
          zh: '识别可能限制 AI 爬虫访问与理解内容的技术条件，并提供可执行的优先级清单。'
        },
        bullets: [
          { en: 'One comprehensive technical check in month one, followed by monthly progress checks across schema, robots.txt, loading performance, internal links, and page accessibility', zh: '首月进行 1 次全面技术检查，后续按月跟进 Schema、robots.txt、页面加载、内链与页面可访问性' },
          { en: 'Implementation recommendations and acceptance criteria for the client’s technical team; code changes and website development are not included', zh: '向客户技术团队提供实施建议与验收口径；本服务不包含代码改造和网站开发' }
        ]
      },
      {
        id: 'geo-working-rhythm-reporting',
        title: { en: 'Working rhythm, review, and handover', zh: '推进节奏、复盘与交接' },
        description: {
          en: 'Operate the program through a visible weekly rhythm and turn the six-month work into a reusable GEO capability.',
          zh: '以透明的每周推进节奏运营项目，并将 6 个月的实践沉淀为可复用的 GEO 能力。'
        },
        bullets: [
          { en: 'One weekly working session, approximately 24 across a six-month cadence, covering delivery status, publishing, AI visibility changes, blockers, and next priorities', zh: '每周 1 次推进会，按 6 个月节奏约 24 次，覆盖交付状态、内容上线、AI 可见度变化、问题与下周优先级' },
          { en: 'Ongoing execution Q&A plus one monthly written review covering visibility, content production, Reddit activity, keyword coverage, and next-month direction', zh: '服务期内持续答疑，并每月交付 1 份书面复盘，覆盖 AI 可见度、内容产出、Reddit 运营、关键词覆盖与下月方向' },
          { en: 'One reusable template pack and a final six-month growth summary with recommendations for the next six months', zh: '交付 1 套可复用模板包，并在服务期末提供 6 个月增长总结与下一阶段 6 个月路线建议' }
        ]
      }
    ],
    outcomes: [],
    deliveryDescription: { en: 'The GEO program combines strategy, content, community, video, technical guidance, and a clear review cadence. Monthly volume and the six-month operating rhythm are shown directly in each workstream.', zh: 'GEO 项目同时覆盖策略、内容、社区、视频、技术建议与明确的复盘节奏。每个工作模块均直接列出月度数量与 6 个月执行节奏。' },
    deliveryPresentation: 'table',
    hideOutcomes: true,
    faqItems: [
      {
        question: { en: 'What is the difference between GEO and SEO?', zh: 'GEO 和 SEO 的区别是什么？' },
        answer: {
          en: 'SEO focuses on improving visibility in traditional search results. GEO focuses on increasing the chance that a brand is recognized, retrieved, cited, and recommended within AI-generated answers. The strongest programs connect both disciplines rather than treating them as substitutes.',
          zh: 'SEO 主要提升传统搜索结果中的可见性；GEO 更关注品牌在 AI 生成答案中被识别、检索、引用和推荐的概率。效果更好的项目会让两者协同，而不是把它们当成互相替代的服务。'
        }
      },
      {
        question: { en: 'What does the monthly GEO delivery include?', zh: 'GEO 每月的核心交付包含什么？' },
        answer: {
          en: 'The monthly production rhythm includes 30 keyword and topic groups, 30 LLM-friendly articles, 20 high-quality Reddit comments, 10 YouTube video releases, technical follow-up, a weekly working session, and a monthly review. The first month also establishes the AI visibility baseline, competitor analysis, prompt library, and technical priorities.',
          zh: '月度生产节奏包含 30 组关键词与话题策略、30 篇 LLM 友好文章、20 条高质量 Reddit 评论、10 条 YouTube 视频发布、技术跟进、每周推进会和月度复盘。首月还会完成 AI 可见度基线、竞品分析、Prompt 库与技术优先级。'
        }
      },
      {
        question: { en: 'What does the client need to provide?', zh: '客户需要配合提供什么？' },
        answer: {
          en: 'The client provides brand and product information, target-market and competitor context, relevant website and data access, content approval, website publishing, technical implementation, YouTube channel access, final video files, and thumbnail assets. We make these responsibilities explicit so production is not blocked.',
          zh: '客户需要提供品牌与产品资料、目标市场和竞品信息、相关网站与数据权限、内容审核、网站发布、技术实施，以及 YouTube 频道权限、最终视频文件和封面素材。我们会明确这些职责，避免生产与发布被阻塞。'
        }
      },
      {
        question: { en: 'Can you guarantee citations or recommendations from AI systems?', zh: '可以保证被 AI 系统引用或推荐吗？' },
        answer: {
          en: 'No. AI systems and their retrieval sources change continuously, and no provider can control their answers. We commit to transparent deliverables that improve the clarity, coverage, credibility, and distribution of the materials most likely to influence AI discovery.',
          zh: '不能。AI 系统及其检索来源持续变化，任何服务方都无法控制其答案。我们承诺以透明的交付提升品牌内容的清晰度、覆盖度、可信度和分发质量，从而提高影响 AI 发现路径的可能性。'
        }
      }
    ]
  }

]

export const serviceSlugs = servicePages.filter(service => service.slug !== 'reddit-services').map(service => service.slug)

export const getServiceBySlug = (slug: string) => servicePages.find(service => service.slug === slug)

export const getServiceSectionBySlug = (serviceSlug: string, sectionSlug: string) =>
  getServiceBySlug(serviceSlug)?.sections.find(section => section.id === sectionSlug)

export const getServiceSectionPage = (serviceSlug: string, sectionSlug: string): ServicePage | undefined => {
  const service = getServiceBySlug(serviceSlug)
  const section = getServiceSectionBySlug(serviceSlug, sectionSlug)

  if (!service || !section) {
    return undefined
  }

  return {
    ...service,
    title: section.title,
    description: section.description,
    intro: {
      en: `This page focuses specifically on ${section.title.en.toLowerCase()} inside our ${service.title.en.toLowerCase()} engagement, so you can review the scope, delivery logic, and expected workstream in one place.`,
      zh: `这一页专门聚焦我们${service.title.zh}中的“${section.title.zh}”模块，方便你单独查看这个子服务的范围、交付逻辑与执行重点。`
    },
    highlights: section.bullets,
    serviceIncludes: [section.title],
    sections: [section]
  }
}

export const serviceSectionParams = servicePages.flatMap(service =>
  service.sections.map(section => ({
    slug: service.slug,
    sectionSlug: section.id
  }))
)
