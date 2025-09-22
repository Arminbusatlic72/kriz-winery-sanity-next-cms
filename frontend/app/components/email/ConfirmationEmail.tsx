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

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const ContactConfirmationEmail = ({firstName, lastName}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Thank you for contacting Kriz Vinarija!</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/images/logo/kriz-logo.jpg`} // Replace with your logo path
          width="170"
          height="50"
          alt="Kriz Vinarija"
          style={logo}
        />
        <Text style={paragraph}>
          Hi {firstName} {lastName},
        </Text>
        <Text style={paragraph}>
          Thank you for reaching out to Kriz Vinarija. We have received your message and our team
          will get back to you as soon as possible.
        </Text>
        <Text style={paragraph}>
          In the meantime, feel free to check our website for more information.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://kriz-vinarija.com">
            Visit Our Website
          </Button>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />
          The Kriz Vinarija Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Kriz Vinarija, Your Address Here</Text>
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
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
