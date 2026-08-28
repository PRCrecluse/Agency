import { NextResponse, type NextRequest } from 'next/server'

import {
  collectCampaignMetrics,
  configureTwitterMonitor,
  getMonitorSnapshot,
  ingestMetricPoint,
  toggleCampaign
} from '@/lib/twitter-monitor/store'
import type { ConfigureTwitterMonitorInput, IngestPointInput } from '@/lib/twitter-monitor/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const errorResponse = (message: string, status = 400) => NextResponse.json({ error: message }, { status })

export async function GET() {
  try {
    return NextResponse.json(await getMonitorSnapshot())
  } catch (error) {
    console.error('Failed to load Twitter monitor snapshot', error)

    return errorResponse('Unable to load the persisted campaign data.', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      action?: string
      force?: boolean
      campaignId?: string
      monitor?: ConfigureTwitterMonitorInput
      point?: IngestPointInput
    }

    if (body.action === 'collect') {
      return NextResponse.json(await collectCampaignMetrics(body.force ?? false))
    }

    if (body.action === 'configure') {
      if (!body.monitor?.url || !body.monitor.monitorStartAt || !body.monitor.monitorEndAt) {
        return errorResponse('Tweet URL, start time, and end time are required.')
      }

      return NextResponse.json({ snapshot: await configureTwitterMonitor(body.monitor) })
    }

    if (body.action === 'toggle') {
      if (!body.campaignId) return errorResponse('campaignId is required.')

      return NextResponse.json({ snapshot: await toggleCampaign(body.campaignId) })
    }

    if (body.action === 'ingest') {
      const configuredSecret = process.env.TWITTER_MONITOR_INGEST_SECRET
      const suppliedSecret = request.headers.get('x-monitor-secret')

      if (configuredSecret && suppliedSecret !== configuredSecret) return errorResponse('Unauthorized.', 401)
      if (!body.point?.campaignId) return errorResponse('A metric point with campaignId is required.')

      return NextResponse.json({ snapshot: await ingestMetricPoint(body.point) })
    }

    return errorResponse('Unsupported action.')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected monitor error'
    const validationError = message.startsWith('Please enter') || message.startsWith('The monitoring')

    console.error('Twitter monitor mutation failed', error)

    return errorResponse(message, message === 'Campaign not found' ? 404 : validationError ? 400 : 500)
  }
}
