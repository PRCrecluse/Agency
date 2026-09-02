'use client'

import { useMemo, useState, type FormEvent } from 'react'

import { useSearchParams } from 'next/navigation'
import {
  ArrowUpRightIcon,
  Building2Icon,
  CheckIcon,
  ClipboardIcon,
  Globe2Icon,
  Link2Icon,
  LoaderCircleIcon,
  LockKeyholeIcon,
  MailIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon
} from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FieldKey = 'source' | 'medium' | 'campaign' | 'term' | 'content' | 'id'

type AccessCopy = {
  ready: string
  unlock: string
  title: string
  description: string
  company: string
  companyPlaceholder: string
  website: string
  websitePlaceholder: string
  role: string
  selectRole: string
  email: string
  emailPlaceholder: string
  emailHint: string
  submit: string
  submitting: string
  footer: string
}

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
  access: AccessCopy
}

const COPY: Record<'en' | 'zh', Copy> = {
  en: {
    eyebrow: 'Free marketing tool',
    title: 'Build links you can actually measure.',
    description:
      'Add consistent UTM parameters to any campaign URL and see exactly which channels drive traffic and conversions.',
    destination: 'Destination URL',
    destinationHint: 'The page people should land on. Existing query parameters will be preserved.',
    required: 'Required',
    optional: 'Optional',
    fields: {
      source: {
        label: 'Campaign source',
        hint: 'Where the traffic comes from',
        placeholder: 'e.g. google, newsletter, linkedin'
      },
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
    tips: [
      'Use lowercase consistently',
      'Use underscores instead of spaces',
      'Never put personal data in UTM parameters'
    ],
    privacy: 'Your destination URL and UTM values stay in your browser. Only the one-time access form is stored.',
    access: {
      ready: 'Your campaign URL is ready. Complete the one-time access form to reveal and use it.',
      unlock: 'Unlock URL',
      title: 'Unlock UTM Builder',
      description: 'Complete this one-time form to reveal, copy, and test your campaign URL.',
      company: 'Company name',
      companyPlaceholder: 'Acme Inc.',
      website: 'Website',
      websitePlaceholder: 'company.com',
      role: 'Your role',
      selectRole: 'Select your role',
      email: 'Work email',
      emailPlaceholder: 'you@company.com',
      emailHint: 'We use this to identify your one-time tool access.',
      submit: 'Submit & unlock URL',
      submitting: 'Unlocking…',
      footer: 'All four fields are required. Access is granted only after your submission is stored.'
    }
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
    privacy: '目标网址和 UTM 参数只在浏览器中处理；我们仅保存一次性解锁表单中的资料。',
    access: {
      ready: '推广链接已准备好，填写一次性资料后即可查看和使用。',
      unlock: '解锁链接',
      title: '解锁 UTM Builder',
      description: '填写一次性资料后，即可查看、复制并测试你的推广链接。',
      company: '公司名称',
      companyPlaceholder: '例如 Meridian',
      website: '公司网站',
      websitePlaceholder: 'company.com',
      role: '你的职位',
      selectRole: '请选择职位',
      email: '工作邮箱',
      emailPlaceholder: 'you@company.com',
      emailHint: '此邮箱用于识别你的一次性工具访问权限。',
      submit: '提交并解锁链接',
      submitting: '正在解锁…',
      footer: '四项资料均为必填，提交成功后即可使用工具。'
    }
  }
}

const EMPTY_FIELDS: Record<FieldKey, string> = { source: '', medium: '', campaign: '', term: '', content: '', id: '' }
const FIELD_ORDER: FieldKey[] = ['source', 'medium', 'campaign', 'term', 'content', 'id']
const EMPTY_ACCESS_FORM = { companyName: '', website: '', role: '', email: '' }

const ROLE_OPTIONS = [
  { value: 'Founder / Owner', en: 'Founder / Owner', zh: '创始人 / 企业主' },
  { value: 'Marketing / Growth', en: 'Marketing / Growth', zh: '市场 / 增长' },
  { value: 'Agency / Consultant', en: 'Agency / Consultant', zh: '代理商 / 顾问' },
  { value: 'Product / Data', en: 'Product / Data', zh: '产品 / 数据' },
  { value: 'Other', en: 'Other', zh: '其他' }
]

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

interface UtmBuilderProps {
  initialAccessGranted: boolean
}

const UtmBuilder = ({ initialAccessGranted }: UtmBuilderProps) => {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang')?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  const copy = COPY[lang]
  const [destination, setDestination] = useState('')
  const [fields, setFields] = useState<Record<FieldKey, string>>(EMPTY_FIELDS)
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState(false)
  const [accessGranted, setAccessGranted] = useState(initialAccessGranted)
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [accessForm, setAccessForm] = useState(EMPTY_ACCESS_FORM)
  const [accessSubmitting, setAccessSubmitting] = useState(false)
  const [accessError, setAccessError] = useState('')

  const isReady = Boolean(destination && fields.source && fields.medium && fields.campaign)
  const generatedUrl = useMemo(() => (isReady ? buildUrl(destination, fields) : ''), [destination, fields, isReady])
  const visibleGeneratedUrl = accessGranted ? generatedUrl : ''
  const invalidUrl = touched && destination.length > 0 && !buildUrl(destination, EMPTY_FIELDS)

  const updateField = (key: FieldKey, value: string) => {
    setFields(current => ({ ...current, [key]: value }))
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!generatedUrl) return

    if (!accessGranted) {
      setAccessError('')
      setAccessModalOpen(true)

      return
    }

    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const requestAccess = async (event: FormEvent) => {
    event.preventDefault()
    setAccessSubmitting(true)
    setAccessError('')

    try {
      const response = await fetch('/api/utm-builder/access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(accessForm)
      })

      const result = (await response.json()) as { granted?: boolean; error?: string }

      if (!response.ok || !result.granted) throw new Error(result.error ?? 'Could not unlock the UTM Builder')

      setAccessGranted(true)
      setAccessModalOpen(false)
    } catch (error) {
      setAccessError(error instanceof Error ? error.message : 'Could not unlock the UTM Builder')
    } finally {
      setAccessSubmitting(false)
    }
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
          <p className='text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg'>
            {copy.description}
          </p>
        </div>
      </section>

      <section className='relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)]'>
          <Card className='gap-0 overflow-hidden py-0 shadow-sm'>
            <CardHeader className='border-b px-5 py-5 sm:px-7'>
              <div className='flex items-center justify-between gap-4'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Link2Icon className='size-5' /> UTM Builder
                </CardTitle>
                <Button variant='ghost' size='sm' onClick={handleReset}>
                  <RotateCcwIcon /> {copy.reset}
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-7 p-5 sm:p-7'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between gap-3'>
                  <Label htmlFor='destination' className='text-sm font-medium'>
                    {copy.destination}
                  </Label>
                  <span className='text-muted-foreground text-[11px] font-medium tracking-wide uppercase'>
                    {copy.required}
                  </span>
                </div>
                <Input
                  id='destination'
                  type='url'
                  inputMode='url'
                  autoComplete='url'
                  placeholder='https://example.com/landing-page'
                  value={destination}
                  onChange={event => {
                    setDestination(event.target.value)
                    setCopied(false)
                  }}
                  onBlur={() => setTouched(true)}
                  aria-invalid={invalidUrl}
                  className='h-11 font-mono text-sm'
                />
                <p className={cn('text-muted-foreground text-xs leading-5', invalidUrl && 'text-destructive')}>
                  {invalidUrl ? copy.invalid : copy.destinationHint}
                </p>
              </div>

              <div className='grid gap-x-5 gap-y-6 sm:grid-cols-2'>
                {FIELD_ORDER.map((key, index) => {
                  const field = copy.fields[key]
                  const required = index < 3

                  return (
                    <div key={key} className='space-y-2'>
                      <div className='flex items-center justify-between gap-3'>
                        <Label htmlFor={`utm-${key}`}>{field.label}</Label>
                        <span className='text-muted-foreground text-[10px] font-medium tracking-wide uppercase'>
                          {required ? copy.required : copy.optional}
                        </span>
                      </div>
                      <Input
                        id={`utm-${key}`}
                        placeholder={field.placeholder}
                        value={fields[key]}
                        onChange={event => updateField(key, event.target.value)}
                        className='h-10'
                      />
                      <p className='text-muted-foreground text-xs'>{field.hint}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className='space-y-6 lg:sticky lg:top-22 lg:self-start'>
            <Card className='border-foreground/15 overflow-hidden py-0 shadow-sm'>
              <CardHeader className='bg-muted/45 border-b px-5 py-5'>
                <CardTitle className='text-base'>{copy.result}</CardTitle>
                <p className='text-muted-foreground text-xs leading-5'>
                  {generatedUrl && !accessGranted ? copy.access.ready : copy.resultHint}
                </p>
              </CardHeader>
              <CardContent className='space-y-4 p-5'>
                <div
                  className={cn(
                    'bg-muted/50 min-h-31 rounded-lg border p-4 font-mono text-sm leading-6 break-all',
                    !visibleGeneratedUrl &&
                      'text-muted-foreground flex items-center justify-center text-center font-sans'
                  )}
                >
                  {generatedUrl && !accessGranted ? (
                    <div className='flex max-w-64 flex-col items-center gap-2'>
                      <LockKeyholeIcon className='size-5' />
                      <span>{copy.access.ready}</span>
                    </div>
                  ) : (
                    visibleGeneratedUrl || copy.empty
                  )}
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Button className='h-10' disabled={!generatedUrl} onClick={handleCopy}>
                    {!accessGranted ? <LockKeyholeIcon /> : copied ? <CheckIcon /> : <ClipboardIcon />}{' '}
                    {!accessGranted ? copy.access.unlock : copied ? copy.copied : copy.copy}
                  </Button>
                  <Button
                    variant='outline'
                    className='h-10'
                    disabled={!visibleGeneratedUrl}
                    asChild={Boolean(visibleGeneratedUrl)}
                  >
                    {visibleGeneratedUrl ? (
                      <a href={visibleGeneratedUrl} target='_blank' rel='noreferrer'>
                        <ArrowUpRightIcon /> {copy.open}
                      </a>
                    ) : (
                      <span>
                        <ArrowUpRightIcon /> {copy.open}
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className='gap-4 py-5'>
              <CardHeader className='px-5'>
                <CardTitle className='text-sm'>{copy.tipsTitle}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3 px-5'>
                {copy.tips.map(tip => (
                  <div key={tip} className='flex items-start gap-2 text-sm'>
                    <CheckIcon className='mt-0.5 size-4 shrink-0' />
                    <span>{tip}</span>
                  </div>
                ))}
                <div className='text-muted-foreground mt-5 flex items-start gap-2 border-t pt-4 text-xs leading-5'>
                  <ShieldCheckIcon className='mt-0.5 size-4 shrink-0' />
                  <span>{copy.privacy}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <DialogPrimitive.Root
        open={!accessGranted && accessModalOpen}
        onOpenChange={open => {
          setAccessModalOpen(open)
          if (!open) setAccessError('')
        }}
      >
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
                  <DialogPrimitive.Title className='text-xl font-semibold'>{copy.access.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className='text-muted-foreground mt-1.5 text-sm leading-6'>
                    {copy.access.description}
                  </DialogPrimitive.Description>
                </div>
              </div>
              <DialogPrimitive.Close asChild>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon-sm'
                  className='absolute top-5 right-5'
                  aria-label={lang === 'zh' ? '关闭' : 'Close'}
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
                  <Label htmlFor='utm-access-company'>{copy.access.company}</Label>
                  <div className='relative'>
                    <Building2Icon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                    <Input
                      id='utm-access-company'
                      required
                      autoComplete='organization'
                      maxLength={120}
                      value={accessForm.companyName}
                      onChange={event => setAccessForm(current => ({ ...current, companyName: event.target.value }))}
                      placeholder={copy.access.companyPlaceholder}
                      className='h-11 pl-9'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='utm-access-website'>{copy.access.website}</Label>
                  <div className='relative'>
                    <Globe2Icon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                    <Input
                      id='utm-access-website'
                      type='text'
                      inputMode='url'
                      required
                      autoComplete='url'
                      value={accessForm.website}
                      onChange={event => setAccessForm(current => ({ ...current, website: event.target.value }))}
                      placeholder={copy.access.websitePlaceholder}
                      className='h-11 pl-9'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='utm-access-role'>{copy.access.role}</Label>
                <select
                  id='utm-access-role'
                  required
                  value={accessForm.role}
                  onChange={event => setAccessForm(current => ({ ...current, role: event.target.value }))}
                  className='border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-3'
                >
                  <option value='' disabled>
                    {copy.access.selectRole}
                  </option>
                  {ROLE_OPTIONS.map(role => (
                    <option key={role.value} value={role.value}>
                      {role[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='utm-access-email'>{copy.access.email}</Label>
                <div className='relative'>
                  <MailIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                  <Input
                    id='utm-access-email'
                    type='email'
                    inputMode='email'
                    required
                    autoComplete='email'
                    value={accessForm.email}
                    onChange={event => setAccessForm(current => ({ ...current, email: event.target.value }))}
                    placeholder={copy.access.emailPlaceholder}
                    className='h-11 pl-9'
                  />
                </div>
                <p className='text-muted-foreground text-xs leading-5'>{copy.access.emailHint}</p>
              </div>

              <div className='border-t pt-5'>
                <Button type='submit' className='h-11 w-full' disabled={accessSubmitting}>
                  {accessSubmitting ? <LoaderCircleIcon className='animate-spin' /> : <ShieldCheckIcon />}
                  {accessSubmitting ? copy.access.submitting : copy.access.submit}
                </Button>
                <p className='text-muted-foreground mt-3 text-center text-xs leading-5'>{copy.access.footer}</p>
              </div>
            </form>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  )
}

export default UtmBuilder
