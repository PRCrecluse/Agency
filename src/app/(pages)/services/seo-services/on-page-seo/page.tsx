import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { getSpecializedServiceLang, specializedServicePages } from '@/content/specialized-service-pages'
import { createLocalizedAlternates } from '@/lib/seo'

const path = '/services/seo-services/on-page-seo'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)
  const metadata = specializedServicePages.onPageSeo[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: createLocalizedAlternates(path, lang)
  }
}

const OnPageSEOPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)

  return <SpecializedServicePage lang={lang} path={path} copy={specializedServicePages.onPageSeo[lang]} />
}

export default OnPageSEOPage
