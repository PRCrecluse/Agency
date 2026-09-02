import fs from 'node:fs'
import path from 'node:path'

const sitemapPath = path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body')
const canonicalOrigin = 'https://withmeridian.org'
const checkBaseUrl = process.env.SEO_CHECK_BASE_URL?.replace(/\/$/, '')
const failures = []

const fail = message => failures.push(message)

if (!fs.existsSync(sitemapPath)) {
  fail(`missing generated sitemap: ${sitemapPath}`)
}

const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : ''
const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1])
const readTag = (block, tag) => block.match(new RegExp(`<${tag}>([^<]+)<\\/${tag}>`))?.[1]

const entries = urlBlocks.map(block => {
  const alternates = Object.fromEntries(
    [...block.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/>/g)].map(match => [
      match[1],
      match[2]
    ])
  )

  return {
    loc: readTag(block, 'loc'),
    lastmod: readTag(block, 'lastmod'),
    alternates
  }
})

if (!entries.length) fail('sitemap contains no URL entries')
if (sitemap.includes('<priority>')) fail('sitemap still contains ignored priority values')
if (sitemap.includes('<changefreq>')) fail('sitemap still contains ignored changefreq values')

const locs = entries.map(entry => entry.loc).filter(Boolean)
const locSet = new Set(locs)

if (locSet.size !== locs.length) {
  const duplicates = [...new Set(locs.filter((loc, index) => locs.indexOf(loc) !== index))]

  fail(`duplicate loc values: ${duplicates.join(', ')}`)
}

const validatePublicUrl = (value, label) => {
  try {
    const url = new URL(value)

    if (url.origin !== canonicalOrigin) fail(`${label}: unexpected origin ${url.origin}`)
    if (url.search) fail(`${label}: query parameters are not allowed`)
    if (url.hash) fail(`${label}: fragments are not allowed`)
  } catch {
    fail(`${label}: invalid URL ${value || 'missing'}`)
  }
}

for (const entry of entries) {
  validatePublicUrl(entry.loc, entry.loc || 'loc')

  if (entry.lastmod) {
    const timestamp = Date.parse(entry.lastmod)

    if (Number.isNaN(timestamp)) fail(`${entry.loc}: invalid lastmod ${entry.lastmod}`)
    if (timestamp > Date.now()) fail(`${entry.loc}: lastmod is in the future`)
  }

  const languages = Object.keys(entry.alternates)

  if (languages.length) {
    for (const language of ['en', 'zh-CN', 'x-default']) {
      if (!entry.alternates[language]) fail(`${entry.loc}: missing ${language} alternate`)
    }

    for (const [language, href] of Object.entries(entry.alternates)) {
      validatePublicUrl(href, `${entry.loc} ${language} alternate`)
    }

    if (entry.alternates['x-default'] !== entry.alternates.en) {
      fail(`${entry.loc}: x-default must match the English alternate`)
    }

    for (const language of ['en', 'zh-CN']) {
      const href = entry.alternates[language]

      if (href && !locSet.has(href)) fail(`${entry.loc}: ${language} alternate is missing its own loc`)
    }

    if (entry.loc !== entry.alternates.en && entry.loc !== entry.alternates['zh-CN']) {
      fail(`${entry.loc}: loc is not part of its own language alternate pair`)
    }
  }
}

const entryByLoc = new Map(entries.map(entry => [entry.loc, entry]))

for (const entry of entries.filter(item => Object.keys(item.alternates).length)) {
  for (const language of ['en', 'zh-CN']) {
    const counterpart = entryByLoc.get(entry.alternates[language])

    if (counterpart && JSON.stringify(counterpart.alternates) !== JSON.stringify(entry.alternates)) {
      fail(`${entry.loc}: ${language} alternate is not reciprocal`)
    }
  }
}

for (const requiredPath of ['/utm-builder', '/zh/utm-builder']) {
  if (!locSet.has(`${canonicalOrigin}${requiredPath}`)) fail(`missing required loc ${requiredPath}`)
}

for (const excludedPath of [
  '/twitter-monitor',
  '/zh/twitter-monitor',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/services/reddit-services/measurement',
  '/zh/services/reddit-services/measurement'
]) {
  if (locSet.has(`${canonicalOrigin}${excludedPath}`)) fail(`excluded loc is present: ${excludedPath}`)
}

if (checkBaseUrl) {
  await Promise.all(
    entries.map(async entry => {
      const pathname = new URL(entry.loc).pathname

      try {
        const response = await fetch(`${checkBaseUrl}${pathname}`, { redirect: 'manual' })

        if (response.status !== 200) {
          fail(`${pathname}: expected 200, received ${response.status}`)

          return
        }

        const html = await response.text()
        const canonical = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1]
        const robots = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/i)?.[1]

        if (canonical !== entry.loc) fail(`${pathname}: canonical is ${canonical || 'missing'}`)
        if (robots?.toLowerCase().includes('noindex')) fail(`${pathname}: sitemap URL is noindex`)
      } catch (error) {
        fail(`${pathname}: request failed (${error instanceof Error ? error.message : String(error)})`)
      }
    })
  )
}

if (failures.length) {
  console.error(`Sitemap check failed (${failures.length}):`)
  failures.forEach(message => console.error(`- ${message}`))
  process.exit(1)
}

const lastmodCount = entries.filter(entry => entry.lastmod).length
const liveCheckSummary = checkBaseUrl ? ` Live checks passed against ${checkBaseUrl}.` : ''

console.log(
  `Sitemap check passed for ${entries.length} unique loc values; ${lastmodCount} use explicit lastmod dates.${liveCheckSummary}`
)
