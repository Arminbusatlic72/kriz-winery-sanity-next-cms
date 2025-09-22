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

const ContactLayout = ({
  title,
  description,
  formLabels,
  validationErrors,
  placeHolders,
  children,
}: ContactLayoutProps) => {
  const handleFormSubmit = async (formData: FormData, isValid: boolean) => {
    if (!isValid) {
      console.log('Form has validation errors')
      return
    }

    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        console.log('Message sent successfully', data)
        alert('Message sent successfully!')
      } else {
        console.error('Error sending message', data)
        alert('Failed to send message.')
      }
    } catch (err) {
      console.error('Error sending message', err)
      alert('Failed to send message.')
    }
  }

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
        onSubmit={handleFormSubmit} // <-- updated here
      />
    </section>
  )
}

export default ContactLayout
