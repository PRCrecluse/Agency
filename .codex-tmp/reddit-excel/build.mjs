import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const outDir='/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/outputs/reddit-campaign';
const wb=Workbook.create();
const C={dark:'#055C4E',mint:'#57DDCA',navy:'#020817',cream:'#F7F5F0',white:'#FFFFFF',gray:'#E7ECEA',yellow:'#FFF2CC',red:'#F4CCCC'};
const sheets=['Campaign总览','Subreddit策略','30篇内容计划','模型发布雷达','10天排期','KPI与合规','Sources'].map(n=>wb.worksheets.add(n));
const [dash,subs,posts,radar,schedule,kpi,sources]=sheets;

function title(sheet, text, endCol){
  sheet.showGridLines=false; sheet.mergeCells(`A1:${endCol}2`); const r=sheet.getRange(`A1:${endCol}2`); r.values=[[text]]; r.format={fill:C.dark,font:{bold:true,color:C.white,size:20},verticalAlignment:'center',horizontalAlignment:'left'}; r.format.rowHeight=28;
}
function header(range){range.format={fill:C.navy,font:{bold:true,color:C.white},verticalAlignment:'center',wrapText:true,borders:{preset:'outside',style:'thin',color:'#C8D0CD'}}; range.format.rowHeight=32;}
function body(range){range.format={font:{color:'#17201E',size:10},verticalAlignment:'top',wrapText:true,borders:{insideHorizontal:{style:'thin',color:'#D9E1DE'},bottom:{style:'thin',color:'#D9E1DE'}}};}
function widths(sheet, map){for(const [col,w] of Object.entries(map)) sheet.getRange(`${col}:${col}`).format.columnWidth=w;}

title(dash,'oFox.ai Reddit Campaign — 执行总览','H');
dash.getRange('A4:B8').values=[['核心参数','数值'],['首轮主贴',30],['执行周期（天）',10],['必投社区',3],['内容钩子',4]];
header(dash.getRange('A4:B4')); body(dash.getRange('A5:B8')); dash.getRange('B5:B8').format.font={bold:true,color:C.dark,size:16};
dash.getRange('D4:H4').merge(); dash.getRange('D4:H4').values=[['Campaign 核心策略']]; header(dash.getRange('D4:H4'));
dash.getRange('D5:H8').merge(); dash.getRange('D5:H8').values=[['用“价格账单对照 + 新模型热点实测 + 同题模型对比 + 发布日抢跑”持续制造可引用的 Reddit 内容。OpenRouter 角度不使用无法证明的绝对化表述，而是比较同模型、同 token、同支付方式的最终成本；Wan 3.0 使用完整 prompt、参数、耗时、成本与原始结果。']]; body(dash.getRange('D5:H8'));
dash.getRange('A10:H10').values=[['内容支柱','核心问题','主要证据','首选社区','风险','执行原则','示例标题','状态']]; header(dash.getRange('A10:H10'));
dash.getRange('A11:H14').values=[
 ['价格对照','OpenRouter 是否造成更高最终成本？','充值费、账单、token 计算','r/LLMDevs','高','逐模型、逐支付方式、标日期','Same model, two gateways: fee and retry-cost breakdown','待制作'],
 ['Wan 3.0 实测','最新视频模型真实效果如何？','prompt、seed、耗时、结果','r/kimi / r/StableDiffusion','中','结果优先，品牌后置','I tested this prompt on Wan 3.0 on oFox.ai — here’s the result','待素材'],
 ['同题模型对比','便宜是否等于更低总成本？','成功率、重试、延迟、单次成本','r/GeminiAI / r/LocalLLaMA','中','控制变量，披露样本限制','Same prompt. Same gateway. Very different results.','可执行'],
 ['发布日抢跑','下一个新模型如何快速承接热度？','官方发布、API changelog、首测','全部模型垂直社区','低','24h 测试 / 48h 发布','[Model] just launched — here is the first real task test','持续']
]; body(dash.getRange('A11:H14')); widths(dash,{A:18,B:26,C:28,D:25,E:10,F:28,G:48,H:12}); dash.freezePanes.freezeRows(2);

title(subs,'Subreddit 策略与社区适配','K');
subs.getRange('A4:K4').values=[['优先级','Subreddit','受众','当前热点/讨论风格','适合内容','不适合内容','建议发帖形式','推广风险','备选路径','主贴数','来源']]; header(subs.getRange('A4:K4'));
subs.getRange('A5:K11').values=[
 [1,'r/GeminiAI','Gemini 用户、开发者、创作者','Gemini 3.7 Flash、Beyond the Benchmark、真实用例','版本首测、同题对比、图像/视频挑战','直接产品广告','原生结果图 + 完整 prompt + 讨论问题','中','深度评论现有新版本帖子',7,'https://www.reddit.com/r/GeminiAI/'],
 [1,'r/LLMDevs','LLM 工程师、研究者、agent 开发者','工程失败分类、API、延迟、可观测性','网关费用、重试成本、失败矩阵','未经批准的自我推广','mod-approved 技术帖 / 非品牌数据帖','高','先申请 mod；否则只做高价值评论',5,'https://www.reddit.com/r/LLMDevs/'],
 [1,'r/kimi','Kimi 用户、agent 与长上下文用户','Kimi K3、Kimi Work、agent 安全','Kimi K3 任务、工具调用、安全边界','空泛功能介绍','完整任务记录 + 失败点 + 成本',5,'同步 r/LocalLLaMA','中','https://www.reddit.com/r/kimi/'],
 [2,'r/LocalLLaMA','开源模型用户与开发者','DeepSeek、Qwen、开源权重与推理','同题对比、价格、部署与 API','闭源品牌软文','数据表 + 复现方法','中','r/ArtificialInteligence',5,'https://www.reddit.com/r/LocalLLaMA/'],
 [2,'r/StableDiffusion','图像/视频生成用户','Wan 等视觉模型、workflow、prompt','Wan 3.0 原始结果、参数和 workflow','仅放产品链接','媒体结果 + prompt + 参数','中','模型对应垂直版块',4,'https://www.reddit.com/r/StableDiffusion/'],
 [2,'r/singularity','AI 新品与行业趋势用户','模型发布与能力讨论','发布日首测、趋势解释','过度技术细节','结论先行 + 关键证据',4,'r/ArtificialInteligence','中','https://www.reddit.com/r/singularity/'],
 [3,'r/ArtificialInteligence','广泛 AI 用户','新模型、新闻、产品体验','跨模型比较、热点解释','硬广与重复新闻','新闻钩子 + 独立观点',3,'高','转为评论参与','https://www.reddit.com/r/ArtificialInteligence/']
]; body(subs.getRange('A5:K11')); widths(subs,{A:9,B:22,C:27,D:35,E:32,F:25,G:34,H:12,I:30,J:10,K:42}); subs.freezePanes.freezeRows(4); subs.getRange('A4:K11').format.rowHeight=55;

title(posts,'30 篇 Reddit 内容计划','M');
posts.getRange('A4:M4').values=[['ID','Day','Subreddit','内容支柱','帖子角度','英文标题草案','证据/素材','CTA/讨论问题','品牌披露','优先级','状态','负责人','备注']]; header(posts.getRange('A4:M4'));
const pools=[
 ['r/GeminiAI','同题模型对比',['Gemini 3.7 Flash vs [Model]: same real task, cost and retries','One prompt, three Gemini attempts: what changed?','The cheapest Gemini run was not the cheapest completed task']],
 ['r/LLMDevs','价格/工程',['Same model, two gateways: fee, latency and retry-cost breakdown','I stopped treating every failed tool call as the same failure','What gateway metrics actually predict agent task completion?']],
 ['r/kimi','Kimi 实测',['I gave Kimi K3 a 30-minute research-to-slides task','Kimi K3 tool calls: full failure log and cost','When should an agent ask for credentials? A Kimi test matrix']],
 ['r/LocalLLaMA','开源模型',['DeepSeek V4 Flash vs GPT-5.6 Luna: total cost per completed task','Qwen vs DeepSeek on the same agent workflow','Five cheap models, one real coding task']],
 ['r/StableDiffusion','Wan 3.0',['I tested this prompt on Wan 3.0 on oFox.ai — here’s the result','Wan 3.0: same prompt, three seeds, full timing','Where Wan 3.0 still breaks: an honest failure set']],
 ['r/singularity','发布日热点',['A new model launched today — here is the first real task test','Benchmark leader vs workflow winner: they were not the same','The 24-hour model launch test: quality, cost and reliability']]
];
const rows=[]; let id=1;
while(rows.length<30){const p=pools[(id-1)%pools.length]; const t=p[2][Math.floor((id-1)/pools.length)%p[2].length]; rows.push([id,((id-1)%10)+1,p[0],p[1],id%3===0?'失败样本与边界':id%3===1?'热点首测':'成本与可靠性',t,'原始输出、参数、时间、成本、失败轮次','你会如何修改 prompt / 你更看重哪个指标？','员工身份 Full Disclosure',id<=12?'P1':id<=24?'P2':'P3','待制作','','每个社区独立改写，禁止复制粘贴']); id++;}
posts.getRange(`A5:M${4+rows.length}`).values=rows; body(posts.getRange(`A5:M${4+rows.length}`)); posts.tables.add(`A4:M${4+rows.length}`,true,'ContentPlanTable'); posts.getRange('K5:K34').dataValidation={rule:{type:'list',values:['待制作','制作中','待审核','已排期','已发布','被删除']}}; posts.getRange('J5:J34').dataValidation={rule:{type:'list',values:['P1','P2','P3']}}; widths(posts,{A:7,B:7,C:21,D:19,E:22,F:55,G:35,H:35,I:24,J:10,K:12,L:15,M:35}); posts.freezePanes.freezeRows(4); posts.getRange('A5:M34').format.rowHeight=58;

title(radar,'模型发布雷达 — 24/48 小时响应机制','J');
radar.getRange('A4:J4').values=[['模型/厂商','状态','热点角度','建议测试任务','首选社区','24h 动作','48h 动作','验证要求','状态更新时间','来源']]; header(radar.getRange('A4:J4'));
radar.getRange('A5:J11').values=[
 ['Gemini 3.7 Flash','近期热点','速度/质量/价格','多模态真实任务','r/GeminiAI','确认 API 与模型 ID；跑 3 次','发布同题对比','发布前再次核实名称与可用性',new Date('2026-08-25'),'https://www.reddit.com/r/GeminiAI/'],
 ['Kimi K3','近期热点','agent、长任务、工具调用','research-to-slides','r/kimi','记录完整工具调用','发布任务复盘','发布前再次核实',new Date('2026-08-25'),'https://www.reddit.com/r/kimi/'],
 ['DeepSeek V4 Flash 0731','对比素材','低价格与重试成本','coding agent task','r/LocalLLaMA','复现 AiHubMix 测试','发布总成本对比','样本需扩充，避免泛化',new Date('2026-08-25'),'https://x.com/AiHubMix/status/2085260781705388444'],
 ['GPT-5.6 Luna','对比素材','首轮成功率与成本','coding agent task','r/LLMDevs','复现同题测试','发布可靠性分析','模型名称/访问渠道需复核',new Date('2026-08-25'),'https://x.com/AiHubMix/status/2085260781705388444'],
 ['Wan 3.0','核心素材','视频生成热点','同 prompt 三次生成','r/StableDiffusion','保存 prompt/seed/视频/成本','发布原始结果帖','必须使用真实 oFox.ai 测试结果',new Date('2026-08-25'),'用户提供测试方向'],
 ['Qwen 下一版本','监测','开源/推理/agent','代码或长上下文任务','r/LocalLLaMA','跟踪官方发布','首测 + 对比','以官方发布为准',new Date('2026-08-25'),'https://qwenlm.github.io/'],
 ['其他前沿模型','监测','发布日抢跑','按模型能力选择','对应垂直社区','官方确认后建测试单','48h 内社区定制发布','不得用传闻作为已发布事实',new Date('2026-08-25'),'官方模型页 / API changelog']
]; body(radar.getRange('A5:J11')); radar.getRange('I5:I11').setNumberFormat('yyyy-mm-dd'); widths(radar,{A:25,B:14,C:24,D:28,E:23,F:32,G:32,H:34,I:15,J:48}); radar.freezePanes.freezeRows(4); radar.getRange('A5:J11').format.rowHeight=60;

title(schedule,'10 天 Campaign 排期','H'); schedule.getRange('A4:H4').values=[['Day','主贴数','主社区','内容重点','素材截止','审核节点','发布状态','日度备注']]; header(schedule.getRange('A4:H4'));
const sched=Array.from({length:10},(_,i)=>[i+1,3,[['r/GeminiAI','r/LLMDevs','r/kimi'],['r/LocalLLaMA','r/StableDiffusion','r/singularity']][i%2].join(' / '),i<2?'基线实测与价格证据':i<6?'热点首测与同题对比':'优胜角度放大与复盘',`Day ${i+1} 10:00`,`Day ${i+1} 16:00`,'未开始','']); schedule.getRange('A5:H14').values=sched; body(schedule.getRange('A5:H14')); schedule.getRange('G5:G14').dataValidation={rule:{type:'list',values:['未开始','素材中','审核中','已排期','已完成']}}; widths(schedule,{A:8,B:10,C:38,D:34,E:18,F:18,G:14,H:40}); schedule.freezePanes.freezeRows(4); schedule.getRange('A5:H14').format.rowHeight=45;

title(kpi,'KPI、合规与复盘','I'); kpi.getRange('A4:I4').values=[['类别','指标/风险','定义','目标/规则','实际值','完成率','状态','负责人','说明']]; header(kpi.getRange('A4:I4'));
kpi.getRange('A5:I14').values=[
 ['产出','发布主贴数','成功发布且未被删除的主贴',30,0,null,'未开始','',''],['互动','高质量评论率','有实质讨论的评论 / 总评论',0.35,0,null,'未开始','',''],['转化','oFox.ai Referral 注册','来自 Reddit 的注册数',100,0,null,'未开始','',''],['激活','首次 API 调用','Reddit 注册用户完成首次调用',40,0,null,'未开始','',''],['合规','Full Disclosure','品牌员工帖子必须披露身份',1,0,null,'未开始','',''],['合规','禁止虚假互动','不买票、不多账号伪装、不自问自答操纵',1,0,null,'未开始','',''],['风险','价格结论被反驳','逐模型/支付方式核实并附日期',0,0,null,'监测','',''],['风险','帖子被删除','r/LLMDevs 先取得 mod approval',0,0,null,'监测','',''],['质量','可复现证据包','prompt、参数、版本、时间、成本齐全',30,0,null,'未开始','',''],['速度','48h 发布达成率','模型上线后 48h 内完成发布',0.8,0,null,'未开始','','']
]; kpi.getRange('F5:F14').formulas=Array.from({length:10},(_,i)=>[`=IFERROR(E${i+5}/D${i+5},0)`]); kpi.getRange('F5:F14').setNumberFormat('0.0%'); kpi.getRange('D6:D6').setNumberFormat('0.0%'); kpi.getRange('D14:D14').setNumberFormat('0.0%'); kpi.getRange('E5:E14').format.fill=C.yellow; kpi.getRange('G5:G14').dataValidation={rule:{type:'list',values:['未开始','进行中','达标','未达标','监测']}}; body(kpi.getRange('A5:I14')); widths(kpi,{A:12,B:24,C:38,D:18,E:14,F:14,G:14,H:16,I:35}); kpi.freezePanes.freezeRows(4); kpi.getRange('A5:I14').format.rowHeight=45;

title(sources,'研究来源与使用说明','D'); sources.getRange('A4:D4').values=[['主题','来源 URL','用于支持','注意事项']]; header(sources.getRange('A4:D4')); sources.getRange('A5:D11').values=[
 ['AiHubMix 模型对比','https://x.com/AiHubMix/status/2085260781705388444','DeepSeek V4 Flash 0731 vs GPT-5.6 Luna 单次对比格式','单次测试不能泛化，发布前复现'],
 ['oFox vs OpenRouter','https://ofox.ai/vs/openrouter','oFox.ai 对费用机制的公开主张','属于品牌方页面，必须配合实际账单'],
 ['OpenRouter Pricing','https://openrouter.ai/pricing','充值费用机制','费率可能变化，发布前核实'],
 ['GeminiAI 社区','https://www.reddit.com/r/GeminiAI/','社区热点与发帖适配','发布前再次检查 rules'],
 ['LLMDevs 社区','https://www.reddit.com/r/LLMDevs/','反推广规则与工程内容方向','优先取得 mod approval'],
 ['Kimi 社区','https://www.reddit.com/r/kimi/','Kimi K3 / Kimi Work 热点','发布前检查置顶与规则'],
 ['Wan 3.0 测试','用户提供：oFox.ai 实测方向','核心热点素材','需补充真实媒体文件、prompt、seed、耗时与成本']
]; body(sources.getRange('A5:D11')); widths(sources,{A:24,B:58,C:42,D:45}); sources.freezePanes.freezeRows(4); sources.getRange('A5:D11').format.rowHeight=55;

for(const s of sheets){const used=s.getUsedRange(); used.format.font={name:'Aptos'};}
await fs.mkdir(outDir,{recursive:true});
for(const s of sheets){const blob=await wb.render({sheetName:s.name,autoCrop:'all',scale:1,format:'png'}); await fs.writeFile(`${outDir}/preview-${s.name}.png`,new Uint8Array(await blob.arrayBuffer()));}
const xlsx=await SpreadsheetFile.exportXlsx(wb); await xlsx.save(`${outDir}/ofox-reddit-campaign-plan.xlsx`);
const check=await wb.inspect({kind:'table',range:'Campaign总览!A1:H14',include:'values,formulas',tableMaxRows:20,tableMaxCols:12,maxChars:5000}); console.log(check.ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',options:{useRegex:true,maxResults:300},summary:'final formula error scan'}); console.log(errors.ndjson);
