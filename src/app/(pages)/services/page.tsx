import Link from 'next/link'
import type { Metadata } from 'next'

import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import { servicePages } from '@/content/services'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Meridian service pages for SEO services, Reddit services, and GEO strategy.',
  keywords: ['services', 'seo services', 'reddit services', 'geo services', 'meridian'],
  alternates: {
    canonical: `${baseUrl}/services`
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/services#webpage`,
      name: 'Services',
      description: 'Explore Meridian service pages for SEO services, Reddit services, and GEO strategy.',
      url: `${baseUrl}/services`
    },
    {
      '@type': 'ItemList',
      itemListElement: servicePages.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `${baseUrl}/services/${service.slug}`
      }))
    }
  ]
}

const ServicesPage = () => {
  return (
    <>
      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline'>Services</Badge>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>Growth services built around how buyers discover you</h1>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              Choose the lane that matters most right now: search visibility on your site, trust and demand from Reddit,
              or discoverability inside AI-generated answers.
            </p>
          </div>

          <div className='flex flex-wrap gap-4'>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                Book a call
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
            <SecondaryFlowButton asChild>
              <Link href='/blog'>Read the blog</Link>
            </SecondaryFlowButton>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3'>
          {servicePages.map(service => (
            <Card key={service.slug} className='border'>
              <CardHeader className='space-y-3'>
                <Badge variant='outline'>{service.category}</Badge>
                <CardTitle className='text-2xl'>{service.title}</CardTitle>
                <CardDescription className='text-sm leading-6'>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm leading-6'>{service.intro}</p>
                <ul className='space-y-2'>
                  {service.sections.map(section => (
                    <li key={section.id} className='flex items-start gap-2 text-sm leading-6'>
                      <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' />
                      <span>{section.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <PrimaryFlowButton asChild>
                  <Link href={`/services/${service.slug}`}>
                    View page
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
