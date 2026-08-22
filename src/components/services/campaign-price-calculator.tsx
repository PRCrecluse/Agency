'use client'

import * as React from 'react'

import { NumberTicker } from '@/components/ui/number-ticker'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'

const PRICE_PER_POST = 125
const DEFAULT_POST_COUNT = 20
const MIN_POST_COUNT = 1
const MAX_POST_COUNT = 100

const CampaignPriceCalculator = () => {
  const [postCount, setPostCount] = React.useState(DEFAULT_POST_COUNT)

  return (
    <Card className='border bg-card/85 backdrop-blur-sm'>
      <CardContent className='grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)] lg:items-end'>
        <div className='space-y-5'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold'>价格计算器</p>
            <p className='text-muted-foreground text-sm leading-6 sm:text-[15px]'>
              拖动帖子数量，快速估算 Campaign 执行预算。当前按每条帖子 $125 USD 计算。
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-end justify-between gap-4'>
              <div>
                <p className='text-muted-foreground text-xs'>帖子数量</p>
                <p className='mt-1 text-3xl font-semibold tracking-tight'>{postCount} 条</p>
              </div>
              <p className='text-muted-foreground text-sm'>可拖动调整</p>
            </div>

            <Slider
              value={[postCount]}
              min={MIN_POST_COUNT}
              max={MAX_POST_COUNT}
              step={1}
              onValueChange={value => setPostCount(value[0] ?? DEFAULT_POST_COUNT)}
              aria-label='Campaign 帖子数量'
            />

            <div className='text-muted-foreground flex items-center justify-between text-xs'>
              <span>{MIN_POST_COUNT} 条</span>
              <span>{MAX_POST_COUNT} 条</span>
            </div>
          </div>
        </div>

        <div className='rounded-2xl border bg-background/70 p-5 sm:p-6'>
          <p className='text-muted-foreground text-xs'>预估总价</p>
          <div className='mt-2 flex items-baseline gap-2'>
            <span className='text-2xl font-semibold'>$</span>
            <NumberTicker value={postCount * PRICE_PER_POST} className='text-4xl font-semibold tracking-tight sm:text-5xl' />
            <span className='text-muted-foreground text-sm font-medium'>USD</span>
          </div>
          <p className='text-muted-foreground mt-3 text-sm leading-6'>20 条帖子批次起步价为 $2,500 USD。附加的链接、浏览量承诺或高级保障将单独计费。</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CampaignPriceCalculator
