import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Index';
import BlogPage from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NotFound from './pages/NotFound';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import NewPost from './NewPost';  // updated import to match your existing component
import { Dashboard } from '@/components/admin/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<NewPost />} />  {/* now points to NewPost */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
