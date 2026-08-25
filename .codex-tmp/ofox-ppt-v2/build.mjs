import fs from 'node:fs/promises';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const dir='/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/.codex-tmp/ofox-ppt-v2';
const out='/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/ofox-reddit-campaign-proposal-v2.pptx';
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#F4F4F4',ink:'#1F1F1F',muted:'#6B6B6B',orange:'#FF5000',white:'#FFFFFF',line:'#DEDEDE',soft:'#FFF0E8'};

function box(slide,x,y,w,h,fill=C.white,r=18,line=C.line){return slide.shapes.add({geometry:'roundRect',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:line,width:1},borderRadius:`rounded-${r>14?'2xl':'xl'}`});}
function text(slide,value,x,y,w,h,size=20,color=C.ink,bold=false,align='left'){
  const s=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}}); s.text=value; s.text.style={fontSize:size,color,bold,alignment:align,fontFamily:'Arial'}; return s;
}
function top(slide,n,label,title){slide.background.fill=C.bg; text(slide,'oFox.ai',64,34,140,32,24,C.ink,true); text(slide,`0${n}`,1128,38,64,28,18,C.orange,true,'right'); text(slide,label.toUpperCase(),64,102,500,24,14,C.orange,true); text(slide,title,64,138,1140,64,42,C.ink,true);}
function chip(slide,label,x,y,w,fill=C.soft,color=C.orange){const b=box(slide,x,y,w,38,fill,19,fill); text(slide,label,x,y+7,w,24,15,color,true,'center'); return b;}
function notes(slide,urls){slide.speakerNotes.textFrame.setText(`[Sources]\n${urls.join('\n')}\n[/Sources]`);}
const sourceOfox='https://ofox.ai/zh';

// 1 cover
{
 const s=p.slides.add(); s.background.fill=C.bg;
 text(s,'oFox.ai',64,44,180,42,28,C.ink,true); chip(s,'REDDIT CAMPAIGN',1000,48,210,C.ink,C.white);
 text(s,'Four campaign ideas\nfor the next model cycle',64,190,900,150,62,C.ink,true);
 text(s,'用折扣、新模型热点与真实对比，把 oFox.ai 变成 Reddit 上的讨论入口。',68,390,810,50,24,C.muted,false);
 const rule=s.shapes.add({geometry:'rect',position:{left:68,top:492,width:1144,height:2},fill:C.line,line:{style:'solid',fill:'none',width:0}});
 text(s,'01  成本对照',68,530,230,34,20,C.ink,true); text(s,'02  Wan 3.0 视频',350,530,260,34,20,C.ink,true); text(s,'03  中美模型对比',670,530,260,34,20,C.ink,true); text(s,'04  GPT‑6 热点',990,530,220,34,20,C.ink,true);
 notes(s,[sourceOfox]);
}

// 2 overview
{
 const s=p.slides.add(); top(s,1,'Campaign framework','四个思路，只围绕“现在为什么值得讨论”');
 const items=[
  ['思路 1','OpenRouter 成本对照','抓住 oFox.ai 多款模型折扣，做相同用量下的实际支出对比。'],
  ['思路 2','Wan 3.0 热点视频','直接做一条可传播的视频结果，完整公开 prompt 与参数。'],
  ['思路 3','中美模型同题对比','同一条高难度 prompt 跑 Wan 3.0 与海外模型，看结果差异。'],
  ['思路 4','GPT‑6 发布热点','把传闻窗口当预热节点；官方确认后第一时间实测发布。']
 ];
 items.forEach((it,i)=>{const y=238+i*102; text(s,it[0],72,y,120,28,18,C.orange,true); text(s,it[1],210,y-4,310,36,26,C.ink,true); text(s,it[2],545,y,650,42,18,C.muted,false); if(i<3)s.shapes.add({geometry:'rect',position:{left:72,top:y+65,width:1120,height:1},fill:C.line,line:{style:'solid',fill:'none',width:0}});});
 notes(s,[sourceOfox]);
}

// 3 idea 1
{
 const s=p.slides.add(); top(s,2,'Idea 01','OpenRouter 成本对照：让“折扣”变成可转发的账单');
 chip(s,'CURRENT DISCOUNTS',72,232,205); text(s,'5 折 / 8 折 / 充值优惠',72,288,500,48,34,C.ink,true);
 text(s,'不是泛泛说“oFox 更便宜”，而是挑 3–5 个正在打折的热门模型，统一输入量与输出量，展示最终支出。',72,350,520,92,20,C.muted,false);
 box(s,650,232,542,308,C.white,18,C.line);
 text(s,'对比结构',690,268,180,28,17,C.orange,true);
 const lines=[['01','同一模型 / 同一 token 用量'],['02','oFox.ai 折后价格'],['03','OpenRouter 实际充值与调用成本'],['04','最终差额 + 截图 + 核实日期']];
 lines.forEach((v,i)=>{text(s,v[0],690,316+i*54,42,28,17,C.orange,true); text(s,v[1],748,314+i*54,390,32,20,C.ink,i===3);});
 text(s,'Reddit 标题示例',72,520,210,26,16,C.orange,true); text(s,'“I priced the same 5 models on oFox.ai and OpenRouter — here is the real checkout difference.”',72,558,1120,66,25,C.ink,true);
 notes(s,[sourceOfox,'https://openrouter.ai/pricing']);
}

// 4 idea 2
{
 const s=p.slides.add(); top(s,3,'Idea 02','Wan 3.0 热点：先让视频结果自己说话');
 box(s,72,232,720,360,C.ink,18,C.ink); chip(s,'WAN 3.0',108,270,130,C.orange,C.white);
 text(s,'PROMPT',108,348,135,32,18,'#A7A7A7',true); text(s,'→',285,337,60,50,36,C.orange,true,'center'); text(s,'VIDEO',388,348,150,32,18,C.white,true);
 text(s,'视频画面是第一屏；正文只解释生成条件。',108,430,590,62,30,C.white,true);
 text(s,'prompt · seed · 时长 · 分辨率 · 生成耗时 · 成本',108,520,610,30,18,'#BDBDBD',false);
 text(s,'发布文案',850,250,210,26,16,C.orange,true);
 text(s,'“I tested this prompt on Wan 3.0 on oFox.ai — here’s the result I got.”',850,294,330,124,28,C.ink,true);
 text(s,'目标：蹭新模型热度，同时把 oFox.ai 自然放进完整复现信息里。',850,470,330,88,19,C.muted,false);
 notes(s,[sourceOfox]);
}

// 5 idea 3
{
 const s=p.slides.add(); top(s,4,'Idea 03','中美模型对比：同一条高难度 prompt，看谁更听话');
 text(s,'同题，不做抽象 benchmark。',72,226,500,42,28,C.ink,true);
 text(s,'把为 Wan 3.0 设计的复杂 prompt 原样交给海外视频模型，比较真实画面，而不是只看厂商分数。',72,276,1080,46,19,C.muted,false);
 const cols=[['WAN 3.0','中国模型'],['VS','SAME PROMPT'],['海外视频模型','美国 / 国际模型']];
 box(s,72,356,360,184,C.white,18,C.line); box(s,848,356,360,184,C.white,18,C.line);
 text(s,cols[0][0],102,396,300,42,36,C.ink,true); text(s,cols[0][1],102,460,300,28,17,C.muted,false);
 chip(s,'SAME PROMPT',514,414,250,C.ink,C.white);
 text(s,cols[2][0],878,396,300,42,32,C.ink,true); text(s,cols[2][1],878,460,300,28,17,C.muted,false);
 text(s,'比较维度：指令遵循 / 主体一致性 / 运动自然度 / 文字生成 / 成本',72,582,1136,36,21,C.orange,true,'center');
 notes(s,[sourceOfox]);
}

// 6 idea 4
{
 const s=p.slides.add(); top(s,5,'Idea 04','GPT‑6 热点：把“可能的 6 月窗口”做成发布预案');
 chip(s,'RUMOR / WATCHLIST',72,232,210,C.ink,C.white);
 text(s,'不把 GPT‑6 发布时间写成事实。',72,296,600,46,32,C.ink,true);
 text(s,'现阶段只做内容和测试模板；等 OpenAI 官方确认型号、时间与 API 可用性后，再启动发布。',72,354,590,74,20,C.muted,false);
 box(s,720,232,472,290,C.white,18,C.line);
 const actions=[['T‑7','预备 3 条真实任务 prompt'],['T+0','确认 API / 价格 / 模型 ID'],['T+24h','完成 oFox.ai 首轮实测'],['T+48h','按社区发布不同版本']];
 actions.forEach((v,i)=>{text(s,v[0],758,268+i*58,78,28,16,C.orange,true); text(s,v[1],850,266+i*58,300,32,20,C.ink,true);});
 text(s,'可预备标题',72,504,180,26,16,C.orange,true); text(s,'“GPT‑6 is live. I ran the same real task on GPT‑6, GPT‑5.6 and DeepSeek — cost, retries and final output.”',72,542,1120,72,25,C.ink,true);
 notes(s,['https://openai.com/news/','https://platform.openai.com/docs/models']);
}

// 7 communities
{
 const s=p.slides.add(); top(s,6,'Community selection','社区只做选择：每个思路发到最匹配的地方');
 const rows=[
  ['r/GeminiAI','模型体验 / 同题对比','思路 3、思路 4'],
  ['r/LLMDevs','API 成本 / 工程测试','思路 1、思路 4'],
  ['r/kimi','中国模型 / Agent 用户','思路 3'],
  ['r/LocalLLaMA','DeepSeek / Qwen / 开源模型','思路 1、思路 3'],
  ['r/StableDiffusion','图像与视频生成','思路 2、思路 3'],
  ['r/singularity','模型发布热点','思路 2、思路 4']
 ];
 text(s,'社区',72,226,260,28,16,C.muted,true); text(s,'适合的讨论',400,226,420,28,16,C.muted,true); text(s,'对应思路',930,226,240,28,16,C.muted,true);
 rows.forEach((r,i)=>{const y=272+i*58; text(s,r[0],72,y,280,32,22,C.ink,true); text(s,r[1],400,y,440,32,19,C.muted,false); text(s,r[2],930,y,240,32,19,C.orange,true); s.shapes.add({geometry:'rect',position:{left:72,top:y+42,width:1120,height:1},fill:C.line,line:{style:'solid',fill:'none',width:0}});});
 text(s,'优先顺序：先做 Wan 3.0 视频 → 再做折扣价格对照 → 最后准备 GPT‑6 发布模板。',72,640,1120,32,20,C.ink,true);
 notes(s,['https://www.reddit.com/r/GeminiAI/','https://www.reddit.com/r/LLMDevs/','https://www.reddit.com/r/kimi/','https://www.reddit.com/r/LocalLLaMA/','https://www.reddit.com/r/StableDiffusion/','https://www.reddit.com/r/singularity/']);
}

await fs.mkdir(dir,{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const slide=p.slides.items[i];
 const png=await p.export({slide,format:'png',scale:1}); await fs.writeFile(`${dir}/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));
 const layout=await slide.export({format:'layout'}); await fs.writeFile(`${dir}/slide-${i+1}.layout.json`,await layout.text());
}
const montage=await p.export({format:'webp',montage:true,scale:1}); await fs.writeFile(`${dir}/montage.webp`,new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(p); await pptx.save(out);
