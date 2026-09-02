'use client'

import { ArrowUpRightIcon } from 'lucide-react'

import BookingLink from '@/components/analytics/booking-link'
import { Badge } from '@/components/ui/badge'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { MotionPreset } from '@/components/ui/motion-preset'
import { PrimaryFlowButton } from '@/components/ui/flow-button'

const HeroSection = () => {
  return (
    <section id='home' className='relative px-4 py-8 max-sm:pb-42 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
      <BackgroundRippleEffect />
      <div className='pointer-events-none absolute inset-x-0 top-0 z-5 h-128 bg-[radial-gradient(transparent_20%,var(--background)_90%)]' />
      <div className='space-y-12 sm:space-y-16 lg:space-y-24'>
        <div className='flex flex-col items-center gap-4'>
          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            className='z-10'
          >
            <Badge variant='outline' className='bg-background h-auto text-sm font-normal'>
              SEO · Reddit · GEO for SaaS and AI companies
            </Badge>
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.2}
            component='h1'
            className='z-10 text-center text-3xl font-semibold md:text-4xl lg:text-5xl lg:leading-[1.29167]'
          >
            AI Growth Agency for SaaS and AI Companies
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.4}
            component='p'
            className='text-muted-foreground z-10 max-w-156 text-center text-xl'
          >
            Meridian combines technical SEO, programmatic SEO, Reddit growth, and GEO to build durable organic demand
            across search, communities, and AI discovery.
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            inView={false}
            delay={0.6}
            className='z-10'
          >
            <PrimaryFlowButton asChild>
              <BookingLink
                ctaLocation='hero'
                pageType='homepage'
                serviceType='growth_strategy'
                target='_blank'
                rel='noreferrer'
              >
                Book a strategy call
                <ArrowUpRightIcon />
              </BookingLink>
            </PrimaryFlowButton>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
