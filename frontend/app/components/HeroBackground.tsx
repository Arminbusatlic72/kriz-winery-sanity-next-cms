

import Image from 'next/image'

export function HeroBackground() {
  return (
    <>
      {/* Mobile background */}
      <Image
        src="/static/images/home/Križ-naslovnicaMob.png"
        alt="Background"
        fill
        className="block object-contain dark:hidden md:hidden"
        priority
        sizes="100vw"
        quality={75}
      />

      {/* Mobile dark mode background */}
      <Image
        src="/static/images/home/Križ-naslovnicaMob-modified.png"
        alt="Background"
        fill
        className="hidden object-contain dark:block md:dark:hidden"
        sizes="100vw"
        quality={75}
      />

      {/* Light mode background */}
      <Image
        src="/static/images/home/Križ-naslovnica.png"
        alt="Background"
        fill
        className="hidden object-cover dark:hidden md:block md:object-contain"
        sizes="100vw"
        quality={75}
      />

      {/* Dark mode background */}
      <Image
        src="/static/images/home/Križ-naslovnica-modified.png"
        alt="Background"
        fill
        className="hidden md:dark:block md:object-contain"
        sizes="100vw"
        quality={75}
      />
    </>
  )
}
