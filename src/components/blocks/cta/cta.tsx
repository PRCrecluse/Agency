'use client'

import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

import LogoVector from '@/assets/svg/logo-vector'
import DottedSheet from '@/assets/svg/dotted-sheet'

const CTASection = () => {
  return (
    <section id='cta' className='relative z-1 pt-16 pb-16 sm:pt-32 sm:pb-16 lg:pt-48 lg:pb-24'>
      <div className='bg-background mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Card className='dark:bg-muted bg-primary relative overflow-hidden rounded-3xl border-none pt-20 pb-32 text-center shadow-2xl max-sm:pt-10 max-sm:pb-15'>
          <CardContent className='px-6'>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center gap-4'
            >
              <h2 className='dark:text-foreground text-2xl font-semibold text-white md:text-3xl lg:text-4xl'>
                Take Control of Your Sales Pipeline
              </h2>

              <p className='dark:text-muted-foreground w-full text-xl text-white/80 lg:max-w-2xl'>
                Join Meridian and get a complete overview of your users, sales, and performance - all from one powerful
                dashboard.
              </p>
            </MotionPreset>
            <MotionPreset
              className='absolute bottom-0 left-0 text-[#F4F4F5]/10'
              fade
              slide
              transition={{ duration: 0.5 }}
            >
              <LogoVector className='max-lg:hidden' />
            </MotionPreset>

            <MotionPreset
              className='absolute right-0 bottom-0 text-[#F4F4F5]/10'
              fade
              slide={{ direction: 'right' }}
              transition={{ duration: 0.5 }}
            >
              <LogoVector className='rotate-y-180 max-lg:hidden' />
            </MotionPreset>
          </CardContent>
        </Card>

        <MotionPreset fade blur zoom={{ initialScale: 0.95 }} delay={0.6} transition={{ duration: 0.4 }}>
          <div className='border-primary dark:border-primary/70 bg-background relative mx-auto -mt-9.25 flex size-fit w-full max-w-lg justify-center rounded-xl border-2 p-2'>
            <Button
              className='rounded-lg border border-zinc-300/80 bg-zinc-700 px-6 text-base font-medium text-white shadow-none hover:bg-zinc-600 dark:border-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300'
              asChild
            >
              <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                Book a call
              </Link>
            </Button>
          </div>
        </MotionPreset>
      </div>

      <DottedSheet className='pointer-events-none absolute inset-x-0 -z-1 mx-auto w-full max-w-7xl px-4 max-sm:-top-1/2 sm:bottom-1/4 sm:px-6 lg:px-8' />
    </section>
  )
}

export default CTASection
