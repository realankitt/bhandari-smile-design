import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  ImageIcon,
  Link,
  Undo,
  Redo
} from 'lucide-react'

export function BlogEditor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Dental Care',
    author: 'Dr. Tanmay Bhandari',
    tags: [],
    seoTitle: '',
    seoDescription: ''
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      editor?.chain().focus().setImage({ src: publicUrl }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Log environment variables (don't include in production)
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing')
      console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing')

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

      if (error) {
        console.error('Supabase error:', error) // Detailed error logging
        throw error
      }

      navigate(`/blog/${slug}`)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-lg font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="text-2xl py-3"
              placeholder="Enter your blog title..."
            />
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <label className="text-lg font-medium">Content</label>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-white border-b p-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <Bold size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <Italic size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                  <List size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                  <Quote size={18} />
                </Button>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                  >
                    <ImageIcon size={18} />
                  </Button>
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().redo().run()}
                >
                  <Redo size={18} />
                </Button>
              </div>
              <EditorContent editor={editor} className="min-h-[400px] p-4" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="space-y-2">
            <label className="text-lg font-medium">Featured Image</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="py-8">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Input
                      type="url"
                      placeholder="Enter image URL or paste link"
                      value={formData.image}
                      onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      className="text-center"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-lg font-medium">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="Dental Care">Dental Care</option>
              <option value="Invisalign">Invisalign</option>
              <option value="Dental Implants">Dental Implants</option>
              <option value="Smile Design">Smile Design</option>
            </select>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="text-lg font-medium">Excerpt</label>
            <Textarea
              value={formData.excerpt}
              onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
              placeholder="Brief summary of your post..."
              className="h-24"
            />
          </div>

          {/* SEO Settings */}
          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium">SEO Settings</h3>
            <div className="space-y-2">
              <label className="text-sm">SEO Title</label>
              <Input
                value={formData.seoTitle}
                onChange={e => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="SEO optimized title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">SEO Description</label>
              <Textarea
                value={formData.seoDescription}
                onChange={e => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                placeholder="Meta description for search engines..."
                className="h-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-dental-600 hover:bg-dental-700"
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </Button>
      </div>
    </form>
  )
}