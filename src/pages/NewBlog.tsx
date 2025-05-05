import React, { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ReactQuill from 'react-quill'

interface Category {
  category_name: string
  url_slug: string
}

export default function NewBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')      // HTML string
  const [categorySlug, setCategorySlug] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [coverURL, setCoverURL] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const quillRef = useRef<ReactQuill>(null)

  // load categories for dropdown
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('category_name, url_slug')
      if (error) {
        console.error('Error loading categories:', error)
      } else if (data) {
        setCategories(data)
      }
    }
    fetchCategories()
  }, [])

  // Custom image handler: uploads to Supabase Storage then inserts URL
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file = input.files![0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      setLoading(true)

      const { error: uploadErr } = await supabase
        .storage
        .from('blog-images')
        .upload(fileName, file)

      if (uploadErr) {
        console.error(uploadErr)
        setLoading(false)
        return
      }

      const { publicURL, error: urlErr } = supabase
        .storage
        .from('blog-images')
        .getPublicUrl(fileName)

      if (urlErr) {
        console.error(urlErr)
        setLoading(false)
        return
      }

      const quill = (quillRef.current as any)?.getEditor()
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'image', publicURL)
      setLoading(false)
    }
  }

  // Quill toolbar config
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }

  // handle cover image upload
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fileExt = file.name.split('.').pop()
    const fileName = `cover-${Date.now()}.${fileExt}`
    setLoading(true)

    const { error: uploadErr } = await supabase
      .storage
      .from('blog-covers')
      .upload(fileName, file)

    if (uploadErr) {
      console.error(uploadErr)
      setLoading(false)
      return
    }

    const { publicURL } = supabase
      .storage
      .from('blog-covers')
      .getPublicUrl(fileName)

    setCoverURL(publicURL)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('Please log in first.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('blog_posts')
      .insert([{ title, content, category_slug: categorySlug, cover_image: coverURL }])

    setLoading(false)
    if (error) {
      alert('Couldn’t publish your post.')
      console.error(error)
    } else {
      alert('Published successfully!')
      // optionally redirect to /blog
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        className="w-full p-2 border"
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <label>Category</label>
      <select
        className="w-full p-2 border"
        value={categorySlug}
        onChange={e => setCategorySlug(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map(c => (
          <option key={c.url_slug} value={c.url_slug}>
            {c.category_name}
          </option>
        ))}
      </select>

      <label>Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
      />
      {coverURL && (
        <img src={coverURL} alt="Cover preview" className="mt-2 w-48 rounded" />
      )}

      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your post here…"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Saving…' : 'Publish'}
      </button>
    </form>
  )
}
