import Link from 'next/link'

interface CTALinkProps {
  href: string
  children: React.ReactNode
}

export default function CTALink({href, children}: CTALinkProps) {
  return (
    <Link
      href={href}
      className="cursor-pointer relative inline-block no-underline font-medium group py-3 px-6"
    >
      <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-white"></span>
      <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50 dark:bg-gray-900 dark:border-white dark:group-hover:bg-gray-800"></span>
      <span className="relative text-black dark:text-white">{children}</span>
    </Link>
  )
}
