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
    try {
      // If addListener/removeListener are missing (e.g. in older or mock environments), polyfill on prototype cleanly
      const mqlProto = (window.MediaQueryList as any)?.prototype;
      if (mqlProto) {
        if (typeof mqlProto.addListener !== 'function') {
          mqlProto.addListener = function(cb: any) {
            this.addEventListener('change', cb);
          };
        }
        if (typeof mqlProto.removeListener !== 'function') {
          mqlProto.removeListener = function(cb: any) {
            this.removeEventListener('change', cb);
          };
        }
      }
    } catch (e) {
      console.warn("Could not check/patch MediaQueryList listeners prototype:", e);
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

