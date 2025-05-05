import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import ReactQuill from 'react-quill'

export default function NewBlog() {
  const [title, setTitle]       = useState('')
  const [content, setContent]   = useState('')      // HTML string
  const [loading, setLoading]   = useState(false)

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

      // upload to bucket "blog-images"
      const { data, error: uploadErr } = await supabase
        .storage
        .from('blog-images')
        .upload(fileName, file)

      if (uploadErr) {
        console.error(uploadErr)
        setLoading(false)
        return
      }

      // get a public URL
      const { publicURL, error: urlErr } = supabase
        .storage
        .from('blog-images')
        .getPublicUrl(fileName)

      if (urlErr) {
        console.error(urlErr)
        setLoading(false)
        return
      }

      // insert the image into the editor
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

  const quillRef = useRef<ReactQuill>(null)

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
      .insert([{ title, content }])

    setLoading(false)
    if (error) {
      alert('Couldn’t publish your post.')
    } else {
      alert('Published successfully!')
      // optionally redirect…
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
