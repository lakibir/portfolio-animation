/**
 * config.js — Global Portfolio Configuration for Vercel & Render Deployment
 * 
 * Instructions:
 * 1. Deploy backend on Render (https://render.com).
 * 2. Paste your Render backend URL below in BACKEND_URL (e.g. 'https://portfolio-backend.onrender.com').
 * 3. Deploy frontend on Vercel (https://vercel.com).
 * 
 * Note: If BACKEND_URL is left empty, the application uses relative '/api',
 * which works automatically for local development and for Vercel when rewrites are configured.
 */
window.PORTFOLIO_CONFIG = {
  // Render Backend URL
  BACKEND_URL: 'https://portfolio-animation-1.onrender.com'
};

// Global helper to resolve the active Backend API URL across all pages
function getPortfolioApiBase() {
  if (typeof window !== 'undefined') {
    // 1. Explicit global config from config.js
    if (window.PORTFOLIO_CONFIG && typeof window.PORTFOLIO_CONFIG.BACKEND_URL === 'string' && window.PORTFOLIO_CONFIG.BACKEND_URL.trim() !== '') {
      return window.PORTFOLIO_CONFIG.BACKEND_URL.trim().replace(/\/+$/, '') + '/api';
    }

    // 2. Browser localStorage override (settable in Admin Control Center or Devtools)
    try {
      const storedUrl = localStorage.getItem('PORTFOLIO_BACKEND_URL');
      if (storedUrl && storedUrl.trim() !== '') {
        return storedUrl.trim().replace(/\/+$/, '') + '/api';
      }
    } catch (e) {
      // localStorage may be restricted in some iframe/privacy contexts
    }

    // 3. Localhost development detection (file:// or Live Server ports like 5500, 3000)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    if (isLocal && window.location.port && window.location.port !== '5000') {
      return 'http://localhost:5000/api';
    }
  }

  // 4. Default relative /api (works on local node server & on Vercel with rewrites)
  return '/api';
}
