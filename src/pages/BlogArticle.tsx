import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function BlogArticle() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('title, cover_image, content, category_slug, created_at')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single()

      if (error) {
        console.error('Error fetching post:', error)
      } else {
        setPost(data)
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return <p className="p-8">Loading article…</p>
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The blog article you are looking for does not exist.</p>
        <Link to="/blog" className="inline-block px-4 py-2 bg-blue-500 text-white rounded">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  // Parse Editor.js JSON content into simple HTML elements
  let contentBlocks = []
  try {
    const json = JSON.parse(post.content)
    contentBlocks = (json.blocks || []).map(block => {
      switch (block.type) {
        case 'paragraph':
          return <p key={block.id}>{block.data.text}</p>
        case 'header':
          const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements
          return <Tag key={block.id}>{block.data.text}</Tag>
        case 'list':
          if (block.data.style === 'ordered') {
            return (
              <ol key={block.id} className="ml-6 list-decimal">
                {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            )
          } else {
            return (
              <ul key={block.id} className="ml-6 list-disc">
                {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )
          }
        case 'image':
          return (
            <img
              key={block.id}
              src={block.data.file.url}
              alt={block.data.caption || post.title}
              className="w-full object-cover my-6"
            />
          )
        default:
          return null
      }
    })
  } catch (e) {
    contentBlocks = [<p key="error">Error parsing content</p>]
  }

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-6">
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
         &nbsp;|&nbsp; {post.category_slug.replace(/-/g, ' ')}
      </p>
      <div className="prose prose-lg">{contentBlocks}</div>
    </article>
  )
}
