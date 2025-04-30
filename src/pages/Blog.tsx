import { BlogHeader } from "../components/blog/BlogHeader";
import { Footer } from "../components/layout/Footer";
import { BlogCard } from "../components/blog/BlogCard";
import { blogPosts } from '../data/blogPosts'; // Create this file to store all blog posts

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">
              Dental Health <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-gray-600">
              Expert insights, tips, and information about dental care, treatments, and maintaining your perfect smile.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                {...post}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;