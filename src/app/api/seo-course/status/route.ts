import { NextResponse, type NextRequest } from 'next/server'

import {
  courseAccessCookieOptions,
  createCourseAccessToken,
  getCourseOrder,
  SEO_COURSE_ACCESS_COOKIE,
  syncStripeCourseOrder,
  verifyCourseOrderClient
} from '@/lib/seo-course-payments'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { orderId?: string; clientToken?: string }

    if (!body.orderId || !body.clientToken) {
      return NextResponse.json({ error: '缺少订单信息' }, { status: 400 })
    }

    let order = await getCourseOrder(body.orderId)

    if (!order || !verifyCourseOrderClient(order, body.clientToken)) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    if (order.status === 'pending') order = await syncStripeCourseOrder(order)

    const response = NextResponse.json({
      orderId: order.orderId,
      status: order.status,
      paidAt: order.paidAt
    })

    response.headers.set('Cache-Control', 'no-store')

    if (order.status === 'paid') {
      response.cookies.set(SEO_COURSE_ACCESS_COOKIE, createCourseAccessToken(order), courseAccessCookieOptions)
    }

    return response
  } catch (error) {
    console.error('SEO course order status failed', error)

    return NextResponse.json({ error: '暂时无法查询订单' }, { status: 503 })
  }
}
