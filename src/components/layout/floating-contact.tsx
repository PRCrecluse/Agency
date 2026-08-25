'use client'

import { useEffect, useId, useRef, useState } from 'react'

import Image from 'next/image'

import { MessageCircleMoreIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const contactOptions = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Scan to chat',
    imageSrc: '/contacts/whatsappbusiness.jpg',
    imageAlt: 'WhatsApp contact QR code',
    width: 1041,
    height: 1164
  },
  {
    id: 'wechat',
    label: 'WeChat',
    description: 'Scan to connect',
    imageSrc: '/contacts/wechat.jpg',
    imageAlt: 'WeChat contact QR code',
    width: 888,
    height: 1131
  }
] as const

const FloatingContact = () => {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className='pointer-events-none fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6'
    >
      <div
        id={panelId}
        className={cn(
          'pointer-events-auto absolute right-0 bottom-[calc(100%+0.75rem)] origin-bottom-right transition-all duration-200 ease-out',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0',
          open ? '' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div className='w-[min(29rem,calc(100vw-1.5rem))] rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(27,27,30,0.94)_0%,rgba(12,12,14,0.92)_100%)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-5'>
          <div className='grid grid-cols-2 gap-4'>
            {contactOptions.map(option => (
              <div
                key={option.id}
                className='rounded-[24px] border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
              >
                <div className='mb-3'>
                  <p className='text-[1.55rem] leading-none font-semibold text-white'>{option.label}</p>
                  <p className='mt-1 text-base text-white/62'>{option.description}</p>
                </div>
                <div className='overflow-hidden rounded-[22px] border border-white/12 bg-white p-2.5'>
                  <Image
                    src={option.imageSrc}
                    alt={option.imageAlt}
                    width={option.width}
                    height={option.height}
                    className='h-auto w-full rounded-[18px] object-cover'
                    sizes='(max-width: 640px) 42vw, 220px'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type='button'
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
        className='pointer-events-auto inline-flex size-14 items-center justify-center rounded-full border border-white/20 bg-neutral-950 text-white shadow-[0_10px_32px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95'
      >
        {open ? <XIcon className='size-5' /> : <MessageCircleMoreIcon className='size-5' />}
      </button>
    </div>
  )
}

export default FloatingContact
