'use client'

import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { PrimaryFlowButton } from '@/components/ui/flow-button'

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className='gap-4'>
        {/* Username */}
        <Field className='gap-1'>
          <FieldLabel htmlFor='username'>Username*</FieldLabel>
          <Input type='text' id='username' placeholder='Enter your username' />
        </Field>
        {/* Email */}
        <Field className='gap-1'>
          <FieldLabel htmlFor='userEmail'>Email address*</FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        {/* Password */}
        <Field className='w-full gap-1'>
          <FieldLabel className='leading-5' htmlFor='password'>
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='••••••••••••••••'
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsPasswordVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Confirm Password */}
        <Field className='w-full gap-1'>
          <FieldLabel className='leading-5' htmlFor='confirmPassword'>
            Confirm Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='confirmPassword'
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder='••••••••••••••••'
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Privacy policy */}
        <Field orientation='horizontal' className='flex items-center gap-2'>
          <Checkbox id='rememberMe' />
          <FieldLabel htmlFor='rememberMe'>
            <span className='text-muted-foreground'>I agree to</span>{' '}
            <Link href='/privacy-policy' className='hover:underline'>
              privacy policy
            </Link>{' '}
            &{' '}
            <Link href='/terms-conditions' className='hover:underline'>
              terms
            </Link>
          </FieldLabel>
        </Field>
        <Field>
          <PrimaryFlowButton className='w-full *:w-full [&>button]:after:-inset-55' type='submit'>
            Sign up to Meridian
          </PrimaryFlowButton>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default RegisterForm
