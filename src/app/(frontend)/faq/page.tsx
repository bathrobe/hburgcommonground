import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export const metadata = {
  title: 'FAQ | Harrisonburg Common Ground',
  description: 'Frequently Asked Questions about Harrisonburg Common Ground',
}

export default async function FaqIndexPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faq',
    sort: 'title',
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        {docs.length === 0 ? (
          <p className="text-lg text-gray-600">No FAQ items found.</p>
        ) : (
          <div className="space-y-6">
            {docs.map((faq: any) => (
              <div key={faq.id} className="border-b border-gray-200 pb-4">
                <Link
                  href={`/faq/${faq.slug}`}
                  className="text-xl font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {faq.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
