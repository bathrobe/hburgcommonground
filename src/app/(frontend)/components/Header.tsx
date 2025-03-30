'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

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
                  <Link
                    href="/faq/route1"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                    onClick={() => setIsFaqOpen(false)}
                  >
                    FAQ Topic 1
                  </Link>
                  <Link
                    href="/faq/route2"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                    onClick={() => setIsFaqOpen(false)}
                  >
                    FAQ Topic 2
                  </Link>
                  <Link
                    href="/faq/route3"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                    onClick={() => setIsFaqOpen(false)}
                  >
                    FAQ Topic 3
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-600 border-t border-gray-600"
                    onClick={() => setIsFaqOpen(false)}
                  >
                    All FAQs
                  </Link>
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
