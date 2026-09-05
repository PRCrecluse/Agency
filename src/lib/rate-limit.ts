import { createHash } from 'node:crypto'

interface RateLimitRule {
  limit: number
  windowMs: number
}

interface RateLimitBucket {
  count: number
  resetAt: number
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds: number
}

const buckets = new Map<string, RateLimitBucket>()
const MAX_BUCKETS = 10_000

const hashKey = (value: string) => createHash('sha256').update(value).digest('hex')

export const getClientRateLimitKey = (headers: Headers) => {
  const forwardedFor = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = forwardedFor || headers.get('x-real-ip')?.trim() || 'unknown'

  return hashKey(address)
}

export const checkRateLimit = (
  scope: string,
  identity: string,
  rule: RateLimitRule,
  now = Date.now()
): RateLimitResult => {
  const key = `${scope}:${hashKey(identity)}`
  const existing = buckets.get(key)
  const bucket = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + rule.windowMs } : existing

  bucket.count += 1
  buckets.set(key, bucket)

  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, candidate] of buckets) {
      if (candidate.resetAt <= now) buckets.delete(bucketKey)
      if (buckets.size <= MAX_BUCKETS) break
    }

    while (buckets.size > MAX_BUCKETS) {
      const oldestKey = buckets.keys().next().value

      if (!oldestKey) break
      buckets.delete(oldestKey)
    }
  }

  const allowed = bucket.count <= rule.limit

  return {
    allowed,
    limit: rule.limit,
    remaining: Math.max(0, rule.limit - bucket.count),
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
  }
}

export const getRateLimitHeaders = (result: RateLimitResult) => ({
  'Retry-After': String(result.retryAfterSeconds),
  'X-RateLimit-Limit': String(result.limit),
  'X-RateLimit-Remaining': String(result.remaining),
  'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000))
})

export const resetRateLimitsForTests = () => buckets.clear()
