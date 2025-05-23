import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Harrisonburg Common Ground',
  description: 'Get in touch with Harrisonburg Common Ground',
  openGraph: {
    title: 'Contact | Harrisonburg Common Ground',
    description: 'Get in touch with Harrisonburg Common Ground',
    siteName: 'Harrisonburg Common Ground',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Harrisonburg Common Ground',
    description: 'Get in touch with Harrisonburg Common Ground',
  },
}

const ContactPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        We&apos;d love to hear from you. Here&apos;s how to reach us.
      </p>

      <div className="max-w-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Harrisonburg Common Ground Director</h2>
          <p className="text-gray-600">Irvin Peckham</p>
          <p className="text-gray-600">
            <a href="mailto:iwpeckham@gmail.com" className="text-blue-600 hover:underline">
              iwpeckham@gmail.com
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Website Admin/AI Helper</h2>
          <p className="text-gray-600">Joe Holmes</p>
          <p className="text-gray-600">
            <a href="mailto:hello@joeholmes.dev" className="text-blue-600 hover:underline">
              hello@joeholmes.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
