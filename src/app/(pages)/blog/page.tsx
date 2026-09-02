import type { Metadata } from 'next'

import CTASection from '@/components/blocks/cta/cta'
import HeroSection from '@/components/blog/hero-section/hero-section'
import SectionSeparator from '@/components/section-separator'
import BlogSection from '@/components/blog/blog-section/blog-section'
import { getPosts } from '@/lib/posts'
import { buildMetadata, createOrganizationSchema, createWebPageSchema, createWebsiteSchema } from '@/lib/seo'

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'SaaS SEO, Reddit Growth & GEO Insights | Meridian',
    description:
      'Read Meridian insights on SaaS SEO, technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native demand generation.',
    path: '/blog',
    keywords: ['saas seo blog', 'reddit growth blog', 'geo insights', 'technical seo articles']
  }),
  alternates: {
    canonical: '/blog',
    languages: {
      en: '/blog',
      'zh-CN': '/zh/blog',
      'x-default': '/blog'
    }
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...createWebPageSchema({
        path: '/blog',
        title: 'SaaS SEO, Reddit Growth & GEO Insights | Meridian',
        description:
          'Read Meridian insights on SaaS SEO, technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native demand generation.'
      }),
      '@type': 'CollectionPage'
    },
    createOrganizationSchema(),
    createWebsiteSchema()
  ]
}

const BlogPage = async () => {
  const blogPosts = await getPosts()

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <>
      <HeroSection posts={featuredPosts} />

      <SectionSeparator />

      <BlogSection posts={blogPosts} />

      <CTASection
        title='Turn Organic Growth Research Into Your Next Move'
        description='Talk with Meridian about the SEO, Reddit, or AI-discovery opportunity that matters most for your current stage.'
        buttonLabel='Discuss your growth strategy'
      />

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default BlogPage
