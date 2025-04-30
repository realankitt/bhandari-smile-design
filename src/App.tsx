import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Index';
import BlogPage from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;