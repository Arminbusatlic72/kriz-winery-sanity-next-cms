const jsonMock = jest.fn()

jest.mock('next/server', () => {
  return {
    NextResponse: {json: jsonMock},
    NextRequest: class {
      url: string
      constructor(url: string) {
        this.url = url
      }
    },
    __jsonMock: jsonMock, // expose for assertions
  }
})

// Mock Sanity client
const fetchMock = jest.fn()
jest.mock('@/sanity/lib/client', () => ({
  client: {fetch: fetchMock},
}))

describe('Localized Slug API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns 400 if slug is missing', async () => {
    const {GET} = require('@/app/api/localized-slug/route')

    const req = new (require('next/server').NextRequest)('http://localhost/api/localized-slug')
    await GET(req)

    expect(jsonMock).toHaveBeenCalledWith({error: 'Missing slug parameter'}, {status: 400})
  })

  test('returns 404 if no result is found', async () => {
    fetchMock.mockResolvedValueOnce(null)

    const {GET} = require('@/app/api/localized-slug/route')
    const req = new (require('next/server').NextRequest)(
      'http://localhost/api/localized-slug?slug=test-slug',
    )
    await GET(req)

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {slug: 'test-slug'})

    expect(jsonMock).toHaveBeenCalledWith({error: 'No localized slugs found'}, {status: 404})
  })

  test('returns localized slugs if found', async () => {
    const mockResult = {_type: 'post', en: 'test-en', hr: 'test-hr'}
    fetchMock.mockResolvedValueOnce(mockResult)

    const {GET} = require('@/app/api/localized-slug/route')
    const req = new (require('next/server').NextRequest)(
      'http://localhost/api/localized-slug?slug=test-slug',
    )
    await GET(req)

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {slug: 'test-slug'})

    expect(jsonMock).toHaveBeenCalledWith(mockResult)
  })

  test('returns 500 if client fetch throws an error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Sanity error'))

    const {GET} = require('@/app/api/localized-slug/route')
    const req = new (require('next/server').NextRequest)(
      'http://localhost/api/localized-slug?slug=test-slug',
    )
    await GET(req)

    expect(jsonMock).toHaveBeenCalledWith({error: 'Failed to fetch localized slugs'}, {status: 500})
  })
})
