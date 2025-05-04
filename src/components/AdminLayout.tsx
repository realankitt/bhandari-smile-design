import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white';
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 flex flex-col w-64 z-50 bg-blue-800 transform transition-transform ease-in-out duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 bg-blue-900 px-4">
          <div className="flex items-center">
            <span className="text-white text-lg font-semibold">Admin Panel</span>
          </div>
          <button 
            onClick={closeSidebar}
            className="text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link 
              to="/admin" 
              className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin')}`}
              onClick={closeSidebar}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link 
              to="/admin/blogs" 
              className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/blogs')}`}
              onClick={closeSidebar}
            >
              <FileText className="mr-3 h-5 w-5" />
              Blog Posts
            </Link>
            <Link 
              to="/admin/media" 
              className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/media')}`}
              onClick={closeSidebar}
            >
              <ImageIcon className="mr-3 h-5 w-5" />
              Media Library
            </Link>
            <Link 
              to="/admin/settings" 
              className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/settings')}`}
              onClick={closeSidebar}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
          
          <div className="border-t border-blue-700 p-4">
            <button className="flex items-center w-full px-4 py-2 text-sm text-blue-100 rounded-md hover:bg-blue-700 hover:text-white">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-blue-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-900">
              <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <Link 
                  to="/admin" 
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin')}`}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link 
                  to="/admin/blogs" 
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/blogs')}`}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  Blog Posts
                </Link>
                <Link 
                  to="/admin/media" 
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/media')}`}
                >
                  <ImageIcon className="mr-3 h-5 w-5" />
                  Media Library
                </Link>
                <Link 
                  to="/admin/settings" 
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/admin/settings')}`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </nav>
              
              <div className="border-t border-blue-700 p-4">
                <button className="flex items-center w-full px-4 py-2 text-sm text-blue-100 rounded-md hover:bg-blue-700 hover:text-white">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {location.pathname.includes('/blogs') ? 'Blog Management' : 
                 location.pathname.includes('/media') ? 'Media Library' :
                 location.pathname.includes('/settings') ? 'Settings' : 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/" className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                View Website
              </Link>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;