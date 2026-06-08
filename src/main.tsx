import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe matchMedia defensive fallback for automated runtimes/iframes and old browsers
if (typeof window !== 'undefined') {
  const nativeMatchMedia = window.matchMedia;
  (window as any).matchMedia = function(query: string) {
    try {
      if (typeof nativeMatchMedia === 'function') {
        const mql = nativeMatchMedia.call(window, query);
        if (mql) {
          // If listeners are missing, match them safely
          if (typeof mql.addListener !== 'function') {
            mql.addListener = function(cb: any) {
              try { mql.addEventListener('change', cb); } catch (e) {}
            };
          }
          if (typeof mql.removeListener !== 'function') {
            mql.removeListener = function(cb: any) {
              try { mql.removeEventListener('change', cb); } catch (e) {}
            };
          }
          return mql;
        }
      }
    } catch (e) {
      console.warn("Falling back matchMedia on error: " + query, e);
    }
    // Deep fallback mock
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() { return false; }
    } as any;
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

