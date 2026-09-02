import { absoluteUrl, siteUrl } from '@/lib/seo'

export const INDEXNOW_KEY = 'b2634002-6456-49b3-87a3-0e81278ee6a9'
export const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT?.trim() || 'https://api.indexnow.org/indexnow'
export const INDEXNOW_HOST = new URL(siteUrl).host
export const INDEXNOW_KEY_LOCATION = absoluteUrl(`/${INDEXNOW_KEY}.txt`)

const normalizeSubmittedUrls = (urls: string[]) => {
  const allowedHost = INDEXNOW_HOST
  const uniqueUrls = new Set<string>()

  for (const value of urls) {
    if (!value) {
      continue
    }

    try {
      const candidate = new URL(value)

      if (candidate.host !== allowedHost) {
        continue
      }

      uniqueUrls.add(candidate.toString())
    } catch {
      continue
    }
  }

  return [...uniqueUrls]
}

export const buildIndexNowPayload = (urls: string[]) => {
  const urlList = normalizeSubmittedUrls(urls)

  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList
  }
}

export const submitIndexNowUrls = async (urls: string[], fetchImpl: typeof fetch = fetch) => {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return {
      ok: false,
      status: 0,
      body: `IndexNow submission is disabled in the ${process.env.VERCEL_ENV} environment.`
    }
  }

  const payload = buildIndexNowPayload(urls)

  if (payload.urlList.length === 0) {
    return {
      ok: false,
      status: 0,
      body: 'No valid URLs to submit.'
    }
  }

  const response = await fetchImpl(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  })

  return {
    ok: response.ok,
    status: response.status,
    body: await response.text()
  }
}
