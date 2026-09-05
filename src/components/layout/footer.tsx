import Link from 'next/link'

import TwitterIcon from '@/assets/svg/twitter-icon'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import Logo from '@/components/logo'
import SectionSeparator from '@/components/section-separator'
import { Separator } from '@/components/ui/separator'
import { toLocalizedHref, type SiteLang } from '@/lib/language'

const footerCopy = {
  en: {
    description:
      'Meridian helps SaaS and AI companies grow through technical SEO, programmatic SEO, Reddit strategy, GEO, and AI-native demand systems.',
    company: 'Company',
    about: 'About',
    testimonials: 'Testimonials',
    services: 'Services',
    blog: 'Blog',
<<<<<<< HEAD
    resources: 'Resources',
    course: 'SEO Course',
    tools: 'Free Tools',
    community: 'Community',
    legal: 'Legal',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
=======
    legal: 'Legal',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    tools: 'Tools',
    utmBuilder: 'UTM Builder',
    seoPrompts: 'SEO Prompts',
    xPostMonitor: 'X Post Monitor',
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
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
<<<<<<< HEAD
    resources: '资源',
    course: 'SEO 知识库·实战课',
    tools: '小工具',
    community: '社群',
    legal: '法律',
    terms: '条款与条件',
    privacy: '隐私政策',
=======
    legal: '法律信息',
    terms: '条款与条件',
    privacy: '隐私政策',
    tools: '工具',
    utmBuilder: 'UTM 链接生成器',
    seoPrompts: 'SEO 提示词库',
    xPostMonitor: 'X 帖子监测',
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
    xLink: 'Meridian 的 X 主页',
    youtubeLink: 'Meridian 的 YouTube 频道',
    rights: '版权所有。'
  }
} as const

<<<<<<< HEAD
const Footer = ({ lang = 'en' }: { lang?: SiteLang }) => {
  const copy = footerCopy[lang]
  const href = (value: string) => toLocalizedHref(value, lang)
=======
const Footer = ({ lang }: { lang: SiteLang }) => {
  const copy = footerCopy[lang]
  const localizedHref = (href: string) => toLocalizedHref(href, lang)
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7

  return (
    <footer>
      <SectionSeparator />
<<<<<<< HEAD
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.25fr_2fr] lg:px-8'>
        <div className='flex max-w-md flex-col items-start gap-4'>
          <Link href={href('/#home')} aria-label='Meridian home'>
=======
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24 lg:px-8'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <Link href={localizedHref('/#home')}>
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
            <Logo />
          </Link>
          <p className='text-muted-foreground leading-7'>{copy.description}</p>
          <div className='mt-2 flex items-center gap-4'>
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

<<<<<<< HEAD
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
          <div>
            <p className='text-base font-medium'>{copy.company}</p>
            <ul className='text-muted-foreground mt-4 space-y-3'>
=======
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{copy.company}</div>
            <ul className='text-muted-foreground space-y-3'>
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
              <li>
                <Link className='hover:text-foreground' href={href('/about')}>
                  {copy.about}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href={href('/#testimonials')}>
                  {copy.testimonials}
                </Link>
              </li>
              <li>
<<<<<<< HEAD
                <Link className='hover:text-foreground' href={href('/services')}>
=======
                <Link
                  href={localizedHref('/services')}
                  className='hover:text-foreground transition-colors duration-300'
                >
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
                  {copy.services}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href={href('/blog')}>
                  {copy.blog}
                </Link>
              </li>
            </ul>
          </div>
<<<<<<< HEAD
          <div>
            <p className='text-base font-medium'>{copy.resources}</p>
            <ul className='text-muted-foreground mt-4 space-y-3'>
              <li>
                <Link className='hover:text-foreground' href='/seo-course'>
                  {copy.course}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href={href('/tools')}>
                  {copy.tools}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href='/community'>
                  {copy.community}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='text-base font-medium'>{copy.legal}</p>
            <ul className='text-muted-foreground mt-4 space-y-3'>
              <li>
                <Link className='hover:text-foreground' href='/terms-conditions'>
=======

          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{copy.legal}</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <Link
                  href={localizedHref('/terms-conditions')}
                  className='hover:text-foreground transition-colors duration-300'
                >
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
                  {copy.terms}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href='/privacy-policy'>
                  {copy.privacy}
                </Link>
              </li>
            </ul>
          </div>
<<<<<<< HEAD
=======

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
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
        </div>
      </div>
      <Separator />
      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
<<<<<<< HEAD
        <p className='text-muted-foreground text-center text-sm'>
          ©{new Date().getFullYear()}{' '}
          <Link className='text-foreground font-medium hover:underline' href={href('/#home')}>
            Meridian
          </Link>
          . {copy.rights}
=======
        <p className='text-muted-foreground text-center text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <Link className='text-foreground font-medium hover:underline' href={localizedHref('/#home')}>
            Meridian
          </Link>{' '}
          {copy.rights}
>>>>>>> 1ad43ef976d0576d0d6baf37e6b7382c002638a7
        </p>
      </div>
    </footer>
  )
}

export default Footer
