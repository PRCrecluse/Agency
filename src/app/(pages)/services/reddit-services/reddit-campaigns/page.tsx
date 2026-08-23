import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { getSpecializedServiceLang, specializedServicePages } from '@/content/specialized-service-pages'

const path = '/services/reddit-services/reddit-campaigns'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)
  const metadata = specializedServicePages.redditCampaigns[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: {
      canonical: path
    }
  }
}

const RedditCampaignsPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)

  return <SpecializedServicePage lang={lang} path={path} copy={specializedServicePages.redditCampaigns[lang]} />
}

export default RedditCampaignsPage
