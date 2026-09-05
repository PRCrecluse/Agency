import Link from 'next/link'
import type { Metadata } from 'next'

import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import BookingLink from '@/components/analytics/booking-link'
import SectionSeparator from '@/components/section-separator'
import { resolveLocalizedText, servicePageCopy, servicePages, type ServiceLang } from '@/content/services'
import { getLocalizedPath, toLocalizedHref } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { absoluteUrl, buildMetadata, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const path = getLocalizedPath('/services', lang)

  return buildMetadata({
    title: 'SEO, Reddit & GEO Services | Meridian',
    description: 'Explore Meridian services across technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native organic demand.',
    path,
    keywords: ['seo services', 'reddit marketing services', 'geo services', 'technical seo agency'],
    alternates: createLocalizedAlternates('/services', lang),
    language: lang
  })
}

const ServicesPage = async () => {
  const lang: ServiceLang = await getRequestLanguage()
  const copy = servicePageCopy[lang]
  const path = getLocalizedPath('/services', lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({
          path,
          title: 'SEO, Reddit & GEO Services | Meridian',
          description: 'Explore Meridian services across technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native organic demand.',
          language: lang
        }),
        '@type': 'CollectionPage'
      },
      {
        '@type': 'ItemList',
        itemListElement: servicePages.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: resolveLocalizedText(service.title, lang),
          url: absoluteUrl(getLocalizedPath(`/services/${service.slug}`, lang))
        }))
      }
    ]
  }

  return (
    <>
      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-3xl space-y-4'>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>{copy.servicesTitle}</h1>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              {copy.servicesDescription}
            </p>
          </div>

          <div className='flex flex-wrap gap-4'>
            <PrimaryFlowButton asChild>
              <BookingLink
                ctaLocation='hero'
                pageType='services_index'
                serviceType='growth_strategy'
                language={lang}
                target='_blank'
                rel='noreferrer'
              >
                {copy.bookCall}
                <ArrowRightIcon />
              </BookingLink>
            </PrimaryFlowButton>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3'>
          {servicePages.map(service => (
            <Card key={service.slug} className='border'>
              <CardHeader className='space-y-3'>
                <Badge variant='outline'>{resolveLocalizedText(service.category, lang)}</Badge>
                <CardTitle className='text-2xl'>{resolveLocalizedText(service.title, lang)}</CardTitle>
                <CardDescription className='text-sm leading-6'>{resolveLocalizedText(service.description, lang)}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm leading-6'>{resolveLocalizedText(service.intro, lang)}</p>
                <ul className='space-y-2'>
                  {service.subServices ? service.subServices.map(subService => (
                    <li key={subService.slug}>
                      <Link
                        href={toLocalizedHref(`/services/${service.slug}/${subService.slug}`, lang)}
                        className='hover:text-primary focus-visible:ring-ring flex items-center justify-between gap-3 rounded-sm py-1 text-sm font-medium leading-6 focus-visible:outline-none focus-visible:ring-2'
                      >
                        {resolveLocalizedText(subService.title, lang)}
                        <ArrowRightIcon className='size-4 shrink-0' />
                      </Link>
                    </li>
                  )) : service.sections.map(section => (
                    <li key={section.id} className='flex items-start gap-2 text-sm leading-6'>
                      <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' />
                      <span>{resolveLocalizedText(section.title, lang)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <PrimaryFlowButton asChild>
                  <Link href={toLocalizedHref(`/services/${service.slug}`, lang)}>
                    {copy.viewPage}
                    <ArrowRightIcon />
                  </Link>
                </PrimaryFlowButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default ServicesPage
