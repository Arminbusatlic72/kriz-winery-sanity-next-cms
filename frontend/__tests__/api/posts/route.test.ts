const jsonMock = jest.fn(
  (data: unknown, init?: {status?: number; headers?: Record<string, string>}) => ({
    json: async () => data,
    status: init?.status ?? 200,
    headers: init?.headers ?? {},
    ok: (init?.status ?? 200) >= 200 && (init?.status ?? 200) < 300,
  }),
)

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: {status?: number; headers?: Record<string, string>}) =>
      jsonMock(data, init),
  },
  NextRequest: class {
    nextUrl: URL
    constructor(url: string) {
      this.nextUrl = new URL(url)
    }
  },
}))

jest.mock('@/app/lib/listing-data', () => ({
  LIST_PAGE_SIZE: 8,
  getPostsPage: jest.fn(),
}))

import {GET} from '@/app/api/posts/route'
import {NextRequest} from 'next/server'

describe('Posts API pagination', () => {
  let getPostsPageMock: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    const listingData = require('@/app/lib/listing-data')
    getPostsPageMock = listingData.getPostsPage
  })

  it('returns items, hasMore and nextOffset contract', async () => {
    getPostsPageMock.mockResolvedValue({
      items: [{_id: '1', title: 'A', slug: 'a', excerpt: '', date: '2026-03-01'}],
      hasMore: true,
      nextOffset: 8,
    })

    const req = new NextRequest('http://localhost/api/posts?locale=en&offset=0&limit=8')
    const res = await GET(req)
    const payload = await res.json()

    expect(getPostsPageMock).toHaveBeenCalledWith('en', 0, 8)
    expect(payload).toEqual({
      items: [{_id: '1', title: 'A', slug: 'a', excerpt: '', date: '2026-03-01'}],
      hasMore: true,
      nextOffset: 8,
    })
    expect(payload).toHaveProperty('items')
    expect(payload).toHaveProperty('hasMore')
    expect(payload).toHaveProperty('nextOffset')
  })

  it('falls back to default pagination values for invalid params', async () => {
    getPostsPageMock.mockResolvedValue({
      items: [],
      hasMore: false,
      nextOffset: 0,
    })

    const req = new NextRequest('http://localhost/api/posts?locale=hr&offset=-10&limit=-1')
    await GET(req)

    expect(getPostsPageMock).toHaveBeenCalledWith('hr', 0, 8)
  })
})
