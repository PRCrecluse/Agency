import type { Metadata } from 'next'

import Register from '@/components/auth/register/register'

export const metadata: Metadata = {
  title: 'Register | Meridian',
  robots: 'noindex,nofollow',
  alternates: {
    canonical: '/register'
  }
}

const RegisterPage = () => {
  return <Register />
}

export default RegisterPage
