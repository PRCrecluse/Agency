import type { ReactNode } from 'react'

import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Script from 'next/script'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DATAFAST_DOMAIN, DATAFAST_WEBSITE_ID } from '@/lib/analytics/datafast'

import { defaultOgImage, siteDescription, siteKeywords, siteTitle, siteUrl } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  robots: 'index,follow',
  applicationName: 'Meridian',
  keywords: siteKeywords,
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    siteName: 'Meridian',
    url: siteUrl,
    images: [defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage.url]
  }
}

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const pageLocale = (await headers()).get('x-page-locale') === 'zh-CN' ? 'zh-CN' : 'en'

  return (
    <html
      lang={pageLocale}
      className='flex min-h-full w-full scroll-smooth antialiased'
      suppressHydrationWarning
    >
      <head>
        <Script id='datafast-queue' strategy='beforeInteractive'>
          {`window.datafast=window.datafast||function(){window.datafast.q=window.datafast.q||[];window.datafast.q.push(arguments)}`}
        </Script>
      </head>
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Script
          src='https://datafa.st/js/script.js'
          data-website-id={DATAFAST_WEBSITE_ID}
          data-domain={DATAFAST_DOMAIN}
          strategy='afterInteractive'
        />
      </body>
    </html>
  )
}

export default RootLayout
