import type { Metadata } from 'next'

import Login from '@/components/auth/login/login'

export const metadata: Metadata = {
  title: 'Login | Meridian',
  robots: 'noindex,nofollow',
  alternates: {
    canonical: '/login'
  }
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage
