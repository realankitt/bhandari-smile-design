import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Bhandari Smile Design
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/blogs" className="text-gray-800 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link to="/admin" className="text-gray-800 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 top-full shadow-md p-4 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors py-2">
                Home
              </Link>
              <Link to="/blogs" className="text-gray-800 hover:text-blue-600 transition-colors py-2">
                Blog
              </Link>
              <Link to="/admin" className="text-gray-800 hover:text-blue-600 transition-colors py-2">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;