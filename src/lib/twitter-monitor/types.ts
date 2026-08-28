export type CampaignStatus = 'active' | 'paused'

export type CampaignSource = 'demo' | 'ingestion'

export interface TwitterCampaign {
  id: string
  name: string
  handle: string
  url: string
  status: CampaignStatus
  source: CampaignSource
  color: string
  targetClicks: number
  cadenceMinutes: number
  createdAt: string
  lastSyncAt: string | null
}

export interface TrafficPoint {
  id: string
  campaignId: string
  timestamp: string
  impressions: number
  engagements: number
  linkClicks: number
  conversions: number
  spend: number
}

export interface MonitorActivity {
  id: string
  type: 'sync' | 'campaign' | 'alert'
  title: string
  detail: string
  timestamp: string
}

export interface TwitterMonitorStore {
  version: 1
  campaigns: TwitterCampaign[]
  points: TrafficPoint[]
  activity: MonitorActivity[]
  updatedAt: string
}

export interface TwitterMonitorSnapshot extends TwitterMonitorStore {
  storage: {
    driver: 'json-file' | 'planetscale'
    persistent: true
  }
}

export interface CreateCampaignInput {
  name: string
  handle: string
  url: string
  targetClicks: number
  cadenceMinutes?: number
}

export interface IngestPointInput {
  campaignId: string
  timestamp?: string
  impressions: number
  engagements: number
  linkClicks: number
  conversions: number
  spend?: number
}
