
import { BlogCard } from "../blog/BlogCard";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function BlogPreviewSection() {
  const navigate = useNavigate();

  const previewPosts = [
    {
      title: "Understanding Invisalign Treatment",
      excerpt: "Learn how Invisalign can transform your smile with comfort and convenience...",
      date: "2024-04-20",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1000&auto=format&fit=crop",
      category: "Invisalign",
      slug: "understanding-invisalign-treatment"
    },
    {
      title: "The Benefits of Guided Dental Implants",
      excerpt: "Discover how guided implant surgery ensures precise and successful outcomes...",
      date: "2024-04-18",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
      category: "Dental Implants",
      slug: "benefits-of-guided-dental-implants"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Latest From Our <span className="gradient-text">Blog</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest in dental care and treatments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {previewPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate("/blog")}
            variant="outline" 
            size="lg"
            className="hover:bg-dental-50"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
