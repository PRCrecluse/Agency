import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { connect, type Connection } from '@planetscale/database'

import type {
  ConfigureTwitterMonitorInput,
  IngestPointInput,
  TwitterCampaign,
  TwitterMonitorSnapshot,
  TwitterMonitorStore
} from '@/lib/twitter-monitor/types'

const DATA_DIRECTORY = process.env.TWITTER_MONITOR_DATA_DIR ?? path.join(process.cwd(), '.data')
const DATA_FILE = path.join(DATA_DIRECTORY, 'twitter-monitor.json')

let writeQueue: Promise<unknown> = Promise.resolve()
let connection: Connection | undefined
let schemaReady: Promise<void> | undefined

const createId = (prefix: string) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`

const round = (value: number) => Math.max(0, Math.round(value))

const LEGACY_DEMO_CAMPAIGN_ID = 'cmp_back_to_school'
const LEGACY_DEMO_URL = 'https://x.com/northstar_app/status/1960425100892201041'

function createEmptyStore(): TwitterMonitorStore {
  return {
    version: 1,
    campaigns: [],
    points: [],
    activity: [],
    updatedAt: new Date().toISOString()
  }
}

function getPlanetScaleConnection() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) return undefined

  connection ??= connect({ url: databaseUrl })

  return connection
}

async function ensurePlanetScaleSchema(database: Connection) {
  schemaReady ??= database
    .execute(
      `
      CREATE TABLE IF NOT EXISTS twitter_monitor_state (
        id VARCHAR(48) NOT NULL PRIMARY KEY,
        payload JSON NOT NULL,
        updated_at DATETIME(3) NOT NULL
      )
    `
    )
    .then(() => undefined)

  return schemaReady
}

function parseStoredPayload(payload: unknown) {
  const parsed = (typeof payload === 'string' ? JSON.parse(payload) : payload) as TwitterMonitorStore

  if (parsed.version !== 1 || !Array.isArray(parsed.campaigns) || !Array.isArray(parsed.points)) {
    throw new Error('Unsupported Twitter monitor data format')
  }

  const primaryCampaign = parsed.campaigns[0]

  if (!primaryCampaign) {
    return {
      ...parsed,
      campaigns: [],
      points: []
    }
  }

  const isLegacyDemo =
    (primaryCampaign as unknown as { source?: string }).source === 'demo' ||
    (primaryCampaign.id === LEGACY_DEMO_CAMPAIGN_ID && primaryCampaign.url === LEGACY_DEMO_URL)

  if (isLegacyDemo) return createEmptyStore()

  const now = Date.now()
  const monitorStartAt = primaryCampaign.monitorStartAt ?? new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString()
  const monitorEndAt = primaryCampaign.monitorEndAt ?? new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString()

  return {
    ...parsed,
    campaigns: [{ ...primaryCampaign, monitorStartAt, monitorEndAt }],
    points: parsed.points.filter(point => point.campaignId === primaryCampaign.id)
  }
}

async function writeJsonStore(store: TwitterMonitorStore) {
  await mkdir(DATA_DIRECTORY, { recursive: true })

  const temporaryFile = `${DATA_FILE}.${process.pid}.tmp`

  await writeFile(temporaryFile, JSON.stringify(store, null, 2), 'utf8')
  await rename(temporaryFile, DATA_FILE)
}

async function readStore(): Promise<TwitterMonitorStore> {
  const database = getPlanetScaleConnection()

  if (database) {
    await ensurePlanetScaleSchema(database)

    const result = await database.execute<{ payload: unknown }>(
      'SELECT payload FROM twitter_monitor_state WHERE id = ?',
      ['primary']
    )

    if (result.rows[0]) return parseStoredPayload(result.rows[0].payload)

    const initialStore = createEmptyStore()

    await database.execute(
      'INSERT INTO twitter_monitor_state (id, payload, updated_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id = id',
      ['primary', JSON.stringify(initialStore), new Date(initialStore.updatedAt)]
    )

    return initialStore
  }

  try {
    return parseStoredPayload(await readFile(DATA_FILE, 'utf8'))
  } catch (error) {
    const missingFile = (error as NodeJS.ErrnoException).code === 'ENOENT'

    if (!missingFile && error instanceof SyntaxError) {
      throw new Error('Twitter monitor data file is not valid JSON', { cause: error })
    }

    if (!missingFile) throw error

    const initialStore = createEmptyStore()

    await writeJsonStore(initialStore)

    return initialStore
  }
}

async function mutateStore(mutator: (store: TwitterMonitorStore) => void | Promise<void>) {
  const database = getPlanetScaleConnection()

  if (database) {
    await ensurePlanetScaleSchema(database)

    return database.transaction(async transaction => {
      const result = await transaction.execute<{ payload: unknown }>(
        'SELECT payload FROM twitter_monitor_state WHERE id = ? FOR UPDATE',
        ['primary']
      )

      const store = result.rows[0] ? parseStoredPayload(result.rows[0].payload) : createEmptyStore()

      await mutator(store)
      store.updatedAt = new Date().toISOString()
      store.activity = store.activity.slice(0, 20)
      store.points = store.points.slice(-12000)
      await transaction.execute(
        `INSERT INTO twitter_monitor_state (id, payload, updated_at)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE payload = VALUES(payload), updated_at = VALUES(updated_at)`,
        ['primary', JSON.stringify(store), new Date(store.updatedAt)]
      )

      return store
    })
  }

  const operation = writeQueue.then(async () => {
    const store = await readStore()

    await mutator(store)
    store.updatedAt = new Date().toISOString()
    store.activity = store.activity.slice(0, 20)
    store.points = store.points.slice(-12000)
    await writeJsonStore(store)

    return store
  })

  writeQueue = operation.catch(() => undefined)

  return operation
}

function toSnapshot(store: TwitterMonitorStore): TwitterMonitorSnapshot {
  return {
    ...store,
    storage: {
      driver: getPlanetScaleConnection() ? 'planetscale' : 'json-file',
      persistent: true
    }
  }
}

export async function getMonitorSnapshot() {
  return toSnapshot(await readStore())
}

export async function configureTwitterMonitor(input: ConfigureTwitterMonitorInput) {
  const start = new Date(input.monitorStartAt)
  const end = new Date(input.monitorEndAt)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    throw new Error('The monitoring end time must be later than the start time')
  }

  const url = new URL(input.url)
  const pathParts = url.pathname.split('/').filter(Boolean)
  const hasAccountStatusPath = pathParts.length >= 3 && pathParts[1] === 'status'

  const hasWebStatusPath =
    pathParts.length >= 4 && pathParts[0] === 'i' && pathParts[1] === 'web' && pathParts[2] === 'status'

  if (
    !['x.com', 'twitter.com', 'www.x.com', 'www.twitter.com'].includes(url.hostname) ||
    (!hasAccountStatusPath && !hasWebStatusPath)
  ) {
    throw new Error('Please enter a valid X or Twitter post URL')
  }

  const handle = hasAccountStatusPath ? `@${pathParts[0]}` : '@x'
  const now = new Date().toISOString()

  const store = await mutateStore(currentStore => {
    const previousCampaign = currentStore.campaigns[0]
    const campaignId = previousCampaign?.id ?? 'primary_tweet_monitor'
    const urlChanged = previousCampaign?.url !== input.url.trim()

    const campaign: TwitterCampaign = {
      id: campaignId,
      name: `${handle} post`,
      handle,
      url: input.url.trim(),
      status: 'active',
      source: 'ingestion',
      color: '#18181b',
      targetClicks: previousCampaign?.targetClicks ?? 5000,
      cadenceMinutes: input.cadenceMinutes,
      monitorStartAt: start.toISOString(),
      monitorEndAt: end.toISOString(),
      createdAt: previousCampaign?.createdAt ?? now,
      lastSyncAt: urlChanged ? null : (previousCampaign?.lastSyncAt ?? null)
    }

    currentStore.campaigns = [campaign]
    currentStore.points = urlChanged ? [] : currentStore.points.filter(point => point.campaignId === campaign.id)
    currentStore.activity.unshift({
      id: createId('activity'),
      type: 'campaign',
      title: urlChanged ? 'Tweet monitor started' : 'Monitoring window updated',
      detail: `${start.toISOString()} → ${end.toISOString()} · every ${input.cadenceMinutes} minutes`,
      timestamp: now
    })
  })

  return toSnapshot(store)
}

export async function toggleCampaign(campaignId: string) {
  const store = await mutateStore(currentStore => {
    const campaign = currentStore.campaigns.find(item => item.id === campaignId)

    if (!campaign) throw new Error('Campaign not found')

    campaign.status = campaign.status === 'active' ? 'paused' : 'active'
    currentStore.activity.unshift({
      id: createId('activity'),
      type: 'campaign',
      title: `${campaign.name} ${campaign.status === 'active' ? 'resumed' : 'paused'}`,
      detail: campaign.status === 'active' ? 'Continuous collection is active' : 'No new metrics will be collected',
      timestamp: new Date().toISOString()
    })
  })

  return toSnapshot(store)
}

export async function ingestMetricPoint(input: IngestPointInput) {
  const store = await mutateStore(currentStore => {
    const campaign = currentStore.campaigns.find(item => item.id === input.campaignId)

    if (!campaign) throw new Error('Campaign not found')

    const timestamp = input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString()

    currentStore.points.push({
      id: createId('pt'),
      campaignId: campaign.id,
      timestamp,
      impressions: round(input.impressions),
      engagements: round(input.engagements),
      linkClicks: round(input.linkClicks),
      conversions: round(input.conversions),
      spend: Number((input.spend ?? 0).toFixed(2))
    })
    campaign.lastSyncAt = timestamp
  })

  return toSnapshot(store)
}
