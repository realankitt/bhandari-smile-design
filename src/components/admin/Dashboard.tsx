import { useBlogs } from '@/hooks/use-blogs'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, EditIcon, TrashIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Dashboard() {
  const { data: blogs, isLoading, error, refetch } = useBlogs()
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      refetch()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-dental-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading blog posts</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={() => navigate('/admin/new')}>
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs?.map((post) => (
          <div 
            key={post.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex-1">
              <h3 className="font-medium">{post.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarIcon size={14} />
                {new Date(post.published_at).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/admin/edit/${post.id}`)}
              >
                <EditIcon size={16} className="mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                <TrashIcon size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}

        {blogs?.length === 0 && (
          <div className="text-center p-8 text-gray-500">
            No blog posts yet. Create your first post!
          </div>
        )}
      </div>
    </div>
  )
}