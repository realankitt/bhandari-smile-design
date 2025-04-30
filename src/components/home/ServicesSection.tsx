import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 mb-4 rounded-lg bg-dental-50 flex items-center justify-center">
          <span className="text-dental-500 text-2xl">{icon}</span>
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: "Invisalign",
      description: "Transform your smile with virtually invisible aligners. Straighten your teeth comfortably without metal braces.",
      icon: "👄"
    },
    {
      title: "Guided Implants",
      description: "Replace missing teeth with precision-guided implants that look, feel, and function like natural teeth.",
      icon: "🦷"
    },
    {
      title: "Full Mouth Rehabilitation",
      description: "Comprehensive treatment to transform your smile through a combination of cosmetic procedures tailored to you.",
      icon: "✨"
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Our Specialized <span className="gradient-text">Services</span></h2>
          <p className="text-gray-600">
            We provide cutting-edge dental treatments with a focus on aesthetic results and patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-6 rounded-lg bg-dental-50 flex items-center justify-center">
              <span className="text-dental-500">
                <img 
                  src="/path-to-icon.png" 
                  alt="Invisalign" 
                  className="w-8 h-8 rounded-lg"  // Add rounded corners to icon
                />
              </span>
            </div>
            <h3 className="heading-md mb-6">Invisalign</h3>
            <p className="text-gray-600 leading-relaxed">
              Transform your smile with virtually invisible aligners. Straighten your teeth comfortably without metal braces.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-6 rounded-lg bg-dental-50 flex items-center justify-center">
              <span className="text-dental-500">
                <img 
                  src="/path-to-icon.png" 
                  alt="Guided Implants"
                  className="w-8 h-8 rounded-lg"  // Add rounded corners to icon
                />
              </span>
            </div>
            <h3 className="heading-md mb-6">Guided Implants</h3>
            <p className="text-gray-600 leading-relaxed">
              Replace missing teeth with precision-guided implants that look, feel, and function like natural teeth.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-6 rounded-lg bg-dental-50 flex items-center justify-center">
              <span className="text-dental-500">
                <img 
                  src="/path-to-icon.png" 
                  alt="Full Mouth Rehabilitation"
                  className="w-8 h-8 rounded-lg"  // Add rounded corners to icon
                />
              </span>
            </div>
            <h3 className="heading-md mb-6">Full Mouth Rehabilitation</h3>
            <p className="text-gray-600 leading-relaxed">
              Comprehensive treatment to transform your smile through a combination of cosmetic procedures tailored to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}