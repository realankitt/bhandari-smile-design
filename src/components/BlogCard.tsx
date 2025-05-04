import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ChevronRight } from 'lucide-react';
import { Blog } from '../api/blogs';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/blogs/${blog.slug}`}>
        {blog.cover_image ? (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={blog.cover_image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </Link>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Calendar size={16} className="text-blue-500 mr-2" />
          <time className="text-sm text-gray-500">
            {format(new Date(blog.created_at), 'MMMM d, yyyy')}
          </time>
        </div>
        
        <Link to={`/blogs/${blog.slug}`}>
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt || blog.content.substring(0, 120).replace(/<[^>]*>/g, '')}...
        </p>
        
        <Link 
          to={`/blogs/${blog.slug}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Read More
          <ChevronRight size={18} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;