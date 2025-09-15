import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({error: 'Missing slug parameter'}, {status: 400})
  }

  try {
    // Look for a matching slug in either English or Croatian across posts and products
    const result = await client.fetch(
      `*[
  (_type == "post" || _type == "product" || _type == "category") &&
  (slug.en.current == $slug || slug.hr.current == $slug)
][0]{
  _type,
  "en": slug.en.current,
  "hr": slug.hr.current
}`,
      {slug},
    )

    if (!result) {
      return NextResponse.json({error: 'No localized slugs found'}, {status: 404})
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Localized Slugs API error:', error)
    return NextResponse.json({error: 'Failed to fetch localized slugs'}, {status: 500})
  }
}

// // /api/localized-slug.ts
// import {NextRequest, NextResponse} from 'next/server'
// import {client} from '@/sanity/lib/client'

// export async function GET(req: NextRequest) {
//   const {searchParams} = new URL(req.url)
//   const slug = searchParams.get('slug')
//   const type = searchParams.get('type') // 'post' | 'product' | 'category'

//   if (!slug || !type) {
//     return NextResponse.json({error: 'Missing slug or type parameter'}, {status: 400})
//   }

//   try {
//     let query = ''
//     if (type === 'category') {
//       query = `*[_type == "category" && (slug.en.current == $slug || slug.hr.current == $slug)][0]{
//         _type,
//         "en": slug.en.current,
//         "hr": slug.hr.current
//       }`
//     } else {
//       // posts/products
//       query = `*[
//         (_type == "post" || _type == "product") &&
//         (slug.en.current == $slug || slug.hr.current == $slug)
//       ][0]{
//         _type,
//         "en": slug.en.current,
//         "hr": slug.hr.current
//       }`
//     }

//     const result = await client.fetch(query, {slug})

//     if (!result) {
//       return NextResponse.json({error: 'No localized slugs found'}, {status: 404})
//     }

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Localized Slugs API error:', error)
//     return NextResponse.json({error: 'Failed to fetch localized slugs'}, {status: 500})
//   }
// }
