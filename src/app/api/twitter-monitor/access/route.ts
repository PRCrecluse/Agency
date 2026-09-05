import { NextResponse, type NextRequest } from 'next/server'

import {
  accessCookieOptions,
  createAccessToken,
  persistLeadCapture,
  TWITTER_MONITOR_ACCESS_COOKIE,
  type LeadCaptureInput
} from '@/lib/twitter-monitor/access'
import { checkRateLimit, getClientRateLimitKey, getRateLimitHeaders } from '@/lib/rate-limit'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ACCESS_FORM_ERRORS = new Set([
  'Company name is required',
  'Your role is required',
  'Please enter a valid company website',
  'Please enter a valid report email address'
])

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit('twitter-monitor-access', getClientRateLimitKey(request.headers), {
    limit: 8,
    windowMs: 10 * 60 * 1000
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many access attempts. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateLimit) }
    )
  }

  try {
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required for Twitter monitor persistence in production')
    }

    const body = (await request.json()) as Partial<LeadCaptureInput>

    const { lead, storage, workspaceId } = await persistLeadCapture({
      companyName: body.companyName ?? '',
      website: body.website ?? '',
      role: body.role ?? '',
      email: body.email ?? ''
    })

    const response = NextResponse.json({
      granted: true,
      email: lead.email,
      storage,
      snapshot: await getMonitorSnapshot(workspaceId)
    })

    response.cookies.set(TWITTER_MONITOR_ACCESS_COOKIE, createAccessToken(lead, workspaceId), accessCookieOptions)
    response.headers.set('Cache-Control', 'no-store')

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not submit the access form'
    const formError = ACCESS_FORM_ERRORS.has(message)

    console.error('Twitter monitor access submission failed', error)

    return NextResponse.json(
      { error: formError ? message : "We couldn't unlock the monitor right now. Please try again shortly." },
      { status: formError ? 400 : 503 }
    )
  }
}
