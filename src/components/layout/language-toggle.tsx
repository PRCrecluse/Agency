'use client'

import { useEffect, useRef, useState } from 'react'

import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { SiteLang } from '@/lib/language'
<<<<<<< HEAD
import { getLanguageAlternateHref, getLocalizedPath } from '@/lib/language'
=======
import { getLanguageAlternateHref } from '@/lib/language'
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7

const languageOptions: { value: SiteLang; label: string; shortLabel: string }[] = [
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'zh', label: '中文', shortLabel: '中文' }
]

const LanguageToggle = ({
<<<<<<< HEAD
  lang: currentLang,
  translatedBlogSlugs
}: {
  lang: SiteLang
  translatedBlogSlugs: string[]
=======
  translatedBlogSlugs,
  currentLang
}: {
  translatedBlogSlugs: string[]
  currentLang: SiteLang
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hash, setHash] = useState('')
  const [open, setOpen] = useState(false)
  const search = searchParams.toString()
<<<<<<< HEAD
  const currentHref = `${getLocalizedPath(pathname, currentLang)}${search ? `?${search}` : ''}${hash}`
=======
  const currentHref = `${pathname}${search ? `?${search}` : ''}${hash}`
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
  const translatedSlugs = new Set(translatedBlogSlugs)
  const alternateHref = getLanguageAlternateHref(currentHref, currentLang === 'zh' ? 'en' : 'zh', translatedSlugs)

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash)
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => {
      window.removeEventListener('hashchange', syncHash)
    }
  }, [pathname, search])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleLanguageChange = (nextLang: SiteLang) => {
    const nextHref = getLanguageAlternateHref(currentHref, nextLang, translatedSlugs)

    setOpen(false)

    if (!nextHref || nextHref === currentHref) {
      return
    }

    window.location.assign(nextHref)
  }

  if (!alternateHref) {
    return null
  }

  return (
    <div ref={containerRef} className='relative shrink-0'>
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label={currentLang === 'zh' ? '切换语言' : 'Switch language'}
        onClick={() => setOpen(previousOpen => !previousOpen)}
<<<<<<< HEAD
        className='bg-background/80 hover:bg-background flex h-10 shrink-0 items-center gap-1 rounded-lg border px-2 text-sm font-medium whitespace-nowrap backdrop-blur-sm transition-colors sm:gap-2 sm:px-3'
=======
        className='bg-background/80 hover:bg-background flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium backdrop-blur-sm transition-colors'
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
      >
        <LanguagesIcon className='text-muted-foreground hidden size-4 sm:block' />
        <span>{languageOptions.find(option => option.value === currentLang)?.shortLabel ?? 'EN'}</span>
        <ChevronDownIcon className={cn('text-muted-foreground size-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
<<<<<<< HEAD
        <div
          role='menu'
          aria-label={currentLang === 'zh' ? '选择语言' : 'Choose language'}
          className='bg-background/95 absolute top-full left-0 z-50 mt-2 min-w-36 rounded-xl border p-1 shadow-lg backdrop-blur-sm sm:right-0 sm:left-auto'
        >
=======
        <div className='bg-background/95 absolute top-full right-0 z-50 mt-2 min-w-36 rounded-xl border p-1 shadow-lg backdrop-blur-sm'>
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
          {languageOptions.map(option => (
            <button
              key={option.value}
              type='button'
              role='menuitem'
              lang={option.value === 'zh' ? 'zh-CN' : 'en'}
              onClick={() => handleLanguageChange(option.value)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                option.value === currentLang
                  ? 'bg-primary/10 text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <span>{option.label}</span>
              {option.value === currentLang ? <CheckIcon className='text-primary size-4' /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { LanguageToggle }
