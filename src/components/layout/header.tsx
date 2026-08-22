'use client'

import { Suspense, useEffect, useState } from 'react'

import { ArrowUpRightIcon, ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation } from '@/components/layout/header-navigation'

import FlowLogo from '@/assets/svg/flow-logo'

import type { QueryLang } from '@/lib/language'
import { getQueryLang, withQueryLang } from '@/lib/language'
import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const DesktopNavigationFallback = () => <div aria-hidden='true' className='hidden h-10 w-[22rem] lg:block' />

const HeaderActionFallback = ({ className = '' }: { className?: string }) => <div aria-hidden='true' className={className} />

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState<QueryLang>('en')

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

  useEffect(() => {
    const syncCurrentLang = () => {
      const nextLang = getQueryLang(new URLSearchParams(window.location.search).get('lang'))

      setCurrentLang(previousLang => (previousLang === nextLang ? previousLang : nextLang))
    }

    const originalPushState = window.history.pushState.bind(window.history)
    const originalReplaceState = window.history.replaceState.bind(window.history)

    window.history.pushState = function (...args) {
      originalPushState(...args)
      syncCurrentLang()
    }

    window.history.replaceState = function (...args) {
      originalReplaceState(...args)
      syncCurrentLang()
    }

    window.addEventListener('popstate', syncCurrentLang)
    syncCurrentLang()

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('popstate', syncCurrentLang)
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
      <div className='flex h-full items-center justify-between gap-4 border-b px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href={withQueryLang('/#home', currentLang)}>
          <div className='flex items-center gap-3'>
            <FlowLogo className='size-8' />
            <span className='text-xl font-semibold max-[430px]:hidden'>Meridian</span>
          </div>
        </Link>

        {/* Navigation */}
        <Suspense fallback={<DesktopNavigationFallback />}>
          <HeaderNavigation
            currentLang={currentLang}
            navigationData={navigationData}
            navigationClassName='[&_[data-slot="navigation-menu-list"]]:gap-1'
          />
        </Suspense>

        {/* Actions */}
        <div className='flex items-center gap-2 sm:gap-4'>
          <Suspense fallback={<HeaderActionFallback className='h-10 w-[93px] rounded-lg border bg-background/80' />}>
            <LanguageToggle />
          </Suspense>
          <ModeToggle />

          <PrimaryFlowButton className='max-sm:hidden' asChild>
            <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
              Book a call
              <ArrowUpRightIcon />
            </Link>
          </PrimaryFlowButton>

          <Tooltip>
            <TooltipTrigger asChild>
              <PrimaryFlowButton className='sm:hidden [&_[data-slot=button]]:size-10 [&_[data-slot=button]]:px-0' asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  <ExternalLinkIcon />
                  <span className='sr-only'>Book a call</span>
                </Link>
              </PrimaryFlowButton>
            </TooltipTrigger>
            <TooltipContent>Book a call</TooltipContent>
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
