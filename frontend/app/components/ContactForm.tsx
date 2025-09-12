'use client'
import {useState} from 'react'
import {Button, Input, Label, Textarea, Field, Fieldset} from '@headlessui/react'

interface ContactFormProps {
  labels: {
    firstName: string
    lastName: string
    email: string
    message: string
    button: string
  }
  validationErrors?: {
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
  onSubmit?: (formData: FormData, isValid: boolean) => void
}

type FieldRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  errorMessages?: {
    required?: string
    minLength?: string
    maxLength?: string
    email?: string
  }
}

type ValidationRules = Record<string, FieldRule>

const FORM_FIELDS = ['firstName', 'lastName', 'email', 'message'] as const
type FormField = (typeof FORM_FIELDS)[number]

export default function ContactForm({
  labels,
  validationErrors,
  placeHolders,
  onSubmit,
}: ContactFormProps) {
  const [values, setValues] = useState<Record<FormField, string>>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const rules: ValidationRules = {
    firstName: {
      required: true,
      minLength: 2,
      errorMessages: {
        required: validationErrors?.required || 'First name is required',
        minLength:
          validationErrors?.firstNameMinLength || 'First name must be at least 2 characters',
      },
    },
    lastName: {
      required: true,
      minLength: 2,
      errorMessages: {
        required: validationErrors?.required || 'Last name is required',
        minLength: validationErrors?.lastNameMinLength || 'Last name must be at least 2 characters',
      },
    },
    email: {
      required: true,
      email: true,
      errorMessages: {
        required: validationErrors?.required || 'Email is required',
        email: validationErrors?.emailInvalid || 'Please enter a valid email address',
      },
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
      errorMessages: {
        required: validationErrors?.required || 'Message is required',
        minLength: validationErrors?.messageMinLength || 'Message must be at least 10 characters',
        maxLength:
          validationErrors?.messageMaxLength || 'Message must be no more than 500 characters',
      },
    },
  }

  const validateField = (name: string, value: string): string | null => {
    const fieldRules = rules[name]
    if (!fieldRules) return null
    const val = value.trim()

    if (fieldRules.required && !val)
      return fieldRules.errorMessages?.required || 'This field is required'
    if (fieldRules.minLength && val.length < fieldRules.minLength)
      return (
        fieldRules.errorMessages?.minLength || `Must be at least ${fieldRules.minLength} characters`
      )
    if (fieldRules.maxLength && val.length > fieldRules.maxLength)
      return (
        fieldRules.errorMessages?.maxLength ||
        `Must be no more than ${fieldRules.maxLength} characters`
      )
    if (fieldRules.email && val && !emailRegex.test(val))
      return fieldRules.errorMessages?.email || 'Please enter a valid email address'

    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setValues((prev) => ({...prev, [name]: value}))

    if (touched[name] || value.trim()) {
      const error = validateField(name, value)
      setErrors((prev) => ({...prev, [name]: error || ''}))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setTouched((prev) => ({...prev, [name]: true}))
    const error = validateField(name, value)
    setErrors((prev) => ({...prev, [name]: error || ''}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    const allTouched = FORM_FIELDS.reduce((acc, field) => ({...acc, [field]: true}), {})
    setTouched(allTouched)

    for (const [key, value] of formData.entries()) {
      const err = validateField(key as string, value.toString())
      if (err) newErrors[key as string] = err
    }

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0

    try {
      await onSubmit?.(formData, isValid)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (name: string) =>
    `w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
      errors[name] ? 'border-red-600 focus:ring-red-500' : 'border-black dark:border-gray-600'
    }`

  const hasErrors = Object.values(errors).some((error) => error)
  const errorCount = Object.values(errors).filter((error) => error).length

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 border border-black p-6 shadow-md dark:bg-gray-800 dark:border-gray-700"
      noValidate
      aria-label="Contact form"
    >
      <Fieldset>
        {hasErrors && (
          <div role="alert" aria-live="polite" className="sr-only">
            Form has {errorCount} error{errorCount !== 1 ? 's' : ''}. Please review and correct the
            highlighted fields.
          </div>
        )}

        {FORM_FIELDS.map((field) => {
          const hasError = !!errors[field]
          const isRequired = rules[field]?.required
          const maxLength = rules[field]?.maxLength

          const placeholder =
            placeHolders?.[field] ||
            (field === 'firstName'
              ? 'Enter your first name'
              : field === 'lastName'
                ? 'Enter your last name'
                : field === 'email'
                  ? 'Enter your email address'
                  : field === 'message'
                    ? 'Enter your message here...'
                    : undefined)

          return (
            <Field className="mb-4" key={field}>
              <Label htmlFor={field} className="block mb-1 font-medium">
                {labels[field]}
                {isRequired && (
                  <span className="text-red-600 ml-1" aria-label="required">
                    *
                  </span>
                )}
              </Label>

              {field === 'message' ? (
                <Textarea
                  id={field}
                  name={field}
                  rows={4}
                  className={inputClasses(field) + ' resize-vertical'}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required={isRequired}
                  maxLength={maxLength}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field}-error` : `${field}-description`}
                  placeholder={placeholder}
                />
              ) : (
                <Input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  className={inputClasses(field)}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required={isRequired}
                  maxLength={field !== 'email' ? rules[field]?.maxLength || undefined : undefined}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field}-error` : `${field}-description`}
                  autoComplete={
                    field === 'firstName'
                      ? 'given-name'
                      : field === 'lastName'
                        ? 'family-name'
                        : field === 'email'
                          ? 'email'
                          : undefined
                  }
                  placeholder={placeholder}
                />
              )}

              <div id={`${field}-description`} className="sr-only">
                {isRequired && 'This field is required. '}
                {rules[field]?.minLength && `Minimum ${rules[field].minLength} characters. `}
                {rules[field]?.maxLength && `Maximum ${rules[field].maxLength} characters. `}
                {field === 'email' && 'Please enter a valid email address format.'}
              </div>

              {hasError && (
                <div
                  id={`${field}-error`}
                  className="text-sm text-red-600 mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  <span className="sr-only">Error: </span>
                  {errors[field]}
                </div>
              )}

              {field === 'message' && maxLength && (
                <div
                  className={`text-xs mt-1 ${values[field].length > maxLength * 0.8 ? 'text-orange-600' : 'text-gray-500'}`}
                  aria-live="polite"
                >
                  {values[field].length}/{maxLength} characters
                </div>
              )}
            </Field>
          )
        })}

        <Button
          type="submit"
          disabled={isSubmitting || hasErrors}
          className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby="submit-description"
        >
          <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white group-disabled:transform-none"></span>
          <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
          <span className="relative text-black dark:text-white">
            {isSubmitting ? 'Sending...' : labels.button}
          </span>
        </Button>

        <div id="submit-description" className="sr-only">
          {isSubmitting
            ? 'Form is being submitted, please wait.'
            : hasErrors
              ? 'Please correct the errors above before submitting.'
              : 'Submit the contact form.'}
        </div>
      </Fieldset>
    </form>
  )
}
