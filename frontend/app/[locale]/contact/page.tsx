import type {Metadata} from 'next'
import {useTranslations} from 'next-intl'
import ContactLayout from '@/app/layouts/ContactLayout'

type Props = {
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params

  return {
    title: locale === 'hr' ? 'Kontakt' : 'Contact',
    description:
      locale === 'hr'
        ? 'Kontaktirajte nas za kušanje i kupnju vina.'
        : 'Get in touch for wine tastings and purchases.',
    alternates: {
      canonical: locale === 'hr' ? '/hr/kontaktirajte-nas' : '/en/contact',
      languages: {
        en: '/en/contact',
        hr: '/hr/kontaktirajte-nas',
      },
    },
  }
}

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
