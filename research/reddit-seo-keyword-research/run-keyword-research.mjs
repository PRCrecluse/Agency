import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname)
const plan = JSON.parse(await fs.readFile(path.join(root, 'seed_plan.json'), 'utf8'))
const apiKey = process.env.RAPIDAPI_KEY
if (!apiKey) throw new Error('RAPIDAPI_KEY is required')

const host = 'seo-api-dr-rd-rank-keywords-backlinks1.p.rapidapi.com'
const unique = new Map()
for (const cluster of plan.clusters) {
  for (const keyword of cluster.keywords) {
    if (!unique.has(keyword)) unique.set(keyword, { keyword, cluster_id: cluster.id, intent: cluster.intent, target: cluster.target })
  }
}

async function fetchMetric(item) {
  const url = new URL(`https://${host}/keyword-metrics`)
  url.searchParams.set('keyword', item.keyword)
  url.searchParams.set('country', plan.market.country)
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(url, { headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': host } })
    const body = await response.json().catch(() => ({ message: 'Invalid JSON response' }))
    if (response.ok && body.success) return { ...item, http_status: response.status, response: body }
    if (attempt === 3 || (response.status !== 429 && response.status < 500)) return { ...item, http_status: response.status, response: body }
    await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
  }
}

const items = [...unique.values()]
const records = []
for (let index = 0; index < items.length; index += 4) {
  records.push(...await Promise.all(items.slice(index, index + 4).map(fetchMetric)))
  process.stdout.write(`\r${Math.min(index + 4, items.length)}/${items.length}`)
}
process.stdout.write('\n')

await fs.writeFile(path.join(root, 'raw_keyword_metrics_us.json'), JSON.stringify({ source: 'RapidAPI SEO API - keyword-metrics', host, country: plan.market.country, records }, null, 2) + '\n')

const rows = records.map(record => {
  const data = record.response?.data ?? {}
  return { ...record, ...data }
})
const headers = ['keyword', 'cluster_id', 'intent', 'target', 'searchVolume', 'clicks', 'cpc', 'difficulty', 'globalSearchVolume', 'trafficPotential', 'http_status']
const csv = [headers.join(','), ...rows.map(row => headers.map(header => JSON.stringify(row[header] ?? '')).join(','))].join('\n') + '\n'
await fs.writeFile(path.join(root, 'keyword_metrics_us.csv'), csv)
