import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { newSeoServicePages } from '@/content/new-seo-service-pages'
import { getSpecializedServiceLang } from '@/content/specialized-service-pages'

const path = '/services/seo-services/keyword-research'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)
  const metadata = newSeoServicePages.keywordResearch[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: { canonical: path }
  }
}

const KeywordResearchPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)

  return <SpecializedServicePage lang={lang} path={path} copy={newSeoServicePages.keywordResearch[lang]} />
}

export default KeywordResearchPage
