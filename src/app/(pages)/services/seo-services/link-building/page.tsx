import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { newSeoServicePages } from '@/content/new-seo-service-pages'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createLocalizedAlternates } from '@/lib/seo'

const path = '/services/seo-services/link-building'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const metadata = newSeoServicePages.linkBuilding[lang].metadata

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    path: getLocalizedPath(path, lang),
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

const LinkBuildingPage = async () => {
  const lang = await getRequestLanguage()

  return <SpecializedServicePage lang={lang} path={getLocalizedPath(path, lang)} copy={newSeoServicePages.linkBuilding[lang]} />
}

export default LinkBuildingPage
