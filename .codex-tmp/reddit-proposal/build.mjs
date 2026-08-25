import fs from 'node:fs/promises';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const base = '/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/.codex-tmp/reddit-proposal';
const out = '/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/ofox-reddit-campaign-proposal.pptx';

const copy = [
  ['30 Posts · 10 Days','Reddit Campaign Proposal','oFox.ai Reddit\nCampaign Strategy','Model launches. Price proof. Real tests.','Turn every new model release into a credible Reddit conversation.'],
  ['Reddit 是 AI 模型选择与 API 采购决策的前线','开发者会在 Reddit 搜索“哪个模型更好”“API 网关是否加价”“真实跑分如何”。这类讨论发生在需求形成阶段，比品牌广告更接近实际切换与采购。','目标不是重复产品卖点，而是持续提供可复现的测试、透明价格与真实失败案例，让 oFox.ai 成为模型发布当天就能被引用的实测来源。','4 类','核心内容钩子','3+','必投垂直社区','10 天','首轮 campaign','30','主贴','持续','模型发布雷达'],
  ['我们的优势不是“更便宜”一句话，而是三种可验证证据','证据 1 — OpenRouter 成本对照','以同一模型、同一 token 用量比较最终到账成本。OpenRouter 公示信用卡充值费 5.5%；oFox.ai 主张官方模型价直通、无充值加价。每帖附计算条件与日期。','证据 2 — Wan 3.0 热点实测','发布原 prompt、参数、生成时间、成本与结果： “I tested this prompt on Wan 3.0 on oFox.ai — here’s what I got.” 让用户先评结果，再自然发现入口。','证据 3 — 同题模型对比','复用 AiHubMix 的形式：同一 prompt、同一 gateway，比较成本、首轮成功率与返工次数；不只报 benchmark，报告完成任务的总成本。','证据 4 — 发布日抢跑','建立 Gemini、Kimi、DeepSeek、Qwen、Wan 等模型监测清单；上线后 24 小时内完成可复现实测，48 小时内发布多社区版本。'],
  ['X 上的对比格式已经证明：价格与可靠性必须一起讲','5×','DeepSeek V4 Flash 0731 更便宜','AiHubMix 单次测试：$0.02','$0.10','GPT-5.6 Luna 成本','但首轮完成且结果更可靠','1 vs 3','完成所需尝试次数','可靠性会改变“真实总成本”','同题','Same prompt','避免 benchmark 口水战','同网关','Same gateway','控制变量，结果更可信','结论','不要只做“最便宜”叙事','oFox.ai 应提供价格、成功率、延迟与返工次数四维证据','来源：AiHubMix X 帖（2026-08-25 核实）','— AIHubMix, X'],
  ['Reddit 用户会奖励透明实测，不会奖励包装后的广告','每篇主贴都提供 prompt、参数、模型版本、时间戳和费用；标题先说结论，正文展示过程，链接与品牌信息放在用户明确询问之后。','01','可复现优先','提供完整测试条件和失败样本。让读者能在任意 gateway 重跑；oFox.ai 的优势由结果自然得出。','02','承认边界','OpenRouter 可能在生态、路由或覆盖面上有优势；不要声称所有模型都更贵，只比较有截图与账单依据的场景。','03','社区原生','同一测试按社区改写：Gemini 用户看质量，LLMDevs 看 API/延迟，Kimi 用户看上下文与 agent 任务。'],
  ['r/GeminiAI — 用新版本实测切入高热度模型讨论','社区画像','受众：Gemini 重度用户、创作者、开发者与评测爱好者','当前热点：Gemini 3.7 Flash 体验、Beyond the Benchmark、真实用例','推广风险：产品直链容易被视为广告；结果图与方法论更安全','最佳形式：原生结果图 + prompt + “你们会怎么改？”','备选方案','若主贴被移除，改为对现有 Gemini 3.7 讨论做深度评论；不放链接，只回答复现条件。','推荐内容方向','内容 1 — 版本首测（Post）','“I ran the same real-world prompt on Gemini 3.7 Flash and [model] — the cheaper run wasn’t the winner.”','策略：用成功率、延迟、token 与最终成本解释差异。','内容 2 — 图像/视频挑战（Post）','“One prompt, three attempts: what Gemini fixed — and what it still missed.”','策略：公开失败轮次，邀请社区给改进 prompt。','内容 3 — 高价值评论（Comment）','场景：新版本体验、限额、API 价格、模型退化讨论；提供可复现数据，不做品牌口号。'],
  ['r/LLMDevs — 技术可信度最高，但必须零营销味','社区画像','受众：LLM 工程师、研究者、agent/infra 开发者','当前规则：明确反自我推广、反营销；未经批准的 promotion 风险高','适合内容：网关成本、失败分类、重试策略、延迟与可观测性','核心指标：TTFT、总延迟、成功率、重试、每个成功任务成本','备选方案','先联系 mod 审批；若不获批，只以非品牌技术帖或高质量评论参与，并将代码/数据置于中立仓库。','推荐内容方向','内容 1 — 失败分类（Post）','“I stopped treating every failed agent tool call as the same failure — here’s the retry matrix.”','策略：复用社区当前话题，把 gateway 价值嵌入工程方法。','内容 2 — 网关对照（Post）','“Same model, two gateways: fee, latency and retry-cost breakdown.”','策略：列出时间、区域、样本量与限制，不下泛化结论。','内容 3 — Mod-approved AMA / Comment','场景：模型上线与 API 变更讨论；以工程师身份回答接入、路由与账单问题。'],
  ['r/kimi + 模型垂直社区 — 在发布日承接最强搜索意图','社区画像','受众','Kimi 用户、agent 构建者、长上下文与办公工作流用户','当前热点','Kimi K3 发布、Kimi Work、credential / agent 安全讨论','推广政策','品牌发布可见度高，但需要明确身份与真实技术细节','优先发布实测与教程，不做功能清单','核心关注点','长任务完成率、工具调用、安全边界、价格','首轮成功率与返工次数','备选方案','同步布局 r/LocalLLaMA、r/ArtificialInteligence、r/StableDiffusion、r/singularity；按模型类型选择，不机械群发。','内容 1 — Kimi K3 真实任务（Post）','“I gave Kimi K3 a 30-minute research-to-slides task — full prompt, cost and failure points.”','策略：贴出任务分解、工具调用和最终交付物。','内容 2 — Wan 3.0 热点实测（Post）','“I tested this prompt on Wan 3.0 on oFox.ai — here’s the result I got.”','策略：用视频/图片结果做第一屏，正文说明 prompt、seed、耗时与成本。','内容 3 — 安全/可靠性讨论','“When should an agent ask for credentials? A test matrix across Kimi and peers.”','策略：以安全边界建立专业信誉，再讨论 gateway 可观测性。'],
  ['四类内容钩子，把每次模型发布变成一轮自然讨论','社区画像','钩子','① 价格账单对照：同模型、同用量、最终到账成本','证据','账单截图、充值费、token 计算','适配社区','r/LLMDevs、r/LocalLLaMA','表达方式','“Here is the math”','备选方案','任何“更便宜”结论必须带日期、模型 ID、区域与支付方式；数据变化后及时更新评论。','内容 1 — 热点首测（Post）','新模型上线 24 小时内：prompt + 原始结果 + 失败轮次','内容 2 — 同题擂台（Post）','同一任务比较 Wan / Gemini / Kimi / DeepSeek / GPT，报告每个成功任务成本','内容 3 — 购买决策（Post）','“Which gateway should I use?” 用透明维度表回答，不把所有人导向同一选择','评论策略','追踪热门帖子，在问题出现后 2 小时内提供数据型回答。'],
  ['30 个主贴分配：必投社区 + 可扩展模型社区','Subreddit','主贴','核心内容方向','r/GeminiAI','7','篇','Gemini 新版实测、图像/视频挑战','r/LLMDevs','5','篇','网关费用、延迟、失败分类（需 mod approval）','r/kimi','5','篇','Kimi K3、agent 任务、安全边界','r/LocalLLaMA + 模型社区','13','篇','DeepSeek/Qwen 对比、Wan 3.0 结果、发布日热点','合计','30','篇','覆盖 7+ 个核心版块'],
  ['首轮采用 10 天冲刺；后续由模型发布雷达持续供稿','10 天发布冲刺\n(Launch Sprint)','执行节奏','每天 2–3 篇，错开社区与账号；先技术价值，后品牌解释。每篇只在一个社区首发，其他社区重新写标题、证据顺序与讨论问题。','核心目的','快速找到三种可规模化内容：价格对照、热点实测、工程可靠性；用真实评论决定下一轮预算，而不是追求虚假热度。','模型发布雷达\n(Always-on)','监测清单','Gemini、Kimi、DeepSeek、Qwen、Wan、OpenAI、Claude；跟踪官方账号、模型页、API changelog 与社区置顶。','24/48 小时 SLA','24 小时完成测试；48 小时发布社区版本。预备：Gemini 3.7 Flash、Kimi K3、DeepSeek V4 Flash、GPT-5.6 Luna、Wan 3.0；发布前再次核实。'],
  ['合规与测量决定这套 campaign 能否持续','风险 1','“OpenRouter 一定更贵”被反驳','应对策略','只陈述已核实机制：OpenRouter 公示充值费；逐模型、逐支付方式比较，并标注时间。把“更贵”改写为可复现问题。','风险 2','r/LLMDevs 删除推广内容','应对策略','遵守反营销规则，优先申请 mod approval；品牌员工 Full Disclosure；不使用多账号伪装口碑。','风险 3','复制粘贴造成 spam 信号','应对策略','每个 subreddit 独立改写标题、证据与问题；不购买投票、不组织虚假评论、不进行自问自答操纵。','风险 4','只看 upvotes，无法证明业务价值','应对策略','核心 KPI：高质量评论率、收藏/分享、品牌搜索、oFox.ai referral、注册与首次 API 调用。周报按内容钩子复盘。']
];

const deck = await PresentationFile.importPptx(await FileBlob.load(`${base}/template-starter.pptx`));
for (let i=0; i<deck.slides.items.length; i++) {
  const slide = deck.slides.items[i];
  const inspected = await deck.inspect({kind:'textbox', include:'id,slide,text', maxChars:100000});
  const records = inspected.ndjson.trim().split('\n').map(line => JSON.parse(line)).filter(r => r.kind === 'textbox' && r.slide === i+1);
  if (records.length !== copy[i].length) throw new Error(`Slide ${i+1}: ${records.length} text shapes, ${copy[i].length} strings`);
  for (let j=0; j<records.length; j++) deck.resolve(records[j].id).text = copy[i][j];
  slide.speakerNotes.textFrame.setText(`[Sources]\n${[
    'https://ofox.ai/vs/openrouter',
    'https://openrouter.ai/pricing',
    'https://x.com/AiHubMix/status/2085260781705388444',
    'https://www.reddit.com/r/GeminiAI/',
    'https://www.reddit.com/r/LLMDevs/',
    'https://www.reddit.com/r/kimi/'
  ].join('\n')}\n[/Sources]`);
}
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(out);
for (let i=0; i<deck.slides.items.length; i++) {
  const slide = deck.slides.items[i];
  const png = await deck.export({slide, format:'png', scale:1});
  await fs.writeFile(`${base}/final-slide-${String(i+1).padStart(2,'0')}.png`, new Uint8Array(await png.arrayBuffer()));
  await fs.writeFile(`${base}/final-layout-${String(i+1).padStart(2,'0')}.json`, await (await slide.export({format:'layout'})).text());
}
const montage = await deck.export({format:'webp', montage:true, scale:1});
await fs.writeFile(`${base}/final-montage.webp`, new Uint8Array(await montage.arrayBuffer()));
