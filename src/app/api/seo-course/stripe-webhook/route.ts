import { NextResponse, type NextRequest } from 'next/server'

import { applyStripeWebhookEvent, constructStripeWebhookEvent } from '@/lib/seo-course-payments'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('stripe-signature')

    if (!signature) return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })

    const rawBody = await request.text()
    const event = constructStripeWebhookEvent(rawBody, signature)

    await applyStripeWebhookEvent(event)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe course webhook failed', error)

    return NextResponse.json({ error: 'Invalid Stripe webhook' }, { status: 400 })
  }
}
