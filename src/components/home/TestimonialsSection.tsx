
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

type TestimonialProps = {
  name: string;
  platform: "Google" | "Practo";
  text: string;
  rating: number;
  date: string;
  imgSrc?: string;
};

function Testimonial({ name, platform, text, rating, date, imgSrc }: TestimonialProps) {
  return (
    <Card className="h-full border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              size={16} 
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">{platform}</span>
        </div>
        
        <p className="text-gray-600 flex-grow mb-4">{text}</p>
        
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium mr-3">
            {imgSrc ? (
              <img src={imgSrc} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsPerPage = 3;
  
  const testimonials: TestimonialProps[] = [
    {
      name: "Priya Sharma",
      platform: "Google",
      rating: 5,
      text: "Dr. Bhandari and his team are amazing! I got Invisalign treatment here and the results are fantastic. The entire process was comfortable and the staff is very friendly and professional.",
      date: "3 months ago"
    },
    {
      name: "Vikram Mehta",
      platform: "Practo",
      rating: 5,
      text: "I was very nervous about getting dental implants, but Dr. Tanmay explained everything so clearly and made the procedure completely painless. The guided implant technology they use is truly impressive.",
      date: "1 month ago"
    },
    {
      name: "Neha Patel",
      platform: "Google",
      rating: 5,
      text: "Had my smile makeover done at Bhandari Dental and I couldn't be happier with the results! The attention to detail and care they provide is exceptional. Highly recommend!",
      date: "2 months ago"
    },
    {
      name: "Rahul Joshi",
      platform: "Practo",
      rating: 4,
      text: "Great experience with Invisalign treatment. Dr. Bhandari is very knowledgeable and takes time to explain everything. The clinic is modern and clean with all the latest technology.",
      date: "4 months ago"
    },
    {
      name: "Anjali Desai",
      platform: "Google",
      rating: 5,
      text: "I've been to many dentists before but none as thorough and skilled as Dr. Tanmay. My dental implant procedure was smooth and the results are amazing. Worth every penny!",
      date: "2 months ago"
    },
    {
      name: "Sanjay Kapoor",
      platform: "Practo",
      rating: 5,
      text: "The preventive care at Bhandari Dental is top-notch. They take the time to educate you about proper oral hygiene and the staff is always friendly and professional.",
      date: "1 month ago"
    }
  ];
  
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    activeIndex * testimonialsPerPage,
    (activeIndex + 1) * testimonialsPerPage
  );
  
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  
  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4">What Our <span className="gradient-text">Patients Say</span></h2>
          <p className="text-gray-600">
            Read genuine reviews from our patients who have experienced our dental treatments and services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToPrevious}
              className="h-10 w-10 rounded-full"
            >
              ←
            </Button>
            
            <div className="text-sm text-gray-500">
              {activeIndex + 1} / {totalPages}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToNext}
              className="h-10 w-10 rounded-full"
            >
              →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
