import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = process.cwd();
const xlsxPath = path.join(root, "outputs/reddit-seo-keyword-workbook/reddit-seo-keywords-by-intent-and-cluster.xlsx");
const blob = await FileBlob.load(xlsxPath);
const workbook = await SpreadsheetFile.importXlsx(blob);
const sheet = workbook.worksheets.getItem("全部关键词");
const values = sheet.getUsedRange(true).values;
const headers = values[0];
const keywords = values.slice(1).map((row, i) => Object.fromEntries(headers.map((h, j) => [h, row[j]]))).map((r, i) => ({...r, row: i + 2}));

const blogDir = path.join(root, "src/content/blog");
const files = (await fs.readdir(blogDir)).filter(f => f.endsWith(".mdx")).sort();
const norm = s => String(s ?? "").toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9]+/g, " ").trim();
const countPhrase = (text, phrase) => {
  const a = ` ${norm(text)} `;
  const b = ` ${norm(phrase)} `;
  return b.trim() ? a.split(b).length - 1 : 0;
};
const posts = [];
for (const file of files) {
  const raw = await fs.readFile(path.join(blogDir, file), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const front = fm?.[1] ?? "";
  const body = raw.slice(fm?.[0].length ?? 0);
  const get = key => front.match(new RegExp(`^${key}:\\s*['\"]?([^'\"\\n]+)`, "m"))?.[1]?.trim() ?? "";
  const title = get("title");
  const description = get("description");
  const slug = get("slug");
  const keywordsBlock = front.match(/^keywords:\s*([\s\S]*?)(?=^[a-zA-Z][\w]*:|\z)/m)?.[1] ?? "";
  const headings = [...body.matchAll(/^#{2,4}\s+(.+)$/gm)].map(m => m[1]).join("\n");
  const zones = { title, description, keywords: keywordsBlock, headings, body };
  const hits = [];
  for (const kw of keywords) {
    const counts = Object.fromEntries(Object.entries(zones).map(([z, t]) => [z, countPhrase(t, kw["关键词"])]));
    const total = Object.values(counts).reduce((a,b) => a+b, 0);
    if (total) hits.push({ keyword: kw["关键词"], row: kw.row, priority: kw["优先级"], cluster: kw["Cluster"], intent: kw["Intent"], usVolume: kw["美国月搜索量"], counts, total });
  }
  posts.push({file, slug, title, description, wordCount: norm(body).split(/\s+/).filter(Boolean).length, hits});
}

const covered = new Map();
for (const p of posts) for (const h of p.hits) {
  if (!covered.has(h.keyword)) covered.set(h.keyword, []);
  covered.get(h.keyword).push({slug:p.slug, ...h.counts, total:h.total});
}
const summary = {
  keywordCount: keywords.length,
  postCount: posts.length,
  coveredKeywordCount: covered.size,
  posts,
  coveredKeywords: [...covered.entries()].map(([keyword, pages]) => ({keyword, pages})),
  uncoveredP1P2: keywords.filter(k => ["P1","P2"].includes(k["优先级"]) && !covered.has(k["关键词"])).map(k => ({row:k.row, priority:k["优先级"], keyword:k["关键词"], cluster:k["Cluster"], intent:k["Intent"], target:k["目标页面"], asset:k["推荐内容资产"], usVolume:k["美国月搜索量"], globalVolume:k["全球月搜索量"], difficulty:k["难度"]})),
  cannibalization: [...covered.entries()].filter(([,pages]) => pages.length > 1).map(([keyword,pages]) => ({keyword,pages})),
};
console.log(JSON.stringify(summary, null, 2));
