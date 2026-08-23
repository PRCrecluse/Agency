export type QueryLang = 'en' | 'zh'

const externalHrefPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
const translatedBlogSlugs = new Set(['b2b-ai-saas-b2c-seo-url-strategy'])

export const getQueryLang = (value?: string | null): QueryLang => (value?.toLowerCase().startsWith('zh') ? 'zh' : 'en')

export const withQueryLang = (href: string, lang: QueryLang) => {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || externalHrefPattern.test(href)) {
    return href
  }

  const [pathAndQuery, hash = ''] = href.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  const searchParams = new URLSearchParams(query)

  searchParams.delete('lang')

  let localizedPathname = pathname

  if (/^\/(?:zh\/)?(?:services|blog)(?:\/|$)/.test(pathname)) {
    localizedPathname = lang === 'zh' ? (pathname.startsWith('/zh/') ? pathname : `/zh${pathname}`) : pathname.replace(/^\/zh/, '')
  }

  if (lang === 'zh' && pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length).replace(/\/$/, '')

    if (!translatedBlogSlugs.has(slug)) {
      localizedPathname = '/zh/blog'
    }
  }

  const serializedQuery = searchParams.toString()

  return `${localizedPathname}${serializedQuery ? `?${serializedQuery}` : ''}${hash ? `#${hash}` : ''}`
}
