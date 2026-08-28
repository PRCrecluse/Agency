'use client'

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BellRing,
  Check,
  ChevronDown,
  CircleDollarSign,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  Menu,
  MousePointerClick,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps
} from 'recharts'

import type {
  CreateCampaignInput,
  TrafficPoint,
  TwitterCampaign,
  TwitterMonitorSnapshot
} from '@/lib/twitter-monitor/types'

type Range = '7d' | '14d' | '30d'
type Metric = 'impressions' | 'linkClicks' | 'conversions'

const RANGE_DAYS: Record<Range, number> = { '7d': 7, '14d': 14, '30d': 30 }

const METRICS: Array<{ key: Metric; label: string }> = [
  { key: 'impressions', label: 'Impressions' },
  { key: 'linkClicks', label: 'Link clicks' },
  { key: 'conversions', label: 'Conversions' }
]

const formatCompact = (value: number) =>
  Intl.NumberFormat('en-US', { notation: value >= 1000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value)

const formatFull = (value: number) => Intl.NumberFormat('en-US').format(Math.round(value))

const formatRelativeTime = (value: string | null) => {
  if (!value) return 'Awaiting first sync'

  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.round(minutes / 60)

  if (hours < 24) return `${hours}h ago`

  return `${Math.round(hours / 24)}d ago`
}

const sumMetric = (points: TrafficPoint[], key: Metric) => points.reduce((total, point) => total + point[key], 0)

function metricDelta(current: number, previous: number) {
  if (previous <= 0) return 0

  return ((current - previous) / previous) * 100
}

function getRangePoints(points: TrafficPoint[], days: number, previous = false) {
  const now = Date.now()
  const end = previous ? now - days * 86400000 : now + 60000
  const start = end - days * 86400000

  return points.filter(point => {
    const timestamp = new Date(point.timestamp).getTime()

    return timestamp >= start && timestamp < end
  })
}

function LoadingScreen() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#f5f5f1] text-[#161714]'>
      <div className='flex items-center gap-3 text-sm font-medium'>
        <LoaderCircle className='size-5 animate-spin text-[#6c35e9]' />
        Loading your campaign monitors…
      </div>
    </div>
  )
}

function MetricTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null

  const value = Number(payload[0]?.value ?? 0)
  const metricLabel = String(payload[0]?.name ?? 'Value')

  return (
    <div className='min-w-40 rounded-xl border border-black/8 bg-[#181916] px-3.5 py-3 text-white shadow-2xl'>
      <p className='mb-2 text-[11px] font-medium text-white/50'>{String(label)}</p>
      <div className='flex items-center justify-between gap-5'>
        <span className='text-xs text-white/65'>{metricLabel}</span>
        <span className='text-sm font-semibold'>{formatFull(value)}</span>
      </div>
    </div>
  )
}

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold ${
        positive ? 'bg-[#e9f8d1] text-[#477119]' : 'bg-[#ffe9e5] text-[#aa3527]'
      }`}
    >
      {positive ? <ArrowUpRight className='size-3' /> : <ArrowDownRight className='size-3' />}
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigation = [
    { label: 'Overview', icon: LayoutDashboard, active: true },
    { label: 'Campaigns', icon: Target },
    { label: 'Alerts', icon: BellRing, badge: '2' },
    { label: 'Reports', icon: FileText }
  ]

  const workspace = [
    { label: 'Data sources', icon: Database },
    { label: 'Team', icon: Users },
    { label: 'Settings', icon: Settings }
  ]

  return (
    <>
      {open && <button aria-label='Close navigation' className='fixed inset-0 z-40 bg-black/30 lg:hidden' onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-[#171816] px-3.5 py-4 text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex h-12 items-center justify-between px-2.5'>
          <div className='flex items-center gap-2.5'>
            <span className='relative flex size-8 items-center justify-center rounded-[10px] bg-[#b9f44c] text-[#171816]'>
              <Activity className='size-[18px]' strokeWidth={2.6} />
              <span className='absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-[#171816] bg-[#8a5cff]' />
            </span>
            <span className='text-[15px] font-semibold tracking-[-0.02em]'>Pulsewatch</span>
          </div>
          <button aria-label='Close navigation' className='rounded-lg p-1.5 text-white/60 hover:bg-white/8 lg:hidden' onClick={onClose}>
            <X className='size-4' />
          </button>
        </div>

        <div className='mt-5 rounded-xl border border-white/8 bg-white/[0.04] p-2'>
          <button className='flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left'>
            <span className='flex size-7 items-center justify-center rounded-lg bg-[#6c35e9] text-[11px] font-bold'>N</span>
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-xs font-semibold'>Northstar</span>
              <span className='block truncate text-[10px] text-white/40'>Growth workspace</span>
            </span>
            <ChevronDown className='size-3.5 text-white/40' />
          </button>
        </div>

        <nav className='mt-6 space-y-1'>
          <p className='mb-2 px-2.5 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase'>Monitor</p>
          {navigation.map(item => (
            <button
              key={item.label}
              className={`flex h-10 w-full items-center gap-3 rounded-xl px-2.5 text-[13px] transition-colors ${
                item.active ? 'bg-white text-[#171816] font-semibold' : 'text-white/55 hover:bg-white/6 hover:text-white'
              }`}
            >
              <item.icon className='size-[17px]' strokeWidth={item.active ? 2.3 : 1.8} />
              <span className='flex-1 text-left'>{item.label}</span>
              {item.badge && <span className='rounded-full bg-[#b9f44c] px-1.5 py-0.5 text-[10px] font-bold text-[#171816]'>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <nav className='mt-7 space-y-1'>
          <p className='mb-2 px-2.5 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase'>Workspace</p>
          {workspace.map(item => (
            <button
              key={item.label}
              className='flex h-10 w-full items-center gap-3 rounded-xl px-2.5 text-[13px] text-white/55 transition-colors hover:bg-white/6 hover:text-white'
            >
              <item.icon className='size-[17px]' strokeWidth={1.8} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className='mt-auto'>
          <div className='mb-3 rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.07] to-transparent p-3.5'>
            <div className='mb-3 flex size-8 items-center justify-center rounded-lg bg-[#b9f44c] text-[#171816]'>
              <Sparkles className='size-4' />
            </div>
            <p className='text-xs font-semibold'>Monitoring is healthy</p>
            <p className='mt-1 text-[10px] leading-relaxed text-white/40'>All active campaigns are collecting on schedule.</p>
          </div>
          <button className='flex h-10 w-full items-center gap-3 rounded-xl px-2.5 text-[13px] text-white/55 hover:bg-white/6 hover:text-white'>
            <HelpCircle className='size-[17px]' />
            Help & documentation
          </button>
          <div className='mt-2 flex items-center gap-2.5 border-t border-white/8 px-2 pt-4'>
            <span className='flex size-8 items-center justify-center rounded-full bg-[#ede2d6] text-xs font-bold text-[#513f2f]'>ML</span>
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-xs font-semibold'>Maya Lin</span>
              <span className='block truncate text-[10px] text-white/35'>maya@northstar.co</span>
            </span>
            <ChevronDown className='size-3.5 text-white/35' />
          </div>
        </div>
      </aside>
    </>
  )
}

function AddCampaignModal({ onClose, onCreated }: { onClose: () => void; onCreated: (snapshot: TwitterMonitorSnapshot) => void }) {
  const [form, setForm] = useState<CreateCampaignInput>({
    name: '',
    handle: '',
    url: '',
    targetClicks: 5000,
    cadenceMinutes: 15
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field: keyof CreateCampaignInput, value: string | number) =>
    setForm(current => ({ ...current, [field]: value }))

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'create', campaign: form })
      })

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot; error?: string }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Could not create the monitor')

      onCreated(result.snapshot)
      onClose()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not create the monitor')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center bg-[#10110f]/55 px-4 backdrop-blur-[2px]'>
      <button aria-label='Close add campaign dialog' className='absolute inset-0' onClick={onClose} />
      <form onSubmit={submit} className='relative w-full max-w-[480px] overflow-hidden rounded-3xl border border-black/10 bg-[#fbfbf8] shadow-2xl'>
        <div className='flex items-start justify-between border-b border-black/7 px-6 py-5'>
          <div>
            <p className='text-lg font-semibold tracking-[-0.03em] text-[#171816]'>Add a campaign monitor</p>
            <p className='mt-1 text-xs text-[#71736d]'>Create a persistent stream for an X campaign.</p>
          </div>
          <button type='button' aria-label='Close' className='rounded-lg p-2 text-[#777a73] hover:bg-black/5' onClick={onClose}>
            <X className='size-4' />
          </button>
        </div>
        <div className='space-y-4 px-6 py-5'>
          <label className='block text-xs font-semibold text-[#343631]'>
            Campaign name
            <input
              required
              value={form.name}
              onChange={event => updateField('name', event.target.value)}
              placeholder='e.g. Autumn product launch'
              className='mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-[#6c35e9] focus:ring-3 focus:ring-[#6c35e9]/10'
            />
          </label>
          <div className='grid gap-4 sm:grid-cols-2'>
            <label className='block text-xs font-semibold text-[#343631]'>
              X account
              <input
                required
                value={form.handle}
                onChange={event => updateField('handle', event.target.value)}
                placeholder='@yourbrand'
                className='mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-[#6c35e9] focus:ring-3 focus:ring-[#6c35e9]/10'
              />
            </label>
            <label className='block text-xs font-semibold text-[#343631]'>
              Click target
              <input
                required
                min={1}
                type='number'
                value={form.targetClicks}
                onChange={event => updateField('targetClicks', Number(event.target.value))}
                className='mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-[#6c35e9] focus:ring-3 focus:ring-[#6c35e9]/10'
              />
            </label>
          </div>
          <label className='block text-xs font-semibold text-[#343631]'>
            Post or campaign URL
            <input
              required
              type='url'
              value={form.url}
              onChange={event => updateField('url', event.target.value)}
              placeholder='https://x.com/yourbrand/status/…'
              className='mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-[#6c35e9] focus:ring-3 focus:ring-[#6c35e9]/10'
            />
          </label>
          <label className='block text-xs font-semibold text-[#343631]'>
            Collection cadence
            <select
              value={form.cadenceMinutes}
              onChange={event => updateField('cadenceMinutes', Number(event.target.value))}
              className='mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm font-normal outline-none focus:border-[#6c35e9]'
            >
              <option value={5}>Every 5 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
            </select>
          </label>
          {error && <p role='alert' className='rounded-xl bg-[#ffe9e5] px-3 py-2 text-xs text-[#9d3025]'>{error}</p>}
        </div>
        <div className='flex items-center justify-end gap-2 border-t border-black/7 bg-white/50 px-6 py-4'>
          <button type='button' onClick={onClose} className='h-10 rounded-xl px-4 text-sm font-semibold text-[#555851] hover:bg-black/5'>
            Cancel
          </button>
          <button
            type='submit'
            disabled={saving}
            className='flex h-10 items-center gap-2 rounded-xl bg-[#171816] px-4 text-sm font-semibold text-white transition hover:bg-[#302f2d] disabled:opacity-60'
          >
            {saving ? <LoaderCircle className='size-4 animate-spin' /> : <Plus className='size-4' />}
            Add monitor
          </button>
        </div>
      </form>
    </div>
  )
}

export function TwitterMonitorDashboard({ initialSnapshot }: { initialSnapshot: TwitterMonitorSnapshot }) {
  const [snapshot, setSnapshot] = useState<TwitterMonitorSnapshot | null>(initialSnapshot)
  const [range, setRange] = useState<Range>('7d')
  const [metric, setMetric] = useState<Metric>('impressions')
  const [campaignId, setCampaignId] = useState('all')
  const [live, setLive] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  const loadSnapshot = useCallback(async () => {
    try {
      const response = await fetch('/api/twitter-monitor', { cache: 'no-store' })

      if (!response.ok) throw new Error('Campaign data is temporarily unavailable')

      setSnapshot((await response.json()) as TwitterMonitorSnapshot)
      setError('')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not load campaign data')
    }
  }, [])

  const collect = useCallback(async (force = false) => {
    if (force) setSyncing(true)

    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'collect', force })
      })

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot; collected?: number; error?: string }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Sync failed')

      setSnapshot(result.snapshot)
      setError('')
      if (force) setToast(result.collected ? `${result.collected} campaigns synced and persisted` : 'Everything is already up to date')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Sync failed')
    } finally {
      if (force) setSyncing(false)
    }
  }, [])

  useEffect(() => {
    if (!live) return

    const timer = window.setInterval(() => void collect(false), 30000)

    return () => window.clearInterval(timer)
  }, [collect, live])

  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(() => setToast(''), 3200)

    return () => window.clearTimeout(timer)
  }, [toast])

  const selectedPoints = useMemo(() => {
    if (!snapshot) return []

    return campaignId === 'all' ? snapshot.points : snapshot.points.filter(point => point.campaignId === campaignId)
  }, [campaignId, snapshot])

  const currentPoints = useMemo(
    () => getRangePoints(selectedPoints, RANGE_DAYS[range]),
    [range, selectedPoints]
  )

  const previousPoints = useMemo(
    () => getRangePoints(selectedPoints, RANGE_DAYS[range], true),
    [range, selectedPoints]
  )

  const chartData = useMemo(() => {
    const days = RANGE_DAYS[range]
    const buckets = new Map<string, number>()
    const now = new Date()

    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset)
      const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`

      buckets.set(key, 0)
    }

    currentPoints.forEach(point => {
      const day = new Date(point.timestamp)
      const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`

      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + point[metric])
    })

    return [...buckets.entries()].map(([key, value]) => {
      const [year, month, day] = key.split('-').map(Number)
      const date = new Date(year, month, day)

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value
      }
    })
  }, [currentPoints, metric, range])

  const stats = useMemo(() => {
    const impressions = sumMetric(currentPoints, 'impressions')
    const clicks = sumMetric(currentPoints, 'linkClicks')
    const engagements = currentPoints.reduce((total, point) => total + point.engagements, 0)
    const conversions = sumMetric(currentPoints, 'conversions')
    const previousImpressions = sumMetric(previousPoints, 'impressions')
    const previousClicks = sumMetric(previousPoints, 'linkClicks')
    const previousEngagements = previousPoints.reduce((total, point) => total + point.engagements, 0)
    const previousConversions = sumMetric(previousPoints, 'conversions')
    const ctr = impressions ? (clicks / impressions) * 100 : 0
    const previousCtr = previousImpressions ? (previousClicks / previousImpressions) * 100 : 0
    const engagementRate = impressions ? (engagements / impressions) * 100 : 0
    const previousEngagementRate = previousImpressions ? (previousEngagements / previousImpressions) * 100 : 0

    return [
      {
        label: 'Total impressions',
        value: formatCompact(impressions),
        delta: metricDelta(impressions, previousImpressions),
        icon: Eye,
        iconClass: 'bg-[#ede6ff] text-[#6c35e9]'
      },
      {
        label: 'Link clicks',
        value: formatCompact(clicks),
        delta: metricDelta(clicks, previousClicks),
        icon: MousePointerClick,
        iconClass: 'bg-[#e7f3ff] text-[#1577c8]'
      },
      {
        label: 'Click-through rate',
        value: `${ctr.toFixed(2)}%`,
        delta: metricDelta(ctr, previousCtr),
        icon: Gauge,
        iconClass: 'bg-[#eaf7cf] text-[#567b1f]'
      },
      {
        label: 'Conversions',
        value: formatCompact(conversions),
        delta: metricDelta(conversions, previousConversions),
        icon: CircleDollarSign,
        iconClass: 'bg-[#fff0df] text-[#b66316]',
        helper: `${engagementRate.toFixed(1)}% engagement`,
        helperDelta: metricDelta(engagementRate, previousEngagementRate)
      }
    ]
  }, [currentPoints, previousPoints])

  const campaignRows = useMemo(() => {
    if (!snapshot) return []

    const days = RANGE_DAYS[range]

    return snapshot.campaigns.map(campaign => {
      const campaignPoints = getRangePoints(snapshot.points.filter(point => point.campaignId === campaign.id), days)
      const impressions = sumMetric(campaignPoints, 'impressions')
      const clicks = sumMetric(campaignPoints, 'linkClicks')

      return {
        ...campaign,
        impressions,
        clicks,
        ctr: impressions ? (clicks / impressions) * 100 : 0,
        progress: Math.min(100, (clicks / campaign.targetClicks) * 100)
      }
    })
  }, [range, snapshot])

  async function toggleCampaign(campaign: TwitterCampaign) {
    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', campaignId: campaign.id })
      })

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot; error?: string }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Could not update campaign')

      setSnapshot(result.snapshot)
      setToast(`${campaign.name} ${campaign.status === 'active' ? 'paused' : 'resumed'}`)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not update campaign')
    }
  }

  if (!snapshot) {
    if (error) {
      return (
        <div className='flex min-h-screen items-center justify-center bg-[#f5f5f1] px-6 text-[#171816]'>
          <div className='max-w-md rounded-3xl border border-black/8 bg-white p-8 text-center shadow-sm'>
            <Database className='mx-auto size-8 text-[#6c35e9]' />
            <h1 className='mt-4 text-lg font-semibold'>Could not open campaign storage</h1>
            <p className='mt-2 text-sm text-[#777a73]'>{error}</p>
            <button onClick={() => void loadSnapshot()} className='mt-5 rounded-xl bg-[#171816] px-4 py-2.5 text-sm font-semibold text-white'>Try again</button>
          </div>
        </div>
      )
    }

    return <LoadingScreen />
  }

  const activeCount = snapshot.campaigns.filter(campaign => campaign.status === 'active').length
  const selectedCampaign = snapshot.campaigns.find(campaign => campaign.id === campaignId)
  const metricLabel = METRICS.find(item => item.key === metric)?.label ?? 'Value'

  return (
    <div className='min-h-screen bg-[#f5f5f1] font-sans text-[#171816] lg:flex'>
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main className='min-w-0 flex-1'>
        <header className='flex h-16 items-center justify-between border-b border-black/7 bg-[#f9f9f5]/90 px-4 backdrop-blur md:px-7 lg:px-9'>
          <div className='flex items-center gap-3'>
            <button aria-label='Open navigation' className='rounded-lg border border-black/8 bg-white p-2 lg:hidden' onClick={() => setMobileNavOpen(true)}>
              <Menu className='size-4' />
            </button>
            <div className='hidden items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2 text-xs text-[#6d7069] shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:flex'>
              <Search className='size-3.5' />
              <span>Search campaigns</span>
              <kbd className='ml-5 rounded-md bg-[#f1f1ec] px-1.5 py-0.5 text-[10px] text-[#8b8e86]'>⌘ K</kbd>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='hidden items-center gap-2 rounded-full border border-black/7 bg-white px-3 py-1.5 text-[11px] font-medium text-[#555851] md:flex'>
              <span className='relative flex size-2'>
                {live && <span className='absolute inline-flex size-full animate-ping rounded-full bg-[#67a924] opacity-50' />}
                <span className={`relative inline-flex size-2 rounded-full ${live ? 'bg-[#74b72d]' : 'bg-[#a0a19d]'}`} />
              </span>
              {live ? 'Live collection on' : 'Collection paused'}
            </div>
            <button className='relative flex size-9 items-center justify-center rounded-xl border border-black/8 bg-white text-[#555851] hover:bg-[#f2f2ee]'>
              <Bell className='size-4' />
              <span className='absolute right-2 top-2 size-1.5 rounded-full bg-[#6c35e9]' />
            </button>
            <span className='flex size-9 items-center justify-center rounded-full bg-[#ede2d6] text-[11px] font-bold text-[#513f2f]'>ML</span>
          </div>
        </header>

        <div className='mx-auto max-w-[1510px] px-4 py-6 md:px-7 lg:px-9 lg:py-8'>
          <section className='flex flex-col justify-between gap-5 md:flex-row md:items-end'>
            <div>
              <div className='mb-2 flex items-center gap-2 text-[11px] font-medium text-[#8a8d85]'>
                <span>Monitor</span>
                <span>/</span>
                <span className='text-[#42443f]'>Overview</span>
              </div>
              <h1 className='text-[27px] font-semibold tracking-[-0.045em] text-[#151613] sm:text-[31px]'>Campaign overview</h1>
              <p className='mt-1.5 text-[13px] text-[#777a72]'>Track X traffic, clicks, and conversions in one live view.</p>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <button
                onClick={() => setLive(current => !current)}
                className='flex h-10 items-center gap-2 rounded-xl border border-black/9 bg-white px-3.5 text-xs font-semibold text-[#444640] shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-[#f9f9f5]'
              >
                {live ? <Pause className='size-3.5' /> : <Play className='size-3.5' />}
                {live ? 'Pause live' : 'Resume live'}
              </button>
              <button
                onClick={() => void collect(true)}
                disabled={syncing}
                className='flex h-10 items-center gap-2 rounded-xl border border-black/9 bg-white px-3.5 text-xs font-semibold text-[#444640] shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-[#f9f9f5] disabled:opacity-60'
              >
                <RefreshCw className={`size-3.5 ${syncing ? 'animate-spin' : ''}`} />
                Sync now
              </button>
              <button
                onClick={() => setAddOpen(true)}
                className='flex h-10 items-center gap-2 rounded-xl bg-[#171816] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2b2c29]'
              >
                <Plus className='size-3.5' />
                Add monitor
              </button>
            </div>
          </section>

          {error && (
            <div className='mt-5 flex items-center justify-between rounded-xl border border-[#f0c4bd] bg-[#fff0ed] px-4 py-3 text-xs text-[#96382d]'>
              <span>{error}</span>
              <button onClick={() => setError('')}><X className='size-3.5' /></button>
            </div>
          )}

          <section className='mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
            {stats.map(stat => (
              <article key={stat.label} className='rounded-2xl border border-black/[0.075] bg-[#fbfbf8] p-4.5 shadow-[0_1px_0_rgba(0,0,0,0.015)]'>
                <div className='flex items-start justify-between'>
                  <div className={`flex size-9 items-center justify-center rounded-xl ${stat.iconClass}`}>
                    <stat.icon className='size-[17px]' strokeWidth={2} />
                  </div>
                  <TrendBadge value={stat.delta} />
                </div>
                <div className='mt-5'>
                  <p className='text-[11px] font-medium text-[#81847c]'>{stat.label}</p>
                  <div className='mt-1.5 flex items-end justify-between gap-2'>
                    <p className='text-[25px] font-semibold tracking-[-0.045em]'>{stat.value}</p>
                    {'helper' in stat && stat.helper ? <p className='mb-1 text-[10px] text-[#9a9c95]'>{stat.helper}</p> : null}
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className='mt-3 rounded-2xl border border-black/[0.075] bg-[#fbfbf8] shadow-[0_1px_0_rgba(0,0,0,0.015)]'>
            <div className='flex flex-col justify-between gap-4 border-b border-black/[0.065] px-5 py-4.5 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center gap-2'>
                  <h2 className='text-sm font-semibold tracking-[-0.015em]'>Traffic performance</h2>
                  <span className='rounded-full bg-[#eaf8d1] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#547c20] uppercase'>Live</span>
                </div>
                <p className='mt-1 text-[11px] text-[#8b8e86]'>Daily performance from persisted collection points</p>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <select
                  aria-label='Campaign filter'
                  value={campaignId}
                  onChange={event => setCampaignId(event.target.value)}
                  className='h-9 min-w-36 rounded-xl border border-black/8 bg-white px-3 text-[11px] font-semibold text-[#4b4e47] outline-none'
                >
                  <option value='all'>All campaigns</option>
                  {snapshot.campaigns.map(campaign => <option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}
                </select>
                <div className='flex rounded-xl border border-black/8 bg-[#f1f1ed] p-0.5'>
                  {(['7d', '14d', '30d'] as Range[]).map(option => (
                    <button
                      key={option}
                      onClick={() => setRange(option)}
                      className={`h-8 rounded-[9px] px-3 text-[10px] font-semibold transition ${range === option ? 'bg-white text-[#282a26] shadow-sm' : 'text-[#898b84] hover:text-[#4b4d48]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3 px-5 pb-4 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-wrap items-center gap-1'>
                {METRICS.map(item => (
                  <button
                    key={item.key}
                    onClick={() => setMetric(item.key)}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition ${metric === item.key ? 'bg-[#ece7fc] text-[#6536cf]' : 'text-[#8b8e86] hover:bg-black/[0.035] hover:text-[#4c4f48]'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className='flex items-center gap-1.5 text-[10px] text-[#8b8e86]'>
                <span className='size-2 rounded-full bg-[#8b5cf6]' />
                {selectedCampaign?.name ?? 'All campaign traffic'}
              </div>
            </div>
            <div className='h-[300px] w-full px-1 pb-3 pr-4 sm:h-[340px] sm:px-3 sm:pr-6'>
              <ResponsiveContainer width='100%' height='100%' minWidth={0} minHeight={0}>
                <AreaChart data={chartData} margin={{ top: 12, right: 4, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id='twitterMonitorArea' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor='#7c4fe8' stopOpacity={0.24} />
                      <stop offset='55%' stopColor='#8b5cf6' stopOpacity={0.08} />
                      <stop offset='100%' stopColor='#8b5cf6' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke='#e5e5df' strokeDasharray='3 5' />
                  <XAxis dataKey='date' axisLine={false} tickLine={false} tick={{ fill: '#92958d', fontSize: 10 }} minTickGap={30} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#92958d', fontSize: 10 }} tickFormatter={formatCompact} width={55} />
                  <Tooltip cursor={{ stroke: '#8b5cf6', strokeDasharray: '3 4', strokeWidth: 1 }} content={<MetricTooltip />} />
                  <Area
                    type='monotone'
                    dataKey='value'
                    name={metricLabel}
                    stroke='#7546df'
                    strokeWidth={2.5}
                    fill='url(#twitterMonitorArea)'
                    activeDot={{ r: 4, fill: '#7546df', stroke: '#fbfbf8', strokeWidth: 3 }}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className='mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.65fr)_minmax(315px,0.75fr)]'>
            <div className='overflow-hidden rounded-2xl border border-black/[0.075] bg-[#fbfbf8] shadow-[0_1px_0_rgba(0,0,0,0.015)]'>
              <div className='flex items-center justify-between border-b border-black/[0.065] px-5 py-4'>
                <div>
                  <h2 className='text-sm font-semibold'>Campaigns</h2>
                  <p className='mt-1 text-[11px] text-[#8b8e86]'>{activeCount} active monitors · {snapshot.points.length.toLocaleString()} stored data points</p>
                </div>
                <button className='text-[11px] font-semibold text-[#6c35e9] hover:text-[#4e1eb5]'>View all</button>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[760px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-black/[0.055] text-[9px] font-bold tracking-[0.08em] text-[#999b95] uppercase'>
                      <th className='px-5 py-3 font-semibold'>Campaign</th>
                      <th className='px-3 py-3 font-semibold'>Status</th>
                      <th className='px-3 py-3 font-semibold'>Impressions</th>
                      <th className='px-3 py-3 font-semibold'>Click target</th>
                      <th className='px-3 py-3 font-semibold'>CTR</th>
                      <th className='px-5 py-3 text-right font-semibold'>Monitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignRows.map(campaign => (
                      <tr key={campaign.id} className='border-b border-black/[0.045] last:border-0 hover:bg-black/[0.015]'>
                        <td className='px-5 py-3.5'>
                          <div className='flex items-center gap-3'>
                            <span className='flex size-8 items-center justify-center rounded-xl text-[11px] font-bold text-[#171816]' style={{ backgroundColor: campaign.color }}>
                              {campaign.name.slice(0, 1).toUpperCase()}
                            </span>
                            <span>
                              <span className='flex items-center gap-1.5 text-[12px] font-semibold text-[#333530]'>
                                {campaign.name}
                                <a href={campaign.url} target='_blank' rel='noreferrer' aria-label={`Open ${campaign.name} on X`} className='text-[#aaa] hover:text-[#6c35e9]'>
                                  <ExternalLink className='size-3' />
                                </a>
                              </span>
                              <span className='mt-0.5 block text-[10px] text-[#92958e]'>{campaign.handle} · {campaign.cadenceMinutes}m cadence</span>
                            </span>
                          </div>
                        </td>
                        <td className='px-3 py-3.5'>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-bold ${campaign.status === 'active' ? 'bg-[#eaf8d1] text-[#547b20]' : 'bg-[#ecece8] text-[#777972]'}`}>
                            <span className={`size-1.5 rounded-full ${campaign.status === 'active' ? 'bg-[#70aa2d]' : 'bg-[#999b95]'}`} />
                            {campaign.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </td>
                        <td className='px-3 py-3.5 text-[11px] font-semibold text-[#454741]'>{formatCompact(campaign.impressions)}</td>
                        <td className='w-[155px] px-3 py-3.5'>
                          <div className='flex items-center justify-between text-[9px] text-[#777a72]'>
                            <span className='font-semibold text-[#4a4c47]'>{formatCompact(campaign.clicks)}</span>
                            <span>{formatCompact(campaign.targetClicks)}</span>
                          </div>
                          <div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8e8e2]'>
                            <div className='h-full rounded-full' style={{ width: `${campaign.progress}%`, backgroundColor: campaign.color }} />
                          </div>
                        </td>
                        <td className='px-3 py-3.5 text-[11px] font-semibold text-[#454741]'>{campaign.ctr.toFixed(2)}%</td>
                        <td className='px-5 py-3.5 text-right'>
                          <button
                            onClick={() => void toggleCampaign(campaign)}
                            aria-label={`${campaign.status === 'active' ? 'Pause' : 'Resume'} ${campaign.name}`}
                            className='inline-flex size-8 items-center justify-center rounded-lg border border-black/8 bg-white text-[#73766f] hover:bg-[#f1f1ed] hover:text-[#333530]'
                          >
                            {campaign.status === 'active' ? <Pause className='size-3.5' /> : <Play className='size-3.5' />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='rounded-2xl border border-black/[0.075] bg-[#fbfbf8] shadow-[0_1px_0_rgba(0,0,0,0.015)]'>
              <div className='flex items-center justify-between border-b border-black/[0.065] px-5 py-4'>
                <div>
                  <h2 className='text-sm font-semibold'>Recent activity</h2>
                  <p className='mt-1 text-[11px] text-[#8b8e86]'>Monitor events and alerts</p>
                </div>
                <button className='flex size-8 items-center justify-center rounded-lg border border-black/8 bg-white text-[#777a73]'><BarChart3 className='size-3.5' /></button>
              </div>
              <div className='px-5 py-1'>
                {snapshot.activity.slice(0, 5).map((activityItem, index) => {
                  const Icon = activityItem.type === 'sync' ? RefreshCw : activityItem.type === 'alert' ? TrendingUp : Link2

                  return (
                    <div key={activityItem.id} className='relative flex gap-3 py-4'>
                      {index < Math.min(4, snapshot.activity.length - 1) && <span className='absolute bottom-0 left-[15px] top-11 w-px bg-black/[0.065]' />}
                      <span className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-xl ${activityItem.type === 'alert' ? 'bg-[#eaf8d1] text-[#5c8425]' : activityItem.type === 'campaign' ? 'bg-[#e9f2ff] text-[#2979bd]' : 'bg-[#eee8ff] text-[#6c35e9]'}`}>
                        <Icon className='size-3.5' />
                      </span>
                      <div className='min-w-0 pt-0.5'>
                        <p className='truncate text-[11px] font-semibold text-[#3d3f3a]'>{activityItem.title}</p>
                        <p className='mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#8b8e86]'>{activityItem.detail}</p>
                        <p className='mt-1.5 text-[9px] font-medium text-[#aaa]'>{formatRelativeTime(activityItem.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='mx-5 mb-5 rounded-xl border border-[#dcebc3] bg-[#f3fadf] px-3.5 py-3'>
                <div className='flex items-center gap-2 text-[10px] font-semibold text-[#527821]'>
                  <Check className='size-3.5' />
                  Persistent storage connected
                </div>
                <p className='mt-1 pl-[22px] text-[9px] text-[#78934e]'>Last write {formatRelativeTime(snapshot.updatedAt)}</p>
              </div>
            </div>
          </section>

          <footer className='flex flex-col gap-2 px-1 pb-2 pt-5 text-[9px] text-[#a0a29b] sm:flex-row sm:items-center sm:justify-between'>
            <p>Pulsewatch monitor · Local persistent mode</p>
            <p>{snapshot.storage.driver} · Updated {formatRelativeTime(snapshot.updatedAt)}</p>
          </footer>
        </div>
      </main>

      {addOpen && <AddCampaignModal onClose={() => setAddOpen(false)} onCreated={nextSnapshot => { setSnapshot(nextSnapshot); setToast('New campaign monitor created') }} />}

      {toast && (
        <div role='status' className='fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-xl bg-[#171816] px-4 py-3 text-xs font-medium text-white shadow-2xl'>
          <span className='flex size-5 items-center justify-center rounded-full bg-[#b9f44c] text-[#171816]'><Check className='size-3' strokeWidth={3} /></span>
          {toast}
        </div>
      )}
    </div>
  )
}
