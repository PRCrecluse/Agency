import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { getSpecializedServiceLang, specializedServicePages } from '@/content/specialized-service-pages'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const path = '/services/reddit-services/community-management'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)
  const metadata = specializedServicePages.redditCommunityManagement[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: {
      canonical: `${baseUrl}${path}`
    }
  }
}

const RedditCommunityManagementPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)

  return (
    <SpecializedServicePage
      lang={lang}
      path={path}
      copy={specializedServicePages.redditCommunityManagement[lang]}
    />
  )
}

export default RedditCommunityManagementPage
