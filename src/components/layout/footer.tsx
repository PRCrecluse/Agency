'use client'

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
    resources: 'Resources',
    course: 'SEO Course',
    tools: 'Free Tools',
    community: 'Community',
    legal: 'Legal',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    xLink: 'Meridian on X',
    youtubeLink: 'Meridian on YouTube',
    rights: 'All rights reserved.'
  },
  zh: {
    description:
      'Meridian 通过技术 SEO、程序化 SEO、Reddit 策略、GEO 和 AI 原生需求增长体系，助力 SaaS 与 AI 企业实现增长。',
    company: '公司',
    about: '关于我们',
    testimonials: '客户评价',
    services: '服务',
    blog: '博客',
    resources: '资源',
    course: 'SEO 知识库·实战课',
    tools: '小工具',
    community: '社群',
    legal: '法律',
    terms: '条款与条件',
    privacy: '隐私政策',
    xLink: 'Meridian 的 X 主页',
    youtubeLink: 'Meridian 的 YouTube 频道',
    rights: '版权所有。'
  }
} as const

const Footer = ({ lang = 'en' }: { lang?: SiteLang }) => {
  const copy = footerCopy[lang]
  const href = (value: string) => toLocalizedHref(value, lang)

  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.25fr_2fr] lg:px-8'>
        <div className='flex max-w-md flex-col items-start gap-4'>
          <Link href={href('/#home')} aria-label='Meridian home'>
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

        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
          <div>
            <p className='text-base font-medium'>{copy.company}</p>
            <ul className='text-muted-foreground mt-4 space-y-3'>
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
                <Link className='hover:text-foreground' href={href('/services')}>
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
          <div>
            <p className='text-base font-medium'>{copy.resources}</p>
            <ul className='text-muted-foreground mt-4 space-y-3'>
              <li>
                <Link className='hover:text-foreground' href='/seo-course'>
                  {copy.course}
                </Link>
              </li>
              <li>
                <Link className='hover:text-foreground' href='/tools'>
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
        </div>
      </div>
      <Separator />
      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-muted-foreground text-center text-sm'>
          ©{new Date().getFullYear()}{' '}
          <Link className='text-foreground font-medium hover:underline' href={href('/#home')}>
            Meridian
          </Link>
          . {copy.rights}
        </p>
      </div>
    </footer>
  )
}

export default Footer
