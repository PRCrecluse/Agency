import { TwitterMonitorDashboard } from '@/components/twitter-monitor/twitter-monitor-dashboard'
import { buildMetadata } from '@/lib/seo'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'X Post Traffic Monitor | Meridian',
  description: 'Monitor the traffic performance of a single X post over a selected time window.',
  path: '/twitter-monitor'
})

export default async function TwitterMonitorPage() {
  const initialSnapshot = await getMonitorSnapshot()

  return <TwitterMonitorDashboard initialSnapshot={initialSnapshot} />
}
