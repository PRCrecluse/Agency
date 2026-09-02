export const DEFAULT_BOOKING_URL = 'https://cal.com/team/meridian-growth'

export const BOOKING_CLICK_GOAL = 'booking_cta_click'

export const BOOKING_ACQUISITION_PARAMETERS = [
  'ref',
  'source',
  'via',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const

export type BookingTrackingContext = {
  sourcePage: string
  pageType: string
  serviceType: string
  ctaLocation: string
  language: 'en' | 'zh'
}

export const normalizeBookingTrackingValue = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 255)

export const inferBookingPageType = (pathname: string) => {
  const path = pathname.replace(/^\/zh(?=\/|$)/, '') || '/'

  if (path === '/') return 'homepage'
  if (path === '/blog') return 'blog_index'
  if (path.startsWith('/blog/')) return 'blog_article'
  if (path === '/services') return 'services_index'
  if (path.startsWith('/services/')) return 'service_page'
  if (path.startsWith('/about/stories/')) return 'case_study'
  if (path === '/about') return 'about'
  if (path === '/seo-prompts') return 'tool'

  return 'page'
}

export const inferBookingServiceType = (pathname: string, bookingUrl: string) => {
  const path = pathname.replace(/^\/zh(?=\/|$)/, '') || '/'

  if (bookingUrl.includes('geo-services') || path.includes('/geo-services')) return 'geo'
  if (bookingUrl.includes('book-a-demo') || path.includes('/reddit-services')) return 'reddit'
  if (bookingUrl.includes('seo-services') || path.includes('/seo-services') || path === '/seo-prompts') return 'seo'

  return 'growth_strategy'
}

export const buildTrackedBookingUrl = (bookingUrl: string, currentPageUrl: string, context: BookingTrackingContext) => {
  const destination = new URL(bookingUrl)
  const currentPage = new URL(currentPageUrl)

  for (const parameter of BOOKING_ACQUISITION_PARAMETERS) {
    const value = currentPage.searchParams.get(parameter)

    if (value && !destination.searchParams.has(parameter)) {
      destination.searchParams.set(parameter, value)
    }
  }

  const originalSource =
    currentPage.searchParams.get('utm_source') ??
    currentPage.searchParams.get('ref') ??
    currentPage.searchParams.get('source') ??
    currentPage.searchParams.get('via')

  if (!destination.searchParams.has('utm_source')) {
    destination.searchParams.set('utm_source', originalSource ?? 'withmeridian')
  }

  if (!destination.searchParams.has('utm_medium')) {
    destination.searchParams.set('utm_medium', 'website')
  }

  if (!destination.searchParams.has('utm_campaign')) {
    destination.searchParams.set(
      'utm_campaign',
      normalizeBookingTrackingValue(context.serviceType) || 'growth_strategy'
    )
  }

  if (!destination.searchParams.has('utm_content')) {
    destination.searchParams.set(
      'utm_content',
      [context.pageType, context.ctaLocation].map(normalizeBookingTrackingValue).filter(Boolean).join(':')
    )
  }

  destination.searchParams.set('source_page', context.sourcePage.slice(0, 255))
  destination.searchParams.set('page_type', normalizeBookingTrackingValue(context.pageType))
  destination.searchParams.set('service_type', normalizeBookingTrackingValue(context.serviceType))
  destination.searchParams.set('cta_location', normalizeBookingTrackingValue(context.ctaLocation))
  destination.searchParams.set('language', context.language)

  return destination.toString()
}
