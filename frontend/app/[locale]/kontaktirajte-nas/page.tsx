import {useTranslations} from 'next-intl'
import ContactLayout from '@/app/layouts/ContactLayout'

export default function ContactPage() {
  const t = useTranslations('Contact')

  return (
    <ContactLayout
      title={t('title')}
      description={t('description')}
      formLabels={{
        firstName: t('form.firstName'),
        lastName: t('form.lastName'),
        email: t('form.email'),
        message: t('form.message'),
        button: t('form.button'),
      }}
      validationErrors={{
        required: t('validation.required'),
        minLength: t('validation.minLength'),
        maxLength: t('validation.maxLength'),
        emailInvalid: t('validation.emailInvalid'),
        firstNameMinLength: t('validation.firstNameMinLength'),
        lastNameMinLength: t('validation.lastNameMinLength'),
        messageMinLength: t('validation.messageMinLength'),
        messageMaxLength: t('validation.messageMaxLength'),
      }}
      placeHolders={{
        firstName: t('placeHolders.firstName'),
        lastName: t('placeHolders.lastName'),
        email: t('placeHolders.email'),
        message: t('placeHolders.message'),
      }}
    />
  )
}
