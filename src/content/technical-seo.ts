export type TechnicalSEOLang = 'en' | 'zh'

export const getTechnicalSEOLang = (value?: string): TechnicalSEOLang =>
  value?.toLowerCase().startsWith('zh') ? 'zh' : 'en'

export const technicalSEOCopy = {
  en: {
    metadata: {
      title: 'Technical SEO Services for SaaS and AI Companies | Meridian',
      description:
        'Technical SEO that gets implemented. Meridian turns crawl, indexation, rendering, site architecture, and Core Web Vitals findings into developer-ready priorities for SaaS and AI teams.',
      keywords: [
        'technical SEO services',
        'technical SEO audit',
        'SaaS technical SEO',
        'AI company SEO',
        'Core Web Vitals audit',
        'JavaScript SEO',
        'website migration SEO'
      ]
    },
    trustedBrandsTitle: 'Trusted by startups, enterprises, and industry giants alike.',
    hero: {
      badge: 'Technical SEO for SaaS & AI',
      title: 'Technical SEO Services for SaaS and AI Companies',
      description:
        'Technical SEO that your developers can actually implement. From crawling and indexing to JavaScript rendering, site architecture, and Core Web Vitals, we turn findings into clear, prioritized actions.',
      primaryCta: 'Get a Technical SEO Audit',
      secondaryCta: 'See What’s Included',
      trustPoints: ['Clear priorities', 'Developer-ready tickets', 'Implementation support', 'Measurable progress']
    },
    barrier: {
      eyebrow: 'The technical barrier',
      title: 'Your Content Can’t Rank If Search Engines Can’t Access It',
      paragraphs: [
        'You may already be publishing high-quality content, but technical problems can quietly limit its performance.',
        'Important pages may not be indexed. JavaScript may prevent content from being rendered correctly. Internal links may waste crawl paths. A site migration may have removed years of organic visibility.',
        'We identify these problems, explain their business impact, and help your team fix them in the right order.'
      ],
      cardTitle: 'Where technical friction shows up',
      cardDescription: 'The issues that most often constrain qualified organic growth.',
      painPoints: [
        'Pages are crawled but not indexed',
        'Organic traffic dropped after a migration',
        'Google cannot render important content',
        'Multiple URLs compete for the same intent',
        'Sitemaps contain low-value or broken pages',
        'Core Web Vitals are underperforming',
        'International pages target the wrong market',
        'New pages take too long to be discovered'
      ]
    },
    includes: {
      eyebrow: 'What’s included',
      title: 'What’s Included in Our Technical SEO Services',
      description:
        'We start with the site foundation that determines whether valuable pages can be discovered, understood, and improved over time.',
      modules: [
        {
          title: 'Technical SEO Audit',
          description:
            'A practical review of architecture, crawlability, indexation, rendering, performance, structured data, and international setup.',
          points: [
            'Crawl and indexation',
            'Status codes and redirects',
            'Canonicals and duplicate pages',
            'Sitemaps, robots, and internal linking'
          ]
        },
        {
          title: 'Crawling and Indexation',
          description:
            'Help search engines discover the right pages while duplicate, filtered, and low-value URLs stay out of the index.',
          points: [
            'Search Console analysis',
            'Index bloat and orphan pages',
            'Noindex and canonical logic',
            'Parameter URL and sitemap quality'
          ]
        },
        {
          title: 'Core Web Vitals',
          description:
            'Diagnose page-experience issues and give your development team a clear, prioritized remediation plan.',
          points: [
            'LCP, INP, and CLS',
            'Image and font loading',
            'JavaScript load and rendering work',
            'Render-blocking resources'
          ]
        },
        {
          title: 'Website Migration',
          description: 'Protect organic visibility across domain, platform, design, and URL migrations.',
          points: [
            'Migration plan and redirect map',
            'Pre-launch benchmark',
            'Staging audit',
            'Launch monitoring and validation'
          ]
        },
        {
          title: 'International SEO',
          description:
            'Serve the right language and regional pages to the right search audience across global markets.',
          points: [
            'Hreflang and language URLs',
            'Canonical alignment',
            'Country and language targeting',
            'International sitemap review'
          ]
        },
        {
          title: 'Structured Data',
          description:
            'Review and implement relevant schema so search engines better understand your company, products, content, and site structure.',
          points: [
            'Entity and organization markup',
            'Product and content schema',
            'Validation and error review',
            'No promises of rich-result eligibility'
          ]
        }
      ]
    },
    implementation: {
      eyebrow: 'Implementation, not shelfware',
      title: 'More Than a 100-Page Audit That Nobody Implements',
      paragraphs: [
        'A technical SEO audit is only valuable when the right fixes are implemented.',
        'We translate every finding into a prioritized action with a clear explanation, expected impact, recommended solution, and responsible owner. We can work directly with your developers through implementation and validation.'
      ],
      benefits: [
        'Business impact, not issue counts',
        'Developer-ready recommendations',
        'Weekly implementation support',
        'Validation after every fix',
        'Clear progress reporting'
      ],
      ledgerTitle: 'Developer-ready implementation ledger',
      ledgerDescription: 'An example of how audit findings become decisions and actions.',
      tableHeadings: ['Issue', 'Impact', 'Priority', 'Owner', 'Recommendation'],
      rows: [
        {
          issue: 'Product pages are not rendered in initial HTML',
          impact: 'Important content may not be indexed reliably',
          priority: 'Critical',
          owner: 'Engineering',
          recommendation: 'Implement server-side rendering for indexable product content'
        },
        {
          issue: 'Broken canonical URLs',
          impact: 'Ranking signals may be split across duplicate URLs',
          priority: 'High',
          owner: 'Engineering',
          recommendation: 'Generate self-referencing canonical tags and validate templates'
        },
        {
          issue: 'Orphan integration pages',
          impact: 'High-value pages are difficult for users and crawlers to discover',
          priority: 'High',
          owner: 'SEO / Content',
          recommendation: 'Add contextual category and integration links from relevant hubs'
        }
      ]
    },
    discovery: {
      eyebrow: 'Search discovery flow',
      title: 'See Where the Crawl-to-Conversion Path Breaks',
      description:
        'We trace the path from discovery through rendering and indexation, then connect technical changes to the pages that support qualified demand.',
      stages: [
        ['Discover', 'Crawlers find the URLs that matter.'],
        ['Render', 'Critical content is available to search engines.'],
        ['Index', 'The right pages are eligible to rank.'],
        ['Convert', 'Search visitors reach useful product paths.']
      ]
    },
    process: {
      eyebrow: 'The operating model',
      title: 'How Our Technical SEO Process Works',
      description:
        'A straightforward system for moving from site diagnosis to a verified release without losing the why behind each fix.',
      steps: [
        [
          'Discovery and Benchmarking',
          'We learn your product, architecture, target markets, previous migrations, and organic growth goals.',
          'Product interview · access checklist · benchmark data · early risk view'
        ],
        [
          'Technical Audit',
          'We crawl and inspect the site, review Search Console data, test page rendering, and isolate performance barriers.',
          'Crawl findings · rendering review · issue inventory · business impact'
        ],
        [
          'Prioritized Roadmap',
          'Every issue is prioritized by potential impact, implementation effort, and business importance.',
          'Prioritized backlog · owners · technical recommendations · acceptance criteria'
        ],
        [
          'Implementation Support',
          'We work with product and engineering teams through tickets, documentation, weekly meetings, and implementation reviews.',
          'Developer-ready tickets · working sessions · staging reviews · unblockers'
        ],
        [
          'Validation and Monitoring',
          'After release, we validate each fix and monitor crawling, indexation, performance, rankings, and organic conversions.',
          'Post-release QA · validation log · monitoring view · next actions'
        ]
      ],
      matrix: {
        eyebrow: 'Prioritization framework',
        title: 'Technical SEO Priority Matrix',
        description:
          'We sequence fixes by expected impact and implementation effort, not by the length of an audit spreadsheet.',
        impact: 'Expected impact',
        lowEffort: 'Low effort',
        highEffort: 'High effort',
        quadrants: [
          ['Fix first', 'High impact · Low effort', 'Resolve blocking crawl, canonical, or indexation issues quickly.'],
          [
            'Plan with engineering',
            'High impact · High effort',
            'Schedule rendering, architecture, and platform changes with owners.'
          ],
          [
            'Batch fixes',
            'Low impact · Low effort',
            'Group hygiene improvements into predictable maintenance releases.'
          ],
          [
            'Deprioritize',
            'Low impact · High effort',
            'Avoid spending engineering capacity before higher-leverage work ships.'
          ]
        ]
      }
    },
    deliverables: {
      eyebrow: 'What you’ll receive',
      title: 'A Technical SEO Engagement Your Team Can Run With',
      items: [
        'Complete Technical SEO audit',
        'Prioritized issue backlog',
        'Developer-ready implementation tickets',
        'Crawl and indexation analysis',
        'Site architecture and internal-linking recommendations',
        'JavaScript rendering review',
        'Core Web Vitals analysis',
        'Schema recommendations',
        'Measurement dashboard',
        'Weekly project meetings',
        'QA and validation after changes',
        'Phased progress reporting'
      ],
      note: 'Implementation can be completed by your development team with our support, or scoped separately with Meridian.',
      dashboard: {
        title: 'Technical progress view',
        description: 'A shared source of truth for implementation and validation.',
        counts: [
          ['Open', '08'],
          ['In review', '05'],
          ['Validated', '14']
        ],
        validation: 'Release validation',
        statuses: [
          ['Canonical templates', 'Validated'],
          ['Integration-page links', 'In review'],
          ['JavaScript rendering', 'Scheduled']
        ],
        monitoring: 'What we monitor',
        monitoringItems:
          'Crawl coverage · indexation quality · page experience · organic clicks · qualified conversions'
      }
    },
    fit: {
      builtEyebrow: 'Built for complex websites',
      builtTitle: 'Built for Complex SaaS and AI Websites',
      builtDescription:
        'Our technical SEO services are best suited for websites that already have a validated product, meaningful search demand, and a team capable of implementing technical improvements.',
      bestFor: [
        'SaaS products and AI tools',
        'Developer tools and JavaScript-heavy websites',
        'Multilingual global sites',
        'Sites with extensive integration pages',
        'Teams preparing a redesign or migration',
        'Publishers with substantial content but weak indexation'
      ],
      guidanceEyebrow: 'Right-fit guidance',
      guidanceTitle: 'When a full audit is not the first move',
      guidanceDescription:
        'If your website has only a few pages and no established search strategy, we may recommend starting with keyword research and on-page SEO before a full technical engagement.',
      guidanceLead: 'We will recommend the narrowest useful scope.',
      guidanceBody:
        'That could be a focused migration review, a JavaScript rendering check, or a technical roadmap that supports the next stage of your wider SEO program.',
      guidanceCta: 'Discuss your scope'
    },
    faq: {
      eyebrow: 'Technical SEO FAQ',
      title: 'Questions before you start',
      description: 'Clear expectations on scope, implementation, timing, and how we work alongside your team.',
      items: [
        [
          'What is included in a technical SEO audit?',
          'Our audit covers crawling, indexing, rendering, site architecture, internal linking, status codes, canonical tags, sitemaps, robots directives, structured data, Core Web Vitals, and international SEO where relevant.'
        ],
        [
          'How long does a technical SEO audit take?',
          'Most audits take two to four weeks. Larger websites, JavaScript applications, and international websites may require more time.'
        ],
        [
          'Do you implement the recommendations?',
          'We provide developer-ready recommendations and support your engineering team during implementation. Direct implementation can also be scoped separately depending on your technology stack.'
        ],
        [
          'When will we see results?',
          'Technical fixes can improve crawling and indexation within weeks, but ranking and organic conversion improvements usually take longer. The timeline depends on the issue, implementation speed, competition, and website authority.'
        ],
        [
          'Can you work with our developers?',
          'Yes. We can create implementation tickets, join technical meetings, review pull requests or staging changes, and validate fixes after release.'
        ],
        [
          'Do you guarantee rankings?',
          'No responsible SEO agency can guarantee rankings. We focus on removing technical barriers, improving website quality, and measuring the impact of implemented changes.'
        ],
        [
          'Do we need an ongoing engagement?',
          'Not always. You can begin with a one-time audit or choose ongoing technical SEO support for implementation, monitoring, migrations, and continuous optimization.'
        ]
      ]
    },
    cta: {
      title: 'Find Out What’s Holding Back Your Organic Growth',
      description:
        'Tell us about your website, product, and current SEO challenges. We’ll review your situation and recommend the right technical SEO scope.',
      buttonLabel: 'Request a Technical SEO Audit'
    }
  },
  zh: {
    metadata: {
      title: '面向 SaaS 与 AI 企业的技术 SEO 服务 | Meridian',
      description:
        '真正能够落地的技术 SEO。Meridian 将抓取、索引、渲染、网站架构和核心网页指标的发现，转化为 SaaS 与 AI 团队可直接执行的开发优先级。',
      keywords: [
        '技术 SEO 服务',
        '技术 SEO 审计',
        'SaaS 技术 SEO',
        'AI 企业 SEO',
        '核心网页指标审计',
        'JavaScript SEO',
        '网站迁移 SEO'
      ]
    },
    trustedBrandsTitle: '深受初创团队、成熟企业与行业领军品牌信赖。',
    hero: {
      badge: '面向 SaaS 与 AI 的技术 SEO',
      title: '面向 SaaS 与 AI 企业的技术 SEO 服务',
      description:
        '开发团队真正能够落地的技术 SEO。从抓取和索引，到 JavaScript 渲染、网站架构和核心网页指标，我们将问题转化为清晰、可排序、可执行的行动方案。',
      primaryCta: '获取技术 SEO 审计',
      secondaryCta: '查看服务内容',
      trustPoints: ['优先级清晰', '开发可直接执行的工单', '落地实施支持', '进展可量化']
    },
    barrier: {
      eyebrow: '技术瓶颈',
      title: '如果搜索引擎无法访问内容，优质内容也难以获得排名',
      paragraphs: [
        '即使你已经持续发布高质量内容，技术问题仍可能在不易察觉的地方限制其表现。',
        '重要页面可能没有被收录；JavaScript 可能导致内容无法正确渲染；内部链接可能浪费抓取路径；一次网站迁移也可能抹去多年积累的自然流量。',
        '我们识别这些问题，解释它们对业务的影响，并帮助团队按正确顺序完成修复。'
      ],
      cardTitle: '技术摩擦通常出现在哪里',
      cardDescription: '最常限制高质量自然增长的常见问题。',
      painPoints: [
        '页面已被抓取但没有被收录',
        '网站迁移后自然流量下降',
        'Google 无法正确渲染重要内容',
        '多个 URL 在争夺同一搜索意图',
        '站点地图包含低价值或失效页面',
        '核心网页指标表现不佳',
        '国际化页面定位了错误的市场',
        '新页面被发现的速度过慢'
      ]
    },
    includes: {
      eyebrow: '服务包含内容',
      title: '我们的技术 SEO 服务包含什么',
      description: '我们从决定重要页面能否被发现、理解并持续优化的网站基础开始。',
      modules: [
        {
          title: '技术 SEO 审计',
          description: '围绕网站架构、可抓取性、索引、渲染、性能、结构化数据和国际化配置的实用评估。',
          points: ['抓取与索引', '状态码与重定向', '规范标签与重复页面', '站点地图、robots 与内部链接']
        },
        {
          title: '抓取与索引',
          description: '帮助搜索引擎发现真正重要的页面，同时让重复、筛选和低价值 URL 留在索引之外。',
          points: [
            'Search Console 数据分析',
            '索引膨胀与孤立页面',
            'noindex 与 canonical 逻辑',
            '参数 URL 与站点地图质量'
          ]
        },
        {
          title: '核心网页指标',
          description: '诊断页面体验问题，并为开发团队提供清晰、可排序的修复方案。',
          points: ['LCP、INP 与 CLS', '图片与字体加载', 'JavaScript 加载与渲染工作', '阻塞渲染的资源']
        },
        {
          title: '网站迁移',
          description: '在域名、平台、设计或 URL 迁移过程中保护自然搜索可见度。',
          points: ['迁移方案与重定向映射', '上线前基准数据', '预发布环境审计', '上线监测与验证']
        },
        {
          title: '国际化 SEO',
          description: '让不同语言和区域的页面触达对应市场中的正确搜索用户。',
          points: ['hreflang 与语言 URL', 'canonical 一致性', '国家与语言定位', '国际化站点地图审核']
        },
        {
          title: '结构化数据',
          description: '审核并实施合适的 Schema，帮助搜索引擎更好理解你的公司、产品、内容和网站结构。',
          points: ['实体与组织标记', '产品与内容 Schema', '验证与错误审核', '不承诺获得富媒体结果资格']
        }
      ]
    },
    implementation: {
      eyebrow: '强调落地，而不是交付一份无人执行的报告',
      title: '不止是一份 100 页却无人落实的审计报告',
      paragraphs: [
        '只有当正确的修复被真正实施，技术 SEO 审计才有价值。',
        '我们将每项发现转化为已排序的行动项，明确解释问题、预期影响、建议方案和负责角色；并能与开发团队共同推进实施和验证。'
      ],
      benefits: [
        '关注业务影响，而非问题数量',
        '开发可直接执行的建议',
        '每周落地支持',
        '每次修复后的验证',
        '清晰的进展汇报'
      ],
      ledgerTitle: '开发可执行的实施台账',
      ledgerDescription: '示例：审计发现如何转化为明确的决策与行动。',
      tableHeadings: ['问题', '影响', '优先级', '负责人', '建议方案'],
      rows: [
        {
          issue: '产品页面未在初始 HTML 中渲染',
          impact: '重要内容可能无法被稳定收录',
          priority: '紧急',
          owner: '研发团队',
          recommendation: '为可索引的产品内容实施服务端渲染'
        },
        {
          issue: 'canonical URL 失效',
          impact: '排名信号可能被分散到重复页面',
          priority: '高',
          owner: '研发团队',
          recommendation: '生成自指向 canonical 标签，并验证页面模板'
        },
        {
          issue: '集成页成为孤立页面',
          impact: '高价值页面难以被用户与爬虫发现',
          priority: '高',
          owner: 'SEO / 内容团队',
          recommendation: '从相关枢纽页面补充上下文分类与集成链接'
        }
      ]
    },
    discovery: {
      eyebrow: '搜索发现流程',
      title: '定位从抓取到转化的断点',
      description: '我们追踪从发现、渲染到索引的完整路径，并将技术改动连接到承接高质量需求的页面。',
      stages: [
        ['发现', '爬虫找到真正重要的 URL。'],
        ['渲染', '关键内容可被搜索引擎读取。'],
        ['收录', '正确页面获得参与排名的资格。'],
        ['转化', '搜索访客到达有价值的产品路径。']
      ]
    },
    process: {
      eyebrow: '服务方法',
      title: '我们的技术 SEO 工作流程',
      description: '从网站诊断到验证上线的一套清晰流程，不丢失每项修复背后的业务原因。',
      steps: [
        [
          '了解与建立基准',
          '我们了解你的产品、架构、目标市场、历史迁移情况和自然增长目标。',
          '产品访谈 · 权限清单 · 基准数据 · 初步风险判断'
        ],
        [
          '技术审计',
          '我们抓取并检查网站，审核 Search Console 数据，测试页面渲染，并定位性能瓶颈。',
          '抓取发现 · 渲染审核 · 问题清单 · 业务影响'
        ],
        [
          '优先级路线图',
          '每个问题都会根据潜在影响、实施成本和业务重要性进行排序。',
          '优先级待办 · 负责人 · 技术建议 · 验收标准'
        ],
        [
          '实施支持',
          '我们通过工单、文档、每周会议和实施审核，与产品和研发团队共同推进。',
          '开发工单 · 工作会议 · 预发布审核 · 阻塞项排查'
        ],
        [
          '验证与监测',
          '上线后，我们验证每一项修复，并持续监测抓取、索引、性能、排名和自然转化。',
          '上线后 QA · 验证记录 · 监测视图 · 后续行动'
        ]
      ],
      matrix: {
        eyebrow: '优先级框架',
        title: '技术 SEO 优先级矩阵',
        description: '我们依据预期影响与实施成本安排修复顺序，而非依据审计表格的页数。',
        impact: '预期影响',
        lowEffort: '低成本',
        highEffort: '高成本',
        quadrants: [
          ['优先修复', '高影响 · 低成本', '快速解决阻塞抓取、canonical 或索引的问题。'],
          ['与研发排期', '高影响 · 高成本', '将渲染、架构和平台改造纳入有负责人的研发计划。'],
          ['批量处理', '低影响 · 低成本', '将页面卫生类优化合并为可预测的维护发布。'],
          ['暂缓处理', '低影响 · 高成本', '在高杠杆工作上线前，避免占用过多研发资源。']
        ]
      }
    },
    deliverables: {
      eyebrow: '你将获得',
      title: '团队真正能够推进的技术 SEO 合作方案',
      items: [
        '完整的技术 SEO 审计',
        '已排序的问题待办',
        '开发可直接执行的实施工单',
        '抓取与索引分析',
        '网站架构与内部链接建议',
        'JavaScript 渲染审核',
        '核心网页指标分析',
        'Schema 建议',
        '数据监测看板',
        '每周项目会议',
        '修改后的 QA 与验证',
        '分阶段进展汇报'
      ],
      note: '实施可以由你的开发团队在我们的支持下完成，也可以与 Meridian 单独约定实施范围。',
      dashboard: {
        title: '技术进度视图',
        description: '用于实施与验证的共享信息源。',
        counts: [
          ['待处理', '08'],
          ['审核中', '05'],
          ['已验证', '14']
        ],
        validation: '发布验证',
        statuses: [
          ['canonical 模板', '已验证'],
          ['集成页面链接', '审核中'],
          ['JavaScript 渲染', '已排期']
        ],
        monitoring: '我们持续监测',
        monitoringItems: '抓取覆盖 · 索引质量 · 页面体验 · 自然点击 · 高质量转化'
      }
    },
    fit: {
      builtEyebrow: '为复杂网站而生',
      builtTitle: '专为复杂的 SaaS 与 AI 网站打造',
      builtDescription: '我们的技术 SEO 服务尤其适合已有成熟产品、具备明确搜索需求，并拥有实施技术改进能力的团队。',
      bestFor: [
        'SaaS 产品与 AI 工具',
        '开发者工具与 JavaScript 较重的网站',
        '多语言全球化网站',
        '拥有大量集成页面的网站',
        '准备重设计或迁移的团队',
        '内容规模较大但索引较弱的发布方'
      ],
      guidanceEyebrow: '适配建议',
      guidanceTitle: '何时不应先做完整审计',
      guidanceDescription:
        '如果网站页面不多，且尚未建立搜索策略，我们可能建议先进行关键词研究和站内 SEO，再启动完整的技术合作。',
      guidanceLead: '我们会建议最小但真正有用的服务范围。',
      guidanceBody: '这可能是一次聚焦的迁移审核、JavaScript 渲染检查，或支持更大 SEO 阶段的技术路线图。',
      guidanceCta: '讨论你的需求'
    },
    faq: {
      eyebrow: '技术 SEO 常见问题',
      title: '开始前你可能想了解的问题',
      description: '清晰说明服务范围、实施方式、时间安排，以及我们如何与团队协作。',
      items: [
        [
          '技术 SEO 审计包含什么？',
          '我们的审计涵盖抓取、索引、渲染、网站架构、内部链接、状态码、canonical 标签、站点地图、robots 指令、结构化数据、核心网页指标，以及适用时的国际化 SEO。'
        ],
        [
          '一次技术 SEO 审计通常需要多久？',
          '大多数审计需要两到四周。大型网站、JavaScript 应用和国际化网站可能需要更长时间。'
        ],
        [
          '你们会直接实施建议吗？',
          '我们会提供开发可直接执行的建议，并在实施期间支持研发团队。直接实施也可根据你的技术栈单独确定范围。'
        ],
        [
          '什么时候能看到结果？',
          '技术修复可能在数周内改善抓取和收录，但排名与自然转化的提升通常需要更长时间，具体取决于问题、实施速度、竞争度和网站权威度。'
        ],
        [
          '可以和我们的开发团队协作吗？',
          '可以。我们可以创建实施工单、参加技术会议、审核 PR 或预发布改动，并在上线后验证修复。'
        ],
        [
          '你们保证排名吗？',
          '任何负责任的 SEO 服务商都无法保证排名。我们专注于移除技术障碍、提升网站质量，并衡量已实施改动带来的影响。'
        ],
        [
          '需要长期合作吗？',
          '不一定。你可以从一次性审计开始，或选择持续的技术 SEO 支持，用于实施、监测、迁移和长期优化。'
        ]
      ]
    },
    cta: {
      title: '找出正在阻碍自然增长的技术问题',
      description: '告诉我们你的网站、产品和当前 SEO 挑战。我们会评估现状，并建议合适的技术 SEO 合作范围。',
      buttonLabel: '申请技术 SEO 审计'
    }
  }
} as const
