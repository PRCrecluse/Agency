import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BotIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  FileSearchIcon,
  GaugeIcon,
  ListChecksIcon,
  MessageSquareMoreIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon
} from 'lucide-react'

import SectionSeparator from '@/components/section-separator'
import { Badge } from '@/components/ui/badge'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import {
  absoluteUrl,
  buildMetadata,
  createBreadcrumbSchema,
  createOrganizationSchema,
  createWebPageSchema
} from '@/lib/seo'

const path = '/products/goglobal'
const title = 'GoGlobal.to — AI Reddit Marketing Software | Meridian'

const description =
  'Meet GoGlobal.to, an AI-powered Reddit marketing SaaS for community research, campaign planning, content drafting, approval workflows, and progress tracking.'

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
  keywords: [
    'reddit marketing software',
    'reddit marketing SaaS',
    'reddit marketing automation',
    'AI reddit agent',
    'goglobal.to'
  ]
})

const workflow = [
  {
    step: '01',
    title: 'Start with a campaign brief',
    description: 'Define the product, audience, goal, and guardrails so every recommendation starts with real context.',
    icon: <TargetIcon />
  },
  {
    step: '02',
    title: 'Map communities and angles',
    description:
      'Research relevant subreddits, discussion patterns, and campaign angles before content moves into production.',
    icon: <SearchCheckIcon />
  },
  {
    step: '03',
    title: 'Draft Reddit-native content',
    description:
      'Generate post templates and comment drafts designed around the conversation—not a generic social post.',
    icon: <MessageSquareMoreIcon />
  },
  {
    step: '04',
    title: 'Review, publish, and learn',
    description:
      'Keep human approval in the loop, track what shipped, and use campaign progress to guide the next iteration.',
    icon: <ListChecksIcon />
  }
]

const capabilities = [
  {
    title: 'Campaign planning',
    description: 'Turn one brief into an organized Reddit strategy with goals, angles, and a clear execution path.',
    icon: <SparklesIcon />
  },
  {
    title: 'Subreddit research',
    description: 'Find communities that match the audience and understand the context before joining the discussion.',
    icon: <FileSearchIcon />
  },
  {
    title: 'Content workflows',
    description:
      'Create, review, and organize posts and replies from a single operating layer instead of scattered docs.',
    icon: <MessageSquareMoreIcon />
  },
  {
    title: 'Approval-first execution',
    description:
      'Put review and timing controls between AI assistance and publishing to support safer campaign operations.',
    icon: <ShieldCheckIcon />
  },
  {
    title: 'Signal monitoring',
    description:
      'Watch relevant keywords and buying signals so teams can prioritize conversations with genuine intent.',
    icon: <GaugeIcon />
  },
  {
    title: 'Progress tracking',
    description:
      'See drafts, approvals, scheduled work, and completed assets without rebuilding the status report by hand.',
    icon: <CheckCircle2Icon />
  }
]

const audiences = [
  ['Founders', 'Build visibility with an authentic operator voice while keeping product mentions contextual.'],
  ['Growth teams', 'Connect community research, content review, and execution in one repeatable workflow.'],
  ['Agencies', 'Standardize approvals and campaign operations across multiple client projects.']
]

const dashboardRows = [
  { label: 'Community research', status: 'Ready', width: 'w-[88%]' },
  { label: 'Post & reply drafts', status: '12 in review', width: 'w-[72%]' },
  { label: 'Publishing queue', status: '8 scheduled', width: 'w-[58%]' }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...createWebPageSchema({ path, title, description }),
      '@type': 'Product',
      name: 'GoGlobal.to',
      category: 'Reddit marketing software',
      url: absoluteUrl(path),
      sameAs: 'https://www.goglobal.to/',
      brand: {
        '@type': 'Brand',
        name: 'GoGlobal.to'
      }
    },
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path },
      { name: 'GoGlobal.to', path }
    ]),
    createOrganizationSchema()
  ]
}

const GoGlobalProductPage = () => {
  return (
    <>
      <section className='relative overflow-hidden border-b px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24'>
        <div className='bg-primary/12 absolute -top-24 -left-24 size-96 rounded-full blur-3xl' />
        <div className='bg-muted absolute -right-24 -bottom-32 size-96 rounded-full blur-3xl' />
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] bg-size-[48px_48px]' />

        <div className='relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(34rem,1.08fr)] lg:items-center'>
          <div className='space-y-7'>
            <Badge
              variant='outline'
              className='bg-background/70 h-auto gap-2 rounded-full px-3 py-1 text-sm font-normal backdrop-blur-sm'
            >
              <BotIcon className='size-4' /> A product by the Meridian team
            </Badge>

            <div className='space-y-5'>
              <p className='text-muted-foreground text-sm font-medium tracking-[0.18em] uppercase'>GoGlobal.to</p>
              <h1 className='max-w-4xl text-4xl leading-[1.06] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl'>
                Reddit marketing,
                <span className='text-muted-foreground block'>in one AI workflow.</span>
              </h1>
              <p className='text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg'>
                GoGlobal.to helps founders, growth teams, and agencies research communities, plan campaigns, draft
                Reddit-native content, manage approvals, and track execution without stitching together a dozen tools.
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              <PrimaryFlowButton asChild>
                <Link href='https://www.goglobal.to/' target='_blank' rel='noreferrer'>
                  Explore GoGlobal.to
                  <ExternalLinkIcon />
                </Link>
              </PrimaryFlowButton>
              <SecondaryFlowButton asChild>
                <Link href='https://www.goglobal.to/pricing' target='_blank' rel='noreferrer'>
                  View pricing
                  <ArrowRightIcon />
                </Link>
              </SecondaryFlowButton>
            </div>

            <div className='flex flex-wrap gap-x-6 gap-y-3 pt-1'>
              {['Human approval controls', 'Reddit-specific workflows', 'Built for repeatable execution'].map(item => (
                <div key={item} className='flex items-center gap-2 text-sm'>
                  <CheckCircle2Icon className='size-4' />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-foreground text-background relative overflow-hidden rounded-[2rem] p-3 shadow-2xl shadow-black/10'>
            <div className='border-background/10 bg-background/5 rounded-[1.4rem] border p-4 sm:p-6'>
              <div className='border-background/10 flex items-center justify-between border-b pb-4'>
                <div className='flex items-center gap-3'>
                  <div className='bg-background text-foreground flex size-9 items-center justify-center rounded-xl'>
                    <BotIcon className='size-4' />
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Reddit growth workspace</p>
                    <p className='text-background/50 text-xs'>Campaign overview</p>
                  </div>
                </div>
                <span className='border-background/15 bg-background/5 rounded-full border px-2.5 py-1 text-xs'>
                  Live workflow
                </span>
              </div>

              <div className='grid gap-3 py-5 sm:grid-cols-3'>
                {[
                  ['24', 'Communities mapped'],
                  ['19', 'Content assets'],
                  ['08', 'Ready to publish']
                ].map(([value, label]) => (
                  <div key={label} className='border-background/10 bg-background/5 rounded-2xl border p-4'>
                    <p className='text-2xl font-semibold'>{value}</p>
                    <p className='text-background/50 mt-1 text-xs leading-5'>{label}</p>
                  </div>
                ))}
              </div>

              <div className='border-background/10 bg-background/5 rounded-2xl border p-4 sm:p-5'>
                <div className='mb-5 flex items-center justify-between gap-4'>
                  <div>
                    <p className='text-sm font-medium'>Campaign readiness</p>
                    <p className='text-background/50 mt-1 text-xs'>Research → review → publish</p>
                  </div>
                  <p className='text-2xl font-semibold'>76%</p>
                </div>
                <div className='space-y-4'>
                  {dashboardRows.map(row => (
                    <div key={row.label}>
                      <div className='mb-2 flex items-center justify-between gap-3 text-xs'>
                        <span className='text-background/75'>{row.label}</span>
                        <span className='text-background/45'>{row.status}</span>
                      </div>
                      <div className='bg-background/10 h-1.5 overflow-hidden rounded-full'>
                        <div className={`bg-background h-full rounded-full ${row.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='mx-auto max-w-3xl text-center'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              One operating layer
            </Badge>
            <h2 className='mt-5 text-3xl font-semibold tracking-tight sm:text-5xl'>
              From scattered Reddit work to a repeatable system.
            </h2>
            <p className='text-muted-foreground mt-5 text-base leading-7 sm:text-lg'>
              GoGlobal.to connects the work that usually lives across search tabs, spreadsheets, chat threads, and
              publishing calendars.
            </p>
          </div>

          <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {capabilities.map(capability => (
              <div key={capability.title} className='bg-card/70 rounded-2xl border p-6'>
                <div className='bg-primary/10 mb-5 flex size-10 items-center justify-center rounded-xl [&>svg]:size-4'>
                  {capability.icon}
                </div>
                <h3 className='text-lg font-semibold'>{capability.title}</h3>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start'>
          <div className='space-y-5 lg:sticky lg:top-24'>
            <Badge variant='outline' className='h-auto px-3 py-1 text-sm font-normal'>
              How it works
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
              Strategy and execution stay connected.
            </h2>
            <p className='text-muted-foreground max-w-xl text-base leading-7'>
              Each step preserves the context from the one before it, so the final content reflects the campaign goal,
              subreddit norms, and human review decisions.
            </p>
          </div>

          <div className='space-y-4'>
            {workflow.map(item => (
              <div
                key={item.step}
                className='bg-card/70 grid gap-5 rounded-2xl border p-5 sm:grid-cols-[auto_1fr] sm:p-6'
              >
                <div className='flex items-center gap-3 sm:flex-col'>
                  <span className='text-muted-foreground text-xs font-medium'>{item.step}</span>
                  <div className='bg-primary/10 flex size-10 items-center justify-center rounded-xl [&>svg]:size-4'>
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-muted-foreground mt-2 text-sm leading-6'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='grid gap-5 lg:grid-cols-3'>
            {audiences.map(([name, copy]) => (
              <div key={name} className='bg-card/70 rounded-2xl border p-6'>
                <p className='text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase'>Built for</p>
                <h3 className='mt-4 text-2xl font-semibold'>{name}</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-6'>{copy}</p>
              </div>
            ))}
          </div>

          <div className='bg-foreground text-background relative mt-10 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12'>
            <div className='bg-background/10 absolute -top-20 -right-16 size-64 rounded-full blur-3xl' />
            <div className='relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-2xl'>
                <p className='text-background/55 text-sm font-medium tracking-[0.16em] uppercase'>GoGlobal.to</p>
                <h2 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'>
                  Build a safer, clearer Reddit growth workflow.
                </h2>
                <p className='text-background/60 mt-4 leading-7'>
                  Explore the product, create your first campaign, and keep a human decision between AI assistance and
                  every public interaction.
                </p>
              </div>
              <PrimaryFlowButton
                className='shrink-0 [--primary-foreground:var(--foreground)] [--primary:var(--background)]'
                asChild
              >
                <Link href='https://www.goglobal.to/' target='_blank' rel='noreferrer'>
                  Visit GoGlobal.to
                  <ExternalLinkIcon />
                </Link>
              </PrimaryFlowButton>
            </div>
          </div>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default GoGlobalProductPage
