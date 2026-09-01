'use client'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'
import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import SectionSeparator from '@/components/section-separator'

const Footer = () => {
  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24 lg:px-8'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <Link href='/#home'>
            <Logo />
          </Link>
          <p className='text-muted-foreground'>
            Meridian helps SaaS and AI companies grow through technical SEO, programmatic SEO, Reddit strategy, GEO,
            and AI-native demand systems.
          </p>
          <Separator className='w-35!' />
          <div className='flex items-center gap-4'>
            <Link href='https://x.com/Yiwei_growth' target='_blank' rel='noreferrer' aria-label='X Link'>
              <TwitterIcon className='text-muted-foreground hover:text-foreground size-5' />
            </Link>
            <Link
              href='https://www.youtube.com/@Goglobal.to_SaaS'
              target='_blank'
              rel='noreferrer'
              aria-label='YouTube Link'
            >
              <YoutubeIcon className='text-muted-foreground hover:text-foreground size-5' />
            </Link>
          </div>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Company</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href='/about' className='hover:text-foreground transition-colors duration-300'>
                  About
                </Link>
              </li>
              <li>
                <Link href='/#testimonials' className='hover:text-foreground transition-colors duration-300'>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href='/services' className='hover:text-foreground transition-colors duration-300'>
                  Services
                </Link>
              </li>
              <li>
                <Link href='/blog' className='hover:text-foreground transition-colors duration-300'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Legal</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href='/terms-conditions' className='hover:text-foreground transition-colors duration-300'>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href='/privacy-policy' className='hover:text-foreground transition-colors duration-300'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Tools</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href='/utm-builder' className='hover:text-foreground transition-colors duration-300'>
                  UTM Builder
                </Link>
              </li>
              <li>
                <Link href='/twitter-monitor' className='hover:text-foreground transition-colors duration-300'>
                  X Post Monitor
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-muted-foreground text-center text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <Link className='text-foreground font-medium hover:underline' href='/#home'>
            Meridian
          </Link>{' '}
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
