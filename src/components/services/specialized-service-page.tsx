import Link from 'next/link'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleDotDashedIcon,
  FileSearchIcon,
  Layers3Icon,
  ListChecksIcon,
  MessageSquareMoreIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  WrenchIcon
} from 'lucide-react'

import { logos } from '@/assets/data/trusted-brands'
import CTASection from '@/components/blocks/cta/cta'
import FAQ from '@/components/blocks/faq/faq'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import SectionSeparator from '@/components/section-separator'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import type { SpecializedServiceLang, SpecializedServicePageContent } from '@/content/specialized-service-pages'
import { absoluteUrl, createFAQSchema, createWebPageSchema } from '@/lib/seo'

const moduleIcons = [SearchIcon, Layers3Icon, SparklesIcon, WrenchIcon, FileSearchIcon]
const processIcons = [TargetIcon, SearchIcon, ListChecksIcon, MessageSquareMoreIcon, SparklesIcon]

type SpecializedServicePageProps = {
  lang: SpecializedServiceLang
  path: string
  copy: SpecializedServicePageContent
}

const SpecializedServicePage = ({ lang, path, copy }: SpecializedServicePageProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({
          path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          language: lang
        })
      },
      {
        '@type': 'Service',
        name: copy.hero.title,
        serviceType: copy.serviceType,
        description: copy.metadata.description,
        areaServed: 'Global',
        url: absoluteUrl(path),
        provider: {
          '@type': 'Organization',
          name: 'Meridian'
        }
      },
      createFAQSchema(copy.faq.items)
    ]
  }

  return (
    <main lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-0 -left-24 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/16 absolute top-10 -right-28 size-96 rounded-full blur-3xl' />

        <div className='relative mx-auto flex w-full max-w-7xl flex-col items-center text-center'>
          <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
            {copy.hero.badge}
          </Badge>
          <div className='mt-6 max-w-4xl space-y-5'>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>{copy.hero.title}</h1>
            <p className='text-muted-foreground text-lg leading-8 sm:text-xl'>{copy.hero.description}</p>
          </div>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                {copy.hero.primaryCta}
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
            <SecondaryFlowButton asChild>
              <Link href='#included'>{copy.hero.secondaryCta}</Link>
            </SecondaryFlowButton>
          </div>
          <div className='mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {copy.hero.trustPoints.map(point => (
              <div
                key={point}
                className='bg-background/75 flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium'
              >
                <CheckCircle2Icon className='text-primary size-4 shrink-0' />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />
      <TrustedBrands brandLogos={logos} title={copy.trustedBrandsTitle} />

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-center'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.challenge.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.challenge.title}</h2>
            <div className='text-muted-foreground space-y-4 text-base leading-7 sm:text-lg'>
              {copy.challenge.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Card className='bg-card/85 overflow-hidden border'>
            <CardHeader className='bg-muted/30 border-b'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                  <CircleDotDashedIcon className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-xl'>{copy.challenge.cardTitle}</CardTitle>
                  <CardDescription className='mt-1'>{copy.challenge.cardDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='grid gap-3 p-5 sm:grid-cols-2'>
              {copy.challenge.painPoints.map(point => (
                <div
                  key={point}
                  className='bg-background/80 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6'
                >
                  <span className='bg-primary mt-2 size-1.5 shrink-0 rounded-full' />
                  <span>{point}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section id='included' className='scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.includes.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.includes.title}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.includes.description}</p>
          </div>

          <div className='mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {copy.includes.modules.map((module, index) => {
              const Icon = moduleIcons[index % moduleIcons.length]

              return (
                <Card
                  key={module.title}
                  className='group bg-card/85 border transition-transform duration-300 hover:-translate-y-1'
                >
                  <CardHeader className='space-y-5'>
                    <div className='flex items-center justify-between'>
                      <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                        <Icon className='size-5' />
                      </div>
                      <span className='text-muted-foreground text-xs font-medium tracking-[0.24em]'>0{index + 1}</span>
                    </div>
                    <div className='space-y-2'>
                      <CardTitle className='text-xl'>{module.title}</CardTitle>
                      <CardDescription className='text-sm leading-6'>{module.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2.5'>
                      {module.points.map(point => (
                        <li key={point} className='text-muted-foreground flex items-start gap-2.5 text-sm leading-6'>
                          <CheckCircle2Icon className='text-primary mt-1 size-3.5 shrink-0' />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl space-y-4'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.process.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.process.title}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.process.description}</p>
          </div>

          <div className='mt-10 grid gap-5 lg:grid-cols-5'>
            {copy.process.steps.map((step, index) => {
              const Icon = processIcons[index % processIcons.length]

              return (
                <Card key={step.title} className='bg-card/85 border'>
                  <CardContent className='flex h-full flex-col gap-5 pt-6'>
                    <div className='flex items-center justify-between'>
                      <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                        <Icon className='size-5' />
                      </div>
                      <span className='text-muted-foreground text-xs font-medium tracking-[0.24em]'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className='space-y-3'>
                      <h3 className='text-lg leading-6 font-semibold'>{step.title}</h3>
                      <p className='text-muted-foreground text-sm leading-6'>{step.description}</p>
                    </div>
                    <p className='text-muted-foreground mt-auto border-t pt-4 text-xs leading-5 font-medium'>
                      {step.output}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start'>
          <div>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.deliverables.eyebrow}
            </Badge>
            <h2 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.deliverables.title}</h2>
            <div className='mt-7 grid gap-3 sm:grid-cols-2'>
              {copy.deliverables.items.map(item => (
                <div key={item} className='bg-card/80 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6'>
                  <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className='bg-primary/[0.06] border'>
            <CardHeader className='space-y-4'>
              <Badge variant='outline' className='h-auto w-fit px-3 py-1 text-sm font-normal'>
                {copy.deliverables.summaryTitle}
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>{copy.deliverables.summaryDescription}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-3'>
                {copy.deliverables.summaryPoints.map(point => (
                  <div key={point} className='bg-background/80 flex items-start gap-3 rounded-xl border p-4 text-sm leading-6'>
                    <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                    {point}
                  </div>
                ))}
              </div>
              <p className='text-muted-foreground text-sm leading-6'>{copy.deliverables.note}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <Card className='bg-card/85 border'>
            <CardHeader className='space-y-4'>
              <Badge variant='outline' className='h-auto w-fit px-3 py-1 text-sm font-normal'>
                {copy.fit.eyebrow}
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>{copy.fit.title}</CardTitle>
              <CardDescription className='text-base leading-7'>{copy.fit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-3 sm:grid-cols-2'>
                {copy.fit.bullets.map(item => (
                  <div key={item} className='bg-muted/50 flex items-start gap-3 rounded-xl p-3 text-sm leading-6'>
                    <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <FAQ
        faqItems={copy.faq.items}
        eyebrow={copy.faq.eyebrow}
        title={copy.faq.title}
        description={copy.faq.description}
      />

      <CTASection
        title={
          lang === 'zh'
            ? `准备把「${copy.serviceType}」变成可执行计划了吗？`
            : `Ready to Turn ${copy.serviceType} Into an Action Plan?`
        }
        description={
          lang === 'zh'
            ? '预约一次策略沟通，梳理当前机会、优先级和最值得先做的下一步。'
            : 'Book a strategy call to review your current opportunity, priorities, and the highest-impact next step.'
        }
        buttonLabel={copy.hero.primaryCta}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </main>
  )
}

export default SpecializedServicePage
