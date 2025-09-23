'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {useTheme} from 'next-themes'

export function HeroBackground() {
  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const lightImage = '/static/images/home/pozadina-crtezF.png'
  const darkImage = '/static/images/home/pozadina-crtezF-modified.png'

  // SSR renders light image by default
  const bgImage = mounted && theme === 'dark' ? darkImage : lightImage

  return <Image src={bgImage} alt="Background" fill className="object-cover" priority />
}
