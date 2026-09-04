import type { Metadata } from 'next'

import Hero from '@/components/blocks/hero-section/hero-section'
import CoreServices from '@/components/blocks/core-services/core-services'
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
    'Meridian helps SaaS and AI companies build organic demand through B2B SaaS SEO, Reddit marketing, AI SEO, GEO, and AI-native content systems.',
  path: '/',
  keywords: ['ai growth agency', 'b2b saas seo agency', 'reddit marketing services', 'ai seo services', 'geo services']
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
        'Meridian helps SaaS and AI companies build organic demand through B2B SaaS SEO, Reddit marketing, AI SEO, GEO, and AI-native content systems.'
    }),
    createFAQSchema(faqItems)
  ]
}

const Home = () => {
  return (
    <>
      <Hero />

      <SectionSeparator />

      <CoreServices />

      <SectionSeparator />

      <TrustedBrands brandLogos={logos} />

      <SectionSeparator />

      <Features />

      <SectionSeparator />

      <Testimonials testimonials={testimonials} />

      <SectionSeparator />

      <FAQ faqItems={faqItems} visualVariant='compact' />

      <CTA
        title='Build a Clearer Organic Growth Plan'
        description='Book a strategy call to identify the highest-impact opportunity across technical SEO, programmatic SEO, Reddit growth, and GEO.'
        buttonLabel='Book a strategy call'
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

export default Home
