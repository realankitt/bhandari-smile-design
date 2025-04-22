import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Page Not Found | Bhandari Dental Clinic</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Bhandari Dental Clinic's homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center max-w-md px-6">
        <div className="mb-6 text-dental-500 font-bold text-7xl">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-dental-500 hover:bg-dental-600">
            <a href="/">Return to Homepage</a>
          </Button>
          <Button 
            variant="outline" 
            asChild 
            className="border-dental-200 hover:bg-dental-50 text-dental-800"
          >
            <a 
              href="https://wa.me/+919999999999?text=Hi,%20I'm%20having%20trouble%20finding%20a%20page%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
