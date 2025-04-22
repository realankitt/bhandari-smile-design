import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
export function SmileSimulationSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    photo: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState(prev => ({
        ...prev,
        photo: e.target.files![0]
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to a server
    console.log("Form submitted:", formState);
    setIsSubmitted(true);

    // Open WhatsApp after submission
    setTimeout(() => {
      window.open(`https://wa.me/+919999999999?text=Hi, I'm ${formState.name}. I've submitted a smile simulation request at Bhandari Dental Clinic.`, "_blank");
    }, 1500);
  };
  return <section id="simulation" className="section-padding bg-dental-50 rounded-2xl">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4">
            Visualize Your <span className="gradient-text">New Smile</span>
          </h2>
          <p className="text-gray-600">
            Upload a selfie of your smile and our experts will create a simulation of how your smile could look after treatment. It's the first step to your smile transformation journey.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required value={formState.name} onChange={handleInputChange} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Your email" required value={formState.email} onChange={handleInputChange} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="Your phone number" required value={formState.phone} onChange={handleInputChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">What improvements are you looking for?</Label>
                    <Textarea id="message" name="message" placeholder="Tell us what you'd like to improve about your smile" rows={3} value={formState.message} onChange={handleInputChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photo">Upload a selfie of your smile</Label>
                    <Input id="photo" name="photo" type="file" accept="image/*" onChange={handleFileChange} required />
                    <p className="text-sm text-gray-500">
                      Please upload a clear photo of your smile (front view)
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full bg-dental-500 hover:bg-dental-600">
                    Submit for Simulation
                  </Button>
                </form>
              </CardContent>
            </Card> : <Card className="border-0 shadow-lg text-center p-8">
              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your smile simulation request. Our team will analyze your photo and send you a personalized simulation soon.
                </p>
                <p className="text-gray-600">
                  You'll be redirected to WhatsApp to connect with our team.
                </p>
              </div>
            </Card>}
        </div>
      </div>
    </section>;
}