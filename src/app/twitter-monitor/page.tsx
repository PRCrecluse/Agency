import type { Metadata } from 'next'

import { TwitterMonitorDashboard } from '@/components/twitter-monitor/twitter-monitor-dashboard'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Pulsewatch — X Campaign Monitor',
  description: 'Continuously monitor X campaign traffic, clicks, conversions, and performance trends.'
}

export default async function TwitterMonitorPage() {
  const initialSnapshot = await getMonitorSnapshot()

  return <TwitterMonitorDashboard initialSnapshot={initialSnapshot} />
}
