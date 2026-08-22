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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
      name: 'Meridian',
      description:
        'Grow your product faster with an all-in-one sales and analytics platform. Track performance, automate follow-ups, and make smarter decisions easily.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      inLanguage: 'en-US'
    }
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
