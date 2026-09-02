import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { specializedServicePages } from '@/content/specialized-service-pages'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createLocalizedAlternates } from '@/lib/seo'

const path = '/services/reddit-services/community-management'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const metadata = specializedServicePages.redditCommunityManagement[lang].metadata

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    path: getLocalizedPath(path, lang),
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

const RedditCommunityManagementPage = async () => {
  const lang = await getRequestLanguage()

  return (
    <SpecializedServicePage
      lang={lang}
      path={getLocalizedPath(path, lang)}
      copy={specializedServicePages.redditCommunityManagement[lang]}
    />
  )
}

export default RedditCommunityManagementPage
