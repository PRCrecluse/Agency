export type QueryLang = 'en' | 'zh'

const externalHrefPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i

export const getQueryLang = (value?: string | null): QueryLang => (value === 'zh' ? 'zh' : 'en')

export const withQueryLang = (href: string, lang: QueryLang) => {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || externalHrefPattern.test(href)) {
    return href
  }

  const [pathAndQuery, hash = ''] = href.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  const searchParams = new URLSearchParams(query)

  searchParams.set('lang', lang)

  const serializedQuery = searchParams.toString()

  return `${pathname}${serializedQuery ? `?${serializedQuery}` : ''}${hash ? `#${hash}` : ''}`
}
