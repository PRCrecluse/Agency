import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { connect, type Connection } from '@planetscale/database'

import type {
  ConfigureTwitterMonitorInput,
  IngestPointInput,
  TrafficPoint,
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

const campaignSeeds: Array<
  Omit<TwitterCampaign, 'createdAt' | 'lastSyncAt' | 'monitorStartAt' | 'monitorEndAt'> & {
    baseImpressions: number
    phase: number
  }
> = [
  {
    id: 'cmp_back_to_school',
    name: 'Back to school',
    handle: '@northstar_app',
    url: 'https://x.com/northstar_app/status/1960425100892201041',
    status: 'active',
    source: 'demo',
    color: '#b8f348',
    targetClicks: 12000,
    cadenceMinutes: 15,
    baseImpressions: 4300,
    phase: 0.4
  }
]

const round = (value: number) => Math.max(0, Math.round(value))

function buildSeedStore(): TwitterMonitorStore {
  const now = new Date()
  const createdAt = new Date(now.getTime() - 65 * 24 * 60 * 60 * 1000).toISOString()
  const points: TrafficPoint[] = []
  const samplesPerDay = 2
  const totalDays = 62

  campaignSeeds.forEach(seed => {
    for (let step = 0; step < totalDays * samplesPerDay; step += 1) {
      const timestamp = new Date(
        now.getTime() - (totalDays * samplesPerDay - 1 - step) * (24 / samplesPerDay) * 60 * 60 * 1000
      )

      const dayProgress = step / samplesPerDay
      const weekday = timestamp.getUTCDay()
      const weekdayFactor = weekday === 0 || weekday === 6 ? 0.72 : 1
      const momentum = 0.72 + dayProgress * 0.018
      const wave = 0.82 + Math.sin(step * 0.41 + seed.phase) * 0.17
      const impressions = round(seed.baseImpressions * weekdayFactor * momentum * wave)
      const engagements = round(impressions * (0.038 + ((step + seed.phase) % 6) * 0.0022))
      const linkClicks = round(engagements * (0.43 + Math.sin(step * 0.19 + seed.phase) * 0.06))
      const conversions = round(linkClicks * (0.055 + seed.phase * 0.004))

      points.push({
        id: `pt_${seed.id}_${step}`,
        campaignId: seed.id,
        timestamp: timestamp.toISOString(),
        impressions,
        engagements,
        linkClicks,
        conversions,
        spend: Number((linkClicks * (0.68 + seed.phase * 0.08)).toFixed(2))
      })
    }
  })

  const campaigns = campaignSeeds.map(seed => ({
    id: seed.id,
    name: seed.name,
    handle: seed.handle,
    url: seed.url,
    status: seed.status,
    source: seed.source,
    color: seed.color,
    targetClicks: seed.targetClicks,
    cadenceMinutes: seed.cadenceMinutes,
    monitorStartAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    monitorEndAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt,
    lastSyncAt: now.toISOString()
  }))

  return {
    version: 1,
    campaigns,
    points,
    activity: [
      {
        id: 'activity_seed_sync',
        type: 'sync',
        title: 'Tweet metrics synced',
        detail: 'The latest observation was persisted successfully',
        timestamp: now.toISOString()
      },
      {
        id: 'activity_seed_alert',
        type: 'alert',
        title: 'Traffic increased',
        detail: 'Link clicks are 18.4% above the previous observation',
        timestamp: new Date(now.getTime() - 48 * 60 * 1000).toISOString()
      },
      {
        id: 'activity_seed_campaign',
        type: 'campaign',
        title: 'Tweet monitor started',
        detail: 'Collection cadence set to every 15 minutes',
        timestamp: new Date(now.getTime() - 4.2 * 60 * 60 * 1000).toISOString()
      }
    ],
    updatedAt: now.toISOString()
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
    .execute(`
      CREATE TABLE IF NOT EXISTS twitter_monitor_state (
        id VARCHAR(48) NOT NULL PRIMARY KEY,
        payload JSON NOT NULL,
        updated_at DATETIME(3) NOT NULL
      )
    `)
    .then(() => undefined)

  return schemaReady
}

function parseStoredPayload(payload: unknown) {
  const parsed = (typeof payload === 'string' ? JSON.parse(payload) : payload) as TwitterMonitorStore

  if (parsed.version !== 1 || !Array.isArray(parsed.campaigns) || !Array.isArray(parsed.points)) {
    throw new Error('Unsupported Twitter monitor data format')
  }

  const primaryCampaign = parsed.campaigns[0]

  if (!primaryCampaign) return buildSeedStore()

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

    const initialStore = buildSeedStore()

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

    const initialStore = buildSeedStore()

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

      const store = result.rows[0] ? parseStoredPayload(result.rows[0].payload) : buildSeedStore()

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

export async function collectCampaignMetrics(force = false) {
  const now = new Date()
  let collected = 0

  const store = await mutateStore(currentStore => {
    currentStore.campaigns.forEach((campaign, campaignIndex) => {
      if (campaign.status !== 'active') return
      if (now.getTime() < new Date(campaign.monitorStartAt).getTime()) return
      if (now.getTime() > new Date(campaign.monitorEndAt).getTime()) return

      const lastSync = campaign.lastSyncAt ? new Date(campaign.lastSyncAt).getTime() : 0
      const isDue = now.getTime() - lastSync >= campaign.cadenceMinutes * 60 * 1000

      if (!force && !isDue) return

      const recent = [...currentStore.points].reverse().find(point => point.campaignId === campaign.id)
      const baseline = recent?.impressions ?? 2400 + campaignIndex * 800
      const hourFactor = 0.7 + Math.max(0, Math.sin((now.getHours() / 24) * Math.PI)) * 0.55
      const variance = 0.86 + Math.random() * 0.3
      const impressions = round(baseline * hourFactor * variance)
      const engagements = round(impressions * (0.04 + Math.random() * 0.014))
      const linkClicks = round(engagements * (0.4 + Math.random() * 0.12))
      const conversions = round(linkClicks * (0.05 + Math.random() * 0.03))

      currentStore.points.push({
        id: createId('pt'),
        campaignId: campaign.id,
        timestamp: now.toISOString(),
        impressions,
        engagements,
        linkClicks,
        conversions,
        spend: Number((linkClicks * (0.55 + Math.random() * 0.5)).toFixed(2))
      })
      campaign.lastSyncAt = now.toISOString()
      collected += 1
    })

    if (collected > 0) {
      currentStore.activity.unshift({
        id: createId('activity'),
        type: 'sync',
        title: 'Tweet metrics synced',
        detail: 'One new observation was saved to persistent storage',
        timestamp: now.toISOString()
      })
    }
  })

  return { snapshot: toSnapshot(store), collected }
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
  const hasWebStatusPath = pathParts.length >= 4 && pathParts[0] === 'i' && pathParts[1] === 'web' && pathParts[2] === 'status'

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
    currentStore.points = urlChanged
      ? []
      : currentStore.points.filter(point => point.campaignId === campaign.id)
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
