
import { Button } from "../ui/button";

export function HeroSection() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/+919999999999?text=Hi,%20I'm%20interested%20in%20a%20consultation%20at%20Bhandari%20Dental%20Clinic.",
      "_blank"
    );
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="heading-xl mb-6">
              Transform Your Smile With <span className="gradient-text">Expert Care</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Bhandari Dental Clinic specializes in Invisalign clear aligners, guided dental implants, and complete smile makeovers in Pune.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={openWhatsApp}
                size="lg" 
                className="bg-dental-500 hover:bg-dental-600 text-white font-medium px-8"
              >
                Book a Consultation
              </Button>
              <Button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
                variant="outline" 
                size="lg" 
                className="border-dental-200 hover:bg-dental-50 text-dental-800 font-medium"
              >
                Explore Services
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1000&auto=format&fit=crop"
              alt="Beautiful smile transformation" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
