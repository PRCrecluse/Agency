import type { Metadata } from 'next'

import CTASection from '@/components/blocks/cta/cta'
import HeroSection from '@/components/blog/hero-section/hero-section'
import BlogSection from '@/components/blog/blog-section/blog-section'
import SectionSeparator from '@/components/section-separator'
import { getPosts } from '@/lib/posts'
import { buildMetadata, createOrganizationSchema, createWebPageSchema, createWebsiteSchema } from '@/lib/seo'

const title = 'SaaS SEO、Reddit 增长与 GEO 洞察 | Meridian'
const description = '阅读 Meridian 关于 SaaS SEO、AI SaaS 获客、Reddit 增长、GEO 与出海增长的实战分析。'

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/zh/blog',
  keywords: ['SaaS SEO', 'AI SaaS SEO', '出海 SEO', 'Reddit 营销', 'GEO'],
  alternates: {
    canonical: '/zh/blog',
    languages: {
      'en-US': '/blog',
      'zh-CN': '/zh/blog',
      'x-default': '/blog'
    }
  }
})

const BlogPageZh = async () => {
  const posts = await getPosts(undefined, 'zh')
  const featuredPosts = posts.filter(post => post.featured)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({ path: '/zh/blog', title, description }),
        '@type': 'CollectionPage',
        inLanguage: 'zh-CN'
      },
      createOrganizationSchema(),
      createWebsiteSchema()
    ]
  }

  return (
    <>
      <div lang='zh-CN'>
        <HeroSection
          posts={featuredPosts}
          basePath='/zh/blog'
          locale='zh-CN'
          copy={{
            badge: 'SEO、Reddit 与 AI 搜索实战',
            title: '写给 SaaS 与 AI 团队的增长笔记',
            description: '分享我们在搜索、社区和 AI 答案中建立自然需求时使用的研究、方法和实战经验。',
            emailPlaceholder: '你的邮箱',
            subscribe: '订阅'
          }}
        />
        <SectionSeparator />
        <BlogSection
          posts={posts}
          basePath='/zh/blog'
          locale='zh-CN'
          searchPlaceholder='搜索文章'
          allLabel='全部'
        />
        <CTASection
          title='想找到最值得优先投入的自然增长渠道？'
          description='预约一次沟通，我们会一起梳理你的搜索、Reddit 与 AI 可见性，并判断最适合的起点。'
          buttonLabel='预约沟通'
        />
      </div>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default BlogPageZh
