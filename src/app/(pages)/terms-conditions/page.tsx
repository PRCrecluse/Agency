import type { Metadata } from 'next'

import LegalDocument from '@/components/legal/legal-document'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions | Meridian',
  description: 'Review the terms that govern your use of the Meridian website, services, and related content.',
  path: '/terms-conditions',
  keywords: ['terms and conditions', 'terms of service', 'meridian terms']
})

const sections = [
  {
    title: '1. Acceptance of These Terms',
    paragraphs: [
      'By accessing or using the Meridian website, booking pages, content, or related services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site or submit information through it.'
    ]
  },
  {
    title: '2. Services and Content',
    paragraphs: [
      'Meridian provides marketing, SEO, growth strategy, and related consulting information through this website. Any content on the site is provided for general informational purposes and may be updated, replaced, or removed at any time without prior notice.'
    ]
  },
  {
    title: '3. Booking Calls and Enquiries',
    paragraphs: [
      'When you book a call or submit an enquiry, you agree to provide accurate and current information. We may use third-party scheduling or communication tools to manage appointments, confirmations, and follow-ups.'
    ]
  },
  {
    title: '4. Acceptable Use',
    items: [
      'Use the website only for lawful purposes.',
      'Do not attempt to interfere with the security, availability, or normal operation of the site.',
      'Do not copy, scrape, reproduce, or republish substantial parts of the site for commercial use without written permission.',
      'Do not submit false, misleading, or infringing content through any form or communication channel on the site.'
    ]
  },
  {
    title: '5. Intellectual Property',
    paragraphs: [
      'Unless otherwise stated, all website content, branding, copy, graphics, layouts, and materials are owned by or licensed to Meridian and are protected by applicable intellectual property laws. Limited personal, non-commercial viewing is permitted.'
    ]
  },
  {
    title: '6. Third-Party Links and Tools',
    paragraphs: [
      'This website may link to third-party services such as scheduling tools, analytics providers, social platforms, or embedded resources. We are not responsible for the content, availability, or practices of those third parties, and your use of them is subject to their own terms.'
    ]
  },
  {
    title: '7. No Guarantee of Results',
    paragraphs: [
      'Marketing, SEO, and growth outcomes depend on multiple factors outside our control. Nothing on this site should be interpreted as a promise or guarantee of traffic, rankings, leads, revenue, or business performance.'
    ]
  },
  {
    title: '8. Disclaimer of Warranties',
    paragraphs: [
      'The website and its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Meridian disclaims all warranties, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.'
    ]
  },
  {
    title: '9. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Meridian will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the website, third-party tools, or reliance on website content.'
    ]
  },
  {
    title: '10. Changes to These Terms',
    paragraphs: [
      'We may revise these Terms & Conditions from time to time. The latest version will be posted on this page with an updated effective date. Continued use of the site after changes become effective means you accept the revised terms.'
    ]
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': absoluteUrl('/terms-conditions#webpage'),
      name: 'Terms & Conditions | Meridian',
      description: 'Review the terms that govern your use of the Meridian website, services, and related content.',
      url: absoluteUrl('/terms-conditions'),
      inLanguage: 'en-US'
    }
  ]
}

const TermsConditionsPage = () => {
  return (
    <>
      <LegalDocument
        title='Terms & Conditions'
        description='These terms explain the rules for using the Meridian website, booking calls, and accessing our content and services.'
        effectiveDate='August 22, 2026'
        sections={sections}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default TermsConditionsPage
