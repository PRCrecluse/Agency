import type { Metadata } from 'next'

import UtmBuilder from '@/components/tools/utm-builder'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Free UTM Builder | Meridian',
  description: 'Build clean campaign tracking URLs for Google Analytics, social, email, and paid media in seconds.',
  path: '/utm-builder',
  keywords: ['utm builder', 'campaign url builder', 'utm link generator', 'campaign tracking']
})

const UtmBuilderPage = () => <UtmBuilder />

export default UtmBuilderPage
