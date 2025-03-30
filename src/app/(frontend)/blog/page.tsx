import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Blog | My Site',
  description: 'Latest articles and news',
}

const BlogPage = async () => {
  // Fetch blog posts from Payload
  const payload = await getPayload({ config })
  const blogPosts = await payload.find({
    collection: 'blogposts',
    // Sort by most recent first
    sort: '-publishedDate',
  })
  const { docs } = blogPosts

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {docs.length === 0 ? (
        <p className="text-gray-600">
          No articles yet. this blogpage Check back soon for new content.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

// Simple blog card component
const BlogCard = ({ post }: { post: any }) => {
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Feature Image */}
      <div className="relative h-48 w-full">
        {post.featureImg?.url ? (
          <Image src={post.featureImg.url} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-3">{formattedDate}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
          Read more
        </Link>
      </div>
    </div>
  )
}

export default BlogPage
