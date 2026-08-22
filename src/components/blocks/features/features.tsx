import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const coreReasons = [
  {
    title: 'Brand Taste That Travels',
    description:
      'We understand the aesthetic, messaging, and execution standards top international brands expect, then translate them into market-ready growth work.',
    image: '/attachphotos/datadrivengrowth.png',
    imageAlt: 'Data-driven growth visual'
  },
  {
    title: 'AI-Native by Default',
    description:
      'Our team works inside modern AI workflows and collaborates closely with global AI companies and brands, so strategy, content, and execution stay tightly connected.',
    image: '/attachphotos/ainativegrowth.png',
    imageAlt: 'AI-native growth workflow visual'
  },
  {
    title: 'Technical + Product Depth',
    description:
      'We bring real operator depth from building our own B2B SaaS to a 20% paid conversion rate, with hands-on experience across launch videos, SEO growth, and social media operations.',
    image: '/attachphotos/fastdeliver.png',
    imageAlt: 'Fast delivery operations visual'
  }
] as const

const aiSystems = [
  {
    title: 'Reddit marketing agent',
    description: 'Automates Reddit discovery, reply workflows, and demand capture for growth teams.',
    image: '/attachphotos/redditgrowth.png',
    imageAlt: 'Reddit marketing agent product screenshot'
  },
  {
    title: 'X Growth Agent',
    description: 'Turns X content, lead generation, and outreach into one continuous AI-powered system.',
    image: '/attachphotos/twittergrowth.png',
    imageAlt: 'X growth agent product screenshot'
  },
  {
    title: 'Backlink community',
    description: 'Builds scalable partner discovery and backlink exchange workflows to strengthen SEO authority.',
    image: '/attachphotos/backlinkcommunity.png',
    imageAlt: 'Backlink community product screenshot'
  }
] as const

const Features = () => {
  return (
    <section id='features' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 50 }}
          blur
          transition={{ duration: 0.5 }}
          className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'
        >
          <p className='text-primary text-sm font-medium uppercase'>Highlights</p>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Three Reasons Global Teams Work With Us</h2>

          <p className='text-muted-foreground text-xl'>
            We combine sharp brand taste, AI-native execution, and hands-on technical depth in one global growth
            partner.
          </p>
        </MotionPreset>

        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          {coreReasons.map((item, index) => (
            <MotionPreset
              key={item.title}
              fade
              slide={{ direction: 'down', offset: 35 }}
              delay={index * 0.15}
              transition={{ duration: 0.5 }}
              className='h-full'
            >
              <Card className='h-full justify-between gap-0 pt-0 shadow-none'>
                <div className='relative aspect-[16/10] overflow-hidden rounded-t-xl border-b bg-[#eef2f5]'>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className='object-cover object-center'
                    sizes='(max-width: 1279px) 100vw, 33vw'
                  />
                </div>

                <CardContent className='flex flex-1 flex-col gap-4 pt-6'>
                  <h5 className='text-2xl font-semibold'>{item.title}</h5>
                  <p className='text-muted-foreground text-base'>{item.description}</p>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}
        </div>

        <MotionPreset
          fade
          slide={{ direction: 'down', offset: 50 }}
          blur
          transition={{ duration: 0.5 }}
          className='mt-16 space-y-4 text-center sm:mt-20 lg:mt-24'
        >
          <p className='text-primary text-sm font-medium uppercase'>AI Systems</p>

          <h3 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Proprietary AI SaaS Systems, Powered by a Strong Technical Engine
          </h3>

          <p className='text-muted-foreground text-xl'>
            We turn growth execution into reusable AI agents and product systems, so strategy, distribution,
            conversion, and SEO can compound together.
          </p>
        </MotionPreset>

        <div className='mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3'>
          {aiSystems.map((item, index) => (
            <MotionPreset
              key={item.title}
              fade
              slide={{ direction: 'down', offset: 35 }}
              delay={index * 0.15}
              transition={{ duration: 0.5 }}
              className='h-full'
            >
              <Card className='h-full justify-between gap-0 pt-0 shadow-none'>
                <div className='relative aspect-[16/10] overflow-hidden rounded-t-xl border-b bg-[#f5f5f4] p-4'>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className='object-contain p-2'
                    sizes='(max-width: 1279px) 100vw, 33vw'
                  />
                </div>

                <CardContent className='flex flex-1 flex-col gap-4 pt-6'>
                  <h5 className='text-2xl font-semibold'>{item.title}</h5>
                  <p className='text-muted-foreground text-base'>{item.description}</p>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
