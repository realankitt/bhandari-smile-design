
import { ListCheck, Laptop, Stethoscope, SmileIcon } from "lucide-react";

const features = [
  {
    title: "Conservative Approach",
    description: "We prioritize minimally invasive treatments, preserving natural tooth structure whenever possible.",
    icon: ListCheck
  },
  {
    title: "Digital Dentistry",
    description: "Our clinic utilizes advanced digital technologies for precise diagnoses, efficient treatments, and enhanced patient comfort.",
    icon: Laptop
  },
  {
    title: "Guided Implant Surgeries",
    description: "Our experienced team performs precise and minimally invasive dental implant procedures using advanced guided surgery techniques.",
    icon: Stethoscope
  },
  {
    title: "Invisalign Services",
    description: "We offer Invisalign, a clear aligner system that straightens teeth discreetly and comfortably, providing an alternative to traditional orthodontic treatments.",
    icon: SmileIcon
  }
];

export function KeyFeaturesSection() {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <h2 className="heading-lg text-center mb-12">
          Our <span className="gradient-text">Key Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex-shrink-0">
                <feature.icon className="w-8 h-8 text-dental-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
