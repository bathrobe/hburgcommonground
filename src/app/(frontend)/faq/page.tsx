import React from 'react'

export const metadata = {
  title: 'FAQ | My Site',
  description: 'Frequently asked questions',
}

const FAQPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions below.</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">What is this site about?</h2>
          <p className="text-gray-600">This is a placeholder answer for the FAQ.</p>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
