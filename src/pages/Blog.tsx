import { BlogHeader } from "../components/blog/BlogHeader";
import { Footer } from "../components/layout/Footer";
import { BlogCard } from "../components/blog/BlogCard";
import { useBlogs } from "@/hooks/use-blogs";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  console.log('Blog data:', blogs); // Debug log
  console.log('Loading:', isLoading); // Debug log
  console.log('Error:', error); // Debug log

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dental-600"></div>
      </div>
    );
  }

  if (error) {
    console.error('Blog fetch error:', error);
    return <div>Error loading blogs</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog | Bhandari Dental Clinic</title>
        <meta name="description" content="Read the latest articles about dental care, treatments, and oral health tips from Bhandari Dental Clinic." />
      </Helmet>
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
            {blogs?.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={new Date(post.published_at).toLocaleDateString()}
                image={post.image}
                category={post.category}
                slug={post.slug}
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