export type QueryLang = 'en' | 'zh'

const externalHrefPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i

export const getQueryLang = (value?: string | null): QueryLang => (value?.toLowerCase().startsWith('zh') ? 'zh' : 'en')

export const withQueryLang = (href: string, lang: QueryLang) => {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || externalHrefPattern.test(href)) {
    return href
  }

  const [pathAndQuery, hash = ''] = href.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  const searchParams = new URLSearchParams(query)

  searchParams.delete('lang')

  const normalizedPathname =
    pathname.startsWith('/zh/services') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/zh/blog') ||
    pathname.startsWith('/blog')
      ? lang === 'zh'
        ? pathname.startsWith('/zh/')
          ? pathname
          : `/zh${pathname}`
        : pathname.replace(/^\/zh(?=\/(?:services|blog))/, '')
      : pathname

  const serializedQuery = searchParams.toString()

  return `${normalizedPathname}${serializedQuery ? `?${serializedQuery}` : ''}${hash ? `#${hash}` : ''}`
}
