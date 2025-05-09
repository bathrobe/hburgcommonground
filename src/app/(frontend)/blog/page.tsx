import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

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
  console.log(docs)

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
    <Link
      href={`/blog/${post.slug}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-full"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900">{post.title}</h2>
        <div className="flex justify-between items-center mb-4 text-sm">
          <p className="text-gray-600">{formattedDate}</p>
          {post.author?.name && <p className="text-gray-700 italic">By {post.author.name}</p>}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <span className="text-blue-600 hover:text-blue-800 font-medium inline-block">
          Read more →
        </span>
      </div>
    </Link>
  )
}

export default BlogPage
