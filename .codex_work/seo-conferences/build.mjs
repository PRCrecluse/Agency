import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/outputs/01a05dc4-630e-73e2-82e0-204cc9ef41f5";
const outputPath = `${outputDir}/global_seo_conference_outreach.xlsx`;
await fs.mkdir(outputDir, { recursive: true });

const verifiedOn = "2026-09-02";
const conferences = [
  ["A-立即联系", "Search SEOul", "亚太", "韩国 / 首尔", "2026-09-01—04", "正在举行；谈 2027", "Partnership Team", "partner@search-seoul.com；support@search-seoul.com", "https://search-seoul.com/", "https://search-seoul.com/", "韩国首个全球 SEO 大会；150+ 参会者、20+ 演讲者", "2027 早鸟赞助、社区/媒体合作、中文市场联动", "本周发邮件：祝贺本届举行，并索要 2027 partner deck 与预留时间表", "未联系", "", "", "", verifiedOn, "https://search-seoul.com/"],
  ["A-立即联系", "Shenzhen SEO Conference", "亚太", "中国 / 深圳", "2026-09-14—18", "临近；仍可询问库存", "Sponsorship Team", "官网赞助表；微信 ShenzhenSEOConf", "https://shenzhenseoconference.com/sponsors", "https://shenzhenseoconference.com/", "600 席；30+ 国家；跨境、联盟、技术 SEO 人群", "现场联名活动、展位、晚宴/酒会、媒体合作", "当天微信 + 表单双线联系；优先问剩余 Bronze/Silver 或 2027 优先权", "未联系", "", "", "", verifiedOn, "https://shenzhenseoconference.com/sponsors"],
  ["B-重点培育", "SearchNorwichXL", "欧洲", "英国 / Norwich", "2026-09-24", "临近；部分赞助位仍开放", "SearchNorwich / Candour", "官网 Get in touch；+44 (0)1603 957068", "https://searchnorwich.org/sponsors", "https://searchnorwich.org/", "200+ 参会者；英国东部 SEO、AI Search 社群", "食品/体验类赞助、社区福利、内容共创", "用赞助页联系；突出对区域社群的具体贡献，不只要 Logo", "未联系", "", "", "", verifiedOn, "https://searchnorwich.org/sponsors"],
  ["A-立即联系", "SMX Advanced Europe", "欧洲", "德国 / 柏林", "2026-09-29—10-01", "临近；需立即确认", "Sandra Finlay / Rising Media", "exhibit@risingmedia.com；+49 (0)8151 556 6045", "https://smxadvanced.eu/partners/2026/", "https://smxadvanced.eu/", "高级搜索营销从业者；欧洲企业与代理商", "高阶产品演示、闭门圆桌、案例分享、线索获取", "24 小时内邮件 + 电话；索要剩余库存、参会职位分布和交付清单", "未联系", "", "", "", verifiedOn, "https://smxadvanced.eu/partners/2026/"],
  ["B-重点培育", "Search ’n Stuff Antalya", "欧洲/中东", "土耳其 / Antalya", "2026-10-01—04", "临近；票已售约 70%", "Yağmur Şimşek", "yagmur@searchnstuff.co.uk", "https://searchnstuff.co.uk/search-n-stuff-antalya-conference-2026/", "https://searchnstuff.co.uk/search-n-stuff-antalya-conference-2026/", "国际化精品 retreat；SEO、PPC、CRO、数据", "奖项/晚宴、体验赞助、MENA+欧洲社区联动", "邮件直接问 Sponsor tiers、参会画像与仍可定制的独家权益", "未联系", "", "", "", verifiedOn, "https://searchnstuff.co.uk/search-n-stuff-antalya-conference-2026/"],
  ["A-立即联系", "SEO IRL", "北美（非美国）", "加拿大 / 多伦多", "2026-10-06—07", "赞助申请开放", "SEO IRL Team", "官网 Sponsor 邮件入口", "https://www.seoirl.com/", "https://www.seoirl.com/", "加拿大大型 SEO 会；约 250 名 SEO、AI Search 从业者", "工具试用、现场演示、AI SEO 数据报告", "从官网 sponsorship mailto 发起；询问 Gold/Silver 库存和 attendee breakdown", "未联系", "", "", "", verifiedOn, "https://www.seoirl.com/"],
  ["A-立即联系", "brightonSEO UK", "欧洲", "英国 / Brighton", "2026-10-08—09", "可申请赞助", "Dre / Rough Agenda", "dre@roughagenda.com；+44 1273 805525", "https://brightonseo.com/sponsor-brightonseo", "https://brightonseo.com/", "4,000+ 英国场参会者；50+ 国家；约 52% Director+", "品牌曝光、展位、Workshop、线索获取", "邮件索要 UK sponsor pack；用目标客户比例和可量化 activation 方案切入", "未联系", "", "", "", verifiedOn, "https://brightonseo.com/sponsor-brightonseo"],
  ["A-立即联系", "Semrush Spotlight", "欧洲", "英国 / 伦敦", "2026-10-13", "赞助入口开放", "Spotlight Sponsorship Team", "官网 Sponsorship Typeform", "https://www.spotlightconf.com/sponsors", "https://www.spotlightconf.com/", "1,000 名资深营销人；700+ 公司", "高层圆桌、产品体验、联合研究/案例", "先填 Typeform，再用 LinkedIn 找 Partnerships 团队补充定制方案", "未联系", "", "", "", verifiedOn, "https://www.spotlightconf.com/sponsors"],
  ["B-重点培育", "SEO On Stage — Athens", "欧洲", "希腊 / 雅典", "2026-10-24", "创始届；赞助招募中", "Black Lantern Marketing", "seo-on-stage@black-lantern.com", "https://seo-on-stage.com/", "https://seo-on-stage.com/", "戏剧化精品大会；搜索、内容、营销；三城巡回", "创始合作伙伴、舞台内容、品牌体验、鸡尾酒/周边", "强调愿意共创首届体验；同时打包询问 Dubai + Prague 三城权益", "未联系", "", "", "", verifiedOn, "https://seo-on-stage.com/"],
  ["A-立即联系", "Chiang Mai SEO Conference", "亚太", "泰国 / 清迈", "2026-11-09—13", "可申请赞助", "CMSEO Team", "contact@chiangmaiseoconference.com", "https://chiangmaiseoconference.com/become-a-sponsor/", "https://chiangmaiseoconference.com/", "约 800 人；大量创始人、CEO、Director、Head", "高意向产品体验、VIP 晚宴、创始人圆桌", "邮件附一页合作概念；问 audience split、套餐、演讲/工作坊边界", "未联系", "", "", "", verifiedOn, "https://chiangmaiseoconference.com/become-a-sponsor/"],
  ["A-立即联系", "MozCon London", "欧洲", "英国 / 伦敦", "2026-11-13", "Roadshow 英国场", "Moz Events / Support", "官网联系入口（未公开独立赞助邮箱）", "https://moz.com/mozcon", "https://moz.com/mozcon", "Moz 品牌社区；SEO、内容、AI Search 从业者", "内容/社区合作、案例演讲、联合研究", "先通过 MozCon 页面询问 partnership；避免直接套用美国场预算假设", "未联系", "", "", "", verifiedOn, "https://moz.com/mozcon"],
  ["B-重点培育", "Link Building Mastery", "亚太", "泰国 / 清迈", "2026-11-14—15", "可直接联系", "Event Team", "admin@linkbuildingmastery.com；WhatsApp +66-99-258-2826", "https://linkbuildingmastery.com/", "https://linkbuildingmastery.com/", "高聚焦外链、联盟、代理商与 SEO Operator", "链接数据/外联工具演示、实战 workshop、套餐试用", "邮件 + WhatsApp；明确是否与 CMSEO 连续周联动、共享差旅和物料", "未联系", "", "", "", verifiedOn, "https://linkbuildingmastery.com/"],
  ["B-重点培育", "SEO-Day", "欧洲", "德国 / 科隆", "2026-11-19", "可直接联系", "Fabian Rossbacher / Team", "fabian.rossbacher@seo-day.de；info@seo-day.de", "https://www.seo-day.de/", "https://www.seo-day.de/", "520+ 参会者；30+ 演讲者；德语市场", "DACH 渠道拓展、德语案例、展位/演讲", "用德英双语邮件；询问 Sponsor-Paket、参会公司类型和德语内容要求", "未联系", "", "", "", verifiedOn, "https://www.seo-day.de/"],
  ["B-重点培育", "SEOkomm", "欧洲", "奥地利 / Salzburg", "2026-11-27", "可直接联系", "Next Experts", "sponsor@nextexperts.at；+43 6235 21501", "https://www.onlineexpertdays.com/seokomm/", "https://www.onlineexpertdays.com/seokomm/", "DACH SEO 社群；德语为主", "DACH 本地化、渠道合作、德语 workshop", "邮件索取 2026 sponsor deck；确认现场语言与区域客户占比", "未联系", "", "", "", verifiedOn, "https://www.onlineexpertdays.com/seokomm/"],
  ["A-立即联系", "FOUND Conference Tokyo", "亚太", "日本 / 东京", "2027-02-18—19", "招募 Sponsor/Media/Community", "DemandSphere Japan", "support-jp@demandsphere.com", "https://foundconf.com/2027-tokyo/", "https://foundconf.com/2027-tokyo/", "Search、AI、Digital Marketing；日本本地与国际品牌", "日本市场联合研究、日英双语内容、社区伙伴", "现在发日英双语邮件；索要 sponsor/community/media 三类权益和截止期", "未联系", "", "", "", verifiedOn, "https://foundconf.com/2027-tokyo/"],
  ["A-立即联系", "Search Marketing Summit Australia", "亚太", "澳大利亚 / 悉尼", "2027-02-23—26", "2027 已开放", "No Drama Media", "marketing@searchmarketingsummit.com.au；+61 403 060 209", "https://www.searchmarketingsummit.com.au/", "https://www.searchmarketingsummit.com.au/", "澳洲运营 20 年的搜索大会；SEO/GEO/AI/PPC", "澳新市场案例、Workshop、企业买家触达", "直接问 sponsorship/partnership；若提案演讲，另发 speakers@searchmarketingsummit.com.au", "未联系", "", "", "", verifiedOn, "https://www.searchmarketingsummit.com.au/"],
  ["A-立即联系", "Sydney SEO Conference", "亚太", "澳大利亚 / 悉尼", "2027-03-11—12", "Sponsor 申请开放", "Prosperity Media", "hello@prosperitymedia.com.au", "https://prosperitymedia.com.au/sydney-seo-conference/", "https://prosperitymedia.com.au/sydney-seo-conference/", "约 300 人；SEO、增长、Digital PR、联盟、电商", "精品展位、Mastermind、慈善联名、案例分享", "官网申请 + 邮件；询问 sponsor inventory、Mastermind 参与权益和 lead capture", "未联系", "", "", "", verifiedOn, "https://prosperitymedia.com.au/sydney-seo-conference/"],
  ["B-重点培育", "WTSFest London", "欧洲", "英国 / 伦敦", "2027-03-19", "Partner 方案可咨询", "Women in Tech SEO", "contact@womenintechseo.com", "https://www.womenintechseo.com/partners/", "https://www.womenintechseo.com/conference/london/", "女性及边缘性别的技术 SEO 社群；强社区影响力", "奖学金、社区/Newsletter、职业发展、无障碍支持", "以长期社区投入为主线；先确认品牌价值观匹配和 partner tier", "未联系", "", "", "", verifiedOn, "https://www.womenintechseo.com/partners/"],
  ["A-立即联系", "SERP Conf Sofia", "欧洲", "保加利亚 / Sofia", "2027-03-24—25", "2027 Sponsor 页面开放", "SERP Conf Team", "官网 Sponsor 表；info@serpconf.com（建议表单优先）", "https://serpconf.com/sofia/sponsor/", "https://serpconf.com/sofia/", "8 届累计 3,200+；东欧 SEO/SEM/电商人群", "东欧渠道、案例演讲、展位、招聘/社区", "先填 sponsor 表；邮件补充区域增长目标与可执行 activation", "未联系", "", "", "", verifiedOn, "https://serpconf.com/sofia/sponsor/"],
  ["B-重点培育", "SEO On Stage — Dubai", "中东", "阿联酋 / Dubai", "2027-03（日期待定）", "早期赞助窗口", "Black Lantern Marketing", "seo-on-stage@black-lantern.com", "https://seo-on-stage.com/", "https://seo-on-stage.com/", "首届三城系列中东场；搜索、内容、营销", "MENA 首发、创始赞助、VIP dinner、舞台内容", "与 Athens/Prague 打包谈三城或类别独家；要求 Dubai 受众预测", "未联系", "", "", "", verifiedOn, "https://seo-on-stage.com/"],
  ["A-立即联系", "SMX Munich", "欧洲", "德国 / Munich", "2027-04-06—07", "Partner 咨询开放", "Sandra Finlay / Rising Media", "exhibit@risingmedia.com；+49 (0)8151 556 6045", "https://smxmuenchen.de/en/partners/", "https://smxmuenchen.de/en/", "大型 DACH 搜索营销大会；企业、代理商、技术团队", "DACH 线索、闭门圆桌、德语内容、展位", "与 SMX Advanced Europe 一并询问跨场打包和复购优惠", "未联系", "", "", "", verifiedOn, "https://smxmuenchen.de/en/partners/"],
  ["A-立即联系", "Ahrefs Evolve Singapore", "亚太", "新加坡", "2027-04-14—15", "2027 已公布；可提早联系", "Ahrefs Events", "events@ahrefs.com；官网 Sponsor 表", "https://ahrefsevolve.com/singapore/", "https://ahrefsevolve.com/singapore/", "亚太国际 SEO/内容营销从业者；Ahrefs 核心社群", "联合研究、数据内容、技术 workshop、区域市场", "邮件 + Sponsor 表；提前问 2027 inventory、非竞品限制和内容合作", "未联系", "", "", "", verifiedOn, "https://ahrefsevolve.com/singapore/"],
  ["B-重点培育", "Phuket AI Marketing Summit", "亚太", "泰国 / Phuket", "2027-04-22—24", "赞助入口开放", "Summit Team", "support@phuketsummit.com", "https://phuketsummit.com/", "https://phuketsummit.com/", "预计 300+；AI Marketing、SEO、创业者", "AI Search 产品体验、Workshop、创始人网络", "先确认受众中 SEO/Agency/Founder 比例，再决定赞助层级", "未联系", "", "", "", verifiedOn, "https://phuketsummit.com/"],
  ["A-立即联系", "International Search Summit Barcelona", "欧洲", "西班牙 / Barcelona", "2027-05-13", "Request details 开放", "TransPerfect Digital", "官网 Request Details 表", "https://www.transperfectdigital.com/events/international-search-summit-barcelona/", "https://www.transperfectdigital.com/events/international-search-summit-barcelona/", "国际化、多语言 SEO/SEM；跨国品牌与机构", "多语言案例、国际 SEO 数据、市场进入方案", "提交 sponsor/media partner 表；突出跨语言/跨市场价值，不只谈流量", "未联系", "", "", "", verifiedOn, "https://www.transperfectdigital.com/events/international-search-summit-barcelona/"],
  ["B-重点培育", "SEO On Stage — Prague", "欧洲", "捷克 / Prague", "2027-06-01—03", "早期赞助窗口", "Black Lantern Marketing", "seo-on-stage@black-lantern.com", "https://seo-on-stage.com/", "https://seo-on-stage.com/", "三城系列中欧收官场；精品体验型活动", "三城联名、品牌体验、内容录制、VIP dinner", "和 Athens/Dubai 统一谈套餐；要求每城预计规模与权益交付节奏", "未联系", "", "", "", verifiedOn, "https://seo-on-stage.com/"],
  ["B-重点培育", "Croatia SEO Summit", "欧洲", "克罗地亚 / Šibenik", "2027-06-14—16", "Sponsor 咨询开放", "Canonical.hr", "info@canonical.hr", "https://croatiaseosummit.com/become-a-sponsor/", "https://croatiaseosummit.com/", "约 180 名资深 SEO Operator；精品深度交流", "专家 workshop、闭门交流、产品反馈小组", "强调高质量对话与产品共创；不以单纯曝光为 KPI", "未联系", "", "", "", verifiedOn, "https://croatiaseosummit.com/become-a-sponsor/"],
  ["B-重点培育", "The Masterminders", "欧洲", "英国 / Manchester", "2027-06（日期待定）", "可咨询 2027", "The Masterminders Team", "info@themasterminders.com", "https://themasterminders.com/pages/sponsors", "https://themasterminders.com/", "250+；约 75% 有购买决策/影响力；联盟、外链、代理商", "高触达精品赞助、Mastermind、晚宴、产品反馈", "邮件强调受众匹配；准备说明为什么品牌适合其选择性赞助体系", "未联系", "", "", "", verifiedOn, "https://themasterminders.com/pages/sponsors"],
  ["B-重点培育", "Friends of Search", "欧洲", "荷兰 / Amsterdam", "2027 待发布（上一届 2026-03-12）", "提前锁定下一届", "DDMA Sponsorship", "sponsoring@ddma.nl", "https://friendsofsearch.com/", "https://friendsofsearch.com/", "700+ 访客；荷比卢 SEO/PPC 社群", "Benelux 市场、案例内容、展位、会员/社区", "现在发 interest email，要求加入 2027 sponsor release list", "未联系", "", "", "", verifiedOn, "https://friendsofsearch.com/"],
  ["B-重点培育", "SEO Estonia", "欧洲", "爱沙尼亚 / Tallinn", "2027 待发布（上一届 2026-07-09—11）", "下一届待发布", "SEO Estonia Team", "support@seoestonia.com", "https://seoestonia.com/", "https://seoestonia.com/", "精品高级 SEO、联盟、Agency/Operator 人群", "工具实测、联盟/技术案例、Mastermind", "联系团队加入 2027 priority list；先问往届 sponsor renewal 时间", "未联系", "", "", "", verifiedOn, "https://seoestonia.com/"],
  ["B-重点培育", "SEO Vibes Summit", "欧洲", "波兰 / Zakopane", "2027 待发布（上一届 2026-05-20—22）", "巡回/下一届待发布", "Aleksandra Smętkiewicz / WhitePress", "aleksandra.smetkiewicz@whitepress.com；seovibes@whitepress.com", "https://www.whitepress.com/en/seo-vibes-summit", "https://www.whitepress.com/en/seo-vibes-summit", "国际 SEO 社群；品牌在多国运营 On Tour 系列", "多市场巡回合作、媒体伙伴、内容/晚宴", "询问 2027 Summit + On Tour 全年日历，争取多站组合价", "未联系", "", "", "", verifiedOn, "https://www.whitepress.com/en/seo-vibes-summit"],
  ["A-立即联系", "SEO Mastery Summit Saigon", "亚太", "越南 / Ho Chi Minh City", "2027 待发布（上一届 2026-03-10—13）", "下一届预热窗口", "SEO Mastery Summit Team", "官网 Become Sponsor / Support 表", "https://seomasterysummit.com/sponsors/", "https://seomasterysummit.com/", "400+；SEO、AI、Agency、Founder、联盟营销", "产品演示、Agency playbook、VIP networking、联合案例", "通过 Sponsor 表抢 2027 waitlist；问受众构成、独家类别与续约节点", "未联系", "", "", "", verifiedOn, "https://seomasterysummit.com/sponsors/"],
  ["B-重点培育", "Search AfriCon", "非洲", "尼日利亚 / Lagos；肯尼亚场待定", "2026 Kenya 待发布；2027 待定", "Search AfriCon Team", "support@searchafricon.com", "https://searchafricon.com/be-a-sponsor-2/", "https://searchafricon.com/", "非洲搜索营销社群；2026 Lagos 约 250+", "非洲市场进入、人才/教育、奖学金、社区合作", "先确认 Kenya 场日期与赞助开放状态；以教育/生态投入切入", "未联系", "", "", "", verifiedOn, "https://searchafricon.com/be-a-sponsor-2/"],
  ["B-重点培育", "SEOcamp Buenos Aires", "拉美", "阿根廷 / Buenos Aires", "2027 待发布（上一届 2026-03-12）", "下一届待发布", "Eleven Agency / SEOcamp", "官网 Sponsor 表", "https://eleven.agency/seocamp/", "https://eleven.agency/seocamp/", "西语 SEO 社群；拉美市场与本地从业者", "西语内容、区域渠道、奖学金、案例分享", "填 Sponsor 表并要求加入 2027 通知；准备西语版简介与案例", "未联系", "", "", "", verifiedOn, "https://eleven.agency/seocamp/"],
];

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const tracker = workbook.worksheets.add("Conference Tracker");
const playbook = workbook.worksheets.add("Outreach Playbook");

const colors = {
  navy: "#102A43",
  teal: "#0F766E",
  tealLight: "#DDF4F1",
  blue: "#2563EB",
  blueLight: "#E8F0FE",
  orange: "#C2410C",
  orangeLight: "#FFF1E6",
  green: "#166534",
  greenLight: "#DCFCE7",
  amber: "#A16207",
  amberLight: "#FEF3C7",
  red: "#B91C1C",
  redLight: "#FEE2E2",
  gray100: "#F5F7FA",
  gray200: "#E5E7EB",
  gray500: "#64748B",
  white: "#FFFFFF",
};

function setTitle(sheet, range, title) {
  range.merge();
  range.values = [[title]];
  range.format = {
    fill: colors.navy,
    font: { bold: true, color: colors.white, size: 20 },
    verticalAlignment: "center",
    horizontalAlignment: "left",
  };
}

function mergeWrite(sheet, a1, value, format = {}) {
  const range = sheet.getRange(a1);
  range.merge();
  range.values = [[value]];
  range.format = { wrapText: true, verticalAlignment: "top", ...format };
  return range;
}

// Dashboard
dashboard.showGridLines = false;
setTitle(dashboard, dashboard.getRange("A1:P2"), "Global SEO Conference Outreach Radar — 非美国场次");
mergeWrite(dashboard, "A3:P4", "截至 2026-09-02｜仅收录仍活跃、可从官方渠道联系的会议。A = 现在就联系；B = 重点培育；名单按近期场次与下一届窗口排列。", {
  fill: colors.gray100,
  font: { color: colors.gray500, size: 11 },
  verticalAlignment: "center",
});

const lastDataRow = 5 + conferences.length;
const priorityRange = `'Conference Tracker'!$A$6:$A$${lastDataRow}`;
const statusRange = `'Conference Tracker'!$N$6:$N$${lastDataRow}`;
const confRange = `'Conference Tracker'!$B$6:$B$${lastDataRow}`;

const cards = [
  ["A6:D6", "A7:D8", "A-立即联系", `=COUNTIF(${priorityRange},"A-立即联系")`, colors.redLight, colors.red],
  ["E6:H6", "E7:H8", "B-重点培育", `=COUNTIF(${priorityRange},"B-重点培育")`, colors.amberLight, colors.amber],
  ["I6:L6", "I7:L8", "全部会议", `=COUNTA(${confRange})`, colors.blueLight, colors.blue],
  ["M6:P6", "M7:P8", "尚未联系", `=COUNTIF(${statusRange},"未联系")`, colors.tealLight, colors.teal],
];
for (const [labelRange, valueRange, label, formula, fill, fontColor] of cards) {
  mergeWrite(dashboard, labelRange, label, { fill, font: { bold: true, color: fontColor, size: 11 }, horizontalAlignment: "center", verticalAlignment: "center" });
  const value = dashboard.getRange(valueRange);
  value.merge();
  value.formulas = [[formula]];
  value.format = { fill, font: { bold: true, color: fontColor, size: 22 }, horizontalAlignment: "center", verticalAlignment: "center" };
}

mergeWrite(dashboard, "A10:H11", "优先顺序：临近 2026 场次先抢剩余权益；2027 已公布场次提前谈独家类别；日期待定的系列活动进入季度 nurture。", {
  fill: colors.orangeLight,
  font: { bold: true, color: colors.orange, size: 11 },
  verticalAlignment: "center",
});
mergeWrite(dashboard, "I10:P11", "建议先用“小而具体”的合作概念开场：联合数据报告、实操 Workshop、VIP 圆桌、社区奖学金或本地化案例，比泛泛问价更容易获得回复。", {
  fill: colors.tealLight,
  font: { bold: true, color: colors.teal, size: 11 },
  verticalAlignment: "center",
});

dashboard.getRange("A13:H13").merge();
dashboard.getRange("A13:H13").values = [["首轮外联 Shortlist"]];
dashboard.getRange("A13:H13").format = { fill: colors.teal, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" };
const shortlistHeaders = [["优先级", "会议", "地点 / 日期", "最佳入口", "首封切入", "建议时点", "状态", "备注"]];
dashboard.getRange("A14:H14").values = shortlistHeaders;
dashboard.getRange("A14:H14").format = { fill: colors.navy, font: { bold: true, color: colors.white }, wrapText: true, verticalAlignment: "center" };
const shortlist = [
  ["A", "Shenzhen SEO Conference", "深圳｜2026-09-14—18", "Sponsor 表 + 微信", "剩余套餐 / 2027 优先权", "今天", "未联系", "中国本地，响应链路短"],
  ["A", "SMX Advanced Europe", "柏林｜2026-09-29—10-01", "Sandra / exhibit@risingmedia.com", "定制圆桌或演示", "24 小时内", "未联系", "先电话确认库存"],
  ["A", "brightonSEO UK", "Brighton｜2026-10-08—09", "dre@roughagenda.com", "UK sponsor pack", "本周", "未联系", "规模最大之一"],
  ["A", "Semrush Spotlight", "伦敦｜2026-10-13", "Sponsor Typeform", "高层圆桌 / 联合研究", "本周", "未联系", "资深营销人密度高"],
  ["A", "Chiang Mai SEO", "清迈｜2026-11-09—13", "contact@chiangmaiseoconference.com", "VIP / Founder activation", "本周", "未联系", "创始人/决策者多"],
  ["A", "MozCon London", "伦敦｜2026-11-13", "MozCon 官网入口", "内容 / 社区合作", "7 天内", "未联系", "先确认开放合作类型"],
  ["A", "FOUND Tokyo", "东京｜2027-02-18—19", "support-jp@demandsphere.com", "日英双语社区伙伴", "本月", "未联系", "日本本地化价值高"],
  ["A", "Search Marketing Summit", "悉尼｜2027-02-23—26", "marketing@searchmarketingsummit.com.au", "澳新案例 / Workshop", "本月", "未联系", "20 年品牌"],
  ["A", "Sydney SEO Conference", "悉尼｜2027-03-11—12", "hello@prosperitymedia.com.au", "Mastermind / 精品赞助", "本月", "未联系", "可与澳洲行程联动"],
  ["A", "SERP Conf Sofia", "Sofia｜2027-03-24—25", "Sponsor 表", "东欧渠道 / 案例", "30 天内", "未联系", "东欧覆盖"],
  ["A", "Ahrefs Evolve Singapore", "新加坡｜2027-04-14—15", "events@ahrefs.com", "联合研究 / 技术内容", "本月", "未联系", "亚太国际受众"],
  ["A", "International Search Summit", "Barcelona｜2027-05-13", "Request Details 表", "多语言 / 国际 SEO", "30 天内", "未联系", "跨境品牌高度匹配"],
];
dashboard.getRange(`A15:H${14 + shortlist.length}`).values = shortlist;
dashboard.getRange(`A15:H${14 + shortlist.length}`).format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: colors.gray200 } };
dashboard.getRange(`A15:A${14 + shortlist.length}`).format = { fill: colors.redLight, font: { bold: true, color: colors.red }, horizontalAlignment: "center" };
dashboard.getRange(`A15:H${14 + shortlist.length}`).format.rowHeight = 38;

dashboard.getRange("J13:K13").values = [["区域", "会议数"]];
dashboard.getRange("J13:K13").format = { fill: colors.navy, font: { bold: true, color: colors.white } };
dashboard.getRange("J14:J19").values = [["欧洲"], ["亚太"], ["北美（非美国）"], ["中东"], ["非洲"], ["拉美"]];
dashboard.getRange("K14:K19").formulas = [
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"欧洲")+COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"欧洲/中东")`],
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"亚太")`],
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"北美（非美国）")`],
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"中东")+COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"欧洲/中东")`],
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"非洲")`],
  [`=COUNTIF('Conference Tracker'!$C$6:$C$${lastDataRow},"拉美")`],
];
dashboard.getRange("J14:K19").format = { borders: { preset: "all", style: "thin", color: colors.gray200 }, horizontalAlignment: "center" };
const regionChart = dashboard.charts.add("bar", dashboard.getRange("J13:K19"));
regionChart.title = "非美国会议区域分布";
regionChart.hasLegend = false;
regionChart.setPosition("J21", "P35");

mergeWrite(dashboard, "A29:H29", "你原始清单的校正", { fill: colors.navy, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
const corrections = [
  ["SMX Advanced", "美国 + 欧洲；非美国优先联系 Berlin 场（2026-09-29—10-01）"],
  ["brightonSEO", "英国 + 美国；非美国优先联系 Brighton UK 场（2026-10-08—09）"],
  ["Ahrefs Evolve", "美国 + 新加坡；新加坡下一场已公布为 2027-04-14—15"],
  ["MozCon", "现在是 roadshow，含 NYC 与 London；非美国目标为 London 2026-11-13"],
  ["Search SEOul", "官方拼写为 Search SEOul；2026-09-01—04 正在举行，建议直接谈 2027"],
];
dashboard.getRange("A30:B34").values = corrections;
dashboard.getRange("A30:A34").format = { fill: colors.blueLight, font: { bold: true, color: colors.blue } };
dashboard.getRange("A30:B34").format.wrapText = true;
dashboard.getRange("A30:B34").format.borders = { preset: "all", style: "thin", color: colors.gray200 };
dashboard.getRange("A30:B34").format.rowHeight = 34;

dashboard.getRange("A1:P35").format.font = { name: "Aptos", size: 10 };
dashboard.getRange("A1:P2").format.font = { name: "Aptos Display", size: 20, bold: true, color: colors.white };
for (const [col, width] of [["A",16],["B",24],["C",20],["D",22],["E",22],["F",18],["G",14],["H",24],["I",15],["J",18],["K",14],["L",14],["M",15],["N",15],["O",15],["P",15]]) {
  dashboard.getRange(`${col}:${col}`).format.columnWidth = width;
}
dashboard.getRange("1:2").format.rowHeight = 30;
dashboard.getRange("3:4").format.rowHeight = 22;
dashboard.getRange("6:8").format.rowHeight = 24;
dashboard.freezePanes.freezeRows(4);

// Tracker
tracker.showGridLines = false;
setTitle(tracker, tracker.getRange("A1:S2"), "Conference Tracker — 官方联系方式、优先级与跟进状态");
mergeWrite(tracker, "A3:S3", "使用方法：从 A 类开始；外联后更新 N–Q 列。所有邮箱与入口均来自官方页面或官方组织方信息；“表单优先”表示邮箱未在官网明文公开。", {
  fill: colors.gray100,
  font: { color: colors.gray500, size: 10 },
  verticalAlignment: "center",
});
const headers = [["优先级", "会议", "区域", "国家 / 城市", "下一场 / 最近场日期", "时间状态", "官方联系人 / 团队", "邮箱 / 电话 / 联系方式", "赞助 / 合作入口", "官方网站", "规模 / 受众", "推荐切入点", "建议下一步", "外联状态", "负责人", "上次联系", "下次跟进", "核验日期", "信息来源"]];
tracker.getRange("A5:S5").values = headers;
tracker.getRange("A5:S5").format = {
  fill: colors.navy,
  font: { bold: true, color: colors.white, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
  horizontalAlignment: "center",
  borders: { preset: "all", style: "thin", color: colors.white },
};
tracker.getRange(`A6:S${lastDataRow}`).values = conferences;
tracker.getRange(`A6:S${lastDataRow}`).format = {
  wrapText: true,
  verticalAlignment: "top",
  font: { name: "Aptos", size: 9 },
  borders: { preset: "all", style: "thin", color: colors.gray200 },
};
tracker.getRange(`A6:S${lastDataRow}`).format.rowHeight = 66;
tracker.getRange(`A6:A${lastDataRow}`).format.font = { bold: true };
tracker.getRange(`I6:J${lastDataRow}`).format.font = { color: colors.blue, size: 9 };
tracker.getRange(`S6:S${lastDataRow}`).format.font = { color: colors.blue, size: 9 };
tracker.getRange(`R6:R${lastDataRow}`).format.horizontalAlignment = "center";
tracker.getRange(`N6:N${lastDataRow}`).dataValidation = { rule: { type: "list", values: ["未联系", "研究中", "已联系", "跟进中", "谈判中", "已成交", "不适合"] } };
tracker.getRange(`A6:A${lastDataRow}`).dataValidation = { rule: { type: "list", values: ["A-立即联系", "B-重点培育", "C-观察"] } };
tracker.getRange(`A6:A${lastDataRow}`).conditionalFormats.add("containsText", { text: "A-立即联系", format: { fill: colors.redLight, font: { bold: true, color: colors.red } } });
tracker.getRange(`A6:A${lastDataRow}`).conditionalFormats.add("containsText", { text: "B-重点培育", format: { fill: colors.amberLight, font: { bold: true, color: colors.amber } } });
tracker.getRange(`N6:N${lastDataRow}`).conditionalFormats.add("containsText", { text: "已联系", format: { fill: colors.blueLight, font: { bold: true, color: colors.blue } } });
tracker.getRange(`N6:N${lastDataRow}`).conditionalFormats.add("containsText", { text: "跟进中", format: { fill: colors.greenLight, font: { bold: true, color: colors.green } } });
tracker.getRange(`N6:N${lastDataRow}`).conditionalFormats.add("containsText", { text: "已成交", format: { fill: colors.greenLight, font: { bold: true, color: colors.green } } });
const trackerTable = tracker.tables.add(`A5:S${lastDataRow}`, true, "SEOConferenceTracker");
trackerTable.style = "TableStyleMedium2";
trackerTable.showBandedColumns = false;
trackerTable.showFilterButton = true;
const trackerWidths = [
  ["A",14],["B",29],["C",14],["D",20],["E",23],["F",23],["G",24],["H",37],["I",43],["J",38],
  ["K",43],["L",43],["M",45],["N",14],["O",14],["P",14],["Q",14],["R",12],["S",42],
];
for (const [col, width] of trackerWidths) tracker.getRange(`${col}:${col}`).format.columnWidth = width;
tracker.getRange("1:2").format.rowHeight = 30;
tracker.getRange("3:3").format.rowHeight = 34;
tracker.getRange("5:5").format.rowHeight = 44;
tracker.freezePanes.freezeRows(5);
tracker.freezePanes.freezeColumns(2);

// Outreach Playbook
playbook.showGridLines = false;
setTitle(playbook, playbook.getRange("A1:H2"), "Outreach Playbook — SEO Conference 主动联系模板");
mergeWrite(playbook, "A3:H4", "核心原则：不要只问“赞助多少钱”。首封就给一个与该会议受众匹配的具体合作点，并索要 sponsor deck、剩余 inventory、参会者画像、截止期、独家类别限制与可量化交付。", {
  fill: colors.gray100,
  font: { color: colors.gray500, size: 11 },
  verticalAlignment: "center",
});

mergeWrite(playbook, "A6:H6", "推荐外联节奏", { fill: colors.teal, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
playbook.getRange("A7:D7").values = [["时间", "动作", "目标", "注意事项"]];
playbook.getRange("A7:D7").format = { fill: colors.navy, font: { bold: true, color: colors.white } };
playbook.getRange("A8:D12").values = [
  ["Day 0", "个性化首封邮件 / 官方表单", "拿到 deck、库存、deadline", "提 1 个具体合作概念；100–150 词"],
  ["Day 2–3", "LinkedIn 或电话轻跟进", "确认邮件到达负责人", "补一句与你们目标市场的匹配点"],
  ["Day 7", "价值型跟进", "推动 15 分钟 call", "附一页 activation 草案或相关案例"],
  ["Day 14", "关闭循环", "得到 yes / later / no", "给出两个明确合作选项与截止日"],
  ["季度", "日期待定大会 nurture", "进入下一届第一批 sponsor", "分享行业数据、内容或社区资源，不反复催价"],
];
playbook.getRange("A7:D12").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: colors.gray200 } };
playbook.getRange("A8:A12").format = { fill: colors.blueLight, font: { bold: true, color: colors.blue } };
playbook.getRange("A8:D12").format.rowHeight = 42;

mergeWrite(playbook, "A14:H14", "Template 1 — Sponsorship / Partnership（英文）", { fill: colors.navy, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
mergeWrite(playbook, "A15:H15", "Subject: Partnership idea for {Conference} — {Brand} × {Audience}", { fill: colors.blueLight, font: { bold: true, color: colors.blue }, verticalAlignment: "center" });
mergeWrite(playbook, "A16:H23", `Hi {First name},\n\nI’m {Name} from {Brand}. We help {specific audience} achieve {specific outcome}. I’m reaching out because {Conference}’s focus on {one concrete theme / audience trait} closely matches the people we support in {region}.\n\nRather than a standard logo placement, we’d like to explore {one activation: a data-led workshop / VIP roundtable / practical product lab / community scholarship}. We can contribute {proof: proprietary data, expert, customer case study, local-language support, or community reach}.\n\nAre you still accepting sponsors, media partners, or community partners for {edition}? If so, could you share the current deck, remaining inventory, attendee role/company breakdown, deadlines, and any category-exclusivity rules?\n\nHappy to send a one-page concept or jump on a 15-minute call next week.\n\nBest,\n{Name}\n{Title} | {Brand}\n{Website} | {LinkedIn}`, {
  fill: colors.gray100,
  font: { color: colors.navy, size: 10 },
});
playbook.getRange("A16:H23").format.rowHeight = 32;

mergeWrite(playbook, "A25:H25", "Template 2 — Speaking / Case Study（不要写成产品推销）", { fill: colors.teal, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
mergeWrite(playbook, "A26:H31", `Subject: Case-study proposal for {Conference}: {specific result}\n\nHi {First name},\n\nWe recently {did a specific thing} and saw {measurable result} across {sample / market}. I’d like to propose a practical session for {Conference}: “{narrow, non-promotional title}.”\n\nAttendees would leave with: (1) {framework}, (2) {real data / failure lessons}, and (3) {repeatable checklist}. The session would use anonymized examples and no product demo.\n\nIf the agenda is already closed, we’d also be open to a workshop, roundtable, or content partnership. What format is still available?\n\nBest,\n{Name}`, {
  fill: colors.gray100,
  font: { color: colors.navy, size: 10 },
});
playbook.getRange("A26:H31").format.rowHeight = 34;

mergeWrite(playbook, "A33:H33", "Template 3 — Community / Media Partnership（预算较小时）", { fill: colors.orange, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
mergeWrite(playbook, "A34:H39", `Subject: Community partnership idea for {Conference}\n\nHi {First name},\n\n{Brand / Community} reaches {audience + region}. We’d like to support {Conference} through a value exchange rather than a standard booth: {newsletter feature / speaker interview / localized recap / ticket scholarship / community meetup}.\n\nIn return, we’d be looking for {partner listing / ticket allocation / content access / attendee discount / on-site interview permission}. If this is relevant, could you share your media/community partner options and deadlines?\n\nBest,\n{Name}`, {
  fill: colors.gray100,
  font: { color: colors.navy, size: 10 },
});
playbook.getRange("A34:H39").format.rowHeight = 34;

mergeWrite(playbook, "A41:H41", "首封邮件发送前的 8 个个性化字段", { fill: colors.navy, font: { bold: true, color: colors.white, size: 13 }, verticalAlignment: "center" });
playbook.getRange("A42:D45").values = [
  ["1. 对方名字", "2. 具体场次与日期", "3. 一个受众特征", "4. 一个主题或议题"],
  ["5. 你能贡献的资产", "6. 想要的合作形式", "7. 区域市场价值", "8. 明确下一步与时间"],
  ["不要群发 Dear Team", "不要复制同一段大会介绍", "不要只写品牌曝光", "不要把演讲提案写成 Demo"],
  ["最好 100–150 词", "一封只提 1 个主概念", "附 1 页而非 20 页 Deck", "7 天内至少两次跟进"],
];
playbook.getRange("A42:D45").format = { wrapText: true, verticalAlignment: "center", horizontalAlignment: "center", borders: { preset: "all", style: "thin", color: colors.gray200 } };
playbook.getRange("A42:D43").format.fill = colors.tealLight;
playbook.getRange("A44:D45").format.fill = colors.orangeLight;
playbook.getRange("A42:D45").format.rowHeight = 38;

for (const [col, width] of [["A",22],["B",26],["C",26],["D",30],["E",18],["F",18],["G",18],["H",18]]) {
  playbook.getRange(`${col}:${col}`).format.columnWidth = width;
}
playbook.getRange("1:2").format.rowHeight = 30;
playbook.getRange("3:4").format.rowHeight = 22;
playbook.freezePanes.freezeRows(4);

const inspection = await workbook.inspect({
  kind: "workbook,sheet,table,formula",
  maxChars: 9000,
  tableMaxRows: 5,
  tableMaxCols: 8,
  options: { maxResults: 80 },
});
console.log(inspection.ndjson ?? inspection);

for (const sheetName of ["Dashboard", "Conference Tracker", "Outreach Playbook"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  const filename = sheetName.toLowerCase().replace(/ /g, "_");
  await fs.writeFile(`${outputDir}/${filename}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(JSON.stringify({ outputPath, rows: conferences.length, sheets: 3 }));
