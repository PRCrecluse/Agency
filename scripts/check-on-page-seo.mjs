const baseUrl = (process.env.SEO_CHECK_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalBaseUrl = (process.env.SEO_CHECK_CANONICAL_URL || 'https://withmeridian.org').replace(/\/$/, '')
const expectIndexable = process.env.SEO_EXPECT_INDEXABLE === '1'
const failures = []
const warnings = []

const decodeHtml = value =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))

const readText = value =>
  decodeHtml(
    value
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )

const readAttribute = (tag, name) => tag?.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1]
const expectedLanguage = path => (path === '/zh' || path.startsWith('/zh/') ? 'zh-CN' : 'en')
const localUrl = path => `${baseUrl}${path}`
const canonicalUrl = path => `${canonicalBaseUrl}${path === '/' ? '' : path}`

const normalizeComparableUrl = value => {
  const url = new URL(value)

  return url.pathname === '/' && !url.search && !url.hash ? url.origin : url.toString()
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)
const sitemap = await sitemapResponse.text()

if (sitemapResponse.status !== 200) {
  console.error(`/sitemap.xml: expected 200, received ${sitemapResponse.status}`)
  process.exit(1)
}

const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(decodeHtml(match[1])).pathname)

const inspectRoute = async path => {
  const response = await fetch(localUrl(path), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000)
  })

  const html = await response.text()
  const title = readText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0])
  const descriptionTag = metaTags.find(tag => readAttribute(tag, 'name')?.toLowerCase() === 'description')
  const robotsTag = metaTags.find(tag => readAttribute(tag, 'name')?.toLowerCase() === 'robots')
  const description = decodeHtml(readAttribute(descriptionTag, 'content') || '')
  const robots = decodeHtml(readAttribute(robotsTag, 'content') || '')

  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .find(tag => readAttribute(tag, 'rel')?.toLowerCase() === 'canonical')

  const canonical = decodeHtml(readAttribute(canonicalTag, 'href') || '')
  const htmlLang = readAttribute(html.match(/<html\b[^>]*>/i)?.[0], 'lang') || ''

  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(match => ({
    level: Number(match[1]),
    text: readText(match[2])
  }))

  const h1 = headings.filter(heading => heading.level === 1)
  const issues = []

  if (response.status !== 200) issues.push(`expected status 200, received ${response.status}`)
  if (!title) issues.push('missing title')
  if (!description) issues.push('missing meta description')
  if (!canonical) issues.push('missing canonical')

  if (canonical && normalizeComparableUrl(canonical) !== normalizeComparableUrl(canonicalUrl(path))) {
    issues.push(`canonical is ${canonical}`)
  }

  if (htmlLang !== expectedLanguage(path)) issues.push(`html lang is ${htmlLang || 'missing'}`)
  if (h1.length !== 1) issues.push(`expected exactly one H1, found ${h1.length}`)
  if (headings[0]?.level !== 1) issues.push(`first heading is H${headings[0]?.level || 'missing'}`)

  for (const heading of headings) {
    if (!heading.text) issues.push(`empty H${heading.level}`)
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) {
      issues.push(`heading level skips from H${headings[index - 1].level} to H${headings[index].level}`)
      break
    }
  }

  const isChinese = expectedLanguage(path) === 'zh-CN'

  const keyFields = {
    title,
    description,
    H1: h1.map(heading => heading.text).join(' ')
  }

  for (const [field, value] of Object.entries(keyFields)) {
    const hanCount = (value.match(/[\u3400-\u9fff]/g) || []).length

    if (!isChinese && hanCount > 0) issues.push(`English ${field} contains Chinese text`)
    if (isChinese && value && hanCount === 0) issues.push(`Chinese ${field} contains no Chinese text`)
  }

  const visibleText = readText(
    html
      .replace(/<head\b[\s\S]*?<\/head>/gi, '')
      .replace(/<(?:script|style|svg)\b[\s\S]*?<\/(?:script|style|svg)>/gi, '')
  )

  const hanCount = (visibleText.match(/[\u3400-\u9fff]/g) || []).length
  const latinCount = (visibleText.match(/[a-z]/gi) || []).length
  const hanRatio = hanCount / Math.max(hanCount + latinCount, 1)

  if (!isChinese && hanCount > 30 && hanRatio > 0.15) issues.push('English page body is primarily Chinese')
  if (isChinese && hanCount < 30 && hanRatio < 0.1) issues.push('Chinese page body is primarily English')

  if (expectIndexable) {
    const responseRobots = response.headers.get('x-robots-tag') || ''

    if (robots.toLowerCase().includes('noindex')) issues.push('meta robots contains noindex')
    if (responseRobots.toLowerCase().includes('noindex')) issues.push('X-Robots-Tag contains noindex')
  }

  if (title.length > 60) warnings.push(`${path}: title length ${title.length}`)
  if (description.length > 160) warnings.push(`${path}: description length ${description.length}`)

  return {
    path,
    title,
    description,
    h1: h1[0]?.text || '',
    issues
  }
}

const results = []
let cursor = 0

await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (cursor < routes.length) {
      const index = cursor

      cursor += 1

      try {
        results[index] = await inspectRoute(routes[index])
      } catch (error) {
        results[index] = {
          path: routes[index],
          title: '',
          description: '',
          h1: '',
          issues: [`request failed: ${error instanceof Error ? error.message : String(error)}`]
        }
      }
    }
  })
)

for (const field of ['title', 'description', 'h1']) {
  const grouped = new Map()

  for (const result of results) {
    const normalized = result[field].toLowerCase().replace(/\s+/g, ' ').trim()

    if (!normalized) continue
    grouped.set(normalized, [...(grouped.get(normalized) || []), result])
  }

  for (const group of grouped.values()) {
    if (group.length < 2) continue

    const paths = group.map(result => result.path).join(', ')

    group.forEach(result => result.issues.push(`duplicate ${field}: ${paths}`))
  }
}

for (const result of results) {
  result.issues.forEach(issue => failures.push(`${result.path}: ${issue}`))
}

if (warnings.length) {
  console.warn(`On-page SEO warnings (${warnings.length}, non-blocking):`)
  warnings.forEach(warning => console.warn(`- ${warning}`))
}

if (failures.length) {
  console.error(`On-page SEO check failed (${failures.length}):`)
  failures.forEach(failure => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`On-page SEO check passed for ${results.length} sitemap URLs.`)
