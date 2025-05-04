import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getBlogs, Blog } from '../api/blogs';
import BlogCard from '../components/BlogCard';

const HomePage: React.FC = () => {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        const { data } = await getBlogs(1, 3); // Get only 3 most recent blogs
        setRecentBlogs(data as Blog[]);
      } catch (err) {
        console.error('Failed to load recent blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecentBlogs();
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/3881449/pexels-photo-3881449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to Bhandari Smile Design
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Creating beautiful, healthy smiles with personalized dental care
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/blogs"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Blog Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Recent Blog Posts</h2>
            <Link 
              to="/blogs"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              View All Blogs
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No blog posts found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;