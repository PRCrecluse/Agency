const baseUrl = (process.env.SEO_CHECK_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalBaseUrl = (process.env.SEO_CHECK_CANONICAL_URL || 'https://withmeridian.org').replace(/\/$/, '')
const failures = []

const serviceFamilies = [
  {
    path: '/services/seo-services',
    names: { en: 'SEO Services', zh: 'SEO 服务' },
    children: [
      { path: '/services/seo-services/on-page-seo', names: { en: 'On-page SEO', zh: '页面 SEO' } },
      { path: '/services/seo-services/technical-seo', names: { en: 'Technical SEO', zh: '技术 SEO' } },
      { path: '/services/seo-services/programmatic-seo', names: { en: 'Programmatic SEO', zh: '程序化 SEO' } },
      { path: '/services/seo-services/link-building', names: { en: 'Link Building', zh: '外链建设' } },
      { path: '/services/seo-services/keyword-research', names: { en: 'Keyword Research', zh: '关键词研究' } }
    ]
  },
  {
    path: '/services/reddit-services',
    names: { en: 'Reddit Services', zh: 'Reddit 服务' },
    children: [
      {
        path: '/services/reddit-services/community-management',
        names: { en: 'Reddit Community Management', zh: 'Reddit 社区运营' }
      },
      {
        path: '/services/reddit-services/reddit-campaigns',
        names: { en: 'Reddit Campaigns', zh: 'Reddit Campaigns' }
      }
    ]
  },
  {
    path: '/services/geo-services',
    names: { en: 'GEO Services', zh: 'GEO 服务' },
    children: []
  }
]

const decodeHtml = value =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')

const readAttribute = (tag, name) => decodeHtml(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '')
const normalizePath = value => new URL(value, baseUrl).pathname.replace(/\/$/, '') || '/'
const localize = (path, lang) => (lang === 'zh' ? `/zh${path}` : path)
const canonical = (path, lang) => `${canonicalBaseUrl}${localize(path, lang)}`

const readMarkedLinkPaths = (html, attribute) =>
  [...html.matchAll(/<a\b[^>]*>/gi)]
    .map(match => match[0])
    .filter(tag => new RegExp(`\\b${attribute}(?:=["'][^"']*["'])?`, 'i').test(tag))
    .map(tag => normalizePath(readAttribute(tag, 'href')))

const findBreadcrumbSchema = html => {
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1])
      const items = data['@graph'] || [data]
      const breadcrumb = items.find(item => item?.['@type'] === 'BreadcrumbList')

      if (breadcrumb) return breadcrumb
    } catch {
      // Other checks report malformed JSON-LD. Continue looking for BreadcrumbList.
    }
  }

  return null
}

const inspectPage = async (path, lang, family, child) => {
  const localizedPath = localize(path, lang)
  const response = await fetch(`${baseUrl}${localizedPath}`, { signal: AbortSignal.timeout(15_000) })
  const html = await response.text()

  if (response.status !== 200) {
    failures.push(`${localizedPath}: expected 200, received ${response.status}`)

    return
  }

  const breadcrumbMatch = html.match(/<nav\b[^>]*data-service-breadcrumb[^>]*>([\s\S]*?)<\/nav>/i)

  if (!breadcrumbMatch) {
    failures.push(`${localizedPath}: missing visible service breadcrumb`)
  } else {
    const breadcrumbHtml = breadcrumbMatch[0]

    const expectedItems = [
      { path: '/services', name: lang === 'zh' ? '服务' : 'Services' },
      { path: family.path, name: family.names[lang] },
      ...(child ? [{ path: child.path, name: child.names[lang] }] : [])
    ]

    const visibleLinkPaths = [...breadcrumbHtml.matchAll(/<a\b[^>]*>/gi)].map(match =>
      normalizePath(readAttribute(match[0], 'href'))
    )

    const expectedVisibleLinkPaths = expectedItems.slice(0, -1).map(item => localize(item.path, lang))

    if (JSON.stringify(visibleLinkPaths) !== JSON.stringify(expectedVisibleLinkPaths)) {
      failures.push(`${localizedPath}: visible breadcrumb links are ${visibleLinkPaths.join(', ') || 'missing'}`)
    }

    for (const item of expectedItems) {
      if (!decodeHtml(breadcrumbHtml).includes(item.name)) {
        failures.push(`${localizedPath}: visible breadcrumb is missing ${item.name}`)
      }
    }
  }

  const breadcrumbSchema = findBreadcrumbSchema(html)

  const expectedSchemaItems = [
    { path: '/services', name: lang === 'zh' ? '服务' : 'Services' },
    { path: family.path, name: family.names[lang] },
    ...(child ? [{ path: child.path, name: child.names[lang] }] : [])
  ]

  if (!breadcrumbSchema) {
    failures.push(`${localizedPath}: missing BreadcrumbList JSON-LD`)
  } else {
    const schemaItems = breadcrumbSchema.itemListElement || []

    if (schemaItems.length !== expectedSchemaItems.length) {
      failures.push(`${localizedPath}: BreadcrumbList has ${schemaItems.length} items`)
    }

    expectedSchemaItems.forEach((item, index) => {
      const schemaItem = schemaItems[index]

      if (schemaItem?.name !== item.name) {
        failures.push(`${localizedPath}: BreadcrumbList item ${index + 1} name is ${schemaItem?.name || 'missing'}`)
      }

      if (schemaItem?.item !== canonical(item.path, lang)) {
        failures.push(`${localizedPath}: BreadcrumbList item ${index + 1} URL is ${schemaItem?.item || 'missing'}`)
      }
    })
  }

  const expectedRelatedPaths = (child ? family.children.filter(item => item.path !== child.path) : family.children).map(
    item => localize(item.path, lang)
  )

  const relatedPaths = readMarkedLinkPaths(html, 'data-service-link')

  if (JSON.stringify(relatedPaths.sort()) !== JSON.stringify(expectedRelatedPaths.sort())) {
    failures.push(`${localizedPath}: related service links are ${relatedPaths.join(', ') || 'missing'}`)
  }

  if (child) {
    const parentPaths = readMarkedLinkPaths(html, 'data-service-parent-link')
    const expectedParentPath = localize(family.path, lang)

    if (!parentPaths.includes(expectedParentPath)) {
      failures.push(`${localizedPath}: missing parent service link to ${expectedParentPath}`)
    }
  }
}

for (const lang of ['en', 'zh']) {
  const hubPath = localize('/services', lang)
  const hubResponse = await fetch(`${baseUrl}${hubPath}`, { signal: AbortSignal.timeout(15_000) })
  const hubHtml = await hubResponse.text()
  const hubChildLinks = readMarkedLinkPaths(hubHtml, 'data-service-child-link').sort()

  const expectedHubChildLinks = serviceFamilies
    .flatMap(family => family.children.map(child => localize(child.path, lang)))
    .sort()

  if (hubResponse.status !== 200) failures.push(`${hubPath}: expected 200, received ${hubResponse.status}`)

  if (JSON.stringify(hubChildLinks) !== JSON.stringify(expectedHubChildLinks)) {
    failures.push(`${hubPath}: formal child links are ${hubChildLinks.join(', ') || 'missing'}`)
  }

  for (const family of serviceFamilies) {
    await inspectPage(family.path, lang, family)

    for (const child of family.children) {
      await inspectPage(child.path, lang, family, child)
    }
  }
}

if (failures.length) {
  console.error(`Service hierarchy check failed (${failures.length}):`)
  failures.forEach(failure => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Service hierarchy check passed for the service hub and 20 localized parent/detail pages.')
