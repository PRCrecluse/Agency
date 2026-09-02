'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'
import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import SectionSeparator from '@/components/section-separator'
<<<<<<< HEAD
import { withQueryLang, type QueryLang } from '@/lib/language'

const footerBrandLogos = [
  { src: '/images/brand-logos/amazon.webp', alt: 'Amazon' },
  { src: '/images/brand-logos/microsoft.webp', alt: 'Microsoft' },
  { src: '/images/brand-logos/hubspot.webp', alt: 'HubSpot' },
  { src: '/images/brand-logos/deloitte.webp', alt: 'Deloitte' },
  { src: '/images/brand-logos/evernote.webp', alt: 'Evernote' },
  { src: '/images/brand-logos/fedex.webp', alt: 'FedEx' }
]

const footerCopy = {
  en: {
    description:
      'Meridian helps SaaS and AI companies grow through technical SEO, programmatic SEO, Reddit strategy, GEO, and AI-native demand systems.',
    company: 'Company',
    about: 'About',
    testimonials: 'Testimonials',
    services: 'Services',
    blog: 'Blog',
    help: 'Help',
    deliveryDetails: 'Delivery Details',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    tools: 'Tools',
    utmBuilder: 'UTM Builder',
    seoPrompts: 'SEO Prompts',
    xPostMonitor: 'X Post Monitor',
    newsletter: 'Subscribe to newsletter',
    emailPlaceholder: 'Your email...',
    newsletterSubmit: 'Newsletter submit button',
    xLink: 'Meridian on X',
    youtubeLink: 'Meridian on YouTube',
    rights: 'All rights reserved | Built to empower product teams worldwide.'
  },
  zh: {
    description:
      'Meridian 通过技术 SEO、程序化 SEO、Reddit 策略、GEO 和 AI 原生需求增长体系，助力 SaaS 与 AI 企业实现增长。',
    company: '公司',
    about: '关于我们',
    testimonials: '客户评价',
    services: '服务',
    blog: '博客',
    help: '帮助',
    deliveryDetails: '交付说明',
    terms: '条款与条件',
    privacy: '隐私政策',
    tools: '工具',
    utmBuilder: 'UTM 链接生成器',
    seoPrompts: 'SEO 提示词库',
    xPostMonitor: 'X 帖子监测',
    newsletter: '订阅我们的邮件通讯',
    emailPlaceholder: '请输入邮箱…',
    newsletterSubmit: '提交邮件订阅',
    xLink: 'Meridian 的 X 主页',
    youtubeLink: 'Meridian 的 YouTube 频道',
    rights: '版权所有｜致力于为全球产品团队赋能。'
  }
} as const

const Footer = ({ lang = 'en' }: { lang?: QueryLang }) => {
  const copy = footerCopy[lang]
  const localizedHref = (href: string) => withQueryLang(href, lang)
=======
import { getPathLanguage, toLocalizedHref } from '@/lib/language'

const Footer = () => {
  const lang = getPathLanguage(usePathname())
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436

  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24 lg:px-8'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
<<<<<<< HEAD
          <Link href={localizedHref('/#home')}>
=======
          <Link href={toLocalizedHref('/#home', lang)}>
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
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
<<<<<<< HEAD
                <Link
                  href={localizedHref('/services')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.services}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/blog')} className='hover:text-foreground transition-colors duration-300'>
                  {copy.blog}
=======
                <Link href={toLocalizedHref('/services', lang)} className='hover:text-foreground transition-colors duration-300'>
                  Services
                </Link>
              </li>
              <li>
                <Link href={toLocalizedHref('/blog', lang)} className='hover:text-foreground transition-colors duration-300'>
                  Blog
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
<<<<<<< HEAD
            <div className='text-lg font-medium'>{copy.help}</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href='#' className='hover:text-foreground transition-colors duration-300'>
                  {copy.deliveryDetails}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/terms-conditions')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.terms}
=======
            <div className='text-lg font-medium'>Legal</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link href='/terms-conditions' className='hover:text-foreground transition-colors duration-300'>
                  Terms & Conditions
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
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
<<<<<<< HEAD
                <Link
                  href={localizedHref('/utm-builder')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.utmBuilder}
=======
                <Link href={toLocalizedHref('/utm-builder', lang)} className='hover:text-foreground transition-colors duration-300'>
                  UTM Builder
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/seo-prompts')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.seoPrompts}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/twitter-monitor')}
                  className='hover:text-foreground transition-colors duration-300'
                >
                  {copy.xPostMonitor}
                </Link>
              </li>
            </ul>
          </div>
<<<<<<< HEAD
          <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
            <div>
              <p className='mb-3 text-lg font-medium'>{copy.newsletter}</p>
              <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
                <Input name='newsletter-email' type='email' placeholder={copy.emailPlaceholder} required />
                <PrimaryFlowButton
                  type='submit'
                  className='shrink-0 **:data-[slot=button]:size-9 **:data-[slot=button]:px-0'
                  aria-label={copy.newsletterSubmit}
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
=======
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-muted-foreground text-center text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
<<<<<<< HEAD
          <Link className='text-foreground font-medium hover:underline' href={localizedHref('/#home')}>
            Meridian
          </Link>{' '}
          {copy.rights}
=======
          <Link className='text-foreground font-medium hover:underline' href={toLocalizedHref('/#home', lang)}>
            Meridian
          </Link>{' '}
          All rights reserved.
>>>>>>> 85b786cf987cc8b56da604c53a8b869eabbc3436
        </p>
      </div>
    </footer>
  )
}

export default Footer
