import process from 'node:process'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const DEFAULT_SITE_URL = 'https://withmeridian.org'
const INDEXNOW_KEY = 'b2634002-6456-49b3-87a3-0e81278ee6a9'
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT?.trim() || 'https://api.indexnow.org/indexnow'
const PROJECT_ROOT = process.cwd()

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
    dryRun: false,
    useChanged: false
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

    if (arg === '--changed') {
      options.useChanged = true
      continue
    }

    throw new Error(`Unknown argument: ${arg}`)
  }

  if (options.urls.length === 0 && !options.useChanged) {
    options.useSitemap = true
  }

  return options
}

const getChangedFiles = () => {
  try {
    const output = execFileSync('git', ['status', '--short'], {
      cwd: PROJECT_ROOT,
      encoding: 'utf8'
    })

    return output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => line.slice(3).trim())
  } catch (error) {
    throw new Error(`Failed to read changed files from git: ${error instanceof Error ? error.message : String(error)}`)
  }
}

const CONTENT_ROUTE_PATTERNS = [
  {
    test: file => file.startsWith('src/content/blog/') && file.endsWith('.mdx'),
    toUrl: file => `/blog/${path.basename(file, '.mdx')}`
  },
  {
    test: file => file.startsWith('src/content/blog-zh/') && file.endsWith('.mdx'),
    toUrl: file => `/zh/blog/${path.basename(file, '.mdx')}`
  },
  {
    test: file => file === 'src/app/(pages)/blog/page.tsx',
    toUrl: () => '/blog'
  },
  {
    test: file => file === 'src/app/(pages)/zh/blog/page.tsx',
    toUrl: () => '/zh/blog'
  },
  {
    test: file => file === 'src/app/(pages)/about/page.tsx',
    toUrl: () => '/about'
  },
  {
    test: file => file === 'src/app/(pages)/services/page.tsx',
    toUrl: () => '/services'
  },
  {
    test: file => file === 'src/app/(pages)/privacy-policy/page.tsx',
    toUrl: () => '/privacy-policy'
  },
  {
    test: file => file === 'src/app/(pages)/terms-conditions/page.tsx',
    toUrl: () => '/terms-conditions'
  }
]

const GLOBAL_IMPACT_FILES = new Set([
  'src/lib/seo.ts',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/content/services.ts',
  'src/content/about-stories.ts'
])

const resolveChangedUrls = changedFiles => {
  const urls = new Set()
  let needsFullSitemap = false

  for (const file of changedFiles) {
    if (GLOBAL_IMPACT_FILES.has(file)) {
      needsFullSitemap = true
      continue
    }

    for (const pattern of CONTENT_ROUTE_PATTERNS) {
      if (pattern.test(file)) {
        urls.add(new URL(pattern.toUrl(file), `${siteUrl}/`).toString())
        break
      }
    }
  }

  return {
    urls: [...urls],
    needsFullSitemap
  }
}

const fetchSitemapUrls = async sitemapUrl => {
  const response = await fetch(sitemapUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()

  if (!/<urlset[\s>]|<sitemapindex[\s>]/i.test(xml)) {
    throw new Error(`Sitemap response is not valid XML sitemap content: ${sitemapUrl}`)
  }

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

const validateKeyLocation = async () => {
  const response = await fetch(keyLocation)

  if (!response.ok) {
    throw new Error(`IndexNow key location is not reachable: ${response.status} ${response.statusText}`)
  }

  const responseBody = (await response.text()).trim()

  if (responseBody !== INDEXNOW_KEY) {
    throw new Error(`IndexNow key location does not return the expected key: ${keyLocation}`)
  }
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  const changedFiles = options.useChanged ? getChangedFiles() : []
  const changedResolution = options.useChanged ? resolveChangedUrls(changedFiles) : { urls: [], needsFullSitemap: false }
  const shouldUseSitemap = options.useSitemap || changedResolution.needsFullSitemap
  const sitemapUrls = shouldUseSitemap ? await fetchSitemapUrls(options.sitemapUrl) : []
  const urlList = normalizeUrls([...sitemapUrls, ...changedResolution.urls, ...options.urls])

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
    console.log(
      JSON.stringify(
        {
          changedFiles,
          usedSitemap: shouldUseSitemap,
          ...payload
        },
        null,
        2
      )
    )

    return
  }

  await validateKeyLocation()

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
