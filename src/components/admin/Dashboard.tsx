import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Dashboard() {
  const [posts, setPosts]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) setError(error.message)
      else      setPosts(data || [])

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Loading posts…</p>
  if (error)   return <p className="text-red-600">Error loading posts: {error}</p>

  return (
    <div className="space-y-4">
      {posts.map(p => (
        <div key={p.id} className="p-4 border rounded">
          <h3 className="font-bold">{p.title}</h3>
          <small>{new Date(p.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  )
}
