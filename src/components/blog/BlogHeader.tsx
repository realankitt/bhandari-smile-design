
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { PhoneIcon } from "lucide-react";

export function BlogHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/+919999999999?text=Hi,%20I'm%20interested%20in%20a%20consultation%20at%20Bhandari%20Dental%20Clinic.",
      "_blank"
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-dental-500 flex items-center justify-center text-white font-bold text-xl">
            BD
          </div>
          <span className="font-semibold text-lg">Bhandari Dental</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="/"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Home
          </a>
          <a 
            href="/#about"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            About
          </a>
          <a 
            href="/#services"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Services
          </a>
          <a 
            href="/#testimonials"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Testimonials
          </a>
          <a 
            href="/#contact"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        <Button 
          onClick={openWhatsApp}
          className="hidden md:flex items-center gap-2 bg-dental-500 hover:bg-dental-600"
        >
          <PhoneIcon size={16} />
          Book Consultation
        </Button>

        <div className="md:hidden">
          <Button 
            onClick={openWhatsApp}
            size="sm"
            className="bg-dental-500 hover:bg-dental-600"
          >
            <PhoneIcon size={16} className="mr-2" />
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
}
