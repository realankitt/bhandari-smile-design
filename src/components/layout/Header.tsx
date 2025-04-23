
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { PhoneIcon } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header background
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-dental-500 flex items-center justify-center text-white font-bold text-xl">
            BD
          </div>
          <span className="font-semibold text-lg">Bhandari Dental</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("services")}
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("simulation")}
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Smile Simulation
          </button>
          <button 
            onClick={() => scrollToSection("testimonials")}
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Testimonials
          </button>
          <a 
            href="/blog"
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Blog
          </a>
          <button 
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:text-dental-600 transition-colors"
          >
            Contact
          </button>
        </nav>

        <Button 
          onClick={openWhatsApp}
          className="hidden md:flex items-center gap-2 bg-dental-500 hover:bg-dental-600"
        >
          <PhoneIcon size={16} />
          Book Consultation
        </Button>

        {/* Mobile Menu Button */}
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
