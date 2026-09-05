import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import SectionSeparator from '@/components/section-separator'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getRelatedServiceItems } from '@/content/service-navigation'
import { toLocalizedHref, type SiteLang } from '@/lib/language'

type ServiceLinksSectionProps = {
  currentPath: string
  lang: SiteLang
}

const ServiceLinksSection = ({ currentPath, lang }: ServiceLinksSectionProps) => {
  const related = getRelatedServiceItems(currentPath)

  if (!related || related.items.length === 0) return null

  const { family, isFamilyPage, items } = related

  const copy =
    lang === 'zh'
      ? {
          eyebrow: isFamilyPage ? '专门服务' : '相关服务',
          title: isFamilyPage ? `探索${family.title.zh}` : `继续探索${family.title.zh}`,
          description: isFamilyPage
            ? '选择与你当前搜索增长任务最匹配的专门服务。'
            : '查看同一服务体系中的其他专门能力，或返回父服务页了解完整方案。',
          viewAll: `查看全部${family.title.zh}`,
          learnMore: '了解详情'
        }
      : {
          eyebrow: isFamilyPage ? 'Specialized services' : 'Related services',
          title: isFamilyPage ? `Explore ${family.title.en}` : `Keep Exploring ${family.title.en}`,
          description: isFamilyPage
            ? 'Choose the specialized service that best matches your current search-growth priority.'
            : 'Explore adjacent capabilities in the same service family, or return to the parent page for the complete program.',
          viewAll: `View all ${family.title.en}`,
          learnMore: 'Learn more'
        }

  return (
    <>
      <SectionSeparator />
      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20' data-service-links>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-3xl space-y-3'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                {copy.eyebrow}
              </Badge>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.title}</h2>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.description}</p>
            </div>

            {!isFamilyPage ? (
              <Link
                href={toLocalizedHref(family.path, lang)}
                className='text-primary inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:underline'
                data-service-parent-link
              >
                {copy.viewAll}
                <ArrowRightIcon className='size-4' />
              </Link>
            ) : null}
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {items.map(item => (
              <Card
                key={item.path}
                className='bg-card/85 group h-full border transition-transform hover:-translate-y-1'
              >
                <CardHeader className='space-y-3'>
                  <CardTitle className='text-xl'>{item.title[lang]}</CardTitle>
                  <CardDescription className='text-sm leading-6'>{item.description[lang]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={toLocalizedHref(item.path, lang)}
                    className='text-primary inline-flex items-center gap-2 text-sm font-medium group-hover:underline'
                    data-service-link
                  >
                    {copy.learnMore}
                    <ArrowRightIcon className='size-4' />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceLinksSection
