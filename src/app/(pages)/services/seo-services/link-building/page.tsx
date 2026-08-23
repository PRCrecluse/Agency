import type { Metadata } from 'next'

import SpecializedServicePage from '@/components/services/specialized-service-page'
import { newSeoServicePages } from '@/content/new-seo-service-pages'
import { getSpecializedServiceLang } from '@/content/specialized-service-pages'

const path = '/services/seo-services/link-building'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)
  const metadata = newSeoServicePages.linkBuilding[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: { canonical: path }
  }
}

const LinkBuildingPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getSpecializedServiceLang(resolvedSearchParams?.lang)

  return <SpecializedServicePage lang={lang} path={path} copy={newSeoServicePages.linkBuilding[lang]} />
}

export default LinkBuildingPage
