import {
  ActivityIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  Clock3Icon,
  EyeIcon,
  ExternalLinkIcon,
  GaugeIcon,
  Link2Icon,
  MousePointerClickIcon,
  ShieldCheckIcon,
  TargetIcon,
  TrendingUpIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const metrics = [
  {
    title: 'Impressions',
    description: 'See the latest view or impression total when that field is available for the post.',
    icon: EyeIcon
  },
  {
    title: 'Engagements',
    description: 'Track the reported total, or the available likes, reposts, replies, quotes, and bookmarks.',
    icon: TrendingUpIcon
  },
  {
    title: 'Link clicks',
    description: 'Monitor outbound link clicks when the data source exposes this post-level metric.',
    icon: MousePointerClickIcon
  },
  {
    title: 'Engagement rate',
    description: 'Compare engagements with impressions to understand response—not just raw reach.',
    icon: GaugeIcon
  }
]

const steps = [
  {
    title: 'Paste the post URL',
    body: 'Use a supported public x.com or twitter.com status URL. No X account connection is required.'
  },
  {
    title: 'Set the monitoring window',
    body: 'Choose a start and end time—up to 30 days—for the campaign, launch, or announcement you want to follow.'
  },
  {
    title: 'Choose a collection frequency',
    body: 'Request a new observation every 15, 30, or 60 minutes while the monitor is active.'
  },
  {
    title: 'Review and share the trend',
    body: 'Switch between metrics, refresh on demand, pause collection, and email the current report.'
  }
]

const useCases = [
  {
    title: 'Product launches',
    body: 'See when an announcement gains momentum and how long its reach continues to grow.'
  },
  {
    title: 'Campaign posts',
    body: 'Compare reach, response, and available click data inside a defined promotion window.'
  },
  {
    title: 'Founder updates',
    body: 'Keep a simple time-series record for an important post without connecting the full account.'
  }
]

const limitations = [
  'The dashboard follows one post at a time; it is not an account, follower, or audience analytics suite.',
  'History begins when the monitor collects its first observation, so it cannot recreate earlier time-series data.',
  'X does not expose every metric for every post. Unavailable impressions or link clicks remain clearly marked.',
  'Collection runs only within the selected window and while the monitor remains active.'
]

const faqs = [
  {
    question: 'Is this Twitter analytics tool free?',
    answer:
      'Yes. There is no charge to use this focused post tracker. You provide basic work details to unlock the monitoring dashboard.'
  },
  {
    question: 'Do I need to connect my Twitter or X account?',
    answer:
      'No. Paste a supported public X or Twitter post URL. The tool does not ask for your X password or require an account connection.'
  },
  {
    question: 'What Twitter post metrics can I track?',
    answer:
      'The dashboard stores impressions, engagements, and link clicks when the source exposes them. It also calculates engagement rate when both impressions and engagements are available.'
  },
  {
    question: 'How often does the Twitter monitor update?',
    answer:
      'You can select a 15, 30, or 60 minute collection frequency and request a manual refresh. Actual observations are saved only while the monitor is active and inside its date range.'
  },
  {
    question: 'Can it show analytics from before I started monitoring?',
    answer:
      'It can save the current totals at the first successful collection, but it cannot reconstruct how those totals changed before monitoring began.'
  },
  {
    question: 'Why does the page use both Twitter and X?',
    answer:
      'X is the platform’s current name, while many marketers still search for Twitter analytics, tweet analytics, and Twitter post trackers. Both names refer to the same supported post URLs here.'
  }
]

const TwitterMonitorGuide = () => (
  <div className='border-t'>
    <section className='px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start'>
        <div>
          <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
            <ActivityIcon className='size-3.5' /> Post-level analytics
          </Badge>
          <h2 className='max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            A focused Twitter analytics dashboard for one post
          </h2>
          <p className='text-muted-foreground mt-5 max-w-3xl text-base leading-8 sm:text-lg'>
            Account analytics answer broad questions. This tracker is built for one public X post that matters: it saves
            repeated snapshots during a custom window so you can see how reach and response change over time.
          </p>
        </div>

        <Card className='bg-muted/35 gap-0 shadow-none'>
          <CardContent className='p-6 sm:p-7'>
            <div className='bg-background mb-5 flex size-11 items-center justify-center rounded-xl border shadow-sm'>
              <TargetIcon className='size-5' />
            </div>
            <h3 className='text-xl font-semibold'>Built for a defined campaign window</h3>
            <p className='text-muted-foreground mt-3 leading-7'>
              Start before a launch, stop after the campaign, and keep a single clean history instead of mixing data
              from unrelated posts.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section className='bg-muted/20 border-y px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Twitter post analytics you can follow</h2>
          <p className='text-muted-foreground mt-4 text-base leading-7 sm:text-lg'>
            Each successful collection adds a timestamped observation. Metric availability depends on what X returns for
            the individual post, so missing values are never replaced with estimates.
          </p>
          <a
            href='https://business.x.com/en/help/campaign-measurement-and-analytics/tweet-activity-dashboard'
            target='_blank'
            rel='noreferrer'
            className='mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline'
          >
            Review X&apos;s post metric definitions
            <ExternalLinkIcon className='size-4' />
          </a>
        </div>
        <div className='mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {metrics.map(metric => (
            <Card key={metric.title} className='gap-0 shadow-sm'>
              <CardContent className='p-6'>
                <span className='bg-muted mb-5 flex size-10 items-center justify-center rounded-lg border'>
                  <metric.icon className='size-4' />
                </span>
                <h3 className='font-semibold'>{metric.title}</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-6'>{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className='bg-foreground text-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>How to track a Twitter or X post</h2>
          <p className='text-background/65 mt-4 text-base leading-7 sm:text-lg'>
            Set up the monitor in four steps, then let the dashboard turn separate snapshots into one traffic trend.
          </p>
        </div>
        <div className='mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div key={step.title} className='bg-foreground p-6'>
              <span className='text-background/45 font-mono text-sm'>0{index + 1}</span>
              <h3 className='mt-8 text-lg font-semibold'>{step.title}</h3>
              <p className='text-background/65 mt-3 text-sm leading-6'>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-2'>
        <div>
          <div className='mb-5 flex items-center gap-3'>
            <span className='bg-muted flex size-11 items-center justify-center rounded-xl border'>
              <BarChart3Icon className='size-5' />
            </span>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>When a post tracker is useful</h2>
          </div>
          <div className='mt-8 grid gap-4'>
            {useCases.map(useCase => (
              <Card key={useCase.title} className='gap-0 shadow-none'>
                <CardContent className='flex gap-4 p-5'>
                  <CheckCircle2Icon className='mt-0.5 size-5 shrink-0' />
                  <div>
                    <h3 className='font-semibold'>{useCase.title}</h3>
                    <p className='text-muted-foreground mt-2 text-sm leading-6'>{useCase.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className='mb-5 flex items-center gap-3'>
            <span className='bg-muted flex size-11 items-center justify-center rounded-xl border'>
              <ShieldCheckIcon className='size-5' />
            </span>
            <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>What the monitor does not claim</h2>
          </div>
          <Card className='mt-8 gap-0 shadow-sm'>
            <CardContent className='divide-y p-0'>
              {limitations.map(limitation => (
                <div key={limitation} className='flex gap-3 px-5 py-4 sm:px-6'>
                  <Link2Icon className='text-muted-foreground mt-1 size-4 shrink-0' />
                  <p className='text-muted-foreground leading-7'>{limitation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section className='bg-muted/20 border-t px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]'>
        <div>
          <Badge variant='outline' className='mb-5 gap-1.5 rounded-full px-3 py-1'>
            <Clock3Icon className='size-3.5' /> Twitter analytics FAQ
          </Badge>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Common post-tracking questions</h2>
          <p className='text-muted-foreground mt-4 leading-7'>
            What the dashboard collects, how often it updates, and where its data boundaries are.
          </p>
        </div>
        <div className='divide-y border-y'>
          {faqs.map(faq => (
            <details key={faq.question} className='group py-5 first:pt-0 last:pb-0'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden'>
                {faq.question}
                <span className='text-muted-foreground text-xl font-normal transition-transform group-open:rotate-45'>
                  +
                </span>
              </summary>
              <p className='text-muted-foreground max-w-3xl pt-3 leading-7'>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default TwitterMonitorGuide
