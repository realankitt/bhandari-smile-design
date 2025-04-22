
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
      title: "Invisalign Clear Aligners",
      description: "Transform your smile with virtually invisible aligners. Straighten your teeth comfortably without metal braces.",
      icon: "👄"
    },
    {
      title: "Guided Dental Implants",
      description: "Replace missing teeth with precision-guided implants that look, feel, and function like natural teeth.",
      icon: "🦷"
    },
    {
      title: "Smile Makeovers",
      description: "Comprehensive treatment to transform your smile through a combination of cosmetic procedures tailored to you.",
      icon: "✨"
    },
    {
      title: "Preventive Dentistry",
      description: "Regular cleanings, exams, and preventive care to maintain oral health and prevent future problems.",
      icon: "🔍"
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Our Specialized <span className="gradient-text">Services</span></h2>
          <p className="text-gray-600">
            We provide cutting-edge dental treatments with a focus on aesthetic results and patient comfort. Our specialized services are designed to give you the smile you've always wanted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
