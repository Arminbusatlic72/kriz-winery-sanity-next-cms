import {NextRequest, NextResponse} from 'next/server'
import {getProductsPage, LIST_PAGE_SIZE} from '@/app/lib/listing-data'

export const runtime = 'edge'

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 0) return fallback
  return parsed
}

export async function GET(request: NextRequest) {
  const {searchParams} = request.nextUrl

  const locale = searchParams.get('locale') ?? 'en'
  const offset = parsePositiveInt(searchParams.get('offset'), 0)
  const limit = parsePositiveInt(searchParams.get('limit'), LIST_PAGE_SIZE)

  const data = await getProductsPage(locale, offset, limit)

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
    },
  })
}
