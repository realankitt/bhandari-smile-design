import { BlogHeader } from "../components/blog/BlogHeader"
import { Footer } from "../components/layout/Footer"
import { BlogCard } from "../components/blog/BlogCard"
import { useBlogs } from "@/hooks/use-blogs"
import { Helmet } from "react-helmet"

const BlogPage = () => {
  const { data: blogs, isLoading, error } = useBlogs()

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
          
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error loading blogs</div>
          ) : (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPage