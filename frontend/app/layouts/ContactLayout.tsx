'use client'

import React, {ReactNode} from 'react'
import ContactForm from '@/app/components/ContactForm'

interface ContactLayoutProps {
  title: string
  description: string
  formLabels: {
    firstName: string
    lastName: string
    email: string
    message: string
    button: string
  }
  validationErrors: {
    required: string
    minLength: string
    maxLength: string
    emailInvalid: string
    firstNameMinLength: string
    lastNameMinLength: string
    messageMinLength: string
    messageMaxLength: string
  }
  placeHolders?: {
    firstName?: string
    lastName?: string
    email?: string
    message?: string
  }
  children?: ReactNode
}
const handleFormSubmit = (formData: FormData, isValid: boolean) => {
  if (isValid) {
    // Process form submission
    console.log('Form is valid, submitting...')
  } else {
    console.log('Form has validation errors')
  }
}

const ContactLayout = ({
  title,
  description,
  formLabels,
  validationErrors,
  placeHolders,
  children,
}: ContactLayoutProps) => {
  return (
    <section
      className="px-6 py-12 md:flex md:items-center md:justify-center md:gap-16"
      style={{minHeight: 'calc(100vh - var(--header-height) - var(--footer-height))'}}
    >
      <div className="mb-10 max-w-md text-left md:mb-0">
        <h2 className="font-strangelove mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{description}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>

      <ContactForm
        labels={formLabels}
        validationErrors={validationErrors}
        placeHolders={placeHolders}
        onSubmit={handleFormSubmit}
      />
    </section>
  )
}

export default ContactLayout
