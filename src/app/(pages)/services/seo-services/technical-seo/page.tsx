import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BracesIcon,
  Code2Icon,
  CheckCircle2Icon,
  CircleDotDashedIcon,
  FileSearchIcon,
  GaugeIcon,
  Globe2Icon,
  Layers3Icon,
  ListChecksIcon,
  MonitorCheckIcon,
  SearchIcon,
  SparklesIcon,
  WrenchIcon
} from 'lucide-react'

import { logos } from '@/assets/data/trusted-brands'
import CTA from '@/components/blocks/cta/cta'
import FAQ from '@/components/blocks/faq/faq'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import SectionSeparator from '@/components/section-separator'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import { getTechnicalSEOLang, technicalSEOCopy } from '@/content/technical-seo'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = getTechnicalSEOLang(resolvedSearchParams?.lang)
  const metadata = technicalSEOCopy[lang].metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: {
      canonical: `${baseUrl}/services/seo-services/technical-seo`
    }
  }
}

const TechnicalSEOPage = async ({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) => {
  const resolvedSearchParams = await searchParams
  const lang = getTechnicalSEOLang(resolvedSearchParams?.lang)
  const copy = technicalSEOCopy[lang]

  const serviceIcons = [FileSearchIcon, SearchIcon, GaugeIcon, WrenchIcon, Globe2Icon, BracesIcon]
  const discoveryIcons = [SearchIcon, Code2Icon, Layers3Icon, MonitorCheckIcon]
  const dashboardStatusColors = ['bg-emerald-400', 'bg-amber-300', 'bg-sky-300']
  const matrixColors = ['bg-primary/12', 'bg-secondary/30', 'bg-muted/75', 'bg-muted/45']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/services/seo-services/technical-seo?lang=${lang}#webpage`,
        name: copy.metadata.title,
        description: copy.metadata.description,
        url: `${baseUrl}/services/seo-services/technical-seo?lang=${lang}`
      },
      {
        '@type': 'Service',
        name: copy.hero.title,
        serviceType: 'Technical SEO',
        description: copy.metadata.description,
        areaServed: 'Global',
        provider: {
          '@type': 'Organization',
          name: 'Meridian'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: copy.faq.items.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer
          }
        }))
      }
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
              {copy.barrier.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.barrier.title}</h2>
            <div className='text-muted-foreground space-y-4 text-base leading-7 sm:text-lg'>
              {copy.barrier.paragraphs.map(paragraph => (
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
                  <CardTitle className='text-xl'>{copy.barrier.cardTitle}</CardTitle>
                  <CardDescription className='mt-1'>{copy.barrier.cardDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='grid gap-3 p-5 sm:grid-cols-2'>
              {copy.barrier.painPoints.map(point => (
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
              const Icon = serviceIcons[index]

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
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.implementation.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.implementation.title}</h2>
            <div className='text-muted-foreground space-y-4 text-base leading-7 sm:text-lg'>
              {copy.implementation.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className='grid gap-3 pt-2 sm:grid-cols-2'>
              {copy.implementation.benefits.map(point => (
                <div
                  key={point}
                  className='bg-primary/5 flex items-center gap-2 rounded-xl border px-3 py-3 text-sm leading-5'
                >
                  <SparklesIcon className='text-primary size-4 shrink-0' />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <Card className='bg-card/85 overflow-hidden border'>
            <CardHeader className='bg-muted/30 border-b'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                  <ListChecksIcon className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-xl'>{copy.implementation.ledgerTitle}</CardTitle>
                  <CardDescription className='mt-1'>{copy.implementation.ledgerDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[760px] border-collapse text-left'>
                  <thead className='bg-background/75'>
                    <tr>
                      {copy.implementation.tableHeadings.map(heading => (
                        <th
                          key={heading}
                          className='text-muted-foreground px-5 py-4 text-xs font-medium tracking-[0.18em] uppercase'
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {copy.implementation.rows.map((row, index) => (
                      <tr key={row.issue} className='border-t align-top'>
                        <td className='px-5 py-4 text-sm leading-6 font-medium'>{row.issue}</td>
                        <td className='text-muted-foreground px-5 py-4 text-sm leading-6'>{row.impact}</td>
                        <td className='px-5 py-4'>
                          <Badge variant={index === 0 ? 'default' : 'outline'} className='h-auto px-2.5 py-1 text-xs'>
                            {row.priority}
                          </Badge>
                        </td>
                        <td className='px-5 py-4 text-sm leading-6'>{row.owner}</td>
                        <td className='text-muted-foreground px-5 py-4 text-sm leading-6'>{row.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='mx-auto max-w-3xl space-y-4 text-center'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              {copy.discovery.eyebrow}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{copy.discovery.title}</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>{copy.discovery.description}</p>
          </div>

          <div className='relative mt-10 grid gap-4 md:grid-cols-4'>
            {copy.discovery.stages.map(([title, description], index) => {
              const Icon = discoveryIcons[index]

              return (
                <Card key={title} className='bg-card/85 relative border'>
                  {index < 3 ? (
                    <div className='bg-primary/35 absolute top-1/2 -right-3 z-10 hidden h-px w-6 md:block' />
                  ) : null}
                  <CardContent className='flex min-h-48 flex-col gap-5 pt-6'>
                    <div className='flex items-center justify-between'>
                      <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                        <Icon className='size-5' />
                      </div>
                      <span className='text-muted-foreground text-xs font-medium tracking-[0.24em]'>0{index + 1}</span>
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold'>{title}</h3>
                      <p className='text-muted-foreground mt-2 text-sm leading-6'>{description}</p>
                    </div>
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
            {copy.process.steps.map(([title, description, output], index) => (
              <Card key={title} className='bg-card/85 border'>
                <CardContent className='flex h-full flex-col gap-5 pt-6'>
                  <div className='flex items-center justify-between'>
                    <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl text-sm font-semibold'>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className='bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full'>
                      <ArrowRightIcon className='size-4' />
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <h3 className='text-lg leading-6 font-semibold'>{title}</h3>
                    <p className='text-muted-foreground text-sm leading-6'>{description}</p>
                  </div>
                  <p className='text-muted-foreground mt-auto border-t pt-4 text-xs leading-5 font-medium'>{output}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className='bg-card/85 mt-8 overflow-hidden border'>
            <CardHeader className='bg-muted/30 border-b'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='text-primary text-xs font-medium tracking-[0.2em] uppercase'>
                    {copy.process.matrix.eyebrow}
                  </p>
                  <CardTitle className='mt-2 text-xl'>{copy.process.matrix.title}</CardTitle>
                </div>
                <CardDescription className='max-w-sm text-sm leading-6'>
                  {copy.process.matrix.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='p-5 sm:p-7'>
              <div className='grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]'>
                <div className='text-muted-foreground flex items-center justify-center text-xs font-medium tracking-[0.18em] uppercase sm:rotate-180 sm:[writing-mode:vertical-rl]'>
                  {copy.process.matrix.impact}
                </div>
                <div>
                  <div className='grid grid-cols-2 gap-3'>
                    {copy.process.matrix.quadrants.map(([title, label, description], index) => (
                      <div key={title} className={`min-h-40 rounded-2xl border p-4 sm:p-5 ${matrixColors[index]}`}>
                        <p className='text-sm font-semibold'>{title}</p>
                        <p className='text-primary mt-1 text-xs font-medium'>{label}</p>
                        <p className='text-muted-foreground mt-3 text-sm leading-6'>{description}</p>
                      </div>
                    ))}
                  </div>
                  <div className='text-muted-foreground mt-3 flex justify-between px-1 text-xs font-medium tracking-[0.18em] uppercase'>
                    <span>{copy.process.matrix.lowEffort}</span>
                    <span>{copy.process.matrix.highEffort}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
            <p className='text-muted-foreground mt-6 text-sm leading-6'>{copy.deliverables.note}</p>
          </div>

          <Card className='overflow-hidden border bg-zinc-950 text-white shadow-2xl'>
            <CardHeader className='border-b border-white/10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-xl bg-white/10'>
                    <MonitorCheckIcon className='size-5' />
                  </div>
                  <div>
                    <CardTitle className='text-lg text-white'>{copy.deliverables.dashboard.title}</CardTitle>
                    <CardDescription className='mt-1 text-zinc-400'>
                      {copy.deliverables.dashboard.description}
                    </CardDescription>
                  </div>
                </div>
                <span className='size-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]' />
              </div>
            </CardHeader>
            <CardContent className='space-y-5 p-6'>
              <div className='grid grid-cols-3 gap-3'>
                {copy.deliverables.dashboard.counts.map(([label, value]) => (
                  <div key={label} className='rounded-2xl border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs text-zinc-400'>{label}</p>
                    <p className='mt-2 text-2xl font-semibold'>{value}</p>
                  </div>
                ))}
              </div>
              <div className='space-y-3'>
                <p className='text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase'>
                  {copy.deliverables.dashboard.validation}
                </p>
                {copy.deliverables.dashboard.statuses.map(([label, status], index) => (
                  <div
                    key={label}
                    className='flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3'
                  >
                    <span className='text-sm'>{label}</span>
                    <span className='flex items-center gap-2 text-xs text-zinc-300'>
                      <span className={`size-2 rounded-full ${dashboardStatusColors[index]}`} />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              <div className='rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4'>
                <p className='text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase'>
                  {copy.deliverables.dashboard.monitoring}
                </p>
                <p className='mt-2 text-sm leading-6 text-zinc-200'>{copy.deliverables.dashboard.monitoringItems}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2'>
          <Card className='bg-card/85 border'>
            <CardHeader className='space-y-4'>
              <Badge variant='outline' className='h-auto w-fit px-3 py-1 text-sm font-normal'>
                {copy.fit.builtEyebrow}
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>{copy.fit.builtTitle}</CardTitle>
              <CardDescription className='text-base leading-7'>{copy.fit.builtDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-3 sm:grid-cols-2'>
                {copy.fit.bestFor.map(item => (
                  <div key={item} className='bg-muted/50 flex items-start gap-3 rounded-xl p-3 text-sm leading-6'>
                    <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-primary/[0.06] border'>
            <CardHeader className='space-y-4'>
              <Badge variant='outline' className='h-auto w-fit px-3 py-1 text-sm font-normal'>
                {copy.fit.guidanceEyebrow}
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>{copy.fit.guidanceTitle}</CardTitle>
              <CardDescription className='text-base leading-7'>{copy.fit.guidanceDescription}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='bg-background/80 rounded-2xl border p-5'>
                <p className='text-sm font-semibold'>{copy.fit.guidanceLead}</p>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>{copy.fit.guidanceBody}</p>
              </div>
              <SecondaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  {copy.fit.guidanceCta}
                  <ArrowRightIcon />
                </Link>
              </SecondaryFlowButton>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />
      <FAQ
        faqItems={copy.faq.items.map(([question, answer]) => ({ question, answer }))}
        eyebrow={copy.faq.eyebrow}
        title={copy.faq.title}
        description={copy.faq.description}
      />

      <CTA />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </main>
  )
}

export default TechnicalSEOPage
