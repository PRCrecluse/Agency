import type { Metadata } from 'next'

import LegalDocument from '@/components/legal/legal-document'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | Meridian',
  description: 'Learn how Meridian collects, uses, stores, and protects personal information shared through the website.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'data privacy', 'meridian privacy']
})

const sections = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'We may collect personal information that you choose to provide to us, including your name, email address, company details, and any information you share when booking a call, filling out a form, or contacting us.'
    ]
  },
  {
    title: '2. Usage Data',
    paragraphs: [
      'We may automatically collect limited technical information such as browser type, device information, pages visited, referral sources, and general interaction data to help us understand site usage and improve performance.'
    ]
  },
  {
    title: '3. How We Use Your Information',
    items: [
      'To respond to enquiries and manage booked calls.',
      'To provide, improve, and secure our website and services.',
      'To analyze website usage and understand visitor interests.',
      'To send relevant follow-up messages related to your request or our services, where permitted by law.'
    ]
  },
  {
    title: '4. Scheduling, Analytics, and Service Providers',
    paragraphs: [
      'We may use trusted third-party providers for scheduling, analytics, communications, hosting, or website operations. Those providers may process personal information on our behalf only as needed to perform their services.'
    ]
  },
  {
    title: '5. Cookies and Similar Technologies',
    paragraphs: [
      'We may use cookies or similar technologies to support site functionality, remember preferences, measure performance, and understand how visitors interact with the site. You can usually control cookies through your browser settings.'
    ]
  },
  {
    title: '6. Data Retention',
    paragraphs: [
      'We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.'
    ]
  },
  {
    title: '7. Data Sharing',
    paragraphs: [
      'We do not sell your personal information. We may share information with service providers, professional advisers, or authorities when reasonably necessary to operate the website, protect our rights, or comply with legal requirements.'
    ]
  },
  {
    title: '8. Data Security',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational measures to protect personal information. However, no internet transmission or storage system can be guaranteed to be fully secure.'
    ]
  },
  {
    title: '9. Your Rights',
    paragraphs: [
      'Depending on your location, you may have rights to request access to, correction of, deletion of, or restriction of your personal information. You may also have the right to object to certain processing activities.'
    ]
  },
  {
    title: '10. Updates to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. When we do, we will post the revised version on this page and update the effective date.'
    ]
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': absoluteUrl('/privacy-policy#webpage'),
      name: 'Privacy Policy | Meridian',
      description: 'Learn how Meridian collects, uses, stores, and protects personal information shared through the website.',
      url: absoluteUrl('/privacy-policy'),
      inLanguage: 'en-US'
    }
  ]
}

const PrivacyPolicyPage = () => {
  return (
    <>
      <LegalDocument
        title='Privacy Policy'
        description='This policy describes what information Meridian may collect through the website and how that information is used, shared, and protected.'
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

export default PrivacyPolicyPage
