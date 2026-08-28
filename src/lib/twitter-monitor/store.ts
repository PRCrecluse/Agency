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

interface RapidApiPostMetrics {
  impressions: number | null
  engagements: number | null
  linkClicks: number | null
}

type JsonRecord = Record<string, unknown>

const RAPIDAPI_TWITTER_HOST = 'twitter-api45.p.rapidapi.com'

function createEmptyStore(): TwitterMonitorStore {
  return {
    version: 1,
    campaigns: [],
    points: [],
    activity: [],
    updatedAt: new Date().toISOString()
  }
}

function getPostId(url: string) {
  const match = new URL(url).pathname.match(/\/status\/(\d+)/)

  if (!match?.[1]) throw new Error('Could not read the post ID from this X URL')

  return match[1]
}

function asRecord(value: unknown): JsonRecord | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as JsonRecord) : undefined
}

function parseMetricValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return null

  const normalized = value.trim().replaceAll(',', '').toUpperCase()
  const match = normalized.match(/^(-?\d+(?:\.\d+)?)([KMB])?$/)

  if (!match?.[1]) return null

  const multiplier = match[2] === 'K' ? 1_000 : match[2] === 'M' ? 1_000_000 : match[2] === 'B' ? 1_000_000_000 : 1

  return Number(match[1]) * multiplier
}

function getMetricContainers(payload: JsonRecord) {
  const data = asRecord(payload.data)
  const result = asRecord(payload.result)
  const tweet = asRecord(payload.tweet)
  const tweetResult = asRecord(payload.tweet_result) ?? asRecord(payload.tweetResult)
  const nestedResult = asRecord(tweetResult?.result)

  return [payload, tweet, data, result, tweetResult, nestedResult, asRecord(nestedResult?.legacy)].filter(
    (item): item is JsonRecord => Boolean(item)
  )
}

function readMetric(containers: JsonRecord[], names: string[]) {
  for (const container of containers) {
    for (const name of names) {
      const value = parseMetricValue(container[name])

      if (value !== null) return value
    }
  }

  return null
}

async function fetchRapidApiPostMetrics(url: string): Promise<RapidApiPostMetrics> {
  const apiKey = process.env.RAPIDAPI_KEY ?? process.env.RAPID_API_KEY

  if (!apiKey) {
    throw new Error('RapidAPI credentials are not configured. Set RAPIDAPI_KEY to collect post metrics.')
  }

  const postId = getPostId(url)
  const endpoint = new URL(`https://${RAPIDAPI_TWITTER_HOST}/tweet.php`)

  endpoint.searchParams.set('id', postId)

  const response = await fetch(endpoint, {
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': RAPIDAPI_TWITTER_HOST,
      'x-rapidapi-key': apiKey
    },
    cache: 'no-store'
  })
  const payload = (await response.json()) as JsonRecord

  if (!response.ok) {
    const detail = payload.message ?? payload.error ?? payload.detail

    throw new Error(typeof detail === 'string' ? detail : `RapidAPI request failed with status ${response.status}`)
  }

  const containers = getMetricContainers(payload)
  const impressions = readMetric(containers, [
    'views',
    'view_count',
    'viewCount',
    'views_count',
    'impressions',
    'impression_count'
  ])
  const directEngagements = readMetric(containers, ['engagements', 'engagement_count', 'engagementCount'])
  const likes = readMetric(containers, [
    'favorites',
    'favorite_count',
    'favoriteCount',
    'likes',
    'like_count',
    'likeCount'
  ])
  const retweets = readMetric(containers, ['retweets', 'retweet_count', 'retweetCount'])
  const replies = readMetric(containers, ['replies', 'reply_count', 'replyCount'])
  const quotes = readMetric(containers, ['quotes', 'quote_count', 'quoteCount'])
  const bookmarks = readMetric(containers, ['bookmarks', 'bookmark_count', 'bookmarkCount'])
  const linkClicks = readMetric(containers, ['link_clicks', 'linkClicks', 'url_link_clicks'])
  const publicEngagementMetrics = [likes, retweets, replies, quotes, bookmarks]
  const publicEngagements = publicEngagementMetrics.some(value => value !== null)
    ? publicEngagementMetrics.reduce<number>((total, value) => total + (value ?? 0), 0)
    : null

  if (impressions === null && directEngagements === null && publicEngagements === null && linkClicks === null) {
    throw new Error('RapidAPI returned the post, but no supported metric fields were found in its response.')
  }

  return {
    impressions,
    engagements: directEngagements ?? publicEngagements,
    linkClicks
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

export async function collectCampaignMetrics(force = false, campaignIds?: string[]) {
  const now = new Date()
  const snapshot = await getMonitorSnapshot()
  const candidates = snapshot.campaigns.filter(campaign => {
    if (campaignIds && !campaignIds.includes(campaign.id)) return false
    if (campaign.status !== 'active') return false
    if (now.getTime() < new Date(campaign.monitorStartAt).getTime()) return false
    if (now.getTime() > new Date(campaign.monitorEndAt).getTime()) return false

    const lastSync = campaign.lastSyncAt ? new Date(campaign.lastSyncAt).getTime() : 0

    return force || now.getTime() - lastSync >= campaign.cadenceMinutes * 60 * 1000
  })

  const results = await Promise.allSettled(
    candidates.map(async campaign => ({
      campaignId: campaign.id,
      url: campaign.url,
      metrics: await fetchRapidApiPostMetrics(campaign.url)
    }))
  )
  const observations = results.flatMap(result => (result.status === 'fulfilled' ? [result.value] : []))
  const errors = results.flatMap(result =>
    result.status === 'rejected'
      ? [result.reason instanceof Error ? result.reason.message : 'RapidAPI metrics collection failed']
      : []
  )

  if (!observations.length) return { snapshot, collected: 0, errors }

  let storedCount = 0
  const store = await mutateStore(currentStore => {
    observations.forEach(observation => {
      const campaign = currentStore.campaigns.find(item => item.id === observation.campaignId)

      if (!campaign || campaign.url !== observation.url || campaign.status !== 'active') return

      currentStore.points.push({
        id: createId('pt'),
        campaignId: campaign.id,
        timestamp: now.toISOString(),
        impressions: observation.metrics.impressions,
        engagements: observation.metrics.engagements,
        linkClicks: observation.metrics.linkClicks,
        conversions: null,
        spend: null
      })
      campaign.lastSyncAt = now.toISOString()
      storedCount += 1
    })

    if (storedCount) {
      currentStore.activity.unshift({
        id: createId('activity'),
        type: 'sync',
        title: 'X post metrics synced',
        detail: `${storedCount} real observation${storedCount === 1 ? '' : 's'} saved from Twitter API45`,
        timestamp: now.toISOString()
      })
    }
  })

  return { snapshot: toSnapshot(store), collected: storedCount, errors }
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
