import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { getBlogBySlug, Blog, BlogMedia } from '../api/blogs';
import ReactMarkdown from 'react-markdown';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [media, setMedia] = useState<BlogMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const { blog, media } = await getBlogBySlug(slug);
        setBlog(blog);
        setMedia(media || []);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlog();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || 'Blog post not found'}</p>
        </div>
        <div className="mt-4">
          <Link to="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Function to render media within the blog content
  const renderMedia = (mediaId: string) => {
    const mediaItem = media.find(m => m.id === mediaId);
    if (!mediaItem) return null;
    
    if (mediaItem.media_type === 'image') {
      return (
        <figure className="my-8">
          <img 
            src={mediaItem.media_url} 
            alt={mediaItem.alt_text || ''} 
            className="w-full rounded-lg shadow-md"
          />
          {mediaItem.caption && (
            <figcaption className="text-center text-gray-600 mt-2">
              {mediaItem.caption}
            </figcaption>
          )}
        </figure>
      );
    } else if (mediaItem.media_type === 'video') {
      return (
        <figure className="my-8">
          <video 
            src={mediaItem.media_url} 
            controls
            className="w-full rounded-lg shadow-md"
          />
          {mediaItem.caption && (
            <figcaption className="text-center text-gray-600 mt-2">
              {mediaItem.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    
    return null;
  };
  
  // Process blog content to render any media references
  const processContent = (content: string) => {
    // Replace media references like [MEDIA:id] with actual media
    return content.replace(/\[MEDIA:([a-zA-Z0-9-]+)\]/g, (match, mediaId) => {
      const mediaElement = renderMedia(mediaId);
      if (mediaElement) {
        // This is a placeholder - we would need to use something like dangerouslySetInnerHTML
        // to actually render React components from strings
        return `[Media placeholder for ${mediaId}]`;
      }
      return match;
    });
  };

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Link to="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={18} className="mr-2" />
          Back to Blogs
        </Link>
      </div>
      
      {blog.cover_image && (
        <div className="relative h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={blog.cover_image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{blog.title}</h1>
        
        <div className="flex flex-wrap items-center text-gray-600 mb-8">
          <div className="flex items-center mr-6 mb-2">
            <Calendar size={18} className="mr-2 text-blue-500" />
            <time>{format(new Date(blog.created_at), 'MMMM d, yyyy')}</time>
          </div>
          
          {blog.category_id && (
            <div className="flex items-center mb-2">
              <Tag size={18} className="mr-2 text-blue-500" />
              <span>{(blog as any).categories?.name || 'Uncategorized'}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {processContent(blog.content)}
        </ReactMarkdown>
        
        {/* For any media items not explicitly referenced in content, display at the end */}
        <div className="mt-12">
          {media.map(item => (
            <div key={item.id} className="mb-8">
              {item.media_type === 'image' && (
                <figure>
                  <img 
                    src={item.media_url} 
                    alt={item.alt_text || ''} 
                    className="w-full rounded-lg shadow-md"
                  />
                  {item.caption && (
                    <figcaption className="text-center text-gray-600 mt-2">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              
              {item.media_type === 'video' && (
                <figure>
                  <video 
                    src={item.media_url} 
                    controls
                    className="w-full rounded-lg shadow-md"
                  />
                  {item.caption && (
                    <figcaption className="text-center text-gray-600 mt-2">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogDetailPage;