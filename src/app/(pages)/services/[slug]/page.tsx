import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {
  ArrowRightIcon,
  CheckCircle2Icon,
  LayoutGridIcon,
  LineChartIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  WrenchIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FAQ from '@/components/blocks/faq/faq'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import DeliveryTable from '@/components/services/delivery-table'
import PackageSwitcher from '@/components/services/package-switcher'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import BookingLink from '@/components/analytics/booking-link'
import SectionSeparator from '@/components/section-separator'
import { logos } from '@/assets/data/trusted-brands'
import { getServiceBySlug, resolveLocalizedText, servicePageCopy, serviceSlugs, type ServiceLang } from '@/content/services'
import { absoluteUrl, buildMetadata, createBreadcrumbSchema, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'
import { getLocalizedPath, toLocalizedHref } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { cn } from '@/lib/utils'

const trustedBrandServiceSlugs = new Set(['seo-services', 'geo-services'])

const getTrustedBrandsTitle = (lang: ServiceLang) =>
  lang === 'zh'
    ? '服务过从初创公司到行业头部企业的团队。'
    : 'Trusted by startups, enterprises, and category leaders alike.'

const getSectionIcon = (sectionId: string) => {
  const key = sectionId.toLowerCase()

  if (key.includes('community')) {
    return MessageSquareIcon
  }

  if (key.includes('campaign')) {
    return MegaphoneIcon
  }

  if (key.includes('measure') || key.includes('report') || key.includes('iteration')) {
    return LineChartIcon
  }

  if (key.includes('technical')) {
    return WrenchIcon
  }

  if (key.includes('programmatic') || key.includes('system')) {
    return LayoutGridIcon
  }

  if (key.includes('generative') || key.includes('citation')) {
    return SparklesIcon
  }

  if (key.includes('topic')) {
    return TargetIcon
  }

  return SearchIcon
}

export async function generateStaticParams() {
  return serviceSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lang: ServiceLang = await getRequestLanguage()
  const service = getServiceBySlug(slug)

  if (!service) {
    return {}
  }

  const path = getLocalizedPath(`/services/${service.slug}`, lang)

  return buildMetadata({
    title: `${resolveLocalizedText(service.title, lang)} | Meridian`,
    description: resolveLocalizedText(service.description, lang),
    keywords: [...service.keywords.map(keyword => keyword.en), ...service.keywords.map(keyword => keyword.zh)],
    path,
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

export const dynamicParams = false

const ServiceDetailPage = async ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const lang: ServiceLang = await getRequestLanguage()
  const copy = servicePageCopy[lang]
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const hasPackages = Boolean(service.packages?.length)

  const displaySections = hasPackages
    ? (service.packages?.flatMap(servicePackage => servicePackage.sections) ?? [])
    : service.sections

  const hasCustomIncludes = Boolean(service.serviceIncludes?.length)
  const hasHighlights = service.highlights.length > 0
  const hasFaqSection = Boolean(service.faqItems?.length)
  const renderOutcomes = !service.hideOutcomes
  const showTrustedBrandsSection = trustedBrandServiceSlugs.has(service.slug)
  const showOverviewSection = hasCustomIncludes || hasHighlights
  const path = getLocalizedPath(`/services/${service.slug}`, lang)

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
        { name: resolveLocalizedText(service.title, lang), path: `/services/${service.slug}` }
      ], lang),
      {
        '@type': 'Service',
        name: resolveLocalizedText(service.title, lang),
        description: resolveLocalizedText(service.description, lang),
        serviceType: resolveLocalizedText(service.category, lang),
        url: absoluteUrl(path),
        areaServed: 'Global'
      }
    ]
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
        <div className='bg-primary/12 absolute inset-x-0 top-0 h-72 blur-3xl' />
        <div className='bg-secondary/12 absolute top-24 right-0 size-64 rounded-full blur-3xl' />

        <div className='mx-auto flex w-full max-w-7xl justify-center'>
          <div className='flex max-w-4xl flex-col items-center gap-6 text-center'>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
              {resolveLocalizedText(service.title, lang)}
            </h1>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <BookingLink
                  ctaLocation='hero'
                  pageType='service_page'
                  serviceType={service.slug.replace(/-services$/, '')}
                  language={lang}
                  target='_blank'
                  rel='noreferrer'
                >
                  {copy.bookCall}
                  <ArrowRightIcon />
                </BookingLink>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href={toLocalizedHref('/services', lang)}>{copy.allServices}</Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      {showTrustedBrandsSection || showOverviewSection ? (
        <>
          <SectionSeparator />

          {showTrustedBrandsSection ? <TrustedBrands brandLogos={logos} title={getTrustedBrandsTitle(lang)} /> : null}

          {showTrustedBrandsSection && showOverviewSection ? <SectionSeparator /> : null}

          {showOverviewSection ? (
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
                      <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                        {copy.whatThisServiceIncludes}
                      </h2>
                    </div>

                    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
                      {service.serviceIncludes?.map((item, index) => (
                        <Card key={item.en} className='bg-card/80 border'>
                          <CardContent className='flex h-full flex-col gap-5 pt-6'>
                            <div className='flex items-center justify-between'>
                              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                                <SparklesIcon className='size-5' />
                              </div>
                              <span className='text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase'>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <p className='text-base leading-6 font-medium'>{resolveLocalizedText(item, lang)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='space-y-4'>
                      <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                        {copy.whyThisServiceWorks}
                      </Badge>
                      <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                        {copy.whyThisServiceWorksTitle}
                      </h2>
                      <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
                        {copy.whyThisServiceWorksDescription}
                      </p>
                    </div>

                    {hasHighlights ? (
                      <div className='grid gap-4 md:grid-cols-3'>
                        {service.highlights.map((highlight, index) => (
                          <Card key={highlight.en} className='bg-card/80 border'>
                            <CardContent className='flex h-full flex-col gap-6 pt-6'>
                              <div className='flex items-center justify-between'>
                                <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                                  <SparklesIcon className='size-5' />
                                </div>
                                <span className='text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase'>
                                  0{index + 1}
                                </span>
                              </div>
                              <p className='text-sm leading-6'>{resolveLocalizedText(highlight, lang)}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </section>
          ) : null}

          <SectionSeparator />
        </>
      ) : null}

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <div className='max-w-3xl space-y-3'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.delivery}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              {hasPackages ? copy.deliveryPackages : copy.serviceBreakdown}
            </h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              {service.deliveryDescription
                ? resolveLocalizedText(service.deliveryDescription, lang)
                : copy.whyThisServiceWorksDescription}
            </p>
          </div>

          {hasPackages ? (
            <PackageSwitcher packages={service.packages ?? []} lang={lang} copy={copy} />
          ) : service.deliveryPresentation === 'table' ? (
            <div className='bg-card/85 overflow-hidden rounded-[28px] border backdrop-blur-sm'>
              <DeliveryTable sections={displaySections} lang={lang} copy={copy} />
            </div>
          ) : (
            <div className='grid gap-6'>
              {displaySections.map((section, index) => {
                const SectionIcon = getSectionIcon(section.id)

                return (
                  <Card
                    key={section.id}
                    id={section.id}
                    className={cn(
                      'bg-card/85 scroll-mt-28 border backdrop-blur-sm',
                      index % 2 === 0 ? 'lg:mr-10' : 'lg:ml-10'
                    )}
                  >
                    <CardHeader className='space-y-4'>
                      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                        <div className='flex items-start gap-4'>
                          <div className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl'>
                            <SectionIcon className='size-5' />
                          </div>
                          <div className='space-y-3'>
                            <Badge variant='outline' className='h-auto px-3 py-1 text-xs font-normal'>
                              {copy.step} {index + 1} · {section.id}
                            </Badge>
                            <div className='space-y-2'>
                              <CardTitle className='text-2xl sm:text-[1.75rem]'>
                                {resolveLocalizedText(section.title, lang)}
                              </CardTitle>
                              <CardDescription className='max-w-3xl text-sm leading-6 sm:text-base'>
                                {resolveLocalizedText(section.description, lang)}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className='grid gap-3 md:grid-cols-3'>
                      {section.bullets.map(bullet => (
                        <div
                          key={bullet.en}
                          className='bg-background/75 flex min-h-32 items-start gap-3 rounded-2xl border p-4'
                        >
                          <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' />
                          <p className='text-sm leading-6'>{resolveLocalizedText(bullet, lang)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {renderOutcomes ? (
        <>
          <SectionSeparator />

          <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
            <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
              <div className='max-w-3xl space-y-3'>
                <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                  {copy.outcomes}
                </Badge>
                <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.whatClientsShouldExpect}</h2>
              </div>

              <div className='grid gap-6 lg:grid-cols-3'>
                {service.outcomes.map((outcome, index) => (
                  <Card key={outcome.en} className='bg-card/80 border'>
                    <CardContent className='flex h-full flex-col gap-5 pt-6'>
                      <div className='flex items-center justify-between'>
                        <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                          <TargetIcon className='size-5' />
                        </div>
                        <span className='text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase'>
                          0{index + 1}
                        </span>
                      </div>
                      <p className='text-sm leading-6'>{resolveLocalizedText(outcome, lang)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className='from-primary/10 via-background to-secondary/10 rounded-[28px] border bg-gradient-to-r p-6 sm:p-8'>
                <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
                  <div className='max-w-2xl space-y-2'>
                    <p className='text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase'>
                      {copy.nextStep}
                    </p>
                    <h3 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{copy.nextStepTitle}</h3>
                    <p className='text-muted-foreground text-sm leading-6 sm:text-base'>{copy.nextStepDescription}</p>
                  </div>

                  <PrimaryFlowButton asChild>
                    <BookingLink
                      ctaLocation='outcomes_next_step'
                      pageType='service_page'
                      serviceType={service.slug.replace(/-services$/, '')}
                      language={lang}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {copy.bookStrategyCall}
                      <ArrowRightIcon />
                    </BookingLink>
                  </PrimaryFlowButton>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

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

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default ServiceDetailPage
