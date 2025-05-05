import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BlogPage() {
  const [posts, setPosts]   = useState<any[]>([])
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
        setPosts(data!)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Loading…</p>
  if (error)   return <p>Error: {error}</p>

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <article key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <div
            className="prose mt-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      ))}
    </div>
  )
}
