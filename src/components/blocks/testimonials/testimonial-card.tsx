import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

import { Rating } from '@/components/ui/rating'

export type TestimonialItem = {
  name: string
  username: string
  avatar?: string
  content: React.ReactNode
  rating: number
  href?: string
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
  const card = (
    <Card className='h-full max-w-sm justify-between shadow-lg'>
      <CardContent>
        <p className='text-muted-foreground text-base'>{testimonial.content}</p>
      </CardContent>
      <CardContent className='flex justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-12'>
            {testimonial.avatar ? <AvatarImage src={testimonial.avatar} alt={testimonial.name} /> : null}
            <AvatarFallback className='text-sm'>
              {testimonial.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='flex items-center gap-1 text-base'>{testimonial.name}</CardTitle>
            <CardDescription className='text-base'>{testimonial.username}</CardDescription>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <Rating readOnly variant='yellow' size={24} value={testimonial.rating} precision={0.5} />
        </div>
      </CardContent>
    </Card>
  )

  if (testimonial.href) {
    return (
      <Link
        href={testimonial.href}
        target='_blank'
        rel='noreferrer'
        aria-label={`Open testimonial source for ${testimonial.name}`}
        className='block transition-transform duration-200 hover:-translate-y-1'
      >
        {card}
      </Link>
    )
  }

  return card
}

export default TestimonialCard
