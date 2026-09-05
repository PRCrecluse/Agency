import type { LocalizedText } from '@/content/services'

export type GeoServicePlaybook = {
  role: LocalizedText
  inputs: LocalizedText[]
  deliverables: Array<{ title: LocalizedText; content: LocalizedText; acceptance: LocalizedText }>
  example: { title: LocalizedText; note: LocalizedText; fields: Array<{ label: LocalizedText; value: LocalizedText }> }
  qualityChecks: LocalizedText[]
  handoff: LocalizedText
}

export const geoServicePlaybooks: Record<string, GeoServicePlaybook> = {
  'prompt-search': {
    role: {
      en: 'Prompt Search turns market and customer context into the shared research foundation for article production and GEO monitoring. It answers which questions to prioritize, what a useful answer needs, and which page should address each intent.',
      zh: 'Prompt Search 是文章生产与 GEO 监控共用的研究基础。它解决三个问题：先回答哪些问题、一个有用的答案需要什么，以及应该由哪个页面承接这一意图。'
    },
    inputs: [
      {
        en: 'Product positioning, ideal customer profile, priority markets, languages, and the decisions the buyer needs to make.',
        zh: '产品定位、理想客户画像、重点市场与语言，以及客户实际需要作出的决策。'
      },
      {
        en: 'Available customer interviews, sales-call notes, support questions, site-search terms, and search analytics.',
        zh: '可用的客户访谈、销售沟通记录、客服问题、站内搜索词与搜索分析数据。'
      },
      {
        en: 'Priority competitors, relevant existing pages, and someone who can validate the relevance of proposed questions.',
        zh: '重点竞品、已有相关页面，以及能够确认拟定问题是否符合实际需求的负责人。'
      }
    ],
    deliverables: [
      {
        title: { en: 'Prompt library', zh: 'Prompt 研究库' },
        content: {
          en: 'Prompt ID and version; exact wording; research source; buyer stage; task and constraints; language and region; branded or unbranded label; priority and rationale.',
          zh: 'Prompt 编号与版本、完整问题、研究来源、购买阶段、任务与限制条件、语言与地区、品牌／非品牌标签、优先级及理由。'
        },
        acceptance: {
          en: 'Questions can be traced to a source or a labeled hypothesis. Paraphrases remain in the same topic group rather than inflating opportunity counts.',
          zh: '问题能追溯到来源或已标注的假设；同义改写归入同一话题组，避免重复计算机会。'
        }
      },
      {
        title: { en: 'Answer and source review', zh: '答案与来源分析表' },
        content: {
          en: 'Sample date and platform; available mode or model; answer evidence; brand and competitor mentions; cited domains and URLs; missing, inaccurate, or incomplete information.',
          zh: '采样日期与平台、可获取的模式或模型信息、答案证据、品牌与竞品提及、引用域名与 URL，以及缺失、错误或不完整的信息。'
        },
        acceptance: {
          en: 'An analyst can find the observation behind each conclusion. Missing access and unavailable citations are labeled explicitly.',
          zh: '每个判断都能找到对应观察记录，访问失败和引用信息不可获取的情况单独注明。'
        }
      },
      {
        title: { en: 'Prompt-to-page plan', zh: '问题—页面执行计划' },
        content: {
          en: 'Target page or proposed URL; create/update/combine decision; suggested format; evidence requirements; outline; conversion action; owner and priority.',
          zh: '目标页面或拟建 URL、新建／更新／合并决策、建议内容形式、证据要求、大纲、转化动作、负责人及优先级。'
        },
        acceptance: {
          en: 'Each priority group has one primary page owner, a reason to act, and enough detail for a writer to prepare a brief.',
          zh: '每个重点问题组有明确的主要承接页、执行理由，以及足以让写作者形成 Brief 的信息。'
        }
      }
    ],
    example: {
      title: { en: 'A prompt record a writer can act on', zh: '一条能直接交给写作者的 Prompt 记录' },
      note: {
        en: 'Illustrative scenario: a bilingual sales team researching meeting software. This is a proposed research question, not an observed customer query or measured search volume.',
        zh: '示例场景：双语销售团队选择会议工具。这是用于演示的研究假设，不代表已观测的客户提问或实际搜索量。'
      },
      fields: [
        {
          label: { en: 'Research prompt', zh: '研究问题' },
          value: {
            en: 'Which AI meeting assistant should a 20-person sales team use for Chinese-English calls and CRM follow-up?',
            zh: '20 人销售团队开中英文混合会议，还需要把跟进事项同步到 CRM，应该选择什么 AI 会议助手？'
          }
        },
        {
          label: { en: 'Intent and constraints', zh: '意图与限制条件' },
          value: {
            en: 'Commercial evaluation; bilingual calls; CRM compatibility; team access; budget and privacy requirements still need confirmation.',
            zh: '商业评估；双语会议、CRM 兼容性、团队权限；预算与隐私要求需进一步确认。'
          }
        },
        {
          label: { en: 'Questions to validate', zh: '待验证的追问' },
          value: {
            en: 'Which CRM is used? Is mixed-language transcription required in the same call? What counts as a successful follow-up export?',
            zh: '具体使用哪款 CRM？是否需要同场会议混合语言识别？跟进事项同步到什么程度才算满足需求？'
          }
        },
        {
          label: { en: 'Page decision', zh: '页面决策' },
          value: {
            en: 'Improve an existing relevant comparison if one exists; otherwise brief a sales-team evaluation guide. Keep generic product information on the product page.',
            zh: '优先优化已有相关对比页；没有时再新建销售团队选型指南。基础产品介绍仍由产品页承接。'
          }
        },
        {
          label: { en: 'Evidence needed', zh: '所需证据' },
          value: {
            en: 'Product documentation, a reproducible bilingual-call test, supported CRM fields, current plan details, and dated source notes.',
            zh: '产品文档、可复现的双语会议测试、支持的 CRM 字段、当前套餐信息与带日期的来源记录。'
          }
        },
        {
          label: { en: 'Priority and monitoring', zh: '优先级与监控' },
          value: {
            en: 'Prioritize after confirming customer relevance and evidence availability. Freeze the approved wording and version for the monitoring set.',
            zh: '确认客户相关性与证据可获得性后再定优先级。将已确认问题的原文与版本固定，加入监控集合。'
          }
        }
      ]
    },
    qualityChecks: [
      {
        en: 'The question reflects a real decision and can be validated with the client; invented intent is labeled as a hypothesis.',
        zh: '问题对应具体决策，能够与客户核对；推测的需求清楚标注为假设。'
      },
      {
        en: 'Branded discovery and unbranded category questions are analyzed separately.',
        zh: '品牌相关提问与不含品牌的品类问题分别分析。'
      },
      {
        en: 'Each opportunity explains why it is worth pursuing, what evidence is missing, and whether an existing page already covers it.',
        zh: '每个机会说明为什么值得做、还缺什么证据、是否已有页面覆盖。'
      },
      {
        en: 'Source phrases, search keywords, and full user prompts are distinguished in the research record.',
        zh: '在研究记录中区分引用来源的检索短语、搜索关键词与完整用户 Prompt。'
      }
    ],
    handoff: {
      en: 'Article Production receives the approved briefs and evidence needs. GEO Monitoring receives the fixed prompt set and baseline. New discoveries join a new library version so they do not silently change the comparison cohort.',
      zh: '文章生产接收已确认 Brief 与证据要求；GEO 监控接收固定问题集与基线。后续新发现进入新版本问题库，避免在不说明的情况下改变对比样本。'
    }
  },
  'article-production': {
    role: {
      en: 'Article Production turns a researched question into a publishable answer with a clear point of view and verifiable support. The same prompt ID follows the article from brief to approval, published URL, and later monitoring.',
      zh: '文章生产把研究过的问题变成可发布、有明确判断且依据可核对的答案。同一个 Prompt 编号贯穿 Brief、审核、上线 URL 与后续监控，确保每篇文章都知道为什么写、上线后看什么。'
    },
    inputs: [
      {
        en: 'Approved prompt groups and page priorities, or a topic list that we first check for intent and existing coverage.',
        zh: '已确认的问题组与页面优先级；如使用现成选题，先检查意图和站内已有覆盖。'
      },
      {
        en: 'Product documentation, feature and pricing facts, brand voice, available expert interviews, original tests, or approved case material.',
        zh: '产品文档、功能与价格事实、品牌表达规范，以及可用的专家访谈、原创测试或获准使用的案例材料。'
      },
      {
        en: 'A product reviewer, publishing owner, target language, preferred format, and agreed revision and approval arrangements.',
        zh: '产品审核人、发布负责人、目标语言、内容形式，以及约定的修改与确认安排。'
      }
    ],
    deliverables: [
      {
        title: { en: 'Editorial brief and evidence pack', zh: '写作 Brief 与证据包' },
        content: {
          en: 'Primary question and intent; intended reader; proposed title; page format; answer outline; source requirements; internal links; CTA; product facts that need approval.',
          zh: '核心问题与意图、目标读者、拟定标题、页面形式、答案大纲、来源要求、内链、CTA，以及需要确认的产品事实。'
        },
        acceptance: {
          en: 'The brief makes the main decision explicit and identifies the evidence needed before the article is written.',
          zh: 'Brief 清楚说明读者要作什么决策，并在动笔前列出完成回答所需的证据。'
        }
      },
      {
        title: { en: 'Reviewed article and source notes', zh: '审核成稿与来源说明' },
        content: {
          en: 'A complete draft with direct answers, examples, comparison criteria where relevant, limitations, relevant references, and documented review changes.',
          zh: '完整正文，包含直接回答、示例、适用的对比维度、限制条件、相关引用，以及审核修改记录。'
        },
        acceptance: {
          en: 'Facts and comparisons are checked. The article addresses the brief, uses the approved brand voice, and resolves the agreed review comments.',
          zh: '事实与对比已经核查；文章回应 Brief，符合品牌表达要求，并处理约定的审核意见。'
        }
      },
      {
        title: { en: 'Publishing package and URL record', zh: '发布包与上线记录' },
        content: {
          en: 'Title and meta description; suggested slug; heading structure; internal links and anchor text; applicable image captions, alt text, and schema recommendations; final-file version and publishing checklist.',
          zh: '标题与 Meta 描述、建议 URL、标题层级、内链及锚文本、适用的图片说明与替代文本、结构化数据建议、终稿版本与上线检查清单。'
        },
        acceptance: {
          en: 'The publishing owner can implement the approved page without guessing its structure. The published URL and date are returned to the content and monitoring register.',
          zh: '发布负责人能按材料准确上线，无需猜测结构；上线 URL 和日期回填至内容与监控台账。'
        }
      }
    ],
    example: {
      title: { en: 'Inside a GEO article brief', zh: '一份 GEO 文章 Brief 应该具体到什么程度' },
      note: {
        en: 'Illustrative brief for the meeting-software scenario. Product claims require research and testing; this example does not describe a real client deliverable or result.',
        zh: '以下延续会议工具选型的示例场景。产品结论需经研究与测试后填写，不代表真实客户交付或效果。'
      },
      fields: [
        {
          label: { en: 'Reader and decision', zh: '读者与决策' },
          value: {
            en: 'A sales operations lead selecting an assistant for a 20-person bilingual team; the article should help them shortlist and plan a trial.',
            zh: '为 20 人双语销售团队选工具的销售运营负责人；文章要帮助其缩小候选范围并安排试用。'
          }
        },
        {
          label: { en: 'Proposed article', zh: '拟定选题' },
          value: {
            en: 'How to evaluate AI meeting assistants for bilingual sales teams: transcription, CRM handoff, and access controls.',
            zh: '双语销售团队如何选择 AI 会议助手：转写、CRM 跟进与权限评估指南。'
          }
        },
        {
          label: { en: 'Opening answer', zh: '开篇回答' },
          value: {
            en: 'Start the evaluation with a representative call, check mixed-language accuracy and speaker attribution, then verify that the required follow-up fields reach your CRM. Explain how to judge each test before comparing products.',
            zh: '先用有代表性的会议样本检查混合语言转写与说话人识别，再验证所需跟进字段能否进入 CRM。先说明各项测试如何判断，再展开产品比较。'
          }
        },
        {
          label: { en: 'Article structure', zh: '正文结构' },
          value: {
            en: '1. Who the guide fits. 2. Evaluation criteria. 3. Test method and sample. 4. Product comparison with sources. 5. Limits and unsuitable cases. 6. Trial checklist and next step.',
            zh: '1. 适用团队；2. 评估维度；3. 测试方法与样本；4. 附来源的产品对比；5. 限制与不适用情况；6. 试用检查表与下一步。'
          }
        },
        {
          label: { en: 'Evidence requirements', zh: '证据要求' },
          value: {
            en: 'Document the test date, language mix, sample length, and scoring approach. Cite current product docs for CRM support and plan limits. Separate tested findings from vendor-stated capabilities.',
            zh: '记录测试日期、语言比例、样本长度与评估方式；CRM 支持及套餐限制引用当前产品文档；区分实测结果与厂商陈述。'
          }
        },
        {
          label: { en: 'Comparison rules', zh: '对比规则' },
          value: {
            en: 'Use the same criteria and test conditions across products. Mark untested capabilities and unavailable data. Date pricing references and specify billing terms.',
            zh: '各产品采用相同维度与测试条件；未实测能力和缺失数据单独标明；价格注明核对日期与计费条件。'
          }
        },
        {
          label: { en: 'Links and next action', zh: '内链与下一步' },
          value: {
            en: 'Link to the relevant integration documentation, security information, and product trial page. Match the CTA to evaluation rather than interrupting the answer.',
            zh: '链接到相关集成文档、安全说明和产品试用页，让 CTA 服务于选型任务，并保留完整回答。'
          }
        },
        {
          label: { en: 'After publishing', zh: '上线后检查' },
          value: {
            en: 'Record the approved URL and prompt IDs. Recheck brand descriptions, visible citations, and identifiable referral behavior during the next agreed monitoring cycle.',
            zh: '记录确认后的 URL 与 Prompt 编号，在下一约定监控周期复核品牌描述、可见引用与可识别的来源访问行为。'
          }
        }
      ]
    },
    qualityChecks: [
      {
        en: 'Answer quality: the main question is answered early, key constraints are addressed, and important terms are defined in context.',
        zh: '回答质量：尽早回应核心问题，覆盖关键限制条件，并在语境中解释必要术语。'
      },
      {
        en: 'Evidence quality: numerical claims, pricing, feature support, and comparisons have dated, traceable support.',
        zh: '证据质量：数字、价格、功能支持与对比结论具有带日期、可追溯的依据。'
      },
      {
        en: 'Original value: the page adds a useful test, example, decision framework, or expert explanation suited to the brief.',
        zh: '独有价值：根据 Brief 提供有用的测试、示例、决策框架或专业解释。'
      },
      {
        en: 'Editorial quality: titles describe the sections, repetition is removed, and each table or list helps a real decision.',
        zh: '编辑质量：标题准确概括内容，删除重复表达，表格和列表都服务于实际判断。'
      },
      {
        en: 'Brand accuracy: a reviewer confirms product statements, positioning, and unsuitable use cases before publication.',
        zh: '品牌准确性：发布前由审核人确认产品陈述、定位与不适用场景。'
      },
      {
        en: 'Publishing quality: the final page preserves source links, readable text, metadata, internal links, and agreed conversion actions.',
        zh: '发布质量：上线页面保留来源链接、可读正文、页面元信息、内链与约定转化动作。'
      }
    ],
    handoff: {
      en: 'We own briefs, drafting, editorial review, and the agreed final publishing package. The client validates product facts and approves and publishes the content. GEO Monitoring receives the live URLs, related prompts, and change dates so future revisions respond to evidence.',
      zh: '我们负责 Brief、撰写、编辑审核和约定的终稿发布包；客户负责确认产品事实、审核与上线。GEO 监控接收实际 URL、对应问题与变更日期，让后续修改有观察依据。'
    }
  },
  'geo-monitoring': {
    role: {
      en: 'GEO Monitoring closes the loop between a researched question and the content created to answer it. It tracks a defined sample, preserves the supporting observations, and turns changes into a practical queue for research, editorial, and technical owners.',
      zh: 'GEO 监控将前期问题研究与已经上线的内容连接起来。我们跟踪约定样本、保留支撑记录，并把变化转成研究、内容和技术负责人的执行清单。'
    },
    inputs: [
      {
        en: 'An approved prompt library with versions, brand aliases, competitors, target languages, and regions.',
        zh: '带版本的问题库、品牌别名、竞品、目标语言与地区。'
      },
      {
        en: 'The platform and search-mode scope, sampling schedule, repeated-check rules, and access conditions.',
        zh: '平台与搜索模式范围、采样排期、重复检测规则和访问条件。'
      },
      {
        en: 'Published page URLs, content change dates, and access to relevant analytics or platform reports where available.',
        zh: '已上线页面 URL、内容修改日期，以及可用的网站分析或平台报告权限。'
      }
    ],
    deliverables: [
      {
        title: { en: 'Monitoring plan and data dictionary', zh: '监控计划与指标字典' },
        content: {
          en: 'Prompt version; sample cohort; platform and mode; repeat frequency; time and language context; inclusion rules; brand matching and metric denominators.',
          zh: '问题版本、样本集合、平台与模式、重复频率、时间与语言条件、有效样本规则、品牌匹配方式和指标分母。'
        },
        acceptance: {
          en: 'Two analysts can apply the same definitions. A prompt or platform change is versioned before comparing periods.',
          zh: '不同分析者能按相同定义处理数据；问题或平台范围变化会先记录版本，再进行跨期比较。'
        }
      },
      {
        title: { en: 'Observation and citation register', zh: '答案与引用记录台账' },
        content: {
          en: 'Attempt status, valid answer text or evidence, timestamps, brand and competitor mentions, observable source URLs, and notes on incomplete or unavailable fields.',
          zh: '检测状态、有效答案文本或证据、时间、品牌与竞品提及、可观察的来源 URL，以及字段缺失或不可获取的说明。'
        },
        acceptance: {
          en: 'A failed check is not treated as brand absence. Repeated sources within an answer follow the same documented counting rule.',
          zh: '检测失败不记作品牌未出现；同一回答中的重复来源按一致、已说明的规则计数。'
        }
      },
      {
        title: { en: 'Monthly review and action queue', zh: '月度复盘与动作清单' },
        content: {
          en: 'Comparable trends by prompt group and platform; lost or gained citations; product inaccuracies; linked evidence; content and technical actions; owners and follow-up dates.',
          zh: '按问题组和平台呈现的可比趋势、引用新增与流失、产品描述错误、对应证据、内容与技术动作、负责人及回查日期。'
        },
        acceptance: {
          en: 'Each recommendation names the observation, affected page or prompt, proposed change, and the condition to check next.',
          zh: '每条建议说明观察结果、对应页面或问题、拟定改动，以及下次需要验证的条件。'
        }
      }
    ],
    example: {
      title: { en: 'How we interpret a monitoring sample', zh: '一次监控采样，我们如何读数和安排下一步' },
      note: {
        en: 'Synthetic example for one platform and one unchanged prompt cohort. These numbers illustrate the calculation only and are not client performance or a forecast.',
        zh: '以下为同一平台、同一版本问题集的模拟样本。数字仅用于说明计算方式，不代表客户效果或效果预测。'
      },
      fields: [
        {
          label: { en: 'Sample status', zh: '样本状态' },
          value: {
            en: '14 attempts: 12 valid answers and 2 failed requests. Citation status is observable for all 12 valid answers.',
            zh: '14 次尝试中，12 次返回有效回答，2 次请求失败；12 条有效回答的引用状态均可观察。'
          }
        },
        {
          label: { en: 'Brand mentions', zh: '品牌提及' },
          value: {
            en: '6 of the 12 valid answers mention the brand: 6 ÷ 12 = 50%. Failed requests do not enter this denominator.',
            zh: '12 条有效回答中，6 条提及品牌：6 ÷ 12 = 50%。请求失败不计入该分母。'
          }
        },
        {
          label: { en: 'Owned-page citations', zh: '官网引用' },
          value: {
            en: '3 answers cite an owned URL: 3 ÷ 12 = 25%. Each answer counts once for this rate even if it cites multiple owned URLs.',
            zh: '3 条回答引用官网 URL：3 ÷ 12 = 25%。即便一条回答引用多个官网 URL，这项比例中仍按一条回答计数。'
          }
        },
        {
          label: { en: 'What we inspect', zh: '进一步检查' },
          value: {
            en: 'Review the exact cited pages, the uncited question groups, the competitor sources, and whether the product is described accurately.',
            zh: '回到具体引用页、未获得引用的问题组、竞品来源和产品描述准确性，判断缺口在哪里。'
          }
        },
        {
          label: { en: 'Action decision', zh: '动作决策' },
          value: {
            en: 'If answers misstate CRM support, verify the claim and improve the integration documentation. If the page is inaccessible, route an access issue before rewriting content.',
            zh: '若答案错误描述 CRM 支持情况，先核实事实再补充集成文档；若页面无法访问，优先处理访问问题。'
          }
        },
        {
          label: { en: 'Interpretation limit', zh: '如何解释结果' },
          value: {
            en: 'This is a small sample, not market share. Repeat the agreed checks and compare the same cohort before describing a trend; annotate any platform or content changes.',
            zh: '这是小样本观察，不是市场份额。按约定重复检测，在相同问题集合中对比，再描述趋势，并标注平台或内容变更。'
          }
        }
      ]
    },
    qualityChecks: [
      {
        en: 'Record the exact prompt and available platform conditions so later comparisons have a meaningful basis.',
        zh: '保留完整问题与可获取的平台条件，让后续比较有明确依据。'
      },
      {
        en: 'Separate mentions, visible citations, platform-level aggregates, referral visits, and conversion events.',
        zh: '分别呈现品牌提及、可见引用、平台汇总数据、来源访问和转化事件。'
      },
      {
        en: 'Report valid sample size, failed checks, changed prompts, and unavailable fields alongside the rates.',
        zh: '在比例旁说明有效样本量、失败检测、问题变更与不可获取字段。'
      },
      {
        en: 'Recheck unusual changes, inspect the underlying evidence, and record possible causes as hypotheses.',
        zh: '对异常变化重复检查、回看证据，并将可能原因记录为待验证假设。'
      }
    ],
    handoff: {
      en: 'Research receives newly discovered questions and competitor sources; writers receive page-specific gaps and inaccurate claims; technical owners receive access issues. The next report revisits the completed changes using the agreed prompt cohort.',
      zh: '新发现的问题与竞品来源回到研究；具体页面缺口与错误陈述交给内容团队；访问问题交给技术负责人。下一轮报告按约定问题集合回查已完成改动。'
    }
  }
}
