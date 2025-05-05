import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { BlogCard } from '@/components/blog/BlogCard'

export default function BlogPage() {
  const [posts, setPosts]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p className="p-8">Loading…</p>
  if (error)   return <p className="p-8 text-red-600">Error: {error}</p>

  // Empty‐state
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No posts yet. <a href="/admin/new" className="underline">Create one</a>.
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50">
      {posts.map(post => (
        <BlogCard
          key={post.id}
          title={post.title}
          excerpt={post.content /* or strip HTML and trim */}
          date={new Date(post.created_at).toLocaleDateString()}
          image={post.cover_image}
          category={post.category_slug}
          slug={post.slug || post.id}
        />
      ))}
    </div>
  )
}
