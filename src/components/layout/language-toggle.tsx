'use client'

import { useEffect, useRef, useState } from 'react'

import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { QueryLang } from '@/lib/language'
import { getQueryLang, withQueryLang } from '@/lib/language'

const languageOptions: { value: QueryLang; label: string; shortLabel: string }[] = [
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'zh', label: '中文', shortLabel: '中' }
]

const LanguageToggle = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hash, setHash] = useState('')
  const [open, setOpen] = useState(false)
  const search = searchParams.toString()
  const currentHref = `${pathname}${search ? `?${search}` : ''}${hash}`
  const currentLang: QueryLang = pathname.startsWith('/zh/') ? 'zh' : getQueryLang(searchParams.get('lang'))

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash)
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => {
      window.removeEventListener('hashchange', syncHash)
    }
  }, [])

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

  const handleLanguageChange = (nextLang: QueryLang) => {
    const nextHref = withQueryLang(currentHref, nextLang)

    setOpen(false)

    if (nextHref === currentHref) {
      return
    }

    router.push(nextHref, { scroll: false })
  }

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='menu'
        onClick={() => setOpen(previousOpen => !previousOpen)}
        className='flex h-10 items-center gap-2 rounded-lg border bg-background/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-background'
      >
        <LanguagesIcon className='text-muted-foreground size-4' />
        <span>{languageOptions.find(option => option.value === currentLang)?.shortLabel ?? 'EN'}</span>
        <ChevronDownIcon className={cn('text-muted-foreground size-4 transition-transform', open && 'rotate-180')} />
        <span className='sr-only'>Switch language</span>
      </button>

      {open ? (
        <div className='absolute right-0 top-full z-50 mt-2 min-w-36 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur-sm'>
          {languageOptions.map(option => (
            <button
              key={option.value}
              type='button'
              role='menuitem'
              onClick={() => handleLanguageChange(option.value)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                option.value === currentLang ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
