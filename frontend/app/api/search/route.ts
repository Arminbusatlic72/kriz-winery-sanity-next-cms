import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const query = searchParams.get('q') || ''
  const requestedLocale = searchParams.get('locale') || 'en'
  const locale = requestedLocale === 'hr' ? 'hr' : 'en'
  const slugPath = locale === 'hr' ? 'slug.hr' : 'slug.en'

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const results = await client.fetch(
      `*[
    (_type == "post" || _type == "product") &&
    (
      title.en match $q || title.hr match $q ||
      description.en match $q || description.hr match $q
    )
  ]{
    _id,
    _type,
    title,
    "slug": ${slugPath},
    description
  }`,
      {q: `*${query}*`},
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({error: 'Search failed'}, {status: 500})
  }
}
