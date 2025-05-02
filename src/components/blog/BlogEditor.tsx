import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select } from '../ui/select'

export function BlogEditor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Dental Care',
    author: 'Dr. Tanmay Bhandari'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const { error } = await supabase
        .from('blogs')
        .insert([{
          ...formData,
          slug,
          published_at: new Date().toISOString()
        }])

      if (error) throw error

      navigate(`/blog/${slug}`)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <label className="font-medium">Title</label>
        <Input
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Featured Image URL</label>
        <Input
          type="url"
          value={formData.image}
          onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Excerpt</label>
        <Textarea
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Category</label>
        <Select
          value={formData.category}
          onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
        >
          <option value="Dental Care">Dental Care</option>
          <option value="Invisalign">Invisalign</option>
          <option value="Dental Implants">Dental Implants</option>
          <option value="Smile Design">Smile Design</option>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Content</label>
        <Textarea
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
          className="min-h-[400px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  )
}