import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {
  ArrowRightIcon,
  CheckCircle2Icon,
  SparklesIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import CTASection from '@/components/blocks/cta/cta'
import FAQ from '@/components/blocks/faq/faq'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import {
  getServiceBySlug,
  getServiceSectionBySlug,
  getServiceSectionPage,
  resolveLocalizedText,
  servicePageCopy,
  serviceSectionParams,
  type ServiceLang
} from '@/content/services'
import { absoluteUrl, buildMetadata, createBreadcrumbSchema, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'
import { getLocalizedPath, toLocalizedHref } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return serviceSectionParams
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; sectionSlug: string }>
}): Promise<Metadata> {
  const { slug, sectionSlug } = await params
  const lang: ServiceLang = await getRequestLanguage()
  const service = getServiceSectionPage(slug, sectionSlug)

  if (!service) {
    return {}
  }

  const path = getLocalizedPath(`/services/${slug}/${sectionSlug}`, lang)

  return buildMetadata({
    title: `${resolveLocalizedText(service.title, lang)} | Meridian`,
    description: resolveLocalizedText(service.description, lang),
    keywords: [...service.keywords.map(keyword => keyword.en), ...service.keywords.map(keyword => keyword.zh)],
    path,
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

const ServiceSectionDetailPage = async ({
  params
}: {
  params: Promise<{ slug: string; sectionSlug: string }>
}) => {
  const { slug, sectionSlug } = await params
  const lang: ServiceLang = await getRequestLanguage()
  const copy = servicePageCopy[lang]
  const parentService = getServiceBySlug(slug)
  const currentSection = getServiceSectionBySlug(slug, sectionSlug)
  const service = getServiceSectionPage(slug, sectionSlug)

  if (!parentService || !currentSection || !service) {
    notFound()
  }

  const hasCustomIncludes = Boolean(service.serviceIncludes?.length)
  const hasFaqSection = Boolean(service.faqItems?.length)
  const path = getLocalizedPath(`/services/${slug}/${sectionSlug}`, lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({
          path,
          title: `${resolveLocalizedText(service.title, lang)} | Meridian`,
          description: resolveLocalizedText(service.description, lang),
          language: lang
        })
      },
      createBreadcrumbSchema([
        { name: copy.home, path: '/' },
        { name: copy.services, path: '/services' },
        { name: resolveLocalizedText(parentService.title, lang), path: `/services/${slug}` },
        { name: resolveLocalizedText(service.title, lang), path: `/services/${slug}/${sectionSlug}` }
      ], lang),
      {
        '@type': 'Service',
        name: resolveLocalizedText(service.title, lang),
        description: resolveLocalizedText(service.description, lang),
        serviceType: resolveLocalizedText(parentService.category, lang),
        url: absoluteUrl(path),
        areaServed: 'Global'
      }
    ]
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
        <div className='bg-primary/12 absolute inset-x-0 top-0 h-72 blur-3xl' />
        <div className='bg-secondary/12 absolute right-0 top-24 size-64 rounded-full blur-3xl' />

        <div className='mx-auto flex w-full max-w-7xl justify-center'>
          <div className='flex max-w-4xl flex-col items-center gap-6 text-center'>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
              {resolveLocalizedText(service.title, lang)}
            </h1>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  {copy.bookCall}
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href={toLocalizedHref('/services', lang)}>{copy.allServices}</Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div
          className={cn(
            'mx-auto w-full max-w-7xl gap-6',
            hasCustomIncludes ? 'flex flex-col' : 'grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
          )}
        >
          {hasCustomIncludes ? (
            <>
              <div className='mx-auto max-w-3xl space-y-4 text-center'>
                <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.whatThisServiceIncludes}</h2>
              </div>

              <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
                {service.serviceIncludes?.map((item, index) => (
                  <Card key={item.en} className='border bg-card/80'>
                    <CardContent className='flex h-full flex-col gap-5 pt-6'>
                      <div className='flex items-center justify-between'>
                        <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                          <SparklesIcon className='size-5' />
                        </div>
                        <span className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className='text-base font-medium leading-6'>{resolveLocalizedText(item, lang)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <div className='max-w-3xl space-y-3'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.delivery}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.serviceBreakdown}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              {service.deliveryDescription ? resolveLocalizedText(service.deliveryDescription, lang) : copy.whyThisServiceWorksDescription}
            </p>
          </div>

          {service.deliveryPresentation === 'table' ? (
            <div className='overflow-hidden rounded-[28px] border bg-card/85 backdrop-blur-sm'>
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
                    {service.sections.map((section, index) => (
                      <tr key={section.id} className='border-t align-top'>
                        <td className='px-6 py-5 text-sm font-medium text-muted-foreground'>{String(index + 1).padStart(2, '0')}</td>
                        <td className='px-6 py-5'>
                          <div id={section.id} className='scroll-mt-28 space-y-2'>
                            <p className='text-base font-semibold'>{resolveLocalizedText(section.title, lang)}</p>
                            <Badge variant='outline' className='h-auto px-3 py-1 text-xs font-normal'>
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
          ) : null}
        </div>
      </section>

      {hasFaqSection ? (
        <>
          <SectionSeparator />
          <FAQ
            faqItems={(service.faqItems ?? []).map(item => ({
              question: resolveLocalizedText(item.question, lang),
              answer: resolveLocalizedText(item.answer, lang)
            }))}
            eyebrow={copy.faqEyebrow}
            title={copy.faqTitle}
            description={copy.faqDescription}
          />
        </>
      ) : null}

      <CTASection
        title={copy.nextStepTitle}
        description={copy.nextStepDescription}
        buttonLabel={copy.bookStrategyCall}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default ServiceSectionDetailPage
