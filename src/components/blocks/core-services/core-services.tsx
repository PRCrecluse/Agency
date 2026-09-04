import Link from 'next/link'
import { ArrowUpRightIcon, MessageSquareIcon, SearchIcon, SparklesIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const services = [
  {
    title: 'B2B SaaS SEO',
    description:
      'Connect technical SEO, keyword strategy, high-intent pages, content, and authority building around qualified organic demand.',
    href: '/services/seo-services',
    linkLabel: 'Explore SEO services',
    icon: SearchIcon
  },
  {
    title: 'AI SEO & GEO',
    description:
      'Improve how your brand is understood, retrieved, cited, and recommended across AI search and answer engines.',
    href: '/services/geo-services',
    linkLabel: 'Explore AI SEO & GEO',
    icon: SparklesIcon
  },
  {
    title: 'Reddit Marketing',
    description:
      'Build demand through Reddit-native community participation, brand community management, and campaign execution.',
    href: '/services/reddit-services',
    linkLabel: 'Explore Reddit services',
    icon: MessageSquareIcon
  }
] as const

const CoreServices = () => {
  return (
    <section aria-labelledby='core-services-title' className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <p className='text-primary text-sm font-medium tracking-[0.2em] uppercase'>Core services</p>
          <h2 id='core-services-title' className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            Three Organic Growth Systems, One Clear Path to Demand
          </h2>
          <p className='text-muted-foreground text-base leading-7 sm:text-lg'>
            Start with the channel closest to your current growth constraint, then connect the work across search,
            communities, and AI discovery.
          </p>
        </div>

        <div className='mt-10 grid gap-5 lg:grid-cols-3'>
          {services.map(service => {
            const Icon = service.icon

            return (
              <Card key={service.href} className='bg-card/85 h-full border shadow-none'>
                <CardContent className='flex h-full flex-col gap-5 p-6'>
                  <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl'>
                    <Icon className='size-5' aria-hidden='true' />
                  </div>
                  <div className='space-y-3'>
                    <h3 className='text-2xl font-semibold'>{service.title}</h3>
                    <p className='text-muted-foreground text-sm leading-6 sm:text-base'>{service.description}</p>
                  </div>
                  <Link
                    href={service.href}
                    className='text-primary mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium underline-offset-4 hover:underline'
                  >
                    {service.linkLabel}
                    <ArrowUpRightIcon className='size-4' aria-hidden='true' />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CoreServices
