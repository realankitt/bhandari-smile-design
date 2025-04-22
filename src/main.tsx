
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Mount the app with React 18's createRoot API
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("Root element not found");
}
