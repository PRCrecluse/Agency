import { type NextRequest, NextResponse } from 'next/server'

import { collectAllCampaignMetrics } from '@/lib/twitter-monitor/store'

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

  const result = await collectAllCampaignMetrics()

  return NextResponse.json({
    ok: result.errors.length === 0,
    collected: result.collected,
    workspaces: result.workspaces,
    errors: result.errors,
    updatedAt: result.updatedAt
  })
}
