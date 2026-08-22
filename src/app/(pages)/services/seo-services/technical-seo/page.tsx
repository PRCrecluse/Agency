import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BracesIcon,
  CheckCircle2Icon,
  CircleDotDashedIcon,
  Code2Icon,
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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Technical SEO Services for SaaS and AI Companies | Meridian',
  description:
    'Technical SEO that gets implemented. Meridian turns crawl, indexation, rendering, site architecture, and Core Web Vitals findings into developer-ready priorities for SaaS and AI teams.',
  keywords: [
    'technical SEO services',
    'technical SEO audit',
    'SaaS technical SEO',
    'AI company SEO',
    'Core Web Vitals audit',
    'JavaScript SEO',
    'website migration SEO'
  ],
  alternates: {
    canonical: `${baseUrl}/services/seo-services/technical-seo`
  }
}

const trustPoints = ['Clear priorities', 'Developer-ready tickets', 'Implementation support', 'Measurable progress']

const painPoints = [
  'Pages are crawled but not indexed',
  'Organic traffic dropped after a migration',
  'Google cannot render important content',
  'Multiple URLs compete for the same intent',
  'Sitemaps contain low-value or broken pages',
  'Core Web Vitals are underperforming',
  'International pages target the wrong market',
  'New pages take too long to be discovered'
]

const serviceModules = [
  {
    title: 'Technical SEO Audit',
    description:
      'A practical review of architecture, crawlability, indexation, rendering, performance, structured data, and international setup.',
    icon: FileSearchIcon,
    points: [
      'Crawl and indexation',
      'Status codes and redirects',
      'Canonicals and duplicate pages',
      'Sitemaps, robots, and internal linking'
    ]
  },
  {
    title: 'Crawling and Indexation',
    description:
      'Help search engines discover the right pages while duplicate, filtered, and low-value URLs stay out of the index.',
    icon: SearchIcon,
    points: [
      'Search Console analysis',
      'Index bloat and orphan pages',
      'Noindex and canonical logic',
      'Parameter URL and sitemap quality'
    ]
  },
  {
    title: 'Core Web Vitals',
    description:
      'Diagnose page-experience issues and give your development team a clear, prioritized remediation plan.',
    icon: GaugeIcon,
    points: [
      'LCP, INP, and CLS',
      'Image and font loading',
      'JavaScript load and rendering work',
      'Render-blocking resources'
    ]
  },
  {
    title: 'Website Migration',
    description: 'Protect organic visibility across domain, platform, design, and URL migrations.',
    icon: WrenchIcon,
    points: [
      'Migration plan and redirect map',
      'Pre-launch benchmark',
      'Staging audit',
      'Launch monitoring and validation'
    ]
  },
  {
    title: 'International SEO',
    description: 'Serve the right language and regional pages to the right search audience across global markets.',
    icon: Globe2Icon,
    points: [
      'Hreflang and language URLs',
      'Canonical alignment',
      'Country and language targeting',
      'International sitemap review'
    ]
  },
  {
    title: 'Structured Data',
    description:
      'Review and implement relevant schema so search engines better understand your company, products, content, and site structure.',
    icon: BracesIcon,
    points: [
      'Entity and organization markup',
      'Product and content schema',
      'Validation and error review',
      'No promises of rich-result eligibility'
    ]
  }
]

const implementationRows = [
  {
    issue: 'Product pages are not rendered in initial HTML',
    impact: 'Important content may not be indexed reliably',
    priority: 'Critical',
    owner: 'Engineering',
    recommendation: 'Implement server-side rendering for indexable product content'
  },
  {
    issue: 'Broken canonical URLs',
    impact: 'Ranking signals may be split across duplicate URLs',
    priority: 'High',
    owner: 'Engineering',
    recommendation: 'Generate self-referencing canonical tags and validate templates'
  },
  {
    issue: 'Orphan integration pages',
    impact: 'High-value pages are difficult for users and crawlers to discover',
    priority: 'High',
    owner: 'SEO / Content',
    recommendation: 'Add contextual category and integration links from relevant hubs'
  }
]

const processSteps = [
  {
    title: 'Discovery and Benchmarking',
    description: 'We learn your product, architecture, target markets, previous migrations, and organic growth goals.',
    output: 'Product interview · access checklist · benchmark data · early risk view'
  },
  {
    title: 'Technical Audit',
    description:
      'We crawl and inspect the site, review Search Console data, test page rendering, and isolate performance barriers.',
    output: 'Crawl findings · rendering review · issue inventory · business impact'
  },
  {
    title: 'Prioritized Roadmap',
    description: 'Every issue is prioritized by potential impact, implementation effort, and business importance.',
    output: 'Prioritized backlog · owners · technical recommendations · acceptance criteria'
  },
  {
    title: 'Implementation Support',
    description:
      'We work with product and engineering teams through tickets, documentation, weekly meetings, and implementation reviews.',
    output: 'Developer-ready tickets · working sessions · staging reviews · unblockers'
  },
  {
    title: 'Validation and Monitoring',
    description:
      'After release, we validate each fix and monitor crawling, indexation, performance, rankings, and organic conversions.',
    output: 'Post-release QA · validation log · monitoring view · next actions'
  }
]

const deliverables = [
  'Complete Technical SEO audit',
  'Prioritized issue backlog',
  'Developer-ready implementation tickets',
  'Crawl and indexation analysis',
  'Site architecture and internal-linking recommendations',
  'JavaScript rendering review',
  'Core Web Vitals analysis',
  'Schema recommendations',
  'Measurement dashboard',
  'Weekly project meetings',
  'QA and validation after changes',
  'Phased progress reporting'
]

const bestFor = [
  'SaaS products and AI tools',
  'Developer tools and JavaScript-heavy websites',
  'Multilingual global sites',
  'Sites with extensive integration pages',
  'Teams preparing a redesign or migration',
  'Publishers with substantial content but weak indexation'
]

const faqItems = [
  {
    question: 'What is included in a technical SEO audit?',
    answer:
      'Our audit covers crawling, indexing, rendering, site architecture, internal linking, status codes, canonical tags, sitemaps, robots directives, structured data, Core Web Vitals, and international SEO where relevant.'
  },
  {
    question: 'How long does a technical SEO audit take?',
    answer:
      'Most audits take two to four weeks. Larger websites, JavaScript applications, and international websites may require more time.'
  },
  {
    question: 'Do you implement the recommendations?',
    answer:
      'We provide developer-ready recommendations and support your engineering team during implementation. Direct implementation can also be scoped separately depending on your technology stack.'
  },
  {
    question: 'When will we see results?',
    answer:
      'Technical fixes can improve crawling and indexation within weeks, but ranking and organic conversion improvements usually take longer. The timeline depends on the issue, implementation speed, competition, and website authority.'
  },
  {
    question: 'Can you work with our developers?',
    answer:
      'Yes. We can create implementation tickets, join technical meetings, review pull requests or staging changes, and validate fixes after release.'
  },
  {
    question: 'Do you guarantee rankings?',
    answer:
      'No responsible SEO agency can guarantee rankings. We focus on removing technical barriers, improving website quality, and measuring the impact of implemented changes.'
  },
  {
    question: 'Do we need an ongoing engagement?',
    answer:
      'Not always. You can begin with a one-time audit or choose ongoing technical SEO support for implementation, monitoring, migrations, and continuous optimization.'
  }
]

const TechnicalSEOPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/services/seo-services/technical-seo#webpage`,
        name: 'Technical SEO Services for SaaS and AI Companies',
        description:
          'Technical SEO that gets implemented. Developer-ready audit, prioritization, implementation support, and validation for SaaS and AI websites.',
        url: `${baseUrl}/services/seo-services/technical-seo`
      },
      {
        '@type': 'Service',
        name: 'Technical SEO Services',
        serviceType: 'Technical SEO',
        description:
          'Technical SEO audits and implementation support for crawling, indexation, rendering, site architecture, international SEO, structured data, and Core Web Vitals.',
        areaServed: 'Global',
        provider: {
          '@type': 'Organization',
          name: 'Meridian'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  }

  return (
    <>
      <section className='relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute top-0 -left-24 size-80 rounded-full blur-3xl' />
        <div className='bg-secondary/16 absolute top-10 -right-28 size-96 rounded-full blur-3xl' />

        <div className='relative mx-auto flex w-full max-w-7xl flex-col items-center text-center'>
          <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
            Technical SEO for SaaS & AI
          </Badge>
          <div className='mt-6 max-w-4xl space-y-5'>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
              Technical SEO Services for SaaS and AI Companies
            </h1>
            <p className='text-muted-foreground text-lg leading-8 sm:text-xl'>
              Technical SEO that your developers can actually implement. From crawling and indexing to JavaScript
              rendering, site architecture, and Core Web Vitals, we turn findings into clear, prioritized actions.
            </p>
          </div>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <PrimaryFlowButton asChild>
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                Get a Technical SEO Audit
                <ArrowRightIcon />
              </Link>
            </PrimaryFlowButton>
            <SecondaryFlowButton asChild>
              <Link href='#included'>See What&apos;s Included</Link>
            </SecondaryFlowButton>
          </div>
          <div className='mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {trustPoints.map(point => (
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
      <TrustedBrands brandLogos={logos} />

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-center'>
          <div className='space-y-5'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              The technical barrier
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              Your Content Can&apos;t Rank If Search Engines Can&apos;t Access It
            </h2>
            <div className='text-muted-foreground space-y-4 text-base leading-7 sm:text-lg'>
              <p>
                You may already be publishing high-quality content, but technical problems can quietly limit its
                performance.
              </p>
              <p>
                Important pages may not be indexed. JavaScript may prevent content from being rendered correctly.
                Internal links may waste crawl paths. A site migration may have removed years of organic visibility.
              </p>
              <p>
                We identify these problems, explain their business impact, and help your team fix them in the right
                order.
              </p>
            </div>
          </div>

          <Card className='bg-card/85 overflow-hidden border'>
            <CardHeader className='bg-muted/30 border-b'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                  <CircleDotDashedIcon className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-xl'>Where technical friction shows up</CardTitle>
                  <CardDescription className='mt-1'>
                    The issues that most often constrain qualified organic growth.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='grid gap-3 p-5 sm:grid-cols-2'>
              {painPoints.map(point => (
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
              What&apos;s included
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              What&apos;s Included in Our Technical SEO Services
            </h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              We start with the site foundation that determines whether valuable pages can be discovered, understood,
              and improved over time.
            </p>
          </div>

          <div className='mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {serviceModules.map((module, index) => {
              const Icon = module.icon
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
              Implementation, not shelfware
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              More Than a 100-Page Audit That Nobody Implements
            </h2>
            <div className='text-muted-foreground space-y-4 text-base leading-7 sm:text-lg'>
              <p>A technical SEO audit is only valuable when the right fixes are implemented.</p>
              <p>
                We translate every finding into a prioritized action with a clear explanation, expected impact,
                recommended solution, and responsible owner. We can work directly with your developers through
                implementation and validation.
              </p>
            </div>
            <div className='grid gap-3 pt-2 sm:grid-cols-2'>
              {[
                'Business impact, not issue counts',
                'Developer-ready recommendations',
                'Weekly implementation support',
                'Validation after every fix',
                'Clear progress reporting'
              ].map(point => (
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
                  <CardTitle className='text-xl'>Developer-ready implementation ledger</CardTitle>
                  <CardDescription className='mt-1'>
                    An example of how audit findings become decisions and actions.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[760px] border-collapse text-left'>
                  <thead className='bg-background/75'>
                    <tr>
                      {['Issue', 'Impact', 'Priority', 'Owner', 'Recommendation'].map(heading => (
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
                    {implementationRows.map(row => (
                      <tr key={row.issue} className='border-t align-top'>
                        <td className='px-5 py-4 text-sm leading-6 font-medium'>{row.issue}</td>
                        <td className='text-muted-foreground px-5 py-4 text-sm leading-6'>{row.impact}</td>
                        <td className='px-5 py-4'>
                          <Badge
                            variant={row.priority === 'Critical' ? 'default' : 'outline'}
                            className='h-auto px-2.5 py-1 text-xs'
                          >
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
              Search discovery flow
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              See Where the Crawl-to-Conversion Path Breaks
            </h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              We trace the path from discovery through rendering and indexation, then connect technical changes to the
              pages that support qualified demand.
            </p>
          </div>

          <div className='relative mt-10 grid gap-4 md:grid-cols-4'>
            {[
              { title: 'Discover', description: 'Crawlers find the URLs that matter.', icon: SearchIcon },
              { title: 'Render', description: 'Critical content is available to search engines.', icon: Code2Icon },
              { title: 'Index', description: 'The right pages are eligible to rank.', icon: Layers3Icon },
              { title: 'Convert', description: 'Search visitors reach useful product paths.', icon: MonitorCheckIcon }
            ].map((stage, index) => {
              const Icon = stage.icon
              return (
                <Card key={stage.title} className='bg-card/85 relative border'>
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
                      <h3 className='text-xl font-semibold'>{stage.title}</h3>
                      <p className='text-muted-foreground mt-2 text-sm leading-6'>{stage.description}</p>
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
              The operating model
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>How Our Technical SEO Process Works</h2>
            <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
              A straightforward system for moving from site diagnosis to a verified release without losing the why
              behind each fix.
            </p>
          </div>

          <div className='mt-10 grid gap-5 lg:grid-cols-5'>
            {processSteps.map((step, index) => (
              <Card key={step.title} className='bg-card/85 border'>
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
                    <h3 className='text-lg leading-6 font-semibold'>{step.title}</h3>
                    <p className='text-muted-foreground text-sm leading-6'>{step.description}</p>
                  </div>
                  <p className='text-muted-foreground mt-auto border-t pt-4 text-xs leading-5 font-medium'>
                    {step.output}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className='bg-card/85 mt-8 overflow-hidden border'>
            <CardHeader className='bg-muted/30 border-b'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='text-primary text-xs font-medium tracking-[0.2em] uppercase'>
                    Prioritization framework
                  </p>
                  <CardTitle className='mt-2 text-xl'>Technical SEO Priority Matrix</CardTitle>
                </div>
                <CardDescription className='max-w-sm text-sm leading-6'>
                  We sequence fixes by expected impact and implementation effort, not by the length of an audit
                  spreadsheet.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='p-5 sm:p-7'>
              <div className='grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]'>
                <div className='text-muted-foreground flex items-center justify-center text-xs font-medium tracking-[0.18em] uppercase sm:rotate-180 sm:[writing-mode:vertical-rl]'>
                  Expected impact
                </div>
                <div>
                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      [
                        'Fix first',
                        'High impact · Low effort',
                        'Resolve blocking crawl, canonical, or indexation issues quickly.',
                        'bg-primary/12'
                      ],
                      [
                        'Plan with engineering',
                        'High impact · High effort',
                        'Schedule rendering, architecture, and platform changes with owners.',
                        'bg-secondary/30'
                      ],
                      [
                        'Batch fixes',
                        'Low impact · Low effort',
                        'Group hygiene improvements into predictable maintenance releases.',
                        'bg-muted/75'
                      ],
                      [
                        'Deprioritize',
                        'Low impact · High effort',
                        'Avoid spending engineering capacity before higher-leverage work ships.',
                        'bg-muted/45'
                      ]
                    ].map(([title, label, description, color]) => (
                      <div key={title} className={`min-h-40 rounded-2xl border p-4 sm:p-5 ${color}`}>
                        <p className='text-sm font-semibold'>{title}</p>
                        <p className='text-primary mt-1 text-xs font-medium'>{label}</p>
                        <p className='text-muted-foreground mt-3 text-sm leading-6'>{description}</p>
                      </div>
                    ))}
                  </div>
                  <div className='text-muted-foreground mt-3 flex justify-between px-1 text-xs font-medium tracking-[0.18em] uppercase'>
                    <span>Low effort</span>
                    <span>High effort</span>
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
              What you&apos;ll receive
            </Badge>
            <h2 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'>
              A Technical SEO Engagement Your Team Can Run With
            </h2>
            <div className='mt-7 grid gap-3 sm:grid-cols-2'>
              {deliverables.map(item => (
                <div key={item} className='bg-card/80 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6'>
                  <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' />
                  {item}
                </div>
              ))}
            </div>
            <p className='text-muted-foreground mt-6 text-sm leading-6'>
              Implementation can be completed by your development team with our support, or scoped separately with
              Meridian.
            </p>
          </div>

          <Card className='overflow-hidden border bg-zinc-950 text-white shadow-2xl'>
            <CardHeader className='border-b border-white/10'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-xl bg-white/10'>
                    <MonitorCheckIcon className='size-5' />
                  </div>
                  <div>
                    <CardTitle className='text-lg text-white'>Technical progress view</CardTitle>
                    <CardDescription className='mt-1 text-zinc-400'>
                      A shared source of truth for implementation and validation.
                    </CardDescription>
                  </div>
                </div>
                <span className='size-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]' />
              </div>
            </CardHeader>
            <CardContent className='space-y-5 p-6'>
              <div className='grid grid-cols-3 gap-3'>
                {[
                  ['Open', '08'],
                  ['In review', '05'],
                  ['Validated', '14']
                ].map(([label, value]) => (
                  <div key={label} className='rounded-2xl border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs text-zinc-400'>{label}</p>
                    <p className='mt-2 text-2xl font-semibold'>{value}</p>
                  </div>
                ))}
              </div>
              <div className='space-y-3'>
                <p className='text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase'>Release validation</p>
                {[
                  ['Canonical templates', 'Validated', 'bg-emerald-400'],
                  ['Integration-page links', 'In review', 'bg-amber-300'],
                  ['JavaScript rendering', 'Scheduled', 'bg-sky-300']
                ].map(([label, status, color]) => (
                  <div
                    key={label}
                    className='flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3'
                  >
                    <span className='text-sm'>{label}</span>
                    <span className='flex items-center gap-2 text-xs text-zinc-300'>
                      <span className={`size-2 rounded-full ${color}`} />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              <div className='rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4'>
                <p className='text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase'>What we monitor</p>
                <p className='mt-2 text-sm leading-6 text-zinc-200'>
                  Crawl coverage · indexation quality · page experience · organic clicks · qualified conversions
                </p>
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
                Built for complex websites
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>Built for Complex SaaS and AI Websites</CardTitle>
              <CardDescription className='text-base leading-7'>
                Our technical SEO services are best suited for websites that already have a validated product,
                meaningful search demand, and a team capable of implementing technical improvements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-3 sm:grid-cols-2'>
                {bestFor.map(item => (
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
                Right-fit guidance
              </Badge>
              <CardTitle className='text-3xl tracking-tight'>When a full audit is not the first move</CardTitle>
              <CardDescription className='text-base leading-7'>
                If your website has only a few pages and no established search strategy, we may recommend starting with
                keyword research and on-page SEO before a full technical engagement.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='bg-background/80 rounded-2xl border p-5'>
                <p className='text-sm font-semibold'>We will recommend the narrowest useful scope.</p>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  That could be a focused migration review, a JavaScript rendering check, or a technical roadmap that
                  supports the next stage of your wider SEO program.
                </p>
              </div>
              <SecondaryFlowButton asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  Discuss your scope
                  <ArrowRightIcon />
                </Link>
              </SecondaryFlowButton>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionSeparator />
      <FAQ
        faqItems={faqItems}
        eyebrow='Technical SEO FAQ'
        title='Questions before you start'
        description='Clear expectations on scope, implementation, timing, and how we work alongside your team.'
      />

      <CTA
        title='Find Out What’s Holding Back Your Organic Growth'
        description='Tell us about your website, product, and current SEO challenges. We’ll review your situation and recommend the right technical SEO scope.'
        buttonLabel='Request a Technical SEO Audit'
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

export default TechnicalSEOPage
