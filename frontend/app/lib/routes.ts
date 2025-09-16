// utils/routes.ts

export type DynamicRoute =
  | {pathname: '/products/[slug]'; params: {slug: string}}
  | {pathname: '/posts/[slug]'; params: {slug: string}}
  | {pathname: '/posts/category/[category]'; params: {category: string}}
  | {pathname: '/home' | '/about' | '/winery' | '/posts' | '/accommodation' | '/contact'}
  | {pathname: '/'}

export function buildFallbackRoute(pathname: string, params: Record<string, string>): DynamicRoute {
  switch (pathname) {
    case '/products/[slug]':
      return {pathname: '/products/[slug]', params: {slug: params.slug}}
    case '/posts/[slug]':
      return {pathname: '/posts/[slug]', params: {slug: params.slug}}
    case '/posts/category/[category]':
      return {pathname: '/posts/category/[category]', params: {category: params.category}}
    case '/home':
    case '/about':
    case '/winery':
    case '/posts':
    case '/accommodation':
    case '/contact':
      return {
        pathname: pathname as
          | '/home'
          | '/about'
          | '/winery'
          | '/posts'
          | '/accommodation'
          | '/contact',
      }
    default:
      return {pathname: '/'}
  }
}
