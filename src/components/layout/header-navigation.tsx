'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import Link from 'next/link'

import { useMedia } from 'react-use'
import { ChevronRightIcon, CircleSmallIcon, MenuIcon } from 'lucide-react'

import { useActiveSection } from '@/hooks/use-active-section'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { SecondaryFlowButton } from '@/components/ui/flow-button'

import Logo from '@/components/logo'

import type { QueryLang } from '@/lib/language'
import { withQueryLang } from '@/lib/language'
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
}

type Navigation = {
  title: string
  contentClassName?: string
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
    }
)

const getSectionIdFromHref = (href: string) => {
  if (href.startsWith('/#')) return href.slice(2)
  if (href.startsWith('#')) return href.slice(1)

  return ''
}

const getBasePathFromHref = (href: string) => href.split('#')[0]

const isHrefActive = ({
  href,
  activeSection,
  pathname
}: {
  href: string
  activeSection?: string
  pathname?: string | null
}) => {
  const sectionId = getSectionIdFromHref(href)

  if (sectionId) {
    return activeSection === sectionId
  }

  const basePath = getBasePathFromHref(href)

  return Boolean(basePath && pathname?.startsWith(basePath))
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
  lang: 'en' | 'zh'
}) => {
  const { title, href, icon, badge, description, splitItems, activeSection, pathname, lang } = props

  const isActive = isHrefActive({ href, activeSection, pathname })
  const localizedHref = withQueryLang(href, lang)

  return (
    <li className={cn({ 'h-19.5': description && splitItems })}>
      <NavigationMenuLink
        href={localizedHref}
        data-active={isActive}
        className={cn({ 'flex flex-row items-start gap-2': icon })}
        asChild
      >
        <Link href={localizedHref}>
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
              <p className='text-muted-foreground line-clamp-2'>{description}</p>
            </div>
          ) : (
            <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
              {title}
              {badge}
            </div>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

const getSectionItems = (section: NavigationSection) => section.items ?? section.subSections?.flatMap(subSection => subSection.items) ?? []

const HeaderNavigation = ({
  currentLang,
  navigationData,
  navigationClassName
}: {
  currentLang: QueryLang
  navigationData: Navigation[]
  navigationClassName?: string
}) => {
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

  return (
    <NavigationMenu viewport={false} className={cn('hidden lg:block', navigationClassName)}>
      <NavigationMenuList className='h-fit flex-wrap gap-6!'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isActive = isHrefActive({ href: navItem.href, activeSection, pathname })
            const localizedHref = withQueryLang(navItem.href, lang)

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={localizedHref}
                  data-active={isActive}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-muted-foreground! hover:text-foreground! data-[active=true]:text-foreground! bg-transparent! p-0! text-base'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
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
              hasActiveChild = navItem.items.some(item => isHrefActive({ href: item.href, activeSection, pathname }))
            }
          }

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger
                data-active={hasActiveChild}
                className='text-muted-foreground! data-[active=true]:text-foreground! bg-transparent! p-0! text-base [&_svg]:size-4'
              >
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='absolute left-1/2 w-auto -translate-x-1/2 shadow-lg!'>
                {navItem.splitItems ? (
                  <div className={cn('grid grid-cols-1 gap-2', navItem.contentClassName)}>
                    {navItem.items.map((section, sectionIndex) => (
                      <div key={section.title ?? `section-${sectionIndex}`} className='grid grid-cols-1 gap-2'>
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
                        lang={lang}
                      />
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const HeaderNavigationSmallScreen = ({
  currentLang,
  navigationData,
  triggerClassName,
  screenSize = 1023
}: {
  currentLang: QueryLang
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
              const isActive = isHrefActive({ href: navItem.href, activeSection, pathname })

              return (
                <Link
                  key={navItem.title}
                  href={withQueryLang(navItem.href, lang)}
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
                  getSectionItems(section).some(item => isHrefActive({ href: item.href, activeSection, pathname }))
                )
              } else {
                hasActiveChild = navItem.items.some(item => isHrefActive({ href: item.href, activeSection, pathname }))
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
                                const isActive = isHrefActive({ href: subItem.href, activeSection, pathname })

                                return (
                                  <Link
                                    key={j}
                                    href={withQueryLang(subItem.href, lang)}
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
                        const isActive = isHrefActive({ href: item.href, activeSection, pathname })

                        return (
                          <Link
                            key={item.title}
                            href={withQueryLang(item.href, lang)}
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
