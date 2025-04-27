
import { Award, Laptop, UserIcon } from "lucide-react";

const uniqueFeatures = [
  {
    icon: Award,
    title: "Expertise",
    description: "Our team consists of experienced dentists with specialized training in modern dentistry techniques, including Invisalign."
  },
  {
    icon: Laptop,
    title: "State-of-the-Art Facilities",
    description: "Our clinic is equipped with advanced digital dentistry tools and technology, including 3D scanning and printing for Invisalign treatments."
  },
  {
    icon: UserIcon,
    title: "Patient-Centric Approach",
    description: "We prioritize patient comfort, satisfaction, and education, ensuring informed decision-making and personalized care."
  }
];

export function UniqueFeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="heading-lg text-center mb-12">
          What Sets Us <span className="text-dental-500">Apart</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {uniqueFeatures.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-gray-50 hover:bg-dental-50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-dental-500 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
