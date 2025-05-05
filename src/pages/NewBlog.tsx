import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // ensure user is logged in
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('Please log in first.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('blog_posts')
      .insert([{ title, content }])

    setLoading(false)
    if (error) {
      console.error(error)
      alert('Oops, could not save post.')
    } else {
      // e.g. redirect or clear form
      setTitle('')
      setContent('')
      // router.push('/blog')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Your post…"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Posting…' : 'Post'}
      </button>
    </form>
  )
}
