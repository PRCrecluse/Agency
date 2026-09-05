const baseUrl = (process.env.SEO_CHECK_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalBaseUrl = (process.env.SEO_CHECK_CANONICAL_URL || 'https://withmeridian.org').replace(/\/$/, '')

const smokeRoutes = [
  '/about',
  '/zh/about',
  '/about/stories/yiwei-linkloud-gaoning-growth-interview',
  '/zh/about/stories/yiwei-linkloud-gaoning-growth-interview',
  '/about/stories/yiwei-sparklab-birthday',
  '/zh/about/stories/yiwei-sparklab-birthday',
  '/services',
  '/zh/services',
  '/services/seo-services',
  '/zh/services/seo-services',
  '/services/seo-services/technical-seo',
  '/zh/services/seo-services/technical-seo',
  '/services/reddit-services',
  '/zh/services/reddit-services',
  '/utm-builder',
  '/zh/utm-builder',
  '/tools',
  '/zh/tools',
  '/blog/b2b-ai-saas-b2c-seo-url-strategy',
  '/zh/blog/b2b-ai-saas-b2c-seo-url-strategy'
]

const failures = []

const fail = message => failures.push(message)
const expectedLanguage = path => (path.startsWith('/zh/') ? 'zh-CN' : 'en')
const englishPath = path => path.replace(/^\/zh(?=\/|$)/, '') || '/'
const chinesePath = path => `/zh${englishPath(path)}`
const localUrl = path => `${baseUrl}${path}`
const canonicalUrl = path => `${canonicalBaseUrl}${path}`

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)
const sitemap = await sitemapResponse.text()

if (sitemapResponse.status !== 200) fail(`/sitemap.xml: expected 200, received ${sitemapResponse.status}`)
if (sitemap.includes('?lang=')) fail('/sitemap.xml: contains ?lang=')

const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname)
  .filter(path => /^\/(?:zh\/)?(?:about|services|blog|tools|utm-builder)(?:\/|$)/.test(path))

const localizedSitemapRoutes = new Set(
  [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .filter(match => match[1].includes('hreflang='))
    .map(match => match[1].match(/<loc>([^<]+)<\/loc>/)?.[1])
    .filter(Boolean)
    .map(url => new URL(url).pathname)
)

const routes = [...new Set([...smokeRoutes, ...sitemapRoutes])]

const getTagAttributes = (html, tagPattern) => {
  const attributes = {}

  for (const match of html.matchAll(tagPattern)) {
    const tag = match[0]
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1]
    const property = tag.match(/\bproperty=["']([^"']+)["']/i)?.[1]
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]
    const key = rel || property || name

    if (key) attributes[key] = tag
  }

  return attributes
}

const readAttribute = (tag, name) => tag?.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1]

for (const route of routes) {
  const response = await fetch(localUrl(route), { redirect: 'manual' })

  if (response.status !== 200) {
    fail(`${route}: expected 200, received ${response.status}`)
    continue
  }

  const html = await response.text()
  const htmlLang = html.match(/<html[^>]*\blang=["']([^"']+)["']/i)?.[1]
  const tags = getTagAttributes(html, /<(?:link|meta)\b[^>]*>/gi)
  const canonical = readAttribute(tags.canonical, 'href')
  const alternates = [...html.matchAll(/<link\b[^>]*\brel=["']alternate["'][^>]*>/gi)]

  const hreflang = Object.fromEntries(
    alternates.map(match => [readAttribute(match[0], 'hreflang'), readAttribute(match[0], 'href')])
  )

  const expectedCanonical = canonicalUrl(route)
  const expectsLanguageAlternates = localizedSitemapRoutes.has(route)

  if (htmlLang !== expectedLanguage(route)) fail(`${route}: html lang is ${htmlLang || 'missing'}`)
  if (canonical !== expectedCanonical) fail(`${route}: canonical is ${canonical || 'missing'}`)
<<<<<<< HEAD
  if (hreflang.en !== canonicalUrl(englishPath(route))) fail(`${route}: English hreflang is missing or incorrect`)
  if (hreflang['zh-CN'] !== canonicalUrl(chinesePath(route))) fail(`${route}: Chinese hreflang is missing or incorrect`)
  if (hreflang['x-default'] !== canonicalUrl(englishPath(route)))
    fail(`${route}: x-default hreflang is missing or incorrect`)
=======

  if (expectsLanguageAlternates) {
    if (hreflang.en !== canonicalUrl(englishPath(route))) fail(`${route}: English hreflang is missing or incorrect`)
    if (hreflang['zh-CN'] !== canonicalUrl(chinesePath(route))) fail(`${route}: Chinese hreflang is missing or incorrect`)
    if (hreflang['x-default'] !== canonicalUrl(englishPath(route))) fail(`${route}: x-default hreflang is missing or incorrect`)
  } else if (Object.keys(hreflang).some(Boolean)) {
    fail(`${route}: unexpected hreflang on an unpaired page`)
  }

>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
  if (readAttribute(tags['og:url'], 'content') !== expectedCanonical) fail(`${route}: og:url is missing or incorrect`)

  if (readAttribute(tags['og:locale'], 'content') !== (route.startsWith('/zh/') ? 'zh_CN' : 'en_US')) {
    fail(`${route}: og:locale is missing or incorrect`)
  }

  if (/href=["'][^"']*\?[^"']*\blang=/.test(html)) fail(`${route}: generated an internal ?lang= link`)
  if (html.includes('"inLanguage":"en"') && route.startsWith('/zh/')) fail(`${route}: JSON-LD still declares English`)
  if (html.includes('?lang=')) fail(`${route}: rendered output still contains ?lang=`)
}

const legacyRoutes = [
  '/about?lang=zh',
  '/zh/about?lang=en',
  '/tools?lang=zh',
  '/zh/tools?lang=en',
  '/services?lang=zh',
  '/zh/services?lang=en',
  '/utm-builder?lang=zh'
]

for (const legacyRoute of legacyRoutes) {
  const response = await fetch(localUrl(legacyRoute), { redirect: 'manual' })

  const expectedLocation = legacyRoute.includes('lang=zh')
    ? chinesePath(legacyRoute.split('?')[0])
    : englishPath(legacyRoute.split('?')[0])

  if (response.status !== 308) fail(`${legacyRoute}: expected 308, received ${response.status}`)

  if (response.headers.get('location') !== expectedLocation) {
    fail(`${legacyRoute}: redirect location is ${response.headers.get('location') || 'missing'}`)
  }
}

for (const route of routes) {
  if (!sitemap.includes(`<loc>${canonicalUrl(route)}</loc>`)) fail(`/sitemap.xml: missing ${route}`)
}

if (failures.length) {
  console.error(`Language signal check failed (${failures.length}):`)
  failures.forEach(message => console.error(`- ${message}`))
  process.exit(1)
}

console.log(
  `Language signal check passed for ${routes.length} sitemap/localized routes and ${legacyRoutes.length} legacy redirects.`
)
