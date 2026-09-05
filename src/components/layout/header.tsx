'use client'

import { Suspense, useEffect, useState } from 'react'

import { ArrowUpRightIcon, ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import BookingLink from '@/components/analytics/booking-link'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation } from '@/components/layout/header-navigation'

import FlowLogo from '@/assets/svg/flow-logo'

import { toLocalizedHref, type SiteLang } from '@/lib/language'
import { cn } from '@/lib/utils'

type HeaderProps = {
  lang: SiteLang
  navigationData: Navigation[]
  translatedBlogSlugs: string[]
  currentLang: SiteLang
  className?: string
}

const DesktopNavigationFallback = () => <div aria-hidden='true' className='hidden h-10 w-[22rem] lg:block' />

const HeaderActionFallback = ({ className = '' }: { className?: string }) => (
  <div aria-hidden='true' className={className} />
)

<<<<<<< HEAD
const Header = ({ lang: currentLang, navigationData, translatedBlogSlugs, className }: HeaderProps) => {
=======
const Header = ({ navigationData, translatedBlogSlugs, currentLang, className }: HeaderProps) => {
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full transition-all duration-300',
        {
          'bg-card/75 backdrop-blur-sm': isScrolled
        },
        className
      )}
    >
      <div className='flex h-full items-center justify-between gap-2 border-b px-4 sm:gap-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href={toLocalizedHref('/#home', currentLang)}>
          <div className='flex items-center gap-3'>
            <FlowLogo className='size-8' />
            <span className='text-xl font-semibold max-[430px]:hidden'>Meridian</span>
          </div>
        </Link>

        {/* Navigation */}
        <Suspense fallback={<DesktopNavigationFallback />}>
          <HeaderNavigation
            key={`${pathname}:${currentLang}`}
            currentLang={currentLang}
            navigationData={navigationData}
            navigationClassName='[&_[data-slot="navigation-menu-list"]]:gap-1'
          />
        </Suspense>

        {/* Actions */}
        <div className='flex items-center gap-2 sm:gap-4'>
          <Suspense fallback={<HeaderActionFallback className='bg-background/80 h-10 w-[93px] rounded-lg border' />}>
<<<<<<< HEAD
            <LanguageToggle lang={currentLang} translatedBlogSlugs={translatedBlogSlugs} />
=======
            <LanguageToggle translatedBlogSlugs={translatedBlogSlugs} currentLang={currentLang} />
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
          </Suspense>
          <ModeToggle lang={currentLang} />

          <PrimaryFlowButton className='max-sm:hidden' asChild>
            <BookingLink ctaLocation='header_desktop' language={currentLang} target='_blank' rel='noreferrer'>
              {currentLang === 'zh' ? '预约咨询' : 'Book a call'}
              <ArrowUpRightIcon />
            </BookingLink>
          </PrimaryFlowButton>

          <Tooltip>
            <TooltipTrigger asChild>
<<<<<<< HEAD
              <PrimaryFlowButton className='**:data-[slot=button]:size-10 **:data-[slot=button]:px-0 sm:hidden' asChild>
                <BookingLink
                  className='size-10! p-0!'
                  ctaLocation='header_mobile'
                  language={currentLang}
                  target='_blank'
                  rel='noreferrer'
                >
=======
              <PrimaryFlowButton
                className='sm:hidden [&_[data-slot=button]]:size-10 [&_[data-slot=button]]:px-0'
                asChild
              >
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
                  <ExternalLinkIcon />
                  <span className='sr-only'>{currentLang === 'zh' ? '预约咨询' : 'Book a call'}</span>
                </BookingLink>
              </PrimaryFlowButton>
            </TooltipTrigger>
            <TooltipContent>{currentLang === 'zh' ? '预约咨询' : 'Book a call'}</TooltipContent>
          </Tooltip>

          <Suspense fallback={<HeaderActionFallback className='inline-flex h-10 w-10 rounded-lg border lg:hidden' />}>
            <HeaderNavigationSmallScreen
              currentLang={currentLang}
              triggerClassName='**:data-[slot=sheet-trigger]:size-10 **:data-[slot=sheet-trigger]:px-0'
              navigationData={navigationData}
            />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export default Header
