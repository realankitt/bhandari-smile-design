import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TinaProvider, TinaCMS } from 'tinacms';
import Home from './pages/Index';
import BlogPage from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const cms = new TinaCMS({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  branch: process.env.GITHUB_BRANCH || 'remake', // Update branch
  token: process.env.TINA_TOKEN,
  mediaStore: async () => {
    const pack = await import('next-tinacms-cloudinary');
    return pack.TinaCloudCloudinaryMediaStore;
  },
});

function App() {
  return (
    <TinaProvider cms={cms}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </TinaProvider>
  );
}

export default App;