import { cookies } from 'next/headers'

import ToolBreadcrumb from '@/components/layout/tool-breadcrumb'
import { TwitterMonitorDashboard } from '@/components/twitter-monitor/twitter-monitor-dashboard'
import TwitterMonitorGuide from '@/components/twitter-monitor/twitter-monitor-guide'
import { buildMetadata, createBreadcrumbSchema, createWebPageSchema } from '@/lib/seo'
import { TWITTER_MONITOR_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'
import { getMonitorSnapshot } from '@/lib/twitter-monitor/store'
import type { TwitterMonitorSnapshot } from '@/lib/twitter-monitor/types'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Free Twitter (X) Post Analytics Tracker | Meridian',
  description:
    'Track a public X or Twitter post’s impressions, engagements, link clicks, and engagement rate over time in a free analytics dashboard.',
  path: '/twitter-monitor',
  keywords: [
    'twitter analytics tool',
    'free twitter analytics',
    'twitter analytics dashboard',
    'twitter post analytics',
    'tweet analytics',
    'twitter post tracker',
    'twitter engagement tracker',
    'twitter impressions tracker',
    'x analytics tool'
  ]
})

export default async function TwitterMonitorPage() {
  const cookieStore = await cookies()
  const session = verifyAccessToken(cookieStore.get(TWITTER_MONITOR_ACCESS_COOKIE)?.value)

  const initialSnapshot: TwitterMonitorSnapshot = session
    ? await getMonitorSnapshot(session.workspaceId)
    : {
        version: 1,
        campaigns: [],
        points: [],
        activity: [],
        updatedAt: new Date().toISOString(),
        storage: { driver: process.env.DATABASE_URL ? 'planetscale' : 'json-file', persistent: true }
      }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema({
        path: '/twitter-monitor',
        title: 'Free Twitter (X) Post Analytics Tracker',
        description:
          'Track a public X or Twitter post’s impressions, engagements, link clicks, and engagement rate over time.',
        language: 'en'
      }),
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Free tools', path: '/tools' },
        { name: 'Twitter Post Analytics Tracker', path: '/twitter-monitor' }
      ])
    ]
  }

  return (
    <>
      <ToolBreadcrumb currentLabel='Twitter Post Analytics Tracker' />
      <TwitterMonitorDashboard
        initialSnapshot={initialSnapshot}
        initialAccessGranted={Boolean(session)}
        initialReportEmail={session?.email ?? ''}
      />
      <TwitterMonitorGuide />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}
