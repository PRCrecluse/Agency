import fs from 'node:fs/promises';

const base = '/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/.codex-tmp/reddit-proposal';
const outputs = [];
const inspectRecords = [];
for (let slide = 1; slide <= 12; slide++) {
  const p = `${base}/template-inspect/layouts/source-slide-${String(slide).padStart(2,'0')}.layout.json`;
  const layout = JSON.parse(await fs.readFile(p, 'utf8'));
  inspectRecords.push(JSON.stringify({kind:'slide', id:layout.slide.aid, slide, title:''}));
  for (const e of layout.elements) inspectRecords.push(JSON.stringify({kind:e.kind === 'image' ? 'image' : (e.text != null ? 'textbox' : 'shape'), id:e.aid, slide, name:e.name, text:e.text, bbox:e.bbox}));
  const editTargets = layout.elements.filter(e => e.text != null).map(e => ({
    sourceElementId: e.aid,
    action: 'rewrite',
    reason: 'Replace inherited copy with oFox.ai Reddit campaign proposal content'
  }));
  outputs.push({ outputSlide: slide, sourceSlide: slide, narrativeRole: [
    'opening offer','market opportunity','campaign thesis','evidence angles','Reddit-native principles',
    'GeminiAI community plan','LLMDevs community plan','Kimi and model communities plan',
    'content angle library','post allocation','launch calendar and model radar','governance and measurement'
  ][slide-1], reuseMode: 'duplicate-slide', editTargets });
}
await fs.writeFile(`${base}/template-frame-map.json`, JSON.stringify({outputSlides: outputs, omittedSourceSlides: []}, null, 2));
await fs.writeFile(`${base}/template-inspect-full.ndjson`, inspectRecords.join('\n')+'\n');
await fs.writeFile(`${base}/template-audit.txt`, '12-slide 16:9 source deck. Reuse every slide one-to-one. Preserve dark green / mint / navy system, Inter typography, background images, masters and layouts. Rewrite only inherited text-bearing slide elements listed in template-frame-map.json. No inherited placeholders are present in the inspected source deck.\n');
await fs.writeFile(`${base}/deviation-log.txt`, 'All slides: copy updated for oFox.ai AI model gateway Reddit campaign. No geometry, palette, image, master, or layout changes intended.\n');
await fs.writeFile(`${base}/source-notes.txt`, [
  'https://x.com/AiHubMix/status/2085260781705388444',
  'https://ofox.ai/vs/openrouter',
  'https://openrouter.ai/pricing',
  'https://www.reddit.com/r/GeminiAI/',
  'https://www.reddit.com/r/LLMDevs/',
  'https://www.reddit.com/r/kimi/'
].join('\n'));
