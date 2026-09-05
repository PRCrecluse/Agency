import Link from 'next/link'

import { ArrowRightIcon, FileTextIcon, LineChartIcon, SearchIcon } from 'lucide-react'

import { resolveLocalizedText, type ServiceLang, type ServicePage } from '@/content/services'
import { toLocalizedHref } from '@/lib/language'

const icons = [SearchIcon, FileTextIcon, LineChartIcon]

const SubServiceCards = ({
  services,
  parentSlug,
  lang
}: {
  services: ServicePage[]
  parentSlug: string
  lang: ServiceLang
}) => (
  <div className='grid gap-5 md:grid-cols-3'>
    {services.map((service, index) => {
      const Icon = icons[index % icons.length]

      return (
        <Link
          key={service.slug}
          href={toLocalizedHref(`/services/${parentSlug}/${service.slug}`, lang)}
          className='group bg-card/80 hover:border-primary/50 focus-visible:ring-ring flex h-full flex-col gap-5 rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none'
        >
          <div className='flex items-center justify-between'>
            <span className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl'>
              <Icon className='size-5' />
            </span>
            <span className='text-muted-foreground text-xs tracking-widest'>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className='space-y-3'>
            <h3 className='text-2xl font-semibold tracking-tight'>{resolveLocalizedText(service.title, lang)}</h3>
            <p className='text-muted-foreground text-sm leading-7'>{resolveLocalizedText(service.description, lang)}</p>
          </div>
          <span className='text-primary mt-auto flex items-center gap-2 pt-2 text-sm font-medium'>
            {lang === 'zh' ? '查看服务详情' : 'Explore service'}
            <ArrowRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
          </span>
        </Link>
      )
    })}
  </div>
)

export default SubServiceCards
