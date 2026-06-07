import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe matchMedia defensive fallback for automated runtimes/iframes and old browsers
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    (window as any).matchMedia = function(query: string) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return false; }
      };
    };
  } else {
    const originalMatchMedia = window.matchMedia;
    (window as any).matchMedia = function(query: string) {
      try {
        const res = originalMatchMedia.call(window, query);
        if (!res) {
          return {
            matches: false,
            media: query,
            onchange: null,
            addListener: function() {},
            removeListener: function() {},
            addEventListener: function() {},
            removeEventListener: function() {},
            dispatchEvent: function() { return false; }
          };
        }
        if (typeof res.addListener !== 'function') {
          (res as any).addListener = function(cb: any) {
            if (typeof res.addEventListener === 'function') {
              res.addEventListener('change', cb);
            }
          };
        }
        if (typeof res.removeListener !== 'function') {
          (res as any).removeListener = function(cb: any) {
            if (typeof res.removeEventListener === 'function') {
              res.removeEventListener('change', cb);
            }
          };
        }
        return res;
      } catch (e) {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: function() {},
          removeListener: function() {},
          addEventListener: function() {},
          removeEventListener: function() {},
          dispatchEvent: function() { return false; }
        };
      }
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

