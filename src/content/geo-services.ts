import type { ServicePage } from '@/content/services'

export const geoServices: ServicePage[] = [
  {
    slug: 'prompt-search',
    category: { en: 'GEO Services', zh: 'GEO 服务' },
    title: { en: 'Prompt Search', zh: 'Prompt Search' },
    description: {
      en: 'Discover the questions buyers ask AI, compare the answers, and turn gaps in brand visibility into a prioritized content plan.',
      zh: '研究目标客户会向 AI 提哪些问题，分析品牌与竞品在答案中的表现，将发现机会转化为内容优先级。'
    },
    intro: {
      en: 'Start with your audience, product, and buying journey. We build a prompt library around recommendations, comparisons, alternatives, and use cases, then connect each priority question to content and a repeatable monitoring baseline.',
      zh: '从客户画像、产品和购买路径出发，围绕推荐、对比、替代方案与使用场景建立 Prompt 库，为每个重点问题匹配内容方向，并为后续 GEO 监控建立基线。'
    },
    keywords: [
      { en: 'prompt search', zh: 'Prompt 研究' },
      { en: 'AI search intent research', zh: 'AI 搜索意图研究' },
      { en: 'GEO prompt research', zh: 'GEO 问题库' }
    ],
    highlights: [],
    serviceIncludes: [
      { en: 'Buyer questions and intent map', zh: '用户问题与意图地图' },
      { en: 'Brand, competitor, and citation baseline', zh: '品牌、竞品与引用基线' },
      { en: 'Prioritized prompt library and content briefs', zh: '分级 Prompt 库与内容 Brief' }
    ],
    deliveryPresentation: 'cards',
    deliveryDescription: {
      en: 'Move from audience research to an actionable question library. In the full GEO program, the monthly scope includes 30 keyword and topic groups; prompt variants are organized within those groups.',
      zh: '从受众研究推进到可执行的问题库。完整 GEO 方案每月覆盖 30 组关键词与话题策略，并在每组下整理不同提问方式。'
    },
    sections: [
      {
        id: 'audience-and-intent',
        title: { en: 'Map buyers and decision scenarios', zh: '梳理客户与决策场景' },
        description: {
          en: 'Define whose questions matter and which decisions your content should support.',
          zh: '明确谁在提问，以及内容需要支持哪些购买决策。'
        },
        bullets: [
          {
            en: 'Review product information, target markets, customer questions, and available search data.',
            zh: '梳理产品资料、目标市场、客户常见问题与已有搜索数据。'
          },
          {
            en: 'Group questions by discovery, comparison, evaluation, and purchase intent.',
            zh: '按需求发现、产品对比、方案评估与购买意图归类问题。'
          },
          {
            en: 'Define the language, region, audience, and product category for each group.',
            zh: '为每组问题明确语言、地区、受众与产品类别。'
          }
        ]
      },
      {
        id: 'prompt-library',
        title: { en: 'Build and prioritize the prompt library', zh: '建立 Prompt 库与优先级' },
        description: {
          en: 'Turn broad topics into specific questions that can guide writing and repeated checks.',
          zh: '将宽泛话题拆成具体问题，用于指导写作和后续重复检测。'
        },
        bullets: [
          {
            en: 'Cover recommendations, alternatives, comparisons, workflows, and constraints.',
            zh: '覆盖产品推荐、替代方案、竞品对比、工作流程与限制条件。'
          },
          {
            en: 'Separate branded and unbranded questions and record natural-language variants.',
            zh: '区分品牌词与非品牌词问题，记录自然语言提问变体。'
          },
          {
            en: 'Rank opportunities by business relevance, evidence gaps, and production effort.',
            zh: '按业务相关性、证据缺口与内容制作成本排序。'
          }
        ]
      },
      {
        id: 'answer-and-source-review',
        title: { en: 'Review answers, competitors, and sources', zh: '分析答案、竞品与引用来源' },
        description: {
          en: 'Capture a starting point for the agreed AI platforms and question set.',
          zh: '围绕约定的 AI 平台和问题集合，记录当前表现。'
        },
        bullets: [
          {
            en: 'Record the prompt, platform, date, answer, brand mentions, and available citation URLs.',
            zh: '记录 Prompt、平台、日期、答案、品牌提及与可获取的引用链接。'
          },
          {
            en: 'Compare 3–5 priority competitors as part of the full GEO program.',
            zh: '完整 GEO 方案覆盖 3—5 个重点竞品的对比分析。'
          },
          {
            en: 'Label observed results and research hypotheses separately; validate proposed questions with customer input.',
            zh: '区分实际观测结果与研究假设，并结合客户反馈验证拟定问题。'
          }
        ]
      },
      {
        id: 'content-opportunity-map',
        title: { en: 'Hand over the content opportunity map', zh: '交付内容机会地图' },
        description: {
          en: 'Give writers and monitoring owners a shared execution plan.',
          zh: '让内容团队与监控负责人使用同一套执行依据。'
        },
        bullets: [
          {
            en: 'Map each priority prompt group to an existing page or a proposed article.',
            zh: '将重点问题组匹配到已有页面或新文章选题。'
          },
          {
            en: 'Outline answer structure, supporting evidence, comparison criteria, and internal links.',
            zh: '明确答案结构、支撑证据、对比维度与内部链接。'
          },
          {
            en: 'Deliver the prompt library, baseline observations, and next-cycle priorities.',
            zh: '交付 Prompt 库、基线观察记录与下一周期优先级。'
          }
        ]
      }
    ],
    outcomes: [],
    faqItems: [
      {
        question: {
          en: 'How is Prompt Search different from keyword research?',
          zh: 'Prompt Search 与关键词研究有什么区别？'
        },
        answer: {
          en: 'Keyword research organizes search terms and page intent. Prompt Search adds complete questions, user context, constraints, and follow-up scenarios, then examines the answers and sources returned for that defined set.',
          zh: '关键词研究主要梳理搜索词与页面意图；Prompt Search 进一步研究完整问题、用户背景、限制条件与追问场景，并分析这组问题对应的 AI 答案和来源。'
        }
      },
      {
        question: {
          en: 'Does the prompt library represent actual AI search volume?',
          zh: 'Prompt 库是否代表真实的 AI 搜索量？'
        },
        answer: {
          en: 'We do not present inferred prompts as measured search volume. Each group records its research basis, such as customer questions or available search data, and is prioritized by relevance and observed answer gaps.',
          zh: '我们不会将推测的 Prompt 标注为已测量的搜索量。每组问题会注明研究依据，例如客户提问或已有搜索数据，并结合业务相关性与答案缺口确定优先级。'
        }
      },
      {
        question: { en: 'Can we use the research with our own writers?', zh: '可以让内部团队根据研究结果写文章吗？' },
        answer: {
          en: 'Yes. The prompt library and content briefs can be handed to your team or used in our article production service. Platform coverage, language, and delivery volume are agreed at scoping.',
          zh: '可以。Prompt 库与内容 Brief 可以交给内部团队执行，也可以接入我们的文章生产服务。平台范围、语言与交付数量会在合作前明确。'
        }
      }
    ]
  },
  {
    slug: 'article-production',
    category: { en: 'GEO Services', zh: 'GEO 服务' },
    title: { en: 'Article Production', zh: '文章生产' },
    description: {
      en: 'Turn priority prompts into clear, evidence-backed articles with editorial review, structured answers, and a practical publishing handoff.',
      zh: '围绕重点 Prompt 生产有事实依据、结构清晰的文章，完成编辑审核、答案组织与发布交付。'
    },
    intro: {
      en: 'We connect each article to a buyer question and a useful next step. Production covers briefs, research, drafting, fact checks, and revision, with clear responsibilities for brand approval and publishing.',
      zh: '每篇文章都对应一个用户问题与明确的下一步行动。从 Brief、资料研究、撰写到事实核查和修改形成完整流程，同时明确品牌审核与上线责任。'
    },
    keywords: [
      { en: 'GEO article production', zh: 'GEO 文章生产' },
      { en: 'AI search content services', zh: 'AI 搜索内容服务' },
      { en: 'LLM-friendly content', zh: 'LLM 友好内容' }
    ],
    highlights: [],
    serviceIncludes: [
      { en: 'Topic planning and writing briefs', zh: '选题规划与写作 Brief' },
      { en: 'Research, drafting, and editorial review', zh: '资料研究、撰写与编辑审核' },
      { en: 'Publication assets and refresh priorities', zh: '发布材料与内容更新建议' }
    ],
    deliveryPresentation: 'cards',
    deliveryDescription: {
      en: 'The full GEO program includes 30 LLM-friendly articles per month, typically 800–2,000 words each. Language, formats, review rounds, and publishing responsibilities are confirmed before production.',
      zh: '完整 GEO 方案每月包含 30 篇 LLM 友好文章，建议单篇 800—2,000 字。正式生产前确认语言、内容形式、审核轮次与发布责任。'
    },
    sections: [
      {
        id: 'topics-and-briefs',
        title: { en: 'Plan topics and briefs', zh: '选题与 Brief 规划' },
        description: {
          en: 'Align the editorial queue with the questions most relevant to your product.',
          zh: '让文章排期围绕与产品最相关的用户问题展开。'
        },
        bullets: [
          {
            en: 'Use Prompt Search findings or the client’s approved topic list.',
            zh: '使用 Prompt Search 研究结果或客户确认的选题清单。'
          },
          {
            en: 'Specify audience, intent, outline, evidence needs, and the intended next action.',
            zh: '明确受众、意图、大纲、所需证据与预期用户行动。'
          },
          {
            en: 'Plan guides, comparisons, alternatives, FAQs, and use-case articles.',
            zh: '规划指南、对比、替代方案、FAQ 与使用场景文章。'
          }
        ]
      },
      {
        id: 'research-and-drafting',
        title: { en: 'Research and write useful answers', zh: '资料研究与正文撰写' },
        description: {
          en: 'Build articles around specific answers, useful examples, and traceable sources.',
          zh: '用具体答案、实用示例与可追溯来源组织文章。'
        },
        bullets: [
          {
            en: 'Combine client product materials, original examples, and relevant primary sources.',
            zh: '结合客户产品资料、原创案例与相关一手来源。'
          },
          {
            en: 'Use descriptive headings, concise answers, and comparison tables where useful.',
            zh: '根据内容需要设置清晰标题、简明答案与对比表格。'
          },
          {
            en: 'Keep brand claims, product capabilities, and limitations consistent with approved facts.',
            zh: '让品牌陈述、产品能力与适用限制符合已确认事实。'
          }
        ]
      },
      {
        id: 'editorial-and-brand-review',
        title: { en: 'Review facts and brand expression', zh: '事实核查与品牌审核' },
        description: {
          en: 'Review every draft before handing it over for approval.',
          zh: '每篇初稿在交付客户确认前完成编辑审核。'
        },
        bullets: [
          {
            en: 'Check supporting sources, factual consistency, clarity, and repetitive phrasing.',
            zh: '核查来源依据、事实一致性、表达清晰度与重复表述。'
          },
          { en: 'Review product details and brand tone with the client.', zh: '与客户确认产品细节和品牌表达方式。' },
          {
            en: 'Resolve feedback and deliver the agreed final version with its source references.',
            zh: '根据反馈修改，交付确认后的终稿与参考来源。'
          }
        ]
      },
      {
        id: 'publishing-and-refresh',
        title: { en: 'Prepare publishing and future updates', zh: '发布交付与后续更新' },
        description: {
          en: 'Make the final article easy to publish and connect to ongoing review.',
          zh: '让终稿便于上线，并与后续复盘衔接。'
        },
        bullets: [
          {
            en: 'Provide titles, meta descriptions, internal-link suggestions, and applicable schema guidance.',
            zh: '提供标题、Meta 描述、内链建议与适用的结构化数据建议。'
          },
          {
            en: 'Hand approved files to the client for website publishing; confirm any extra distribution separately.',
            zh: '交付已确认稿件，由客户负责官网发布；额外分发范围另行明确。'
          },
          {
            en: 'Map published URLs back to prompt groups and use monitoring findings to prioritize updates.',
            zh: '将上线链接回填至问题组，并根据监控结果确定更新优先级。'
          }
        ]
      }
    ],
    outcomes: [],
    faqItems: [
      {
        question: { en: 'Do you deliver finished articles or just briefs?', zh: '交付的是文章成稿，还是只有 Brief？' },
        answer: {
          en: 'This service delivers reviewed article drafts and agreed final versions, together with the briefs and publishing recommendations. The full GEO program includes 30 articles per month; a focused engagement is scoped separately.',
          zh: '该服务交付经过审核的文章稿件与约定终稿，同时包含 Brief 和发布建议。完整 GEO 方案每月包含 30 篇文章；单独合作时按实际需求约定数量。'
        }
      },
      {
        question: { en: 'Can you improve existing articles?', zh: '已有文章可以直接优化吗？' },
        answer: {
          en: 'Yes. We first map the target prompt to existing pages. If a page already serves the right intent, the brief identifies missing answers, outdated facts, evidence gaps, structural changes, and internal links. The delivery records the changes and the live URL for later monitoring.',
          zh: '可以。我们先将目标问题与已有页面匹配；页面意图合适时，Brief 会明确缺失答案、过时事实、证据缺口、结构调整与内链建议。交付时记录改动内容和上线 URL，便于后续监控。'
        }
      },
      {
        question: { en: 'What makes an article useful for GEO?', zh: 'GEO 文章具体会做哪些处理？' },
        answer: {
          en: 'We connect the page to a defined buyer question, organize the answer into clear sections, support material claims with sources or first-hand evidence, explain comparison criteria and limitations, and connect the article to relevant product pages. The same brief also defines which prompt group will be checked after publication.',
          zh: '先让文章对应明确的客户问题，再用清晰章节组织答案，为重要陈述补充来源或一手证据，说明对比维度与限制条件，并连接相关产品页面。同一份 Brief 还会定义上线后回查的问题组。'
        }
      },
      {
        question: { en: 'What does the client provide?', zh: '客户需要提供哪些资料？' },
        answer: {
          en: 'We need accurate product information, brand guidelines, examples or first-hand evidence, and a reviewer who can confirm product claims. The client handles final approval and website publishing.',
          zh: '需要准确的产品资料、品牌规范、案例或一手证据，以及能够确认产品陈述的审核人。客户负责最终确认与官网发布。'
        }
      },
      {
        question: {
          en: 'Does publishing an article guarantee an AI citation?',
          zh: '文章上线后能保证获得 AI 引用吗？'
        },
        answer: {
          en: 'No. We deliver useful, well-supported content and track available evidence of visibility. Citation outcomes are evaluated through the agreed monitoring scope and inform future revisions.',
          zh: '不能保证。我们交付有用、有事实依据的内容，并通过约定的监控范围观察可见度与引用情况，再将结果用于后续优化。'
        }
      }
    ]
  },
  {
    slug: 'geo-monitoring',
    category: { en: 'GEO Services', zh: 'GEO 服务' },
    title: { en: 'GEO Monitoring', zh: 'GEO 监控' },
    description: {
      en: 'Track brand mentions, citations, and competitor visibility across a defined prompt set, then turn changes into clear optimization priorities.',
      zh: '基于固定问题集持续跟踪品牌提及、引用来源与竞品可见度，将变化转化为明确的优化动作。'
    },
    intro: {
      en: 'We define the prompts, platforms, sampling cadence, and measurement rules before tracking begins. Each review connects answer evidence to content changes so your team can decide what to improve next.',
      zh: '监控开始前先约定问题集、平台、采样频率与指标口径。每次复盘都将答案证据与内容变化关联，帮助团队决定下一步应该优化什么。'
    },
    keywords: [
      { en: 'GEO monitoring', zh: 'GEO 监控' },
      { en: 'AI brand visibility tracking', zh: 'AI 品牌可见度追踪' },
      { en: 'AI citation monitoring', zh: 'AI 引用监测' }
    ],
    highlights: [],
    serviceIncludes: [
      { en: 'Defined prompt set and measurement baseline', zh: '固定问题集与指标基线' },
      { en: 'Brand, citation, and competitor tracking', zh: '品牌、引用与竞品追踪' },
      { en: 'Monthly review and optimization priorities', zh: '月度复盘与优化优先级' }
    ],
    deliveryPresentation: 'cards',
    deliveryDescription: {
      en: 'The full GEO program starts with a visibility baseline and includes monthly written reviews and weekly working sessions. Platform coverage and sampling frequency are agreed in the monitoring plan.',
      zh: '完整 GEO 方案先建立可见度基线，再提供月度书面复盘与每周推进会。具体平台覆盖范围和采样频率以监控计划为准。'
    },
    sections: [
      {
        id: 'monitoring-scope',
        title: { en: 'Define a comparable baseline', zh: '建立可对比的监控基线' },
        description: {
          en: 'Agree on what to measure before interpreting changes.',
          zh: '先明确测量范围，再判断表现变化。'
        },
        bullets: [
          {
            en: 'Choose priority prompt groups, brand aliases, competitors, languages, and regions.',
            zh: '确认重点问题组、品牌别名、竞品、语言与地区。'
          },
          {
            en: 'Specify covered platforms, available search modes, sampling frequency, and repeated checks.',
            zh: '约定覆盖平台、可用搜索模式、采样频率与重复检测方式。'
          },
          {
            en: 'Record the initial answers and keep changes to the prompt set visible.',
            zh: '记录首轮答案，并保留问题集合的变更记录。'
          }
        ]
      },
      {
        id: 'mentions-and-citations',
        title: { en: 'Track mentions and citation evidence', zh: '追踪品牌提及与引用证据' },
        description: {
          en: 'Keep the underlying observations available alongside summary metrics.',
          zh: '在汇总指标之外保留可核对的原始观察记录。'
        },
        bullets: [
          {
            en: 'Measure brand mention rate among valid sampled answers and report the sample count.',
            zh: '计算有效采样答案中的品牌提及率，同时说明样本数量。'
          },
          {
            en: 'Track owned-site citations and competitor mentions with explicit denominators.',
            zh: '跟踪官网引用与竞品提及，并明确每项指标的计算分母。'
          },
          {
            en: 'Store available answer excerpts, citation URLs, dates, and platform context; flag unavailable checks.',
            zh: '保存可获取的答案片段、引用链接、日期与平台条件；单独标记无法完成的检测。'
          }
        ]
      },
      {
        id: 'change-analysis',
        title: { en: 'Explain changes and content gaps', zh: '分析变化与内容缺口' },
        description: {
          en: 'Review comparable samples to identify questions that need attention.',
          zh: '在可比样本中识别需要重点处理的问题。'
        },
        bullets: [
          {
            en: 'Compare periods by prompt group and platform, noting sampling or coverage changes.',
            zh: '按问题组与平台对比不同时期，并标明采样或覆盖范围变化。'
          },
          {
            en: 'Review lost citations, new competitor mentions, and inaccurate product descriptions.',
            zh: '复核引用流失、竞品新增曝光与产品描述不准确等情况。'
          },
          {
            en: 'Separate observed changes from possible causes and record what needs further validation.',
            zh: '区分已观测变化与可能原因，记录仍需验证的判断。'
          }
        ]
      },
      {
        id: 'report-and-action-plan',
        title: { en: 'Deliver a review and action plan', zh: '交付复盘与行动清单' },
        description: {
          en: 'Connect visibility findings to the next round of research and production.',
          zh: '让可见度发现进入下一轮研究和内容生产。'
        },
        bullets: [
          {
            en: 'Provide a monthly report with metrics, evidence, competitor observations, and limitations.',
            zh: '月度报告包含指标、证据、竞品观察与数据限制。'
          },
          {
            en: 'Prioritize article updates, new topic briefs, and technical checks with owners and next steps.',
            zh: '为文章更新、新选题和技术检查排优先级，明确负责人及下一步。'
          },
          {
            en: 'Maintain a change log and revisit completed actions in the next reporting cycle.',
            zh: '维护动作记录，在下一复盘周期回看已完成事项的表现。'
          }
        ]
      }
    ],
    outcomes: [],
    faqItems: [
      {
        question: { en: 'Which AI platforms can be included?', zh: '可以监控哪些 AI 平台？' },
        answer: {
          en: 'The plan can cover relevant scenarios on ChatGPT, Claude, Perplexity, and Gemini, subject to available access and search modes. The report identifies the actual coverage and any unavailable observations.',
          zh: '可根据实际访问条件和搜索模式，规划 ChatGPT、Claude、Perplexity、Gemini 等平台的相关场景。报告会注明实际覆盖范围与不可获取的观察结果。'
        }
      },
      {
        question: { en: 'Is this a real-time dashboard subscription?', zh: '这是实时监控看板订阅吗？' },
        answer: {
          en: 'This is a managed monitoring and analysis service. It includes an agreed sampling plan, evidence records, and recurring reporting. Any dashboard access or higher-frequency collection is confirmed separately in the scope.',
          zh: '这是包含监测与分析的服务，交付约定的采样计划、证据记录与周期报告。如需看板权限或更高频采集，会在合作范围中单独确认。'
        }
      },
      {
        question: { en: 'How do you handle changing AI answers?', zh: 'AI 每次回答不同，怎么判断变化？' },
        answer: {
          en: 'We compare a defined prompt set under recorded conditions, include repeated samples where agreed, and report sample sizes and failures. A single answer is treated as an observation, and trends are interpreted within the measured scope.',
          zh: '使用固定问题集与已记录的检测条件，按约定重复采样，并报告样本量和检测失败情况。单次回答作为一次观察，趋势判断限定在实际测量范围内。'
        }
      }
    ]
  }
]
