'use client'

import { useEffect, useState } from 'react'

import { LanguagesIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { getQueryLang, withQueryLang } from '@/lib/language'

const LanguageToggle = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [currentHref, setCurrentHref] = useState(pathname)
  const [currentLang, setCurrentLang] = useState<'en' | 'zh'>('en')
  const [hash, setHash] = useState('')

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
    const syncLanguageState = () => {
      const search = window.location.search
      const nextHref = `${pathname}${search}${hash}`
      const nextLang = getQueryLang(new URLSearchParams(search).get('lang'))

      setCurrentHref(previousHref => (previousHref === nextHref ? previousHref : nextHref))
      setCurrentLang(previousLang => (previousLang === nextLang ? previousLang : nextLang))
    }

    const originalPushState = window.history.pushState.bind(window.history)
    const originalReplaceState = window.history.replaceState.bind(window.history)

    window.history.pushState = function (...args) {
      originalPushState(...args)
      syncLanguageState()
    }

    window.history.replaceState = function (...args) {
      originalReplaceState(...args)
      syncLanguageState()
    }

    window.addEventListener('popstate', syncLanguageState)
    syncLanguageState()

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('popstate', syncLanguageState)
    }
  }, [hash, pathname])

  const handleLanguageChange = (nextLang: 'en' | 'zh') => {
    const nextHref = withQueryLang(currentHref, nextLang)

    if (nextHref === currentHref) {
      return
    }

    setCurrentHref(nextHref)
    setCurrentLang(nextLang)
    router.push(nextHref, { scroll: false })
  }

  return (
    <div className='flex h-10 items-center gap-1 rounded-lg border bg-background/80 p-1 backdrop-blur-sm'>
      <div className='text-muted-foreground flex size-8 items-center justify-center'>
        <LanguagesIcon className='size-4' />
        <span className='sr-only'>Switch language</span>
      </div>

      <button
        type='button'
        aria-pressed={currentLang === 'en'}
        onClick={() => handleLanguageChange('en')}
        className={cn(
          'rounded-md px-2.5 py-1 text-sm font-medium transition-colors',
          currentLang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>

      <button
        type='button'
        aria-pressed={currentLang === 'zh'}
        onClick={() => handleLanguageChange('zh')}
        className={cn(
          'rounded-md px-2.5 py-1 text-sm font-medium transition-colors',
          currentLang === 'zh' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        中
      </button>
    </div>
  )
}

export { LanguageToggle }
