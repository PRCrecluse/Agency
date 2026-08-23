import process from 'node:process'

const DEFAULT_SITE_URL = 'https://withmeridian.org'
const INDEXNOW_KEY = 'b2634002-6456-49b3-87a3-0e81278ee6a9'
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT?.trim() || 'https://api.indexnow.org/indexnow'

const normalizeSiteUrl = value => value.trim().replace(/\/+$/, '')

const resolveSiteUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl)
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (vercelProductionUrl) {
    return normalizeSiteUrl(`https://${vercelProductionUrl}`)
  }

  return DEFAULT_SITE_URL
}

const siteUrl = resolveSiteUrl()
const siteHost = new URL(siteUrl).host
const keyLocation = `${siteUrl}/${INDEXNOW_KEY}.txt`

const decodeXmlEntities = value =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

const parseArgs = argv => {
  const options = {
    urls: [],
    useSitemap: false,
    sitemapUrl: `${siteUrl}/sitemap.xml`,
    dryRun: false
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--') {
      continue
    }

    if (arg === '--url') {
      const url = argv[index + 1]

      if (!url) {
        throw new Error('Missing value for --url')
      }

      options.urls.push(url)
      index += 1
      continue
    }

    if (arg === '--sitemap') {
      options.useSitemap = true
      continue
    }

    if (arg === '--sitemap-url') {
      const sitemapUrl = argv[index + 1]

      if (!sitemapUrl) {
        throw new Error('Missing value for --sitemap-url')
      }

      options.sitemapUrl = sitemapUrl
      options.useSitemap = true
      index += 1
      continue
    }

    if (arg === '--dry-run') {
      options.dryRun = true
      continue
    }

    throw new Error(`Unknown argument: ${arg}`)
  }

  if (options.urls.length === 0) {
    options.useSitemap = true
  }

  return options
}

const fetchSitemapUrls = async sitemapUrl => {
  const response = await fetch(sitemapUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/gsi)

  return [...matches].map(match => decodeXmlEntities(match[1].trim()))
}

const normalizeUrls = urls => {
  const uniqueUrls = new Set()

  for (const value of urls) {
    if (!value) {
      continue
    }

    try {
      const candidate = new URL(value)

      if (candidate.host !== siteHost) {
        continue
      }

      uniqueUrls.add(candidate.toString())
    } catch {
      continue
    }
  }

  return [...uniqueUrls]
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  const sitemapUrls = options.useSitemap ? await fetchSitemapUrls(options.sitemapUrl) : []
  const urlList = normalizeUrls([...sitemapUrls, ...options.urls])

  if (urlList.length === 0) {
    throw new Error('No valid same-host URLs found for IndexNow submission.')
  }

  const payload = {
    host: siteHost,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList
  }

  if (options.dryRun) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  })

  const responseBody = await response.text()

  if (!response.ok) {
    throw new Error(`IndexNow request failed: ${response.status} ${responseBody || response.statusText}`)
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow with status ${response.status}.`)

  if (responseBody) {
    console.log(responseBody)
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
