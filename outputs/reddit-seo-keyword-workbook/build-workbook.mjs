import fs from 'node:fs/promises'
import path from 'node:path'
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool'

const workDir = path.dirname(new URL(import.meta.url).pathname)
const sourcePath = path.resolve(workDir, '../../research/reddit-seo-keyword-research/reddit_keyword_master_table_us.csv')
const sourceUrl = 'https://rapidapi.com/apiverse1-apiverse-default/api/seo-api-dr-rd-rank-keywords-backlinks1'
const outputPath = path.join(workDir, 'reddit-seo-keywords-by-intent-and-cluster.xlsx')

function parseCsv(text) {
  return text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).map(line => {
    const values = []
    line.replace(/"((?:[^"]|"")*)"(?:,|$)/g, (_, value) => {
      values.push(value.replaceAll('""', '"'))
      return ''
    })
    return values
  })
}

const matrix = parseCsv(await fs.readFile(sourcePath, 'utf8'))
const sourceHeaders = matrix[0]
const records = matrix.slice(1).map(row => Object.fromEntries(sourceHeaders.map((header, index) => [header, row[index]])))

const headers = [
  '优先级', '关键词', 'Cluster', 'Intent', '目标页面', '推荐内容资产',
  '美国月搜索量', '全球月搜索量', '点击量', 'CPC (USD)', '难度', '流量潜力', '备注', '数据源'
]

const fields = [
  'priority', 'keyword', 'cluster', 'intent', 'target_page', 'recommended_asset',
  'us_monthly_volume', 'global_monthly_volume', 'clicks', 'cpc_usd', 'difficulty', 'traffic_potential', 'note'
]

const numericFields = new Set(['us_monthly_volume', 'global_monthly_volume', 'clicks', 'cpc_usd', 'difficulty', 'traffic_potential'])

function valuesFor(items) {
  return items.map(record => [
    ...fields.map(field => numericFields.has(field) && record[field] !== '' ? Number(record[field]) : record[field]),
    sourceUrl
  ])
}

function safeTableName(name) {
  return `T_${name.replace(/[^A-Za-z0-9]/g, '') || Math.random().toString(36).slice(2)}`.slice(0, 28)
}

const workbook = Workbook.create()
workbook.comments.setSelf({ displayName: 'User' })

function addDataSheet(name, items, accent) {
  const sheet = workbook.worksheets.add(name)
  sheet.showGridLines = false
  sheet.freezePanes.freezeRows(1)
  sheet.freezePanes.freezeColumns(2)

  const data = [headers, ...valuesFor(items)]
  const range = sheet.getRangeByIndexes(0, 0, data.length, headers.length)
  range.values = data
  range.format.font = { name: 'Aptos', size: 10, color: '#172033' }
  range.format.verticalAlignment = 'center'

  const header = sheet.getRange(`A1:N1`)
  header.format.fill = accent
  header.format.font = { name: 'Aptos Display', size: 10, bold: true, color: '#FFFFFF' }
  header.format.rowHeight = 30
  header.format.horizontalAlignment = 'center'

  if (items.length) {
    const body = sheet.getRange(`A2:N${items.length + 1}`)
    body.format.borders = { insideHorizontal: { style: 'thin', color: '#E5E7EB' } }
    body.format.rowHeight = 24
    sheet.getRange(`G2:I${items.length + 1}`).format.numberFormat = '#,##0'
    sheet.getRange(`J2:J${items.length + 1}`).format.numberFormat = '$0.00'
    sheet.getRange(`K2:L${items.length + 1}`).format.numberFormat = '#,##0'
    sheet.getRange(`A2:A${items.length + 1}`).format.horizontalAlignment = 'center'
    sheet.getRange(`G2:L${items.length + 1}`).format.horizontalAlignment = 'right'
    sheet.getRange(`M2:N${items.length + 1}`).format.wrapText = true
    sheet.getRange(`A2:A${items.length + 1}`).conditionalFormats.add('containsText', { text: 'P1', format: { fill: '#DCFCE7', font: { bold: true, color: '#166534' } } })
    sheet.getRange(`A2:A${items.length + 1}`).conditionalFormats.add('containsText', { text: '排除', format: { fill: '#FEE2E2', font: { bold: true, color: '#991B1B' } } })
    const table = sheet.tables.add(`A1:N${items.length + 1}`, true, safeTableName(name))
    table.style = 'TableStyleMedium2'
    table.showFilterButton = true
  }

  const widths = [13, 35, 28, 13, 38, 42, 15, 15, 12, 12, 10, 14, 52, 42]
  widths.forEach((width, index) => { sheet.getRangeByIndexes(0, index, Math.max(data.length, 1), 1).format.columnWidth = width })
  return sheet
}

const overview = workbook.worksheets.add('说明')
overview.showGridLines = false
overview.getRange('A1:F1').merge()
overview.getRange('A1').values = [['Reddit SEO 关键词策略｜按 Intent 与 Cluster 拆分']]
overview.getRange('A1:F1').format.fill = '#172554'
overview.getRange('A1:F1').format.font = { name: 'Aptos Display', size: 18, bold: true, color: '#FFFFFF' }
overview.getRange('A1:F1').format.rowHeight = 42
overview.getRange('A3:B7').values = [
  ['指标', '数值'],
  ['关键词总数', records.length],
  ['商业/采购', records.filter(row => row.intent === '商业/采购').length],
  ['信息/教育', records.filter(row => row.intent === '信息/教育').length],
  ['Cluster 数量', new Set(records.map(row => row.cluster)).size]
]
overview.getRange('A3:B3').format.fill = '#2563EB'
overview.getRange('A3:B3').format.font = { bold: true, color: '#FFFFFF' }
overview.getRange('A3:B7').format.borders = { preset: 'outside', style: 'thin', color: '#CBD5E1' }
overview.getRange('A9:F13').values = [
  ['使用说明', '', '', '', '', ''],
  ['Intent 工作表', '按商业/采购和信息/教育拆分，适合页面类型与漏斗阶段排期。', '', '', '', ''],
  ['Cluster 工作表', '每个主题簇单独一页，适合服务页优化和博客内容集群规划。', '', '', '', ''],
  ['优先级', 'P1 优先执行；P2/P3 排期；语义支持不单独建页；排除/谨慎需先检查意图。', '', '', '', ''],
  ['数据来源', sourceUrl, '', '', '', '']
]
overview.getRange('A9:F9').merge()
overview.getRange('A9:F9').format.fill = '#DBEAFE'
overview.getRange('A9:F9').format.font = { bold: true, color: '#1E3A8A' }
overview.getRange('B10:F13').merge(true)
overview.getRange('A9:F13').format.wrapText = true
overview.getRange('A1:F13').format.font = { name: 'Aptos', size: 11, color: '#172033' }
overview.getRange('A1:F1').format.font = { name: 'Aptos Display', size: 18, bold: true, color: '#FFFFFF' }
overview.getRange('A:A').format.columnWidth = 22
overview.getRange('B:F').format.columnWidth = 22
overview.getRange('B10:F13').format.rowHeight = 32

addDataSheet('全部关键词', records, '#1E3A8A')
addDataSheet('Intent-商业采购', records.filter(row => row.intent === '商业/采购'), '#047857')
addDataSheet('Intent-信息教育', records.filter(row => row.intent === '信息/教育'), '#7C3AED')

const clusterTabs = [
  ['核心营销服务', 'Reddit 核心营销服务'],
  ['社区代运营', 'Reddit 社区代运营'],
  ['Campaign', 'Reddit Campaign'],
  ['营销指南', 'Reddit 营销指南'],
  ['Ads 指南', 'Reddit Ads 指南'],
  ['品牌SEO-GEO', '品牌监测、SEO 与 GEO'],
  ['封禁与合规', '封禁风险与合规营销'],
  ['账号信任', '账号信任、Karma 与发帖规则'],
  ['原生营销', '原生社区营销']
]

for (const [tabName, cluster] of clusterTabs) {
  addDataSheet(tabName, records.filter(row => row.cluster === cluster), '#0F766E')
}

await fs.mkdir(path.join(workDir, 'previews'), { recursive: true })
for (const sheetName of ['说明', '全部关键词', 'Intent-商业采购', 'Intent-信息教育', ...clusterTabs.map(item => item[0])]) {
  const preview = await workbook.render({ sheetName, range: sheetName === '说明' ? 'A1:F13' : 'A1:N12', scale: 1.2, format: 'png' })
  await fs.writeFile(path.join(workDir, 'previews', `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()))
}

const output = await SpreadsheetFile.exportXlsx(workbook)
await output.save(outputPath)

const inspect = await workbook.inspect({ kind: 'table', range: 'Intent-商业采购!A1:N12', include: 'values,formulas', tableMaxRows: 12, tableMaxCols: 14 })
console.log(inspect.ndjson)
const errors = await workbook.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 100 }, summary: 'formula error scan' })
console.log(errors.ndjson)
console.log(outputPath)
