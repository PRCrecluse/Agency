'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import Logo from '@/components/logo'
import SectionSeparator from '@/components/section-separator'
import { Separator } from '@/components/ui/separator'
import { getPathLanguage, toLocalizedHref } from '@/lib/language'

const footerCopy = {
  en: {
    description:
      'Meridian helps SaaS and AI companies grow through technical SEO, programmatic SEO, Reddit strategy, GEO, and AI-native demand systems.',
    company: 'Company',
    about: 'About',
    testimonials: 'Testimonials',
    services: 'Services',
    blog: 'Blog',
    legal: 'Legal',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    tools: 'Tools',
    utmBuilder: 'UTM Builder',
    seoPrompts: 'SEO Prompts',
    xPostMonitor: 'X Post Monitor',
    xLink: 'Meridian on X',
    youtubeLink: 'Meridian on YouTube',
    rights: 'All rights reserved.'
  },
  zh: {
    description:
      'Meridian 通过技术 SEO、程序化 SEO、Reddit 策略、GEO 和 AI 原生需求增长体系，助力 SaaS 与 AI 企业实现增长。',
    company: '公司',
    about: '关于我们',
    testimonials: '用户评价',
    services: '服务',
    blog: '博客',
    legal: '法律信息',
    terms: '条款与条件',
    privacy: '隐私政策',
    tools: '工具',
    utmBuilder: 'UTM 链接生成器',
    seoPrompts: 'SEO 提示词库',
    xPostMonitor: 'X 帖子监测',
    xLink: 'Meridian 的 X 主页',
    youtubeLink: 'Meridian 的 YouTube 频道',
    rights: '版权所有。'
  }
} as const

const Footer = () => {
  const lang = getPathLanguage(usePathname())
  const copy = footerCopy[lang]
  const localizedHref = (href: string) => toLocalizedHref(href, lang)

  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24 lg:px-8'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <Link href={localizedHref('/#home')}>
            <Logo />
          </Link>
          <p className='text-muted-foreground'>{copy.description}</p>
          <Separator className='w-35!' />
          <div className='flex items-center gap-4'>
            <Link href='https://x.com/Yiwei_growth' target='_blank' rel='noreferrer' aria-label={copy.xLink}>
              <TwitterIcon className='text-muted-foreground hover:text-foreground size-5' />
            </Link>
            <Link
              href='https://www.youtube.com/@Goglobal.to_SaaS'
              target='_blank'
              rel='noreferrer'
              aria-label={copy.youtubeLink}
            >
              <YoutubeIcon className='text-muted-foreground hover:text-foreground size-5' />
            </Link>
          </div>
        </div>

        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{copy.company}</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href={localizedHref('/about')} className='hover:text-foreground transition-colors duration-300'>
                  {copy.about}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/#testimonials')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.testimonials}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/services')} className='hover:text-foreground transition-colors duration-300'>
                  {copy.services}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/blog')} className='hover:text-foreground transition-colors duration-300'>
                  {copy.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{copy.legal}</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link
                  href={localizedHref('/terms-conditions')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/privacy-policy')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{copy.tools}</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link
                  href={localizedHref('/utm-builder')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.utmBuilder}
                </Link>
              </li>
              <li>
                <Link href='/zh/seo-prompts' className='hover:text-foreground transition-colors duration-300'>
                  {copy.seoPrompts}
                </Link>
              </li>
              <li>
                <Link href='/twitter-monitor' className='hover:text-foreground transition-colors duration-300'>
                  {copy.xPostMonitor}
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
          <Link className='text-foreground font-medium hover:underline' href={localizedHref('/#home')}>
            Meridian
          </Link>{' '}
          {copy.rights}
        </p>
      </div>
    </footer>
  )
}

export default Footer
