import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon, CalendarDaysIcon, QuoteIcon } from 'lucide-react'

import CTA from '@/components/blocks/cta/cta'
import SectionSeparator from '@/components/section-separator'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import { aboutStories, type AboutStory } from '@/content/about-stories'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

const getStory = (slug: string): AboutStory | undefined => aboutStories.find(story => story.slug === slug)

export const dynamicParams = false

export async function generateStaticParams() {
  return aboutStories.map(story => ({ storySlug: story.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ storySlug: string }> }): Promise<Metadata> {
  const { storySlug } = await params
  const story = getStory(storySlug)

  if (!story) {
    return {}
  }

  return {
    ...buildMetadata({
      title: `${story.title} | Meridian`,
      description: story.deck,
      path: `/about/stories/${story.slug}`
    }),
    openGraph: {
      title: `${story.title} | Meridian`,
      description: story.deck,
      type: 'article',
      publishedTime: new Date(story.date).toISOString(),
      url: absoluteUrl(`/about/stories/${story.slug}`),
      images: [{ url: absoluteUrl(story.imageOne), alt: story.imageOneAlt }]
    }
  }
}

const StoryDetailPage = async ({ params }: { params: Promise<{ storySlug: string }> }) => {
  const { storySlug } = await params
  const story = getStory(storySlug)

  if (!story) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.deck,
    image: [absoluteUrl(story.imageOne), absoluteUrl(story.imageTwo)],
    datePublished: new Date(story.date).toISOString(),
    dateModified: new Date(story.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Yiwei'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meridian'
    },
    mainEntityOfPage: absoluteUrl(`/about/stories/${story.slug}`)
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-12 sm:px-6 sm:py-18 lg:px-8 lg:py-22'>
        <div className='bg-primary/10 absolute top-0 -left-28 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/14 absolute top-16 -right-24 size-72 rounded-full blur-3xl' />

        <div className='relative mx-auto w-full max-w-5xl'>
          <SecondaryFlowButton asChild>
            <Link href='/about#team-story'>
              <ArrowLeftIcon />
              Back to Team Story
            </Link>
          </SecondaryFlowButton>

          <div className='mt-10 max-w-4xl space-y-6'>
            <div className='text-muted-foreground flex flex-wrap items-center gap-3 text-sm'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-xs font-normal'>
                {story.eyebrow}
              </Badge>
              <span className='flex items-center gap-1.5'>
                <CalendarDaysIcon className='size-3.5' />
                <time dateTime={new Date(story.date).toISOString()}>{story.date}</time>
              </span>
              <span>Yiwei · Founder</span>
            </div>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>{story.title}</h1>
            <p className='text-muted-foreground max-w-3xl text-lg leading-8 sm:text-xl'>{story.deck}</p>
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
        <div className='mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]'>
          <div className='bg-muted relative min-h-90 overflow-hidden rounded-[28px] border md:min-h-130'>
            <img src={story.imageOne} alt={story.imageOneAlt} className='absolute inset-0 h-full w-full object-cover' />
          </div>
          <div className='bg-muted relative min-h-70 overflow-hidden rounded-[28px] border md:min-h-130'>
            <img src={story.imageTwo} alt={story.imageTwoAlt} className='absolute inset-0 h-full w-full object-cover' />
          </div>
        </div>
      </section>

      <section className='px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]'>
          <article className='space-y-7'>
            <div className='text-muted-foreground space-y-5 text-base leading-8 sm:text-lg'>
              {story.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Card className='bg-primary/[0.06] border'>
              <CardContent className='space-y-4 p-6 sm:p-8'>
                <QuoteIcon className='text-primary size-6' />
                <p className='text-xl leading-8 font-medium tracking-tight sm:text-2xl'>“{story.quote}”</p>
              </CardContent>
            </Card>
          </article>

          <aside className='space-y-4'>
            <Card className='bg-card/85 overflow-hidden border'>
              <CardContent className='p-5'>
                <img
                  src='/images/about/founder.jpg'
                  alt='Yiwei, founder of Meridian'
                  className='aspect-square w-full rounded-2xl object-cover'
                />
                <p className='mt-5 text-sm font-semibold'>Yiwei (怡玮)</p>
                <p className='text-muted-foreground mt-1 text-sm'>{story.authorRole}</p>
                <p className='text-muted-foreground mt-4 text-sm leading-6'>
                  A builder and growth operator turning practical founder lessons into focused support for global teams.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-card/85 border'>
              <CardContent className='p-5'>
                <p className='text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase'>
                  What this shaped
                </p>
                <ul className='mt-4 space-y-3'>
                  {story.highlights.map(highlight => (
                    <li key={highlight} className='flex items-start gap-2.5 text-sm leading-6'>
                      <span className='bg-primary mt-2 size-1.5 shrink-0 rounded-full' />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-2'>
          <Card className='bg-card/85 border'>
            <CardContent className='flex min-h-56 flex-col justify-between gap-8 p-6 sm:p-8'>
              <div className='space-y-3'>
                <p className='text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase'>Team story</p>
                <h2 className='text-2xl font-semibold tracking-tight'>See the milestones behind Meridian.</h2>
              </div>
              <SecondaryFlowButton asChild className='w-fit'>
                <Link href='/about#team-story'>
                  Back to About
                  <ArrowRightIcon />
                </Link>
              </SecondaryFlowButton>
            </CardContent>
          </Card>

          <Card className='bg-primary/[0.06] border'>
            <CardContent className='flex min-h-56 flex-col justify-between gap-8 p-6 sm:p-8'>
              <div className='space-y-3'>
                <p className='text-primary text-xs font-medium tracking-[0.18em] uppercase'>Continue reading</p>
                <h2 className='text-2xl font-semibold tracking-tight'>{story.nextLabel}</h2>
              </div>
              <PrimaryFlowButton asChild className='w-fit'>
                <Link href={`/about/stories/${story.nextSlug}`}>
                  Read the story
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTA
        title='Want a growth partner who understands the work?'
        description='We can map your next search, AI-discovery, or community-growth opportunity into a delivery plan built for your current stage.'
        buttonLabel='Book a strategy call'
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

export default StoryDetailPage
