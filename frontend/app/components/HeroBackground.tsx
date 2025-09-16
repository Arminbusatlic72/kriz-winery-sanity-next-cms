'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {useTheme} from 'next-themes'

export function HeroBackground() {
  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Render nothing on server → no hydration mismatch
    return null
  }

  const bgImage =
    theme === 'dark'
      ? '/static/images/home/pozadina-crtezF-modified.png'
      : '/static/images/home/pozadina-crtezF.png'

  return <Image src={bgImage} alt="Background" fill className="object-cover" priority />
}
