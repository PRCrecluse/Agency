'use client'

import { useMemo, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import DeliveryTable from '@/components/services/delivery-table'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { resolveLocalizedText, type ServiceLang, type ServicePackage } from '@/content/services'
import type { servicePageCopy } from '@/content/services'

type PackageSwitcherProps = {
  packages: ServicePackage[]
  lang: ServiceLang
  copy: (typeof servicePageCopy)[ServiceLang]
}

const PackageSwitcher = ({ packages, lang, copy }: PackageSwitcherProps) => {
  const [activePackageId, setActivePackageId] = useState(packages[0]?.id ?? '')
  const [open, setOpen] = useState(true)

  const activePackage = useMemo(
    () => packages.find(servicePackage => servicePackage.id === activePackageId) ?? packages[0],
    [activePackageId, packages]
  )

  if (!activePackage) {
    return null
  }

  return (
    <Tabs value={activePackage.id} onValueChange={setActivePackageId} className='gap-5'>
      <div className='flex justify-center'>
        <TabsList className='h-auto rounded-[14px] border bg-muted/70 p-1'>
          {packages.map(servicePackage => (
            <TabsTrigger
              key={servicePackage.id}
              value={servicePackage.id}
              className='min-w-[8.5rem] rounded-[10px] px-4 py-2.5 text-sm sm:min-w-[10rem] sm:px-6'
            >
              {resolveLocalizedText(servicePackage.title, lang)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <Collapsible open={open} onOpenChange={setOpen} className='overflow-hidden rounded-[18px] border bg-card/85 backdrop-blur-sm'>
        <div className='border-b bg-background/45 px-4 py-4 sm:px-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='space-y-2'>
              <Badge variant='outline' className='h-auto rounded-md px-3 py-1 text-xs font-normal'>
                {copy.package}
              </Badge>
              <h3 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                {resolveLocalizedText(activePackage.title, lang)}
              </h3>
              <p className='text-muted-foreground text-sm leading-6'>
                {lang === 'zh' ? '只展开当前选中的方案，页面会更短一些。' : 'Only the selected package is shown, so the page stays much shorter.'}
              </p>
            </div>

            <CollapsibleTrigger asChild>
              <button
                type='button'
                className='inline-flex items-center justify-center gap-2 self-start rounded-[10px] border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted sm:self-auto'
              >
                {open ? (lang === 'zh' ? '收起当前方案' : 'Collapse package') : lang === 'zh' ? '展开当前方案' : 'Expand package'}
                {open ? <ChevronUpIcon className='size-4' /> : <ChevronDownIcon className='size-4' />}
              </button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all duration-300'>
          <div className='space-y-6 p-4 sm:p-6'>
            <div className='space-y-3'>
              <p className='text-muted-foreground max-w-4xl text-sm leading-6 sm:text-base'>
                {resolveLocalizedText(activePackage.description, lang)}
              </p>
              {activePackage.deliveryNote ? (
                <p className='rounded-xl border bg-primary/5 px-4 py-3 text-sm leading-6'>
                  {resolveLocalizedText(activePackage.deliveryNote, lang)}
                </p>
              ) : null}
            </div>

            <DeliveryTable sections={activePackage.sections} lang={lang} copy={copy} compact />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Tabs>
  )
}

export default PackageSwitcher
