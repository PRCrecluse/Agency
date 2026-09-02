import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname)
const raw = JSON.parse(await fs.readFile(path.join(root, 'raw_keyword_metrics_us.json'), 'utf8'))

const clusterLabels = {
  'reddit-marketing-services': 'Reddit 核心营销服务',
  'reddit-community-management': 'Reddit 社区代运营',
  'reddit-campaigns': 'Reddit Campaign',
  'reddit-marketing-guides': 'Reddit 营销指南',
  'reddit-ads-guides': 'Reddit Ads 指南',
  'reddit-brand-and-geo-guides': '品牌监测、SEO 与 GEO',
  'reddit-ban-and-compliance-guides': '封禁风险与合规营销',
  'reddit-account-trust-guides': '账号信任、Karma 与发帖规则',
  'reddit-native-marketing-guides': '原生社区营销'
}

const p1 = new Set([
  'reddit marketing', 'reddit marketing agency', 'reddit marketing services', 'reddit for business',
  'reddit campaign', 'reddit community management', 'reddit community management services',
  'reddit ads', 'reddit advertising', 'reddit seo', 'reddit ads cost', 'reddit advertising cost',
  'how to advertise on reddit', 'reddit keyword research', 'reddit shadowban',
  'how to promote on reddit without getting banned', 'reddit self promotion rules',
  'how to get reddit karma', 'reddit social listening'
])

const excluded = new Map([
  ['reddit ban evasion', '排除：存在规避平台执法意图，不作为获客或教程主题'],
  ['reddit advertising agency', '谨慎：只有实际提供 Reddit 官方付费广告管理时才使用'],
  ['reddit community service', '不作为主词：0 搜索量且可能混入公益/平台帮助语义'],
  ['reddit community services', '不作为主词：0 搜索量且语义不够准确'],
  ['reddit account warming', '不建议包装为养号服务；仅讨论真实参与和账号信任'],
  ['how to warm up a reddit account', '不建议包装为养号教程；仅讨论真实参与和账号信任']
])

function contentAsset(keyword, cluster) {
  if (cluster === 'reddit-marketing-services') return '主服务页模块与 FAQ'
  if (cluster === 'reddit-community-management') return 'Community Management 服务页模块与 FAQ'
  if (cluster === 'reddit-campaigns') return 'Reddit Campaign 服务页模块与案例'
  if (keyword.includes('without getting banned')) return 'How to Promote on Reddit Without Getting Banned 主指南'
  if (keyword.includes('shadowban') || keyword.includes('shadow banned')) return 'Reddit Shadowban: Causes, Checks, and Prevention'
  if (keyword.includes('self promotion') || keyword.includes('spam rules') || keyword.includes('promotion rules') || keyword.includes('marketing rules')) return 'Reddit Self-Promotion Rules for Brands'
  if (keyword.includes('removed by moderators') || keyword.includes('keeps getting removed') || keyword.includes('moderator approval')) return 'Why Reddit Posts Get Removed by Moderators'
  if (keyword.includes('karma') || keyword.includes('account age') || keyword.includes('account restrictions')) return 'Reddit Karma and Account Trust Guide'
  if (cluster === 'reddit-ads-guides') return 'Reddit Ads 与 Organic Marketing 内容集群'
  if (cluster === 'reddit-brand-and-geo-guides') return 'Reddit SEO、品牌监测与 AI Search 内容集群'
  if (cluster === 'reddit-native-marketing-guides') return '原生社区营销指南或现有文章支持段落'

  return 'Reddit Marketing 指南内容集群'
}

function priority(row) {
  if (excluded.has(row.keyword)) return '排除/谨慎'
  if (p1.has(row.keyword)) return 'P1'
  if ((row.searchVolume ?? 0) >= 50) return 'P2'
  if ((row.searchVolume ?? 0) > 0) return 'P3'

  return '语义支持'
}

function note(row) {
  if (excluded.has(row.keyword)) return excluded.get(row.keyword)
  if (row.keyword === 'reddit promotion service' || row.keyword === 'reddit keyword research') return 'Traffic Potential 异常偏高，使用前应人工检查 SERP'
  if (row.cluster_id === 'reddit-community-management' && (row.searchVolume ?? 0) === 0) return '不单独建页；仅在正文、FAQ 或交付说明中自然覆盖'
  if (row.cluster_id === 'reddit-native-marketing-guides' && (row.searchVolume ?? 0) === 0) return '无可测搜索量；作为语义和用户表达支持，不独立建页'
  if (row.cluster_id === 'reddit-ban-and-compliance-guides') return '内容必须聚焦守规、透明参与和正常申诉，不提供规避检测方法'

  return ''
}

const rows = raw.records.map(record => {
  const data = record.response?.data ?? {}
  const row = { ...record, ...data }

  return {
    priority: priority(row),
    keyword: row.keyword,
    cluster: clusterLabels[row.cluster_id] ?? row.cluster_id,
    intent: row.intent === 'commercial' ? '商业/采购' : '信息/教育',
    target_page: row.target,
    recommended_asset: contentAsset(row.keyword, row.cluster_id),
    us_monthly_volume: row.searchVolume ?? '',
    global_monthly_volume: row.globalSearchVolume ?? '',
    clicks: row.clicks ?? '',
    cpc_usd: row.cpc ?? '',
    difficulty: row.difficulty ?? '',
    traffic_potential: row.trafficPotential ?? '',
    note: note(row)
  }
}).sort((a, b) => {
  const order = { P1: 0, P2: 1, P3: 2, '语义支持': 3, '排除/谨慎': 4 }

  return order[a.priority] - order[b.priority] || (b.us_monthly_volume || 0) - (a.us_monthly_volume || 0) || a.keyword.localeCompare(b.keyword)
})

const headers = Object.keys(rows[0])
const escape = value => `"${String(value).replaceAll('"', '""')}"`
const csv = [headers.map(escape).join(','), ...rows.map(row => headers.map(header => escape(row[header])).join(','))].join('\n') + '\n'

await fs.writeFile(path.join(root, 'reddit_keyword_master_table_us.csv'), '\uFEFF' + csv)

console.log(`Wrote ${rows.length} rows to reddit_keyword_master_table_us.csv`)
