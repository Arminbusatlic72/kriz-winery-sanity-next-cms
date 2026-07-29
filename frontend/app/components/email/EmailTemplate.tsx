import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface TeamNotificationEmailProps {
  firstName: string
  lastName: string
  email: string
  message: string
}

export const TeamNotificationEmail = ({
  firstName,
  lastName,
  email,
  message,
}: TeamNotificationEmailProps) => {
  const fullName = `${firstName} ${lastName}`

  return (
    <Html>
      <Head />
      <Preview>New website enquiry from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandHeader}>
            <Text style={brandName}>VINARIJA KRIZ</Text>
            <Text style={brandTagline}>Website contact form</Text>
          </Section>

          <Section style={content}>
            <Text style={eyebrow}>NEW ENQUIRY</Text>
            <Text style={heading}>A customer sent you a message</Text>
            <Text style={intro}>
              A new enquiry arrived through the contact form on krizwine.com.
            </Text>

            <Section style={details}>
              <Text style={detailLabel}>FROM</Text>
              <Text style={detailValue}>{fullName}</Text>
              <Text style={detailLabel}>EMAIL</Text>
              <Text style={detailValue}>
                <a href={`mailto:${email}`} style={emailLink}>
                  {email}
                </a>
              </Text>
            </Section>

            <Text style={messageLabel}>MESSAGE</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Button style={replyButton} href={`mailto:${email}`}>
              Reply to {firstName}
            </Button>

            <Hr style={divider} />
            <Text style={footer}>
              This notification was sent automatically from the Kriz Winery website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamNotificationEmail

const main = {
  backgroundColor: '#f3f1ec',
  color: '#25251f',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0',
  padding: '32px 12px',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #dedbd2',
  borderRadius: '6px',
  margin: '0 auto',
  maxWidth: '600px',
  overflow: 'hidden',
}

const brandHeader = {
  backgroundColor: '#24372b',
  padding: '25px 38px 23px',
}

const brandName = {
  color: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '22px',
  letterSpacing: '2px',
  lineHeight: '28px',
  margin: '0',
}

const brandTagline = {
  color: '#d9c9a5',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '3px 0 0',
}

const content = {
  padding: '34px 38px 30px',
}

const eyebrow = {
  color: '#8a2635',
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  margin: '0 0 8px',
}

const heading = {
  color: '#25251f',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '28px',
  lineHeight: '35px',
  margin: '0 0 12px',
}

const intro = {
  color: '#66645d',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 26px',
}

const details = {
  borderBottom: '1px solid #e5e2da',
  borderTop: '1px solid #e5e2da',
  padding: '20px 0 8px',
}

const detailLabel = {
  color: '#8a877e',
  fontSize: '10px',
  fontWeight: '700',
  lineHeight: '14px',
  margin: '0 0 2px',
}

const detailValue = {
  color: '#25251f',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 13px',
}

const emailLink = {
  color: '#8a2635',
  textDecoration: 'underline',
}

const messageLabel = {
  color: '#8a877e',
  fontSize: '10px',
  fontWeight: '700',
  lineHeight: '14px',
  margin: '25px 0 8px',
}

const messageBox = {
  backgroundColor: '#f7f6f2',
  borderLeft: '3px solid #b5975b',
  padding: '14px 18px',
}

const messageText = {
  color: '#35342e',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const replyButton = {
  backgroundColor: '#8a2635',
  borderRadius: '3px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  marginTop: '24px',
  padding: '12px 22px',
  textDecoration: 'none',
}

const divider = {
  borderColor: '#e5e2da',
  margin: '30px 0 18px',
}

const footer = {
  color: '#8a877e',
  fontSize: '11px',
  lineHeight: '18px',
  margin: '0',
}
