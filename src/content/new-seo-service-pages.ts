import type { SpecializedServiceLang, SpecializedServicePageContent } from '@/content/specialized-service-pages'

export const newSeoServicePages = {
  linkBuilding: {
    en: {
      metadata: {
        title: 'Link Building Services & Digital PR for SaaS | Meridian',
        description:
          'Earn relevant, defensible links with a link building and digital PR program built around target pages, editorial value, quality control, and transparent reporting.',
        keywords: [
          'link building services',
          'link building agency',
          'digital PR agency',
          'SaaS link building',
          'white hat link building'
        ]
      },
      serviceType: 'Link Building and Digital PR',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'Authority Built to Last',
        title: 'Link Building Services That Earn Relevant, Defensible Authority',
        description:
          'We connect link acquisition to the pages that need authority, then use editorial outreach, digital PR, partnerships, and linkable assets to earn placements your team can stand behind.',
        primaryCta: 'Book a Link Building Review',
        secondaryCta: 'See How We Build Links',
        trustPoints: [
          'Target-page strategy',
          'Editorial quality control',
          'Transparent placement records',
          'Risk-aware execution'
        ]
      },
      challenge: {
        eyebrow: 'Why authority stalls',
        title: 'More Links Do Not Help When Relevance, Quality, and Page Strategy Are Missing',
        paragraphs: [
          'Many link programs begin with a volume target and only later ask whether the placements support the pages that matter.',
          'That creates disconnected mentions, weak target-page alignment, risky anchors, and reports full of domains that never strengthen the commercial search strategy.',
          'We start with the ranking opportunity and build an acquisition plan around relevance, editorial value, and a clear reason for every link.'
        ],
        cardTitle: 'What weak programs get wrong',
        cardDescription: 'The common gaps that turn link building into an activity report instead of a growth lever.',
        painPoints: [
          'Placements are unrelated to the target market',
          'Links point only to the homepage',
          'Anchor text looks forced or repetitive',
          'Outreach has no genuinely useful angle',
          'Quality checks stop at a single metric',
          'The team cannot verify what was delivered'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'A Link Building Program From Target Pages to Verified Placements',
        description:
          'Each workstream connects authority acquisition to a real SEO priority while keeping quality criteria and delivery status visible.',
        modules: [
          {
            title: 'Authority and Gap Analysis',
            description:
              'Identify where competitors earn trust and which pages on your site need additional authority.',
            points: [
              'Competitor backlink gap',
              'Target-page prioritization',
              'Linkable-asset review',
              'Risk and baseline assessment'
            ]
          },
          {
            title: 'Link Acquisition Strategy',
            description: 'Match each target page to the acquisition methods and editorial angles most likely to work.',
            points: [
              'Page-to-tactic mapping',
              'Anchor-text guardrails',
              'Prospect criteria',
              'Monthly opportunity plan'
            ]
          },
          {
            title: 'Editorial Outreach',
            description:
              'Run relevance-led outreach to publishers, resource owners, partners, and subject-matter experts.',
            points: [
              'Prospect qualification',
              'Personalized pitching',
              'Editorial coordination',
              'Follow-up management'
            ]
          },
          {
            title: 'Digital PR and Assets',
            description: 'Develop credible stories and useful assets that can earn coverage beyond direct outreach.',
            points: ['Data-led story angles', 'Expert commentary', 'Resource assets', 'Partnership opportunities']
          },
          {
            title: 'Quality Control and Reporting',
            description: 'Validate every delivered placement and keep its status, destination, and context auditable.',
            points: ['Relevance review', 'Placement verification', 'Risk monitoring', 'Target URL and anchor log']
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Run Link Building and Digital PR',
        description:
          'The program moves from ranking priorities to qualified opportunities, active outreach, and verified delivery.',
        steps: [
          {
            title: 'Set Authority Priorities',
            description: 'We identify the commercial pages and topic areas where links can change ranking potential.',
            output: 'Target-page map'
          },
          {
            title: 'Build the Opportunity List',
            description: 'We qualify relevant publications, resources, partners, and editorial angles.',
            output: 'Qualified prospect set'
          },
          {
            title: 'Create the Pitch or Asset',
            description: 'We prepare the story, resource, expert input, or contribution needed to earn attention.',
            output: 'Outreach assets'
          },
          {
            title: 'Run Outreach and Follow-up',
            description: 'We manage communication and editorial coordination without relying on generic mass email.',
            output: 'Active outreach pipeline'
          },
          {
            title: 'Verify and Learn',
            description:
              'We record live placements, review quality, and use response patterns to improve the next cycle.',
            output: 'Placement report and next plan'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'Clear Assets and Records Behind Every Link Building Cycle',
        items: [
          'Backlink gap analysis',
          'Priority target-page map',
          'Acquisition strategy',
          'Prospect qualification criteria',
          'Outreach angle library',
          'Linkable-asset recommendations',
          'Anchor-text guardrails',
          'Live outreach status',
          'Verified placement log',
          'Monthly learning summary'
        ],
        note: 'Placement volume and timelines vary by market, editorial response, and asset quality. Paid placements are never added without explicit approval.',
        summaryTitle: 'Authority tied to the pages that drive growth',
        summaryDescription: 'Every opportunity has a target, a quality rationale, and a visible delivery status.',
        summaryPoints: [
          'Relevance before raw volume',
          'Commercial pages receive intentional support',
          'Quality and risk criteria stay explicit',
          'Reporting remains easy to audit'
        ]
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for SaaS, AI, B2B, and service brands competing in valuable search categories',
        description:
          'This service works best when the site has credible content and commercial pages that need stronger external authority to compete.',
        bullets: [
          'SaaS and AI companies in competitive SERPs',
          'B2B teams with valuable solution pages',
          'Brands with strong expertise but few mentions',
          'Sites recovering from low-quality link tactics',
          'Teams launching original data or resources',
          'Companies that need transparent delivery records'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions About Link Building Services',
        description:
          'Clear answers about quality, guarantees, paid placements, and how authority work connects to SEO.',
        items: [
          {
            question: 'Do you guarantee a specific number of links?',
            answer:
              'We scope a realistic delivery range based on the market and tactics, but we do not promise editorial outcomes we cannot control.\n\nThe program reports both the active pipeline and verified live placements.'
          },
          {
            question: 'How do you evaluate link quality?',
            answer:
              'We review topical and audience relevance, editorial context, site quality, traffic patterns, placement type, destination URL, anchor text, and obvious risk signals.\n\nNo single third-party metric decides quality.'
          },
          {
            question: 'Do you buy links?',
            answer:
              'We prioritize editorial outreach, useful assets, expert contributions, partnerships, and digital PR.\n\nIf a legitimate sponsorship or paid opportunity is relevant, it is disclosed and requires approval before any commitment.'
          },
          {
            question: 'Can link building support specific product pages?',
            answer:
              'Yes. Target-page planning is central to the service.\n\nWe balance direct product-page opportunities with supporting assets and internal links so the approach remains natural and defensible.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: '外链建设与数字公关服务 | Meridian',
        description:
          '围绕目标页面、内容价值、质量审核与透明报告，通过编辑型外联、数字公关和可链接资产获取相关且可持续的外链。',
        keywords: ['外链建设服务', 'link building agency', '数字公关服务', 'SaaS 外链建设', '白帽外链']
      },
      serviceType: '外链建设与数字公关',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: '可持续的站外权威',
        title: '围绕相关性与真实价值展开的外链建设服务',
        description:
          '我们先确认哪些页面真正需要权威支持，再通过编辑型外联、数字公关、合作关系和可链接资产，获取团队能够放心长期保留的优质提及。',
        primaryCta: '预约外链策略评估',
        secondaryCta: '查看执行方式',
        trustPoints: ['目标页面策略', '编辑质量审核', '透明交付记录', '风险可控执行']
      },
      challenge: {
        eyebrow: '为什么权威增长停滞',
        title: '如果缺少相关性、质量和页面策略，再多外链也难以形成增长',
        paragraphs: [
          '很多外链项目先设数量目标，最后才考虑这些链接是否真的支持重要页面。',
          '结果往往是品牌提及与业务无关、链接全部指向首页、锚文本生硬，报告里有很多域名，却没有真正增强商业关键词的竞争力。',
          '我们从排名机会出发，为每条外链明确相关性、编辑价值与目标页面。'
        ],
        cardTitle: '低质量项目的常见问题',
        cardDescription: '这些问题会让外链建设变成活动报表，而不是增长杠杆。',
        painPoints: [
          '来源与目标市场不相关',
          '链接只指向首页',
          '锚文本重复或不自然',
          '外联缺少真正有价值的角度',
          '质量判断只看一个指标',
          '团队无法验证具体交付'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: '从目标页面到已验证链接的一套完整外链方案',
        description: '每条工作流都对应真实 SEO 优先级，同时让质量标准和交付状态保持透明。',
        modules: [
          {
            title: '权威与差距分析',
            description: '识别竞品从哪里获得信任，以及站内哪些页面最需要权威支持。',
            points: ['竞品外链差距', '目标页面排序', '可链接资产审核', '风险与基线评估']
          },
          {
            title: '外链获取策略',
            description: '为不同目标页匹配更合适的获取方式与编辑角度。',
            points: ['页面与战术匹配', '锚文本边界', '资源筛选标准', '月度机会计划']
          },
          {
            title: '编辑型外联',
            description: '围绕相关媒体、资源页、合作伙伴与行业专家进行高相关度沟通。',
            points: ['资源资格审核', '个性化 Pitch', '编辑协调', '持续跟进']
          },
          {
            title: '数字公关与资产',
            description: '用可信故事与有用资产获取不局限于直接外联的自然报道。',
            points: ['数据故事角度', '专家观点', '资源型资产', '合作机会']
          },
          {
            title: '质量审核与报告',
            description: '验证每条交付，并记录状态、目标页面与具体语境。',
            points: ['相关性审核', '链接存活验证', '风险监测', '目标 URL 与锚文本记录']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何执行外链建设与数字公关',
        description: '项目从排名优先级出发，推进到机会筛选、外联执行和最终交付验证。',
        steps: [
          {
            title: '确定权威优先级',
            description: '找出外链最可能改变排名潜力的商业页面和主题。',
            output: '目标页面地图'
          },
          { title: '建立机会清单', description: '筛选相关媒体、资源、合作方与编辑角度。', output: '合格资源清单' },
          { title: '准备 Pitch 或资产', description: '准备数据、故事、专家输入或贡献内容。', output: '外联资产' },
          { title: '执行外联与跟进', description: '管理沟通与编辑协调，不依赖泛化群发邮件。', output: '外联管道' },
          {
            title: '验证并复盘',
            description: '记录上线链接、审核质量，并用反馈优化下一周期。',
            output: '交付报告与下期计划'
          }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: '每个外链周期背后清晰可查的资产与记录',
        items: [
          '外链差距分析',
          '重点目标页面地图',
          '外链获取策略',
          '资源筛选标准',
          '外联角度库',
          '可链接资产建议',
          '锚文本边界',
          '实时外联状态',
          '已验证链接记录',
          '月度复盘总结'
        ],
        note: '实际数量和时间会受到市场、编辑响应和资产质量影响。任何付费机会都不会在未获得明确批准的情况下执行。',
        summaryTitle: '让权威真正支持增长页面',
        summaryDescription: '每个机会都有明确目标、质量理由和可见交付状态。',
        summaryPoints: ['相关性优先于单纯数量', '有意支持重点商业页面', '质量与风险标准明确', '报告易于审核和追踪']
      },
      fit: {
        eyebrow: '适合谁',
        title: '适合参与高价值搜索竞争的 SaaS、AI、B2B 与服务品牌',
        description: '当网站已有可信内容和商业页面，但缺少足够站外权威时，这项服务最容易产生价值。',
        bullets: [
          '竞争激烈的 SaaS 与 AI 公司',
          '拥有高价值解决方案页的 B2B 团队',
          '专业能力强但品牌提及较少的公司',
          '需要摆脱低质量外链历史的网站',
          '准备发布原创数据或资源的团队',
          '需要透明交付记录的市场团队'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于外链建设的常见问题',
        description: '集中说明质量、承诺、付费机会及外链与 SEO 的关系。',
        items: [
          {
            question: '你们会保证固定数量的外链吗？',
            answer:
              '我们会根据市场与执行方式约定合理交付范围，但不会承诺无法控制的编辑结果。\n\n报告会同时显示正在推进的机会与已经验证上线的链接。'
          },
          {
            question: '你们如何判断外链质量？',
            answer:
              '我们会综合判断主题与受众相关性、编辑语境、网站质量、流量表现、链接类型、目标 URL、锚文本和明显风险。\n\n不会只依赖某一个第三方指标。'
          },
          {
            question: '你们会购买外链吗？',
            answer:
              '我们优先使用编辑型外联、有用资产、专家贡献、合作关系和数字公关。\n\n如果出现合理的赞助或付费机会，会提前披露，并在获得批准后才会推进。'
          },
          {
            question: '外链可以直接支持产品页面吗？',
            answer:
              '可以，目标页面规划是服务核心。\n\n我们会平衡直接产品页机会、支持性资产和内链，让整体结构更自然且可持续。'
          }
        ]
      }
    }
  },
  keywordResearch: {
    en: {
      metadata: {
        title: 'Keyword Research Services & SEO Strategy | Meridian',
        description:
          'Turn search demand into an actionable keyword strategy with intent classification, topic clusters, opportunity scoring, and clear keyword-to-page ownership.',
        keywords: [
          'keyword research services',
          'keyword strategy',
          'SEO keyword research',
          'keyword mapping',
          'search intent analysis'
        ]
      },
      serviceType: 'Keyword Research and Strategy',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'Search Demand, Mapped to Action',
        title: 'Keyword Research Services That Tell Every Query Where to Go',
        description:
          'We turn scattered search data into a prioritized plan: which topics matter, what intent they represent, which URL should own them, and what your team should create or improve first.',
        primaryCta: 'Book a Keyword Strategy Review',
        secondaryCta: 'See What You Receive',
        trustPoints: [
          'Intent-led research',
          'Keyword-to-page mapping',
          'Opportunity scoring',
          'Execution-ready priorities'
        ]
      },
      challenge: {
        eyebrow: 'Why keyword lists fail',
        title: 'Search Volume Alone Does Not Tell Your Team What to Build',
        paragraphs: [
          'A long export can look comprehensive while leaving the most important decisions unresolved.',
          'Without intent, business relevance, page ownership, and realistic ranking context, teams create overlapping pages, chase vanity volume, and publish content that never reaches a conversion path.',
          'We make the research useful by connecting every meaningful cluster to a page decision and a clear priority.'
        ],
        cardTitle: 'What an export cannot answer',
        cardDescription: 'The decisions teams still need after a basic keyword tool download.',
        painPoints: [
          'Which terms have commercial value',
          'Which queries belong on one page',
          'Whether to create or optimize a URL',
          'Where pages may cannibalize each other',
          'What competitors leave uncovered',
          'What should enter production first'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'Keyword Research Built for Site Architecture and Production',
        description:
          'The work moves beyond collection into classification, clustering, page mapping, and an execution sequence.',
        modules: [
          {
            title: 'Market and Seed Discovery',
            description:
              'Build the search universe from products, audiences, use cases, competitors, and customer language.',
            points: [
              'Business and product inputs',
              'Competitor query discovery',
              'Customer-language mining',
              'Seed expansion'
            ]
          },
          {
            title: 'Intent Classification',
            description: 'Separate informational discovery from commercial evaluation and conversion-oriented demand.',
            points: [
              'Search intent labels',
              'Funnel-stage mapping',
              'SERP pattern review',
              'Commercial relevance scoring'
            ]
          },
          {
            title: 'Topic and Keyword Clustering',
            description:
              'Group related queries around the page that can satisfy them without creating unnecessary overlap.',
            points: [
              'Semantic clusters',
              'Primary and secondary terms',
              'Parent-topic logic',
              'Cannibalization prevention'
            ]
          },
          {
            title: 'Keyword-to-Page Mapping',
            description: 'Give every priority cluster an existing or proposed URL and a clear page type.',
            points: [
              'URL ownership',
              'Create-versus-optimize decision',
              'Page-type recommendation',
              'Internal-link relationships'
            ]
          },
          {
            title: 'Opportunity Prioritization',
            description:
              'Rank the work using demand, difficulty, business value, current authority, and production effort.',
            points: ['Opportunity score', 'Quick-win identification', 'Priority tiers', '90-day execution sequence']
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Turn Search Demand Into a Keyword Strategy',
        description: 'Each stage removes uncertainty until the team has a page-level roadmap it can execute.',
        steps: [
          {
            title: 'Understand the Business',
            description: 'We align products, audiences, markets, conversion paths, and growth constraints.',
            output: 'Research brief'
          },
          {
            title: 'Build the Search Universe',
            description: 'We combine seed terms, competitor coverage, SERP patterns, and customer language.',
            output: 'Candidate keyword set'
          },
          {
            title: 'Classify and Cluster',
            description: 'We organize queries by intent, topic, funnel stage, and page relationship.',
            output: 'Intent-led clusters'
          },
          {
            title: 'Map Keywords to URLs',
            description: 'Every priority cluster receives an owner, recommended page type, and next action.',
            output: 'Keyword-to-page map'
          },
          {
            title: 'Prioritize the Roadmap',
            description: 'We rank the opportunities and translate them into a realistic production sequence.',
            output: '90-day priority plan'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'A Keyword Strategy Your SEO, Content, and Product Teams Can Share',
        items: [
          'Research assumptions',
          'Market and competitor keyword set',
          'Intent classification',
          'Topic clusters',
          'Primary and secondary keywords',
          'Search-demand metrics',
          'Business relevance scoring',
          'Keyword-to-page ownership map',
          'Cannibalization flags',
          '90-day priority roadmap'
        ],
        note: 'Final page copy, article production, and website implementation are scoped separately. The research is structured so those teams can begin without repeating discovery.',
        summaryTitle: 'One shared source of truth for search priorities',
        summaryDescription:
          'The output explains not only what people search, but what the business should do about it.',
        summaryPoints: [
          'Every priority cluster has an owner',
          'Commercial and informational intent stay distinct',
          'New pages and existing updates are separated',
          'Teams know what to execute first'
        ]
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for teams planning a new site, content program, market entry, or SEO reset',
        description:
          'Keyword research creates the most leverage before production scales or when an existing site has unclear page ownership.',
        bullets: [
          'New websites defining architecture',
          'SaaS teams expanding use-case coverage',
          'Brands entering a new market or language',
          'Sites with overlapping content',
          'Content teams building a quarterly roadmap',
          'SEO programs that need business-led priorities'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions About Keyword Research Services',
        description: 'A few practical answers about scope, tools, search volume, and how the output gets used.',
        items: [
          {
            question: 'Is this just a spreadsheet of keywords?',
            answer:
              'No. The keyword set is only the raw material.\n\nThe main value is intent classification, clustering, URL ownership, opportunity scoring, and a roadmap that tells the team what to create or improve.'
          },
          {
            question: 'Do you map keywords to our existing pages?',
            answer:
              'Yes. We review the current site and assign clusters to suitable URLs where possible.\n\nWhen no current page can satisfy the intent, we recommend a new page and explain its role.'
          },
          {
            question: 'How do you choose priorities?',
            answer:
              'We combine demand, business relevance, intent, current rankings and authority, competitive difficulty, traffic potential, and production effort.\n\nA lower-volume commercial term can rank above a high-volume informational term when it is more valuable to the business.'
          },
          {
            question: 'Can you research multiple countries or languages?',
            answer:
              'Yes. Each market needs its own demand data, SERP review, language context, and page-mapping decisions.\n\nWe scope markets separately so translated wording is not mistaken for actual local search behavior.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: '关键词研究与 SEO 关键词策略服务 | Meridian',
        description: '通过搜索意图分类、话题聚类、机会评分和关键词页面映射，把搜索需求转化成可直接执行的关键词策略。',
        keywords: ['关键词研究服务', '关键词策略', 'SEO 关键词研究', '关键词页面映射', '搜索意图分析']
      },
      serviceType: '关键词研究与策略',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: '把搜索需求映射到行动',
        title: '让每组搜索需求都有明确承接页面的关键词研究服务',
        description:
          '我们把分散的搜索数据整理成优先级清晰的计划：哪些主题重要、对应什么意图、由哪个 URL 承接，以及团队应该先新建还是优化哪些页面。',
        primaryCta: '预约关键词策略评估',
        secondaryCta: '查看具体交付',
        trustPoints: ['基于搜索意图', '关键词页面映射', '机会评分', '可直接执行的优先级']
      },
      challenge: {
        eyebrow: '为什么关键词清单不好用',
        title: '仅有搜索量，仍然无法告诉团队应该建设什么',
        paragraphs: [
          '一份很长的导出表可能看起来很全面，却没有解决真正重要的决策。',
          '如果缺少意图、业务相关性、页面归属和真实竞争环境，团队会创建互相重叠的页面、追逐虚高流量，并持续发布无法连接到转化路径的内容。',
          '我们把每个有效集群连接到明确页面决策和执行优先级，让研究真正进入生产。'
        ],
        cardTitle: '基础导出无法回答的问题',
        cardDescription: '从关键词工具导出后，团队依然需要解决这些决策。',
        painPoints: [
          '哪些词真正有商业价值',
          '哪些查询应该由同一页面承接',
          '应该新建还是优化页面',
          '哪些页面可能互相蚕食',
          '竞品留下了哪些空白',
          '生产队列应该先做什么'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: '直接服务于网站架构和内容生产的关键词研究',
        description: '项目不止收集数据，还会完成分类、聚类、页面映射与执行排序。',
        modules: [
          {
            title: '市场与种子词发现',
            description: '从产品、受众、使用场景、竞品和客户语言建立完整搜索范围。',
            points: ['业务与产品输入', '竞品关键词发现', '客户语言挖掘', '种子词扩展']
          },
          {
            title: '搜索意图分类',
            description: '区分信息发现、商业评估和转化型搜索需求。',
            points: ['搜索意图标签', '漏斗阶段映射', 'SERP 形态审核', '商业相关性评分']
          },
          {
            title: '话题与关键词聚类',
            description: '将相关查询聚合到能够完整满足需求的页面，避免无意义拆页。',
            points: ['语义集群', '主词与副词', '父主题逻辑', '关键词蚕食预防']
          },
          {
            title: '关键词页面映射',
            description: '为每个重点集群分配现有或建议 URL，并明确页面类型。',
            points: ['URL 归属', '新建或优化判断', '页面类型建议', '内链关系']
          },
          {
            title: '机会优先级排序',
            description: '综合需求、难度、业务价值、现有权威和生产成本排序。',
            points: ['机会评分', 'Quick win 识别', '优先级分层', '90 天执行顺序']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何把搜索需求变成关键词策略',
        description: '每个阶段都会减少一层不确定性，最终形成可以按页面执行的路线图。',
        steps: [
          { title: '理解业务', description: '对齐产品、受众、市场、转化路径与增长限制。', output: '研究 Brief' },
          { title: '建立搜索范围', description: '整合种子词、竞品覆盖、SERP 模式与客户语言。', output: '候选关键词集' },
          { title: '分类与聚类', description: '按意图、主题、漏斗阶段和页面关系组织查询。', output: '意图驱动集群' },
          {
            title: '映射到 URL',
            description: '为每个重点集群确定归属页面、页面类型与下一步动作。',
            output: '关键词页面地图'
          },
          { title: '排列路线图', description: '为机会排序，并转化成现实可行的生产顺序。', output: '90 天优先级计划' }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: 'SEO、内容与产品团队能够共同使用的关键词策略',
        items: [
          '研究假设',
          '市场与竞品关键词集',
          '搜索意图分类',
          '话题集群',
          '主关键词与副关键词',
          '搜索需求指标',
          '业务相关性评分',
          '关键词页面归属地图',
          '蚕食风险提示',
          '90 天优先级路线图'
        ],
        note: '最终页面文案、文章生产与网站实施需要单独界定范围。研究结果会按执行逻辑组织，后续团队无需重复完成发现阶段。',
        summaryTitle: '统一管理搜索优先级的信息源',
        summaryDescription: '交付不仅说明用户搜索什么，也说明业务应该如何行动。',
        summaryPoints: [
          '每个重点集群都有明确归属',
          '商业与信息型意图保持区分',
          '新建页面与现有优化分开',
          '团队清楚应该先做什么'
        ]
      },
      fit: {
        eyebrow: '适合谁',
        title: '适合规划新网站、内容项目、新市场进入或重新梳理 SEO 的团队',
        description: '在内容生产放大之前，或者现有网站页面归属不清时，关键词研究最容易创造杠杆。',
        bullets: [
          '正在定义架构的新网站',
          '扩展使用场景覆盖的 SaaS 团队',
          '进入新市场或新语言的品牌',
          '存在内容重叠的网站',
          '规划季度内容路线图的团队',
          '需要以业务价值排序的 SEO 项目'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于关键词研究服务的常见问题',
        description: '集中回答服务范围、工具、搜索量和交付使用方式。',
        items: [
          {
            question: '这只是一份关键词表格吗？',
            answer:
              '不是，关键词集合只是原材料。\n\n真正的价值是意图分类、聚类、URL 归属、机会评分，以及告诉团队应该新建或优化什么的路线图。'
          },
          {
            question: '会把关键词映射到我们现有页面吗？',
            answer:
              '会。我们会审核现有网站，并尽量把集群分配给合适的 URL。\n\n如果现有页面无法满足对应意图，我们会建议新页面并说明它的作用。'
          },
          {
            question: '你们如何确定优先级？',
            answer:
              '我们会综合搜索需求、业务相关性、意图、当前排名与权威、竞争难度、流量潜力和生产成本。\n\n当商业价值更高时，低搜索量商业词也可能排在高搜索量信息词前面。'
          },
          {
            question: '可以研究多个国家或语言吗？',
            answer:
              '可以。每个市场都需要独立的需求数据、SERP 审核、语言语境和页面映射。\n\n我们会分市场界定范围，避免把简单翻译误当作真实的本地搜索行为。'
          }
        ]
      }
    }
  }
} as const satisfies Record<string, Record<SpecializedServiceLang, SpecializedServicePageContent>>
