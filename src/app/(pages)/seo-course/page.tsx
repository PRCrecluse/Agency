import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import SeoCoursePage from '@/components/course/seo-course-page'
import { courseStats, SEO_COURSE_PRICE_FEN, SEO_COURSE_TITLE, seoCourseModules } from '@/content/seo-course'
import {
  SEO_COURSE_ACCESS_COOKIE,
  verifyCourseAccessToken
} from '@/lib/seo-course-payments'
import { absoluteUrl, buildMetadata, createBreadcrumbSchema, createOrganizationSchema } from '@/lib/seo'

const path = '/seo-course'
const title = 'SEO 知识库实战课｜SEO、GEO 与 AEO 系统课程'

const description =
  '从 SEO 入门到 GEO、AEO 与 SEO 进阶实战，包含 12 节录播课、20 期知识点更新和可交付的实战任务。'

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
  keywords: [
    'SEO 课程',
    'SEO 知识库',
    'GEO 课程',
    'AEO 课程',
    'AI 搜索优化',
    'SEO 进阶课程',
    '搜索引擎优化课程'
  ]
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': absoluteUrl(`${path}#course`),
      name: SEO_COURSE_TITLE,
      description,
      url: absoluteUrl(path),
      inLanguage: 'zh-CN',
      provider: { '@id': absoluteUrl('/#organization') },
      numberOfCredits: courseStats.lessons,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: `${courseStats.lessons} 节录播课与 ${courseStats.updates} 期知识点更新`
      },
      offers: {
        '@type': 'Offer',
        price: (SEO_COURSE_PRICE_FEN / 100).toFixed(2),
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(path)
      },
      syllabusSections: seoCourseModules.map(module => ({
        '@type': 'Syllabus',
        name: module.label,
        description: module.description,
        numberOfCredits: module.lessons.length
      }))
    },
    createBreadcrumbSchema([
      { name: '首页', path: '/' },
      { name: 'SEO 知识库·实战课', path }
    ]),
    createOrganizationSchema()
  ]
}

const Page = async () => {
  const token = (await cookies()).get(SEO_COURSE_ACCESS_COOKIE)?.value
  const unlocked = verifyCourseAccessToken(token)

  return (
    <>
      <SeoCoursePage unlocked={unlocked} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default Page
