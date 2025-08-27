// app/api/search/route.ts
import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const query = searchParams.get('q') || ''

  if (!query) {
    return NextResponse.json([])
  }

  const results = await client.fetch(
    `
    *[
      (_type == "post" || _type == "product") &&
      (title match $q || description match $q)
    ]{
      _id,
      _type,
      title,
      "slug": slug.current,
      description
    }
  `,
    {q: `*${query}*`},
  )

  return NextResponse.json(results)
}
