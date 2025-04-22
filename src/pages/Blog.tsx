
import { BlogHeader } from "../components/blog/BlogHeader";
import { Footer } from "../components/layout/Footer";
import { BlogCard } from "../components/blog/BlogCard";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  // These would typically come from a CMS or API
  const blogPosts = [
    {
      title: "The Benefits of Invisalign Over Traditional Braces",
      excerpt: "Exploring why Invisalign clear aligners are becoming the preferred choice for teeth straightening compared to metal braces. Learn about comfort, aesthetics, and treatment time advantages.",
      date: "April 10, 2025",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
      category: "Invisalign",
      slug: "benefits-invisalign-over-traditional-braces"
    },
    {
      title: "Understanding Guided Dental Implants: Technology & Benefits",
      excerpt: "A comprehensive look at how guided implant technology is revolutionizing tooth replacement procedures, offering greater precision, reduced recovery time, and better outcomes.",
      date: "March 15, 2025",
      image: "https://images.unsplash.com/photo-1579683563554-ca0f85d87e95?q=80&w=800&auto=format&fit=crop",
      category: "Dental Implants",
      slug: "understanding-guided-dental-implants"
    },
    {
      title: "Complete Guide to Smile Makeovers: What to Expect",
      excerpt: "Everything you need to know about the smile makeover process, from initial consultation to final results. Learn about the various procedures involved and how they transform your smile.",
      date: "February 28, 2025",
      image: "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?q=80&w=800&auto=format&fit=crop",
      category: "Smile Makeovers",
      slug: "complete-guide-smile-makeovers"
    },
    {
      title: "The Science Behind Teeth Whitening: What Works?",
      excerpt: "Separating fact from fiction in teeth whitening treatments. This article covers professional whitening, at-home methods, and how to maintain your bright smile long-term.",
      date: "February 12, 2025",
      image: "https://images.unsplash.com/photo-1581585299073-da1d8e6e35e9?q=80&w=800&auto=format&fit=crop",
      category: "Cosmetic Dentistry",
      slug: "science-behind-teeth-whitening"
    },
    {
      title: "How to Care for Your Invisalign Aligners",
      excerpt: "Practical tips for maintaining your Invisalign aligners in optimal condition. Learn proper cleaning techniques, storage practices, and habits to avoid for the best treatment results.",
      date: "January 25, 2025",
      image: "https://images.unsplash.com/photo-1601744590884-65a036f40aed?q=80&w=800&auto=format&fit=crop",
      category: "Invisalign",
      slug: "care-for-invisalign-aligners"
    },
    {
      title: "Preventive Dentistry: The Key to Lifelong Oral Health",
      excerpt: "Why prevention is better than cure in dental care. Discover the essential practices, regular check-ups, and lifestyle choices that contribute to maintaining excellent oral health.",
      date: "January 8, 2025",
      image: "https://images.unsplash.com/photo-1603079342686-7c7b2a20007e?q=80&w=800&auto=format&fit=crop",
      category: "Preventive Dentistry",
      slug: "preventive-dentistry-lifelong-oral-health"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dental Health Blog | Bhandari Dental Clinic</title>
        <meta name="description" content="Expert insights on Invisalign, dental implants, smile makeovers, and oral health from Bhandari Dental Clinic in Pune." />
        <meta name="keywords" content="Dental Blog, Invisalign Tips, Dental Implants Guide, Smile Makeover Process, Oral Health Tips, Pune Dentist" />
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
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
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
