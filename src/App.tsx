import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPage from './pages/Blog';
import BlogArticle from './pages/BlogArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}