'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { PrimaryFlowButton } from '@/components/ui/flow-button'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <FieldGroup className='gap-4'>
        <Field className='gap-1'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        {/* Password */}
        <Field className='gap-1'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id='password' type={isVisible ? 'text' : 'password'} placeholder='••••••••••••••••' />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* Remember Me and Forgot Password */}
        <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              {' '}
              Remember Me
            </FieldLabel>
          </Field>

          <Link href='/forgot-password' className='text-base text-nowrap hover:underline'>
            Forgot Password?
          </Link>
        </div>

        <Field>
          <PrimaryFlowButton className='w-full *:w-full [&>button]:after:-inset-55' type='submit'>
            Login to flow
          </PrimaryFlowButton>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
