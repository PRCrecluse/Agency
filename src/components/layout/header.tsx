'use client'

import { useEffect, useState } from 'react'

import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation } from '@/components/layout/header-navigation'

import FlowLogo from '@/assets/svg/flow-logo'

import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

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

  const bookCallButtonClassName =
    'rounded-lg border border-zinc-300/80 bg-zinc-700 px-6 text-base font-medium text-white shadow-none hover:bg-zinc-600 dark:border-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300'

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
        <Link href='/#home'>
          <div className='flex items-center gap-3'>
            <FlowLogo className='size-8' />
            <span className='text-xl font-semibold max-[430px]:hidden'>Meridian</span>
          </div>
        </Link>

        {/* Navigation */}
        <HeaderNavigation
          navigationData={navigationData}
          navigationClassName='[&_[data-slot="navigation-menu-list"]]:gap-1'
        />

        {/* Actions */}
        <div className='flex gap-4 sm:gap-6'>
          <ModeToggle />

          <Button className={cn('max-sm:hidden', bookCallButtonClassName)} asChild>
            <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
              Book a call
            </Link>
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className={cn('size-10 rounded-lg px-0 sm:hidden', bookCallButtonClassName)} asChild>
                <Link href='https://cal.com/team/meridian-growth' target='_blank' rel='noreferrer'>
                  <ExternalLinkIcon />
                  <span className='sr-only'>Book a call</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Book a call</TooltipContent>
          </Tooltip>

          <HeaderNavigationSmallScreen
            triggerClassName='**:data-[slot=sheet-trigger]:size-10 **:data-[slot=sheet-trigger]:px-0'
            navigationData={navigationData}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
