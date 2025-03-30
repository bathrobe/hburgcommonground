import React from 'react'

export const metadata = {
  title: 'Blog | My Site',
  description: 'Latest articles and news',
}

const BlogPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p className="text-gray-600">No articles yet. Check back soon for new content.</p>
    </div>
  )
}

export default BlogPage
