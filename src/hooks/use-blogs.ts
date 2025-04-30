import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

interface Blog {
  id: string
  created_at: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  published_at: string
}

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) throw error
      return data as Blog[]
    }
  })
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      return data as Blog
    }
  })
}