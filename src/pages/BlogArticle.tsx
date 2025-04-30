import { useParams, useNavigate } from "react-router-dom"
import { BlogHeader } from "../components/blog/BlogHeader"
import { Footer } from "../components/layout/Footer"
import { Helmet } from "react-helmet"
import { CalendarIcon, ArrowLeftIcon } from "lucide-react"
import { useBlog } from "@/hooks/use-blogs"

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: article, isLoading, error } = useBlog(slug || '')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlogHeader />
        <main className="flex-grow flex items-center justify-center pt-32 pb-20 bg-gray-50">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              The blog article you are looking for does not exist.
            </p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-dental-500 text-white rounded-full hover:bg-dental-600"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeftIcon size={18} />
              Back to Blog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{article.title} | Bhandari Dental Clinic</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      <BlogHeader />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <button
            className="flex items-center gap-2 text-dental-600 hover:text-dental-700 text-sm font-medium mb-6"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeftIcon size={16} />
            Back to all articles
          </button>
          <div className="rounded-2xl overflow-hidden shadow mb-8 h-64 bg-gray-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mb-3 inline-block bg-dental-100 text-dental-600 text-xs font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="heading-lg mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-10">
            <span className="flex items-center gap-1">
              <CalendarIcon size={16} />
              {new Date(article.published_at).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>
          <article className="prose prose-blue max-w-none prose-img:rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BlogArticle