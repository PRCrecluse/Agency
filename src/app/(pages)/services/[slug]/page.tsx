import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'
import { getServiceBySlug, serviceSlugs } from '@/content/services'
import { cn } from '@/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {}
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `${baseUrl}/services/${service.slug}`
    }
  }
}

export const dynamicParams = false

const ServiceDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const totalBulletCount = service.sections.reduce((count, section) => count + section.bullets.length, 0)
  const statItems = [
    {
      label: 'Workstreams',
      value: String(service.sections.length).padStart(2, '0')
    },
    {
      label: 'Deliverables',
      value: String(totalBulletCount).padStart(2, '0')
    },
    {
      label: 'Outcome targets',
      value: String(service.outcomes.length).padStart(2, '0')
    }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/services/${service.slug}#webpage`,
        name: service.title,
        description: service.description,
        url: `${baseUrl}/services/${service.slug}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${baseUrl}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${baseUrl}/services`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `${baseUrl}/services/${service.slug}`
          }
        ]
      },
      {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.category,
        url: `${baseUrl}/services/${service.slug}`,
        areaServed: 'Global'
      }
    ]
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
        <div className='bg-primary/12 absolute inset-x-0 top-0 h-72 blur-3xl' />
        <div className='bg-secondary/12 absolute right-0 top-24 size-64 rounded-full blur-3xl' />

        <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/services'>Services</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start'>
            <div className='relative overflow-hidden rounded-[28px] border bg-card/80 p-6 backdrop-blur-sm sm:p-8 lg:p-10'>
              <div className='from-primary/15 via-primary/5 absolute inset-0 bg-gradient-to-br to-transparent' />
              <div className='relative space-y-8'>
                <div className='space-y-5'>
                  <Badge variant='outline' className='bg-background/70 h-auto px-3 py-1 text-sm font-normal backdrop-blur-sm'>
                    {service.category}
                  </Badge>

                  <div className='space-y-4'>
                    <h1 className='max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>{service.title}</h1>
                    <p className='text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg'>{service.description}</p>
                    <p className='max-w-3xl text-base leading-7 sm:text-lg'>{service.intro}</p>
                  </div>
                </div>

                <div className='flex flex-wrap gap-2.5'>
                  {service.keywords.map(keyword => (
                    <Badge
                      key={keyword}
                      variant='outline'
                      className='bg-background/65 h-auto rounded-full px-3 py-1 text-xs font-normal backdrop-blur-sm'
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <div className='grid gap-3 sm:grid-cols-3'>
                  {statItems.map(item => (
                    <div
                      key={item.label}
                      className='rounded-2xl border bg-background/70 p-4 backdrop-blur-sm'
                    >
                      <p className='text-muted-foreground text-xs uppercase tracking-[0.24em]'>{item.label}</p>
                      <p className='mt-3 text-3xl font-semibold tracking-tight'>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className='flex flex-wrap gap-4'>
                  <PrimaryFlowButton asChild>
                    <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                      Book a call
                      <ArrowRightIcon />
                    </Link>
                  </PrimaryFlowButton>
                  <SecondaryFlowButton asChild>
                    <Link href='/services'>All services</Link>
                  </SecondaryFlowButton>
                </div>
              </div>
            </div>

            <Card className='border bg-card/85 gap-5 backdrop-blur-sm lg:sticky lg:top-24'>
              <CardHeader>
                <CardTitle>Program snapshot</CardTitle>
                <CardDescription>Jump into the exact workstream you want to review first.</CardDescription>
              </CardHeader>

              <CardContent className='space-y-6'>
                <div className='grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
                  {service.highlights.map(highlight => (
                    <div key={highlight} className='rounded-2xl border bg-background/65 p-4'>
                      <div className='flex items-start gap-3'>
                        <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' />
                        <p className='text-sm leading-6'>{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='space-y-3'>
                  <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>On this page</p>
                  <ul className='space-y-2.5'>
                    {service.sections.map((section, index) => {
                      const SectionIcon = getSectionIcon(section.id)

                      return (
                        <li key={section.id}>
                          <Link
                            href={`#${section.id}`}
                            className='hover:border-primary/40 hover:bg-primary/5 flex items-center gap-3 rounded-2xl border bg-background/65 px-4 py-3 transition-colors duration-200'
                          >
                            <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl'>
                              <SectionIcon className='size-4' />
                            </div>
                            <div className='min-w-0 flex-1'>
                              <p className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>Step {index + 1}</p>
                              <p className='truncate text-sm font-medium'>{section.title}</p>
                            </div>
                            <ChevronRightIcon className='text-muted-foreground size-4 shrink-0' />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
          <div className='space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Why this service works
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Built to feel like a real program, not a list of tactics</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              We package the delivery into clear workstreams so teams can see what gets prioritized first, how execution moves,
              and which outcomes the engagement is meant to unlock.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            {service.highlights.map((highlight, index) => (
              <Card key={highlight} className='border bg-card/80'>
                <CardContent className='flex h-full flex-col gap-6 pt-6'>
                  <div className='flex items-center justify-between'>
                    <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                      <SparklesIcon className='size-5' />
                    </div>
                    <span className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>
                      0{index + 1}
                    </span>
                  </div>
                  <p className='text-sm leading-6'>{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <div className='max-w-3xl space-y-3'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Delivery
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Service breakdown</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              Each block below shows how we scope the work, where we focus first, and what gets improved along the way.
            </p>
          </div>

          <div className='grid gap-6'>
            {service.sections.map((section, index) => {
              const SectionIcon = getSectionIcon(section.id)

              return (
                <Card
                  key={section.id}
                  id={section.id}
                  className={cn(
                    'scroll-mt-28 border bg-card/85 backdrop-blur-sm',
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
                            Step {index + 1} · {section.id}
                          </Badge>
                          <div className='space-y-2'>
                            <CardTitle className='text-2xl sm:text-[1.75rem]'>{section.title}</CardTitle>
                            <CardDescription className='max-w-3xl text-sm leading-6 sm:text-base'>{section.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className='grid gap-3 md:grid-cols-3'>
                    {section.bullets.map(bullet => (
                      <div
                        key={bullet}
                        className='bg-background/75 flex min-h-32 items-start gap-3 rounded-2xl border p-4'
                      >
                        <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' />
                        <p className='text-sm leading-6'>{bullet}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <div className='max-w-3xl space-y-3'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Outcomes
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>What clients should expect</h2>
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {service.outcomes.map((outcome, index) => (
              <Card key={outcome} className='border bg-card/80'>
                <CardContent className='flex h-full flex-col gap-5 pt-6'>
                  <div className='flex items-center justify-between'>
                    <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                      <TargetIcon className='size-5' />
                    </div>
                    <span className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>
                      0{index + 1}
                    </span>
                  </div>
                  <p className='text-sm leading-6'>{outcome}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='from-primary/10 via-background to-secondary/10 rounded-[28px] border bg-gradient-to-r p-6 sm:p-8'>
            <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
              <div className='max-w-2xl space-y-2'>
                <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>Next step</p>
                <h3 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Want the same structure tailored to your acquisition goals?</h3>
                <p className='text-muted-foreground text-sm leading-6 sm:text-base'>
                  We can map the priority channels, recommend the first workstream, and show how the engagement would be scoped around your growth motion.
                </p>
              </div>

              <PrimaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  Book a strategy call
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
            </div>
          </div>
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

export default ServiceDetailPage
