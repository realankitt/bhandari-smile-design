
import { useParams, Link, useNavigate } from "react-router-dom";
import { BlogHeader } from "../components/blog/BlogHeader";
import { Footer } from "../components/layout/Footer";
import { Helmet } from "react-helmet";
import { CalendarIcon, ArrowLeftIcon } from "lucide-react";

// Example article data (replace/add more as needed)
const articles = [
  {
    slug: "benefits-invisalign-over-traditional-braces",
    title: "The Benefits of Invisalign Over Traditional Braces",
    coverImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    date: "April 10, 2025",
    category: "Invisalign",
    excerpt:
      "Exploring why Invisalign clear aligners are becoming the preferred choice for teeth straightening compared to metal braces. Learn about comfort, aesthetics, and treatment time advantages.",
    author: "Dr. Tanmay Bhandari",
    content: (
      <>
        <p>
          When it comes to achieving a straighter smile, Invisalign clear aligners have transformed the way people approach orthodontic treatment.
          Unlike traditional metal braces, Invisalign is nearly invisible, removable, and offers a more comfortable experience for patients.
        </p>
        <h2 className="heading-md mt-8 mb-3">Why Choose Invisalign?</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Virtually invisible aligners for a discreet treatment experience</li>
          <li>Removable—enjoy your favorite foods and maintain oral hygiene easily</li>
          <li>Fewer clinic visits required compared to metal braces</li>
          <li>Shorter treatment times for many cases</li>
          <li>Custom-made for comfort and effectiveness</li>
        </ul>
        <p>
          At Bhandari Dental Clinic, we are Pune&#39;s Invisalign experts. Every patient receives a personalized treatment plan, digital smile simulation, and dedicated support for the entire process. If you&#39;re considering teeth alignment, book a consultation with Dr. Tanmay Bhandari and discover how Invisalign can transform your smile.
        </p>
        <div className="mt-8">
          <a
            href="https://wa.me/+919999999999?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20Invisalign%20clear%20aligners%20at%20Bhandari%20Dental%20Clinic."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dental-500 text-white font-semibold px-5 py-3 rounded-md shadow hover:bg-dental-600 transition-colors"
          >
            Book Your Invisalign Consultation
          </a>
        </div>
      </>
    ),
  },
  // Add more articles here
];

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlogHeader />
        <main className="flex-grow flex items-center justify-center pt-32 pb-20 bg-gray-50">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The blog article you are looking for does not exist.</p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-dental-500 text-white rounded hover:bg-dental-600"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeftIcon size={18} />
              Back to Blog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{article.title} | Bhandari Dental Clinic</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={`${article.category}, Invisalign, Dental Blog, Bhandari Dental Clinic, Pune`} />
        <meta name="author" content={article.author} />
        {/* Article schema organization could be added here */}
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
          <div className="rounded-lg overflow-hidden shadow mb-8 h-64 bg-gray-100 flex items-center justify-center">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <span className="mb-3 inline-block bg-dental-100 text-dental-600 text-xs font-semibold px-3 py-1 rounded shadow-sm">
            {article.category}
          </span>
          <h1 className="heading-lg mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-10">
            <span className="flex items-center gap-1">
              <CalendarIcon size={16} /> {article.date}
            </span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>
          <article className="prose prose-blue max-w-none prose-img:rounded-lg prose-h2:mt-10 prose-h2:mb-3 prose-p:mb-4">
            {article.content}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
