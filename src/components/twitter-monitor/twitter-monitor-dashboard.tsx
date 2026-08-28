'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'

import {
  ArrowUpRightIcon,
  CalendarRangeIcon,
  CheckIcon,
  Clock3Icon,
  EyeIcon,
  LoaderCircleIcon,
  MousePointerClickIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  SparklesIcon,
  TrendingUpIcon
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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TrafficPoint, TwitterMonitorSnapshot } from '@/lib/twitter-monitor/types'

type Metric = 'impressions' | 'engagements' | 'linkClicks'

const METRICS: Array<{ key: Metric; label: string }> = [
  { key: 'impressions', label: 'Impressions' },
  { key: 'engagements', label: 'Engagements' },
  { key: 'linkClicks', label: 'Link clicks' }
]

const formatCompact = (value: number) =>
  Intl.NumberFormat('en-US', { notation: value >= 1000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value)

const formatFull = (value: number) => Intl.NumberFormat('en-US').format(Math.round(value))

const toDateTimeInput = (value: string) => {
  const date = new Date(value)
  const offset = date.getTimezoneOffset() * 60000

  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })

const formatRelativeTime = (value: string | null) => {
  if (!value) return 'Waiting for first collection'

  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.round(minutes / 60)

  return hours < 24 ? `${hours} hr ago` : `${Math.round(hours / 24)} days ago`
}

const sumMetric = (points: TrafficPoint[], metric: Metric) => points.reduce((total, point) => total + point[metric], 0)

function MetricTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null

  return (
    <div className='bg-background min-w-40 rounded-lg border px-3 py-2.5 text-xs shadow-xl'>
      <p className='text-muted-foreground mb-1.5'>{String(label)}</p>
      <div className='flex items-center justify-between gap-5'>
        <span>{String(payload[0]?.name ?? 'Value')}</span>
        <span className='font-semibold'>{formatFull(Number(payload[0]?.value ?? 0))}</span>
      </div>
    </div>
  )
}

export function TwitterMonitorDashboard({ initialSnapshot }: { initialSnapshot: TwitterMonitorSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const campaign = snapshot.campaigns[0]
  const [metric, setMetric] = useState<Metric>('impressions')

  const [form, setForm] = useState({
    url: campaign.url,
    monitorStartAt: toDateTimeInput(campaign.monitorStartAt),
    monitorEndAt: toDateTimeInput(campaign.monitorEndAt),
    cadenceMinutes: campaign.cadenceMinutes
  })

  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const monitorState =
    campaign.status === 'paused'
      ? { label: 'Paused', className: 'bg-muted text-muted-foreground' }
      : {
          label: 'Monitoring',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        }

  const windowPoints = useMemo(() => {
    const start = new Date(campaign.monitorStartAt).getTime()
    const end = new Date(campaign.monitorEndAt).getTime()

    return snapshot.points
      .filter(point => point.campaignId === campaign.id)
      .filter(point => {
        const timestamp = new Date(point.timestamp).getTime()

        return timestamp >= start && timestamp <= end
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }, [campaign.id, campaign.monitorEndAt, campaign.monitorStartAt, snapshot.points])

  const chartData = useMemo(
    () =>
      windowPoints.map(point => ({
        label: formatDateTime(point.timestamp),
        value: point[metric]
      })),
    [metric, windowPoints]
  )

  const totals = useMemo(
    () => ({
      impressions: sumMetric(windowPoints, 'impressions'),
      engagements: sumMetric(windowPoints, 'engagements'),
      linkClicks: sumMetric(windowPoints, 'linkClicks')
    }),
    [windowPoints]
  )

  const engagementRate = totals.impressions ? (totals.engagements / totals.impressions) * 100 : 0

  useEffect(() => {
    if (campaign.status !== 'active') return

    const timer = window.setInterval(async () => {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'collect', force: false })
      })

      if (!response.ok) return

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot }

      if (result.snapshot) setSnapshot(result.snapshot)
    }, 30000)

    return () => window.clearInterval(timer)
  }, [campaign.status])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(''), 3000)

    return () => window.clearTimeout(timer)
  }, [notice])

  async function saveMonitor(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'configure',
          monitor: {
            url: form.url,
            monitorStartAt: new Date(form.monitorStartAt).toISOString(),
            monitorEndAt: new Date(form.monitorEndAt).toISOString(),
            cadenceMinutes: form.cadenceMinutes
          }
        })
      })

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot; error?: string }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Could not save this monitor')

      setSnapshot(result.snapshot)
      setNotice('Monitoring settings saved')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not save this monitor')
    } finally {
      setSaving(false)
    }
  }

  async function syncNow() {
    setSyncing(true)
    setError('')

    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'collect', force: true })
      })

      const result = (await response.json()) as {
        snapshot?: TwitterMonitorSnapshot
        collected?: number
        error?: string
      }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Collection failed')

      setSnapshot(result.snapshot)
      setNotice(result.collected ? 'A new observation was saved' : 'Outside the monitoring window')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Collection failed')
    } finally {
      setSyncing(false)
    }
  }

  async function toggleMonitor() {
    setError('')

    try {
      const response = await fetch('/api/twitter-monitor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', campaignId: campaign.id })
      })

      const result = (await response.json()) as { snapshot?: TwitterMonitorSnapshot; error?: string }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Could not update monitoring')

      setSnapshot(result.snapshot)
      setNotice(campaign.status === 'active' ? 'Monitoring paused' : 'Monitoring resumed')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not update monitoring')
    }
  }

  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(circle_at_72%_10%,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_38%)]' />

      <section className='relative border-b px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
            <SparklesIcon className='size-3.5' /> Free marketing tool
          </Badge>
          <h1 className='mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl'>
            Monitor one X post, over time.
          </h1>
          <p className='text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg'>
            Choose a post and monitoring window. We will collect its traffic at a fixed interval and keep the history for you.
          </p>
        </div>
      </section>

      <section className='relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8'>
        <div className='mx-auto max-w-6xl space-y-6'>
          {error && (
            <div role='alert' className='border-destructive/25 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm'>
              {error}
            </div>
          )}

          <div className='grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]'>
            <Card className='gap-0 py-0 shadow-sm'>
              <CardHeader className='border-b px-5 py-5 sm:px-7'>
                <div className='flex items-center justify-between gap-4'>
                  <div>
                    <CardTitle className='text-lg'>Monitoring setup</CardTitle>
                    <p className='text-muted-foreground mt-1 text-sm'>This tool tracks one post at a time.</p>
                  </div>
                  <Badge className={monitorState.className}>{monitorState.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className='p-5 sm:p-7'>
                <form onSubmit={saveMonitor} className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='tweet-url'>X post URL</Label>
                    <Input
                      id='tweet-url'
                      type='url'
                      inputMode='url'
                      required
                      value={form.url}
                      onChange={event => setForm(current => ({ ...current, url: event.target.value }))}
                      placeholder='https://x.com/your_account/status/…'
                      className='h-11 font-mono text-sm'
                    />
                    <p className='text-muted-foreground text-xs'>Changing the URL starts a fresh history for the new post.</p>
                  </div>

                  <div className='grid gap-5 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='monitor-start'>Start time</Label>
                      <Input
                        id='monitor-start'
                        type='datetime-local'
                        required
                        value={form.monitorStartAt}
                        onChange={event => setForm(current => ({ ...current, monitorStartAt: event.target.value }))}
                        className='h-11'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='monitor-end'>End time</Label>
                      <Input
                        id='monitor-end'
                        type='datetime-local'
                        required
                        value={form.monitorEndAt}
                        onChange={event => setForm(current => ({ ...current, monitorEndAt: event.target.value }))}
                        className='h-11'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='monitor-frequency'>Collection frequency</Label>
                    <select
                      id='monitor-frequency'
                      value={form.cadenceMinutes}
                      onChange={event => setForm(current => ({ ...current, cadenceMinutes: Number(event.target.value) }))}
                      className='border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-3'
                    >
                      <option value={5}>Every 5 minutes</option>
                      <option value={15}>Every 15 minutes</option>
                      <option value={30}>Every 30 minutes</option>
                      <option value={60}>Every hour</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-2 border-t pt-5 sm:flex-row'>
                    <Button type='submit' className='h-10 sm:min-w-36' disabled={saving}>
                      {saving ? <LoaderCircleIcon className='animate-spin' /> : <PlayIcon />}
                      Save & monitor
                    </Button>
                    <Button type='button' variant='outline' className='h-10' onClick={() => void toggleMonitor()}>
                      {campaign.status === 'active' ? <PauseIcon /> : <PlayIcon />}
                      {campaign.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className='gap-0 py-0 shadow-sm'>
              <CardHeader className='bg-muted/40 border-b px-5 py-5'>
                <div className='flex items-center justify-between gap-3'>
                  <CardTitle>Current post</CardTitle>
                  <span className='bg-foreground text-background flex size-8 items-center justify-center rounded-lg text-sm font-semibold'>𝕏</span>
                </div>
              </CardHeader>
              <CardContent className='space-y-5 p-5'>
                <div>
                  <p className='text-sm font-medium'>{campaign.handle}</p>
                  <a
                    href={campaign.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 break-all text-xs leading-5 transition-colors'
                  >
                    {campaign.url}
                    <ArrowUpRightIcon className='size-3 shrink-0' />
                  </a>
                </div>

                <div className='space-y-4 border-t pt-5 text-sm'>
                  <div className='flex items-start gap-3'>
                    <CalendarRangeIcon className='text-muted-foreground mt-0.5 size-4 shrink-0' />
                    <div>
                      <p className='font-medium'>Monitoring window</p>
                      <p className='text-muted-foreground mt-1 text-xs leading-5'>
                        {formatDateTime(campaign.monitorStartAt)}<br />to {formatDateTime(campaign.monitorEndAt)}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Clock3Icon className='text-muted-foreground mt-0.5 size-4 shrink-0' />
                    <div>
                      <p className='font-medium'>Every {campaign.cadenceMinutes} minutes</p>
                      <p className='text-muted-foreground mt-1 text-xs'>Last collected {formatRelativeTime(campaign.lastSyncAt)}</p>
                    </div>
                  </div>
                </div>

                <Button variant='outline' className='h-10 w-full' onClick={() => void syncNow()} disabled={syncing}>
                  <RefreshCwIcon className={syncing ? 'animate-spin' : ''} />
                  Collect now
                </Button>

                <div className='bg-muted/45 text-muted-foreground flex items-start gap-2 rounded-lg border p-3 text-xs leading-5'>
                  <CheckIcon className='text-foreground mt-0.5 size-3.5 shrink-0' />
                  History is persisted in {snapshot.storage.driver === 'planetscale' ? 'PlanetScale' : 'local JSON'}.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 sm:grid-cols-3'>
            {[
              { label: 'Impressions', value: totals.impressions, icon: EyeIcon },
              { label: 'Engagements', value: totals.engagements, icon: TrendingUpIcon, helper: `${engagementRate.toFixed(2)}% rate` },
              { label: 'Link clicks', value: totals.linkClicks, icon: MousePointerClickIcon }
            ].map(item => (
              <Card key={item.label} size='sm' className='gap-3 shadow-sm'>
                <CardContent className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='text-muted-foreground text-xs'>{item.label}</p>
                    <p className='mt-2 text-2xl font-semibold tracking-[-0.03em]'>{formatCompact(item.value)}</p>
                    {item.helper && <p className='text-muted-foreground mt-1 text-xs'>{item.helper}</p>}
                  </div>
                  <span className='bg-muted flex size-9 items-center justify-center rounded-lg border'>
                    <item.icon className='size-4' />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className='gap-0 py-0 shadow-sm'>
            <CardHeader className='flex flex-col justify-between gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:px-7'>
              <div>
                <CardTitle className='text-lg'>Traffic over time</CardTitle>
                <p className='text-muted-foreground mt-1 text-sm'>{windowPoints.length} observations inside this monitoring window.</p>
              </div>
              <div className='bg-muted flex w-fit rounded-lg border p-0.5'>
                {METRICS.map(item => (
                  <button
                    key={item.key}
                    type='button'
                    onClick={() => setMetric(item.key)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${metric === item.key ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className='p-4 sm:p-7'>
              {chartData.length ? (
                <div className='h-[310px] min-w-0 sm:h-[380px]'>
                  <ResponsiveContainer
                    width='100%'
                    height='100%'
                    minWidth={0}
                    minHeight={0}
                    initialDimension={{ width: 900, height: 380 }}
                  >
                    <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -12, bottom: 4 }}>
                      <defs>
                        <linearGradient id='singleTweetArea' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor='currentColor' stopOpacity={0.16} />
                          <stop offset='100%' stopColor='currentColor' stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke='currentColor' strokeOpacity={0.08} strokeDasharray='3 5' />
                      <XAxis dataKey='label' axisLine={false} tickLine={false} minTickGap={45} tick={{ fill: 'currentColor', opacity: 0.48, fontSize: 10 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} width={58} tickFormatter={formatCompact} tick={{ fill: 'currentColor', opacity: 0.48, fontSize: 10 }} />
                      <Tooltip cursor={{ stroke: 'currentColor', strokeOpacity: 0.2, strokeDasharray: '3 4' }} content={<MetricTooltip />} />
                      <Area
                        type='monotone'
                        dataKey='value'
                        name={METRICS.find(item => item.key === metric)?.label}
                        stroke='currentColor'
                        strokeWidth={2}
                        fill='url(#singleTweetArea)'
                        dot={false}
                        activeDot={{ r: 4, fill: 'currentColor', stroke: 'var(--background)', strokeWidth: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className='bg-muted/30 flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center'>
                  <Clock3Icon className='text-muted-foreground size-6' />
                  <p className='mt-4 text-sm font-medium'>No observations in this window yet</p>
                  <p className='text-muted-foreground mt-1 max-w-sm text-xs leading-5'>Save the monitoring window and collect the first data point to begin the curve.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {notice && (
        <div role='status' className='bg-foreground text-background fixed right-5 bottom-5 z-[60] flex items-center gap-2 rounded-lg px-4 py-3 text-sm shadow-xl'>
          <CheckIcon className='size-4' /> {notice}
        </div>
      )}
    </div>
  )
}
