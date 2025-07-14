import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import AuthProvider from './context/AuthProvider'; // ✅ wraps the app
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
    
        <AuthProvider>

        <App />
        </AuthProvider>
    <Toaster position="top-right" />
    </BrowserRouter>
  </StrictMode>,
)
