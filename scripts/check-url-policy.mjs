import fs from 'node:fs'
import path from 'node:path'

const canonicalOrigin = 'https://withmeridian.org'
const buildDir = path.join(process.cwd(), '.next')
const routesManifestPath = path.join(buildDir, 'routes-manifest.json')
const robotsPath = path.join(buildDir, 'server', 'app', 'robots.txt.body')
const sitemapPath = path.join(buildDir, 'server', 'app', 'sitemap.xml.body')
const checkBaseUrl = process.env.SEO_CHECK_BASE_URL?.replace(/\/$/, '')
const checkWwwUrl = process.env.SEO_CHECK_WWW_URL?.replace(/\/$/, '')
const checkVercelUrl = process.env.SEO_CHECK_VERCEL_URL?.replace(/\/$/, '')
const failures = []

const fail = message => failures.push(message)

for (const requiredPath of [routesManifestPath, robotsPath]) {
  if (!fs.existsSync(requiredPath)) fail(`missing build artifact: ${requiredPath}`)
}

const routesManifest = fs.existsSync(routesManifestPath)
  ? JSON.parse(fs.readFileSync(routesManifestPath, 'utf8'))
  : { headers: [] }

const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : ''
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : ''

const vercelNoindexRule = routesManifest.headers.find(
  rule =>
    rule.source === '/:path*' &&
    rule.has?.some(condition => condition.type === 'host' && condition.value?.includes('vercel')) &&
    rule.headers?.some(
      header => header.key.toLowerCase() === 'x-robots-tag' && header.value.toLowerCase().includes('noindex')
    )
)

if (!vercelNoindexRule) fail('missing X-Robots-Tag noindex rule for vercel.app hosts')

if (process.env.VERCEL_ENV === 'production') {
  if (!robots.includes('Allow: /')) fail('production robots.txt does not allow public crawling')

  if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
    fail('production robots.txt does not advertise the canonical sitemap')
  }
} else {
  if (!robots.includes('Disallow: /')) fail('non-production robots.txt does not disallow all crawling')
  if (robots.includes('Sitemap:')) fail('non-production robots.txt advertises a sitemap')

  if (process.env.VERCEL_ENV === 'preview' && sitemap.includes('<url>')) {
    fail('preview deployment exposes a populated sitemap')
  }
}

const normalizeComparableUrl = value => {
  const url = new URL(value)

  return url.pathname === '/' && !url.search && !url.hash ? url.origin : url.toString()
}

const readCanonical = html => html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1]

const checkRedirect = async ({ source, expectedLocation, label }) => {
  try {
    const response = await fetch(source, { redirect: 'manual' })

    if (![301, 308].includes(response.status)) {
      fail(`${label}: expected 301 or 308, received ${response.status}`)

      return
    }

    const location = response.headers.get('location')
    const resolvedLocation = location ? new URL(location, source).toString() : ''

    if (resolvedLocation !== expectedLocation) {
      fail(`${label}: redirect location is ${location || 'missing'}`)
    }
  } catch (error) {
    fail(`${label}: request failed (${error instanceof Error ? error.message : String(error)})`)
  }
}

if (checkBaseUrl) {
  const baseOrigin = new URL(checkBaseUrl).origin

  if (baseOrigin !== canonicalOrigin) fail(`live base URL must use ${canonicalOrigin}`)

  await checkRedirect({
    source: `http://${new URL(canonicalOrigin).host}/about?utm_source=url-policy-check`,
    expectedLocation: `${canonicalOrigin}/about?utm_source=url-policy-check`,
    label: 'HTTP canonicalization'
  })
  await checkRedirect({
    source: `${canonicalOrigin}/about/`,
    expectedLocation: `${canonicalOrigin}/about`,
    label: 'trailing-slash canonicalization'
  })

  const notFoundPath = '/url-policy-not-found-check-7f4c6a9e'

  const [homeResponse, notFoundResponse] = await Promise.all([
    fetch(`${checkBaseUrl}/`),
    fetch(`${checkBaseUrl}${notFoundPath}`, { redirect: 'manual' })
  ])

  if (homeResponse.status !== 200) fail(`homepage: expected 200, received ${homeResponse.status}`)

  if (notFoundResponse.status !== 404) {
    fail(`${notFoundPath}: expected 404, received ${notFoundResponse.status}`)
  }

  const canonical = readCanonical(await homeResponse.text())

  if (!canonical || normalizeComparableUrl(canonical) !== canonicalOrigin) {
    fail(`homepage canonical is ${canonical || 'missing'}`)
  }
}

if (checkWwwUrl) {
  await checkRedirect({
    source: `${checkWwwUrl}/about?utm_source=url-policy-check`,
    expectedLocation: `${canonicalOrigin}/about?utm_source=url-policy-check`,
    label: 'www canonicalization'
  })
}

if (checkVercelUrl) {
  try {
    const response = await fetch(`${checkVercelUrl}/`, { redirect: 'manual' })
    const location = response.headers.get('location')

    const redirectedToCanonical =
      [301, 308].includes(response.status) &&
      Boolean(location) &&
      normalizeComparableUrl(new URL(location, checkVercelUrl).toString()) === canonicalOrigin

    const noindex = response.headers.get('x-robots-tag')?.toLowerCase().includes('noindex')

    if (!redirectedToCanonical && !noindex) {
      fail('vercel.app host neither redirects to the canonical domain nor returns X-Robots-Tag: noindex')
    }
  } catch (error) {
    fail(`vercel.app host request failed (${error instanceof Error ? error.message : String(error)})`)
  }
}

if (failures.length) {
  console.error(`URL policy check failed (${failures.length}):`)
  failures.forEach(message => console.error(`- ${message}`))
  process.exit(1)
}

const liveChecks = [checkBaseUrl && 'canonical', checkWwwUrl && 'www', checkVercelUrl && 'vercel.app'].filter(Boolean)
const liveSummary = liveChecks.length ? ` Live checks passed: ${liveChecks.join(', ')}.` : ''

console.log(`URL policy check passed for build artifacts.${liveSummary}`)
