
export function MissionSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-8">
            Our <span className="text-dental-500">Mission</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Bhandari Dental Clinic, we're dedicated to providing personalized, high-quality dental care 
            that prioritizes patient comfort, satisfaction, and long-term oral health. Our team of experienced 
            professionals stays up-to-date with the latest advancements in modern dentistry to ensure our 
            patients receive the best possible care.
          </p>
        </div>
      </div>
      <div className="absolute -z-10 w-[500px] h-[500px] bg-dental-50/50 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </section>
  );
}
