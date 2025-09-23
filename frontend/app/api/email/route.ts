// import {Resend} from 'resend'
// import ConfirmationEmail from '@/app/components/email/ConfirmationEmail'
// import TeamNotificationEmail from '@/app/components/email/EmailTemplate'

// // Initialize Resend with your API key

// const resend = new Resend(process.env.RESEND_API_KEY)
// const teamEmail = process.env.TEAM_EMAIL
// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const {firstName, lastName, email, message} = body
//     if (!teamEmail) {
//       throw new Error('TEAM_EMAIL is not configured in environment variables')
//     }
//     // 1️⃣ Send confirmation email to user
//     await resend.emails.send({
//       from: 'Vinarija Kriz Website <onboarding@resend.dev>',
//       to: email,
//       subject: 'Confirmation: We received your message',
//       react: ConfirmationEmail({firstName, lastName}),
//     })

//     // 2️⃣ Send actual message to your team
//     await resend.emails.send({
//       from: 'Website Contact Form <onboarding@resend.dev>',
//       to: teamEmail,
//       subject: `New contact form message from ${firstName} ${lastName}`,
//       react: TeamNotificationEmail({firstName, lastName, email, message}),
//     })

//     return Response.json({success: true})
//   } catch (error) {
//     console.error('Error sending emails:', error)
//     return Response.json({error}, {status: 500})
//   }
// }

import {Resend} from 'resend'
import ConfirmationEmail from '@/app/components/email/ConfirmationEmail'
import TeamNotificationEmail from '@/app/components/email/EmailTemplate'

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const teamEmail = process.env.TEAM_EMAIL

    const body = await req.json()
    const {firstName, lastName, email, message} = body
    if (!teamEmail) {
      throw new Error('TEAM_EMAIL is not configured in environment variables')
    }
    // 1️⃣ Send confirmation email to user
    await resend.emails.send({
      from: 'Vinarija Kriz Website <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmation: We received your message',
      react: ConfirmationEmail({firstName, lastName}),
    })

    // 2️⃣ Send actual message to your team
    await resend.emails.send({
      from: 'Website Contact Form <onboarding@resend.dev>',
      to: teamEmail,
      subject: `New contact form message from ${firstName} ${lastName}`,
      react: TeamNotificationEmail({firstName, lastName, email, message}),
    })

    return Response.json({success: true})
  } catch (error) {
    console.error('Error sending emails:', error)
    return Response.json({error}, {status: 500})
  }
}
