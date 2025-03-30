import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">My Site</Link>
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
            <li>
              <Link href="/faq" className="hover:text-gray-300">
                FAQ
              </Link>
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
