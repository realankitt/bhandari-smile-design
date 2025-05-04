import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 border border-blue-600 px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;