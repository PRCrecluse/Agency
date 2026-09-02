'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import Link from 'next/link'

import { useMedia } from 'react-use'
import { ChevronRightIcon, CircleSmallIcon, MenuIcon } from 'lucide-react'

import { useActiveSection } from '@/hooks/use-active-section'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { SecondaryFlowButton } from '@/components/ui/flow-button'

import Logo from '@/components/logo'

import type { SiteLang } from '@/lib/language'
import { toLocalizedHref } from '@/lib/language'
import { cn } from '@/lib/utils'

type NavigationSection = {
  type: 'section'
  title?: string
  items?: NavigationItem[]
  subSections?: {
    title: string
    items: NavigationItem[]
  }[]
}

type NavigationItem = {
  title: string
  href: string
  icon?: ReactNode
  badge?: ReactNode
  description?: string
  activeMatch?: 'exact' | 'prefix'
}

type Navigation = {
  title: string
  contentClassName?: string
  dropdownClassName?: string
} & (
  | {
      items: NavigationSection[]
      splitItems: true
      href?: never
    }
  | {
      items: NavigationItem[]
      splitItems?: never | false
      href?: never
    }
  | {
      items?: never
      splitItems?: never
      href: string
      activeMatch?: 'exact' | 'prefix'
    }
)

const getSectionIdFromHref = (href: string) => {
  if (href.startsWith('/#')) return href.slice(2)
  if (href.startsWith('#')) return href.slice(1)
  if (href.includes('#')) return href.split('#')[1] ?? ''

  return ''
}

const getBasePathFromHref = (href: string) => href.split('#')[0]?.split('?')[0] ?? ''

const normalizeLocalizedPath = (value?: string | null) => {
  if (!value) return ''

  const normalizedPath = value?.replace(/^\/zh(?=\/|$)/, '') ?? ''

  return normalizedPath || '/'
}

const isHrefActive = ({
  href,
  activeSection,
  pathname,
  activeMatch = 'exact'
}: {
  href: string
  activeSection?: string
  pathname?: string | null
  activeMatch?: 'exact' | 'prefix'
}) => {
  const sectionId = getSectionIdFromHref(href)
  const basePath = normalizeLocalizedPath(getBasePathFromHref(href))
  const currentPathname = normalizeLocalizedPath(pathname)

  if (sectionId) {
    if (basePath && currentPathname !== basePath) {
      return false
    }

    return activeSection === sectionId || currentPathname === basePath
  }

  if (!basePath || !pathname) {
    return false
  }

  if (activeMatch === 'prefix') {
    return currentPathname === basePath || currentPathname.startsWith(`${basePath}/`)
  }

  return currentPathname === basePath
}

const ListItem = (props: {
  title: NavigationItem['title']
  href: NavigationItem['href']
  icon?: NavigationItem['icon']
  badge?: NavigationItem['badge']
  description?: NavigationItem['description']
  splitItems?: boolean
  activeSection?: string
  pathname?: string
  activeMatch?: NavigationItem['activeMatch']
  lang: 'en' | 'zh'
}) => {
  const { title, href, icon, badge, description, splitItems, activeSection, pathname, activeMatch, lang } = props

  const isActive = isHrefActive({ href, activeSection, pathname, activeMatch })
  const localizedHref = toLocalizedHref(href, lang)

  return (
    <li className={cn({ 'min-h-19.5': description && splitItems })}>
      <Link
        href={localizedHref}
        data-active={isActive}
        className={cn(
          'hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted flex items-center gap-1.5 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-3 focus-visible:outline-1',
          {
            'flex flex-row items-start gap-2': icon
          }
        )}
      >
        {icon && (
          <span className='bg-popover [&>svg]:text-popover-foreground! flex aspect-square size-7 shrink-0 items-center justify-center rounded-sm border [&>svg]:size-4'>
            {icon}
          </span>
        )}
        {description ? (
          <div className='space-y-0.5'>
            <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
              {title}
              {badge}
            </div>
            <p className='text-muted-foreground text-pretty'>{description}</p>
          </div>
        ) : (
          <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
            {title}
            {badge}
          </div>
        )}
      </Link>
    </li>
  )
}

const getSectionItems = (section: NavigationSection) => section.items ?? section.subSections?.flatMap(subSection => subSection.items) ?? []

const HeaderNavigation = ({
  currentLang,
  navigationData,
  navigationClassName
}: {
  currentLang: SiteLang
  navigationData: Navigation[]
  navigationClassName?: string
}) => {
  const pathname = usePathname()
  const lang = currentLang
  const navRef = useRef<HTMLElement>(null)
  const closeTimeoutRef = useRef<number | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const openDropdownMenu = (title: string) => {
    clearCloseTimeout()
    setOpenDropdown(title)
  }

  const closeDropdownMenu = (title: string) => {
    clearCloseTimeout()
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(current => (current === title ? null : current))
    }, 120)
  }

  // Extract all section IDs from navigation data
  const sectionIds = navigationData.flatMap(navItem => {
    if (navItem.href) {
      const id = getSectionIdFromHref(navItem.href)

      return id ? [id] : []
    }

    if (navItem.items) {
      if (navItem.splitItems) {
        return navItem.items.flatMap(section =>
          getSectionItems(section)
            .map(item => {
              return getSectionIdFromHref(item.href)
            })
            .filter(Boolean)
        )
      }

      return navItem.items
        .map(item => {
          return getSectionIdFromHref(item.href)
        })
        .filter(Boolean)
    }

    return []
  })

  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
<<<<<<< HEAD
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null)
  }, [pathname, lang])

  useEffect(() => {
=======
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
    return () => {
      clearCloseTimeout()
    }
  }, [])

  useEffect(() => {
    if (!openDropdown) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [openDropdown])

  return (
    <nav ref={navRef} aria-label='Main' className={cn('relative hidden lg:block', navigationClassName)}>
      <ul className='flex h-fit flex-wrap items-center gap-6'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isActive = isHrefActive({ href: navItem.href, activeSection, pathname, activeMatch: navItem.activeMatch })
<<<<<<< HEAD

            const localizedHref = withQueryLang(navItem.href, lang)
=======
            const localizedHref = toLocalizedHref(navItem.href, lang)
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436

            return (
              <li key={navItem.title}>
                <Link
                  href={localizedHref}
                  data-active={isActive}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-muted-foreground! hover:text-foreground! data-[active=true]:text-foreground! bg-transparent! p-0! text-base shadow-none hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent'
                  )}
                >
                  {navItem.title}
                </Link>
              </li>
            )
          }

          // Section with dropdown
          // Check if any child item is active
          let hasActiveChild = false

          if (navItem.items) {
            if (navItem.splitItems) {
              hasActiveChild = navItem.items.some(section =>
                getSectionItems(section).some(item => isHrefActive({ href: item.href, activeSection, pathname }))
              )
            } else {
              hasActiveChild = navItem.items.some(item =>
                isHrefActive({ href: item.href, activeSection, pathname, activeMatch: item.activeMatch })
              )
            }
          }

          const isOpen = openDropdown === navItem.title

          return (
            <li key={navItem.title} className='relative'>
              <div
                onMouseEnter={() => openDropdownMenu(navItem.title)}
                onMouseLeave={() => closeDropdownMenu(navItem.title)}
                onFocusCapture={() => openDropdownMenu(navItem.title)}
                onBlurCapture={event => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    closeDropdownMenu(navItem.title)
                  }
                }}
              >
                <button
                  type='button'
                  data-active={hasActiveChild}
                  aria-expanded={isOpen}
                  aria-haspopup='true'
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-muted-foreground! data-[active=true]:text-foreground! bg-transparent! p-0! text-base shadow-none hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent [&_svg]:size-4'
                  )}
                  onClick={() => {
                    clearCloseTimeout()
                    setOpenDropdown(current => (current === navItem.title ? null : navItem.title))
                  }}
                >
                  {navItem.title}
                </button>

                {isOpen ? (
                  <div
                    className={cn(
                      'bg-popover text-popover-foreground ring-foreground/10 fixed top-16 left-1/2 z-50 w-[min(82rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-md p-2 pr-2.5 shadow-lg ring-1',
                      navItem.dropdownClassName
                    )}
                  >
                    {navItem.splitItems ? (
                      <div className={cn('grid grid-cols-1 gap-2', navItem.contentClassName)}>
                        {navItem.items.map((section, sectionIndex) => (
                          <div
                            key={section.title ?? `section-${sectionIndex}`}
                            className={cn('grid grid-cols-1 gap-3', {
                              'border-border/70 border-l pl-6': sectionIndex > 0
                            })}
                          >
                            {section.title ? <div className='text-muted-foreground px-2 text-sm'>{section.title}</div> : null}
                            {section.subSections ? (
                              <div className='grid grid-cols-1 gap-3'>
                                {section.subSections.map(subSection => (
                                  <div key={subSection.title} className='grid grid-cols-1 gap-2'>
                                    <div className='text-muted-foreground px-2 text-sm'>{subSection.title}</div>
                                    <ul
                                      className={cn('grid grid-cols-1 gap-0.5', {
                                        'gap-2': subSection.items.find(item => item.description)
                                      })}
                                    >
                                      {subSection.items.map((item, index) => (
                                        <ListItem
                                          key={index}
                                          icon={item.icon}
                                          title={item.title}
                                          description={item.description}
                                          href={item.href}
                                          badge={item.badge}
                                          splitItems={navItem.splitItems}
                                          activeSection={activeSection}
                                          pathname={pathname}
                                          activeMatch={item.activeMatch}
                                          lang={lang}
                                        />
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <ul
                                className={cn('grid grid-cols-1 gap-0.5', {
                                  'gap-2': section.items?.find(item => item.description)
                                })}
                              >
                                {section.items?.map((item, index) => (
                                  <ListItem
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                    href={item.href}
                                    badge={item.badge}
                                    splitItems={navItem.splitItems}
                                    activeSection={activeSection}
                                    pathname={pathname}
                                    activeMatch={item.activeMatch}
                                    lang={lang}
                                  />
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul
                        className={cn(
                          'grid grid-cols-1 gap-0.5',
                          { 'gap-2': navItem.items?.find(item => item.description) },
                          navItem.contentClassName
                        )}
                      >
                        {navItem.items?.map((item, index) => (
                          <ListItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            badge={item.badge}
                            activeSection={activeSection}
                            pathname={pathname}
                            activeMatch={item.activeMatch}
                            lang={lang}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const HeaderNavigationSmallScreen = ({
  currentLang,
  navigationData,
  triggerClassName,
  screenSize = 1023
}: {
  currentLang: SiteLang
  navigationData: Navigation[]
  triggerClassName?: string
  screenSize?: number
}) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false)

  const pathname = usePathname()
  const lang = currentLang

  // Extract all section IDs from navigation data
  const sectionIds = navigationData.flatMap(navItem => {
    if (navItem.href) {
      const id = getSectionIdFromHref(navItem.href)

      return id ? [id] : []
    }

    if (navItem.items) {
      if (navItem.splitItems) {
        return navItem.items.flatMap(section =>
          getSectionItems(section)
            .map(item => {
              return getSectionIdFromHref(item.href)
            })
            .filter(Boolean)
        )
      }

      return navItem.items
        .map(item => {
          return getSectionIdFromHref(item.href)
        })
        .filter(Boolean)
    }

    return []
  })

  const activeSection = useActiveSection(sectionIds)

  const handleLinkClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
    }
  }, [isMobile])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <SecondaryFlowButton className={cn('inline-flex lg:hidden', triggerClassName)}>
          <MenuIcon />
          <span className='sr-only'>Menu</span>
        </SecondaryFlowButton>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-0 p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='#' onClick={handleLinkClick} className='self-start'>
            <Logo />
          </Link>
        </SheetHeader>
        <div className='space-y-0.5 overflow-y-auto p-2'>
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              const isActive = isHrefActive({ href: navItem.href, activeSection, pathname, activeMatch: navItem.activeMatch })

              return (
                <Link
                  key={navItem.title}
                  href={toLocalizedHref(navItem.href, lang)}
                  data-active={isActive}
                  className='hover:bg-accent data-[active=true]:bg-accent flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </Link>
              )
            }

            // Check if any child item is active
            let hasActiveChild = false

            if (navItem.items) {
              if (navItem.splitItems) {
                hasActiveChild = navItem.items.some(section =>
                  getSectionItems(section).some(item =>
                    isHrefActive({ href: item.href, activeSection, pathname, activeMatch: item.activeMatch })
                  )
                )
              } else {
                hasActiveChild = navItem.items.some(item =>
                  isHrefActive({ href: item.href, activeSection, pathname, activeMatch: item.activeMatch })
                )
              }
            }

            return (
              <Collapsible key={index} className='w-full'>
                <CollapsibleTrigger
                  data-active={hasActiveChild}
                  className='hover:bg-accent group data-[active=true]:bg-accent flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                >
                  <div className='flex items-center gap-2'>{navItem.title}</div>
                  <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90' />
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all duration-300'>
                  {navItem.splitItems
                    ? navItem.items.map((item, i) => (
                        <div key={i} className='mt-1.5'>
                          {item.title ? (
                            <div className='text-muted-foreground mb-1 pl-4.5 text-xs font-medium'>{item.title}</div>
                          ) : null}
                          {(item.subSections ?? [{ title: item.title ?? '', items: item.items ?? [] }]).map((section, k) => (
                            <div key={`${section.title}-${k}`} className={k > 0 ? 'mt-2' : ''}>
                              {item.subSections ? (
                                <div className='text-muted-foreground mb-1 pl-4.5 text-xs font-medium'>{section.title}</div>
                              ) : null}
                              {section.items.map((subItem, j) => {
                                const isActive = isHrefActive({
                                  href: subItem.href,
                                  activeSection,
                                  pathname,
                                  activeMatch: subItem.activeMatch
                                })

                                return (
                                  <Link
                                    key={j}
                                    href={toLocalizedHref(subItem.href, lang)}
                                    data-active={isActive}
                                    className='hover:bg-accent data-[active=true]:text-primary ml-4.5 flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                                    onClick={handleLinkClick}
                                  >
                                    {subItem.icon ? subItem.icon : <CircleSmallIcon className='size-4' />}
                                    {subItem.title}
                                  </Link>
                                )
                              })}
                            </div>
                          ))}
                        </div>
                      ))
                    : navItem.items?.map(item => {
                        const isActive = isHrefActive({
                          href: item.href,
                          activeSection,
                          pathname,
                          activeMatch: item.activeMatch
                        })

                        return (
                          <Link
                            key={item.title}
                            href={toLocalizedHref(item.href, lang)}
                            data-active={isActive}
                            className='hover:bg-accent data-[active=true]:text-primary ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm data-[active=true]:font-medium'
                            onClick={handleLinkClick}
                          >
                            {item.icon ? item.icon : <CircleSmallIcon className='size-4' />}
                            {item.title}
                          </Link>
                        )
                      })}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { HeaderNavigation, HeaderNavigationSmallScreen, type Navigation, type NavigationItem, type NavigationSection }
