import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Bluetooth as Tooth } from 'lucide-react';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import AdminLayout from './components/AdminLayout';
import AdminBlogList from './components/AdminBlogList';
import BlogEditor from './components/BlogEditor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogList />} />
          <Route path="blogs/new" element={<BlogEditor />} />
          <Route path="blogs/edit/:id" element={<BlogEditor blogId={':id'} />} />
        </Route>
      </Routes>
    </Router>
  );
}

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Tooth className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Bhandari Smile Design</span>
              </Link>
              <nav className="ml-10 space-x-8 hidden md:flex">
                <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/blog" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Blog
                </Link>
                <Link to="/admin" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Routes>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Tooth className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Bhandari Smile Design</span>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                Creating beautiful smiles and maintaining optimal dental health for our patients.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-20">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                  Navigation
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link>
                  </li>
                  <li>
                    <Link to="/admin" className="text-gray-400 hover:text-white">Admin</Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                  Contact
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Dental Street</li>
                  <li>Smile City, SC 12345</li>
                  <li>contact@bhandarismile.com</li>
                  <li>(123) 456-7890</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Bhandari Smile Design. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Bhandari Smile Design</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Creating beautiful, healthy smiles for our community. Visit our blog to learn more about dental health and treatments.
        </p>
      </div>
      
      <div className="text-center">
        <Link 
          to="/blog" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Visit Our Blog
        </Link>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Blog Posts
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">12</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin/blogs" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
          </div>
          
          {/* Add more dashboard cards as needed */}
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/admin/blogs/new">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                <h3 className="text-base font-medium text-gray-900">Create New Blog Post</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add a new article to your blog
                </p>
              </div>
            </Link>
            
            {/* Add more quick action cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;