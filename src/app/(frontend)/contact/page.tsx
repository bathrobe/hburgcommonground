import React from 'react'

export const metadata = {
  title: 'Contact | My Site',
  description: 'Get in touch with us',
}

const ContactPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">We'd love to hear from you. Here's how to reach us.</p>

      <div className="max-w-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-600">contact@example.com</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="text-gray-600">
            123 Main Street
            <br />
            Anytown, ST 12345
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
