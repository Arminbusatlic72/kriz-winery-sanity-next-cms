type HomeLayoutProps = {
  title: string
  description: string
}

export default function HomeLayout({title, description}: HomeLayoutProps) {
  return (
    <section
      className="relative flex items-start justify-start bg-[url('/static/images/home/pozadina-crtezF.png')] bg-cover bg-center p-10 dark:bg-[url('/static/images/home/pozadina-crtezF-modified.png')] h-[calc(100vh-196px)]"
      role="banner"
    >
      <div className="relative z-10 text-left text-black">
        <h1 className="font-strangelove mb-4 text-5xl font-bold tracking-wide dark:text-white">
          {title}
        </h1>
        <p className="max-w-xl text-xl font-light dark:text-gray-300">{description}</p>
      </div>
    </section>
  )
}
