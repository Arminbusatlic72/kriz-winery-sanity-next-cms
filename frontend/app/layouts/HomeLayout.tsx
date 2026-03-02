

import {HeroBackground} from '@/app/components/HeroBackground'
type HomeLayoutProps = {
  title: string
  description: string
}
export default function HomeLayout({title, description}: HomeLayoutProps) {
  return (
    <section
      className="relative flex items-start justify-start h-[calc(100vh-196px)] p-10"
      role="banner"
    >
      <HeroBackground /> {/* Client-only, no SSR mismatch */}
      
    </section>
  )
}
