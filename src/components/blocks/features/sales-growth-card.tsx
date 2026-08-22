'use client'

import { GlobeIcon, StoreIcon, TrendingUpIcon } from 'lucide-react'

import { Bar, ComposedChart, Line, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { MotionPreset } from '@/components/ui/motion-preset'

import StatCard from '@/components/blocks/features//stat-card'

const chartData = [
  { time: 'W1', uv: 62, pv: 58 },
  { time: 'W2', uv: 70, pv: 64 },
  { time: 'W3', uv: 82, pv: 73 },
  { time: 'W4', uv: 96, pv: 84 },
  { time: 'W5', uv: 104, pv: 95 },
  { time: 'W6', uv: 118, pv: 106 },
  { time: 'W7', uv: 134, pv: 119 },
  { time: 'W8', uv: 148, pv: 128 },
  { time: 'W9', uv: 160, pv: 141 },
  { time: 'W10', uv: 176, pv: 154 },
  { time: 'W11', uv: 190, pv: 168 },
  { time: 'W12', uv: 204, pv: 182 }
]

const totalEarningChartConfig = {
  uv: {
    label: 'SEO Growth',
    color: 'color-mix(in oklab, var(--primary) 20%, var(--background))'
  },
  pv: {
    label: 'Social Ops',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

const SalesGrowthCard = () => {
  return (
    <Card className='h-full justify-between gap-11 shadow-none'>
      <div className='flex flex-col gap-8'>
        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 35 }}
          delay={0.75}
          transition={{ duration: 0.5 }}
          className='px-6'
        >
          <StatCard
            avatarIcon={<TrendingUpIcon className='size-4' />}
            title='Paid SaaS conversion'
            statNumber='20%'
            percentage={20}
            className='w-full p-6 shadow-lg'
          />
        </MotionPreset>

        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 35 }}
          delay={0.9}
          transition={{ duration: 0.5 }}
          className='text-muted-foreground flex flex-col gap-4 py-6 text-sm'
        >
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between gap-2 py-2'>
                <div className='flex items-center gap-2'>
                  <GlobeIcon className='size-4' />
                    <span>Launch videos</span>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <span className='font-medium'>End-to-end</span>
                    <span className='text-card-foreground'>0 to publish</span>
                </div>
              </div>
              <div className='flex items-center justify-between gap-2 py-2'>
                <div className='flex items-center gap-2'>
                  <StoreIcon className='size-4' />
                    <span>SEO & social ops</span>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <span className='font-medium'>Full-stack</span>
                    <span className='text-card-foreground'>Compounding</span>
                </div>
              </div>
            </div>
            <div>
              <Separator />
            </div>
          </CardContent>
          <MotionPreset fade slide={{ direction: 'down', offset: 35 }} delay={1.05} transition={{ duration: 0.5 }}>
            <ChartContainer config={totalEarningChartConfig} className='h-39.25 w-full'>
              <ComposedChart data={chartData} margin={{ top: 4, right: 0, left: 0 }}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <XAxis
                  dataKey='time'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={15}
                  tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }}
                />
                <Bar dataKey='uv' barSize={16} fill='var(--color-uv)' radius={2} />
                <Line type='linear' dataKey='pv' stroke='var(--color-pv)' dot={false} strokeWidth={3} />
              </ComposedChart>
            </ChartContainer>
          </MotionPreset>
        </MotionPreset>
      </div>

      <CardContent className='flex flex-col gap-4'>
        <MotionPreset
          component='h5'
          fade
          slide={{ direction: 'down', offset: 35 }}
          delay={1.2}
          inView={false}
          transition={{ duration: 0.5 }}
          className='text-2xl font-semibold'
        >
          Technical + Product Depth
        </MotionPreset>
        <MotionPreset
          component='p'
          fade
          slide={{ direction: 'down', offset: 35 }}
          delay={1.35}
          inView={false}
          transition={{ duration: 0.5 }}
          className='text-muted-foreground text-base'
        >
          We bring real operator depth from building our own B2B SaaS to a 20% paid conversion rate, with hands-on
          experience across launch videos, SEO growth, and social media operations.
        </MotionPreset>
      </CardContent>
    </Card>
  )
}

export default SalesGrowthCard
