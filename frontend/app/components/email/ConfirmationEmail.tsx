import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  firstName: string
  lastName: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krizwine.com'

export const ContactConfirmationEmail = ({
  firstName,
  lastName,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting Kriz Winery</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandHeader}>
          <Img
            src="https://krizwine.com/static/images/logo/kriz-favicon.jpg"
            width="92"
            height="82"
            alt="Kriz Winery"
            style={logo}
          />
          <Text style={brandTagline}>Natural wines from Peljesac</Text>
        </Section>

        <Section style={content}>
          <Text style={eyebrow}>MESSAGE RECEIVED</Text>
          <Text style={heading}>Thank you for getting in touch</Text>
          <Text style={greeting}>
            Hello {firstName} {lastName},
          </Text>
          <Text style={paragraph}>
            We have received your message. Our family is often busy in the vineyard and cellar,
            but we will reply as soon as possible.
          </Text>
          <Text style={paragraph}>
            Tastings and wine purchases are available by appointment. We look forward to welcoming
            you to Kriz Winery.
          </Text>

          <Button style={button} href={siteUrl}>
            Visit krizwine.com
          </Button>

          <Text style={signoff}>
            Warm regards,
            <br />
            The Kriz Winery family
          </Text>

          <Hr style={divider} />
          <Text style={footer}>
            This is an automatic confirmation. Reply to this email to contact the winery directly.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

ContactConfirmationEmail.PreviewProps = {
  firstName: 'Alan',
  lastName: 'Smith',
} as ContactConfirmationEmailProps

export default ContactConfirmationEmail

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
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e2da',
  padding: '24px 38px 20px',
  textAlign: 'center' as const,
}

const logo = {
  display: 'block',
  height: '82px',
  margin: '0 auto',
  width: '92px',
}

const brandTagline = {
  color: '#6f6c63',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '8px 0 0',
}

const content = {
  padding: '38px 42px 32px',
}

const eyebrow = {
  color: '#8a2635',
  fontSize: '11px',
  fontWeight: '700',
  lineHeight: '16px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const heading = {
  color: '#25251f',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '30px',
  lineHeight: '38px',
  margin: '0 0 28px',
  textAlign: 'center' as const,
}

const greeting = {
  color: '#25251f',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '25px',
  margin: '0 0 12px',
}

const paragraph = {
  color: '#55534c',
  fontSize: '15px',
  lineHeight: '25px',
  margin: '0 0 16px',
}

const button = {
  backgroundColor: '#8a2635',
  borderRadius: '3px',
  color: '#ffffff',
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  margin: '27px auto',
  padding: '13px 20px',
  textAlign: 'center' as const,
  textDecoration: 'none',
}

const signoff = {
  color: '#35342e',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '24px 0 0',
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
  textAlign: 'center' as const,
}
