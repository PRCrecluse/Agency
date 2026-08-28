import { NextResponse, type NextRequest } from 'next/server'

import {
  accessCookieOptions,
  createAccessToken,
  persistLeadCapture,
  TWITTER_MONITOR_ACCESS_COOKIE,
  type LeadCaptureInput
} from '@/lib/twitter-monitor/access'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadCaptureInput>

    const { lead, storage } = await persistLeadCapture({
      companyName: body.companyName ?? '',
      website: body.website ?? '',
      role: body.role ?? '',
      email: body.email ?? ''
    })

    const response = NextResponse.json({
      granted: true,
      email: lead.email,
      storage,
      snapshot: await getMonitorSnapshot()
    })

    response.cookies.set(TWITTER_MONITOR_ACCESS_COOKIE, createAccessToken(lead), accessCookieOptions)
    response.headers.set('Cache-Control', 'no-store')

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not submit the access form'
    const configurationError = message.includes('not configured') || message.startsWith('Notion rejected')

    console.error('Twitter monitor access submission failed', error)

    return NextResponse.json({ error: message }, { status: configurationError ? 503 : 400 })
  }
}
