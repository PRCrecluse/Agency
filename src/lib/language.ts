export type SiteLang = 'en' | 'zh'

const externalHrefPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
const localizablePathPattern = /^\/(?:zh\/)?(?:services|blog|utm-builder)(?:\/|$)/

export const getPathLanguage = (pathname: string): SiteLang =>
  pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en'

export const getLanguageTag = (lang: SiteLang) => (lang === 'zh' ? 'zh-CN' : 'en')

export const getLocalizedPath = (pathname: string, lang: SiteLang) => {
  const englishPath = pathname.replace(/^\/zh(?=\/|$)/, '') || '/'

  if (!localizablePathPattern.test(pathname)) {
    return englishPath
  }

  return lang === 'zh' ? `/zh${englishPath}` : englishPath
}

export const toLocalizedHref = (href: string, lang: SiteLang) => {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || externalHrefPattern.test(href)) {
    return href
  }

  const [pathAndQuery, hash = ''] = href.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  const searchParams = new URLSearchParams(query)

  searchParams.delete('lang')

  const localizedPathname = getLocalizedPath(pathname, lang)
  const serializedQuery = searchParams.toString()

  return `${localizedPathname}${serializedQuery ? `?${serializedQuery}` : ''}${hash ? `#${hash}` : ''}`
}

export const getLanguageAlternateHref = (
  href: string,
  lang: SiteLang,
  translatedBlogSlugs: ReadonlySet<string>
) => {
  const [pathAndQuery] = href.split('#')
  const [pathname] = pathAndQuery.split('?')

  if (!localizablePathPattern.test(pathname)) {
    return null
  }

  const englishPath = pathname.replace(/^\/zh(?=\/|$)/, '') || '/'
  const blogMatch = englishPath.match(/^\/blog\/([^/]+)\/?$/)

  if (blogMatch && !translatedBlogSlugs.has(blogMatch[1])) {
    return null
  }

  return toLocalizedHref(href, lang)
}
