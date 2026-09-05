import { Fragment } from 'react'

import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { getServiceBreadcrumbItems } from '@/content/service-navigation'
import { toLocalizedHref, type SiteLang } from '@/lib/language'
import { cn } from '@/lib/utils'

type ServiceBreadcrumbsProps = {
  path: string
  lang: SiteLang
  className?: string
}

const ServiceBreadcrumbs = ({ path, lang, className }: ServiceBreadcrumbsProps) => {
  const items = getServiceBreadcrumbItems(path, lang)

  if (items.length < 2) return null

  return (
    <Breadcrumb className={cn('w-full text-left', className)} data-service-breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1

          return (
            <Fragment key={item.path}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={toLocalizedHref(item.path, lang)}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default ServiceBreadcrumbs
