import type { Metadata } from 'next'

import ResetPassword from '@/components/auth/reset-password/reset-password'

export const metadata: Metadata = {
  title: 'Reset password | Meridian',
  robots: 'noindex,nofollow',
  alternates: {
    canonical: '/reset-password'
  }
}

const ResetPasswordPage = () => {
  return <ResetPassword />
}

export default ResetPasswordPage
