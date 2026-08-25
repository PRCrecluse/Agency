import { trackAICrawlerRequest } from '@datafast/ai-crawl'
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'

import { DATAFAST_DOMAIN, DATAFAST_WEBSITE_ID } from '@/lib/analytics/datafast'

export function proxy(request: NextRequest, event: NextFetchEvent) {
  trackAICrawlerRequest(request, event, {
    websiteId: DATAFAST_WEBSITE_ID,
    domain: DATAFAST_DOMAIN
  })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    'x-page-locale',
    request.nextUrl.pathname === '/zh' || request.nextUrl.pathname.startsWith('/zh/') ? 'zh-CN' : 'en'
  )

  if (/^\/zh\/services(?:\/|$)/.test(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone()

    destination.pathname = request.nextUrl.pathname.replace(/^\/zh/, '')
    destination.searchParams.set('lang', 'zh')

    return NextResponse.rewrite(destination, {
      request: {
        headers: requestHeaders
      }
    })
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
