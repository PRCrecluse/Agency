'use client'

import { useEffect, useState } from 'react'

import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  CircleCheckBigIcon,
  ClipboardCheckIcon,
  Clock3Icon,
  FileTextIcon,
  Layers3Icon,
  LockKeyholeIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VideoIcon,
  WalletCardsIcon
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { courseStats, SEO_COURSE_PRICE_LABEL, seoCourseModules } from '@/content/seo-course'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type PendingOrder = {
  orderId: string
  clientToken: string
  provider: 'stripe'
}

type CheckoutResult = PendingOrder & {
  status: 'pending'
  redirectUrl?: string
  error?: string
}

const PAYMENT_SESSION_KEY = 'meridian-seo-course-payment'

const courseMetricCards: Array<{ value: number; label: string; Icon: LucideIcon }> = [
  { value: courseStats.lessons, label: '录播课', Icon: VideoIcon },
  { value: courseStats.updates, label: '知识更新', Icon: FileTextIcon },
  { value: courseStats.tasks, label: '实战 task', Icon: ClipboardCheckIcon }
]

const SeoCoursePage = ({ unlocked }: { unlocked: boolean }) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkout, setCheckout] = useState<CheckoutResult | null>(null)
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null)

  useEffect(() => {
    if (unlocked) return

    const paymentState = new URLSearchParams(window.location.search).get('payment')

    if (!['success', 'cancelled'].includes(paymentState ?? '')) return

    const restoreTimer = window.setTimeout(() => {
      if (paymentState === 'cancelled') {
        window.sessionStorage.removeItem(PAYMENT_SESSION_KEY)
        setError('支付已取消，没有产生扣款。你可以重新发起支付。')
        setCheckout(null)
        setPendingOrder(null)
        setSheetOpen(true)

        return
      }

      try {
        const stored = window.sessionStorage.getItem(PAYMENT_SESSION_KEY)

        if (!stored) {
          setError('未找到待确认的订单，如已付款请联系课程顾问。')
          setSheetOpen(true)

          return
        }

        const order = JSON.parse(stored) as PendingOrder

        setPendingOrder(order)
        setCheckout({ ...order, status: 'pending' })
        setSheetOpen(true)
      } catch {
        window.sessionStorage.removeItem(PAYMENT_SESSION_KEY)
      }
    }, 0)

    return () => window.clearTimeout(restoreTimer)
  }, [unlocked])

  useEffect(() => {
    if (!pendingOrder || unlocked) return

    let active = true
    let attempts = 0

    const checkStatus = async () => {
      attempts += 1

      try {
        const response = await fetch('/api/seo-course/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pendingOrder)
        })

        const result = (await response.json()) as { status?: string; error?: string }

        if (!active) return

        if (result.status === 'paid') {
          window.sessionStorage.removeItem(PAYMENT_SESSION_KEY)
          window.location.assign('/seo-course?payment=success')

          return
        }

        if (result.status === 'failed' || result.status === 'expired') {
          setError('订单已失效，请重新发起支付。')
          setPendingOrder(null)
          setCheckout(null)

          return
        }

        if (!response.ok && result.error) setError(result.error)
        if (attempts >= 100) setError('暂未确认到付款，页面会保留订单信息。')
      } catch {
        if (active && attempts >= 3) setError('正在等待支付结果，请不要关闭页面。')
      }
    }

    void checkStatus()

    const timer = window.setInterval(() => {
      if (attempts < 100) void checkStatus()
    }, 3000)

    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [pendingOrder, unlocked])

  const resetCheckout = () => {
    window.sessionStorage.removeItem(PAYMENT_SESSION_KEY)
    setCheckout(null)
    setPendingOrder(null)
    setError(null)
  }

  const startCheckout = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/seo-course/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const result = (await response.json()) as CheckoutResult

      if (!response.ok) throw new Error(result.error ?? '订单创建失败')

      const order = { orderId: result.orderId, clientToken: result.clientToken, provider: result.provider }

      window.sessionStorage.setItem(PAYMENT_SESSION_KEY, JSON.stringify(order))
      setCheckout(result)
      setPendingOrder(order)

      if (result.redirectUrl) window.location.assign(result.redirectUrl)
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : '订单创建失败，请稍后再试。')
    } finally {
      setSubmitting(false)
    }
  }

  const unlockButton = (
    <Button size='lg' className='h-12 rounded-xl px-6 text-base'>
      {unlocked ? '已解锁全部课程' : `解锁完整一期 · ${SEO_COURSE_PRICE_LABEL}`}
      {unlocked ? <CircleCheckBigIcon /> : <ArrowRightIcon />}
    </Button>
  )

  return (
    <>
      <section className='relative overflow-hidden border-b bg-[#0b0b0c] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.07)_1px,transparent_1px)] bg-size-[52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]' />
        <div className='absolute -top-40 right-0 size-96 rounded-full bg-cyan-400/12 blur-[120px]' />
        <div className='relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.72fr)] lg:items-end'>
          <div>
            <Badge className='border-white/15 bg-white/8 px-3 py-1 text-white' variant='outline'>
              <SparklesIcon /> Meridian SEO Academy
            </Badge>
            <h1 className='mt-7 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl'>
              从 SEO 基础，走到
              <span className='block text-white/48'>AI 搜索增长实战。</span>
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg'>
              12 节录播课系统学习，20 个知识点持续更新。从搜索意图到 GEO、AEO，再到能真正交付的 SEO task。
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              {unlocked ? (
                unlockButton
              ) : (
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>{unlockButton}</SheetTrigger>
                </Sheet>
              )}
              <Button
                variant='outline'
                size='lg'
                className='h-12 rounded-xl border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/12 hover:text-white'
                onClick={() => document.getElementById('course-catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                查看课程目录
              </Button>
            </div>
          </div>

          <div className='rounded-[1.75rem] border border-white/12 bg-white/7 p-5 backdrop-blur-sm sm:p-6'>
            <div className='flex items-center justify-between border-b border-white/10 pb-5'>
              <div>
                <p className='text-sm text-white/48'>完整一期</p>
                <p className='mt-1 text-4xl font-semibold'>{SEO_COURSE_PRICE_LABEL}</p>
              </div>
              <div className='flex size-12 items-center justify-center rounded-2xl bg-white text-black'>
                <BookOpenIcon className='size-5' />
              </div>
            </div>
            <div className='grid grid-cols-3 gap-3 py-5'>
              {courseMetricCards.map(({ value, label, Icon }) => (
                <div key={label} className='rounded-2xl border border-white/10 bg-black/18 p-3'>
                  <Icon className='mb-3 size-4 text-white/45' />
                  <p className='text-xl font-semibold'>{String(value).padStart(2, '0')}</p>
                  <p className='mt-1 text-xs leading-5 text-white/45'>{label}</p>
                </div>
              ))}
            </div>
            <div className='space-y-3 border-t border-white/10 pt-5 text-sm text-white/66'>
              {['一次解锁 12 节完整录播', '包含 20 期知识点更新', 'Stripe 收银台 · 支持微信支付'].map(item => (
                <div key={item} className='flex items-center gap-2.5'>
                  <CheckIcon className='size-4 text-white' />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='border-b px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3'>
          {seoCourseModules.map((module, index) => (
            <div key={module.id} className='bg-background p-5 sm:p-6'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>1/3 内容</span>
                <span className='text-muted-foreground font-mono text-xs'>{module.index} / 03</span>
              </div>
              <h2 className='mt-6 text-xl font-semibold'>{module.label}</h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {index === 0 && '建立基础方法与工具系统'}
                {index === 1 && '进入 GEO 与 AEO 的答案逻辑'}
                {index === 2 && '通过 task 完成进阶交付'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id='course-catalog' className='scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='max-w-3xl'>
            <Badge variant='outline' className='px-3 py-1'>
              <Layers3Icon /> 课程目录
            </Badge>
            <h2 className='mt-5 text-3xl font-semibold tracking-tight sm:text-5xl'>
              3 个阶段，刚好各占 1/3。
            </h2>
            <p className='text-muted-foreground mt-4 text-base leading-7 sm:text-lg'>
              先建立 SEO 底层理解，再进入 GEO 与 AEO，最后用真实任务完成进阶。
            </p>
          </div>

          <Tabs defaultValue={seoCourseModules[0].id} className='mt-10'>
            <TabsList className='h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl p-1 sm:w-fit' variant='default'>
              {seoCourseModules.map(module => (
                <TabsTrigger key={module.id} value={module.id} className='h-10 shrink-0 px-4'>
                  {module.index} · {module.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {seoCourseModules.map(module => (
              <TabsContent key={module.id} value={module.id} className='mt-6'>
                <div className={cn('overflow-hidden rounded-3xl border bg-linear-to-br', module.accent)}>
                  <div className='grid lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.72fr)]'>
                    <div className='p-5 sm:p-8'>
                      <p className='text-muted-foreground text-sm font-medium'>{module.index} / 03</p>
                      <h3 className='mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl'>{module.title}</h3>
                      <p className='text-muted-foreground mt-3 max-w-2xl text-base leading-7'>{module.description}</p>

                      <div className='mt-7 space-y-3'>
                        {module.lessons.map(lesson => (
                          <article key={lesson.number} className='bg-background/86 rounded-2xl border p-4 backdrop-blur-sm sm:p-5'>
                            <div className='flex gap-4'>
                              <div className='bg-foreground text-background flex size-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs'>
                                {String(lesson.number).padStart(2, '0')}
                              </div>
                              <div className='min-w-0 flex-1'>
                                <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                                  <h4 className='text-base font-semibold'>{lesson.title}</h4>
                                  <span className='text-muted-foreground flex shrink-0 items-center gap-1.5 text-xs'>
                                    <Clock3Icon className='size-3.5' /> {lesson.duration}
                                  </span>
                                </div>
                                <p className='text-muted-foreground mt-2 text-sm leading-6'>{lesson.summary}</p>
                                {lesson.task && (
                                  <div className='mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100'>
                                    <ClipboardCheckIcon className='mt-0.5 size-4 shrink-0' />
                                    <span>Task：{lesson.task}</span>
                                  </div>
                                )}
                              </div>
                              <div className='hidden size-9 shrink-0 items-center justify-center rounded-full border sm:flex'>
                                {unlocked ? <PlayIcon className='size-4' /> : <LockKeyholeIcon className='size-4' />}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                    <aside className='border-t bg-background/50 p-5 sm:p-8 lg:border-t-0 lg:border-l'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-foreground text-background flex size-10 items-center justify-center rounded-xl'>
                          <FileTextIcon className='size-4' />
                        </div>
                        <div>
                          <p className='font-semibold'>知识点更新</p>
                          <p className='text-muted-foreground text-sm'>{module.updates.length} 期实用资料</p>
                        </div>
                      </div>
                      <ol className='mt-6 space-y-1'>
                        {module.updates.map((update, index) => (
                          <li key={update} className='flex items-start gap-3 border-b py-3 last:border-0'>
                            <span className='text-muted-foreground mt-0.5 font-mono text-xs'>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className='text-sm leading-6'>{update}</span>
                            {!unlocked && <LockKeyholeIcon className='text-muted-foreground ml-auto mt-1 size-3.5 shrink-0' />}
                          </li>
                        ))}
                      </ol>
                    </aside>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className='border-t px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0b0b0c] p-6 text-white sm:p-10 lg:p-12'>
          <div className='grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end'>
            <div>
              <p className='text-sm font-medium tracking-[0.18em] text-white/45 uppercase'>Meridian SEO Academy</p>
              <h2 className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl'>
                用一套课，建立可以反复使用的搜索增长能力。
              </h2>
              <div className='mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/62'>
                {['12 节录播课', '20 期知识更新', '包含实战 task'].map(item => (
                  <span key={item} className='flex items-center gap-2'>
                    <CheckIcon className='size-4 text-white' /> {item}
                  </span>
                ))}
              </div>
            </div>
            {!unlocked && (
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button size='lg' className='h-12 rounded-xl bg-white px-6 text-base text-black hover:bg-white/88'>
                    立即解锁 · {SEO_COURSE_PRICE_LABEL}
                    <ArrowRightIcon />
                  </Button>
                </SheetTrigger>
              </Sheet>
            )}
          </div>
        </div>
      </section>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className='w-full overflow-y-auto sm:max-w-md'>
          <SheetHeader className='border-b px-6 py-5'>
            <SheetTitle className='text-xl font-semibold'>解锁 SEO 知识库·实战课</SheetTitle>
            <SheetDescription>12 节录播 + 20 期知识更新，完整一期一次付费解锁。</SheetDescription>
          </SheetHeader>

          <div className='px-6 py-5'>
            <div className='flex items-end justify-between rounded-2xl bg-muted p-4'>
              <div>
                <p className='text-muted-foreground text-sm'>应付金额</p>
                <p className='mt-1 text-3xl font-semibold'>{SEO_COURSE_PRICE_LABEL}</p>
              </div>
              <Badge variant='outline' className='bg-background'>完整一期</Badge>
            </div>

            {checkout && pendingOrder ? (
              <div className='py-10 text-center'>
                <div className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#635bff]/10 text-[#635bff]'>
                  <WalletCardsIcon className='size-6' />
                </div>
                <p className='mt-4 font-medium'>正在确认 Stripe 支付结果</p>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  付款确认成功后，页面会自动刷新并解锁全部课程。
                </p>
                <Button variant='ghost' className='mt-4' onClick={resetCheckout}>
                  重新下单
                </Button>
              </div>
            ) : (
              <div className='pt-6'>
                <label htmlFor='course-email' className='text-sm font-medium'>
                  接收课程权益的邮箱
                </label>
                <Input
                  id='course-email'
                  name='email'
                  type='email'
                  inputMode='email'
                  autoComplete='email'
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder='name@company.com'
                  className='mt-2 h-11'
                />

                <div className='mt-6'>
                  <p className='text-sm font-medium'>支付方式</p>
                  <div className='mt-2 rounded-xl border bg-muted/35 p-4'>
                    <div className='flex items-center gap-3'>
                      <span className='flex size-10 items-center justify-center rounded-xl bg-[#635bff] text-lg font-semibold text-white'>S</span>
                      <div>
                        <p className='font-medium'>Stripe 安全收银台</p>
                        <p className='text-muted-foreground mt-0.5 text-xs'>将根据你的设备和地区显示可用支付方式</p>
                      </div>
                    </div>
                    <div className='mt-4 flex flex-wrap gap-2'>
                      <Badge variant='outline' className='bg-background'>
                        <span className='mr-1 size-2 rounded-full bg-[#07c160]' />微信支付
                      </Badge>
                      <Badge variant='outline' className='bg-background'>银行卡</Badge>
                      <Badge variant='outline' className='bg-background'>更多已启用方式</Badge>
                    </div>
                  </div>
                </div>

                {error && (
                  <p role='alert' className='mt-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm leading-6 text-destructive'>
                    {error}
                  </p>
                )}

                <Button
                  size='lg'
                  className='mt-6 h-12 w-full rounded-xl text-base'
                  disabled={submitting}
                  onClick={startCheckout}
                >
                  {submitting ? '正在创建订单…' : `前往 Stripe 支付 ${SEO_COURSE_PRICE_LABEL}`}
                  {!submitting && <ArrowRightIcon />}
                </Button>

                <div className='text-muted-foreground mt-4 flex items-start gap-2 text-xs leading-5'>
                  <ShieldCheckIcon className='mt-0.5 size-4 shrink-0' />
                  <span>付款由 Stripe 托管收银台处理，本站不保存你的银行卡或微信支付账户信息。</span>
                </div>
              </div>
            )}

            {error && checkout && (
              <p role='alert' className='mt-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm leading-6 text-destructive'>
                {error}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SeoCoursePage
