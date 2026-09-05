# Meridian Earned GEO 执行规划

日期：2026-09-05。范围：基于指定 X 文章、Meridian 线上首页与 GEO 服务页、当前仓库内容制定方案。本次仅完成规划；没有修改官网、联系客户或发布外部内容。

建议以 90 天试点验证：让第三方在「AI / B2B SaaS 团队选择增长服务商」的具体场景中提名 Meridian，再由官网案例、交付说明和采购问答支持后续决策。

2026-09-05 修订：结合项目保存的美国 SEO API 数据与新核验的 Reddit 采购讨论，核心入口调整为 SaaS SEO 服务商、AI 搜索优化服务、Reddit 营销外包。中文创始人与语言协作暂列为待验证画像。详细数据与限制见 [核心采购意图验证](../research/earned-geo-intent-validation/intent-validation.md)。本轮复用 8 月 API 响应，没有发起新的已认证 API 查询。

实际客源、客户授权、可公开案例、团队产能及现有 AI 可见度尚待业务资料确认；下文数量是内部工作目标，不是排名、引用或营收承诺。

## 1. 原文对我们的实际含义

[原文：不同阶段的 AEO，玩法完全不一样](https://x.com/Yiwei_growth/status/2095728851720765524?s=20) 将第三方提名与官网回答连续追问联系起来。对 Meridian 而言，需要从产品功能问题转换成服务采购问题：谁适合我们的行业、谁能执行、谁有可验证结果、费用与责任如何划分。

执行时采用更明确的统计口径：

| 内容 | 本计划中的归类 | 是否算独立第三方推荐 |
| --- | --- | --- |
| 官网文章、案例、研究 | Owned，作为证据原件 | 否 |
| Yiwei / 团队自己发 X、YouTube、Reddit 回答 | 自有或团队控制的站外分发 | 否 |
| 客户自行评价、独立专家评估、编辑自主纳入推荐 | Earned | 是，标注客户或合作关系 |
| 付费榜单、赞助访谈、激励评价 | Paid / 激励内容，单列披露 | 不纳入独立 Earned 指标 |
| 同一篇新闻稿的多站转载 | 同一原始来源的传播 | 不按多个独立背书累计 |

自有视频仍然值得做；它能提供可检索的解释和证据，但独立性不能由平台域名决定。第三方提名可以不带链接；官网外链、AI 答案引用和 AI 推荐也分别记录。

## 2. 现状与优先缺口

已核验的基础：

- [首页](https://withmeridian.org/) 已围绕 SaaS / AI 企业提供 SEO、Reddit 与 GEO 服务。
- [GEO 服务页](https://withmeridian.org/services/geo-services) 有基线诊断、内容、社区、视频和技术检查的交付说明，但突出的是每月文章、评论、视频数量。
- 仓库已有 GEO 方法论、细分服务页，以及 Earned / Owned AEO、AI 引用、竞品选择等中英文内容。
- 团队介绍包含创始人产品经历、专家履历和 LinkLoud 访谈故事。这些是后续证据采集与合作的线索，不能直接视为客户推荐或第三方发布。
- 已有 DataFast 预约按钮点击和 UTM 透传实现。现有项目文档明确：预约成功、取消等生命周期仍需另外接入，因此不能把点击直接当作预约成功。

优先处理的信任缺口：

1. 首页多条 testimonial 描述 UI kit、仪表盘、CRM 等，与 Meridian 服务不对应；对应数据未给出来源链接。逐条核实服务关系、原文和展示授权，无法核实的建议移除或替换。
2. Sly 的评价明确针对 Volumn.ai。若保留，应说明这是团队产品的用户反馈，不应成为 Meridian GEO 服务效果的证明。
3. 首页「4.5 Stars out of 5」为组件中的固定文案；应补充真实平台、样本数、统计日期，无法提供依据时建议移除。
4. About、社交账号和结构化数据涉及 Meridian、Yiwei、GoGlobal.to。梳理公司、创始人与产品之间的真实关系；分别建模和说明，避免把产品、个人账号默认视为同一个公司实体。
5. 当前审阅的页面和仓库中，未见与优先采购场景一一对应的完整客户案例链。需盘点现有证据，不能直接认定团队没有案例。

相关本地依据：`src/assets/data/testimonials.tsx`、`src/components/blocks/testimonials/testimonials.tsx`、`src/lib/seo.ts`、`src/content/about.ts`、`src/content/services.ts`、`docs/booking-attribution.md`。

## 3. 根据需求证据选择三个采购入口

对外描述草案：**Meridian provides SEO, AI search optimization, and Reddit marketing for SaaS and AI companies.**

下表搜索量为此前 RapidAPI `/keyword-metrics` 返回的美国月度估计；SEO 数据研究日期为 2026-08-22，Reddit 数据为 2026-08-25。不同关键词不能相加；其数值不是 AI 提问量。本轮在浏览器核验 7 条采购相关 Reddit 主帖，但没有完成全网声量测量。

| 优先级 | 核心采购意图 | 搜索需求证据 | 社交采购证据 | Earned 目标与官网承接 |
| --- | --- | --- | --- | --- |
| P1 首先推进 | 为 SaaS 找能执行、改善自然获客的 SEO 服务商 | `saas seo agency` 3,600；`b2b seo agency` 4,200 | 两条主帖明确提到 SaaS、执行带宽或自然获客停滞，共 79 条评论 | SaaS SEO 采购指南、客户合作复盘 → `/services/seo-services` |
| P1 验证性推进 | 选择能提升 AI 搜索可见度的服务商，判断如何与现有 SEO 协作 | `ai seo agency` 3,600；`ai seo services` 4,500；准确的 GEO/AEO agency 词待补查 | 两条主帖直接问已有 SEO 如何增加 GEO，共 35 条评论 | AI 搜索服务商评估、SEO/GEO 合作体验 → `/services/geo-services` |
| P2 小规模推进 | 外包 Reddit 营销，寻找可靠的自然运营或产品发布支持 | `reddit marketing agency` 300；`reddit marketing services` 200 | 三条主帖涉及询价、外包互动和合作失误，共 77 条评论；并非全部是 SaaS | Reddit agency 选型、运营客户评价 → `/services/reddit-services` |

每条讨论只归一个主意图。评论数包含机器人、同行和自推，不能当作客户人数；这组定向样本不能用于比较全网需求大小。API 中 `ai seo` 有「用 AI 做 SEO」与「优化 AI 搜索」双重含义，服务页和后续研究要明确区分。

需要从原规划中调整的部分：

- 「中文创始人寻找英语市场团队」降为待验证画像，缺少中文关键词数据和足量买家讨论。
- 「SEO + GEO 一起做」有真实采购讨论，但先作为协作选择与 FAQ；组合搜索量和独立页面需求尚未验证。
- 「技术 SEO」「社区管理」作为能力与服务范围。`reddit community management` 为 20，`reddit saas marketing` 为 10，不以更窄的自创组合替代主采购类别。
- 方法、交付、价格和可信度是采购判断条件，分别放入三个入口的案例、比较内容和 FAQ。
- 带 SaaS / GEO 限定的 best agencies 选型问法可以进入本轮测试；泛 best SEO agency 降优先。能否竞争和需求是否存在分别判断。
- `geo services` 存在地理/岩土工程歧义，剔除其 700 搜索量作为 GEO 营销需求的依据。

先使用已有三个服务入口。若要新增独立页面，需进一步验证同市场 SERP 结果重叠、采购任务和证据差异；本轮没有把这些检查宣称为已完成。

## 4. 外部来源如何选择

先做「问题 → AI 答案 → 引用 URL → 发布者 → 证据缺口 → 接触方式」来源表。搜索结果只用于发现机会；只有在保存的 AI 答案里出现过的 URL，才标记为已观察引用来源。

对每条机会按 0–2 分评估：目标买家相关性、在本次样本中的引用频率、编辑独立性、证据匹配度、可接触性。优先处理高相关、高匹配的来源，不以网站权重或购买价格单独排序。

| 顺序 | 来源与动作 | 首月内部工作目标 | 对外材料 |
| --- | --- | --- | --- |
| 1 | 真实客户：独立评价、客户官网合作案例、客户发起的项目复盘 | 盘点 5 个对象；准备 2 个案例包；争取 2–3 条客户自主评价 | 项目背景、实际服务、前后指标、统计口径、局限 |
| 2 | 已有合作方、出海社区与垂直专家：案例访谈或公开拆解 | 6 个高匹配对象，争取 1 次合作 | 可复核的方法与数据、明确的专业观点 |
| 3 | 服务商目录与采购指南：核验适合的类别并完善真实资料 | 优先核验 Clutch，再筛 1 个补充渠道；首月争取完成 1 个资料页 | 品牌事实、服务范围、实际预算门槛、客户验证材料 |
| 4 | 独立榜单、测评、工具生态博客：提供对其读者有帮助的新案例或数据 | 从来源图谱筛 10 个作者，准备逐一匹配的材料 | 对应细分场景的案例，不群发通稿 |
| 5 | Reddit / 垂直论坛：以公开身份回答采购与执行问题 | 选 2 个合适社区，完成 8–12 次有内容的参与 | 原创步骤、数据、适用边界；能在平台内回答就先完整回答 |
| 6 | YouTube / 播客：自有内容演示方法，第三方节目做独立讨论 | 2 条自有演示；另争取 1 次第三方访谈 | 准确字幕、章节、文字摘要、相关证据页 |

以上发布、回复或联系均属于后续执行动作；本方案未替用户发送任何消息。

当前可核验的来源线索：

- [Clutch GEO 服务商目录](https://clutch.co/seo-firms/generative-engine-optimization) 已有相关类别，并展示客户评价和服务商信息。需另行核验 Meridian 的入驻要求与费用。目录本身提示部分展示位可能收费，不能把付费位置当作编辑推荐。
- [Obility 的 B2B Reddit agency 文章](https://www.obilityb2b.com/blog/best-b2b-reddit-marketing-agencies/) 和 [LoudFace 的 B2B SaaS GEO agency 文章](https://www.loudface.co/blog/best-geo-agencies-b2b-saas-2026) 在本次搜索结果中出现，可用于研究场景和竞品。两者由服务商发布，存在商业立场，不预设为独立媒体，也未验证它们被目标 AI 问题引用或接受收录。
- 仓库中记录的 LinkLoud 访谈关系可以作为候选合作线索；需核对是否有对方平台公开内容，以及是否适合讨论 Meridian 的真实服务案例。

以 SaaS / 增长垂直作者为先。维基百科和泛新闻通稿不进入首轮计划；软件测评目录也不应在不合适的品类里登记 agency。

## 5. 让别人有理由引用：三个证据包

### A. 两个真实客户案例

优先选一个 SEO / GEO 项目和一个 Reddit / 社区项目。每个案例包括：

- 客户、行业、阶段、服务日期、公开范围与授权状态。
- 原始问题、基线、实施内容、由谁完成。
- 结果指标的分子、分母、时间窗、数据来源；无数据的字段明确缺失。
- 同期其他营销活动与归因限制，避免把所有增长归到 Meridian。
- 客户原话及原始来源；请客户自主评价，不代写未经确认的推荐。
- 官网案例页，以及客户或合作方独立发布的对应内容。

若暂时没有可公开客户结果，先发布交付样例与 Meridian 自身实验，明确标记「样例」或「自有项目」。这些能支持方法展示，不能替代客户效果证明。

### B. 一份可复核的小型原创研究

建议题目：**AI 如何推荐 SaaS 增长服务商：一组固定采购问题的来源分析**。

研究范围即下文 20 个发现型问题；记录平台、可见模型/模式、搜索是否开启、日期、语言、地区/访问条件、完整答案、品牌和引用 URL。发布样本与方法，允许读者复核。

输出可讨论的结论，例如「本次样本反复出现的来源类型」「预算、案例追问导致哪些推荐变化」。明确这是有限问题集的观察，不能代表所有用户，也不能证明某个平台权重或外部发文导致推荐增长。

### C. 一套采购核验材料

在现有服务页补充：适用与不适用客户、最小合作范围、费用口径或询价规则、首月交付样例、后续执行责任、客户需要提供什么、效果怎么评估。

现有 GEO 页明确技术实施与开发不包含在该服务内，案例或外部介绍必须保持同样边界。建议同时展示「内容数量」与「已覆盖采购问题、证据来源、有效线索」；不把发布数量等同于结果。

## 6. 首轮 30 条问题库

20 条发现型问题用于非品牌可见度衡量：SaaS SEO 8 条、AI 搜索采购 6 条、Reddit 外包 6 条。它们是依据观察到的需求改写的测试问句，不是 API 实测的完整句子或真实用户日志。词簇有需求不代表每个细分修饰词已验证。中文协作另设探索组，暂不混入主基线。

1. Which SaaS SEO agencies should I consider?
2. Which B2B SEO agencies work with SaaS companies?
3. Which SaaS SEO consultants are worth considering?
4. Which agencies can help a SaaS company whose organic growth has stalled?
5. Which SaaS SEO agencies can take over execution from an internal team?
6. Which SaaS SEO agencies have verifiable client case studies?
7. Which SaaS SEO agencies are suitable when our team lacks execution bandwidth?
8. Which SaaS SEO agencies focus on qualified leads and demos?
9. Which agencies help brands become visible in AI search?
10. Which generative engine optimization agencies should I consider?
11. Which AEO agencies work with SaaS companies?
12. We already have an SEO agency but little AI-search visibility. Which providers should we evaluate?
13. Which agencies can manage SEO and GEO together?
14. Which AI SEO agencies explain how they measure citations and qualified leads?
15. Which Reddit marketing agencies should I consider?
16. Which providers can manage organic Reddit interactions for a small business?
17. Which agencies offer Reddit marketing services beyond paid ads?
18. Which agencies can support a product launch on Reddit?
19. Which Reddit marketing agencies can demonstrate responsible community participation?
20. Which Reddit marketing providers offer transparent scope and reporting?

六条后续追问，用于测试真实筛选路径；在保留原始对话的条件下增加约束，不主动提示加入 Meridian：

21. Which of those agencies have verifiable SaaS client case studies?
22. What exactly does each service include and exclude?
23. Which explain who implements the technical changes?
24. What are their minimum engagement, fees, and first-month deliverables?
25. Which can measure qualified leads rather than only content output?
26. Under what conditions would each agency be a poor fit?

四条品牌事实诊断独立记录，不纳入非品牌推荐率：

27. What does Meridian at withmeridian.org do, and who is it for?
28. How are Meridian, Yiwei, GoGlobal.to, and Volumn.ai related?
29. What is included and excluded in Meridian's GEO service?
30. What independently verifiable evidence supports choosing Meridian?

发现型问题各使用新对话。明确域名只能用于 27–30 的实体诊断，不能塞进前 20 条问题让品牌「被发现」。

## 7. 节奏、资源与决策点

建议先分配每周约 15–20 小时：负责人 3–4 小时负责证据确认和专业输入，增长运营 8–10 小时负责来源与合作，内容/设计/网站支持 4–6 小时负责材料与承接。若只有一个人每周 5 小时，缩为一个场景、一个案例、一个外部渠道，并降低检测频率。

| 阶段 | 工作与可控交付 | 观察结果与下一步 |
| --- | --- | --- |
| 第 1–2 周 | 核验评价与评分；品牌事实表；20 条问题基线；30 条来源机会；5 个客户候选；2 个案例提纲 | 确定最适合的 2 个场景和 10 个外部对象 |
| 第 3–4 周 | 完成 2 个证据包；准备 10 份定向合作材料；核验 1 个目录；2 条演示；8–12 次社区参与 | 争取首批 2–3 条客户评价与 1 次外部讨论；未获得时记录阻力，不计为完成 |
| 第 2 月 | 发布小型研究；围绕有反馈的场景继续合作；补齐服务采购问答；完整复测 | 观察是否形成来自不同发布者的有效提名，是否有目标客户访问和咨询 |
| 第 3 月 | 复测、纠正事实错误、更新案例；扩大有效渠道 | 争取累计 5–8 个不同发布者的有效提名；依据样本与合格线索决定扩大或调整 |

软件成本先用现有分析系统和手工台账控制；有稳定问题库与复测需求后再评估付费监测。费用、赞助合作与目录升级需单独核价，付费展示计入 Paid。

## 8. 衡量方法与台账

基线及月度完整检查：20 个发现问题 × 3 个选定搜索型 AI 产品/模式 × 3 次独立运行，共 180 条初始回答。建议先选 ChatGPT Search、Perplexity、Gemini 中可用的联网模式；逐一记录实际模式，不把 API 结果与消费端结果混为一组。语言分别报告，运行跨两个日期分配以观察波动。

每周精简复测：固定 6 个重点发现问题 × 3 个平台 × 2 次运行，共 36 条初始回答。对其中预先固定的 3 个问题，继续问「客户案例」和「实施责任」两层追问；无论 Meridian 是否出现都保留结果。只在首轮已入围的样本中计算留存率，首轮全未入围时记为不适用。

| 指标 | 口径 |
| --- | --- |
| 非品牌入围率 | 发现型有效回答中明确将 Meridian 列为候选的回答数 / 发现型有效回答数；负面提及不算入围 |
| 后续留存率 | 预定追问链最后仍保留 Meridian 的数量 / 同一批追问链初始已入围数量 |
| 官网引用率 | 明确引用 withmeridian.org 的有效回答数 / 有效回答数 |
| 第三方证据引用 | 引用提及 Meridian 的第三方 URL 的回答数；与官网引用分列 |
| 有效 Earned 提名 | 独立发布者对适用场景作出可核验评价或推荐；按发布者去重，注明客户/合作关系 |
| 描述准确性 | 与品牌事实表对照后正确、错误、未知的条目；重点看服务主体、范围和结果 |
| 业务结果 | 实际预约成功、合格咨询、商机与成交；按钮点击只作为过程指标 |

请求失败、无有效答案记录为失败，不当作零提及；报告分母与失败数，不挑选好看的回答。总体趋势受问题样本、检索更新和模型变化影响，外部发文后提升只能先视为相关观察。

现有 UTM / DataFast 基础可以延用。合作链接优先指向对应证据或服务页，再引导预约。补充 Cal.com 完成预约记录与销售端的「最早从哪里了解到我们」字段，记录 AI 平台或第三方来源；UTM 无法覆盖用户看完 AI 后直接搜索品牌的情况。

台账最少包含：问题 ID、场景、平台与模式、日期、语言、完整回答、是否入围、推荐理由、引用 URL、发布者、来源独立性、是否付费、官网承接页、证据缺口、负责人、下一步、发布状态、预约/商机。

第 30 天先判断证据能否获得真实回应；第 60 天判断推荐语境和可见度是否稳定改善；第 90 天结合合格线索决定是否扩展。暂不承诺固定 AI 推荐率或获客量，首轮基线完成后再设业务阈值。

## 9. 本周最先做的五件事

1. 逐条处理 testimonial、固定评分和品牌关系说明，建立有出处的品牌事实表。
2. 从上述问题中选 6 条，完成第一次来源采样，找出最值得进入的真实页面与讨论。
3. 盘点 5 个真实客户，挑出能清楚证明服务效果的 2 个，整理证据和公开边界。
4. 准备「案例页 + 外部合作简介 + 演示视频提纲」各一份，围绕同一个采购问题。
5. 以 10 个高匹配合作对象为首批名单，先准备好定向材料，再进入外联执行。

## 10. 参考与证据边界

- [Yiwei 原文](https://x.com/Yiwei_growth/status/2095728851720765524?s=20)：本方案的 Earned / Owned 决策链来源；具体优先级、产能与 90 天安排是针对 Meridian 的规划建议。
- [Meridian 首页](https://withmeridian.org/) 与 [GEO 服务页](https://withmeridian.org/services/geo-services)：2026-09-05 通过浏览器读取线上内容；仓库内未上线的变化不视为线上能力。
- [Clutch GEO 目录](https://clutch.co/seo-firms/generative-engine-optimization)：确认服务商目录存在及其评价、付费展示说明；没有确认 Meridian 已入驻或此页被我们的目标 AI 问题引用。
- [Ahrefs：75,000 品牌的 AI 可见度相关性研究](https://ahrefs.com/blog/ai-brand-visibility-correlations/)：研究观察到品牌和 YouTube 提及与 AI 可见度相关；不能据此推断发视频必然产生 AI 推荐。
- [Ahrefs：品牌提及与引用链接的研究](https://ahrefs.com/blog/ai-citations-vs-impressions-study/)：单品牌研究显示提及与链接并不等同，支持分别衡量；其具体比例不套用到 Meridian。
- [Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)：Google 明确其 AI 搜索功能沿用 SEO 基本要求，无额外特殊优化要求，满足要求也不保证展示；此说明不外推为所有 AI 平台的统一规则。

当前没有读取生产分析后台、客户 CRM 或系统运行目标问题集，因此本方案不是已经完成的 AI 可见度审计，也未给出无数据支撑的市场占有率、引用基线或渠道回报预测。
