'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'

import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  Building2Icon,
  CalendarRangeIcon,
  CheckIcon,
  Clock3Icon,
  EyeIcon,
  Globe2Icon,
  LoaderCircleIcon,
  LockKeyholeIcon,
  MailIcon,
  MousePointerClickIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  SendIcon,
  ShieldCheckIcon,
  TrendingUpIcon
} from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
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
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MotionPreset } from '@/components/ui/motion-preset'
import SectionSeparator from '@/components/section-separator'
import type { TwitterMonitorSnapshot } from '@/lib/twitter-monitor/types'

type Metric = 'impressions' | 'engagements' | 'linkClicks'

const METRICS: Array<{ key: Metric; label: string }> = [
  { key: 'impressions', label: 'Impressions' },
  { key: 'engagements', label: 'Engagements' },
  { key: 'linkClicks', label: 'Link clicks' }
]

const formatCompact = (value: number) =>
  Intl.NumberFormat('en-US', { notation: value >= 1000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(
    value
  )

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

interface TwitterMonitorDashboardProps {
  initialSnapshot: TwitterMonitorSnapshot
  initialAccessGranted: boolean
  initialReportEmail: string
}

export function TwitterMonitorDashboard({
  initialSnapshot,
  initialAccessGranted,
  initialReportEmail
}: TwitterMonitorDashboardProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const campaign = snapshot.campaigns[0]
  const [metric, setMetric] = useState<Metric>('impressions')

  const [form, setForm] = useState(() => {
    const now = new Date()

    return {
      url: campaign?.url ?? '',
      monitorStartAt: toDateTimeInput(campaign?.monitorStartAt ?? now.toISOString()),
      monitorEndAt: toDateTimeInput(
        campaign?.monitorEndAt ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      ),
      cadenceMinutes: campaign?.cadenceMinutes ?? 15
    }
  })

  const [accessGranted, setAccessGranted] = useState(initialAccessGranted)
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [pendingMonitorSave, setPendingMonitorSave] = useState(false)
  const [accessForm, setAccessForm] = useState({ companyName: '', website: '', role: '', email: '' })
  const [accessSubmitting, setAccessSubmitting] = useState(false)
  const [accessError, setAccessError] = useState('')
  const [reportEmail, setReportEmail] = useState(initialReportEmail)
  const [sendingReport, setSendingReport] = useState(false)

  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const monitorState = !campaign
    ? { label: 'Not configured', className: 'bg-muted text-muted-foreground' }
    : campaign.status === 'paused'
      ? { label: 'Paused', className: 'bg-muted text-muted-foreground' }
      : {
          label: 'Monitoring',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        }

  const windowPoints = useMemo(() => {
    if (!campaign) return []

    const start = new Date(campaign.monitorStartAt).getTime()
    const end = new Date(campaign.monitorEndAt).getTime()

    return snapshot.points
      .filter(point => point.campaignId === campaign.id)
      .filter(point => {
        const timestamp = new Date(point.timestamp).getTime()

        return timestamp >= start && timestamp <= end
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }, [campaign, snapshot.points])

  const chartData = useMemo(
    () =>
      windowPoints
        .filter(point => point[metric] !== null)
        .map(point => ({
          label: formatDateTime(point.timestamp),
          value: point[metric] as number
        })),
    [metric, windowPoints]
  )

  const latestPoint = windowPoints.at(-1)

  const engagementRate =
    latestPoint?.impressions && latestPoint.engagements !== null
      ? (latestPoint.engagements / latestPoint.impressions) * 100
      : null

  useEffect(() => {
    if (!accessGranted || campaign?.status !== 'active') return

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
  }, [accessGranted, campaign?.status])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(''), 3000)

    return () => window.clearTimeout(timer)
  }, [notice])

  async function persistMonitor() {
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

      const result = (await response.json()) as {
        snapshot?: TwitterMonitorSnapshot
        collected?: number
        errors?: string[]
        error?: string
      }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Could not save this monitor')

      setSnapshot(result.snapshot)

      if (result.errors?.length) {
        setError(`Monitor saved, but the first RapidAPI collection failed: ${result.errors[0]}`)
      } else if (result.collected) {
        setNotice('Monitor saved and the first real observation was collected')
      } else {
        setNotice('Monitoring settings saved; collection will begin inside the selected window')
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not save this monitor')
    } finally {
      setSaving(false)
    }
  }

  async function saveMonitor(event: FormEvent) {
    event.preventDefault()

    if (!accessGranted) {
      setPendingMonitorSave(true)
      setAccessModalOpen(true)

      return
    }

    await persistMonitor()
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
        errors?: string[]
        error?: string
      }

      if (!response.ok || !result.snapshot) throw new Error(result.error ?? 'Refresh failed')

      setSnapshot(result.snapshot)
      if (result.errors?.length) throw new Error(result.errors[0])
      setNotice(result.collected ? 'A new real observation was collected' : 'No collection was due')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Refresh failed')
    } finally {
      setSyncing(false)
    }
  }

  async function toggleMonitor() {
    if (!campaign) return

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

  async function requestAccess(event: FormEvent) {
    event.preventDefault()
    setAccessSubmitting(true)
    setAccessError('')

    try {
      const response = await fetch('/api/twitter-monitor/access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(accessForm)
      })

      const result = (await response.json()) as {
        granted?: boolean
        email?: string
        snapshot?: TwitterMonitorSnapshot
        error?: string
      }

      if (!response.ok || !result.granted || !result.snapshot) {
        throw new Error(result.error ?? 'Could not unlock the monitor')
      }

      setSnapshot(result.snapshot)
      setReportEmail(result.email ?? accessForm.email)
      setAccessGranted(true)
      setAccessModalOpen(false)

      const shouldSaveMonitor = pendingMonitorSave

      setPendingMonitorSave(false)
      setNotice(shouldSaveMonitor ? 'Details saved — starting your monitor' : 'Access confirmed — the monitor is ready')
      window.setTimeout(() => {
        document.getElementById('monitor')?.scrollIntoView({ behavior: 'smooth' })
        if (shouldSaveMonitor) void persistMonitor()
      }, 100)
    } catch (caughtError) {
      setAccessError(caughtError instanceof Error ? caughtError.message : 'Could not unlock the monitor')
    } finally {
      setAccessSubmitting(false)
    }
  }

  async function sendReport(event: FormEvent) {
    event.preventDefault()
    setSendingReport(true)
    setError('')

    try {
      const response = await fetch('/api/twitter-monitor/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: reportEmail })
      })

      const result = (await response.json()) as { sent?: boolean; message?: string; error?: string }

      if (!response.ok || !result.sent) throw new Error(result.error ?? 'Could not send the report')

      setNotice(result.message ?? `Report sent to ${reportEmail}`)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not send the report')
    } finally {
      setSendingReport(false)
    }
  }

  return (
    <div>
      <section className='relative px-4 py-8 max-sm:pb-32 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
        <BackgroundRippleEffect />
        <div className='pointer-events-none absolute inset-x-0 top-0 z-5 h-128 bg-[radial-gradient(transparent_20%,var(--background)_90%)]' />
        <div className='flex flex-col items-center gap-4'>
          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            className='z-10'
          >
            <Badge variant='outline' className='bg-background h-auto text-sm font-normal'>
              Free Twitter analytics tool
            </Badge>
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.2}
            component='h1'
            className='z-10 max-w-3xl text-center text-3xl font-semibold md:text-4xl lg:text-5xl lg:leading-[1.29167]'
          >
            Free Twitter (X) Post Analytics Tracker
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.4}
            component='p'
            className='text-muted-foreground z-10 max-w-156 text-center text-xl'
          >
            Track a public post&apos;s impressions, engagements, link clicks, and engagement rate over a custom monitoring window—without connecting your X account.
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.6}
            className='z-10'
          >
            <PrimaryFlowButton asChild>
              <a href='#monitor'>
                {accessGranted ? 'Set up monitor' : 'Use this monitor'}
                <ArrowDownIcon />
              </a>
            </PrimaryFlowButton>
          </MotionPreset>
        </div>
      </section>

      <SectionSeparator />

      <section id='monitor' className='scroll-mt-16 py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'
          >
            <p className='text-primary text-sm font-medium uppercase'>Twitter analytics dashboard</p>
            <h2 className='text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl'>
              Track Twitter/X post performance over time
            </h2>
            <p className='text-muted-foreground text-base sm:text-lg lg:text-xl'>
              Paste a post URL, choose the exact time range and collection frequency, then follow its traffic curve as it develops.
            </p>
          </MotionPreset>

          <div className='space-y-6'>
              {error && (
                <div
                  role='alert'
                  className='border-destructive/25 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm'
                >
                  {error}
                </div>
              )}

              <div className='grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]'>
                <Card className='gap-0 py-0 shadow-none'>
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
                        <p className='text-muted-foreground text-xs'>
                          Changing the URL starts a fresh history for the new post.
                        </p>
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
                      <p className='text-muted-foreground -mt-3 text-xs'>Monitoring windows can span up to 30 days.</p>

                      <div className='space-y-2'>
                        <Label htmlFor='monitor-frequency'>Collection frequency</Label>
                        <select
                          id='monitor-frequency'
                          value={form.cadenceMinutes}
                          onChange={event =>
                            setForm(current => ({ ...current, cadenceMinutes: Number(event.target.value) }))
                          }
                          className='border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-3'
                        >
                          <option value={15}>Every 15 minutes</option>
                          <option value={30}>Every 30 minutes</option>
                          <option value={60}>Every hour</option>
                        </select>
                      </div>

                      <div className='flex flex-col gap-2 border-t pt-5 sm:flex-row'>
                        <PrimaryFlowButton type='submit' disabled={saving}>
                          {saving ? <LoaderCircleIcon className='animate-spin' /> : <PlayIcon />}
                          Save & monitor
                        </PrimaryFlowButton>
                        {campaign && (
                          <Button type='button' variant='outline' className='h-10' onClick={() => void toggleMonitor()}>
                            {campaign.status === 'active' ? <PauseIcon /> : <PlayIcon />}
                            {campaign.status === 'active' ? 'Pause' : 'Resume'}
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className='gap-0 py-0 shadow-none'>
                  <CardHeader className='bg-muted/40 border-b px-5 py-5'>
                    <div className='flex items-center justify-between gap-3'>
                      <CardTitle>Current post</CardTitle>
                      <span className='bg-foreground text-background flex size-8 items-center justify-center rounded-lg text-sm font-semibold'>
                        𝕏
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-5 p-5'>
                    {campaign ? (
                      <>
                        <div>
                          <p className='text-sm font-medium'>{campaign.handle}</p>
                          <a
                            href={campaign.url}
                            target='_blank'
                            rel='noreferrer'
                            className='text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-xs leading-5 break-all transition-colors'
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
                                {formatDateTime(campaign.monitorStartAt)}
                                <br />
                                to {formatDateTime(campaign.monitorEndAt)}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-start gap-3'>
                            <Clock3Icon className='text-muted-foreground mt-0.5 size-4 shrink-0' />
                            <div>
                              <p className='font-medium'>Every {campaign.cadenceMinutes} minutes</p>
                              <p className='text-muted-foreground mt-1 text-xs'>
                                Last collected {formatRelativeTime(campaign.lastSyncAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className='bg-muted/30 flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed px-5 text-center'>
                        <Clock3Icon className='text-muted-foreground size-5' />
                        <p className='mt-3 text-sm font-medium'>No post configured</p>
                        <p className='text-muted-foreground mt-1 text-xs leading-5'>
                          Use the form to start monitoring a real X post.
                        </p>
                      </div>
                    )}

                    <Button
                      variant='outline'
                      className='h-10 w-full'
                      onClick={() => void syncNow()}
                      disabled={syncing || !campaign}
                    >
                      <RefreshCwIcon className={syncing ? 'animate-spin' : ''} />
                      Refresh data
                    </Button>

                    {campaign && (
                      <form onSubmit={sendReport} className='space-y-3 border-t pt-5'>
                        <div className='space-y-1.5'>
                          <Label htmlFor='report-email' className='text-sm'>
                            Email monitoring report
                          </Label>
                          <p className='text-muted-foreground text-xs leading-5'>
                            Send the current totals and latest observations to any recipient.
                          </p>
                        </div>
                        <Input
                          id='report-email'
                          type='email'
                          inputMode='email'
                          required
                          value={reportEmail}
                          onChange={event => setReportEmail(event.target.value)}
                          placeholder='team@company.com'
                          className='h-10'
                        />
                        <Button type='submit' className='h-10 w-full' disabled={sendingReport}>
                          {sendingReport ? <LoaderCircleIcon className='animate-spin' /> : <SendIcon />}
                          Send current report
                        </Button>
                      </form>
                    )}

                    <div className='bg-muted/45 text-muted-foreground flex items-start gap-2 rounded-lg border p-3 text-xs leading-5'>
                      <CheckIcon className='text-foreground mt-0.5 size-3.5 shrink-0' />
                      History is persisted in {snapshot.storage.driver === 'planetscale' ? 'PlanetScale' : 'local JSON'}
                      .
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='grid gap-4 sm:grid-cols-3'>
                {[
                  { label: 'Impressions', value: latestPoint?.impressions, icon: EyeIcon },
                  {
                    label: 'Engagements',
                    value: latestPoint?.engagements,
                    icon: TrendingUpIcon,
                    helper: engagementRate === null ? undefined : `${engagementRate.toFixed(2)}% rate`
                  },
                  { label: 'Link clicks', value: latestPoint?.linkClicks, icon: MousePointerClickIcon }
                ].map(item => {
                  const available = item.value !== null && item.value !== undefined

                  return (
                    <Card key={item.label} size='sm' className='gap-3 shadow-none'>
                      <CardContent className='flex items-start justify-between gap-4'>
                        <div>
                          <p className='text-muted-foreground text-xs'>{item.label}</p>
                          <p className='mt-2 text-2xl font-semibold tracking-[-0.03em]'>
                            {item.value === null || item.value === undefined ? '—' : formatCompact(item.value)}
                          </p>
                          {item.helper && available && (
                            <p className='text-muted-foreground mt-1 text-xs'>{item.helper}</p>
                          )}
                        </div>
                        <span className='bg-muted flex size-9 items-center justify-center rounded-lg border'>
                          <item.icon className='size-4' />
                        </span>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card className='gap-0 py-0 shadow-none'>
                <CardHeader className='flex flex-col justify-between gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:px-7'>
                  <div>
                    <CardTitle className='text-lg'>Traffic over time</CardTitle>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {windowPoints.length
                        ? `${windowPoints.length} observations inside this monitoring window.`
                        : 'No real observations have been received yet.'}
                    </p>
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
                          <CartesianGrid
                            vertical={false}
                            stroke='currentColor'
                            strokeOpacity={0.08}
                            strokeDasharray='3 5'
                          />
                          <XAxis
                            dataKey='label'
                            axisLine={false}
                            tickLine={false}
                            minTickGap={45}
                            tick={{ fill: 'currentColor', opacity: 0.48, fontSize: 10 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={58}
                            tickFormatter={formatCompact}
                            tick={{ fill: 'currentColor', opacity: 0.48, fontSize: 10 }}
                          />
                          <Tooltip
                            cursor={{ stroke: 'currentColor', strokeOpacity: 0.2, strokeDasharray: '3 4' }}
                            content={<MetricTooltip />}
                          />
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
                      <p className='mt-4 text-sm font-medium'>
                        {windowPoints.length
                          ? `${METRICS.find(item => item.key === metric)?.label} is unavailable for this post`
                          : 'No observations in this window yet'}
                      </p>
                      <p className='text-muted-foreground mt-1 max-w-sm text-xs leading-5'>
                        {windowPoints.length
                          ? 'Twitter API45 does not expose this metric for every post, so unavailable values stay empty.'
                          : 'The first real observation is collected from Twitter API45 as soon as this monitor is saved.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
          </div>
        </div>
      </section>

      <DialogPrimitive.Root open={!accessGranted && accessModalOpen} onOpenChange={setAccessModalOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm' />
          <DialogPrimitive.Content className='bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-[90] max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border shadow-2xl outline-none'>
            <div className='bg-muted/35 relative overflow-hidden border-b px-6 py-6 sm:px-8'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_48%)]' />
              <div className='relative flex items-start gap-4 pr-8'>
                <span className='bg-background flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm'>
                  <LockKeyholeIcon className='size-5' />
                </span>
                <div>
                  <DialogPrimitive.Title className='text-xl font-semibold'>Unlock X Post Monitor</DialogPrimitive.Title>
                  <DialogPrimitive.Description className='text-muted-foreground mt-1.5 text-sm leading-6'>
                    Complete this one-time form to start the monitor you just configured.
                  </DialogPrimitive.Description>
                </div>
              </div>
              <DialogPrimitive.Close asChild>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon-sm'
                  className='absolute top-5 right-5'
                  aria-label='Close'
                >
                  <span aria-hidden='true' className='text-lg leading-none'>
                    ×
                  </span>
                </Button>
              </DialogPrimitive.Close>
            </div>

            <form onSubmit={requestAccess} className='space-y-5 p-6 sm:p-8'>
              {accessError && (
                <div
                  role='alert'
                  className='border-destructive/25 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm'
                >
                  {accessError}
                </div>
              )}

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='access-company'>Company name</Label>
                  <div className='relative'>
                    <Building2Icon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                    <Input
                      id='access-company'
                      required
                      autoComplete='organization'
                      maxLength={120}
                      value={accessForm.companyName}
                      onChange={event => setAccessForm(current => ({ ...current, companyName: event.target.value }))}
                      placeholder='Acme Inc.'
                      className='h-11 pl-9'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='access-website'>Website</Label>
                  <div className='relative'>
                    <Globe2Icon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                    <Input
                      id='access-website'
                      type='text'
                      inputMode='url'
                      required
                      autoComplete='url'
                      value={accessForm.website}
                      onChange={event => setAccessForm(current => ({ ...current, website: event.target.value }))}
                      placeholder='company.com'
                      className='h-11 pl-9'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='access-role'>Your role</Label>
                <select
                  id='access-role'
                  required
                  value={accessForm.role}
                  onChange={event => setAccessForm(current => ({ ...current, role: event.target.value }))}
                  className='border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-3'
                >
                  <option value='' disabled>
                    Select your role
                  </option>
                  <option value='Founder / Owner'>Founder / Owner</option>
                  <option value='Marketing / Growth'>Marketing / Growth</option>
                  <option value='Agency / Consultant'>Agency / Consultant</option>
                  <option value='Product / Data'>Product / Data</option>
                  <option value='Other'>Other</option>
                </select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='access-email'>Report email</Label>
                <div className='relative'>
                  <MailIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                  <Input
                    id='access-email'
                    type='email'
                    inputMode='email'
                    required
                    autoComplete='email'
                    value={accessForm.email}
                    onChange={event => setAccessForm(current => ({ ...current, email: event.target.value }))}
                    placeholder='you@company.com'
                    className='h-11 pl-9'
                  />
                </div>
                <p className='text-muted-foreground text-xs leading-5'>
                  This becomes the default recipient for monitoring reports and can be changed later.
                </p>
              </div>

              <div className='border-t pt-5'>
                <PrimaryFlowButton type='submit' disabled={accessSubmitting} className='w-full [&>button]:w-full'>
                  {accessSubmitting ? <LoaderCircleIcon className='animate-spin' /> : <ShieldCheckIcon />}
                  Submit & start monitor
                </PrimaryFlowButton>
                <p className='text-muted-foreground mt-3 text-center text-xs leading-5'>
                  All four fields are required. Access is granted only after the submission is stored.
                </p>
              </div>
            </form>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      {notice && (
        <div
          role='status'
          className='bg-foreground text-background fixed right-5 bottom-5 z-[60] flex items-center gap-2 rounded-lg px-4 py-3 text-sm shadow-xl'
        >
          <CheckIcon className='size-4' /> {notice}
        </div>
      )}
    </div>
  )
}
