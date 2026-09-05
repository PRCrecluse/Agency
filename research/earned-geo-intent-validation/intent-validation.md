# Meridian 核心采购意图验证

复核日期：2026-09-05。结论：先围绕 **SaaS SEO 服务商选择、AI 搜索优化服务采购、Reddit 营销外包** 三个入口做 Earned GEO。原规划中的中文协作、技术深度和 SEO + GEO 组合交付分别作为客户筛选条件、能力证据和采购追问处理，不能都列成独立且已验证的市场需求。

本轮验证了可观察的采购表达，尚未测得全网声量、真实成交规模或用户在 AI 内的提问次数。

## 数据范围

- **SEO API**：复核项目保存的 211 条原始响应，从中选取 27 个相关关键词。来源为 RapidAPI 上 APIverse 提供的 `SEO API - DR, RD, Rank, Keywords, Backlinks`，端点 `/keyword-metrics`，国家 `us`。两份研究报告分别标记 2026-08-22、2026-08-25；原始响应没有底层数据更新日期。
- **调用状态**：本轮未发起新的已认证 SEO API 请求。运行环境和项目 `.env.local` 都没有 `RAPIDAPI_KEY`，RapidAPI 浏览器会话未登录。已向用户提出配置问题。已有响应不是本次新采集结果，也不是 Ahrefs 官方 API 或 Google 第一方数据。
- **社交讨论**：通过定向检索发现候选，逐篇审阅正文，并在浏览器核验 7 条相关 Reddit 主帖的时间、净分和评论数。7 条来自不同作者，发布日期在 2026-03-05 至 2026-09-05 范围内。计数时每条主帖只归入一个主意图。
- **覆盖限制**：这是目的性样本，不是随机抽样或全量监听。X 的站内搜索要求登录；网页搜索没有提供足够可复核的 X / 小红书买家样本，因此没有给这些平台编造声量数字。Reddit 作者的商业身份和交易真实性未核实。
- **SERP**：使用实时网页搜索观察结果页面类型，并查阅服务商与讨论原页。它用于确认语义和歧义，不是固定地区 Google 前十排名报告，也未完成两两 SERP 重叠率测试。

API 说明：[产品与端点文档](https://rapidapi.com/apiverse1-apiverse-default/api/seo-api-dr-rd-rank-keywords-backlinks1)。原始文件为 `research/seo-keyword-research/raw_keyword_metrics_us.json` 与 `research/reddit-seo-keyword-research/raw_keyword_metrics_us.json`；本轮选取结果见 [keyword-evidence.json](./keyword-evidence.json)。

## 1. 搜索需求：商业词与能力词分开

下表为 API 返回的美国月搜索量估计，CPC 沿用已有报告的美元口径。不要将相近词相加，也不要把 Google 搜索需求直接换算成 AI 提问量。

| 关键词 | 月搜索量 | CPC | 对意图的解释 |
| --- | ---: | ---: | --- |
| b2b seo =======agency | 4,200 | $17 | B2B 服务商采购；范围大于 SaaS |
| saas seo agency | 3,600 | $9 | SaaS 服务商采购，最直接匹配官网 |
| saas seo consultant | 900 | $25 | 顾问合作模式，可由服务页说明 |
| ai seo agency | 3,600 | $9 | 商业入口，但兼含「用 AI 做 SEO」与「优化 AI 搜索」 |
| ai seo services | 4,500 | $1.1 | 服务采购，同样要澄清 AI SEO 含义 |
| generative engine optimization | 8,000 | $11 | 混合概念学习、方法、工具和采购，不能全算服务商需求 |
| answer engine optimization | 5,000 | $6 | 同上，缺少 agency / services 限定 |
| ai search visibility | 1,400 | $12 | 可能寻找工具、方法或服务，不是纯 agency 词 |
| reddit marketing agency | 300 | $3 | Reddit 营销服务商采购，覆盖自然运营与广告代理 |
| reddit marketing services | 200 | $6 | 明确服务意图，但需要说明交付范围 |
| reddit seo | 1,300 | $10 | 混合教程、搜索排名、社区内容与服务需求 |
| reddit community management | 20 | 未返回 | 有具体外包需求，但词面需求小；先作服务模块 |
| reddit saas marketing | 10 | 未返回 | 不足以验证「SaaS + Reddit」是独立的大入口 |
| reddit growth service | 0 | 未返回 | 仅表示供应商此词返回 0，不能证明无人有该需求 |
| technical seo services | 11,000 | $4.5 | 有服务需求，但覆盖行业广；此次社交采购样本对 SaaS 专属场景支持有限 |
| programmatic seo agency | 200 | $10 | 细分能力型采购，可保留为次级入口 |

`geo agency`、`generative engine optimization agency`、`aeo agency`、`best saas seo agencies`、组合交付词和中文词等 15 个缺失查询已列入 `keyword-evidence.json` 的 `pending_keywords`，当前值是缺失，不是零。

数据质量注意：旧响应中 `seo agency` 的 KD 为 1，且多个有较高搜索量的词 `clicks` 为 0。这些字段存在解释或完整性问题，本轮不拿 KD、clicks 或 trafficPotential 决定优先级，也不沿用旧报告的加总流量潜力排序。

## 2. 社交讨论：核验了什么

以下指标采集于 2026-09-05。净分是 Reddit score，不是点赞总量；评论数包含机器人和服务商回复，不等于潜在客户人数。

| ID | 日期 | 主帖与采购表达 | 净分 | 评论数 | 主意图 |
| --- | --- | --- | ---: | ---: | --- |
| S01 | 2026-04-27 | [寻找 SaaS SEO agency，偏好北美和内部交付](https://www.reddit.com/r/GrowthHacking/comments/1swp4d3/looking_for_a_good_saas_seo_agency_reccos/) | 6 | 37 | SaaS SEO 服务商 |
| S02 | 2026-03-30 | [SaaS 自然获客停滞，是否应聘请 SEO agency](https://www.reddit.com/r/localseo/comments/1s814gs/should_i_go_with_an_seo_agency/) | 7 | 42 | SaaS SEO 服务商 |
| G01 | 2026-03-28 | [已有 SEO agency，是否另聘 SaaS AEO/GEO agency](https://www.reddit.com/r/SaaS/comments/1s5wf8q/should_i_hire_a_saas_aeogeo_agency_if_i_am/) | 6 | 18 | AI 搜索优化采购 |
| G02 | 2026-08-27 | [B2B SaaS 同时运行 SEO 和 GEO，寻求合作体验](https://www.reddit.com/r/DigitalMarketing/comments/1vznh8c/geo_agency_reviews_from_anyone_running_it/) | 4 | 17 | AI 搜索优化采购 |
| R01 | 2026-06-20 | [找可靠 Reddit agency，已经询价并收到 $3k 报价](https://www.reddit.com/r/digital_marketing/comments/1ub4612/i_need_a_legitimate_reddit_marketing_agency/) | 18 | 37 | Reddit 营销外包 |
| R02 | 2026-06-22 | [想外包品牌账号互动，之前合作导致封号](https://www.reddit.com/r/DigitalMarketing/comments/1ucg9mn/any_good_reddit_marketing_agencies/) | 1 | 36 | Reddit 营销外包 |
| R03 | 2026-06-27 | [为产品发布找 Reddit agency，已经联系三家](https://www.reddit.com/r/AskMarketing/comments/1uh18pz/how_to_find_a_good_reddit_marketing_agency/) | 0 | 4 | Reddit 营销外包 |

样本内，SaaS SEO 有 2 条明确采购相关主帖、79 条评论；AI 搜索优化有 2 条、35 条评论；Reddit 外包有 3 条、77 条评论。**这些计数只能说明选中的讨论有真实可读的采购表达与参与，不能据此比较全网三类需求的大小。** 三条 Reddit 求助的行业未全部明确，不能全部标为 SaaS 买家。

筛选时没有把以下内容计入这 7 条采购样本：泛化「谁最好」且无自身采购背景的提问、机构自行发布的榜单、招聘员工/找业务合伙人、已删除正文、超过时间范围的旧帖，以及明显的营销教程。它们可以证明话题有人讨论，不能直接证明最终买家正在采购。

例如，[Reddit 服务商讨论客户从哪里来](https://www.reddit.com/r/redditmarketing/comments/1ua1mw7/where_are_most_of_your_reddit_clients_coming_from/)属于供给侧讨论；[质疑 Reddit agencies 是否可靠](https://www.reddit.com/r/DigitalMarketing/comments/1v64fnn/are_reddit_marketing_agencies_legit_or_mostly/)反映信任顾虑，也没有直接声明当前采购计划。

完整浏览器记录见 [social-posts-browser.json](./social-posts-browser.json)。这些是帖子作者的陈述，不能当作已经核验的客户交易或服务商效果证明。

## 3. 最终选择的三个意图

### 第一：为 SaaS 找能执行并改善自然获客的 SEO 服务商

- **采购任务**：内部没有足够执行带宽，或现有自然获客停滞，想选 agency / consultant。
- **搜索锚点**：`saas seo agency`；`b2b seo agency` 为相邻大类，`saas seo consultant` 为合作模式变体。
- **判断**：三类中优先推进；依据是明确商业词需求、匹配 SaaS 的采购主帖和现有服务能力，不是因为全网社交声量已被测量。
- **Earned 方向**：SaaS SEO 服务商采购指南、客户迁移/合作复盘、SaaS 创始人推荐。强调实际服务范围、实施者、行业案例和线索口径。
- **承接**：`/services/seo-services`。技术 SEO 是可信执行能力；在没有独立 SERP 和采购差异证据前，不再为每个修饰词建页。

### 第二：已有 SEO 基础，希望增加 AI 搜索可见度，选择 GEO/AEO 服务商

- **采购任务**：在 AI 搜索中没有结果，决定升级现有 agency、另找专家，还是换成可以一起交付的团队。
- **搜索锚点**：已有数据的 `ai seo agency` / `ai seo services`；准确的 GEO/AEO agency 词待 API 补查。
- **判断**：纳入核心试点，但独立 GEO agency 需求规模暂不能精确定量；商业 AI SEO 词存在歧义。
- **Earned 方向**：AI 搜索服务商评估、客户如何选择 SEO + GEO 合作模式、可见度研究和交付评审。
- **承接**：`/services/geo-services`；SEO + GEO 的协作问题写入两类服务页 FAQ 和比较内容。组合问题有社交依据，但尚无证据要求单独创建组合服务页。

### 第三：寻找可靠的 Reddit 营销团队，外包自然互动、社区运营或产品发布支持

- **采购任务**：买家没有时间或经验亲自运营，已经询价，担心垃圾营销、封号和结果不可衡量。
- **搜索锚点**：`reddit marketing agency` / `reddit marketing services`。社区运营、产品发布、SaaS 适配是二级筛选条件。
- **判断**：小规模核心试点，投入低于 SaaS SEO；有具体采购表达，但搜索需求更小，SaaS 专属需求尚未充分验证。
- **Earned 方向**：Reddit agency 选型讨论、客户对运营质量的公开评价、自然运营与广告代理的差异、范围和结果复盘。
- **承接**：`/services/reddit-services`，明确自然运营和付费广告的服务边界，避免用广告需求规模给自然运营背书。

## 4. 对原规划的修正

| 原说法 | 修正 | 理由 |
| --- | --- | --- |
| 「AI / SaaS 同时找 SEO + GEO」独立 P1 | 保留为 AI 搜索采购的重要追问，同时与 SaaS SEO 主入口衔接 | 有两条直接相关讨论，但组合关键词数据缺失 |
| 「SaaS + Reddit + 自然增长」独立 P1 | 主入口改为 Reddit marketing agency；SaaS 是待继续验证的适配人群 | 商业主词 300，`reddit saas marketing` 仅 10；买家帖并非全为 SaaS |
| 「中文创始人找英语市场团队」独立 P1 | 降为画像与语言协作条件 | 缺中文关键词 API 数据与足量可复核买家讨论；不等于没有需求 |
| 「GEO 方法、交付、可信度比较」独立 P2 | 融入选服务商的决策内容 | 属于各采购意图共有的判断标准 |
| 所有 best agencies 都留到最后 | 有 SaaS 或 GEO 限定的选型词现在进入测试；泛 best SEO agency 降优先 | 细分类别的推荐名单本身就是 Earned GEO 目标；是否容易进入与意图是否成立是两件事 |
| `geo services` 的 700 搜索量算 GEO 需求 | 从营销需求量证据中剔除 | 搜索存在明显地理服务、岩土工程等歧义 |

`geo services` 的歧义可见 [Geo 的工程数据服务](https://data.geo.dk/)；AI SEO 的双重含义也能在服务商原页看到，例如 [OmniFound 的两类 AI SEO 说明](https://www.omnifound.com/ai-seo-agency)。服务商页面只用于观察语义，不作为真实买家数量证据。

新的对外描述建议：**Meridian provides SEO, AI search optimization, and Reddit marketing for SaaS and AI companies.**

品牌可以服务这些对象，但这句话不是需求验证结果本身。采购入口使用买家已有的类别语言；技术实力、社区方法、中文沟通与工程责任放到买家比较我们时需要的证据里。

## 5. 还缺哪些证据

1. API 可用后，补查 15 个缺失词并复查 6 个主商业词，记录国家、端点、调用时间和原始响应。中文市场单独查询，不能套用美国数据。
2. 若要比较「社交声量大小」或变化趋势，需要在相同窗口、同类查询、相同覆盖深度下持续采集；当前 7 条定向样本不承担这个结论。
3. 补充 X / 小红书授权可访问数据和销售通话/询盘，验证中文协作是否经常成为购买条件。
4. 页面拆分前，针对主关键词采集同一市场的 SERP，比较前十 URL、页面类型和采购任务。当前建议先使用已有三个服务入口，不声称已经完成 SERP 重叠验证。
5. AI 固定问题测试用于观测 Meridian 能否入围；真实采购意图、Google 搜索量与 AI 推荐率是三组不同证据，不能互相替代。
