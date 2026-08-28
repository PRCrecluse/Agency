import { NextResponse, type NextRequest } from 'next/server'

import { normalizeEmail, TWITTER_MONITOR_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'
import { sendTwitterMonitorReport } from '@/lib/twitter-monitor/report-email'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const session = verifyAccessToken(request.cookies.get(TWITTER_MONITOR_ACCESS_COOKIE)?.value)

  if (!session) return NextResponse.json({ error: 'Complete the access form before using this tool.' }, { status: 401 })

  try {
    const body = (await request.json()) as { email?: string }
    const email = normalizeEmail(body.email ?? session.email)
    const delivery = await sendTwitterMonitorReport(email, await getMonitorSnapshot())

    return NextResponse.json({
      sent: true,
      message: delivery.queued ? `Report queued for ${email}` : `Report sent to ${email}`
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not send the monitoring report'
    const configurationError = message === 'Email delivery is not configured'
    const noCampaign = message.startsWith('Configure an X post')

    console.error('Twitter monitor report delivery failed', error)

    return NextResponse.json({ error: message }, { status: configurationError ? 503 : noCampaign ? 400 : 502 })
  }
}
