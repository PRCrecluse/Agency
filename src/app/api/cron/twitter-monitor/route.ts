import { type NextRequest, NextResponse } from 'next/server'

import { collectCampaignMetrics } from '@/lib/twitter-monitor/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const configuredSecret = process.env.CRON_SECRET
  const authorization = request.headers.get('authorization')

  if (
    (!configuredSecret && process.env.NODE_ENV === 'production') ||
    (configuredSecret && authorization !== `Bearer ${configuredSecret}`)
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await collectCampaignMetrics(false)

  return NextResponse.json({
    ok: result.errors.length === 0,
    collected: result.collected,
    errors: result.errors,
    updatedAt: result.snapshot.updatedAt
  })
}
