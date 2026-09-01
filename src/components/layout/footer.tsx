'use client'

import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'
import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import SectionSeparator from '@/components/section-separator'

const footerBrandLogos = [
  { src: '/images/brand-logos/amazon.webp', alt: 'Amazon' },
  { src: '/images/brand-logos/microsoft.webp', alt: 'Microsoft' },
  { src: '/images/brand-logos/hubspot.webp', alt: 'HubSpot' },
  { src: '/images/brand-logos/deloitte.webp', alt: 'Deloitte' },
  { src: '/images/brand-logos/evernote.webp', alt: 'Evernote' },
  { src: '/images/brand-logos/fedex.webp', alt: 'FedEx' }
]

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
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-5 lg:col-span-4 lg:gap-8'>
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
          <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
            <div>
              <p className='mb-3 text-lg font-medium'>Subscribe to newsletter</p>
              <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
                <Input name='newsletter-email' type='email' placeholder='Your email...' required />
                <PrimaryFlowButton
                  type='submit'
                  className='shrink-0 **:data-[slot=button]:size-9 **:data-[slot=button]:px-0'
                  aria-label='Newsletter submit button'
                >
                  <ArrowRightIcon />
                </PrimaryFlowButton>
              </form>
            </div>
            <Separator />

            <div className='flex flex-wrap items-center justify-center gap-x-5 gap-y-3'>
              {footerBrandLogos.map(logo => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className='h-6 w-auto max-w-24 object-contain opacity-95'
                  loading='lazy'
                />
              ))}
            </div>
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
          All rights reserved | Built to empower product teams worldwide.
        </p>
      </div>
    </footer>
  )
}

export default Footer
