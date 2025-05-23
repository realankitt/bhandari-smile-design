import { ServicesSection } from './ServicesSection';
import { Button } from "../ui/button";

export function HeroSection() {
  const openWhatsApp = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=%2B912029701777&text=Hi%2C+I+am+looking+for+an+appointment.+Can+you+help+me%3F&type=phone_number&app_absent=0",
      "_blank"
    );
  };

  return (
    <>
      {/* Hero Section */}
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
                src="/images/dental-care.jpg"
                alt="Beautiful smile transformation" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="heading-lg">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Bhandari Dental Clinic, we're dedicated to providing personalized, high-quality dental care that prioritizes patient comfort, satisfaction, and long-term oral health. Our team of experienced professionals stays up-to-date with the latest advancements in modern dentistry to ensure our patients receive the best possible care.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/dental-care.jpg" 
                alt="Dental care at Bhandari Dental Clinic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Key Features Section */}
      <section className="py-16 bg-dental-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-lg text-center mb-16">
            Key <span className="gradient-text">Features</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Conservative Dentistry</h3>
              <p className="text-gray-600">
              Preserving natural tooth structure and minimizing invasive procedures whenever possible.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Personalized Care</h3>
              <p className="text-gray-600">
              Tailoring treatment plans to each patient's unique needs, preferences, and goals.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Advanced Digital Technology</h3>
              <p className="text-gray-600">
              Utilizing cutting-edge digital tools for precise diagnoses, efficient treatments, and enhanced patient comfort.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Lasting Outcomes</h3>
              <p className="text-gray-600">
              Focusing on delivering high-quality, long-lasting results that promote optimal oral health and patient satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="heading-lg text-center mb-16">
            What Sets Us <span className="gradient-text">Apart</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Expertise</h3>
              <p className="text-gray-600">
                Our team consists of experienced dentists with specialized training in modern dentistry techniques, including Invisalign.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">State-of-the-Art Facilities</h3>
              <p className="text-gray-600">
                By combining conservative approaches, digital dentistry, guided implant surgeries, and Invisalign services, Bhandari Dental Clinic offers comprehensive and cutting-edge dental care solutions in Pune.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="heading-md mb-6">Patient-Centric Approach</h3>
              <p className="text-gray-600">
                We prioritize patient comfort, satisfaction, and education, ensuring informed decision-making and personalized care.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}