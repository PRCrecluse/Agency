import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { specializedServicePages } from '@/content/specialized-service-pages'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { buildMetadata, createLocalizedAlternates } from '@/lib/seo'

const path = '/services/seo-services/programmatic-seo'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const metadata = specializedServicePages.programmaticSeo[lang].metadata

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    path: getLocalizedPath(path, lang),
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

const ProgrammaticSEOPage = async () => {
  const lang = await getRequestLanguage()

  return <SpecializedServicePage lang={lang} path={getLocalizedPath(path, lang)} copy={specializedServicePages.programmaticSeo[lang]} />
}

export default ProgrammaticSEOPage
