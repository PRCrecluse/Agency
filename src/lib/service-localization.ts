import type { QueryLang } from '@/lib/language'

const externalHrefPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
const zhServicesPrefix = '/zh/services'
const servicesPrefix = '/services'

const normalizeHash = (hash?: string) => (hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '')

const splitHref = (href: string) => {
  const [pathAndQuery, hash = ''] = href.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')

  return {
    pathname,
    searchParams: new URLSearchParams(query),
    hash: normalizeHash(hash)
  }
}

export const isServicePath = (pathname?: string | null) => /^\/(?:zh\/)?services(?:\/|$)/.test(pathname ?? '')
export const isBlogPath = (pathname?: string | null) => /^\/(?:zh\/)?blog(?:\/|$)/.test(pathname ?? '')
export const isLocalizedPath = (pathname?: string | null) => isServicePath(pathname) || isBlogPath(pathname)

export const getServiceLangFromPath = (pathname?: string | null): QueryLang =>
  pathname?.startsWith(zhServicesPrefix) ? 'zh' : 'en'

export const stripServiceLanguagePrefix = (pathname: string) =>
  pathname.startsWith(zhServicesPrefix) ? pathname.replace(/^\/zh/, '') : pathname

export const getLocalizedServicePath = (pathname: string, lang: QueryLang) => {
  const englishPath = stripServiceLanguagePrefix(pathname)

  if (!englishPath.startsWith(servicesPrefix)) {
    return englishPath
  }

  return lang === 'zh' ? `/zh${englishPath}` : englishPath
}

export const buildServiceAlternates = (englishPath: string, lang: QueryLang = 'en') => {
  const canonical = getLocalizedServicePath(englishPath, lang)

  return {
    canonical,
    languages: {
      'en-US': englishPath,
      'zh-CN': getLocalizedServicePath(englishPath, 'zh'),
      'x-default': englishPath
    }
  } as const
}

export const localizeHref = (href: string, lang: QueryLang) => {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || externalHrefPattern.test(href)) {
    return href
  }

  const { pathname, searchParams, hash } = splitHref(href)

  searchParams.delete('lang')

  const localizedPathname = isServicePath(pathname) ? getLocalizedServicePath(pathname, lang) : pathname
  const serializedQuery = searchParams.toString()

  return `${localizedPathname}${serializedQuery ? `?${serializedQuery}` : ''}${hash}`
}

export const resolveLanguageFromLocation = ({
  pathname,
  search
}: {
  pathname?: string | null
  search?: string
}): QueryLang => {
  if (isServicePath(pathname)) {
    return getServiceLangFromPath(pathname)
  }

  if (isBlogPath(pathname)) {
    return pathname?.startsWith('/zh/blog') ? 'zh' : 'en'
  }

  const params = new URLSearchParams(search ?? '')

  return params.get('lang')?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}
