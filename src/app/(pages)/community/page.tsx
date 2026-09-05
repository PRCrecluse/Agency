import type { Metadata } from 'next'
import Image from 'next/image'

import { MessageCircleMoreIcon, ScanLineIcon } from 'lucide-react'

import communityQr from '../../../../企业微信.png'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '加入 Meridian 社群',
  description: '添加社群小助理，加入 Meridian 出海增长与实战交流社群。',
  path: '/community',
  language: 'zh'
})

const CommunityPage = () => {
  return (
    <section className='relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
      <div className='bg-primary/10 absolute top-8 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full blur-3xl' />
      <div className='bg-secondary/15 absolute right-0 bottom-0 -z-10 size-72 rounded-full blur-3xl' />

      <div className='mx-auto flex w-full max-w-3xl flex-col items-center text-center'>
        <div className='bg-background text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm'>
          <MessageCircleMoreIcon className='size-4' />
          Meridian 社群
        </div>
        <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
          添加社群小助理，拉你进群
        </h1>
        <p className='text-muted-foreground mt-5 max-w-xl text-base leading-7 text-pretty sm:text-lg'>
          使用微信扫描下方二维码，添加小助理后备注“进群”。
        </p>

        <div className='bg-card mt-10 w-full max-w-sm rounded-[2rem] border p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] sm:p-7'>
          <div className='overflow-hidden rounded-[1.4rem] bg-white p-3'>
            <Image
              src={communityQr}
              alt='Meridian 社群小助理企业微信二维码'
              priority
              className='h-auto w-full [image-rendering:auto]'
            />
          </div>
          <div className='text-muted-foreground flex items-center justify-center gap-2 px-3 pt-5 text-sm'>
            <ScanLineIcon className='size-4' />
            微信扫码添加社群小助理
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityPage
