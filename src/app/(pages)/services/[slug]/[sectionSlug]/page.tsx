import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import CTASection from '@/components/blocks/cta/cta'
import FAQ from '@/components/blocks/faq/faq'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import BookingLink from '@/components/analytics/booking-link'
import SectionSeparator from '@/components/section-separator'
import GeoServicePlaybook from '@/components/services/geo-service-playbook'
import { geoMethodologyPath } from '@/content/geo-methodology'
import { geoServicePlaybooks } from '@/content/geo-service-playbooks'
import {
  getServiceBySlug,
  getServiceSectionPage,
  resolveLocalizedText,
  servicePageCopy,
  serviceSectionParams,
  type ServiceLang
} from '@/content/services'
import {
  absoluteUrl,
  buildMetadata,
  createBreadcrumbSchema,
  createFAQSchema,
  createLocalizedAlternates,
  createWebPageSchema
} from '@/lib/seo'
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

const ServiceSectionDetailPage = async ({ params }: { params: Promise<{ slug: string; sectionSlug: string }> }) => {
  const { slug, sectionSlug } = await params
  const lang: ServiceLang = await getRequestLanguage()
  const copy = servicePageCopy[lang]
  const parentService = getServiceBySlug(slug)
  const service = getServiceSectionPage(slug, sectionSlug)

  if (!parentService || !service) {
    notFound()
  }

  const isSubService = Boolean(parentService.subServices?.some(item => item.slug === sectionSlug))
  const playbook = slug === 'geo-services' ? geoServicePlaybooks[sectionSlug] : undefined
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
      createBreadcrumbSchema(
        [
          { name: copy.home, path: '/' },
          { name: copy.services, path: '/services' },
          { name: resolveLocalizedText(parentService.title, lang), path: `/services/${slug}` },
          { name: resolveLocalizedText(service.title, lang), path: `/services/${slug}/${sectionSlug}` }
        ],
        lang
      ),
      {
        '@type': 'Service',
        name: resolveLocalizedText(service.title, lang),
        description: resolveLocalizedText(service.description, lang),
        serviceType: resolveLocalizedText(parentService.category, lang),
        url: absoluteUrl(path),
        areaServed: 'Global'
      },
      ...(hasFaqSection
        ? [
            createFAQSchema(
              (service.faqItems ?? []).map(item => ({
                question: resolveLocalizedText(item.question, lang),
                answer: resolveLocalizedText(item.answer, lang)
              }))
            )
          ]
        : [])
    ]
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
        <div className='bg-primary/12 absolute inset-x-0 top-0 h-72 blur-3xl' />
        <div className='bg-secondary/12 absolute top-24 right-0 size-64 rounded-full blur-3xl' />

        <div className='relative mx-auto flex w-full max-w-7xl justify-center'>
          <div className='flex max-w-4xl flex-col items-center gap-6 text-center'>
            {isSubService ? (
              <nav aria-label={lang === 'zh' ? '面包屑导航' : 'Breadcrumb'}>
                <ol className='text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-sm'>
                  <li>
                    <Link className='hover:text-foreground' href={toLocalizedHref('/services', lang)}>
                      {copy.services}
                    </Link>
                  </li>
                  <li aria-hidden='true'>/</li>
                  <li>
                    <Link className='hover:text-foreground' href={toLocalizedHref(`/services/${slug}`, lang)}>
                      {resolveLocalizedText(parentService.title, lang)}
                    </Link>
                  </li>
                  <li aria-hidden='true'>/</li>
                  <li aria-current='page' className='text-foreground'>
                    {resolveLocalizedText(service.title, lang)}
                  </li>
                </ol>
              </nav>
            ) : null}
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
              {resolveLocalizedText(service.title, lang)}
            </h1>
            {isSubService ? (
              <p className='text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg'>
                {resolveLocalizedText(service.description, lang)}
              </p>
            ) : null}
            <div className='flex flex-wrap justify-center gap-4'>
              <PrimaryFlowButton asChild>
                <BookingLink
                  ctaLocation='hero'
                  pageType='service_detail'
                  serviceType={sectionSlug}
                  language={lang}
                  target='_blank'
                  rel='noreferrer'
                >
                  {copy.bookCall}
                  <ArrowRightIcon />
                </BookingLink>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href={toLocalizedHref(isSubService ? `/services/${slug}` : '/services', lang)}>
                  {isSubService ? (lang === 'zh' ? '查看 GEO 服务总览' : 'GEO services overview') : copy.allServices}
                </Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      {isSubService ? (
        <nav aria-label={lang === 'zh' ? 'GEO 子服务' : 'GEO services'} className='px-4 pb-8 sm:px-6 lg:px-8'>
          <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-3'>
            {parentService.subServices?.map(item => (
              <Link
                key={item.slug}
                href={toLocalizedHref(`/services/${slug}/${item.slug}`, lang)}
                aria-current={item.slug === sectionSlug ? 'page' : undefined}
                className={cn(
                  'focus-visible:ring-ring rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                  item.slug === sectionSlug ? 'border-primary/30 bg-primary/10 text-primary' : 'hover:bg-muted'
                )}
              >
                {resolveLocalizedText(item.title, lang)}
              </Link>
            ))}
            {playbook ? (
              <Link
                href={toLocalizedHref(geoMethodologyPath, lang)}
                className='hover:bg-muted inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm font-medium'
              >
                {lang === 'zh' ? '我们的 GEO 方法' : 'Our GEO method'}
                <ArrowRightIcon className='size-4' />
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}

      {playbook ? (
        <nav aria-label={lang === 'zh' ? '本页目录' : 'On this page'} className='px-4 pb-8 sm:px-6 lg:px-8'>
          <div className='text-muted-foreground mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm'>
            <Link href='#delivery' className='hover:text-foreground'>
              {lang === 'zh' ? '执行流程' : 'Process'}
            </Link>
            <Link href='#deliverables' className='hover:text-foreground'>
              {lang === 'zh' ? '交付与验收' : 'Deliverables'}
            </Link>
            <Link href='#example' className='hover:text-foreground'>
              {lang === 'zh' ? '具体示例' : 'Example'}
            </Link>
            <Link href='#quality' className='hover:text-foreground'>
              {lang === 'zh' ? '质量标准' : 'Quality checks'}
            </Link>
            <Link href='#collaboration' className='hover:text-foreground'>
              {lang === 'zh' ? '协作准备' : 'Working together'}
            </Link>
          </div>
        </nav>
      ) : null}

      <SectionSeparator />

      <section id='scope' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
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
                {isSubService ? (
                  <p className='text-muted-foreground text-base leading-7'>
                    {resolveLocalizedText(service.intro, lang)}
                  </p>
                ) : null}
              </div>

              <div className={cn('grid gap-4 sm:grid-cols-2', isSubService ? 'lg:grid-cols-3' : 'xl:grid-cols-5')}>
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
          ) : null}
        </div>
      </section>

      <SectionSeparator />

      <section id='delivery' className='scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <div className='max-w-3xl space-y-3'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.delivery}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.serviceBreakdown}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              {service.deliveryDescription
                ? resolveLocalizedText(service.deliveryDescription, lang)
                : copy.whyThisServiceWorksDescription}
            </p>
          </div>

          {service.deliveryPresentation === 'table' ? (
            <div className='bg-card/85 overflow-hidden rounded-[28px] border backdrop-blur-sm'>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[860px] border-collapse'>
                  <thead>
                    <tr className='bg-background/80 text-left'>
                      <th className='text-muted-foreground px-6 py-4 text-xs font-medium tracking-[0.24em] uppercase'>
                        {copy.tableStep}
                      </th>
                      <th className='text-muted-foreground px-6 py-4 text-xs font-medium tracking-[0.24em] uppercase'>
                        {copy.tableWorkstream}
                      </th>
                      <th className='text-muted-foreground px-6 py-4 text-xs font-medium tracking-[0.24em] uppercase'>
                        {copy.tableFocus}
                      </th>
                      <th className='text-muted-foreground px-6 py-4 text-xs font-medium tracking-[0.24em] uppercase'>
                        {copy.tableDeliverables}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.sections.map((section, index) => (
                      <tr key={section.id} className='border-t align-top'>
                        <td className='text-muted-foreground px-6 py-5 text-sm font-medium'>
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className='px-6 py-5'>
                          <div id={section.id} className='scroll-mt-28'>
                            <p className='text-base font-semibold'>{resolveLocalizedText(section.title, lang)}</p>
                          </div>
                        </td>
                        <td className='text-muted-foreground px-6 py-5 text-sm leading-6'>
                          {resolveLocalizedText(section.description, lang)}
                        </td>
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
          ) : service.deliveryPresentation === 'cards' ? (
            <div className='grid gap-5 lg:grid-cols-2'>
              {service.sections.map((section, index) => (
                <Card key={section.id} id={section.id} className='bg-card/85 scroll-mt-28 border'>
                  <CardContent className='space-y-5 pt-6'>
                    <span className='text-primary text-sm font-medium'>
                      {copy.step} {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className='space-y-3'>
                      <h3 className='text-xl font-semibold tracking-tight sm:text-2xl'>
                        {resolveLocalizedText(section.title, lang)}
                      </h3>
                      <p className='text-muted-foreground text-sm leading-7'>
                        {resolveLocalizedText(section.description, lang)}
                      </p>
                    </div>
                    <ul className='space-y-3'>
                      {section.bullets.map(bullet => (
                        <li key={bullet.en} className='flex items-start gap-3 text-sm leading-7'>
                          <CheckCircle2Icon className='text-primary mt-1.5 size-4 shrink-0' />
                          <span>{resolveLocalizedText(bullet, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {playbook ? <GeoServicePlaybook playbook={playbook} lang={lang} /> : null}

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
            description={
              playbook
                ? lang === 'zh'
                  ? `关于${resolveLocalizedText(service.title, lang)}的范围、交付与协作方式。`
                  : `Scope, delivery, and collaboration questions about ${resolveLocalizedText(service.title, lang)}.`
                : copy.faqDescription
            }
          />
        </>
      ) : null}

      <CTASection
        title={copy.nextStepTitle}
        description={copy.nextStepDescription}
        buttonLabel={copy.bookStrategyCall}
        ctaLocation='section_footer'
        pageType='service_detail'
        serviceType={sectionSlug}
        language={lang}
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
