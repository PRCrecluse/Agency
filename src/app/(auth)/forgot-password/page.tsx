import type { Metadata } from 'next'

import ForgotPassword from '@/components/auth/forgot-password/forgot-password'

export const metadata: Metadata = {
  title: 'Forgot password | Meridian',
  robots: 'noindex,nofollow',
  alternates: {
    canonical: '/forgot-password'
  }
}

const ForgotPasswordPage = () => {
  return <ForgotPassword />
}

export default ForgotPasswordPage
