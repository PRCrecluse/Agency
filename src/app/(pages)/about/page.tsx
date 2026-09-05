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
import { aboutContent } from '@/content/about'
import { getLocalizedPath } from '@/lib/language'
import { getRequestLanguage } from '@/lib/request-language'
import {
  absoluteUrl,
  buildMetadata,
  createLocalizedAlternates,
  createOrganizationSchema,
  createWebPageSchema
} from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()
  const copy = aboutContent[lang]

  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: getLocalizedPath('/about', lang),
    keywords: copy.keywords,
    alternates: createLocalizedAlternates('/about', lang),
    language: lang
  })
}

const AboutPage = async () => {
  const lang = await getRequestLanguage()
  const copy = aboutContent[lang]
  const { founderHighlights, specialists, stories } = copy
  const path = getLocalizedPath('/about', lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({
          path,
          title: copy.title,
          description: copy.description,
          language: lang
        }),
        '@type': 'AboutPage'
      },
      createOrganizationSchema(),
      {
        '@type': 'Person',
        '@id': absoluteUrl('/about#yiwei'),
        name: 'Yiwei',
        alternateName: '怡玮',
        jobTitle: copy.founderRole,
        worksFor: {
          '@id': absoluteUrl('/#organization')
        },
        sameAs: ['https://x.com/PRCrecluse674', 'https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726']
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

  return (
    <>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-12 -left-24 size-72 rounded-full blur-3xl' />
        <div className='bg-secondary/18 absolute -right-20 bottom-0 size-80 rounded-full blur-3xl' />

        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='max-w-4xl space-y-7'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.eyebrow}
            </Badge>
            <div className='space-y-5'>
              <h1 className='max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                {copy.headline}
              </h1>
            </div>
            <div className='flex flex-wrap gap-4'>
              <PrimaryFlowButton asChild>
                <Link href={getLocalizedPath('/services', lang)}>
                  {copy.exploreServices}
                  <ArrowRightIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='#specialists'>{copy.meetTeam}</Link>
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
              alt={copy.founderAlt}
              className='aspect-square w-full rounded-[20px] object-cover'
            />
            <div className='bg-background/85 absolute right-7 bottom-7 left-7 rounded-2xl border p-4 backdrop-blur-sm'>
              <p className='text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase'>{copy.founderRole}</p>
              <p className='mt-1 text-lg font-semibold'>{copy.founderName}</p>
            </div>
          </div>

          <div className='space-y-7'>
            <div className='space-y-4'>
              <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
                {copy.founderEyebrow}
              </Badge>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.founderName}</h2>
              {copy.founderBio.map(paragraph => (
                <p key={paragraph} className='text-muted-foreground text-base leading-7 sm:text-lg'>
                  {paragraph}
                </p>
              ))}
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
                  {copy.followOnX}
                  <ExternalLinkIcon />
                </Link>
              </SecondaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link
                  href='https://www.xiaohongshu.com/user/profile/5f12e5900000000001000726'
                  target='_blank'
                  rel='noreferrer'
                >
                  {copy.xiaohongshu}
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
              {copy.specialistsEyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.specialistsTitle}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.specialistsDescription}</p>
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
                          {lang === 'zh' ? `在 X 上关注 ${specialist.name}` : `Follow ${specialist.name} on X`}
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
              {copy.storiesEyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.storiesTitle}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.storiesDescription}</p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {stories.map((story, index) => (
              <Link
                key={story.title}
                href={getLocalizedPath(story.href, lang)}
                className='group block focus-visible:outline-none'
              >
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
                        {copy.readStory}
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
              <h2 className='text-3xl font-semibold tracking-tight'>{copy.ctaTitle}</h2>
              <p className='text-muted-foreground text-base leading-7'>{copy.ctaDescription}</p>
            </div>
            <PrimaryFlowButton asChild>
              <BookingLink
                ctaLocation='closing_card'
                pageType='about'
                serviceType='growth_strategy'
                language={lang}
                target='_blank'
                rel='noreferrer'
              >
                {copy.bookCall}
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
