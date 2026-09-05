import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'

import { geoMethodology, geoMethodologyPath } from '@/content/geo-methodology'
import { resolveLocalizedText, type ServiceLang } from '@/content/services'
import { toLocalizedHref } from '@/lib/language'

const GeoMethodologyOverview = ({ lang }: { lang: ServiceLang }) => (
  <section id='methodology' className='bg-muted/30 scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
    <div className='mx-auto max-w-7xl space-y-8'>
      <div className='max-w-3xl space-y-4'>
        <p className='text-muted-foreground text-sm font-medium'>
          {lang === 'zh' ? '我们的 GEO 方法' : 'Our GEO method'}
        </p>
        <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
          {lang === 'zh'
            ? '每一个问题，都对应内容、证据和下一步'
            : 'Connect every question to evidence, content, and a next step'}
        </h2>
        <p className='text-muted-foreground text-base leading-7'>{resolveLocalizedText(geoMethodology.thesis, lang)}</p>
      </div>
      <ol className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {geoMethodology.stages.map((stage, index) => (
          <li key={stage.id} className='border-border flex gap-4 border-t pt-5'>
            <span className='text-muted-foreground pt-1 text-sm tabular-nums'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className='space-y-2'>
              <h3 className='font-semibold'>{resolveLocalizedText(stage.title, lang)}</h3>
              <p className='text-muted-foreground text-sm leading-6'>{resolveLocalizedText(stage.summary, lang)}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={toLocalizedHref(geoMethodologyPath, lang)}
        className='focus-visible:ring-ring bg-background hover:bg-muted inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-medium focus-visible:ring-2'
      >
        {lang === 'zh' ? '查看完整 GEO 方法与执行示例' : 'Explore the method and execution example'}
        <ArrowRightIcon className='size-4' />
      </Link>
    </div>
  </section>
)

export default GeoMethodologyOverview
