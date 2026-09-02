import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import UtmBuilder from '@/components/tools/utm-builder'
import { buildMetadata } from '@/lib/seo'
import { UTM_BUILDER_ACCESS_COOKIE, verifyAccessToken } from '@/lib/twitter-monitor/access'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Free UTM Builder | Meridian',
  description: 'Build clean campaign tracking URLs for Google Analytics, social, email, and paid media in seconds.',
  path: '/utm-builder',
  keywords: ['utm builder', 'campaign url builder', 'utm link generator', 'campaign tracking']
})

const UtmBuilderPage = async () => {
  const cookieStore = await cookies()
  const accessGranted = Boolean(verifyAccessToken(cookieStore.get(UTM_BUILDER_ACCESS_COOKIE)?.value))

  return <UtmBuilder initialAccessGranted={accessGranted} />
}

export default UtmBuilderPage
