import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { connect, type Connection } from '@planetscale/database'
import Stripe from 'stripe'

import { SEO_COURSE_PRICE_FEN, SEO_COURSE_TITLE } from '@/content/seo-course'

export type CourseOrderStatus = 'pending' | 'paid' | 'failed' | 'expired'

export type CourseOrder = {
  orderId: string
  clientTokenHash: string
  email: string
  provider: 'stripe'
  amountFen: number
  status: CourseOrderStatus
  providerTradeNo: string | null
  createdAt: string
  paidAt: string | null
}

export const SEO_COURSE_ACCESS_COOKIE = 'meridian_seo_course_access'
export const STRIPE_PAYMENT_METHOD_CONFIGURATION =
  process.env.STRIPE_PAYMENT_METHOD_CONFIGURATION?.trim() || 'pmc_1StgF5L8wdcuLUq6sOmvV4hi'

const ACCESS_TTL_SECONDS = 60 * 60 * 24 * 365
const COURSE_METADATA_VALUE = 'meridian-seo-course-phase-1'
const LOCAL_DATA_DIR = process.env.SEO_COURSE_DATA_DIR ?? path.join(process.cwd(), '.data')
const LOCAL_ORDERS_FILE = path.join(LOCAL_DATA_DIR, 'seo-course-orders.json')

let databaseConnection: Connection | undefined
let databaseSchemaReady: Promise<void> | undefined
let localWriteQueue: Promise<unknown> = Promise.resolve()
let stripeClient: Stripe | undefined

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

const safeEqualText = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

const getRequiredEnv = (name: string) => {
  const value = process.env[name]?.trim()

  if (!value) throw new Error(`${name} is not configured`)

  return value
}

const getSiteUrl = () => {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, '')

  if (configured) return configured
  if (process.env.NODE_ENV === 'production') throw new Error('NEXT_PUBLIC_APP_URL is not configured')

  return 'http://localhost:3000'
}

const getStripe = () => {
  stripeClient ??= new Stripe(getRequiredEnv('STRIPE_SECRET_KEY'), {
    appInfo: {
      name: 'Meridian SEO Course',
      version: '1.0.0',
      url: getSiteUrl()
    }
  })

  return stripeClient
}

const getAccessSecret = () => {
  const configured = process.env.SEO_COURSE_ACCESS_SECRET

  if (configured) {
    if (process.env.NODE_ENV === 'production' && configured.length < 32) {
      throw new Error('SEO_COURSE_ACCESS_SECRET must contain at least 32 characters')
    }

    return configured
  }

  if (process.env.NODE_ENV === 'production') throw new Error('SEO_COURSE_ACCESS_SECRET is not configured')

  return 'meridian-seo-course-local-development-secret'
}

export const normalizeCourseEmail = (value: string) => {
  const email = value.trim().toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('请输入有效的邮箱地址')
  }

  return email
}

const getDatabase = () => {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) return undefined

  databaseConnection ??= connect({ url: databaseUrl })

  return databaseConnection
}

const ensureDatabaseSchema = async (database: Connection) => {
  databaseSchemaReady ??= database
    .execute(`
      CREATE TABLE IF NOT EXISTS seo_course_orders (
        order_id VARCHAR(32) NOT NULL PRIMARY KEY,
        client_token_hash CHAR(64) NOT NULL,
        email VARCHAR(254) NOT NULL,
        provider VARCHAR(16) NOT NULL,
        amount_fen INT NOT NULL,
        status VARCHAR(16) NOT NULL,
        provider_trade_no VARCHAR(128) NULL,
        created_at DATETIME(3) NOT NULL,
        paid_at DATETIME(3) NULL,
        INDEX seo_course_orders_email_idx (email),
        INDEX seo_course_orders_status_idx (status)
      )
    `)
    .then(() => undefined)

  await databaseSchemaReady
}

const fromDatabaseRow = (row: Record<string, unknown>): CourseOrder => ({
  orderId: String(row.order_id),
  clientTokenHash: String(row.client_token_hash),
  email: String(row.email),
  provider: 'stripe',
  amountFen: Number(row.amount_fen),
  status: String(row.status) as CourseOrderStatus,
  providerTradeNo: row.provider_trade_no ? String(row.provider_trade_no) : null,
  createdAt: new Date(String(row.created_at)).toISOString(),
  paidAt: row.paid_at ? new Date(String(row.paid_at)).toISOString() : null
})

const readLocalOrders = async (): Promise<CourseOrder[]> => {
  try {
    const stored = JSON.parse(await readFile(LOCAL_ORDERS_FILE, 'utf8')) as unknown

    return Array.isArray(stored) ? (stored as CourseOrder[]) : []
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []

    throw error
  }
}

const writeLocalOrders = async (orders: CourseOrder[]) => {
  await mkdir(LOCAL_DATA_DIR, { recursive: true })

  const temporaryFile = `${LOCAL_ORDERS_FILE}.${process.pid}.${randomBytes(6).toString('hex')}.tmp`

  await writeFile(temporaryFile, JSON.stringify(orders, null, 2), 'utf8')
  await rename(temporaryFile, LOCAL_ORDERS_FILE)
}

const mutateLocalOrders = async (mutate: (orders: CourseOrder[]) => void) => {
  const operation = localWriteQueue.then(async () => {
    const orders = await readLocalOrders()

    mutate(orders)
    await writeLocalOrders(orders)
  })

  localWriteQueue = operation.catch(() => undefined)
  await operation
}

const persistOrder = async (order: CourseOrder) => {
  const database = getDatabase()

  if (database) {
    await ensureDatabaseSchema(database)
    await database.execute(
      `INSERT INTO seo_course_orders
        (order_id, client_token_hash, email, provider, amount_fen, status, provider_trade_no, created_at, paid_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.orderId,
        order.clientTokenHash,
        order.email,
        order.provider,
        order.amountFen,
        order.status,
        order.providerTradeNo,
        new Date(order.createdAt),
        order.paidAt ? new Date(order.paidAt) : null
      ]
    )

    return
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL is required for production course payments')
  }

  await mutateLocalOrders(orders => orders.push(order))
}

export const createCourseOrder = async (emailValue: string) => {
  const clientToken = randomBytes(24).toString('base64url')

  const order: CourseOrder = {
    orderId: `SEO${Date.now().toString(36).toUpperCase()}${randomBytes(5).toString('hex').toUpperCase()}`.slice(0, 32),
    clientTokenHash: hashToken(clientToken),
    email: normalizeCourseEmail(emailValue),
    provider: 'stripe',
    amountFen: SEO_COURSE_PRICE_FEN,
    status: 'pending',
    providerTradeNo: null,
    createdAt: new Date().toISOString(),
    paidAt: null
  }

  await persistOrder(order)

  return { order, clientToken }
}

export const getCourseOrder = async (orderId: string) => {
  const database = getDatabase()

  if (database) {
    await ensureDatabaseSchema(database)

    const result = await database.execute(
      `SELECT order_id, client_token_hash, email, provider, amount_fen, status, provider_trade_no, created_at, paid_at
       FROM seo_course_orders WHERE order_id = ? LIMIT 1`,
      [orderId]
    )

    const row = result.rows[0] as Record<string, unknown> | undefined

    return row ? fromDatabaseRow(row) : null
  }

  const orders = await readLocalOrders()

  return orders.find(order => order.orderId === orderId) ?? null
}

export const verifyCourseOrderClient = (order: CourseOrder, clientToken: string) =>
  safeEqualText(order.clientTokenHash, hashToken(clientToken))

const updateCourseOrder = async (
  orderId: string,
  values: { status?: CourseOrderStatus; providerTradeNo?: string; paidAt?: Date }
) => {
  const database = getDatabase()

  if (database) {
    await ensureDatabaseSchema(database)

    if (values.status === 'paid' && values.providerTradeNo && values.paidAt) {
      await database.execute(
        `UPDATE seo_course_orders
         SET status = 'paid', provider_trade_no = ?, paid_at = COALESCE(paid_at, ?)
         WHERE order_id = ? AND amount_fen = ?`,
        [values.providerTradeNo, values.paidAt, orderId, SEO_COURSE_PRICE_FEN]
      )

      return
    }

    if (values.providerTradeNo) {
      await database.execute(
        `UPDATE seo_course_orders SET provider_trade_no = ? WHERE order_id = ? AND status = 'pending'`,
        [values.providerTradeNo, orderId]
      )

      return
    }

    if (values.status) {
      await database.execute(`UPDATE seo_course_orders SET status = ? WHERE order_id = ? AND status = 'pending'`, [
        values.status,
        orderId
      ])
    }

    return
  }

  await mutateLocalOrders(orders => {
    const order = orders.find(item => item.orderId === orderId)

    if (!order) return

    if (values.status === 'paid' && values.providerTradeNo && values.paidAt) {
      if (order.amountFen !== SEO_COURSE_PRICE_FEN) return

      order.status = 'paid'
      order.providerTradeNo = values.providerTradeNo
      order.paidAt ??= values.paidAt.toISOString()

      return
    }

    if (order.status !== 'pending') return
    if (values.providerTradeNo) order.providerTradeNo = values.providerTradeNo
    if (values.status) order.status = values.status
  })
}

export const setCourseOrderProviderReference = (orderId: string, providerTradeNo: string) =>
  updateCourseOrder(orderId, { providerTradeNo })

export const markCourseOrderPaid = (orderId: string, providerTradeNo: string) =>
  updateCourseOrder(orderId, { status: 'paid', providerTradeNo, paidAt: new Date() })

export const markCourseOrderFailed = (orderId: string) => updateCourseOrder(orderId, { status: 'failed' })

export const markCourseOrderExpired = (orderId: string) => updateCourseOrder(orderId, { status: 'expired' })

export const createCourseAccessToken = (order: CourseOrder) => {
  if (order.status !== 'paid') throw new Error('Order is not paid')

  const payload = Buffer.from(
    JSON.stringify({
      orderId: order.orderId,
      email: order.email,
      expiresAt: Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS
    })
  ).toString('base64url')

  const signature = createHmac('sha256', getAccessSecret()).update(payload).digest('base64url')

  return `${payload}.${signature}`
}

export const verifyCourseAccessToken = (token?: string) => {
  if (!token) return false

  const [payload, signature, extra] = token.split('.')

  if (!payload || !signature || extra) return false

  const expected = createHmac('sha256', getAccessSecret()).update(payload).digest('base64url')

  if (!safeEqualText(signature, expected)) return false

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { expiresAt?: number }

    return typeof decoded.expiresAt === 'number' && decoded.expiresAt > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export const courseAccessCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: ACCESS_TTL_SECONDS
}

export const createStripeCheckout = async (order: CourseOrder) => {
  const siteUrl = getSiteUrl()

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    locale: 'zh',
    client_reference_id: order.orderId,
    customer_email: order.email,
    payment_method_configuration: STRIPE_PAYMENT_METHOD_CONFIGURATION,
    payment_intent_data: {
      receipt_email: order.email,
      metadata: {
        course: COURSE_METADATA_VALUE,
        orderId: order.orderId
      }
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'cny',
          unit_amount: SEO_COURSE_PRICE_FEN,
          product_data: {
            name: SEO_COURSE_TITLE,
            description: '12 节录播课 + 20 期 SEO、GEO 与 AEO 知识点更新'
          }
        }
      }
    ],
    metadata: {
      course: COURSE_METADATA_VALUE,
      orderId: order.orderId,
      paymentMethodConfiguration: STRIPE_PAYMENT_METHOD_CONFIGURATION
    },
    success_url: `${siteUrl}/seo-course?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/seo-course?payment=cancelled`
  })

  if (!session.url) throw new Error('Stripe Checkout did not return a redirect URL')

  await setCourseOrderProviderReference(order.orderId, session.id)

  return session
}

const validateStripeCheckoutSession = async (session: Stripe.Checkout.Session) => {
  const orderId = session.metadata?.orderId ?? session.client_reference_id
  const order = orderId ? await getCourseOrder(orderId) : null
  const sessionEmail = session.customer_details?.email ?? session.customer_email

  if (
    !order ||
    order.provider !== 'stripe' ||
    order.amountFen !== SEO_COURSE_PRICE_FEN ||
    session.client_reference_id !== order.orderId ||
    session.metadata?.course !== COURSE_METADATA_VALUE ||
    session.metadata?.paymentMethodConfiguration !== STRIPE_PAYMENT_METHOD_CONFIGURATION ||
    session.amount_total !== SEO_COURSE_PRICE_FEN ||
    session.currency !== 'cny' ||
    session.payment_status !== 'paid' ||
    (sessionEmail && normalizeCourseEmail(sessionEmail) !== order.email)
  ) {
    throw new Error('Stripe Checkout data does not match the course order')
  }

  const providerReference =
    typeof session.payment_intent === 'string' ? session.payment_intent : (session.payment_intent?.id ?? session.id)

  await markCourseOrderPaid(order.orderId, providerReference)

  return order.orderId
}

export const syncStripeCourseOrder = async (order: CourseOrder) => {
  if (order.status !== 'pending' || !order.providerTradeNo?.startsWith('cs_')) return order

  const session = await getStripe().checkout.sessions.retrieve(order.providerTradeNo)

  if (session.payment_status === 'paid') {
    await validateStripeCheckoutSession(session)
  } else if (session.status === 'expired') {
    await markCourseOrderExpired(order.orderId)
  }

  return (await getCourseOrder(order.orderId)) ?? order
}

export const constructStripeWebhookEvent = (rawBody: string, signature: string) =>
  getStripe().webhooks.constructEvent(rawBody, signature, getRequiredEnv('STRIPE_WEBHOOK_SECRET'))

export const applyStripeWebhookEvent = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      if (session.payment_status === 'paid') await validateStripeCheckoutSession(session)

      break
    case 'checkout.session.async_payment_failed':
      if (session.metadata?.orderId) await markCourseOrderFailed(session.metadata.orderId)

      break
    case 'checkout.session.expired':
      if (session.metadata?.orderId) await markCourseOrderExpired(session.metadata.orderId)

      break
    default:
      break
  }
}
