// 'use client'

// import {useEffect, useState} from 'react'
// import Image from 'next/image'
// import {useTheme} from 'next-themes'

// export function HeroBackground() {
//   const {theme} = useTheme()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => setMounted(true), [])

//   const lightImage = '/static/images/home/pozadina-crtezF.png'
//   const darkImage = '/static/images/home/pozadina-crtezF-modified.png'

//   // SSR renders light image by default
//   const bgImage = mounted && theme === 'dark' ? darkImage : lightImage

//   return (
//     <Image
//       src={bgImage}
//       alt="Background"
//       fill
//       className="object-cover"
//       priority={true}
//       loading="eager"
//     />
//   )
// }

// 'use client'

import Image from 'next/image'

export function HeroBackground() {
  return (
    <>
      {/* Light mode background */}
      <Image
        src="/static/images/home/pozadina-crtezF.png"
        alt="Background"
        fill
        className="object-cover dark:hidden"
        priority={true}
        loading="eager"
      />

      {/* Dark mode background */}
      <Image
        src="/static/images/home/pozadina-crtezF-modified.png"
        alt="Background"
        fill
        className="object-cover hidden dark:block"
        priority={true}
        loading="eager"
      />
    </>
  )
}
