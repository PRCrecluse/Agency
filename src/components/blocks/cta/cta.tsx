'use client'

import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'
import { PrimaryFlowButton } from '@/components/ui/flow-button'

import LogoVector from '@/assets/svg/logo-vector'
import DottedSheet from '@/assets/svg/dotted-sheet'

const CTASection = () => {
  return (
    <section id='cta' className='relative z-1 pt-16 pb-16 sm:pt-32 sm:pb-16 lg:pt-48 lg:pb-24'>
      <div className='bg-background mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Card className='relative overflow-hidden rounded-3xl border-none bg-[#EEE8D7] pt-20 pb-32 text-center shadow-2xl max-sm:pt-10 max-sm:pb-20'>
          <CardContent className='px-6'>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center gap-4'
            >
              <h2 className='text-2xl font-semibold text-zinc-900 md:text-3xl lg:text-4xl'>
                Take Control of Your Sales Pipeline
              </h2>

              <p className='w-full text-xl text-zinc-700 lg:max-w-2xl'>
                Join Meridian and get a complete overview of your users, sales, and performance - all from one powerful
                dashboard.
              </p>
            </MotionPreset>
            <MotionPreset
              fade
              blur
              zoom={{ initialScale: 0.95 }}
              delay={0.6}
              transition={{ duration: 0.4 }}
              className='absolute bottom-8 left-1/2 z-10 -translate-x-1/2'
            >
              <PrimaryFlowButton
                className='shadow-primary/15 ring-primary/50 shadow-xl **:data-[slot=button]:h-12 **:data-[slot=button]:px-7 **:data-[slot=button]:text-base **:data-[slot=button]:font-semibold'
                asChild
              >
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  Book a call
                </Link>
              </PrimaryFlowButton>
            </MotionPreset>
            <MotionPreset
              className='absolute bottom-0 left-0 opacity-100'
              fade
              slide
              transition={{ duration: 0.5 }}
            >
              <LogoVector className='max-lg:hidden' />
            </MotionPreset>

            <MotionPreset
              className='absolute right-0 bottom-0 opacity-100'
              fade
              slide={{ direction: 'right' }}
              transition={{ duration: 0.5 }}
            >
              <LogoVector className='rotate-y-180 max-lg:hidden' />
            </MotionPreset>
          </CardContent>
        </Card>
      </div>

      <DottedSheet className='pointer-events-none absolute inset-x-0 -z-1 mx-auto w-full max-w-7xl px-4 max-sm:-top-1/2 sm:bottom-1/4 sm:px-6 lg:px-8' />
    </section>
  )
}

export default CTASection
