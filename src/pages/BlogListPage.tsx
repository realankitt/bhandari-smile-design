import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogs, Blog, Category } from '../api/blogs';
import BlogCard from '../components/BlogCard';

const BlogListPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const { data, count } = await getBlogs(page, ITEMS_PER_PAGE);
        setBlogs(data as Blog[]);
        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
      } catch (err) {
        setError('Failed to load blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest dental tips, news, and updates from Bhandari Smile Design
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No blog posts found</p>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                page === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            
            <div className="text-gray-700">
              Page {page} of {totalPages}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                page === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;