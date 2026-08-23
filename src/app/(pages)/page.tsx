import type { Metadata } from 'next'

import Hero from '@/components/blocks/hero-section/hero-section'
import TrustedBrands from '@/components/blocks/trusted-brands/trusted-brands'
import Features from '@/components/blocks/features/features'
import Testimonials from '@/components/blocks/testimonials/testimonials'
import FAQ from '@/components/blocks/faq/faq'
import CTA from '@/components/blocks/cta/cta'

import { logos } from '@/assets/data/trusted-brands'
import { testimonials } from '@/assets/data/testimonials'
import { faqItems } from '@/assets/data/faqs'

import SectionSeparator from '@/components/section-separator'
import {
  buildMetadata,
  createFAQSchema,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema
} from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'AI Growth Agency for SaaS Companies | Meridian',
  description:
    'Meridian helps SaaS and AI companies grow organic demand through technical SEO, programmatic SEO, Reddit strategy, GEO, and AI-native content systems.',
  path: '/',
  keywords: ['ai growth agency', 'saas seo', 'reddit growth', 'geo services', 'programmatic seo']
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    createOrganizationSchema(),
    createWebsiteSchema(),
    createWebPageSchema({
      path: '/',
      title: 'AI Growth Agency for SaaS Companies | Meridian',
      description:
        'Meridian helps SaaS and AI companies grow organic demand through technical SEO, programmatic SEO, Reddit strategy, GEO, and AI-native content systems.'
    }),
    createFAQSchema(faqItems)
  ]
}

const Home = () => {
  return (
    <>
      <Hero />

      <SectionSeparator />

      <TrustedBrands brandLogos={logos} />

      <SectionSeparator />

      <Features />

      <SectionSeparator />

      <Testimonials testimonials={testimonials} />

      <SectionSeparator />

      <FAQ faqItems={faqItems} visualVariant='compact' />

      <CTA />

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

export default Home
