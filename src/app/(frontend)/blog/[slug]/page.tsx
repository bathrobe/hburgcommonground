import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
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
    case 'blogposts':
      return `/blog/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

// Set up JSX converters for rich text - use the provided LinkJSXConverter
const getJSXConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,
  // Use the LinkJSXConverter helper instead of directly manipulating the link converter
  ...LinkJSXConverter({ internalDocToHref }),
})

// DO NOT CHANGE ANY TYPES HERE
export const generateMetadata = async ({ params }: { params: any }) => {
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

  return docs.map((post: any) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: any }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogposts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3, // Increased depth to properly populate author data and rich text relationships
  })

  const post: any = docs[0]

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

        {/* Rich text content */}
        <div className="prose prose-lg max-w-none prose-a:text-blue-600 prose-a:underline">
          {post.content && (
            <RichText data={post.content as SerializedEditorState} converters={getJSXConverters} />
          )}
        </div>

        {/* Author card */}
        {post.author && typeof post.author === 'object' && (
          <div className="mt-12 p-6 border-t border-border">
            <div className="flex items-start gap-4">
              {post.author.avatar &&
                typeof post.author.avatar === 'object' &&
                post.author.avatar.url && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={post.author.avatar.url}
                      alt={post.author.name || 'Author'}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
                {post.author.bio && <p className="text-muted-foreground">{post.author.bio}</p>}
                {post.author.email && (
                  <p className="mt-2 text-sm">
                    <a
                      href={`mailto:${post.author.email}`}
                      className="text-primary hover:underline"
                    >
                      {post.author.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
