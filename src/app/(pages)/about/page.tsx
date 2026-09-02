import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  HeartHandshakeIcon,
  SparklesIcon,
  UsersRoundIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import BookingLink from '@/components/analytics/booking-link'
import SectionSeparator from '@/components/section-separator'
import { absoluteUrl, buildMetadata, createOrganizationSchema, createWebPageSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Meridian | AI-Native Growth Team',
  description: 'Meet the founder, specialists, and builder story behind Meridian, GoGlobal.to, and the team’s AI-native growth practice.',
  path: '/about',
  keywords: ['about meridian', 'ai growth team', 'seo agency founder', 'reddit growth team']
})

const founderHighlights = [
  'Founded and shipped 8 products independently',
  'Driven 1M+ impressions across X/Twitter and Xiaohongshu',
  'Customers include teams from Alibaba and a16z-backed companies',
  'Creator of GoGlobal.to — an AI Reddit growth agent',
  'Built an active builder-community voice with 4,672 Xiaohongshu likes and saves'
]

const stories = [
  {
    date: 'August 24, 2026',
    eyebrow: 'Growth interview · LinkLoud',
    title: 'Yiwei recorded a growth interview with LinkLoud co-founder Galen Gao',
    quote:
      '“Their first sit-down turned into a relaxed series of conversations about growth, building, and helping founders go global.”',
    image: '/images/about/stories/yiwei-linkloud-gaoning-interview.jpg',
    alt: 'Yiwei recording a growth interview with LinkLoud co-founder Galen Gao',
    label: 'Founder conversations',
    href: '/about/stories/yiwei-linkloud-gaoning-growth-interview'
  },
  {
    date: 'July 5, 2026',
    eyebrow: 'Founder, Volumn.ai',
    title: 'Yiwei joined SparkLab Accelerator and lived alongside fellow founders',
    quote:
      '“Yiwei joined SparkLab Accelerator, lived with other founders, and marked a memorable birthday there.”',
    image: '/images/about/sparklab-birthday.jpg',
    alt: 'Yiwei celebrating a birthday at SparkLab',
    label: 'Building in public',
    href: '/about/stories/yiwei-sparklab-birthday'
  }
]

const specialists = [
  {
    name: 'Max',
    role: 'AI Growth Operator',
    tagline: 'Former Marswave CMO & AI media operator',
    image: '/images/about/max.jpg',
    alt: 'Max, AI growth operator',
    xUrl: 'https://x.com/MaxForAI',
    bio: 'After leaving a U.S. graduate program to build, Max served as CMO at Marswave and helped grow it from $0 to $3M ARR. His experience spans USD fund research, talent leadership for a well-known model team, AI media operations, and product roles for several million-user products.',
    highlights: [
      'Former Marswave CMO; helped drive growth from $0 to $3M ARR',
      'Brings fund research, AI-media, model-team talent, and product experience',
      'Runs Max for AI on Xiaohongshu: 40K followers and a 10M-view post'
    ]
  },
  {
    name: 'Huiling',
    role: 'Growth Marketing Specialist',
    tagline: 'A founder-minded growth marketer with a hacker edge',
    image: '/images/about/huiling.jpg',
    alt: 'Huiling, growth marketing specialist',
    bio: 'Huiling applies founder thinking and a hacker edge to growth. She works across the full AI product journey—from early user research and cold-start acquisition to scaling through high-quality KOL and KOC ecosystems—across AI companions, SaaS, and AI hardware.',
    highlights: [
      'Took an AI product to $1M ARR in four months',
      'Covers early research, acquisition, and scaled growth end to end',
      'Deep experience in SEO, paid acquisition, and KOL/KOC partnerships'
    ]
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...createWebPageSchema({
        path: '/about',
        title: 'About Meridian | AI-Native Growth Team',
        description:
          'Meet the founder, specialists, and builder story behind Meridian, GoGlobal.to, and the team’s AI-native growth practice.'
      }),
      '@type': 'AboutPage'
    },
    createOrganizationSchema(),
    {
      '@type': 'Person',
      '@id': absoluteUrl('/about#yiwei'),
      name: 'Yiwei',
      alternateName: '怡玮',
      jobTitle: 'Founder & CEO',
      worksFor: {
        '@id': absoluteUrl('/#organization')
      },
      sameAs: [
        'https://x.com/PRCrecluse674',
        'https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726'
      ]
    },
    ...specialists.map(specialist => ({
      '@type': 'Person',
      name: specialist.name,
      jobTitle: specialist.role,
      worksFor: {
        '@id': absoluteUrl('/#organization')
      },
      sameAs: specialist.xUrl ? [specialist.xUrl] : undefined
    }))
  ]
}

const AboutPage = () => {
  return (
    <>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-12 -left-24 size-72 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-20 bottom-0 size-80 rounded-full blur-3xl' />

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='max-w-4xl space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              About Meridian
            </Badge>
            <div className='space-y-5'>
              <h1 className='max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                A growth partner built by people who ship.
              </h1>
            </div>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href='/services'>
                  Explore services
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='#specialists'>Meet the team</Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section id='founder' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-center'>
          <div className='bg-muted/40 relative overflow-hidden rounded-[28px] border p-3'>
            <img
              src='/images/about/founder.jpg'
              alt='Yiwei (怡玮), founder and CEO'
              className='aspect-square w-full rounded-[20px] object-cover'
            />
            <div className='bg-background/85 absolute right-7 bottom-7 left-7 rounded-2xl border p-4 backdrop-blur-sm'>
              <p className='text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase'>Founder & CEO</p>
              <p className='mt-1 text-lg font-semibold'>Yiwei (怡玮)</p>
            </div>
          </div>

          <div className='space-y-7'>
            <div className='space-y-4'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                Meet the Founder
              </Badge>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Yiwei (怡玮)</h2>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
                Yiwei is an entrepreneur and serial builder who has launched eight products and driven over one million
                impressions across X/Twitter and Xiaohongshu. With a hands-on reputation in the overseas product-growth
                community, Yiwei works with teams from Alibaba and a16z-backed companies.
              </p>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
                Yiwei also founded GoGlobal.to, an AI Reddit marketing agent, applying the same philosophy of
                AI-powered, safety-first social automation to a second platform. Meridian brings that builder mindset
                into a focused growth partnership for companies that need a clear route from discovery to demand.
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {founderHighlights.map(highlight => (
                <div key={highlight} className='bg-card/70 flex items-start gap-3 rounded-2xl border p-4'>
                  <BadgeCheckIcon className='text-primary mt-0.5 size-4 shrink-0' />
                  <p className='text-sm leading-6'>{highlight}</p>
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-3'>
              <SecondaryFlowButton asChild>
                <Link href='https://x.com/Yiwei_growth' target='_blank' rel='noreferrer'>
                  Follow on X
                  <ExternalLinkIcon />
                </Link>
              </SecondaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link
                  href='https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726'
                  target='_blank'
                  rel='noreferrer'
                >
                  小红书 Yiwei 怡玮
                  <ExternalLinkIcon />
                </Link>
              </SecondaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section id='specialists' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Core Specialists
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              Operators who turn growth strategy into momentum.
            </h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              Meridian brings senior operators into the work—not just the planning. Meet the specialists behind our AI
              growth, product marketing, and distribution practice.
            </p>
          </div>

          <div className='mt-10 grid gap-6'>
            {specialists.map(specialist => (
              <article key={specialist.name} className='group bg-card/85 overflow-hidden rounded-[28px] border'>
                <div className='grid h-full md:grid-cols-[minmax(180px,0.68fr)_minmax(0,1fr)]'>
                  <div className='bg-muted relative min-h-72 overflow-hidden md:min-h-full'>
                    <img
                      src={specialist.image}
                      alt={specialist.alt}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                    />
                  </div>
                  <div className='flex flex-col p-6 sm:p-7'>
                    <div className='space-y-3'>
                      <p className='text-primary text-xs font-medium tracking-[0.2em] uppercase'>{specialist.role}</p>
                      <h3 className='text-2xl font-semibold tracking-tight'>{specialist.name}</h3>
                      <p className='text-sm leading-6 font-medium'>{specialist.tagline}</p>
                      <p className='text-muted-foreground text-sm leading-6'>{specialist.bio}</p>
                    </div>

                    <ul className='mt-5 space-y-2.5'>
                      {specialist.highlights.map(highlight => (
                        <li
                          key={highlight}
                          className='text-muted-foreground flex items-start gap-2.5 text-sm leading-6'
                        >
                          <BadgeCheckIcon className='text-primary mt-1 size-3.5 shrink-0' />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {specialist.xUrl && (
                      <SecondaryFlowButton asChild className='mt-6 w-fit'>
                        <Link href={specialist.xUrl} target='_blank' rel='noreferrer'>
                          Follow {specialist.name} on X
                          <ExternalLinkIcon />
                        </Link>
                      </SecondaryFlowButton>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section id='team-story' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-10'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              Team Story
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Milestones that shaped the team.</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              The team behind Meridian is built through product launches, public learning, and close collaboration with
              other founders. These early moments continue to shape how we work with growth-stage brands today.
            </p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {stories.map((story, index) => (
              <Link key={story.title} href={story.href} className='group block focus-visible:outline-none'>
                <article className='bg-card/85 group-focus-visible:ring-ring relative h-full overflow-hidden rounded-[28px] border transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2'>
                  <div className='bg-muted relative aspect-[16/10] overflow-hidden'>
                    <img
                      src={story.image}
                      alt={story.alt}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                    />
                    <Badge className='bg-background/85 text-foreground hover:bg-background/85 absolute top-5 left-5'>
                      {story.label}
                    </Badge>
                  </div>
                  <div className='flex h-full flex-col gap-5 p-6 sm:p-8'>
                    <div className='flex items-center gap-3 text-sm'>
                      <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl'>
                        {index === 0 ? <UsersRoundIcon className='size-4' /> : <SparklesIcon className='size-4' />}
                      </div>
                      <div>
                        <p className='font-medium'>Yiwei</p>
                        <p className='text-muted-foreground text-sm'>{story.eyebrow}</p>
                      </div>
                    </div>
                    <h3 className='text-2xl font-semibold tracking-tight'>{story.title}</h3>
                    <p className='text-muted-foreground text-base leading-7'>{story.quote}</p>
                    <div className='mt-auto flex flex-wrap items-center justify-between gap-3 text-sm'>
                      <div className='text-muted-foreground flex items-center gap-2'>
                        <CalendarDaysIcon className='size-4' />
                        <time>{story.date}</time>
                      </div>
                      <span className='text-primary flex items-center gap-1.5 font-medium'>
                        Read story
                        <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <Card className='bg-card/85 mx-auto max-w-7xl overflow-hidden border'>
          <CardContent className='relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12'>
            <div className='bg-primary/10 absolute -top-20 -right-20 size-64 rounded-full blur-3xl' />
            <div className='relative max-w-2xl space-y-4'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                <HeartHandshakeIcon className='size-5' />
              </div>
              <h2 className='text-3xl font-semibold tracking-tight'>Want a growth partner who understands the work?</h2>
              <p className='text-muted-foreground text-base leading-7'>
                We can map your next search, AI-discovery, or community-growth opportunity into a delivery plan that is
                built for your current stage.
              </p>
            </div>
            <PrimaryFlowButton asChild>
              <BookingLink
                ctaLocation='closing_card'
                pageType='about'
                serviceType='growth_strategy'
                target='_blank'
                rel='noreferrer'
              >
                Book a strategy call
                <ArrowRightIcon />
              </BookingLink>
            </PrimaryFlowButton>
          </CardContent>
        </Card>
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

export default AboutPage
