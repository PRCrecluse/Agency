import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { connect, type Connection } from '@planetscale/database'

export const TWITTER_MONITOR_ACCESS_COOKIE = 'twitter_monitor_access'
export const UTM_BUILDER_ACCESS_COOKIE = 'utm_builder_access'

const ACCESS_TTL_SECONDS = 60 * 60 * 24 * 30
const DEFAULT_NOTION_PARENT_PAGE_ID = '3caabc2b-f905-803a-b161-cbd01eed1060'
const NOTION_VERSION = '2026-03-11'
const DATA_DIRECTORY = process.env.TWITTER_MONITOR_DATA_DIR ?? path.join(process.cwd(), '.data')
const LEADS_FILE = path.join(DATA_DIRECTORY, 'twitter-monitor-leads.json')

let leadWriteQueue: Promise<unknown> = Promise.resolve()
let leadConnection: Connection | undefined
let leadSchemaReady: Promise<void> | undefined

export interface LeadCaptureInput {
  companyName: string
  website: string
  role: string
  email: string
}

export type LeadCaptureSource = 'twitter-monitor' | 'utm-builder'

export interface AccessSession {
  companyName: string
  email: string
  workspaceId: string
  expiresAt: number
}

interface LeadCaptureRecord extends LeadCaptureInput {
  id: string
  source: LeadCaptureSource
  createdAt: string
}

const LEAD_SOURCE_DETAILS: Record<LeadCaptureSource, { label: string; path: string }> = {
  'twitter-monitor': { label: 'X Monitor', path: '/twitter-monitor' },
  'utm-builder': { label: 'UTM Builder', path: '/utm-builder' }
}

const encode = (value: string) => Buffer.from(value, 'utf8').toString('base64url')
const decode = (value: string) => Buffer.from(value, 'base64url').toString('utf8')

function getAccessSecret() {
  const secret = process.env.TWITTER_MONITOR_ACCESS_SECRET

  if (secret) {
    if (process.env.NODE_ENV === 'production' && secret.length < 32) {
      throw new Error('TWITTER_MONITOR_ACCESS_SECRET must contain at least 32 characters')
    }

    return secret
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('TWITTER_MONITOR_ACCESS_SECRET is not configured')
  }

  return 'meridian-twitter-monitor-local-development-only'
}

export function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('Please enter a valid report email address')
  }

  return email
}

function normalizeWebsite(value: string) {
  const candidate = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`
  const website = new URL(candidate)

  if (
    !['http:', 'https:'].includes(website.protocol) ||
    !website.hostname.includes('.') ||
    website.href.length > 2048
  ) {
    throw new Error('Please enter a valid company website')
  }

  return website.toString()
}

export function validateLeadCapture(input: LeadCaptureInput): LeadCaptureInput {
  const companyName = input.companyName?.trim()
  const role = input.role?.trim()

  if (!companyName || companyName.length > 120) throw new Error('Company name is required')
  if (!role || role.length > 120) throw new Error('Your role is required')

  return {
    companyName,
    website: normalizeWebsite(input.website ?? ''),
    role,
    email: normalizeEmail(input.email ?? '')
  }
}

function textBlock(content: string) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content } }]
    }
  }
}

async function writeLeadToNotion(record: LeadCaptureRecord) {
  const notionToken = process.env.NOTION_API_TOKEN

  if (!notionToken) return false

  const parentPageId = process.env.NOTION_LEADS_PAGE_ID ?? DEFAULT_NOTION_PARENT_PAGE_ID
  const source = LEAD_SOURCE_DETAILS[record.source]

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION
    },
    body: JSON.stringify({
      parent: { type: 'page_id', page_id: parentPageId },
      properties: {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: `${record.companyName} — ${source.label} access` }
            }
          ]
        }
      },
      children: [
        textBlock(`Company: ${record.companyName}`),
        textBlock(`Website: ${record.website}`),
        textBlock(`Role: ${record.role}`),
        textBlock(`Report email: ${record.email}`),
        textBlock(`Workspace ID: ${record.id}`),
        textBlock(`Submitted: ${record.createdAt}`),
        textBlock(`Source: ${source.path}`)
      ]
    }),
    cache: 'no-store'
  })

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { message?: string } | null
    const detail = result?.message ? `: ${result.message}` : ''

    throw new Error(`Notion rejected the access form${detail}`)
  }

  return true
}

function getLeadDatabase() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) return undefined

  leadConnection ??= connect({ url: databaseUrl })

  return leadConnection
}

async function writeLeadToDatabase(record: LeadCaptureRecord) {
  const database = getLeadDatabase()

  if (!database) return false

  leadSchemaReady ??= database
    .execute(
      `
      CREATE TABLE IF NOT EXISTS twitter_monitor_leads (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        company_name VARCHAR(120) NOT NULL,
        website TEXT NOT NULL,
        role VARCHAR(120) NOT NULL,
        email VARCHAR(254) NOT NULL,
        source VARCHAR(32) NOT NULL,
        created_at DATETIME(3) NOT NULL
      )
    `
    )
    .then(() => undefined)

  await leadSchemaReady
  await database.execute(
    `INSERT INTO twitter_monitor_leads
      (id, company_name, website, role, email, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      record.id,
      record.companyName,
      record.website,
      record.role,
      record.email,
      record.source,
      new Date(record.createdAt)
    ]
  )

  return true
}

async function writeLeadToJson(record: LeadCaptureRecord) {
  const operation = leadWriteQueue.then(async () => {
    await mkdir(DATA_DIRECTORY, { recursive: true })

    let leads: LeadCaptureRecord[] = []

    try {
      const stored = JSON.parse(await readFile(LEADS_FILE, 'utf8')) as unknown

      if (Array.isArray(stored)) leads = stored as LeadCaptureRecord[]
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }

    leads.push(record)

    const temporaryFile = `${LEADS_FILE}.${process.pid}.${randomUUID()}.tmp`

    await writeFile(temporaryFile, JSON.stringify(leads, null, 2), 'utf8')
    await rename(temporaryFile, LEADS_FILE)
  })

  leadWriteQueue = operation.catch(() => undefined)

  await operation
}

export async function persistLeadCapture(input: LeadCaptureInput, source: LeadCaptureSource = 'twitter-monitor') {
  if (process.env.NODE_ENV === 'production') getAccessSecret()

  const lead = validateLeadCapture(input)

  const record: LeadCaptureRecord = {
    ...lead,
    id: randomUUID(),
    source,
    createdAt: new Date().toISOString()
  }

  const storedInNotion = await writeLeadToNotion(record)
  const storedInDatabase = storedInNotion ? false : await writeLeadToDatabase(record)

  if (!storedInNotion && !storedInDatabase) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('No persistent lead storage is configured')
    }

    await writeLeadToJson(record)
  }

  const storage = storedInNotion
    ? ('notion' as const)
    : storedInDatabase
      ? ('planetscale' as const)
      : ('json-file' as const)

  return { lead, storage, workspaceId: record.id }
}

export function createAccessToken(lead: LeadCaptureInput, workspaceId: string) {
  if (!/^[a-zA-Z0-9_-]{12,48}$/.test(workspaceId) || workspaceId === 'primary') {
    throw new Error('Invalid Twitter monitor workspace')
  }

  const session: AccessSession = {
    companyName: lead.companyName,
    email: lead.email,
    workspaceId,
    expiresAt: Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS
  }

  const payload = encode(JSON.stringify(session))
  const signature = createHmac('sha256', getAccessSecret()).update(payload).digest('base64url')

  return `${payload}.${signature}`
}

export function verifyAccessToken(token: string | undefined): AccessSession | null {
  if (!token) return null

  try {
    const [payload, signature, extra] = token.split('.')

    if (!payload || !signature || extra) return null

    const expected = createHmac('sha256', getAccessSecret()).update(payload).digest()
    const supplied = Buffer.from(signature, 'base64url')

    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null

    const session = JSON.parse(decode(payload)) as Partial<AccessSession>

    if (
      !session.email ||
      !session.companyName ||
      typeof session.expiresAt !== 'number' ||
      session.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null
    }

    const workspaceId =
      typeof session.workspaceId === 'string' &&
      session.workspaceId !== 'primary' &&
      /^[a-zA-Z0-9_-]{12,48}$/.test(session.workspaceId)
        ? session.workspaceId
        : `legacy_${createHmac('sha256', getAccessSecret()).update(session.email).digest('hex').slice(0, 24)}`

    return {
      companyName: session.companyName,
      email: session.email,
      workspaceId,
      expiresAt: session.expiresAt
    }
  } catch {
    return null
  }
}

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: ACCESS_TTL_SECONDS
}
