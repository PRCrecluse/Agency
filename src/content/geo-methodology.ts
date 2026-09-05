import type { LocalizedText } from '@/content/services'

export const geoMethodologyPath = '/services/geo-services/methodology'

export const geoMethodology = {
  title: { en: 'How we approach GEO', zh: '我们如何做 GEO' },
  description: {
    en: 'Our GEO method connects buyer questions, verifiable evidence, useful content, technical access, and repeated measurement. See what we do at each stage, what you receive, and how we decide what to improve.',
    zh: '我们的 GEO 方法，把用户问题、可信证据、内容生产、技术可访问性与持续测量串成一套执行流程。每一步都明确做什么、交付什么，以及如何决定下一步优化。'
  },
  thesis: {
    en: 'We work toward a specific outcome: when a buyer asks a question relevant to your product, they can find an accurate, useful answer that explains where your brand fits. Research defines the question; evidence supports the answer; publishing makes it accessible; measurement tells us what to revisit.',
    zh: '我们围绕一个具体目标开展工作：当潜在客户提出与你的产品相关的问题时，能够找到准确、有用、能说明品牌适用场景的答案。研究确定问题，证据支撑回答，发布让信息可访问，测量帮助我们决定下一轮应该改哪里。'
  },
  stages: [
    {
      id: 'goals-and-baseline',
      title: { en: 'Define the business goal and baseline', zh: '明确业务目标，建立可见度基线' },
      summary: {
        en: 'Agree on the buyer, market, decision, and starting point.',
        zh: '先明确目标客户、市场、决策场景与当前表现。'
      },
      input: {
        en: 'Product materials, target customers, priority markets, competitor shortlist, and available analytics.',
        zh: '产品资料、目标客户、重点市场、竞品名单与已有分析数据。'
      },
      actions: [
        {
          en: 'Choose the decisions to support: product discovery, shortlisting, comparison, migration, or implementation.',
          zh: '确定要支持的决策：发现产品、进入候选清单、方案对比、迁移或实施。'
        },
        {
          en: 'Agree on languages, platforms, search modes, business conversions, and who can verify product facts.',
          zh: '约定语言、平台、搜索模式、业务转化目标，以及产品事实的确认负责人。'
        },
        {
          en: 'Capture initial answers and existing page coverage before starting the first content changes.',
          zh: '在首轮内容改动前保存初始答案，梳理现有页面覆盖情况。'
        }
      ],
      output: {
        en: 'Scope sheet, baseline observations, product fact checklist, and measurement definitions.',
        zh: '范围确认表、基线观察记录、产品事实清单与指标定义。'
      },
      gate: {
        en: 'Each goal has a defined audience, a measurable observation, and an owner. Available data and missing access are documented.',
        zh: '每项目标都有明确受众、可观察指标与负责人；已有数据和缺失权限都有记录。'
      }
    },
    {
      id: 'prompt-research',
      title: { en: 'Research questions and map answer gaps', zh: '研究用户问题，定位答案缺口' },
      summary: {
        en: 'Use Prompt Search to build a question set writers and analysts can share.',
        zh: '通过 Prompt Search 建立内容与监控共用的问题集。'
      },
      input: {
        en: 'Customer interviews, sales and support questions, search queries, product use cases, and the baseline.',
        zh: '客户访谈、销售与客服问题、搜索词、产品使用场景和基线记录。'
      },
      actions: [
        {
          en: 'Group prompts by buying stage, task, constraints, language, and branded or unbranded intent.',
          zh: '按购买阶段、任务、限制条件、语言和品牌／非品牌意图归类。'
        },
        {
          en: 'Review which brands appear, what is said about them, and which pages are visibly cited in the sampled answers.',
          zh: '检查采样答案中出现哪些品牌、如何描述品牌，以及明确引用了哪些页面。'
        },
        {
          en: 'Prioritize a gap when it matters to the business, lacks a useful answer, and can be addressed with evidence the team can supply.',
          zh: '优先处理与业务相关、现有回答不充分，而且团队能够提供证据补足的问题。'
        }
      ],
      output: {
        en: 'Versioned prompt library, competitor and source map, and a prioritized prompt-to-page backlog.',
        zh: '带版本号的 Prompt 库、竞品与来源地图，以及按优先级排列的问题—页面清单。'
      },
      gate: {
        en: 'Each priority question has a research basis, an intent label, and a page decision: create, improve, combine, or defer.',
        zh: '每个重点问题都有研究依据、意图标签和页面决策：新建、优化、合并或暂缓。'
      }
    },
    {
      id: 'evidence-and-entities',
      title: { en: 'Build a reliable evidence foundation', zh: '整理品牌事实与可信证据' },
      summary: {
        en: 'Establish what the brand can accurately claim and demonstrate.',
        zh: '明确品牌能够准确陈述、用材料证明的内容。'
      },
      input: {
        en: 'Product documentation, approved customer examples, original tests, pricing information, and expert input.',
        zh: '产品文档、获准使用的客户案例、原创测试、价格资料与专家输入。'
      },
      actions: [
        {
          en: 'Connect material claims to a source, its date, a verification owner, and any conditions or limitations.',
          zh: '将重要陈述对应到来源、日期、核实人，以及适用条件或限制。'
        },
        {
          en: 'Use consistent product names, category definitions, feature descriptions, and author or organization information.',
          zh: '统一产品名称、品类定义、功能描述，以及作者或机构信息。'
        },
        {
          en: 'Identify missing evidence before drafting: request a demo, test, screenshot, interview, or product-owner confirmation.',
          zh: '写作前识别证据缺口，补充演示、测试、截图、访谈或产品负责人的确认。'
        }
      ],
      output: {
        en: 'Claim-to-source register, approved brand fact sheet, and a list of evidence gaps to resolve.',
        zh: '陈述—来源对照表、已确认的品牌事实表，以及待补充的证据清单。'
      },
      gate: {
        en: 'Quantitative, comparative, and capability claims can be checked. Unsupported claims are removed or rewritten with the appropriate limits.',
        zh: '数字、对比与能力陈述可以核对；缺少依据的陈述需删除或按实际限制改写。'
      }
    },
    {
      id: 'answer-led-content',
      title: { en: 'Produce content around the decision', zh: '围绕决策问题生产内容' },
      summary: {
        en: 'Turn the prompt and evidence into a page that answers a real buying question.',
        zh: '把问题与证据转成能够支持实际决策的页面。'
      },
      input: {
        en: 'Approved prompt groups, page mapping, evidence register, and editorial brief.',
        zh: '已确认的问题组、页面映射、证据登记表与写作 Brief。'
      },
      actions: [
        {
          en: 'Select the right format: a use-case guide, comparison, alternative, how-to, FAQ, or an update to an existing page.',
          zh: '选择合适形式：场景指南、对比、替代方案、教程、FAQ，或对已有页面的更新。'
        },
        {
          en: 'Give a clear answer, explain who it fits, show the evidence, state tradeoffs, and provide the next useful action.',
          zh: '先给出明确回答，再说明适合谁、依据是什么、有哪些取舍，以及下一步怎么做。'
        },
        {
          en: 'Review facts, completeness, readability, internal links, and conversion paths before client approval.',
          zh: '客户确认前，审核事实、信息完整性、可读性、内链与转化路径。'
        }
      ],
      output: {
        en: 'Approved article, source notes, metadata, internal-link plan, and publishing instructions.',
        zh: '审核后的文章、来源说明、页面元信息、内链规划与发布说明。'
      },
      gate: {
        en: 'The page answers its primary question without requiring a sales call to understand the basics; important statements have support.',
        zh: '读者不必先预约销售，就能从页面理解核心问题；重要结论有事实支撑。'
      }
    },
    {
      id: 'access-and-distribution',
      title: { en: 'Publish, verify access, and distribute', zh: '发布上线，检查访问与分发' },
      summary: {
        en: 'Connect the content to the site and the relevant places buyers research.',
        zh: '将内容接入官网与客户实际使用的信息渠道。'
      },
      input: {
        en: 'Approved content, publishing access, website configuration, and relevant source opportunities.',
        zh: '已确认内容、发布权限、网站配置与相关来源机会。'
      },
      actions: [
        {
          en: 'Check the published page, indexability, canonical URL, internal links, and whether the main answer is accessible as text.',
          zh: '检查上线页面、索引资格、规范网址、内部链接，以及正文答案是否以可访问的文本提供。'
        },
        {
          en: 'Use applicable structured data that describes the visible content, and route technical changes to the implementation owner.',
          zh: '使用与可见内容一致、适合页面类型的结构化数据，并把技术修改交给实施负责人。'
        },
        {
          en: 'Prioritize relevant editorial, community, resource, or video opportunities found in the source review. Adapt the material to each context and make brand involvement clear.',
          zh: '根据来源分析，选择相关媒体、社区、资源页或视频机会；按渠道语境改写材料，并清楚说明品牌参与关系。'
        }
      ],
      output: {
        en: 'Published URL register, access checks, technical tickets, and records of agreed distribution work.',
        zh: '上线 URL 台账、访问检查、技术任务与约定分发工作的记录。'
      },
      gate: {
        en: 'The final page matches the approved facts and can be reached from relevant site pages. Publishing and technical responsibilities are explicit.',
        zh: '最终页面与已确认事实一致，并能从相关站内页面到达；发布与技术责任清晰。'
      }
    },
    {
      id: 'measurement-and-iteration',
      title: { en: 'Measure, explain, and improve', zh: '持续测量，解释变化并迭代' },
      summary: {
        en: 'Use GEO Monitoring to decide which questions and pages need the next round of work.',
        zh: '用 GEO 监控决定下一轮应处理的问题和页面。'
      },
      input: {
        en: 'The frozen prompt set, new observations, published URL register, change log, and available analytics.',
        zh: '固定版本的问题集、新观察记录、上线台账、变更日志与可用分析数据。'
      },
      actions: [
        {
          en: 'Repeat checks under recorded conditions and separate brand mentions, citations, traffic, and business conversions.',
          zh: '在记录检测条件的前提下重复采样，分别查看品牌提及、引用、访问与业务转化。'
        },
        {
          en: 'Compare like-for-like prompt groups; annotate platform, sample, or content changes and recheck unusual results.',
          zh: '对比口径一致的问题组，标注平台、样本或内容变更，并复核异常结果。'
        },
        {
          en: 'Select a small set of changes for the next cycle. Where practical, compare changed pages with stable pages and treat possible causes as hypotheses.',
          zh: '为下一周期选择一组明确改动；条件允许时对照未改页面，并将可能原因作为待验证假设。'
        }
      ],
      output: {
        en: 'Evidence-backed review, prioritized actions, named owners, and a record of what will be checked next.',
        zh: '有证据支持的复盘、动作优先级、负责人，以及下一轮验证记录。'
      },
      gate: {
        en: 'Every recommendation points to an observation and a concrete action. Reporting states sample sizes and coverage changes.',
        zh: '每条建议都能对应观察记录与具体动作，报告交代样本量和覆盖范围的变化。'
      }
    }
  ],
  metrics: [
    {
      title: { en: 'Brand mention rate', zh: '品牌提及率' },
      formula: {
        en: 'Valid answers mentioning the brand ÷ all valid sampled answers',
        zh: '提及品牌的有效回答数 ÷ 有效采样回答总数'
      },
      meaning: {
        en: 'Are we appearing in the selected buying conversations? Compare the same prompt version and platform; record failed checks separately.',
        zh: '品牌是否进入选定的决策对话？按同一问题版本、同一平台比较，失败检测单独记录。'
      }
    },
    {
      title: { en: 'Owned-page citation rate', zh: '官网引用率' },
      formula: {
        en: 'Answers citing an owned URL ÷ valid answers with observable citation status',
        zh: '引用官网 URL 的回答数 ÷ 引用状态可观察的有效回答数'
      },
      meaning: {
        en: 'Is our content used as a visible source? Distinguish a confirmed zero citation from an unavailable citation record.',
        zh: '自有内容是否成为可见来源？区分确认未引用与无法获取引用信息的情况。'
      }
    },
    {
      title: { en: 'Answer accuracy', zh: '品牌描述准确性' },
      formula: {
        en: 'Reviewed descriptions checked against the approved product fact sheet',
        zh: '将抽查的品牌描述逐项对照已确认产品事实表'
      },
      meaning: {
        en: 'Is the answer describing the right product, capabilities, and limitations? Log incorrect claims and the pages that need clearer explanations.',
        zh: '答案是否准确描述产品、能力与限制？记录错误陈述，并定位需要补充说明的页面。'
      }
    },
    {
      title: { en: 'Business response', zh: '业务反馈' },
      formula: {
        en: 'Identifiable referral visits → engaged visits → agreed conversion events',
        zh: '可识别的来源访问 → 有效访问 → 约定的转化事件'
      },
      meaning: {
        en: 'Are identifiable visitors taking a useful next step? Report attribution limits; an AI citation alone is not a visit or a lead.',
        zh: '可识别访客是否采取了有价值的行动？说明归因限制，AI 引用本身不等于访问或线索。'
      }
    }
  ],
  cadence: [
    {
      title: { en: 'Start: agree and diagnose', zh: '启动：对齐与诊断' },
      description: {
        en: 'Confirm the market, product facts, access, owners, prompt sample, and initial observations. Resolve missing inputs before committing the production queue.',
        zh: '确认市场、产品事实、权限、负责人、问题样本与初始表现，补齐会影响排期的输入资料。'
      }
    },
    {
      title: { en: 'First batch: research and produce', zh: '首批：研究与制作' },
      description: {
        en: 'Approve priority briefs and evidence, complete editorial review, and hand the first batch to the publishing owner. The pace follows evidence and review readiness.',
        zh: '确认重点 Brief 和证据，完成编辑审核，将首批内容交给发布负责人；进度根据资料和审核就绪情况安排。'
      }
    },
    {
      title: { en: 'Weekly: unblock delivery', zh: '每周：推进交付' },
      description: {
        en: 'Review drafts, approvals, publishing, technical tickets, and evidence gaps. Record decisions and the next actions for both teams.',
        zh: '跟进稿件、审核、上线、技术任务和证据缺口，记录决策与双方下一步动作。'
      }
    },
    {
      title: { en: 'Monthly: review and reprioritize', zh: '每月：复盘与调整' },
      description: {
        en: 'Review comparable observations and business signals, decide what to update or create, and revise the next content and monitoring cycle.',
        zh: '复盘可比观察结果和业务信号，决定哪些内容更新、哪些新建，并调整下月内容与监控计划。'
      }
    }
  ],
  sources: [
    {
      title: 'Google Search Central · AI features and your website',
      href: 'https://developers.google.com/search/docs/appearance/ai-features',
      note: {
        en: 'Google keeps foundational SEO requirements for its AI search features and does not require special AI markup. We use this guidance when checking access and page structure.',
        zh: 'Google 的 AI 搜索功能沿用基础 SEO 要求，并不要求专用 AI 标记。我们据此检查页面可访问性与结构。'
      }
    },
    {
      title: 'Bing Webmaster Tools · AI Performance',
      href: 'https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c',
      note: {
        en: 'Bing distinguishes citation activity from visits and explains the limits of aggregated grounding-query data. We keep platform reports separate from our sampled prompt observations.',
        zh: 'Bing 区分引用与访问，并说明汇总检索短语的数据边界。我们将平台报告与自行采样的 Prompt 观察分别呈现。'
      }
    },
    {
      title: 'Aggarwal et al. · GEO: Generative Engine Optimization',
      href: 'https://arxiv.org/abs/2311.09735',
      note: {
        en: 'This research frames visibility as something to evaluate and shows that results vary across domains. It informs our testing approach; benchmark gains are not client forecasts.',
        zh: '这项研究将可见度作为可评估对象，并指出不同领域效果存在差异。它为实验思路提供参考，实验基准中的提升幅度不作为客户效果预测。'
      }
    }
  ]
} satisfies {
  title: LocalizedText
  description: LocalizedText
  thesis: LocalizedText
  stages: Array<{
    id: string
    title: LocalizedText
    summary: LocalizedText
    input: LocalizedText
    actions: LocalizedText[]
    output: LocalizedText
    gate: LocalizedText
  }>
  metrics: Array<{ title: LocalizedText; formula: LocalizedText; meaning: LocalizedText }>
  cadence: Array<{ title: LocalizedText; description: LocalizedText }>
  sources: Array<{ title: string; href: string; note: LocalizedText }>
}
