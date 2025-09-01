'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'

type SearchModalProps = {
  onClose: () => void
  locale: string // current locale
}

export default function SearchModal({onClose, locale}: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`)
          // const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

          if (!res.ok) {
            console.error('Search API error', res.status, res.statusText)
            setResults([])
            return
          }

          const data = await res.json()
          setResults(data)
        } catch (err) {
          console.error('Failed to fetch search results', err)
          setResults([])
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query, locale])

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="search" className="sr-only">
          Search posts and products
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search posts and products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4"
        />
        <ul>
          {results.map((item) => {
            // Pick the slug string for the current locale
            const slug = item.slug?.current // <-- this is the actual string
            const title =
              typeof item.title === 'string' ? item.title : item.title?.[locale] || item.title?.en

            if (!slug) return null
            return (
              <li key={item._id} className="mb-2">
                <Link
                  href={`/${locale}/${item._type === 'product' ? 'proizvodi' : 'blog'}/${slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={onClose}
                >
                  {title} ({item._type})
                </Link>
              </li>
            )
          })}
        </ul>
        <button onClick={onClose} className="mt-4 text-gray-700 dark:text-gray-300">
          Close
        </button>
      </div>
    </div>
  )
}
