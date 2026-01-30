

'use client'

import React, {ReactNode} from 'react'
import ContactForm from '@/app/components/ContactForm'
// import Map from '@/app/components/Map'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/app/components/Map'), {ssr: false})

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
//     <section
//       className="px-6 py-12 md:flex md:gap-16"
//       style={{minHeight: 'calc(100vh - var(--header-height) - var(--footer-height))'}}
//     >
//       <div className="mb-10 max-w-md text-left md:mb-0">
//         <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
//         <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
//           {title}
//         </h2>
//       </div>
//        <div className="md:sticky md:top-24 self-start">
//           <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
//             {description}
//           </div>
//       </div>
//         {/* MAP */}
//        <div className="relative z-0">
//   <LeafletMap />
// </div>

//         {children && <div className="mt-6">{children}</div>}
//       </div>

//       <ContactForm
//         labels={formLabels}
//         validationErrors={validationErrors}
//         placeHolders={placeHolders}
//         onSubmit={handleFormSubmit}
//       />
//     </section>


 <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-5 lg:pb-8 md:space-y-5">
        <h2 className="font-strangelove text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div className="items-start space-y-8 pt-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        {/* Text */}
       <div className="md:top-24 self-start">
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            {description}
          </div>
          <div className="relative z-0">
 <LeafletMap />
 </div>
      </div>
 
        {/* Images */}
        <div className="grid grid-cols-1 gap-4">
          <ContactForm
       labels={formLabels}
       validationErrors={validationErrors}
      placeHolders={placeHolders}
     onSubmit={handleFormSubmit}
      />
          
        </div>
      </div>

      {/* Optional children */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}

export default ContactLayout
