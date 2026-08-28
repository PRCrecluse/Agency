import { NextResponse, type NextRequest } from 'next/server'

import { TWITTER_MONITOR_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'
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

export async function GET(request: NextRequest) {
  const session = verifyAccessToken(request.cookies.get(TWITTER_MONITOR_ACCESS_COOKIE)?.value)

  if (!session) return errorResponse('Complete the access form before using this tool.', 401)

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

    if (body.action === 'ingest') {
      const configuredSecret = process.env.TWITTER_MONITOR_INGEST_SECRET
      const suppliedSecret = request.headers.get('x-monitor-secret')

      if (
        (!configuredSecret && process.env.NODE_ENV === 'production') ||
        (configuredSecret && suppliedSecret !== configuredSecret)
      ) {
        return errorResponse('Unauthorized.', 401)
      }

      if (!body.point?.campaignId) return errorResponse('A metric point with campaignId is required.')

      return NextResponse.json({ snapshot: await ingestMetricPoint(body.point) })
    }

    const session = verifyAccessToken(request.cookies.get(TWITTER_MONITOR_ACCESS_COOKIE)?.value)

    if (!session) return errorResponse('Complete the access form before using this tool.', 401)

    if (body.action === 'collect') {
      return NextResponse.json(await collectCampaignMetrics(body.force ?? false))
    }

    if (body.action === 'configure') {
      if (!body.monitor?.url || !body.monitor.monitorStartAt || !body.monitor.monitorEndAt) {
        return errorResponse('Tweet URL, start time, and end time are required.')
      }

      const configuredSnapshot = await configureTwitterMonitor(body.monitor)
      const campaign = configuredSnapshot.campaigns[0]

      const collection = campaign
        ? await collectCampaignMetrics(true, [campaign.id])
        : { snapshot: configuredSnapshot, collected: 0, errors: [] }

      return NextResponse.json(collection)
    }

    if (body.action === 'toggle') {
      if (!body.campaignId) return errorResponse('campaignId is required.')

      return NextResponse.json({ snapshot: await toggleCampaign(body.campaignId) })
    }

    return errorResponse('Unsupported action.')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected monitor error'
    const validationError = message.startsWith('Please enter') || message.startsWith('The monitoring')

    console.error('Twitter monitor mutation failed', error)

    return errorResponse(message, message === 'Campaign not found' ? 404 : validationError ? 400 : 500)
  }
}
