import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogposts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = docs[0]

  if (!post) return { title: 'Blog Post Not Found' }

  return {
    title: `${post.title} | My Site`,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogposts',
  })

  return docs.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogposts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1, // To populate the author relationship
  })

  const post = docs[0]

  if (!post) return notFound()

  return (
    <div className="container mx-auto py-8 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Hero section with image and title */}
        <div className="mb-8">
          {post.featureImg && typeof post.featureImg === 'object' && post.featureImg.url && (
            <div className="relative w-full h-[400px] mb-6">
              <Image
                src={post.featureImg.url}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600">
              {post.publishedDate && (
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
            </div>
            {post.author && (
              <div className="text-gray-600">
                By {typeof post.author === 'object' ? post.author.name : 'Unknown Author'}
              </div>
            )}
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>
        </div>

        {/* Content section will be added later */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          Rich text content will be added in a future update
        </div>
      </article>
    </div>
  )
}
