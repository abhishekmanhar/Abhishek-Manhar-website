import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import About from "./pages/About";
import Certifications from "./pages/Certifications";
import CaseStudy from "./pages/CaseStudy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Chatbot from "./components/Chatbot";
import { useEffect } from "react";

// Scroll restoration to top on any location context shift
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Staggered route transitions wrapper matching exact user timelines
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        // When entering: start at scale(1) / opacity 0 and y: 16px, fade in to normal
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        // When leaving: slide up to y: -16px and fade out
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Certifications />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          {/* Default fallback route matching homepage */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      {/* 1. Creative CustomCursor representing physical hover ring shifts on desktop */}
      <CustomCursor />

      {/* 2. Global application framing structures */}
      <div className="min-h-screen flex flex-col bg-bg-cream text-primary overflow-x-hidden relative">
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>

        <Footer />
        {/* Floating Gemini AI Grounded Chatbot assistant */}
        <Chatbot />
      </div>
    </HashRouter>
  );
}
