import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'

// Function to convert internal links to proper href values
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    return '/'
  }

  const slug = value.slug

  switch (relationTo) {
    case 'faq':
      return `/faq/${slug}`
    case 'blogposts':
      return `/blog/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

// Set up JSX converters for rich text
const getJSXConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faq',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const faqPage = docs[0]

  if (!faqPage) return { title: 'FAQ Page Not Found' }

  return {
    title: `${faqPage.title} | Harrisonburg Common Ground`,
    description: `FAQ - ${faqPage.title}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faq',
  })

  return docs.map((faqPage: any) => ({
    slug: faqPage.slug,
  }))
}

export default async function FaqPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faq',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const faqPage: any = docs[0]

  if (!faqPage) return notFound()

  return (
    <div className="container mx-auto py-8 px-4">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">{faqPage.title}</h1>
        </div>

        {/* Rich text content */}
        <div className="prose prose-lg max-w-none prose-a:text-blue-600 prose-a:underline">
          {faqPage.content && (
            <RichText
              data={faqPage.content as SerializedEditorState}
              converters={getJSXConverters}
            />
          )}
        </div>
      </article>
    </div>
  )
}
