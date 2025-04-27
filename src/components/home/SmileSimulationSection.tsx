
import { Button } from "../ui/button";

export function SmileSimulationSection() {
  const openInvisalignSimulator = () => {
    window.open("https://providerbio-apac.invisalign.com/sv/1611636#start", "_blank");
  };

  return (
    <section id="simulation" className="section-padding bg-dental-50 rounded-2xl">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4">
            Visualize Your <span className="gradient-text">New Smile</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Try our Invisalign Smile Simulator to see how your smile could look after treatment. Get a preview of your transformation journey with our advanced visualization technology.
          </p>
          <Button 
            onClick={openInvisalignSimulator}
            className="bg-dental-500 hover:bg-dental-600 text-white px-8 py-6 text-lg"
          >
            Try Smile Simulator Now
          </Button>
        </div>
      </div>
    </section>
  );
}