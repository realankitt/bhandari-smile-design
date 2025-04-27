import { MapPinIcon, PhoneIcon, MessageSquareIcon } from "lucide-react";
export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="text-white pt-16 pb-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <span className="font-semibold text-lg text-gray-500">Bhandari Dental</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming smiles with expert care and cutting-edge dental technology in Pune.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-gray-400 hover:text-dental-300 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#services" className="text-gray-400 hover:text-dental-300 transition-colors">Services</a>
              </li>
              <li>
                <a href="/#simulation" className="text-gray-400 hover:text-dental-300 transition-colors">Smile Simulation</a>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-400 hover:text-dental-300 transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-dental-300 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Invisalign Clear Aligners</li>
              <li className="text-gray-400">Guided Dental Implants</li>
              <li className="text-gray-400">Smile Makeovers</li>
              <li className="text-gray-400">Preventive Dentistry</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon size={20} className="text-dental-400 shrink-0 mt-1" />
                <span className="text-gray-400">123 Dental Avenue, Koregaon Park, Pune 411001</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={20} className="text-dental-400 shrink-0" />
                <span className="text-gray-400">+91 9999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquareIcon size={20} className="text-dental-400 shrink-0" />
                <a href="https://wa.me/+919999999999?text=Hi,%20I'm%20interested%20in%20a%20consultation%20at%20Bhandari%20Dental%20Clinic." className="text-gray-400 hover:text-dental-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Bhandari Dental Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}