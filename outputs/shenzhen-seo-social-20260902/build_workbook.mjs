import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/outputs/shenzhen-seo-social-20260902";
const checkedAt = new Date(2026, 8, 2);
const conferenceBase = "https://shenzhenseoconference.com/speakers/";

const speakers = [
  { type: "Keynote", name: "Lily Ray", title: "VP of SEO Strategy & Research, Amsive", bio: "Amsive SEO 战略与研究副总裁，2010 年进入 SEO 行业，擅长算法更新、站点质量评估、技术 SEO，以及零售、电商、B2B 和 CPG 网站增长。", slug: "lily-ray", linkedin: "https://www.linkedin.com/in/lily-ray-44755615/", x: "https://x.com/lilyraynyc", youtube: "https://www.youtube.com/@lilyray" },
  { type: "Keynote", name: "Gary Illyes", title: "Analyst, Google Search", bio: "Google Search Relations 分析师，长期讲解抓取、索引、渲染和技术优化；共同制定 RFC 9309 Robots Exclusion Protocol，并主持 Search Off the Record 播客。", slug: "gary-illyes", linkedin: "https://www.linkedin.com/in/garyillyes/", x: "https://x.com/methode" },
  { type: "Keynote", name: "Eli Schwartz", title: "Author, Product-Led SEO", bio: "数字营销顾问及《Product-Led SEO》作者，帮助 LinkedIn、Tinder、WordPress、Quora、Coinbase 等公司从传统 SEO 转向产品驱动的有机增长。", slug: "eli-schwartz", linkedin: "https://www.linkedin.com/in/schwartze/", x: "https://x.com/5le" },
  { type: "Keynote", name: "Sasha Gusain", title: "Head of Logged Out Experience, Canva", bio: "负责 Canva 未登录体验与有机增长，统筹 SEO、AI 发现、首页、认证和市场增长，曾推动覆盖 40 个市场的国际化产品增长系统。", slug: "sasha-gusain", linkedin: "https://www.linkedin.com/in/sashagusain/", x: "https://x.com/SashG" },
  { type: "Keynote", name: "Lars Lofgren", title: "Fractional VP of Marketing", bio: "增长与内容营销负责人，曾联合创办 SEO 联盟业务并在 3 年内做到年收入 720 万美元；现为 Perplexity、Automattic、NP Digital 等提供顾问服务。", slug: "lars-lofgren", linkedin: "https://www.linkedin.com/in/larslofgren", x: "https://x.com/LarsLofgren" },
  { type: "Workshop", name: "Marc Moeller", title: "Founder, Ecomexperts", bio: "Ecomexperts 创始人，拥有 10 年以上 B2B、游戏与 SaaS SEO 经验，侧重技术诊断、内容系统、流程模板和可落地 SOP。", slug: "marc-moeller", linkedin: "https://www.linkedin.com/in/marcmoeller-seo/", youtube: "https://www.youtube.com/@moellerseo" },
  { type: "Workshop", name: "Tom Qiao", title: "Founder, Convert Better", bio: "Convert Better 创始人，通过用户行为分析和 A/B 测试为 B2B、B2C/DTC 与 SaaS 品牌提升转化率和营销盈利能力。", slug: "tom-qiao", linkedin: "https://www.linkedin.com/in/tomqiao/" },
  { type: "Workshop", name: "Jessica Malnik", title: "Founder, Remote Work Tribe & Clarity Briefs", bio: "专注 B2B 定位、价值主张与转化文案，帮助企业修复影响增长的信息传达问题，并把网站、内容和营销活动转化为合格商机。", slug: "jessica-malnik", linkedin: "https://www.linkedin.com/in/jessicamalnik", x: "https://x.com/jessicamalnik", youtube: "https://www.youtube.com/@JMalnik" },
  { type: "Workshop", name: "Zack Franklin", title: "Founder, SmartEcomSEO", bio: "SmartEcomSEO 创始人，深耕深圳与跨境电商 SEO 约 10 年，服务多家高营收电商品牌，同时实践 AI 自动化并组织深圳营销社群。", slug: "zack-franklin", linkedin: "https://www.linkedin.com/in/zackjf/" },
  { type: "Field Talk", name: "Nick Drewe", title: "Founder & CEO, Wethrift", bio: "全球优惠券平台 Wethrift 创始人兼 CEO，自 2018 年起通过 SEO、产品驱动增长和可规模化的优惠数据系统拓展业务。", slug: "nick-drewe", linkedin: "https://www.linkedin.com/in/nickdrewe/" },
  { type: "Field Talk", name: "Josh Blyskal", title: "AI Strategy & Research, Profound", bio: "Profound AI 战略与研究负责人，研究了超过 2.5 亿条 AI 搜索响应，并打造 AI Search Grader，为大型品牌制定 AI 可见性策略。", slug: "josh-blyskal", linkedin: "https://www.linkedin.com/in/joshua-blyskal/", x: "https://x.com/JBlyskal" },
  { type: "Field Talk", name: "Nik Ranger", title: "Senior Growth Consultant, Dejan", bio: "Dejan 高级增长顾问及 SEO Collective Australia 创始人，擅长把技术数据和用户行为转化为企业、SaaS、电商与 B2B/B2C 的全生命周期增长。", slug: "nik-ranger", linkedin: "https://www.linkedin.com/in/nik-ranger/", x: "https://x.com/nikrangerseo" },
  { type: "Field Talk", name: "Si Quan Ong", title: "Senior Content Marketer, Ahrefs", bio: "Ahrefs 高级内容营销人员，专注产出帮助营销者提升工作的实用内容，并负责策划 Ahrefs 每周行业通讯 Ahrefs' Digest。", slug: "si-quan-ong", linkedin: "https://www.linkedin.com/in/si-quan-ong/", x: "https://x.com/siquanong" },
  { type: "Field Talk", name: "Loki Yan", title: "Co-founder, First Optimise (壹优化)", bio: "壹优化联合创始人，专长复杂技术架构、国际 SEO 与 GEO；曾在 Google Search Central Live、Ahrefs Evolve 等活动分享。", slug: "loki-yan", linkedin: "https://www.linkedin.com/in/xinyuan-loki-y-86aa1456/", youtube: "https://www.youtube.com/@seolokiyan" },
  { type: "Field Talk", name: "Doug Pierce", title: "Founder, Cogney", bio: "香港数字营销顾问公司 Cogney 创始人，拥有 15 年 B2B、SaaS 与电商 SEO 经验，帮助 100 多家公司获得高竞争关键词首页排名。", slug: "doug-pierce", linkedin: "https://www.linkedin.com/in/douglasapierce/" },
  { type: "Field Talk", name: "Mao Kawana", title: "Project Manager, Faber Company", bio: "Faber Company 项目经理，负责大型网站改版，从战略规划到执行落地，并把技术 SEO 与高层营销策略结合以推动长期数字增长。", slug: "mao-kawana", linkedin: "https://www.linkedin.com/in/maokawana/" },
  { type: "Field Talk", name: "Polina Kogan", title: "SEO Consultant, Ayudante", bio: "Ayudante 企业 SEO 与分析顾问，专长大型迁移、国际与多语言 SEO，服务日本品牌出海及海外品牌进入日本，并合著三本 SEO/分析书籍。", slug: "polina-kogan", linkedin: "https://www.linkedin.com/in/polina-kogan-53965074/" },
  { type: "Field Talk", name: "Victor Huynh", title: "CEO & Head of Digital Strategy, Ready Artwork", bio: "Ready Artwork 联合创始人兼 CEO，拥有 20 多年网站与数字战略经验，主要服务工业制造和高客单 B2B 企业。", slug: "victor-huynh", linkedin: "https://www.linkedin.com/in/victor-huynh-581b82/", youtube: "https://www.youtube.com/@ReadyArtwork" },
  { type: "Field Talk", name: "Cristina Song", title: "SEO Lead & Co-Founder, Xpandir", bio: "Xpandir SEO 负责人兼联合创始人，专注韩国、日本及新加坡、香港、台湾、澳新等高购买力 APAC 市场的本地化 SEO。", slug: "cristina-song", linkedin: "https://www.linkedin.com/in/cristinassong/" },
  { type: "Field Talk", name: "Jiyoung Lee", title: "Co-Founder & Digital Growth Strategist, Xpandir", bio: "拥有 8 年数字营销经验，帮助全球品牌进入并增长于韩国市场，覆盖本地平台策略、付费投放、SEO 和内容营销。", slug: "jiyoung-lee", linkedin: "https://www.linkedin.com/in/jiyoung-lee-marketing-specialist/" },
  { type: "Field Talk", name: "Owain Lloyd-Williams", title: "Independent SEO Consultant", bio: "独立 SEO 顾问，拥有 15 年以上企业级 SEO 和数字战略经验，擅长国际搜索、内容、技术优化及中国 SEO。", slug: "owain-lloyd-williams", linkedin: "https://www.linkedin.com/in/owain-lloyd-williams-a8967852/", x: "https://x.com/Owain_LW" },
  { type: "Field Talk", name: "Sebastien Edgar", title: "Global VP of Digital Marketing, Liferay", bio: "Liferay 全球数字营销副总裁，领导 SEO、CRO、网站策略、付费媒体、Campaign 和社交增长；曾任 Square 全球有机发现负责人。", slug: "sebastien-edgar", linkedin: "https://www.linkedin.com/in/sebastienedgar/" },
  { type: "Field Talk", name: "Max Kuch", title: "Digital Entrepreneur", bio: "德国数字创业者，曾以联盟 SEO 获得月度五至六位数收入，后转型 AI 独立创业，并在 8 个月内将新产品做到月收入 1 万美元以上。", slug: "max-kuch", linkedin: "https://www.linkedin.com/in/maximilian-kuch/", x: "https://x.com/maxkuchcom", youtube: "https://www.youtube.com/@maxkuchcom" },
  { type: "Field Talk", name: "Kun Tang", title: "Founder and CEO, Jademond", bio: "Jademond 创始人兼 CEO，拥有 20 年中国网络营销经验，带领 40 多人团队帮助西方品牌通过搜索、社交媒体和 AI 进入中国市场。", slug: "kun-tang", linkedin: "https://www.linkedin.com/in/kuntang/" },
  { type: "Lightning Talk", name: "Andy Wu", title: "Founder, Wuberlife Brands", bio: "Wuberlife Brands 创始人，经营电商品牌并专注 SEO、自动化、数据和 AI；早期经历覆盖在线券商、Amazon FBA 与电商创业。", slug: "andy-wu", linkedin: "https://www.linkedin.com/in/andywu1/" },
  { type: "Lightning Talk", name: "Johann Sathianathen", title: "Co-founder, Cyndra AI", bio: "Jars Global 创始人及 Cyndra AI 联合创始人，专注企业 AI 自动化、营销自动化、获客和 SEO；曾在 12 个月内创建并出售 Qura。", slug: "johann-sathianathen", linkedin: "https://www.linkedin.com/in/jsathianathen/", x: "https://x.com/johann_sath", youtube: "https://www.youtube.com/@johannships" },
  { type: "Lightning Talk", name: "Roger Yin", title: "SEO Partner, HashMatrix", bio: "温哥华增长营销专家，拥有 10 年以上北美经验并服务 200 多个品牌，专长国际 SEO、AEO/GEO 及 AI 产品出海增长。", slug: "roger-yin", linkedin: "https://www.linkedin.com/in/mzyin/", x: "https://x.com/daluoseo", youtube: "https://www.youtube.com/@daluoseo" },
  { type: "Lightning Talk", name: "David Carrasco", title: "Freelance SEO Consultant", bio: "巴塞罗那 Magnify 创始人，专注国际 SEO 与品牌可见性；拥有十年经验，并曾创建、扩张和出售自己的数字 PR SaaS。", slug: "david-carrasco", linkedin: "https://www.linkedin.com/in/david-carrasco-pamies/", x: "https://x.com/davidcarrascop", youtube: "https://www.youtube.com/@david_carrasco/" },
  { type: "Lightning Talk", name: "Andrea Abbondanza", title: "Founder, Abbondanza Marketing", bio: "数字战略家、创业者和 AI 顾问，在意大利与澳大利亚拥有 15 年以上经验，专长 SEO、GEO、AIO 及中国品牌进入意大利市场。", slug: "andrea-abbondanza", linkedin: "https://www.linkedin.com/in/andrea-abbondanza/", x: "https://x.com/Andre_abbo" },
  { type: "Lightning Talk", name: "Jonathan Kiekbusch", title: "Founder, SwishDM", bio: "SwishDM 创始人及前电商经营者，帮助中大型企业通过战略 SEO 与 GEO 提升自然搜索收入，兼具创业、扩张与退出经验。", slug: "jonathan-kiekbusch", linkedin: "https://www.linkedin.com/in/jonathan-kiekbusch-65a84914/", youtube: "https://www.youtube.com/user/johnkiek" },
  { type: "Lightning Talk", name: "Max Hobbs", title: "Global Head of Marketing, LTL School", bio: "LTL School 全球营销负责人，近十年负责亚洲语言教育品牌的全球增长、线索增长与品牌建设。", slug: "max-hobbs", linkedin: "https://www.linkedin.com/in/max-hobbs-uk/" },
  { type: "Lightning Talk", name: "Konstantin Sadekov", title: "Founder & CEO, Ethical SEO", bio: "爱沙尼亚 EthicalSEO 创始人兼 CEO，为美国和欧洲企业及 SaaS 创业公司制定兼顾传统搜索和 LLM 可见性的可持续 AI SEO 策略。", slug: "konstantin-sadekov", linkedin: "https://www.linkedin.com/in/konstantin-sadekov/" },
  { type: "Lightning Talk", name: "Gabriele Kahlout", title: "International SEO Specialist", bio: "国际 SEO 专家，拥有十年以上受众增长经验，跨编辑、开发、内容、数据管道与 AI 自动化工作，并能使用四种语言。", slug: "gabriele-kahlout" },
  { type: "Lightning Talk", name: "Sam Penny", title: "SEO & Growth Manager", bio: "增长型 SEO 营销者，负责澳大利亚大型投资基金的 SEO，并为品牌提供技术 SEO 和内容策略建议；其数字产品每年服务超过 100 万人。", slug: "sam-penny", linkedin: "https://www.linkedin.com/in/sam-penny/", x: "https://x.com/sampennyseo" },
  { type: "Lightning Talk", name: "Helen Han", title: "Technical SEO Executive, Easygo", bio: "墨尔本技术 SEO 从业者，擅长把复杂 SEO 问题转化为可规模化自动化方案，使用 Sanity、GROQ 与数据工作流推动全球有机增长。", slug: "helen-han", linkedin: "https://www.linkedin.com/in/helenhanau/" },
  { type: "Lightning Talk", name: "Jine Wu", title: "SEO Operations Manager, REA Group", bio: "REA Group SEO 运营经理，拥有 18 年数字营销经验及开发背景，专长企业级技术 SEO、AI 搜索、大型搜索平台和跨团队执行。", slug: "jine-wu", linkedin: "https://www.linkedin.com/in/jinewu/" },
  { type: "Lightning Talk", name: "Henry Dalziel", title: "SEO Lead, Publicis Media", bio: "香港 SEO/GEO 专家，拥有 15 年以上电商、金融、酒店、医药等企业经验，曾在 Publicis Media 扩大 SEO 团队和客户组合，偏重技术 SEO。", slug: "henry-dalziel", linkedin: "https://www.linkedin.com/in/henrydalziel/", youtube: "https://www.youtube.com/@HenryDalzielSEO/" },
  { type: "Lightning Talk", name: "Killian Kostiha", title: "Founder, Get Clicks", bio: "Get Clicks 创始人，自 2008 年从事 SEO，帮助品牌在亚洲与全球市场通过 SEO、GEO、内容、链接建设和数字 PR 增长。", slug: "killian-kostiha", linkedin: "https://www.linkedin.com/in/kkostihapm/", x: "https://x.com/killiankostiha" },
  { type: "Lightning Talk", name: "Jodie Chan", title: "SVP of Product & Strategic Partnerships, Chinafy", bio: "Chinafy 产品与战略合作高级副总裁，自 2017 年专注跨境网站在中国的速度、完整性和安全性，并建设阿里云、AWS、WPVIP 等合作生态。", slug: "jodie-chan", linkedin: "https://www.linkedin.com/in/jodiewyc/" },
  { type: "Lightning Talk", name: "Divya Jain", title: "Global Head of Organic Growth & Brand, Edvoy", bio: "拥有 20 年有机增长经验，覆盖金融科技、旅行、本地发现和教育科技；曾在 Paytm、Justdial 建立 SEO 团队，现负责 Edvoy 全球增长与品牌。", slug: "divya-jain", linkedin: "https://www.linkedin.com/in/divyajain3/" },
  { type: "Lightning Talk", name: "Wasin Mekkit", title: "Data & Growth Analyst, Statrys", bio: "数据与数字增长分析师，结合网页开发、数据分析、设计和策略，优化用户体验以及搜索引擎与 AI 对页面内容的理解。", slug: "wasin-mekkit", linkedin: "https://www.linkedin.com/in/wasin-mekkit/" },
  { type: "Lightning Talk", name: "Mayi", title: "Founder & CEO, InnoHunts", bio: "深圳 InnoHunts 创始人兼 CEO，专注 Reddit 营销、社区驱动增长、品牌叙事和 GEO，帮助出海品牌建立全球影响力。", slug: "mayi", linkedin: "https://www.linkedin.com/in/yiwanning-ma-642b52218/" },
  { type: "Lightning Talk", name: "Ben Fang", title: "CEO & Co-founder, Kingsway Video", bio: "Kingsway Video 联合创始人兼 CEO，拥有 22 年网站建设与内容创作经验，专注视频营销、Video SEO 与潜客获取。", slug: "ben-fang", linkedin: "https://www.linkedin.com/in/ben-fang-0817325/", youtube: "https://www.youtube.com/channel/UC552BM8NTTkyHfh7ueAuaZg" },
  { type: "Lightning Talk", name: "Tupa Lee", title: "SEO & SEM Consultant", bio: "国际增长型效果营销从业者与教育者，管理过数百万美元 DTC 增长项目，覆盖 Google Ads/SEO、Meta、达人营销与 YouTube 增长。", slug: "tupa-lee", linkedin: "https://www.linkedin.com/in/tupa-lee-756944380/" },
  { type: "VIP Networking", name: "Nick White", title: "Author / Founder, Castle Trade Agency", bio: "拥有 30 年 B2B 销售经验的作者和培训师，2016 年创立 Castle Trade Agency，帮助中国供应商开发此前难以触达的目标客户。", slug: "nick-white" },
  { type: "VIP Networking", name: "Marcus Pentzek", title: "Partner & Director SEO, Jademond Digital", bio: "Jademond Digital 合伙人兼 SEO 总监，拥有 20 年 Google SEO 和东亚搜索经验，合著《SEO for China》并主导 2020 年百度排名因素研究。", slug: "marcus-pentzek", linkedin: "https://www.linkedin.com/in/marcuspentzek/", x: "https://x.com/MPentzek" },
  { type: "VIP + Side Event", name: "Tanya Van Gastel", title: "Founder, Rankingonai.com", bio: "Rankingonai.com 创始人，为高增长 SaaS 提供 AI 可见性与 SEO 服务，客户包括 Cal.com、Suno、HappyRobot；此前曾创建并退出 AI 摄影创业项目。", slug: "tanya-van-gastel", linkedin: "https://www.linkedin.com/in/tanyavangastel/", youtube: "https://www.youtube.com/@foundertanya" },
  { type: "VIP Networking", name: "Tom So", title: "Founder & CEO, MML Digital (慢慢来)", bio: "MML Digital 创始人兼 CEO，拥有 20 年国际贸易和 10 年数字营销经验，帮助 2,000 多家中国出口企业建设品牌、网站和内容增长体系。", slug: "tom-so", linkedin: "https://www.linkedin.com/in/tom-so/" },
  { type: "VIP Networking", name: "Kiana Shen", title: "Founder, OMGrowth.ai (济谦AI)", bio: "OMGrowth.ai 创始人，为出海品牌和 SaaS 团队提供技术 SEO、内容策略与 GEO 服务，专注中美跨文化品牌表达和有机增长。", slug: "kiana-shen", linkedin: "https://www.linkedin.com/in/kiana-shen-6054b11b6/" },
  { type: "Side Event", name: "Sacha Fournier", title: "Founder, JournoFinder.com", bio: "JournoFinder 创始人，通过 AI 工具帮助企业寻找合适记者、获得媒体报道和高质量链接，并在多个国际 SEO 大会分享数字 PR。", slug: "sacha-fournier", linkedin: "https://www.linkedin.com/in/ssfournier/", x: "https://x.com/sachf_" },
  { type: "Side Event", name: "Jamie I.F.", title: "Founder, AffiliateFinder.ai", bio: "AffiliateFinder.ai 创始人，专注 AI 可见性、联盟和达人增长；其平台服务 Google、Jotform 等 2,400 多个品牌。", slug: "jamie-i-f", linkedin: "https://www.linkedin.com/in/jamie-if/", x: "https://x.com/Jamie_IF", youtube: "https://www.youtube.com/channel/UCUYu4XfhuiuWwzhLka2L9Pw" },
  { type: "Side Event", name: "Vinayak Gupta", title: "Founder, Serpbays", bio: "Serpbays、Wordscloud 和 SaaSlinks 创始人，工作横跨链接交易市场、内容营销、SaaS、AI 辅助开发和 SEO 自动化。", slug: "vinayak-gupta", linkedin: "https://www.linkedin.com/in/vin-wordscloud/" },
  { type: "Side Event", name: "Sharoz Dawa", title: "SEO Lead, Fynd", bio: "Fynd SEO 负责人；官网当前未提供更详细个人简介。", slug: "sharoz-dawa", linkedin: "https://www.linkedin.com/in/sharozdawa/", x: "https://x.com/SharozDawa" },
  { type: "Side Event", name: "Magenta Qin", title: "Developer Advocate, SerpApi", bio: "SerpApi 开发者倡导者，曾任腾讯和小红书软件工程师，现通过技术内容、教程、开源演示帮助开发者和营销者把实时搜索数据用于 AI 与 SEO。", slug: "magenta-qin", linkedin: "https://www.linkedin.com/in/mu-qin-0a29621b8/" },
  { type: "Side Event", name: "Jabez Reuben", title: "Founder, The Blueprints", bio: "LLM Mastery、The Blueprints 与 LinkValidator 创始人，拥有 8 年以上 SEO 经验，研究 LLM 如何理解并推荐品牌及相应可持续增长策略。", slug: "jabez-reuben", linkedin: "https://www.linkedin.com/in/jabezreuben/", x: "https://x.com/jabezreuben" },
  { type: "Side Event", name: "Ilman Akbar", title: "Founder & CEO, DailySEO ID & DLYS Consulting", bio: "拥有 13 年 SEO 经验，创立 DailySEO ID 与 DLYS Consulting，曾任职 Traveloka、Glints，并在东南亚培训数千名 SEO 学员。", slug: "ilman-akbar", linkedin: "https://www.linkedin.com/in/ilmanakbar/", x: "https://x.com/ilmanakbar", youtube: "https://www.youtube.com/@ilmanakbar/" },
  { type: "Side Event", name: "Tori Long", title: "Marketing Director, GWTime", bio: "GWTime 市场总监，拥有 13 年、50 多个市场经验并促成八位数国际交易，帮助 B2B 中小出口企业建立可复利的海外信任。", slug: "tori-long", linkedin: "https://www.linkedin.com/in/yaping-long-59373b87/" },
  { type: "Side Event", name: "Jacky Lin", title: "Founder, Wingfuture", bio: "Wingfuture 创始人，帮助外贸与 B2B 企业搭建销售、营销、获客和流程自动化 AI 系统；同时创办中国 Global Trade AI Conference。", slug: "jacky-lin", linkedin: "https://www.linkedin.com/in/jacky-l-326ab2b8/" },
];

const followerCounts = new Map([
  ["https://x.com/lilyraynyc", 122900], ["https://www.youtube.com/@lilyray", 3370],
  ["https://x.com/methode", 43800], ["https://x.com/5le", 34400],
  ["https://x.com/SashG", 5576], ["https://x.com/LarsLofgren", 4207],
  ["https://www.youtube.com/@moellerseo", 28100],
  ["https://x.com/jessicamalnik", 4580], ["https://www.youtube.com/@JMalnik", 129],
  ["https://x.com/JBlyskal", 178], ["https://x.com/nikrangerseo", 4720],
  ["https://x.com/siquanong", 3570], ["https://www.youtube.com/@seolokiyan", 28],
  ["https://www.youtube.com/@ReadyArtwork", 118], ["https://x.com/Owain_LW", 574],
  ["https://x.com/maxkuchcom", 371], ["https://www.youtube.com/@maxkuchcom", 188],
  ["https://x.com/johann_sath", 9300], ["https://www.youtube.com/@johannships", 1890],
  ["https://x.com/daluoseo", 11100], ["https://www.youtube.com/@daluoseo", 4640],
  ["https://x.com/davidcarrascop", 1645], ["https://www.youtube.com/@david_carrasco/", 88],
  ["https://x.com/Andre_abbo", 38], ["https://www.youtube.com/user/johnkiek", 57],
  ["https://x.com/sampennyseo", 302], ["https://www.youtube.com/@HenryDalzielSEO/", 371],
  ["https://x.com/killiankostiha", 885], ["https://www.youtube.com/channel/UC552BM8NTTkyHfh7ueAuaZg", 41],
  ["https://x.com/MPentzek", 101], ["https://www.youtube.com/@foundertanya", 4250],
  ["https://x.com/sachf_", 2882], ["https://x.com/Jamie_IF", 25900],
  ["https://www.youtube.com/channel/UCUYu4XfhuiuWwzhLka2L9Pw", 1590],
  ["https://x.com/SharozDawa", 1667], ["https://x.com/jabezreuben", 530],
  ["https://x.com/ilmanakbar", 3806], ["https://www.youtube.com/@ilmanakbar/", 81700],
]);

const accountRows = [];
for (const speaker of speakers) {
  const source = conferenceBase + speaker.slug;
  for (const [field, platform] of [["linkedin", "LinkedIn"], ["x", "X"], ["youtube", "YouTube"]]) {
    const url = speaker[field];
    if (!url) continue;
    const handle = decodeURIComponent(new URL(url).pathname.replace(/^\/+|\/+$/g, ""));
    const count = followerCounts.has(url) ? followerCounts.get(url) : null;
    accountRows.push({
      speaker: speaker.name,
      platform,
      handle,
      url,
      count,
      status: platform === "LinkedIn" ? "平台限制：未登录不显示粉丝数" : "公开可见",
      source,
    });
  }
}

const workbook = Workbook.create();
const summary = workbook.worksheets.add("总览");
const overview = workbook.worksheets.add("讲者总览");
const accounts = workbook.worksheets.add("账号明细");
const notes = workbook.worksheets.add("说明与来源");
const red = "#EB3030";
const ink = "#111827";
const slate = "#475569";
const pale = "#F8FAFC";
const line = "#E2E8F0";

for (const sheet of [summary, overview, accounts, notes]) sheet.showGridLines = false;

// 讲者总览
const overviewHeaders = ["序号", "议程类型", "姓名", "职位 / 机构", "个人简介（中文简述）", "LinkedIn", "LinkedIn 粉丝", "X", "X 粉丝", "YouTube", "YouTube 订阅", "公开可核实受众", "官网个人页", "备注"];
const overviewValues = speakers.map((s, i) => [
  i + 1, s.type, s.name, s.title, s.bio, s.linkedin || "", null, s.x || "", s.x ? followerCounts.get(s.x) ?? null : null,
  s.youtube || "", s.youtube ? followerCounts.get(s.youtube) ?? null : null, null,
  conferenceBase + s.slug,
  !s.linkedin && !s.x && !s.youtube ? "官网未提供社交账号" : (s.linkedin ? "LinkedIn 粉丝数受登录墙限制；未纳入公开受众合计" : ""),
]);
overview.getRange(`A1:N${speakers.length + 1}`).values = [overviewHeaders, ...overviewValues];
overview.getRange("L2").formulas = [["=SUM(G2,I2,K2)"]];
overview.getRange(`L2:L${speakers.length + 1}`).fillDown();
overview.tables.add(`A1:N${speakers.length + 1}`, true, "SpeakersOverview").style = "TableStyleMedium2";
overview.freezePanes.freezeRows(1);
overview.freezePanes.freezeColumns(3);
overview.getRange("A1:N1").format = { fill: ink, font: { color: "#FFFFFF", bold: true }, rowHeight: 34, verticalAlignment: "center" };
overview.getRange(`A2:N${speakers.length + 1}`).format = { font: { color: ink, size: 10 }, verticalAlignment: "top" };
overview.getRange(`E2:E${speakers.length + 1}`).format = { wrapText: true, verticalAlignment: "top" };
overview.getRange(`N2:N${speakers.length + 1}`).format = { wrapText: true, font: { color: slate, size: 9 } };
overview.getRange(`G2:G${speakers.length + 1}`).format.numberFormat = "#,##0";
overview.getRange(`I2:I${speakers.length + 1}`).format.numberFormat = "#,##0";
overview.getRange(`K2:L${speakers.length + 1}`).format.numberFormat = "#,##0";
overview.getRange(`L2:L${speakers.length + 1}`).conditionalFormats.add("dataBar", { color: red, gradient: true });
overview.getRange("A:A").format.columnWidth = 7;
overview.getRange("B:B").format.columnWidth = 16;
overview.getRange("C:C").format.columnWidth = 20;
overview.getRange("D:D").format.columnWidth = 31;
overview.getRange("E:E").format.columnWidth = 54;
overview.getRange("F:F").format.columnWidth = 38;
overview.getRange("G:G").format.columnWidth = 14;
overview.getRange("H:H").format.columnWidth = 28;
overview.getRange("I:I").format.columnWidth = 12;
overview.getRange("J:J").format.columnWidth = 38;
overview.getRange("K:L").format.columnWidth = 14;
overview.getRange("M:M").format.columnWidth = 43;
overview.getRange("N:N").format.columnWidth = 35;
overview.getRange(`2:${speakers.length + 1}`).format.rowHeight = 56;

// 账号明细
const accountHeaders = ["序号", "讲者", "平台", "账号 / Handle", "账号 URL", "粉丝 / 订阅数", "采集状态", "核对日期", "官网来源页"];
const accountValues = accountRows.map((r, i) => [i + 1, r.speaker, r.platform, r.handle, r.url, r.count, r.status, checkedAt, r.source]);
accounts.getRange(`A1:I${accountRows.length + 1}`).values = [accountHeaders, ...accountValues];
accounts.tables.add(`A1:I${accountRows.length + 1}`, true, "SocialAccounts").style = "TableStyleMedium2";
accounts.freezePanes.freezeRows(1);
accounts.freezePanes.freezeColumns(2);
accounts.getRange("A1:I1").format = { fill: ink, font: { color: "#FFFFFF", bold: true }, rowHeight: 34, verticalAlignment: "center" };
accounts.getRange(`F2:F${accountRows.length + 1}`).format.numberFormat = "#,##0";
accounts.getRange(`H2:H${accountRows.length + 1}`).format.numberFormat = "yyyy-mm-dd";
accounts.getRange(`A2:I${accountRows.length + 1}`).format = { font: { color: ink, size: 10 }, verticalAlignment: "top" };
accounts.getRange("A:A").format.columnWidth = 7;
accounts.getRange("B:B").format.columnWidth = 22;
accounts.getRange("C:C").format.columnWidth = 12;
accounts.getRange("D:D").format.columnWidth = 30;
accounts.getRange("E:E").format.columnWidth = 48;
accounts.getRange("F:F").format.columnWidth = 16;
accounts.getRange("G:G").format.columnWidth = 30;
accounts.getRange("H:H").format.columnWidth = 14;
accounts.getRange("I:I").format.columnWidth = 45;
accounts.getRange(`G2:G${accountRows.length + 1}`).conditionalFormats.add("containsText", { text: "公开可见", format: { fill: "#DCFCE7", font: { color: "#166534" } } });
accounts.getRange(`G2:G${accountRows.length + 1}`).conditionalFormats.add("containsText", { text: "平台限制", format: { fill: "#FEF3C7", font: { color: "#92400E" } } });

// 总览
summary.getRange("A1:J1").merge();
summary.getRange("A1").values = [["Shenzhen SEO Conference 2026｜讲者社交媒体盘点"]];
summary.getRange("A1:J1").format = { fill: ink, font: { color: "#FFFFFF", bold: true, size: 20 }, rowHeight: 44, verticalAlignment: "center" };
summary.getRange("A2:J2").merge();
summary.getRange("A2").values = [["范围：官网 2026 Lineup 的 58 位独立讲者｜粉丝数核对日期：2026-09-02（Asia/Shanghai）"]];
summary.getRange("A2:J2").format = { fill: "#1F2937", font: { color: "#CBD5E1", size: 10 }, rowHeight: 26, verticalAlignment: "center" };
const cardLabels = [["讲者人数", "", "LinkedIn 账号", "", "X 账号", "", "YouTube 账号", "", "公开受众合计*", ""]];
summary.getRange("A3:J3").values = cardLabels;
summary.getRange("A3:J3").format = { fill: "#F1F5F9", font: { color: slate, bold: true, size: 10 }, rowHeight: 24, verticalAlignment: "center" };
summary.getRange("A4").formulas = [[`=COUNTA('讲者总览'!$C$2:$C$${speakers.length + 1})`]];
summary.getRange("C4").formulas = [[`=COUNTIF('账号明细'!$C$2:$C$${accountRows.length + 1},"LinkedIn")`]];
summary.getRange("E4").formulas = [[`=COUNTIF('账号明细'!$C$2:$C$${accountRows.length + 1},"X")`]];
summary.getRange("G4").formulas = [[`=COUNTIF('账号明细'!$C$2:$C$${accountRows.length + 1},"YouTube")`]];
summary.getRange("I4").formulas = [[`=SUM('账号明细'!$F$2:$F$${accountRows.length + 1})`]];
summary.getRange("A4:B4").merge(); summary.getRange("C4:D4").merge(); summary.getRange("E4:F4").merge(); summary.getRange("G4:H4").merge(); summary.getRange("I4:J4").merge();
summary.getRange("A4:J4").format = { fill: "#FFFFFF", font: { color: ink, bold: true, size: 18 }, rowHeight: 38, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: line } };
summary.getRange("I4:J4").format.numberFormat = "#,##0";
summary.getRange("A6:C6").merge();
summary.getRange("A6").values = [["公开平台受众 Top 10"]];
summary.getRange("A6:C6").format = { fill: red, font: { color: "#FFFFFF", bold: true, size: 12 }, rowHeight: 28, verticalAlignment: "center" };
summary.getRange("A7:C7").values = [["排名", "讲者", "X + YouTube 公开粉丝/订阅"]];
summary.getRange("A7:C7").format = { fill: "#FEE2E2", font: { color: "#991B1B", bold: true }, rowHeight: 24 };
for (let i = 0; i < 10; i++) {
  const row = 8 + i;
  summary.getRange(`A${row}`).values = [[i + 1]];
  summary.getRange(`C${row}`).formulas = [[`=LARGE('讲者总览'!$L$2:$L$${speakers.length + 1},A${row})`]];
  summary.getRange(`B${row}`).formulas = [[`=INDEX('讲者总览'!$C$2:$C$${speakers.length + 1},MATCH(C${row},'讲者总览'!$L$2:$L$${speakers.length + 1},0))`]];
}
summary.getRange("C8:C17").format.numberFormat = "#,##0";
summary.getRange("A7:C17").format.borders = { preset: "inside", style: "thin", color: line };
summary.getRange("E6:H6").merge();
summary.getRange("E6").values = [["平台覆盖与数据可见性"]];
summary.getRange("E6:H6").format = { fill: red, font: { color: "#FFFFFF", bold: true, size: 12 }, rowHeight: 28, verticalAlignment: "center" };
summary.getRange("E7:G10").values = [
  ["平台", "账号数", "粉丝指标"],
  ["LinkedIn", null, "受登录墙限制，账号保留但未采集粉丝数"],
  ["X", null, "公开 Followers"],
  ["YouTube", null, "公开 Subscribers"],
];
summary.getRange("F8").formulas = [[`=COUNTIF('账号明细'!$C$2:$C$${accountRows.length + 1},E8)`]];
summary.getRange("F8:F10").fillDown();
summary.getRange("E7:G7").format = { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } };
summary.getRange("E7:G10").format.borders = { preset: "inside", style: "thin", color: line };
summary.getRange("E12:J14").merge();
summary.getRange("E12").values = [["*“公开受众合计”只累加 X 粉丝与 YouTube 订阅，不代表去重后的独立人数，也不包含 LinkedIn。用于判断公开可见的相对受众规模，不宜当作跨平台唯一受众。"]];
summary.getRange("E12:J14").format = { fill: pale, font: { color: slate, italic: true, size: 10 }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: line } };
summary.getRange("A19:J20").merge();
summary.getRange("A19").values = [["使用建议：先按“公开受众合计”筛选传播影响力，再结合“议程类型、职位与个人简介”判断合作匹配度；完整账号 URL 与逐条核对状态见“账号明细”。"]];
summary.getRange("A19:J20").format = { fill: "#FFF7ED", font: { color: "#9A3412", size: 10 }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: "#FED7AA" } };
summary.getRange("A:A").format.columnWidth = 10; summary.getRange("B:B").format.columnWidth = 25; summary.getRange("C:C").format.columnWidth = 23;
summary.getRange("D:D").format.columnWidth = 4; summary.getRange("E:E").format.columnWidth = 16; summary.getRange("F:F").format.columnWidth = 12;
summary.getRange("G:G").format.columnWidth = 43; summary.getRange("H:H").format.columnWidth = 4; summary.getRange("I:J").format.columnWidth = 15;
summary.freezePanes.freezeRows(2);

// 说明与来源
notes.getRange("A1:F1").merge();
notes.getRange("A1").values = [["口径、来源与限制"]];
notes.getRange("A1:F1").format = { fill: ink, font: { color: "#FFFFFF", bold: true, size: 18 }, rowHeight: 42, verticalAlignment: "center" };
notes.getRange("A3:B10").values = [
  ["项目", "说明"],
  ["名单范围", "以 Shenzhen SEO Conference 官网 2026 Lineup 为准；Tanya Van Gastel 同时出现在 VIP Networking 与 Side Events，按独立人物去重，因此共 58 人。"],
  ["个人简介", "依据每位讲者官网个人页的结构化 Person 描述，整理为中文简述；Sharoz Dawa 的官网页面未提供 description，已明确标注。"],
  ["社交账号", "只收录大会官网个人页 sameAs / 社交按钮明确给出的账号，未自行猜测或补充同名账号。"],
  ["粉丝指标", "X 使用公开 Followers；YouTube 使用频道公开订阅者；LinkedIn 对未登录访问显示注册墙，故不填粉丝数，也不以 Connections 冒充 Followers。"],
  ["公开受众合计", "讲者总览中的合计为 X + YouTube 的简单相加，未去重且不包含 LinkedIn，仅作为公开平台规模参考。"],
  ["核对时间", "2026-09-02，Asia/Shanghai。粉丝数会持续变化，后续使用时建议重新核对。"],
  ["异常处理", "官网未提供账号的讲者显示空白并在备注中标明；没有把搜索结果中的推定账号纳入。"],
];
notes.getRange("A3:B3").format = { fill: red, font: { color: "#FFFFFF", bold: true }, rowHeight: 26 };
notes.getRange("A4:B10").format = { wrapText: true, verticalAlignment: "top", font: { color: ink, size: 10 }, borders: { preset: "inside", style: "thin", color: line } };
notes.getRange("A12:B15").values = [
  ["主要来源", "URL"],
  ["大会讲者总页", "https://shenzhenseoconference.com/speakers"],
  ["讲者个人页", "逐人 URL 见“讲者总览”M 列与“账号明细”I 列"],
  ["社交平台", "逐账号 URL 见“账号明细”E 列；粉丝数直接读取对应公开页面"],
];
notes.getRange("A12:B12").format = { fill: red, font: { color: "#FFFFFF", bold: true }, rowHeight: 26 };
notes.getRange("A13:B15").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "inside", style: "thin", color: line } };
notes.getRange("A:A").format.columnWidth = 24;
notes.getRange("B:B").format.columnWidth = 100;
notes.getRange("3:15").format.rowHeight = 42;

// 全局细节
for (const sheet of [summary, overview, accounts, notes]) {
  const used = sheet.getUsedRange();
  used.format.font = { name: "Arial" };
}

const checkSummary = await workbook.inspect({ kind: "table", range: "总览!A1:J20", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 10, maxChars: 9000 });
const checkOverview = await workbook.inspect({ kind: "table", range: "讲者总览!A1:N8", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 14, maxChars: 9000 });
const errorScan = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log(checkSummary.ndjson);
console.log(checkOverview.ndjson);
console.log(errorScan.ndjson);

for (const sheetName of ["总览", "讲者总览", "账号明细", "说明与来源"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: sheetName === "总览" ? 1.2 : 0.8, format: "png" });
  const safe = { "总览": "summary", "讲者总览": "speakers", "账号明细": "accounts", "说明与来源": "notes" }[sheetName];
  await fs.writeFile(`${outputDir}/preview-${safe}.png`, new Uint8Array(await preview.arrayBuffer()));
}

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/Shenzhen_SEO_Conference_2026_Speaker_Social_Profiles.xlsx`);
console.log(JSON.stringify({ speakers: speakers.length, accounts: accountRows.length, output: `${outputDir}/Shenzhen_SEO_Conference_2026_Speaker_Social_Profiles.xlsx` }));
