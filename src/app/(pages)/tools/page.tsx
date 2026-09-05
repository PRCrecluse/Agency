import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowUpRightIcon, BotIcon, ChartNoAxesCombinedIcon, Link2Icon, WrenchIcon } from 'lucide-react'

import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Free SEO & Marketing Tools | Meridian',
  description: 'Explore Meridian’s free tools for SEO prompts, campaign URL tracking, and X post monitoring.',
  path: '/tools',
  keywords: ['free marketing tools', 'seo tools', 'utm builder', 'seo prompt library', 'x post monitor']
})

const tools = [
  {
    title: 'SEO Prompt Library',
    description: 'Copy execution-ready prompts for research, content, technical SEO, and reporting.',
    href: '/seo-prompts',
    icon: BotIcon,
    label: 'SEO & content'
  },
  {
    title: 'UTM Builder',
    description: 'Create clean campaign tracking URLs for analytics, social, email, and paid media.',
    href: '/utm-builder',
    icon: Link2Icon,
    label: 'Campaign tracking'
  },
  {
    title: 'X Post Traffic Monitor',
    description: 'Track the traffic performance of a single X post over a selected time window.',
    href: '/twitter-monitor',
    icon: ChartNoAxesCombinedIcon,
    label: 'Social analytics'
  }
]

const ToolsPage = () => {
  return (
    <>
      <section className='relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='bg-primary/10 absolute top-0 left-1/3 -z-10 size-80 rounded-full blur-3xl' />
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl'>
            <div className='bg-background text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm'>
              <WrenchIcon className='size-4' />
              Free tools
            </div>
            <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
              Practical tools for modern growth teams.
            </h1>
            <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-8 text-pretty'>
              Plan, track, and improve your growth work with focused utilities built by Meridian.
            </p>
          </div>
        </div>
      </section>

      <section className='border-t px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-3'>
          {tools.map(tool => {
            const Icon = tool.icon

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className='group bg-card hover:border-foreground/25 hover:shadow-primary/5 flex min-h-72 flex-col rounded-3xl border p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7'
              >
                <div className='flex items-start justify-between gap-4'>
                  <span className='bg-muted flex size-12 items-center justify-center rounded-2xl border'>
                    <Icon className='size-5' />
                  </span>
                  <ArrowUpRightIcon className='text-muted-foreground size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                </div>
                <div className='mt-auto pt-12'>
                  <p className='text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase'>{tool.label}</p>
                  <h2 className='mt-2 text-2xl font-semibold tracking-tight'>{tool.title}</h2>
                  <p className='text-muted-foreground mt-3 leading-7'>{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ToolsPage
