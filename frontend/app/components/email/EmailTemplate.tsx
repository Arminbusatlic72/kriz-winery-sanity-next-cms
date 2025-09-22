import {Body, Container, Head, Html, Preview, Section, Text} from '@react-email/components'

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
}: TeamNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>
      New contact form message from {firstName} {lastName}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>
          You have received a new message from the website contact form:
        </Text>
        <Section style={section}>
          <Text style={label}>
            <strong>From:</strong> {firstName} {lastName} ({email})
          </Text>
          <Text style={label}>
            <strong>Message:</strong>
          </Text>
          <Text style={messageText}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default TeamNotificationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const section = {
  marginTop: '10px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
}

const label = {
  fontSize: '14px',
  marginBottom: '6px',
}

const messageText = {
  fontSize: '15px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
}
