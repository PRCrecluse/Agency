'use client'

import { CheckCircle2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { resolveLocalizedText, type ServiceLang, type ServiceSection } from '@/content/services'
import type { servicePageCopy } from '@/content/services'
import { cn } from '@/lib/utils'

type DeliveryTableProps = {
  sections: ServiceSection[]
  lang: ServiceLang
  copy: (typeof servicePageCopy)[ServiceLang]
  compact?: boolean
}

const DeliveryTable = ({ sections, lang, copy, compact = false }: DeliveryTableProps) => (
  <div className={cn('overflow-hidden border bg-background/60', compact ? 'rounded-[18px]' : 'rounded-[24px]')}>
    <div className='overflow-x-auto'>
      <table className='w-full min-w-[860px] border-collapse'>
        <thead>
          <tr className='bg-background/80 text-left'>
            <th className='px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground'>{copy.tableStep}</th>
            <th className='px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground'>{copy.tableWorkstream}</th>
            <th className='px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground'>{copy.tableFocus}</th>
            <th className='px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground'>{copy.tableDeliverables}</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr key={section.id} className='border-t align-top'>
              <td className='px-6 py-5 text-sm font-medium text-muted-foreground'>{String(index + 1).padStart(2, '0')}</td>
              <td className='px-6 py-5'>
                <div id={section.id} className='scroll-mt-28 space-y-2'>
                  <p className='text-base font-semibold'>{resolveLocalizedText(section.title, lang)}</p>
                  <Badge variant='outline' className='h-auto rounded-md px-3 py-1 text-xs font-normal'>
                    {section.id}
                  </Badge>
                </div>
              </td>
              <td className='px-6 py-5 text-sm leading-6 text-muted-foreground'>{resolveLocalizedText(section.description, lang)}</td>
              <td className='px-6 py-5'>
                <ul className='space-y-3'>
                  {section.bullets.map(bullet => (
                    <li key={bullet.en} className='flex items-start gap-3 text-sm leading-6'>
                      <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                      <span>{resolveLocalizedText(bullet, lang)}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default DeliveryTable
