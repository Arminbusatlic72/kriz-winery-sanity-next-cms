import {revalidatePath} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

type RevalidatePayload = {
  _type?: string
  slug?: {en?: string; hr?: string} | string
  category?: {
    slug?: {en?: string; hr?: string} | string
  }
}

function getSecret(req: NextRequest) {
  return req.nextUrl.searchParams.get('secret') ?? req.headers.get('x-revalidate-secret')
}

function getLocalizedSlugs(value: unknown): {en?: string; hr?: string} {
  if (!value) return {}

  if (typeof value === 'string') {
    return {en: value, hr: value}
  }

  if (typeof value === 'object') {
    const maybeSlug = value as {en?: string; hr?: string}
    return {
      en: typeof maybeSlug.en === 'string' ? maybeSlug.en : undefined,
      hr: typeof maybeSlug.hr === 'string' ? maybeSlug.hr : undefined,
    }
  }

  return {}
}

export async function POST(req: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET
  const requestSecret = getSecret(req)

  if (!configuredSecret) {
    return NextResponse.json(
      {ok: false, message: 'Missing SANITY_REVALIDATE_SECRET env var'},
      {status: 500},
    )
  }

  if (!requestSecret || requestSecret !== configuredSecret) {
    return NextResponse.json({ok: false, message: 'Invalid secret'}, {status: 401})
  }

  const payload = (await req.json().catch(() => ({}))) as RevalidatePayload

  const postSlug = getLocalizedSlugs(payload.slug)
  const categorySlug = getLocalizedSlugs(payload.category?.slug)

  const paths = new Set<string>(['/en/posts', '/hr/postovi', '/en/blog', '/hr/blog'])

  if (categorySlug.en) paths.add(`/en/posts/category/${categorySlug.en}`)
  if (categorySlug.hr) paths.add(`/hr/postovi/kategorija/${categorySlug.hr}`)

  if (postSlug.en) paths.add(`/en/posts/${postSlug.en}`)
  if (postSlug.hr) paths.add(`/hr/postovi/${postSlug.hr}`)

  if (payload._type === 'category') {
    paths.add('/en/posts')
    paths.add('/hr/postovi')
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ok: true, revalidated: [...paths]})
}

export async function GET(req: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET
  const requestSecret = getSecret(req)

  if (!configuredSecret) {
    return NextResponse.json(
      {ok: false, message: 'Missing SANITY_REVALIDATE_SECRET env var'},
      {status: 500},
    )
  }

  if (!requestSecret || requestSecret !== configuredSecret) {
    return NextResponse.json({ok: false, message: 'Invalid secret'}, {status: 401})
  }

  return NextResponse.json({ok: true, message: 'Revalidate endpoint is reachable'})
}
