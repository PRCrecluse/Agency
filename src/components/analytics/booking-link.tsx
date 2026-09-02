'use client'

import { useEffect, type ComponentProps, type MouseEvent } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BOOKING_CLICK_GOAL,
  BOOKING_ACQUISITION_PARAMETERS,
  DEFAULT_BOOKING_URL,
  buildTrackedBookingUrl,
  inferBookingPageType,
  inferBookingServiceType,
  normalizeBookingTrackingValue
} from '@/lib/analytics/booking'

const ATTRIBUTION_STORAGE_KEY = 'meridian_booking_attribution'

const getCurrentPageWithPersistedAttribution = () => {
  const currentPage = new URL(window.location.href)
  let persistedAttribution: Record<string, string> = {}

  try {
    const storedAttribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? '{}') as unknown

    if (storedAttribution && typeof storedAttribution === 'object' && !Array.isArray(storedAttribution)) {
      persistedAttribution = storedAttribution as Record<string, string>
    }
  } catch {
    persistedAttribution = {}
  }

  const hasCurrentAttribution = BOOKING_ACQUISITION_PARAMETERS.some(parameter =>
    currentPage.searchParams.has(parameter)
  )

  if (hasCurrentAttribution) {
    persistedAttribution = {}
  }

  for (const parameter of BOOKING_ACQUISITION_PARAMETERS) {
    const currentValue = currentPage.searchParams.get(parameter)
    const persistedValue = persistedAttribution[parameter]

    if (currentValue) {
      persistedAttribution[parameter] = currentValue
    } else if (!hasCurrentAttribution && typeof persistedValue === 'string' && persistedValue) {
      currentPage.searchParams.set(parameter, persistedValue)
    }
  }

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(persistedAttribution))
  } catch {
    // Tracking must never block the booking link when storage is unavailable.
  }

  return currentPage.toString()
}

type BookingLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'onClick'> & {
  href?: string
  ctaLocation: string
  pageType?: string
  serviceType?: string
  language?: 'en' | 'zh'
  onClick?: ComponentProps<typeof Link>['onClick']
}

const BookingLink = ({
  href = DEFAULT_BOOKING_URL,
  ctaLocation,
  pageType,
  serviceType,
  language,
  onClick,
  ...props
}: BookingLinkProps) => {
  const pathname = usePathname()
  const resolvedPageType = normalizeBookingTrackingValue(pageType ?? inferBookingPageType(pathname))

  const resolvedServiceType = normalizeBookingTrackingValue(serviceType ?? inferBookingServiceType(pathname, href))

  const resolvedCtaLocation = normalizeBookingTrackingValue(ctaLocation)
  const resolvedLanguage = language ?? (pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en')

  useEffect(() => {
    getCurrentPageWithPersistedAttribution()
  }, [pathname])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = buildTrackedBookingUrl(href, getCurrentPageWithPersistedAttribution(), {
      sourcePage: pathname,
      pageType: resolvedPageType,
      serviceType: resolvedServiceType,
      ctaLocation: resolvedCtaLocation,
      language: resolvedLanguage
    })

    onClick?.(event)
  }

  return (
    <Link
      href={href}
      data-fast-goal={BOOKING_CLICK_GOAL}
      data-fast-goal-source-page={pathname}
      data-fast-goal-page-type={resolvedPageType}
      data-fast-goal-service-type={resolvedServiceType}
      data-fast-goal-cta-location={resolvedCtaLocation}
      data-fast-goal-language={resolvedLanguage}
      onClick={handleClick}
      {...props}
    />
  )
}

export default BookingLink
