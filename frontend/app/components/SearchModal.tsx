'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'

export default function SearchModal({onClose}: {onClose: () => void}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length > 2) {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } else {
        setResults([])
      }
    }, 300) // debounce

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click on overlay closes modal
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
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
          {results.map((item) => (
            <li key={item._id} className="mb-2">
              <Link
                href={`/${item._type === 'product' ? 'products' : 'posts'}/${item.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={onClose} // close modal when navigating
              >
                {item.title} ({item._type})
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-gray-700 dark:text-gray-300">
          Close
        </button>
      </div>
    </div>
  )
}
