// __tests__/api/email.route.test.ts

// Mock global Response object (for Next.js route testing)
global.Response = {
  json: (data: any, init?: {status?: number}) => ({
    json: async () => data,
    status: init?.status || 200,
    ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
  }),
} as any

// Mock Resend
const mockEmailSend = jest.fn()
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockEmailSend,
    },
  })),
}))

// Mock email components
jest.mock('@/app/components/email/ConfirmationEmail', () =>
  jest.fn((props) => `ConfirmationEmail-${props.firstName}-${props.lastName}`),
)
jest.mock('@/app/components/email/EmailTemplate', () =>
  jest.fn((props) => `TeamEmail-${props.firstName}-${props.email}`),
)

describe('Email API route (POST)', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeAll(() => {
    originalEnv = {...process.env}
  })

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: 'test-api-key',
      TEAM_EMAIL: 'team@example.com',
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('should send confirmation and team notification emails', async () => {
    mockEmailSend.mockResolvedValue({success: true})

    const {POST} = require('@/app/api/email/route')

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockEmailSend).toHaveBeenCalledTimes(2)

    // Check confirmation email
    expect(mockEmailSend).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: 'Vinarija Kriz Website <onboarding@resend.dev>',
        to: 'john@example.com',
        subject: 'Confirmation: We received your message',
      }),
    )

    // Check team notification email
    expect(mockEmailSend).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: 'Website Contact Form <onboarding@resend.dev>',
        to: 'team@example.com',
        subject: 'New contact form message from John Doe',
      }),
    )
  })

  test('should return 500 if TEAM_EMAIL is missing', async () => {
    delete process.env.TEAM_EMAIL

    const {POST} = require('@/app/api/email/route')

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBeDefined()
    expect(mockEmailSend).not.toHaveBeenCalled()
  })

  test('should handle email sending failure', async () => {
    mockEmailSend.mockRejectedValue(new Error('Email service error'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const {POST} = require('@/app/api/email/route')

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBeDefined()
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  test('should handle invalid request JSON', async () => {
    const {POST} = require('@/app/api/email/route')

    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBeDefined()
    expect(mockEmailSend).not.toHaveBeenCalled()
  })

  test('should handle partial form data', async () => {
    mockEmailSend.mockResolvedValue({success: true})

    const {POST} = require('@/app/api/email/route')

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        firstName: 'John', // missing lastName, email, message
      }),
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(mockEmailSend).toHaveBeenCalledTimes(2)
    expect(data).toBeDefined()
  })
})
