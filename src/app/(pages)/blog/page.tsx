import type { Metadata } from 'next'

import CTASection from '@/components/blocks/cta/cta'
import HeroSection from '@/components/blog/hero-section/hero-section'
import SectionSeparator from '@/components/section-separator'
import BlogSection from '@/components/blog/blog-section/blog-section'
import { getPosts } from '@/lib/posts'
import { buildMetadata, createOrganizationSchema, createWebPageSchema, createWebsiteSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'SaaS SEO, Reddit Growth & GEO Insights | Meridian',
  description:
    'Read Meridian insights on SaaS SEO, technical SEO, programmatic SEO, Reddit growth, GEO, and AI-native demand generation.',
  path: '/blog',
  keywords: ['saas seo blog', 'reddit growth blog', 'geo insights', 'technical seo articles']
})

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

      <CTASection />

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
