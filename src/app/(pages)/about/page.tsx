import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  HeartHandshakeIcon,
  RocketIcon,
  SparklesIcon,
  UsersRoundIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'

export const metadata: Metadata = {
  title: 'About | Meridian',
  description: 'Meet the founder and discover the team story behind Meridian, Volumn.ai, and GoGlobal.to.'
}

const founderHighlights = [
  'Founded and shipped 8 products independently',
  'Driven 1M+ impressions across X/Twitter and Xiaohongshu',
  'Customers include teams from Alibaba and a16z-backed companies',
  'Creator of GoGlobal.to — an AI Reddit growth agent',
  'Built an active builder-community voice with 4,672 Xiaohongshu likes and saves'
]

const stories = [
  {
    date: 'June 28, 2026',
    eyebrow: 'Founder, GoGlobal.to',
    title: 'GoGlobal.to was featured alongside WaytoAGI at Sequoia Accelerator',
    quote:
      '“GoGlobal.to, our Reddit SaaS, appeared alongside the WaytoAGI project during a Sequoia Accelerator showcase, marking an early milestone for the team.”',
    image: '/images/about/sparklab-founders.jpg',
    alt: 'Yiwei at SparkLab Accelerator with fellow founders',
    label: 'Early momentum'
  },
  {
    date: 'July 5, 2026',
    eyebrow: 'Founder, Volumn.ai',
    title: 'Yiwei joined SparkLab Accelerator and lived alongside fellow founders',
    quote:
      '“Yiwei joined SparkLab Accelerator, lived with other founders, and celebrated an unforgettable 20th birthday there.”',
    image: '/images/about/sparklab-birthday.jpg',
    alt: 'Yiwei celebrating a birthday at SparkLab',
    label: 'Building in public'
  }
]

const AboutPage = () => {
  return (
    <>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute -left-24 top-12 size-72 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-20 bottom-0 size-80 rounded-full blur-3xl' />

        <div className='relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end'>
          <div className='max-w-4xl space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              About Meridian
            </Badge>
            <div className='space-y-5'>
              <h1 className='max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                A growth partner built by people who ship.
              </h1>
              <p className='text-muted-foreground max-w-3xl text-lg leading-8'>
                Meridian was created for ambitious teams that want more than a list of marketing tactics. We turn search, AI
                discovery, and community opportunity into a disciplined growth system that your team can understand, measure,
                and keep building on.
              </p>
            </div>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href='/services'>
                  Explore services
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='#founder'>Meet the founder</Link>
              </SecondaryFlowButton>
            </div>
          </div>

          <Card className='border bg-card/85 backdrop-blur-sm'>
            <CardContent className='grid gap-5 p-6 sm:p-8'>
              <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
                <RocketIcon className='size-5' />
              </div>
              <div className='space-y-3'>
                <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]'>Our mission</p>
                <p className='text-xl font-semibold tracking-tight'>
                  Make modern growth systems more accessible to builders with real products and real constraints.
                </p>
                <p className='text-muted-foreground text-sm leading-6'>
                  The work is grounded in practical research, useful content, responsible community participation, and clear
                  ownership—not vanity dashboards or vague promises.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section id='founder' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-center'>
          <div className='relative overflow-hidden rounded-[28px] border bg-muted/40 p-3'>
            <img
              src='/images/about/founder.jpg'
              alt='Yiwei (怡玮), founder and CEO'
              className='aspect-square w-full rounded-[20px] object-cover'
            />
            <div className='bg-background/85 absolute bottom-7 left-7 right-7 rounded-2xl border p-4 backdrop-blur-sm'>
              <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]'>Founder & CEO</p>
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
                Yiwei is a 19-year-old entrepreneur and serial builder who has launched eight products and driven over one
                million impressions across X/Twitter and Xiaohongshu. With a hands-on reputation in the overseas product-growth
                community, Yiwei works with teams from Alibaba and a16z-backed companies.
              </p>
              <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
                Yiwei also founded GoGlobal.to, an AI Reddit marketing agent, applying the same philosophy of AI-powered,
                safety-first social automation to a second platform. Meridian brings that builder mindset into a focused growth
                partnership for companies that need a clear route from discovery to demand.
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {founderHighlights.map(highlight => (
                <div key={highlight} className='flex items-start gap-3 rounded-2xl border bg-card/70 p-4'>
                  <BadgeCheckIcon className='text-primary mt-0.5 size-4 shrink-0' />
                  <p className='text-sm leading-6'>{highlight}</p>
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-3'>
              <SecondaryFlowButton asChild>
                <Link href='https://x.com/PRCrecluse674' target='_blank' rel='noreferrer'>
                  Follow on X
                  <ExternalLinkIcon />
                </Link>
              </SecondaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726' target='_blank' rel='noreferrer'>
                  小红书 Yiwei 怡玮
                  <ExternalLinkIcon />
                </Link>
              </SecondaryFlowButton>
            </div>
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
              The team behind Meridian is built through product launches, public learning, and close collaboration with other
              founders. These early moments continue to shape how we work with growth-stage brands today.
            </p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {stories.map((story, index) => (
              <article key={story.title} className='group relative overflow-hidden rounded-[28px] border bg-card/85'>
                <div className='relative aspect-[16/10] overflow-hidden bg-muted'>
                  <img
                    src={story.image}
                    alt={story.alt}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                  <Badge className='absolute left-5 top-5 bg-background/85 text-foreground hover:bg-background/85'>
                    {story.label}
                  </Badge>
                </div>
                <div className='space-y-5 p-6 sm:p-8'>
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
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <CalendarDaysIcon className='size-4' />
                    <time>{story.date}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <Card className='mx-auto max-w-7xl overflow-hidden border bg-card/85'>
          <CardContent className='relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12'>
            <div className='bg-primary/10 absolute -right-20 -top-20 size-64 rounded-full blur-3xl' />
            <div className='relative max-w-2xl space-y-4'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                <HeartHandshakeIcon className='size-5' />
              </div>
              <h2 className='text-3xl font-semibold tracking-tight'>Want a growth partner who understands the work?</h2>
              <p className='text-muted-foreground text-base leading-7'>
                We can map your next search, AI-discovery, or community-growth opportunity into a delivery plan that is built for
                your current stage.
              </p>
            </div>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                Book a strategy call
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default AboutPage
