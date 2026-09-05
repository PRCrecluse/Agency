import { NextResponse, type NextRequest } from 'next/server'

import {
  createCourseOrder,
  createStripeCheckout,
  markCourseOrderFailed,
} from '@/lib/seo-course-payments'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  let orderId: string | undefined

  try {
    const body = (await request.json()) as { email?: string }
    const { order, clientToken } = await createCourseOrder(body.email ?? '')

    orderId = order.orderId

    const session = await createStripeCheckout(order)

    return NextResponse.json({
      orderId: order.orderId,
      clientToken,
      provider: 'stripe',
      status: order.status,
      redirectUrl: session.url
    })
  } catch (error) {
    if (orderId) await markCourseOrderFailed(orderId).catch(() => undefined)

    const message = error instanceof Error ? error.message : '暂时无法创建订单'
    const isInputError = message === '请输入有效的邮箱地址'
    const isStripeModeMismatch = message.includes('No such payment_method_configuration')
    const isConfigurationError = /is not configured|is required for production|must contain/.test(message)

    if (!isInputError) console.error('SEO course checkout failed', error)

    return NextResponse.json(
      {
        error: isInputError
          ? message
          : isStripeModeMismatch
            ? 'Stripe 密钥与支付方式配置不属于同一运行模式，请联系课程顾问。'
          : isConfigurationError
            ? '支付商户参数尚未配置完成，请联系课程顾问。'
            : '订单创建失败，请稍后再试。'
      },
      { status: isInputError ? 400 : 503 }
    )
  }
}
