import { trackAICrawlerRequest } from '@datafast/ai-crawl'
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'

import { DATAFAST_DOMAIN, DATAFAST_WEBSITE_ID } from '@/lib/analytics/datafast'

export function proxy(request: NextRequest, event: NextFetchEvent) {
  trackAICrawlerRequest(request, event, {
    websiteId: DATAFAST_WEBSITE_ID,
    domain: DATAFAST_DOMAIN
  })

  if (request.nextUrl.pathname === '/seo-prompts') {
    const destination = request.nextUrl.clone()

    destination.pathname = '/zh/seo-prompts'

    return NextResponse.redirect(destination, 308)
  }

  const requestHeaders = new Headers(request.headers)

  const isChinesePath =
    request.nextUrl.pathname === '/zh' ||
    request.nextUrl.pathname.startsWith('/zh/') ||
    request.headers.get('x-page-locale') === 'zh-CN'

  if (
    request.nextUrl.searchParams.has('lang') &&
    /^\/(?:zh\/)?(?:about|services|tools|utm-builder)(?:\/|$)/.test(request.nextUrl.pathname)
  ) {
    const destination = request.nextUrl.clone()
    const wantsChinese = request.nextUrl.searchParams.get('lang')?.toLowerCase().startsWith('zh')

    destination.pathname = wantsChinese
      ? `/zh${request.nextUrl.pathname.replace(/^\/zh(?=\/|$)/, '')}`
      : request.nextUrl.pathname.replace(/^\/zh(?=\/|$)/, '') || '/'
    destination.searchParams.delete('lang')

    return NextResponse.redirect(destination, 308)
  }

  requestHeaders.set('x-page-locale', isChinesePath ? 'zh-CN' : 'en')

  if (/^\/zh\/(?:about|services|tools|utm-builder)(?:\/|$)/.test(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone()

    destination.pathname = request.nextUrl.pathname.replace(/^\/zh/, '')

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
