import { MapPinIcon, PhoneIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
export function ContactSection() {
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send/?phone=%2B912029701777&text=Hi%2C+I+am+looking+for+an+appointment.+Can+you+help+me%3F&type=phone_number&app_absent=0", "_blank");
  };
  return <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4">
            Visit Our <span className="gradient-text">Clinic</span>
          </h2>
          <p className="text-gray-600">
            Schedule your appointment or visit our state-of-the-art dental clinic in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-dental-100 flex items-center justify-center text-dental-600 px-[8px]">
                    <MapPinIcon size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">Bhandari Dental Clinic, Sujay Garden Commercial Centre, off No 24, Mukund Nagar, Pune, Maharashtra 411037</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-dental-100 flex items-center justify-center text-dental-600">
                    <PhoneIcon size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 9423004777</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
            
            <div>
              <Button onClick={openWhatsApp} className="bg-dental-500 hover:bg-dental-600 w-full py-6 text-white flex items-center justify-center gap-2">
                <MessageSquareIcon size={20} />
                Chat with Us on WhatsApp
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg h-[400px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7099111123434!2d73.8576146758203!3d18.49679466989888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c017460d073b%3A0x4dd7ccd4395723c2!2sBhandari%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1745918339765!5m2!1sen!2sin" width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bhandari Dental Clinic Location"></iframe>
          </div>
        </div>
      </div>
    </section>;
}