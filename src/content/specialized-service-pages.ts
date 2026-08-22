export type SpecializedServiceLang = 'en' | 'zh'

export type SpecializedServicePageContent = {
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  serviceType: string
  trustedBrandsTitle: string
  hero: {
    badge: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
    trustPoints: string[]
  }
  challenge: {
    eyebrow: string
    title: string
    paragraphs: string[]
    cardTitle: string
    cardDescription: string
    painPoints: string[]
  }
  includes: {
    eyebrow: string
    title: string
    description: string
    modules: Array<{
      title: string
      description: string
      points: string[]
    }>
  }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: Array<{
      title: string
      description: string
      output: string
    }>
  }
  deliverables: {
    eyebrow: string
    title: string
    items: string[]
    note: string
    summaryTitle: string
    summaryDescription: string
    summaryPoints: string[]
  }
  fit: {
    eyebrow: string
    title: string
    description: string
    bullets: string[]
  }
  faq: {
    eyebrow: string
    title: string
    description: string
    items: Array<{
      question: string
      answer: string
    }>
  }
}

export const getSpecializedServiceLang = (value?: string): SpecializedServiceLang =>
  value?.toLowerCase().startsWith('zh') ? 'zh' : 'en'

export const specializedServicePages = {
  onPageSeo: {
    en: {
      metadata: {
        title: 'On-Page SEO Services for Revenue Pages | Meridian',
        description:
          'Improve rankings and conversions on the pages that matter most. Meridian turns keyword intent, content gaps, internal links, and conversion friction into an execution-ready on-page SEO program.',
        keywords: ['on-page SEO services', 'landing page SEO', 'content optimization', 'internal linking', 'SEO content briefs']
      },
      serviceType: 'On-Page SEO',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'On-Page SEO for Revenue Pages',
        title: 'On-Page SEO Services Built Around the Pages That Need to Rank',
        description:
          'We improve the pages that already carry revenue intent, pipeline value, and conversion opportunity. That means better page targeting, tighter information structure, stronger internal links, and clearer implementation guidance for your team.',
        primaryCta: 'Book an On-Page SEO Review',
        secondaryCta: 'See What We Improve',
        trustPoints: ['Priority-page focus', 'Execution-ready briefs', 'Internal-link strategy', 'Conversion-aware SEO']
      },
      challenge: {
        eyebrow: 'Why pages stall',
        title: 'Good Pages Still Underperform When the Search Intent Match Is Weak',
        paragraphs: [
          'Many teams publish enough content, but the highest-value pages still fail to rank or convert the way they should.',
          'Usually the problem is not a single missing keyword. It is a combination of unclear page intent, thin support content, weak internal links, unfocused headings, and conversion paths that do not match what users came to do.',
          'We fix those issues page by page, with a queue that your content, SEO, and product teams can actually ship.'
        ],
        cardTitle: 'What we usually find',
        cardDescription: 'The most common reasons important pages get stuck below their potential.',
        painPoints: [
          'Pages target multiple intents at the same time',
          'Key commercial pages lack supporting internal links',
          'Headers and copy do not reflect the ranking opportunity',
          'Content briefs are too vague for writers to execute well',
          'Metadata does not earn clicks from the right audience',
          'Conversion paths feel disconnected from the search query'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'What We Cover in an On-Page SEO Engagement',
        description:
          'We work from page opportunity to implementation detail, so each recommendation has a reason, a target URL, and a clear owner.',
        modules: [
          {
            title: 'Keyword and Page Mapping',
            description: 'Decide which pages should own which intent, and where supporting content is required.',
            points: [
              'Primary and secondary keyword targets',
              'Intent classification by page type',
              'Page-to-query ownership map',
              'Content overlap and cannibalization review'
            ]
          },
          {
            title: 'Content and Structure Briefs',
            description: 'Turn ranking opportunities into briefs writers and marketers can execute.',
            points: [
              'Heading and section recommendations',
              'Entity and subtopic coverage',
              'FAQ and snippet opportunities',
              'CTA placement and conversion guidance'
            ]
          },
          {
            title: 'Existing Page Optimization',
            description: 'Improve the pages that already matter instead of always starting from zero.',
            points: [
              'Title tag and meta review',
              'Content gap analysis',
              'Message clarity and relevance checks',
              'SERP click-through improvement ideas'
            ]
          },
          {
            title: 'Internal Linking Strategy',
            description: 'Help authority flow toward the pages with the highest business value.',
            points: [
              'Supporting-page link opportunities',
              'Anchor-text guidance',
              'Navigation and hub recommendations',
              'Orphan-page recovery'
            ]
          },
          {
            title: 'Implementation QA',
            description: 'Review what shipped and catch the small details that change outcomes.',
            points: [
              'Pre-publish QA checklist',
              'Post-update review',
              'Measurement priorities',
              'Next-iteration recommendations'
            ]
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Run On-Page SEO Work',
        description:
          'The process is designed to keep recommendations grounded in actual business priority instead of generic audit language.',
        steps: [
          {
            title: 'Prioritize Pages',
            description: 'We identify the URLs that matter most for pipeline, revenue, and strategic search coverage.',
            output: 'Priority-page list'
          },
          {
            title: 'Assess Intent and Gaps',
            description: 'We compare the current page against search intent, competing pages, and conversion expectations.',
            output: 'Opportunity diagnosis'
          },
          {
            title: 'Write the Optimization Brief',
            description: 'Each page gets a concrete recommendation set for content, structure, links, and metadata.',
            output: 'Execution brief'
          },
          {
            title: 'Support Implementation',
            description: 'We work with your content or product team to answer questions and keep the update quality high.',
            output: 'Implementation guidance'
          },
          {
            title: 'Review Performance',
            description: 'After shipping, we validate the update and decide what the next round should focus on.',
            output: 'Iteration plan'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'Deliverables Your Team Can Use Right Away',
        items: [
          'Priority-page opportunity map',
          'Keyword-to-page ownership recommendations',
          'Content and structure briefs',
          'Title, meta, and heading recommendations',
          'Internal-linking opportunities',
          'FAQ and snippet guidance',
          'Conversion-path recommendations',
          'Implementation notes for each page',
          'Post-update QA review',
          'Next-step optimization backlog'
        ],
        note:
          'Blog production, final copywriting, website development, and code changes are scoped separately when needed.',
        summaryTitle: 'Built for teams that already have pages worth improving',
        summaryDescription:
          'This works best when the business already knows which products, use cases, industries, or solution pages matter most.',
        summaryPoints: ['Revenue page focus', 'Clear ownership by URL', 'Writers and marketers stay aligned', 'SEO work stays tied to conversion goals']
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for SaaS, AI, and service websites with important pages already live',
        description:
          'On-page SEO is usually highest leverage when you already have core landing pages, solution pages, feature pages, or comparison pages that should perform better than they do today.',
        bullets: [
          'Teams with existing commercial pages',
          'Sites preparing a broader content push',
          'Brands that need cleaner keyword ownership',
          'Marketing teams that want sharper content briefs',
          'Websites with internal-linking issues',
          'Operators who care about both rankings and conversion quality'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions We Hear About On-Page SEO',
        description: 'A few quick answers about scope, implementation, and expected outcomes.',
        items: [
          {
            question: 'Do you rewrite the final page copy for us?',
            answer:
              'Usually no. We focus on strategy, optimization briefs, and review guidance.\n\nIf you need final copywriting support, that can be scoped separately.'
          },
          {
            question: 'How many pages should we optimize first?',
            answer:
              'Most teams should begin with the pages closest to revenue or the pages with the clearest ranking upside.\n\nStarting with a smaller high-value set usually creates better momentum than touching everything at once.'
          },
          {
            question: 'Is on-page SEO only about keywords?',
            answer:
              'No.\n\nStrong on-page work also includes structure, internal links, entity coverage, message clarity, CTA placement, and how well the page matches the intent behind the query.'
          },
          {
            question: 'Can this work alongside technical SEO?',
            answer:
              'Yes.\n\nIn fact, the strongest results usually come when technical SEO and on-page SEO are run together, because better pages still need strong crawl, indexation, and rendering foundations.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: '页面 SEO 服务 | Meridian',
        description:
          '围绕最重要的页面做页面 SEO 优化。Meridian 将关键词意图、内容缺口、内链结构与转化摩擦，整理成团队可直接执行的 on-page SEO 方案。',
        keywords: ['页面 SEO 服务', '落地页 SEO', '内容优化', '内链优化', 'SEO Brief']
      },
      serviceType: '页面 SEO',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: '面向高价值页面的 On-Page SEO',
        title: '围绕核心页面落地的页面 SEO 服务',
        description:
          '我们优先优化真正承接收入意图、商机价值和转化机会的页面，包括更清晰的页面定位、更紧凑的信息结构、更有效的内链布局，以及便于团队落地的执行说明。',
        primaryCta: '预约页面 SEO 评估',
        secondaryCta: '查看交付内容',
        trustPoints: ['聚焦重点页面', '可执行 Brief', '内链策略', '兼顾转化表现']
      },
      challenge: {
        eyebrow: '为什么页面表现卡住',
        title: '很多页面不是没有内容，而是没有真正对齐搜索意图',
        paragraphs: [
          '不少团队已经持续产出内容，但最重要的页面依然排不上去，或者排上去也转化不好。',
          '问题通常不是少了某个关键词，而是页面意图不清、支持内容不足、内链薄弱、标题结构发散，以及转化路径没有对齐用户搜索目的。',
          '我们会按页面逐个拆解这些问题，并整理成内容、SEO 和产品团队都能推进的执行队列。'
        ],
        cardTitle: '常见卡点',
        cardDescription: '高价值页面最常见的几个失分原因。',
        painPoints: [
          '一个页面同时想承接多种搜索意图',
          '核心商业页面缺少支持性内链',
          '标题结构和正文没有体现排名机会',
          '内容 Brief 太泛，写作难以落地',
          'Meta 信息无法吸引正确用户点击',
          '转化路径和搜索意图脱节'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: '页面 SEO 项目通常覆盖这些模块',
        description: '我们从页面机会识别一路推进到执行细节，让每条建议都对应明确的原因、URL 和负责人。',
        modules: [
          {
            title: '关键词与页面映射',
            description: '确定哪些页面应该承接哪些搜索意图，以及哪里需要补充支持内容。',
            points: ['主次关键词目标', '按页面类型判断意图', '页面与查询的归属关系', '关键词内耗检查']
          },
          {
            title: '内容与结构 Brief',
            description: '把排名机会整理成写手和市场团队能直接执行的 Brief。',
            points: ['标题层级建议', '实体和子话题覆盖', 'FAQ 与精选摘要机会', 'CTA 与转化建议']
          },
          {
            title: '现有页面优化',
            description: '优先把已有的重要页面做强，而不是一上来就重做全部内容。',
            points: ['Title 与 Meta 审核', '内容缺口分析', '信息表达与相关性检查', 'SERP 点击率优化']
          },
          {
            title: '内链策略',
            description: '让权重更有效地流向最有业务价值的页面。',
            points: ['支持页内链机会', '锚文本建议', '导航与 Hub 结构建议', '孤儿页修复']
          },
          {
            title: '上线质检',
            description: '检查页面实际落地后的细节，避免小问题影响最终表现。',
            points: ['上线前检查清单', '更新后复核', '核心监测指标', '下一轮迭代建议']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何执行页面 SEO',
        description: '整套流程会优先围绕真实业务优先级展开，而不是停留在泛泛的审计描述上。',
        steps: [
          { title: '确认重点页面', description: '先找出最影响收入、商机和战略覆盖的 URL。', output: '重点页面清单' },
          { title: '判断意图与缺口', description: '对照搜索意图、竞争页和转化预期，判断页面真正缺什么。', output: '机会诊断' },
          { title: '撰写优化 Brief', description: '针对每个页面给出内容、结构、内链和 Meta 的具体建议。', output: '执行 Brief' },
          { title: '协助落地', description: '配合内容或产品团队答疑，保证更新质量不走样。', output: '落地支持' },
          { title: '复核与迭代', description: '上线后验证更新效果，并确定下一轮优先项。', output: '迭代计划' }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: '可以直接进入执行的页面 SEO 交付',
        items: [
          '重点页面机会清单',
          '关键词与页面归属建议',
          '内容和结构 Brief',
          'Title、Meta 与标题层级建议',
          '内链优化建议',
          'FAQ 与摘要位机会',
          '转化路径建议',
          '逐页执行说明',
          '更新后质检复核',
          '下一步优化 backlog'
        ],
        note: 'Blog 撰写、最终文案代写、网站开发和代码改造如有需要，需单独界定范围。',
        summaryTitle: '尤其适合已经有核心页面的团队',
        summaryDescription: '如果你已经明确哪些产品页、方案页、功能页或对比页最重要，这类项目通常会非常高杠杆。',
        summaryPoints: ['聚焦商业页面', '按 URL 明确归属', '写作与市场团队更容易协同', 'SEO 优化持续围绕转化目标']
      },
      fit: {
        eyebrow: '适合谁',
        title: '适合已经上线重点页面的 SaaS、AI 与服务型网站',
        description: '当网站已经有一批重要落地页，但表现明显低于预期时，页面 SEO 往往是最值得优先做的一环。',
        bullets: ['已有商业页的团队', '准备加大内容投入的网站', '需要更清晰关键词归属的品牌', '想要更强内容 Brief 的市场团队', '存在内链问题的网站', '同时关注排名和转化质量的运营团队']
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于页面 SEO 的常见问题',
        description: '这里集中回答范围、落地和结果预期相关的问题。',
        items: [
          {
            question: '你们会直接帮我们写最终页面文案吗？',
            answer: '通常不会。\n\n我们的核心交付是策略、优化 Brief 和审核建议；如果需要最终文案支持，可以单独确定范围。'
          },
          {
            question: '应该先优化多少个页面？',
            answer:
              '大多数团队更适合先从最接近收入、或者最有排名提升空间的页面开始。\n\n先集中做一小批高价值页面，通常比同时摊开所有页面更容易形成结果。'
          },
          {
            question: 'On-page SEO 就是加关键词吗？',
            answer: '不是。\n\n它还包括结构、内链、实体覆盖、信息表达、CTA 布局，以及页面是否真的匹配搜索背后的意图。'
          },
          {
            question: '它可以和 technical SEO 一起做吗？',
            answer:
              '可以。\n\n通常 technical SEO 和 on-page SEO 联动执行时效果更好，因为再好的页面也需要稳定的抓取、收录和渲染基础。'
          }
        ]
      }
    }
  },
  programmaticSeo: {
    en: {
      metadata: {
        title: 'Programmatic SEO Services for Scalable Landing Pages | Meridian',
        description:
          'Build scalable, high-intent landing page systems without sacrificing quality. Meridian helps teams validate programmatic SEO opportunities, design templates, and launch pages that can rank and compound.',
        keywords: ['programmatic SEO services', 'scalable landing pages', 'template SEO', 'page generation strategy', 'SEO page systems']
      },
      serviceType: 'Programmatic SEO',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'Programmatic SEO for Scalable Growth',
        title: 'Programmatic SEO Services for High-Intent Page Systems',
        description:
          'We help teams design and launch scalable landing page systems around repeatable search demand. That includes opportunity validation, template strategy, data rules, internal-link structure, and quality control before low-value pages flood the index.',
        primaryCta: 'Plan a Programmatic SEO System',
        secondaryCta: 'See What Is Included',
        trustPoints: ['Opportunity validation', 'Template architecture', 'Indexation discipline', 'Quality before scale']
      },
      challenge: {
        eyebrow: 'The scaling problem',
        title: 'Programmatic SEO Works Only When the System Is Useful, Not Just Large',
        paragraphs: [
          'Scaling page count is easy. Scaling useful pages that deserve to rank is the hard part.',
          'Most programmatic SEO projects fail because the template is thin, the intent set is too broad, the data is weak, or the internal-link structure does not help search engines understand the system.',
          'We help you decide whether the opportunity is real, then build the page logic so the rollout adds value instead of index bloat.'
        ],
        cardTitle: 'What breaks most rollouts',
        cardDescription: 'The common reasons large page systems never become durable growth assets.',
        painPoints: [
          'Templates generate pages with nearly identical value',
          'Data sources do not create meaningful differentiation',
          'Search intent is too mixed across page variants',
          'Internal links do not reinforce page relationships',
          'Indexation grows faster than quality control',
          'The engineering model is not aligned with SEO constraints'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'What We Cover in Programmatic SEO',
        description:
          'We work across strategy, template design, quality control, and launch planning so the page system is built to compound.',
        modules: [
          {
            title: 'Opportunity Modeling',
            description: 'Validate whether the search pattern is strong enough to justify a scalable page system.',
            points: [
              'Intent cluster sizing',
              'Keyword-pattern analysis',
              'Competitor and SERP review',
              'Priority rollout recommendations'
            ]
          },
          {
            title: 'Template and Page Rules',
            description: 'Define what every page should include and where pages need differentiated content.',
            points: [
              'Template structure recommendations',
              'Unique-value requirements',
              'Indexable versus non-indexable page rules',
              'Content field hierarchy'
            ]
          },
          {
            title: 'Data and Content Inputs',
            description: 'Assess whether your source data can support useful pages at scale.',
            points: [
              'Structured-data requirements',
              'Data-quality checks',
              'Content enrichment opportunities',
              'Fallback and empty-state rules'
            ]
          },
          {
            title: 'Internal Linking and Architecture',
            description: 'Help search engines and users move through the page system in a logical way.',
            points: [
              'Hub and child-page linking',
              'Facet and filter guidance',
              'Navigation recommendations',
              'Crawl path review'
            ]
          },
          {
            title: 'Launch QA and Iteration',
            description: 'Review the rollout before and after release so quality issues are caught early.',
            points: [
              'Pre-launch SEO QA',
              'Indexation monitoring',
              'Template refinement backlog',
              'Expansion criteria for the next batch'
            ]
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Build Programmatic SEO Systems',
        description:
          'The goal is not to launch the most pages. The goal is to launch the right page logic first, prove it, then scale.',
        steps: [
          {
            title: 'Validate the Pattern',
            description: 'We confirm that search demand, page value, and differentiation are strong enough to justify scale.',
            output: 'Program viability'
          },
          {
            title: 'Design the Template',
            description: 'We define page sections, variable fields, and the rules that keep quality above the threshold.',
            output: 'Template logic'
          },
          {
            title: 'Map Data and Content',
            description: 'We connect structured data, editorial content, and page conditions into one buildable system.',
            output: 'Content model'
          },
          {
            title: 'Review Launch Readiness',
            description: 'Before rollout, we check crawlability, canonical logic, indexation rules, and internal links.',
            output: 'Launch checklist'
          },
          {
            title: 'Monitor and Expand',
            description: 'After release, we review the first batch and decide how the next wave should scale.',
            output: 'Expansion roadmap'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'The Planning Assets Behind a Strong Programmatic Rollout',
        items: [
          'Programmatic opportunity assessment',
          'Keyword-pattern and intent map',
          'Template structure recommendations',
          'Indexation and canonical rules',
          'Data-input requirements',
          'Content differentiation guidance',
          'Internal-linking architecture',
          'Pre-launch QA checklist',
          'Post-launch monitoring priorities',
          'Expansion roadmap for future page sets'
        ],
        note:
          'Website development, page generation engineering, and code implementation are handled by your internal team or scoped separately.',
        summaryTitle: 'Best when the site can actually support scale',
        summaryDescription:
          'Programmatic SEO has the most leverage when the product, dataset, and search pattern already suggest repeatable value at page level.',
        summaryPoints: ['Useful templates over thin pages', 'Quality thresholds before rollout', 'Engineering and SEO stay aligned', 'Scale happens after proof, not before']
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for teams with repeatable search patterns and structured data',
        description:
          'This is a strong fit for product-led, marketplace, directory, location, integration, or use-case websites where page generation can create unique value rather than duplicate noise.',
        bullets: [
          'SaaS sites with use-case or integration patterns',
          'Marketplace and directory products',
          'Teams with reliable structured data',
          'Websites planning large landing-page libraries',
          'Operators who need SEO input before engineering build-out',
          'Brands that want scale without index bloat'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions We Hear About Programmatic SEO',
        description: 'A few quick answers about quality, build scope, and rollout expectations.',
        items: [
          {
            question: 'Do you build the page generation system for us?',
            answer:
              'Not by default.\n\nWe define the SEO logic, template requirements, page rules, and QA process. Engineering implementation can be handled by your team or scoped separately.'
          },
          {
            question: 'How do you avoid low-quality pages?',
            answer:
              'We set quality thresholds before launch.\n\nThat includes page-value rules, data checks, content differentiation requirements, and clear decisions about which page variants should or should not be indexable.'
          },
          {
            question: 'Does programmatic SEO work for every website?',
            answer:
              'No.\n\nIt works best when the site has repeatable search demand, meaningful structured data, and a page pattern that can genuinely help users at scale.'
          },
          {
            question: 'Should we launch thousands of pages immediately?',
            answer:
              'Usually no.\n\nA smaller first batch is often the better move because it helps validate quality, crawl behavior, indexation, and conversion performance before expansion.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: '程序化 SEO 服务 | Meridian',
        description:
          '围绕可规模化落地页系统开展程序化 SEO。Meridian 帮助团队验证机会、设计模板与页面规则，并上线真正能积累搜索资产的页面体系。',
        keywords: ['程序化 SEO 服务', '规模化落地页', '模板化 SEO', '页面生成策略', 'SEO 页面系统']
      },
      serviceType: '程序化 SEO',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: '面向规模化增长的 Programmatic SEO',
        title: '为高意图页面系统设计的程序化 SEO 服务',
        description:
          '我们帮助团队围绕可重复的搜索需求设计并上线规模化页面系统，包括机会验证、模板策略、数据规则、内链结构和质控逻辑，避免低价值页面先一步淹没索引。',
        primaryCta: '规划程序化 SEO 系统',
        secondaryCta: '查看包含内容',
        trustPoints: ['先验证机会', '模板架构清晰', '重视收录纪律', '先保证质量再放大']
      },
      challenge: {
        eyebrow: '规模化的难点',
        title: '程序化 SEO 的关键不是页面多，而是页面有没有真实价值',
        paragraphs: [
          '把页面数量做大并不难，难的是把真正值得被搜索引擎收录和排序的页面系统做出来。',
          '很多 programmatic 项目失败，不是因为模板化本身，而是模板过薄、意图过杂、数据不足，或者内链结构没有帮助搜索引擎理解整个系统。',
          '我们会先判断机会是否真实存在，再把页面逻辑设计清楚，让上线后的页面是在积累价值，而不是制造索引膨胀。'
        ],
        cardTitle: '最常见的失败点',
        cardDescription: '很多大规模页面系统最后没有形成长期增长资产，往往是因为这些问题。',
        painPoints: [
          '模板生成出的页面价值过于相似',
          '数据源不足以形成真正差异化',
          '不同页面变体混杂了多种搜索意图',
          '内链没有强化页面关系',
          '收录规模增长快于质控能力',
          '工程实现方式没有考虑 SEO 约束'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: '程序化 SEO 通常覆盖这些模块',
        description: '我们会同时处理策略、模板设计、质控和上线规划，让页面系统具备持续累积能力。',
        modules: [
          {
            title: '机会建模',
            description: '先判断这类搜索模式是否足够强，值得搭建规模化页面系统。',
            points: ['意图簇规模判断', '关键词模式分析', '竞品与 SERP 审核', '优先上线建议']
          },
          {
            title: '模板与页面规则',
            description: '明确每类页面应该包含什么，以及哪些位置必须有差异化内容。',
            points: ['模板结构建议', '独特价值要求', '可收录 / 不可收录规则', '内容字段层级']
          },
          {
            title: '数据与内容输入',
            description: '评估你的源数据能否支撑真正有价值的规模化页面。',
            points: ['结构化数据要求', '数据质量检查', '内容增强方向', '空态与兜底规则']
          },
          {
            title: '内链与架构',
            description: '帮助用户和搜索引擎以更合理的路径理解整个页面系统。',
            points: ['Hub 与子页关系', '筛选 / Facet 指引', '导航建议', '抓取路径检查']
          },
          {
            title: '上线质检与迭代',
            description: '上线前后都做审核，尽早发现系统性质量问题。',
            points: ['上线前 SEO QA', '收录监测', '模板优化 backlog', '下一批扩张标准']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何搭建程序化 SEO 系统',
        description: '目标不是一次性发最多页面，而是先把正确的页面逻辑跑通，再决定如何规模化。',
        steps: [
          { title: '验证模式是否成立', description: '确认搜索需求、页面价值和差异化是否足以支撑规模化。', output: '可行性判断' },
          { title: '设计模板逻辑', description: '定义页面结构、可变字段和维持质量下限的规则。', output: '模板逻辑' },
          { title: '梳理数据与内容', description: '把结构化数据、编辑内容和页面条件整理成可构建系统。', output: '内容模型' },
          { title: '审核上线准备度', description: '上线前检查抓取、canonical、收录规则和内链结构。', output: '上线检查表' },
          { title: '监测并扩展', description: '首批发布后复核效果，再决定下一波怎么扩。', output: '扩张路线图' }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: '支撑一次程序化 SEO 上线的核心规划资产',
        items: [
          '程序化机会评估',
          '关键词模式与意图地图',
          '模板结构建议',
          '收录与 canonical 规则',
          '数据输入要求',
          '内容差异化建议',
          '内链架构规划',
          '上线前 QA 清单',
          '上线后监测重点',
          '后续批次扩张路线图'
        ],
        note: '网站开发、页面生成工程和代码实现默认由客户团队负责，如需支持可另行界定范围。',
        summaryTitle: '最适合网站本身具备规模化条件的场景',
        summaryDescription: '当产品、数据集和搜索模式已经明显支持重复型页面价值时，programmatic SEO 的杠杆才会真正体现出来。',
        summaryPoints: ['优先做有用的模板', '上线前先设质量阈值', '工程与 SEO 保持一致', '先验证再放量']
      },
      fit: {
        eyebrow: '适合谁',
        title: '适合具备重复搜索模式和结构化数据的团队',
        description:
          '对于产品型、目录型、集成型、地点型或 use-case 型网站，只要页面生成能够带来真实差异化价值，程序化 SEO 就非常适合优先规划。',
        bullets: ['有 use case / integration 模式的 SaaS 网站', 'Marketplace 或目录型产品', '拥有可靠结构化数据的团队', '准备建设大规模落地页库的网站', '需要在开发前引入 SEO 设计的团队', '希望规模化但不想制造收录垃圾的品牌']
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于程序化 SEO 的常见问题',
        description: '这里集中回答质量控制、工程范围与上线节奏相关的问题。',
        items: [
          {
            question: '你们会直接帮我们搭建页面生成系统吗？',
            answer:
              '默认不会。\n\n我们会定义 SEO 逻辑、模板要求、页面规则和 QA 流程；工程实现可以由你的团队负责，或再单独界定支持范围。'
          },
          {
            question: '怎么避免做出低质量页面？',
            answer:
              '关键是上线前先设好质量阈值。\n\n这包括页面价值规则、数据校验、内容差异化要求，以及明确哪些页面变体应该被收录、哪些不该被收录。'
          },
          {
            question: '所有网站都适合做 programmatic SEO 吗？',
            answer: '不是。\n\n它更适合那些已经存在重复搜索需求、可靠结构化数据以及可规模化帮助用户的页面模式的网站。'
          },
          {
            question: '是不是应该一上来就发几千个页面？',
            answer:
              '通常不建议。\n\n更好的做法往往是先发一小批，验证质量、抓取、收录和转化表现，再决定怎么扩张。'
          }
        ]
      }
    }
  },
  redditCommunityManagement: {
    en: {
      metadata: {
        title: 'Reddit Community Management Services | Meridian',
        description:
          'Build a credible presence inside the right subreddits. Meridian helps brands identify communities, shape participation playbooks, and manage ongoing Reddit conversations without sounding like a marketer.',
        keywords: ['Reddit community management', 'subreddit strategy', 'Reddit brand presence', 'community playbooks', 'Reddit moderation-safe content']
      },
      serviceType: 'Reddit Community Management',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'Reddit Community Management',
        title: 'Reddit Community Management for Brands That Need Trust Before Scale',
        description:
          'We help brands show up naturally inside the communities that influence buyers. That means better subreddit selection, stronger discussion angles, clear moderation awareness, and a repeatable operating rhythm for community participation.',
        primaryCta: 'Book a Reddit Community Strategy Call',
        secondaryCta: 'See What Is Included',
        trustPoints: ['Subreddit fit first', 'Community-native tone', 'Moderation-aware execution', 'Ongoing discussion support']
      },
      challenge: {
        eyebrow: 'Why brands get ignored',
        title: 'Reddit Punishes Brand Behavior That Feels Extractive',
        paragraphs: [
          'Reddit can be one of the highest-signal places to understand buyers, objections, and alternatives. It can also be one of the fastest places to lose credibility.',
          'Most brand efforts fail because they enter the wrong communities, sound promotional too early, or do not understand how each subreddit rewards relevance and timing.',
          'We build a participation model that helps your brand earn context before it asks for attention.'
        ],
        cardTitle: 'What usually goes wrong',
        cardDescription: 'The failure patterns we work to avoid from the start.',
        painPoints: [
          'The brand joins subreddits that do not match the audience',
          'Posts and comments sound like obvious marketing',
          'The team ignores moderator expectations and posting norms',
          'There is no repeatable playbook for replies or escalation',
          'Insights from discussions never reach the wider growth team',
          'Community work is judged only by short-term clicks'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'What We Cover in Reddit Community Management',
        description:
          'The work combines audience mapping, participation strategy, and an operating rhythm that helps the brand stay useful inside the right communities.',
        modules: [
          {
            title: 'Subreddit Discovery and Prioritization',
            description: 'Find the communities that actually influence the buyers you care about.',
            points: [
              'Audience-fit research',
              'Community rule review',
              'Risk and opportunity ranking',
              'Priority subreddit shortlist'
            ]
          },
          {
            title: 'Narrative and Tone Playbooks',
            description: 'Define how the brand should sound in discussion-first environments.',
            points: [
              'Message-angle recommendations',
              'Safe brand-mention rules',
              'Response frameworks',
              'Objection and trust-language guidance'
            ]
          },
          {
            title: 'Participation Management',
            description: 'Support ongoing comments, replies, and conversation timing across selected subreddits.',
            points: [
              'Discussion opportunity tracking',
              'Participation cadence guidance',
              'Reply quality review',
              'Escalation rules for sensitive threads'
            ]
          },
          {
            title: 'Moderation and Risk Awareness',
            description: 'Reduce avoidable deletions and brand missteps before they happen.',
            points: [
              'Subreddit rule mapping',
              'Link and disclosure guidance',
              'Posting-risk review',
              'Moderator-sensitive adjustments'
            ]
          },
          {
            title: 'Reporting and Insight Capture',
            description: 'Turn Reddit participation into usable signal for content, product, and campaign planning.',
            points: [
              'Weekly or monthly review notes',
              'Narrative and objection tracking',
              'Community sentiment observations',
              'Recommended next actions'
            ]
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Run Community Management on Reddit',
        description:
          'The goal is to help the brand become more relevant inside the right conversations, not to force immediate promotion where it does not belong.',
        steps: [
          {
            title: 'Map the Communities',
            description: 'We identify where the right discussions already happen and which subreddits deserve attention first.',
            output: 'Community map'
          },
          {
            title: 'Define the Participation Rules',
            description: 'We shape tone, brand-mention boundaries, and response patterns before execution starts.',
            output: 'Participation playbook'
          },
          {
            title: 'Support Ongoing Activity',
            description: 'We guide posting cadence, comment opportunities, and the handling of live discussions.',
            output: 'Execution support'
          },
          {
            title: 'Review Risk and Signal',
            description: 'We monitor moderation outcomes, response quality, and the themes that resonate most.',
            output: 'Signal review'
          },
          {
            title: 'Feed Learnings Back',
            description: 'Insights from Reddit are translated into clearer messaging, content, and campaign ideas.',
            output: 'Growth feedback loop'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'A Repeatable System for Better Reddit Participation',
        items: [
          'Priority subreddit map',
          'Community-fit opportunity notes',
          'Brand tone and participation playbook',
          'Comment and reply guidance',
          'Moderator-risk guidelines',
          'Escalation rules for sensitive situations',
          'Publishing or participation cadence recommendations',
          'Narrative and objection tracking',
          'Review summaries and next steps',
          'Reusable learnings for wider growth channels'
        ],
        note:
          'Account operations, internal approval workflows, and final posting access remain with the client unless separately scoped.',
        summaryTitle: 'Designed for brands that need durable trust, not one-off spikes',
        summaryDescription:
          'Community management is strongest when the team wants to learn the language of the market while building a more credible brand presence over time.',
        summaryPoints: ['Audience-fit community selection', 'More useful brand participation', 'Lower avoidable moderation risk', 'Insights that improve other channels']
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for brands entering Reddit seriously for the first time',
        description:
          'This is a strong fit for teams that know Reddit matters but do not want to damage credibility by treating it like another generic social channel.',
        bullets: [
          'B2B or technical products with active communities',
          'Brands that need buyer-language insight',
          'Teams building trust before campaigns scale',
          'Operators who want moderation-aware execution',
          'Companies with repeated questions or objections in market',
          'Marketing teams that value learning, not just distribution'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions We Hear About Reddit Community Management',
        description: 'A few quick answers about scope, posting, and what to expect early on.',
        items: [
          {
            question: 'Do you post directly from our brand account?',
            answer:
              'That depends on the operating model we agree on.\n\nSome teams keep posting access internally and use us for strategy and review. In other cases, execution support can be scoped more directly.'
          },
          {
            question: 'Can you guarantee our posts will stay live?',
            answer:
              'No.\n\nReddit moderation always depends on platform rules, subreddit rules, timing, and content fit. We reduce avoidable risk, but we do not promise permanent post survival.'
          },
          {
            question: 'How long does it take before Reddit starts helping?',
            answer:
              'Usually the first phase is about learning, calibration, and signal gathering.\n\nThe strongest long-term value comes from understanding communities well enough to participate in a way that keeps earning trust.'
          },
          {
            question: 'Can this work for B2B companies?',
            answer:
              'Yes.\n\nIt works especially well when buyers actively discuss tools, workflows, alternatives, and implementation tradeoffs in niche communities.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: 'Reddit 社区代运营服务 | Meridian',
        description:
          '帮助品牌在真正相关的 subreddit 里建立可信存在感。Meridian 提供社区识别、参与话术、节奏管理与风险意识，让品牌能自然进入讨论而不是显得像广告。',
        keywords: ['Reddit 社区代运营', 'subreddit 策略', 'Reddit 品牌运营', '社区参与手册', 'Reddit 风险控制']
      },
      serviceType: 'Reddit 社区代运营',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: 'Reddit Community Management',
        title: '先建立信任，再谈放大的 Reddit 社区代运营',
        description:
          '我们帮助品牌以更自然的方式进入真正影响买家的社区，包括更准确的 subreddit 选择、更合适的讨论切入点、更明确的版规意识，以及一套可重复执行的社区参与节奏。',
        primaryCta: '预约 Reddit 社区策略沟通',
        secondaryCta: '查看服务包含内容',
        trustPoints: ['先看社区匹配度', '遵循社区语境', '重视版规与风控', '持续互动支持']
      },
      challenge: {
        eyebrow: '为什么很多品牌会被忽略',
        title: '在 Reddit 上，带着索取感进入社区几乎一定会失去信任',
        paragraphs: [
          'Reddit 是理解买家问题、异议和替代方案的高信号场景，但也同样是品牌最容易快速失去可信度的地方。',
          '很多品牌做不起来，不是因为 Reddit 不适合自己，而是因为进入了错误社区、过早带营销感，或者根本不了解每个 subreddit 的规则与节奏。',
          '我们会帮助品牌先建立语境，再参与讨论，而不是一开始就强行索取注意力。'
        ],
        cardTitle: '最常见的失误',
        cardDescription: '这些是我们在项目一开始就会重点规避的问题。',
        painPoints: [
          '进入的 subreddit 并不真正匹配目标用户',
          '帖子和评论有明显营销腔',
          '忽视 moderator 规则和发布习惯',
          '没有统一的回复与升级处理机制',
          '社区洞察没有回流到增长团队',
          '只用短期点击衡量社区工作'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: 'Reddit 社区代运营通常覆盖这些模块',
        description: '这项服务会把受众识别、参与策略和持续运营节奏结合起来，让品牌能在正确的社区里变得更有价值。',
        modules: [
          {
            title: 'Subreddit 筛选与优先级',
            description: '找到真正会影响你目标买家的社区，而不是只看订阅量。',
            points: ['受众匹配研究', '版规审查', '风险与机会排序', '优先级社区清单']
          },
          {
            title: '叙事与话术手册',
            description: '定义品牌在以讨论为主的社区里应该怎么说话。',
            points: ['切入角度建议', '品牌露出边界', '回复框架', '异议与信任表达']
          },
          {
            title: '持续互动管理',
            description: '围绕目标 subreddit 持续支持评论、回复与讨论节奏。',
            points: ['讨论机会跟踪', '参与频率建议', '回复质量复核', '敏感话题升级规则']
          },
          {
            title: '版规与风控意识',
            description: '在执行前尽量规避可避免的删帖和品牌失误。',
            points: ['社区规则梳理', '链接与披露指引', '发帖风险复核', '针对 moderator 的调整建议']
          },
          {
            title: '复盘与洞察沉淀',
            description: '把 Reddit 上的互动结果转化成内容、产品和投放都能用的信号。',
            points: ['周 / 月复盘记录', '叙事与异议追踪', '社区情绪观察', '下一步建议']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何做 Reddit 社区代运营',
        description: '目标是帮助品牌在正确的讨论里逐步变得更相关，而不是在不合适的地方强推转化。',
        steps: [
          { title: '建立社区地图', description: '先确认真正值得进入的讨论场域，以及哪些 subreddit 应该优先参与。', output: '社区地图' },
          { title: '定义参与规则', description: '在执行前先明确语气、品牌露出边界和回复机制。', output: '参与手册' },
          { title: '支持持续运营', description: '围绕评论、回复机会和发布节奏提供持续支持。', output: '执行支持' },
          { title: '复核风险与信号', description: '跟踪删帖、互动质量以及最能引发共鸣的话题。', output: '信号复盘' },
          { title: '把洞察回流增长体系', description: '将 Reddit 上的学习沉淀为更清晰的信息表达、内容方向和 campaign 想法。', output: '增长反馈闭环' }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: '一套可重复执行的 Reddit 社区参与系统',
        items: [
          '重点 subreddit 地图',
          '社区匹配机会说明',
          '品牌语气与参与手册',
          '评论与回复建议',
          '版规风险指引',
          '敏感场景升级规则',
          '参与频率与节奏建议',
          '叙事与异议追踪',
          '复盘总结与下一步建议',
          '可复用到其他渠道的市场洞察'
        ],
        note: '账号运营、内部审批流和最终发帖权限默认由客户团队掌握，如需我们承担更多执行可单独界定范围。',
        summaryTitle: '更适合想长期建立信任的品牌',
        summaryDescription: '如果团队希望一边学习市场语言、一边逐步建立更可信的品牌存在感，这类服务会比一次性流量打法更有价值。',
        summaryPoints: ['优先进入正确社区', '参与方式更自然', '降低可避免的删帖风险', '为其他渠道提供真实洞察']
      },
      fit: {
        eyebrow: '适合谁',
        title: '尤其适合第一次认真进入 Reddit 的品牌',
        description: '如果你已经知道 Reddit 很重要，但又不想把它当成普通社媒平台硬做，这项服务通常会很适合。',
        bullets: ['有垂直讨论社区的 B2B 或技术产品', '需要理解买家真实语言的品牌', '希望先建立信任再放大投放的团队', '需要更强风控意识的运营方', '市场上异议和问题反复出现的公司', '重视学习而不只看分发的市场团队']
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于 Reddit 社区代运营的常见问题',
        description: '这里集中回答发帖方式、存活预期和早期效果相关的问题。',
        items: [
          {
            question: '你们会直接用我们的品牌账号发帖吗？',
            answer:
              '这取决于双方约定的合作模式。\n\n有些团队会保留内部发帖权限，由我们负责策略和审核；也可以根据需要把执行支持范围界定得更深。'
          },
          {
            question: '可以保证我们的帖子一直存活吗？',
            answer:
              '不能。\n\nReddit 的审核和留存最终仍取决于平台规则、subreddit 规则、发布时间和内容匹配度。我们会尽量降低可避免风险，但不会承诺永久留帖。'
          },
          {
            question: '一般多久能看到 Reddit 开始产生帮助？',
            answer:
              '前期通常更像学习、校准和收集信号的阶段。\n\n长期价值来自对社区理解越来越深，从而持续以更自然的方式赢得注意力和信任。'
          },
          {
            question: 'B2B 公司也适合做吗？',
            answer: '适合。\n\n特别是当买家会在细分社区里讨论工具、工作流、替代方案和实施取舍时，Reddit 往往很有价值。'
          }
        ]
      }
    }
  },
  redditCampaigns: {
    en: {
      metadata: {
        title: 'Reddit Campaign Services for Batch Distribution | Meridian',
        description:
          'Launch Reddit-native campaigns with better community fit and delivery tracking. Meridian helps teams turn raw ideas into publishable Reddit posts, execution plans, and transparent status reporting.',
        keywords: ['Reddit campaigns', 'Reddit post campaigns', 'Reddit content distribution', 'subreddit campaign strategy', 'Reddit post execution']
      },
      serviceType: 'Reddit Campaigns',
      trustedBrandsTitle: 'Trusted by startups, enterprises, and category leaders alike.',
      hero: {
        badge: 'Reddit Campaign Execution',
        title: 'Reddit Campaign Services for Controlled Batch Execution',
        description:
          'We help teams run Reddit campaigns that feel native to each community instead of recycled from other channels. That includes subreddit planning, Reddit-style editing, publishing cadence, delivery tracking, and replacement support when a batch underperforms the agreed standard.',
        primaryCta: 'Plan a Reddit Campaign',
        secondaryCta: 'See the Delivery Scope',
        trustPoints: ['Subreddit planning', 'Reddit-native editing', 'Tracked delivery status', 'Replacement support rules']
      },
      challenge: {
        eyebrow: 'Why campaigns fail',
        title: 'Reddit Campaigns Break When Distribution Matters More Than Community Fit',
        paragraphs: [
          'A campaign can have enough volume and still miss the point if the message, community choice, and posting rhythm do not match how Reddit actually works.',
          'Teams often bring in content that feels like generic social copy, then discover too late that tone, structure, timing, and subreddit rules matter more than they expected.',
          'We shape the campaign for Reddit-native execution so the batch is more likely to survive, earn attention, and stay aligned with the delivery standard.'
        ],
        cardTitle: 'What usually hurts campaign quality',
        cardDescription: 'The issues that create deletion risk or weak engagement before the batch is even live.',
        painPoints: [
          'Draft posts sound too polished or promotional for Reddit',
          'Subreddit selection ignores rule differences',
          'The publishing cadence does not fit community behavior',
          'There is no transparent record of what shipped and what was replaced',
          'Teams optimize for volume without post-level quality checks',
          'Landing expectations and message angles are not aligned'
        ]
      },
      includes: {
        eyebrow: 'What is included',
        title: 'What We Cover in a Reddit Campaign Engagement',
        description:
          'The service is built for batch execution with clearer guardrails around content quality, publishing, and delivery tracking.',
        modules: [
          {
            title: 'Campaign and Subreddit Planning',
            description: 'Match campaign goals to the right communities and rollout structure.',
            points: [
              'Community shortlist by objective',
              'Rule and tone review',
              'Publishing-window guidance',
              'Batch sequencing recommendations'
            ]
          },
          {
            title: 'Reddit-Native Editing',
            description: 'Turn raw drafts into posts that better fit Reddit expectations.',
            points: [
              'Tone adjustment',
              'Title and hook refinement',
              'Body-structure improvement',
              'Promotion-risk reduction'
            ]
          },
          {
            title: 'Batch Publishing Execution',
            description: 'Coordinate the release of the campaign posts according to the agreed batch plan.',
            points: [
              'Scheduled rollout support',
              'Post tracking by batch',
              'Community-by-community handling',
              'Status visibility'
            ]
          },
          {
            title: 'Replacement and Exception Rules',
            description: 'Make the delivery standard clear when posts do not meet the agreed survival condition.',
            points: [
              'Replacement criteria',
              'Exception review',
              'Adjustment recommendations',
              'Transparent reissue logging'
            ]
          },
          {
            title: 'Campaign Review',
            description: 'Summarize what shipped, what survived, and what should change in the next batch.',
            points: [
              'Delivery recap',
              'Community-fit observations',
              'Message-angle learnings',
              'Next-batch recommendations'
            ]
          }
        ]
      },
      process: {
        eyebrow: 'Operating model',
        title: 'How We Run Reddit Campaign Batches',
        description:
          'The work is designed to move from draft material to a visible, trackable release cycle that respects community differences.',
        steps: [
          {
            title: 'Set Campaign Targets',
            description: 'We align on the campaign objective, community mix, and batch structure before publishing begins.',
            output: 'Campaign plan'
          },
          {
            title: 'Polish the Drafts',
            description: 'Client-provided drafts are adapted into Reddit-native posts with lower promotion friction.',
            output: 'Edited post set'
          },
          {
            title: 'Coordinate the Release',
            description: 'We execute the publishing cadence around subreddit fit and activity windows.',
            output: 'Published batch'
          },
          {
            title: 'Track Delivery Status',
            description: 'Each post is logged so the team can see publish status, issues, and any required replacement.',
            output: 'Status log'
          },
          {
            title: 'Review and Improve',
            description: 'We recap the batch and carry the learnings into the next campaign cycle.',
            output: 'Next-batch guidance'
          }
        ]
      },
      deliverables: {
        eyebrow: 'What you receive',
        title: 'The Assets Behind a Controlled Reddit Campaign Rollout',
        items: [
          'Campaign batch plan',
          'Priority subreddit shortlist',
          'Reddit-native editing recommendations',
          'Post-level execution support',
          'Publishing-status tracking',
          'Replacement and exception rules',
          'Batch delivery log',
          'Community-fit observations',
          'Campaign review summary',
          'Recommendations for the next rollout'
        ],
        note:
          'Client draft preparation, approvals, and any external landing-page or website changes remain on the client side unless separately scoped.',
        summaryTitle: 'Best for teams that already have campaign intent and raw material',
        summaryDescription:
          'This works especially well when the team has initial campaign ideas or drafts, but needs stronger Reddit execution discipline and tracking.',
        summaryPoints: ['Better fit by subreddit', 'Stronger Reddit-style copy', 'Clear delivery records', 'Easier iteration across batches']
      },
      fit: {
        eyebrow: 'Best fit',
        title: 'Best for launches, events, and concentrated visibility pushes',
        description:
          'Reddit campaign work is a strong fit for brands that want controlled distribution around a launch, event, or high-priority message without losing visibility into what actually shipped.',
        bullets: [
          'Brands with campaign drafts already prepared',
          'Teams launching products or events',
          'Operators who need transparent delivery tracking',
          'Campaigns that require community-by-community handling',
          'Marketing teams that want replacement rules defined upfront',
          'Companies that need a clearer Reddit execution layer'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions We Hear About Reddit Campaigns',
        description: 'A few quick answers about drafts, execution, and delivery expectations.',
        items: [
          {
            question: 'Do we need to provide the campaign drafts first?',
            answer:
              'Usually yes.\n\nThe typical model is that the client provides the initial material, and we adapt it into Reddit-native campaign posts and execution guidance.'
          },
          {
            question: 'Can you guarantee every campaign post will stay live?',
            answer:
              'No.\n\nReddit and subreddit moderation are outside anyone’s control. What we can do is reduce avoidable risk, track status clearly, and apply the agreed replacement rules when needed.'
          },
          {
            question: 'Is this the same as Reddit ads management?',
            answer:
              'No.\n\nThis page is about Reddit-native campaign post execution and batch publishing support, not paid Reddit Ads account management.'
          },
          {
            question: 'What makes a campaign more likely to work on Reddit?',
            answer:
              'Usually a better combination of subreddit fit, more natural message angles, clearer publishing discipline, and honest tracking of what actually survives and resonates.'
          }
        ]
      }
    },
    zh: {
      metadata: {
        title: 'Reddit Campaign 服务 | Meridian',
        description:
          '以更贴近社区语境的方式执行 Reddit Campaign。Meridian 帮助团队把原始想法整理成可发布帖子、批次执行方案和透明的交付追踪记录。',
        keywords: ['Reddit Campaign', 'Reddit 帖子投放', 'Reddit 内容分发', 'subreddit campaign 策略', 'Reddit 执行服务']
      },
      serviceType: 'Reddit Campaign',
      trustedBrandsTitle: '服务过从初创公司到行业头部企业的团队。',
      hero: {
        badge: 'Reddit Campaign Execution',
        title: '围绕批次化执行设计的 Reddit Campaign 服务',
        description:
          '我们帮助团队用更符合 Reddit 语境的方式执行 Campaign，而不是简单复用其他渠道的内容。这包含 subreddit 规划、Reddit 风格润色、发布节奏、交付跟踪，以及在未达约定标准时的补发规则。',
        primaryCta: '规划一轮 Reddit Campaign',
        secondaryCta: '查看交付范围',
        trustPoints: ['先做 subreddit 规划', 'Reddit 风格润色', '交付状态透明', '补发规则清晰']
      },
      challenge: {
        eyebrow: '为什么很多 Campaign 效果不好',
        title: '当分发优先级高于社区匹配度时，Reddit Campaign 很容易失效',
        paragraphs: [
          '一个 campaign 即使量够大，也可能因为信息表达、社区选择和发布节奏不符合 Reddit 的习惯而整体失效。',
          '很多团队会带着其他渠道风格的内容进入 Reddit，等到真正执行时才发现，语气、结构、时间点和 subreddit 规则远比想象中更重要。',
          '我们的工作就是把这轮 campaign 调整成更贴近 Reddit 原生环境的执行方式，让批次更有机会存活、获得注意力并满足交付标准。'
        ],
        cardTitle: '最容易伤害 campaign 质量的问题',
        cardDescription: '很多删帖风险和低互动问题，其实在上线前就已经埋下了。',
        painPoints: [
          '初稿太像常规营销文案',
          'Subreddit 选择忽视规则差异',
          '发布时间和节奏不符合社区行为',
          '没有透明记录哪些发了、哪些补发了',
          '为了凑数量牺牲单条质量',
          '落地预期和信息角度没有对齐'
        ]
      },
      includes: {
        eyebrow: '服务包含什么',
        title: '一轮 Reddit Campaign 通常覆盖这些模块',
        description: '这项服务是围绕批次化执行设计的，会把内容质量、发布动作和交付追踪边界定义得更清楚。',
        modules: [
          {
            title: 'Campaign 与 subreddit 规划',
            description: '根据目标和节奏，把 campaign 匹配到更合适的社区和发布结构。',
            points: ['按目标筛选社区', '规则与语气审查', '发布时间窗口建议', '批次排序建议']
          },
          {
            title: 'Reddit 风格润色',
            description: '把原始初稿调整成更符合 Reddit 预期的帖子。',
            points: ['语气调整', '标题与开头优化', '正文结构优化', '降低营销感风险']
          },
          {
            title: '批次发布执行',
            description: '按照约定批次完成实际发布节奏管理与执行支持。',
            points: ['排期发布支持', '按批次追踪', '分社区处理', '状态可视化']
          },
          {
            title: '补发与异常规则',
            description: '当帖子未满足约定存活标准时，明确如何判定和补发。',
            points: ['补发标准', '异常复核', '调整建议', '补发记录透明']
          },
          {
            title: 'Campaign 复盘',
            description: '总结这一轮发了什么、存活如何，以及下一轮应该怎么调整。',
            points: ['交付回顾', '社区匹配观察', '信息角度学习', '下一批建议']
          }
        ]
      },
      process: {
        eyebrow: '推进方式',
        title: '我们如何执行 Reddit Campaign 批次',
        description: '整个流程会从原始素材出发，最终落到一个清晰、可追踪且尊重社区差异的发布周期。',
        steps: [
          { title: '确定 Campaign 目标', description: '先对齐目标、社区组合与批次结构，再进入发布阶段。', output: 'Campaign 方案' },
          { title: '润色初稿', description: '把客户提供的原始素材调整成更贴近 Reddit 语境的帖子。', output: '润色后帖子集' },
          { title: '协调发布动作', description: '围绕 subreddit 匹配度和活跃时间完成批次执行。', output: '已发布批次' },
          { title: '追踪交付状态', description: '逐条记录发布状态、问题和是否需要补发。', output: '状态日志' },
          { title: '复盘并改进', description: '回顾这一批的结果，并把学习带入下一轮。', output: '下一轮建议' }
        ]
      },
      deliverables: {
        eyebrow: '你会拿到什么',
        title: '支撑一轮 Reddit Campaign 执行的核心资产',
        items: [
          'Campaign 批次方案',
          '重点 subreddit 清单',
          'Reddit 风格润色建议',
          '逐帖执行支持',
          '发布状态追踪',
          '补发与异常处理规则',
          '批次交付记录',
          '社区匹配观察',
          'Campaign 复盘总结',
          '下一轮执行建议'
        ],
        note: '客户原始素材准备、审批流程，以及外部落地页或网站修改默认由客户团队负责，如需支持可另行界定范围。',
        summaryTitle: '尤其适合已经有投放想法和原始素材的团队',
        summaryDescription: '如果团队已经有 campaign 方向或初稿，但需要更强的 Reddit 原生执行能力和交付纪律，这类服务会很适合。',
        summaryPoints: ['按 subreddit 做更细的匹配', '文案更像 Reddit 而不是广告', '交付记录更清楚', '更容易基于批次持续迭代']
      },
      fit: {
        eyebrow: '适合谁',
        title: '适合新品发布、活动节点和集中曝光场景',
        description: '当品牌希望围绕某个节点、活动或重点信息做一轮集中分发，同时又不想失去对真实交付情况的掌控时，Reddit Campaign 会很合适。',
        bullets: ['已经准备好 campaign 初稿的品牌', '有发布节点或活动周期的团队', '需要透明交付追踪的运营方', '需要按社区分别处理内容的 campaign', '希望提前定义补发规则的市场团队', '想补齐 Reddit 执行层的公司']
      },
      faq: {
        eyebrow: 'FAQ',
        title: '关于 Reddit Campaign 的常见问题',
        description: '这里集中回答初稿、执行方式和交付预期相关的问题。',
        items: [
          {
            question: '是不是需要我们先提供 campaign 初稿？',
            answer: '通常需要。\n\n这类服务常见的合作方式是客户先提供原始素材，我们再把它调整成适合 Reddit 的帖子与执行方案。'
          },
          {
            question: '可以保证每条帖子都一直存活吗？',
            answer:
              '不能。\n\nReddit 和 subreddit 的审核不是任何服务方可以控制的。我们能做的是尽量降低可避免风险、透明追踪状态，并在需要时按照约定规则补发。'
          },
          {
            question: '这和 Reddit Ads 托管是一回事吗？',
            answer: '不是。\n\n这里指的是基于 Reddit 原生帖子执行的 Campaign 批次服务，不是付费 Reddit Ads 账户托管。'
          },
          {
            question: '什么样的 Campaign 更容易在 Reddit 上做起来？',
            answer: '通常是 subreddit 选得更准、表达更自然、发布纪律更清晰，并且能诚实记录哪些内容真正存活并产生共鸣的 campaign。'
          }
        ]
      }
    }
  }
} as const satisfies Record<string, Record<SpecializedServiceLang, SpecializedServicePageContent>>
