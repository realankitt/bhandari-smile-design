import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BlogCard from './BlogCard';
import { PlusCircle, Filter } from 'lucide-react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

interface BlogAuthor {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
  author_id: string;
  author: BlogAuthor;  // Changed from authors to author to match the foreign key relationship
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:author_id (id, name)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={fetchBlogs}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
        <Link to="/admin/blogs/new">
          <Button variant="primary" icon={<PlusCircle size={18} />}>
            New Post
          </Button>
        </Link>
      </div>
      
      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No blog posts yet</h3>
          <p className="text-gray-500 mb-6">Start creating your first blog post</p>
          <Link to="/admin/blogs/new">
            <Button variant="primary" icon={<PlusCircle size={18} />}>
              Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              slug={blog.slug}
              featuredImage={blog.featured_image}
              authorName={blog.author?.name || 'Unknown Author'}
              createdAt={blog.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;