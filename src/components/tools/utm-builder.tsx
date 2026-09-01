'use client'

import { useMemo, useState } from 'react'

import {
  ArrowUpRightIcon,
  CheckIcon,
  ClipboardIcon,
  Link2Icon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { SiteLang } from '@/lib/language'

type FieldKey = 'source' | 'medium' | 'campaign' | 'term' | 'content' | 'id'

type Copy = {
  eyebrow: string
  title: string
  description: string
  destination: string
  destinationHint: string
  required: string
  optional: string
  fields: Record<FieldKey, { label: string; hint: string; placeholder: string }>
  result: string
  resultHint: string
  copy: string
  copied: string
  open: string
  reset: string
  invalid: string
  empty: string
  tipsTitle: string
  tips: string[]
  privacy: string
}

const COPY: Record<'en' | 'zh', Copy> = {
  en: {
    eyebrow: 'Free marketing tool',
    title: 'Build links you can actually measure.',
    description: 'Add consistent UTM parameters to any campaign URL and see exactly which channels drive traffic and conversions.',
    destination: 'Destination URL',
    destinationHint: 'The page people should land on. Existing query parameters will be preserved.',
    required: 'Required',
    optional: 'Optional',
    fields: {
      source: { label: 'Campaign source', hint: 'Where the traffic comes from', placeholder: 'e.g. google, newsletter, linkedin' },
      medium: { label: 'Campaign medium', hint: 'The marketing channel', placeholder: 'e.g. cpc, email, social' },
      campaign: { label: 'Campaign name', hint: 'Your campaign or promotion', placeholder: 'e.g. summer_launch' },
      term: { label: 'Campaign term', hint: 'Paid keyword or audience', placeholder: 'e.g. marketing_software' },
      content: { label: 'Campaign content', hint: 'Distinguish ads or links', placeholder: 'e.g. blue_cta, video_a' },
      id: { label: 'Campaign ID', hint: 'Platform campaign identifier', placeholder: 'e.g. 123456' }
    },
    result: 'Your campaign URL',
    resultHint: 'Complete the required fields to generate your trackable link.',
    copy: 'Copy URL',
    copied: 'Copied',
    open: 'Test link',
    reset: 'Reset',
    invalid: 'Enter a complete URL starting with http:// or https://',
    empty: 'Your generated URL will appear here',
    tipsTitle: 'Keep campaign data clean',
    tips: ['Use lowercase consistently', 'Use underscores instead of spaces', 'Never put personal data in UTM parameters'],
    privacy: 'Everything stays in your browser. No campaign data is stored.'
  },
  zh: {
    eyebrow: '免费营销工具',
    title: '创建真正可衡量的推广链接。',
    description: '为任何推广链接添加规范的 UTM 参数，准确识别带来流量与转化的渠道。',
    destination: '目标网址',
    destinationHint: '用户最终访问的页面，原网址已有参数会自动保留。',
    required: '必填',
    optional: '选填',
    fields: {
      source: { label: '广告来源（Source）', hint: '流量来自哪里', placeholder: '例如 google、newsletter、linkedin' },
      medium: { label: '广告媒介（Medium）', hint: '使用的营销渠道', placeholder: '例如 cpc、email、social' },
      campaign: { label: '广告系列（Campaign）', hint: '活动或推广名称', placeholder: '例如 summer_launch' },
      term: { label: '关键词（Term）', hint: '付费关键词或受众', placeholder: '例如 marketing_software' },
      content: { label: '广告内容（Content）', hint: '区分不同素材或链接', placeholder: '例如 blue_cta、video_a' },
      id: { label: '广告系列 ID', hint: '广告平台中的活动编号', placeholder: '例如 123456' }
    },
    result: '你的推广链接',
    resultHint: '填写全部必填字段后即可生成可追踪链接。',
    copy: '复制链接',
    copied: '已复制',
    open: '测试链接',
    reset: '清空',
    invalid: '请输入以 http:// 或 https:// 开头的完整网址',
    empty: '生成的链接会显示在这里',
    tipsTitle: '保持数据整洁',
    tips: ['参数统一使用小写', '用下划线代替空格', 'UTM 参数中不要包含个人信息'],
    privacy: '所有操作都在浏览器本地完成，我们不会存储你的推广数据。'
  }
}

const EMPTY_FIELDS: Record<FieldKey, string> = { source: '', medium: '', campaign: '', term: '', content: '', id: '' }
const FIELD_ORDER: FieldKey[] = ['source', 'medium', 'campaign', 'term', 'content', 'id']
const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '_')

function buildUrl(destination: string, fields: Record<FieldKey, string>) {
  try {
    const url = new URL(destination)

    if (!['http:', 'https:'].includes(url.protocol)) return ''
    FIELD_ORDER.forEach(key => {
      const value = normalize(fields[key])

      if (value) url.searchParams.set(`utm_${key}`, value)
    })

    return url.toString()
  } catch {
    return ''
  }
}

const UtmBuilder = ({ lang }: { lang: SiteLang }) => {
  const copy = COPY[lang]
  const [destination, setDestination] = useState('')
  const [fields, setFields] = useState<Record<FieldKey, string>>(EMPTY_FIELDS)
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState(false)

  const isReady = Boolean(destination && fields.source && fields.medium && fields.campaign)
  const generatedUrl = useMemo(() => (isReady ? buildUrl(destination, fields) : ''), [destination, fields, isReady])
  const invalidUrl = touched && destination.length > 0 && !buildUrl(destination, EMPTY_FIELDS)

  const updateField = (key: FieldKey, value: string) => {
    setFields(current => ({ ...current, [key]: value }))
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const handleReset = () => {
    setDestination('')
    setFields(EMPTY_FIELDS)
    setTouched(false)
    setCopied(false)
  }

  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(circle_at_72%_10%,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_38%)]' />
      <section className='relative border-b px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto max-w-5xl text-center'>
          <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
            <SparklesIcon className='size-3.5' /> {copy.eyebrow}
          </Badge>
          <h1 className='mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl'>{copy.title}</h1>
          <p className='text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg'>{copy.description}</p>
        </div>
      </section>

      <section className='relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)]'>
          <Card className='gap-0 overflow-hidden py-0 shadow-sm'>
            <CardHeader className='border-b px-5 py-5 sm:px-7'>
              <div className='flex items-center justify-between gap-4'>
                <CardTitle className='flex items-center gap-2 text-lg'><Link2Icon className='size-5' /> UTM Builder</CardTitle>
                <Button variant='ghost' size='sm' onClick={handleReset}><RotateCcwIcon /> {copy.reset}</Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-7 p-5 sm:p-7'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between gap-3'>
                  <Label htmlFor='destination' className='text-sm font-medium'>{copy.destination}</Label>
                  <span className='text-muted-foreground text-[11px] font-medium tracking-wide uppercase'>{copy.required}</span>
                </div>
                <Input
                  id='destination'
                  type='url'
                  inputMode='url'
                  autoComplete='url'
                  placeholder='https://example.com/landing-page'
                  value={destination}
                  onChange={event => { setDestination(event.target.value); setCopied(false) }}
                  onBlur={() => setTouched(true)}
                  aria-invalid={invalidUrl}
                  className='h-11 font-mono text-sm'
                />
                <p className={cn('text-muted-foreground text-xs leading-5', invalidUrl && 'text-destructive')}>{invalidUrl ? copy.invalid : copy.destinationHint}</p>
              </div>

              <div className='grid gap-x-5 gap-y-6 sm:grid-cols-2'>
                {FIELD_ORDER.map((key, index) => {
                  const field = copy.fields[key]
                  const required = index < 3

                  return (
                    <div key={key} className='space-y-2'>
                      <div className='flex items-center justify-between gap-3'>
                        <Label htmlFor={`utm-${key}`}>{field.label}</Label>
                        <span className='text-muted-foreground text-[10px] font-medium tracking-wide uppercase'>{required ? copy.required : copy.optional}</span>
                      </div>
                      <Input id={`utm-${key}`} placeholder={field.placeholder} value={fields[key]} onChange={event => updateField(key, event.target.value)} className='h-10' />
                      <p className='text-muted-foreground text-xs'>{field.hint}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className='space-y-6 lg:sticky lg:top-22 lg:self-start'>
            <Card className='overflow-hidden border-foreground/15 py-0 shadow-sm'>
              <CardHeader className='bg-muted/45 border-b px-5 py-5'>
                <CardTitle className='text-base'>{copy.result}</CardTitle>
                <p className='text-muted-foreground text-xs leading-5'>{copy.resultHint}</p>
              </CardHeader>
              <CardContent className='space-y-4 p-5'>
                <div className={cn('bg-muted/50 min-h-31 break-all rounded-lg border p-4 font-mono text-sm leading-6', !generatedUrl && 'text-muted-foreground flex items-center justify-center text-center font-sans')}>
                  {generatedUrl || copy.empty}
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Button className='h-10' disabled={!generatedUrl} onClick={handleCopy}>
                    {copied ? <CheckIcon /> : <ClipboardIcon />} {copied ? copy.copied : copy.copy}
                  </Button>
                  <Button variant='outline' className='h-10' disabled={!generatedUrl} asChild={Boolean(generatedUrl)}>
                    {generatedUrl ? <a href={generatedUrl} target='_blank' rel='noreferrer'><ArrowUpRightIcon /> {copy.open}</a> : <span><ArrowUpRightIcon /> {copy.open}</span>}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className='gap-4 py-5'>
              <CardHeader className='px-5'><CardTitle className='text-sm'>{copy.tipsTitle}</CardTitle></CardHeader>
              <CardContent className='space-y-3 px-5'>
                {copy.tips.map(tip => <div key={tip} className='flex items-start gap-2 text-sm'><CheckIcon className='mt-0.5 size-4 shrink-0' /><span>{tip}</span></div>)}
                <div className='text-muted-foreground mt-5 flex items-start gap-2 border-t pt-4 text-xs leading-5'><ShieldCheckIcon className='mt-0.5 size-4 shrink-0' /><span>{copy.privacy}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UtmBuilder
