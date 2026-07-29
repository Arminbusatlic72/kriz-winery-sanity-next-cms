import {Resend} from 'resend'
import ConfirmationEmail from '@/app/components/email/ConfirmationEmail'
import TeamNotificationEmail from '@/app/components/email/EmailTemplate'

type EmailPayload = {
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  message?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function requiredString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== 'string') {
    throw new Error(`${field} is required`)
  }

  const normalized = value.trim()
  if (!normalized || normalized.length > maxLength) {
    throw new Error(`${field} is invalid`)
  }

  return normalized
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const teamEmail = process.env.TEAM_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!apiKey || !teamEmail || !fromEmail) {
      throw new Error('RESEND_API_KEY, TEAM_EMAIL, and RESEND_FROM_EMAIL must be configured')
    }

    const body = (await req.json()) as EmailPayload
    const firstName = requiredString(body.firstName, 'firstName', 100)
    const lastName = requiredString(body.lastName, 'lastName', 100)
    const email = requiredString(body.email, 'email', 254)
    const message = requiredString(body.message, 'message', 500)

    if (!emailPattern.test(email)) {
      throw new Error('email is invalid')
    }

    const resend = new Resend(apiKey)

    // A confirmation failure must not prevent the team from receiving the message.
    const teamResult = await resend.emails.send({
      from: fromEmail,
      to: teamEmail,
      replyTo: email,
      subject: `New contact form message from ${firstName} ${lastName}`,
      react: TeamNotificationEmail({firstName, lastName, email, message}),
    })

    if (teamResult.error) {
      throw new Error(`Team notification failed: ${teamResult.error.message}`)
    }

    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: teamEmail,
      subject: 'Confirmation: We received your message',
      react: ConfirmationEmail({firstName, lastName}),
    })

    if (confirmationResult.error) {
      console.error('Customer confirmation failed:', confirmationResult.error)
    }

    return Response.json({success: true, confirmationSent: !confirmationResult.error})
  } catch (error) {
    console.error('Error sending emails:', error)
    const message = error instanceof Error ? error.message : 'Unable to send email'
    return Response.json({error: message}, {status: 500})
  }
}
