
import { useParams, Link, useNavigate } from "react-router-dom";
import { CalendarIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Helmet } from "react-helmet";

// Hardcoded blog posts — should be refactored to use a backend/CMS in the future
const posts = [
  {
    title: "The Benefits of Invisalign Over Traditional Braces",
    excerpt:
      "Exploring why Invisalign clear aligners are becoming the preferred choice for teeth straightening compared to metal braces. Learn about comfort, aesthetics, and treatment time advantages.",
    date: "April 10, 2025",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    category: "Invisalign",
    slug: "benefits-invisalign-over-traditional-braces",
    content: `
      <p><strong>Invisalign</strong> offers a discreet, comfortable alternative to traditional metal braces. Many patients in Pune and around the world are choosing Invisalign because:</p>
      <ul class="list-disc list-inside my-4">
        <li><b>Nearly invisible:</b> Wear your aligners confidently in public, school, or work.</li>
        <li><b>Removable:</b> Enjoy meals without restrictions and maintain your oral hygiene routine easily.</li>
        <li><b>Comfortable:</b> No sharp wires or brackets to irritate your gums or cheeks.</li>
        <li><b>Faster treatment (in many cases):</b> See results in as little as 6–18 months for typical treatments.</li>
      </ul>
      <p>At Bhandari Dental Clinic, we specialize in authentic Invisalign therapy, ensuring precise digital planning and guided results. Ready to transform your smile?</p>
    `,
  },
  {
    title: "Understanding Guided Dental Implants: Technology & Benefits",
    excerpt:
      "A comprehensive look at how guided implant technology is revolutionizing tooth replacement procedures, offering greater precision, reduced recovery time, and better outcomes.",
    date: "March 15, 2025",
    image:
      "https://images.unsplash.com/photo-1579683563554-ca0f85d87e95?q=80&w=800&auto=format&fit=crop",
    category: "Dental Implants",
    slug: "understanding-guided-dental-implants",
    content: `
      <p>Guided dental implants use advanced digital imaging to plan and place implants with exceptional precision. The result is a more comfortable experience and a predictable, natural-looking outcome.</p>
      <ul class="list-disc list-inside my-4">
        <li><b>Precision Placement:</b> Digital scans allow the perfect fit in your jaw.</li>
        <li><b>Faster Recovery:</b> Minimally invasive, often with less pain and swelling.</li>
        <li><b>Reliable Results:</b> Consistently strong, long-lasting teeth replacements.</li>
      </ul>
      <p>Discover the future of smile restoration with Bhandari Dental Clinic’s guided implant solutions in Pune.</p>
    `,
  },
  // You can add the rest of the posts here as needed... (copy post objects from Blog.tsx and add a `content` string to each)
];

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto max-w-2xl py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Button onClick={() => navigate("/blog")} className="mt-4">
          <ArrowLeftIcon className="mr-2" /> Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Helmet>
        <title>{post.title} | Bhandari Dental Clinic Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`Dentistry, ${post.category}, Pune, Bhandari Dental Clinic, Dr. Tanmay Bhandari`} />
      </Helmet>
      <nav className="pt-10 pb-4 px-4 max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-dental-600 hover:text-dental-700 font-medium">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Blog Home
        </Link>
      </nav>
      <article className="max-w-3xl mx-auto bg-white py-8 px-4 rounded-lg shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow"
        />
        <div className="flex items-center justify-between mb-4">
          <span className="bg-dental-500 text-white text-xs px-3 py-1 rounded">{post.category}</span>
          <span className="flex items-center text-sm text-gray-500">
            <CalendarIcon size={14} className="mr-1" /> {post.date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-700 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
