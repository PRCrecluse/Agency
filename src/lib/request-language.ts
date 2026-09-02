import { headers } from 'next/headers'

import type { SiteLang } from '@/lib/language'

export const getRequestLanguage = async (): Promise<SiteLang> => {
  const requestHeaders = await headers()

  return requestHeaders.get('x-page-locale')?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}
