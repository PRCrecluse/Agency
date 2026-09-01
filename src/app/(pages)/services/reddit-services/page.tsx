import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  HeartHandshakeIcon,
  SparklesIcon,
  ShieldCheckIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FAQ from '@/components/blocks/faq/faq'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import CampaignPriceCalculator from '@/components/services/campaign-price-calculator'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import { logos } from '@/assets/data/trusted-brands'
import { redditServicesContent } from '@/content/reddit-services'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import { absoluteUrl, buildMetadata, createFAQSchema, createLocalizedAlternates, createWebPageSchema } from '@/lib/seo'

const path = '/services/reddit-services'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const copy = redditServicesContent[lang]
  const localizedPath = getLocalizedPath(path, lang)

  return buildMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    path: localizedPath,
    keywords: copy.metadata.keywords,
    alternates: createLocalizedAlternates(path, lang),
    language: lang
  })
}

const RedditServicesPage = async () => {
  const lang = await getRequestLanguage()
  const copy = redditServicesContent[lang]
  const localizedPath = getLocalizedPath(path, lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema({
        path: localizedPath,
        title: copy.metadata.title,
        description: copy.metadata.description,
        language: lang
      }),
      {
        '@type': 'Service',
        name: copy.hero.title,
        serviceType: 'Reddit Marketing',
        description: copy.metadata.description,
        areaServed: 'Global',
        url: absoluteUrl(localizedPath),
        provider: {
          '@type': 'Organization',
          name: 'Meridian'
        }
      },
      createFAQSchema(copy.faq.items)
    ]
  }

  return (
    <div lang={lang === 'zh' ? 'zh-CN' : 'en-US'}>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-14 -left-24 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-16 bottom-0 size-72 rounded-full blur-3xl' />

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.hero.badge}
            </Badge>
            <div className='max-w-4xl space-y-5'>
              <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
                {copy.hero.title}
              </h1>
              <p className='text-muted-foreground max-w-3xl text-lg leading-8 text-pretty'>{copy.hero.description}</p>
            </div>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  {copy.hero.primaryCta}
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='#service-guarantee'>{copy.hero.secondaryCta}</Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />
      <TrustedBrands brandLogos={logos} title={copy.trustedBrandsTitle} />
      <SectionSeparator />

      <section id='service-overview' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.overview.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.overview.title}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.overview.description}</p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {copy.servicePackages.map(servicePackage => (
              <Card key={servicePackage.name} className='bg-card/85 flex h-full flex-col border'>
                <CardHeader className='space-y-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <Badge variant='outline' className='h-auto px-3 py-1 text-xs font-medium'>
                      {servicePackage.level}
                    </Badge>
                    <span className='text-primary text-xl font-semibold'>{servicePackage.price}</span>
                  </div>
                  <div className='space-y-2'>
                    <CardTitle className='text-2xl'>{servicePackage.name}</CardTitle>
                    <CardDescription className='text-sm leading-6'>{servicePackage.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className='flex flex-1 flex-col gap-5'>
                  <ul className='space-y-3'>
                    {servicePackage.items.map(item => (
                      <li key={item} className='flex items-start gap-3 text-sm leading-6'>
                        <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className='text-muted-foreground bg-background/60 mt-auto rounded-xl border px-3 py-2 text-xs leading-5'>
                    {servicePackage.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section id='campaign-execution' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start'>
            <div className='space-y-5'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                {copy.campaign.eyebrow}
              </Badge>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.campaign.title}</h2>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.campaign.description}</p>
              <div className='grid gap-3'>
                <div className='bg-card/80 rounded-2xl border p-4'>
                  <p className='text-muted-foreground text-xs'>{copy.campaign.batchLabel}</p>
                  <p className='mt-1 text-lg font-semibold'>{copy.campaign.batchValue}</p>
                </div>
              </div>
            </div>

            <div className='grid gap-4'>
              {copy.campaign.steps.map(([title, description], index) => (
                <div key={title} className='bg-card/80 flex gap-4 rounded-2xl border p-5'>
                  <span className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className='space-y-1.5'>
                    <h3 className='font-semibold'>{title}</h3>
                    <p className='text-muted-foreground text-sm leading-6'>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CampaignPriceCalculator copy={copy.campaign.calculator} />
        </div>
      </section>

      <SectionSeparator />

      <section id='service-guarantee' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-4xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.guarantee.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.guarantee.title}</h2>
          </div>

          <Card className='bg-card/85 border'>
            <CardContent className='p-0'>
              <ul className='divide-border divide-y'>
                {copy.guarantee.items.map(item => (
                  <li key={item.title} className='flex gap-4 px-6 py-5 sm:px-7'>
                    <div className='bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl'>
                      <ShieldCheckIcon className='size-4' />
                    </div>
                    <div className='space-y-1.5'>
                      <h3 className='text-base font-semibold sm:text-lg'>{item.title}</h3>
                      <p className='text-muted-foreground text-sm leading-6 whitespace-pre-line sm:text-[15px]'>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section id='add-ons-and-payment' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.addOns.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.addOns.title}</h2>
            <p className='text-muted-foreground text-base leading-7'>{copy.addOns.description}</p>
            <div className='bg-card/80 rounded-2xl border p-5'>
              <div className='flex items-start gap-3'>
                <CircleDollarSignIcon className='text-primary mt-0.5 size-5 shrink-0' />
                <p className='text-sm leading-6'>{copy.addOns.paymentNote}</p>
              </div>
            </div>
          </div>
          <div className='grid gap-4'>
            {copy.addOns.items.map(addOn => (
              <Card key={addOn.title} className='bg-card/85 border'>
                <CardContent className='flex gap-4 p-5'>
                  <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl'>
                    <SparklesIcon className='size-4' />
                  </div>
                  <div className='space-y-1.5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h3 className='font-semibold'>{addOn.title}</h3>
                      <Badge variant='outline' className='h-auto px-2 py-0.5 text-xs'>
                        {addOn.price}
                      </Badge>
                    </div>
                    <p className='text-muted-foreground text-sm leading-6'>{addOn.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <FAQ
        faqItems={copy.faq.items}
        eyebrow={copy.faq.eyebrow}
        title={copy.faq.title}
        description=''
        visualVariant='compact'
      />

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <Card className='bg-card/85 mx-auto max-w-7xl overflow-hidden border'>
          <CardContent className='relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12'>
            <div className='bg-primary/10 absolute -top-20 -right-20 size-64 rounded-full blur-3xl' />
            <div className='relative max-w-2xl space-y-4'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                <HeartHandshakeIcon className='size-5' />
              </div>
              <h2 className='text-3xl font-semibold tracking-tight'>{copy.closing.title}</h2>
              <p className='text-muted-foreground text-base leading-7'>{copy.closing.description}</p>
            </div>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                {copy.closing.cta}
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
          </CardContent>
        </Card>
      </section>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  )
}

export default RedditServicesPage
