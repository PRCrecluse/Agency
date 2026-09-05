import Link from 'next/link'

import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'

import SectionSeparator from '@/components/section-separator'
import { geoMethodologyPath } from '@/content/geo-methodology'
import type { GeoServicePlaybook as Playbook } from '@/content/geo-service-playbooks'
import { resolveLocalizedText, type ServiceLang } from '@/content/services'
import { toLocalizedHref } from '@/lib/language'

const GeoServicePlaybook = ({ playbook, lang }: { playbook: Playbook; lang: ServiceLang }) => {
  const text = (value: Parameters<typeof resolveLocalizedText>[0]) => resolveLocalizedText(value, lang)

  return (
    <>
      <SectionSeparator />
      <section id='deliverables' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-muted-foreground text-sm font-medium'>
              {lang === 'zh' ? '交付与验收' : 'Delivery and acceptance'}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {lang === 'zh' ? '你会拿到什么，如何确认交付完整' : 'What you receive and how we review it'}
            </h2>
            <p className='text-muted-foreground text-base leading-7'>{text(playbook.role)}</p>
          </div>
          <div className='divide-y rounded-2xl border'>
            {playbook.deliverables.map((item, index) => (
              <div key={item.title.en} className='grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.65fr_1.35fr_1fr] lg:gap-8'>
                <div className='space-y-3'>
                  <span className='text-muted-foreground text-xs tabular-nums'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className='text-lg font-semibold'>{text(item.title)}</h3>
                </div>
                <div className='space-y-2'>
                  <p className='text-xs font-medium'>{lang === 'zh' ? '具体包含' : 'What is inside'}</p>
                  <p className='text-muted-foreground text-sm leading-7'>{text(item.content)}</p>
                </div>
                <div className='bg-muted/40 space-y-2 rounded-xl p-4'>
                  <p className='text-xs font-medium'>{lang === 'zh' ? '验收标准' : 'Acceptance criteria'}</p>
                  <p className='text-muted-foreground text-sm leading-7'>{text(item.acceptance)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />
      <section id='example' className='bg-muted/20 scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='max-w-3xl space-y-4'>
            <p className='text-muted-foreground text-sm font-medium'>
              {lang === 'zh' ? '交付示例 · 非真实客户数据' : 'Illustrative example · not client data'}
            </p>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{text(playbook.example.title)}</h2>
            <p className='text-muted-foreground text-sm leading-7'>{text(playbook.example.note)}</p>
          </div>
          <dl className='bg-background divide-y rounded-2xl border px-5 sm:px-8'>
            {playbook.example.fields.map(field => (
              <div
                key={field.label.en}
                className='grid gap-3 py-5 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,2fr)] sm:gap-8'
              >
                <dt className='text-sm font-semibold'>{text(field.label)}</dt>
                <dd className='text-muted-foreground text-sm leading-7'>{text(field.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SectionSeparator />
      <section id='quality' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            {lang === 'zh' ? '我们逐项检查的质量标准' : 'The quality checks behind the delivery'}
          </h2>
          <ul className='grid gap-5 md:grid-cols-2'>
            {playbook.qualityChecks.map(item => (
              <li key={item.en} className='flex items-start gap-3 border-t pt-5 text-sm leading-7'>
                <CheckCircle2Icon className='mt-1.5 size-4 shrink-0' />
                <span>{text(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionSeparator />
      <section id='collaboration' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-2'>
          <div className='space-y-5'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              {lang === 'zh' ? '开始前需要准备什么' : 'What we need to get started'}
            </h2>
            <ul className='space-y-4'>
              {playbook.inputs.map(item => (
                <li key={item.en} className='text-muted-foreground border-l-2 pl-4 text-sm leading-7'>
                  {text(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-muted/40 space-y-5 rounded-2xl p-6 sm:p-8'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              {lang === 'zh' ? '交付之后，如何衔接下一步' : 'How the work moves into the next stage'}
            </h2>
            <p className='text-muted-foreground text-sm leading-7'>{text(playbook.handoff)}</p>
            <Link
              href={toLocalizedHref(geoMethodologyPath, lang)}
              className='inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4'
            >
              {lang === 'zh' ? '了解完整 GEO 方法' : 'Read our complete GEO method'}
              <ArrowRightIcon className='size-4' />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default GeoServicePlaybook
