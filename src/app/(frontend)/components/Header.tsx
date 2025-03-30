'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// Define type for FAQ items
type FaqItem = {
  id: string
  title: string
  slug: string
}

const Header = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLLIElement>(null)

  // Fetch FAQ items on component mount
  useEffect(() => {
    const fetchFaqItems = async () => {
      try {
        const response = await fetch('/api/faq')
        if (!response.ok) throw new Error('Failed to fetch FAQ items')
        const data = await response.json()
        setFaqItems(data.docs)
      } catch (error) {
        console.error('Error fetching FAQ items:', error)
        // Set empty array as fallback
        setFaqItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFaqItems()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFaqOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <span className="md:hidden">HCG</span>
            <span className="hidden md:inline">Harrisonburg Common Ground</span>
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/events" className="hover:text-gray-300">
                Events
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-300">
                Blog
              </Link>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsFaqOpen(!isFaqOpen)}
                className="hover:text-gray-300 flex items-center"
                aria-expanded={isFaqOpen}
              >
                FAQ
                <svg
                  className={`ml-1 h-4 w-4 transform ${isFaqOpen ? 'rotate-180' : ''} transition-transform`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isFaqOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 right-0 md:left-0">
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-white">Loading...</div>
                  ) : faqItems.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-white">No FAQ items found</div>
                  ) : (
                    <>
                      {faqItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/faq/${item.slug}`}
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                          onClick={() => setIsFaqOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                      <Link
                        href="/faq"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 border-t border-gray-600"
                        onClick={() => setIsFaqOpen(false)}
                      >
                        All FAQs
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
