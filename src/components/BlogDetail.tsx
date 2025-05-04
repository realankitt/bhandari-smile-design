import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Calendar, User, Edit, ArrowLeft } from 'lucide-react';
import Button from './ui/Button';
import parse from 'html-react-parser';

interface Author {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
  author: Author;  // Changed from authors to author to match the foreign key relationship
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
  }, [slug]);

  async function fetchBlogBySlug(slug: string) {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:author_id (id, name, avatar_url)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load the blog post. It may not exist or has been removed.');
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

  if (error || !blog) {
    return (
      <div className="py-12 text-center max-w-4xl mx-auto px-4">
        <div className="text-red-600 mb-4">{error || 'Blog post not found'}</div>
        <Link to="/blog">
          <Button variant="outline" icon={<ArrowLeft size={18} />}>
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  const formattedDate = format(new Date(blog.created_at), 'MMMM d, yyyy');

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to all posts
      </Link>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
      
      <div className="flex items-center mb-8 text-gray-600">
        <div className="flex items-center mr-6">
          <Calendar size={18} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <User size={18} className="mr-1" />
          <span>{blog.author?.name || 'Unknown Author'}</span>
        </div>
        
        <div className="ml-auto">
          <Link to={`/admin/blogs/edit/${blog.id}`}>
            <Button variant="outline" size="sm" icon={<Edit size={16} />}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
      
      {blog.featured_image && (
        <div className="mb-8">
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none">
        {parse(blog.content)}
      </div>
    </article>
  );
};

export default BlogDetail;