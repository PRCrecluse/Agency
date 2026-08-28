import { cookies } from 'next/headers'

import { TwitterMonitorDashboard } from '@/components/twitter-monitor/twitter-monitor-dashboard'
import { buildMetadata } from '@/lib/seo'
import { TWITTER_MONITOR_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'
import type { TwitterMonitorSnapshot } from '@/lib/twitter-monitor/types'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'X Post Traffic Monitor | Meridian',
  description: 'Monitor the traffic performance of a single X post over a selected time window.',
  path: '/twitter-monitor'
})

export default async function TwitterMonitorPage() {
  const cookieStore = await cookies()
  const session = verifyAccessToken(cookieStore.get(TWITTER_MONITOR_ACCESS_COOKIE)?.value)

  const initialSnapshot: TwitterMonitorSnapshot = session
    ? await getMonitorSnapshot()
    : {
        version: 1,
        campaigns: [],
        points: [],
        activity: [],
        updatedAt: new Date().toISOString(),
        storage: { driver: process.env.DATABASE_URL ? 'planetscale' : 'json-file', persistent: true }
      }

  return (
    <TwitterMonitorDashboard
      initialSnapshot={initialSnapshot}
      initialAccessGranted={Boolean(session)}
      initialReportEmail={session?.email ?? ''}
    />
  )
}
