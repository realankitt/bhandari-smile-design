import { UserIcon } from "lucide-react";
export function AboutSection() {
  return <section id="about" className="section-padding bg-gray-50 rounded-2xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="heading-lg mb-6">
              Pune's Premier Clinic for <span className="gradient-text">Modern Dentistry</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Bhandari Dental Clinic, we combine cutting-edge technology with personalized care to deliver exceptional dental treatments. Our state-of-the-art facility in Pune is equipped with the latest dental innovations to ensure comfortable and effective procedures.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in transformative treatments like Invisalign clear aligners and guided dental implants, helping patients achieve the perfect smile they've always wanted.
            </p>
            
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-dental-100 flex items-center justify-center text-dental-600">
                  <UserIcon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dr. Tanmay Bhandari</h3>
                  <p className="text-gray-600">Lead Dental Consultant</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop" alt="Modern dental clinic interior" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg transform translate-y-8 hover:scale-105 transition duration-300">
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop" alt="Advanced dental technology" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}