// __tests__/api/search/route.test.ts

// 1️⃣ Define jsonMock BEFORE jest.mock
const jsonMock = jest.fn((data: any, init?: {status?: number}) => ({
  json: async () => data,
  status: init?.status || 200,
  ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
}))

// 2️⃣ Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: {status?: number}) => jsonMock(data, init),
  },
  NextRequest: class {
    url: string
    constructor(url: string) {
      this.url = url
    }
  },
}))

// 3️⃣ Mock Sanity client inside factory
jest.mock('@/sanity/lib/client', () => {
  return {
    client: {
      fetch: jest.fn(),
    },
  }
})

import {GET} from '@/app/api/search/route'
import {NextRequest} from 'next/server'

describe('Search API GET', () => {
  let fetchMock: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    const {client} = require('@/sanity/lib/client')
    fetchMock = client.fetch
  })

  it('returns search results for posts and products', async () => {
    fetchMock.mockResolvedValue([
      {_id: '1', _type: 'post', title: {en: 'Post 1'}, slug: 'post-1', description: {}},
      {_id: '2', _type: 'product', title: {en: 'Product 1'}, slug: 'product-1', description: {}},
    ])

    const req = new NextRequest('http://localhost/api/search?q=test&locale=en')
    const res = await GET(req)
    const data = await res.json()

    expect(jsonMock).toHaveBeenCalled()
    expect(data.length).toBe(2)
    expect(data[0]._type).toBe('post')
    expect(data[1]._type).toBe('product')
  })

  it('returns empty array if no query', async () => {
    const req = new NextRequest('http://localhost/api/search')
    const res = await GET(req)
    const data = await res.json()

    expect(data).toEqual([])
  })

  it('returns 500 if client.fetch fails', async () => {
    fetchMock.mockRejectedValue(new Error('Sanity error'))

    const req = new NextRequest('http://localhost/api/search?q=test')
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data).toHaveProperty('error', 'Search failed')
  })
})
