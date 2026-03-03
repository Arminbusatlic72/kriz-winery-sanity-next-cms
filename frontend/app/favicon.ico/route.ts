import {NextRequest, NextResponse} from 'next/server'

const faviconPath = '/static/images/logo/kriz-favicon.jpg'

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL(faviconPath, request.url))
}

export function HEAD(request: NextRequest) {
  return NextResponse.redirect(new URL(faviconPath, request.url))
}
