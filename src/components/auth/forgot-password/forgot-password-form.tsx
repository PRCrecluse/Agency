'use client'

import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { PrimaryFlowButton } from '@/components/ui/flow-button'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'

const ForgotPasswordForm = () => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/reset-password')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field className='gap-1'>
          <FieldLabel className='leading-5' htmlFor='userEmail'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        <Field>
          <PrimaryFlowButton className='w-full *:w-full [&>button]:after:-inset-55' type='submit'>
            Reset password
          </PrimaryFlowButton>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ForgotPasswordForm
