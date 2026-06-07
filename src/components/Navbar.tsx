import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Navbar() {
  const [timeStr, setTimeStr] = useState("");
  const [tzStr, setTzStr] = useState("UTC");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Current live clock handler
  useEffect(() => {
    // Detect general timezone
    try {
      const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Abbreviate timezone (e.g. Asia/Kolkata -> IST)
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZoneName: "short",
        timeZone: tzName,
      });
      const parts = formatter.formatToParts(new Date());
      const tzPart = parts.find((p) => p.type === "timeZoneName");
      if (tzPart) {
        setTzStr(tzPart.value);
      }
    } catch (e) {
      setTzStr("GMT+5:30");
    }

    const updateClock = () => {
      const now = new Date();
      const HH = String(now.getHours()).padStart(2, "0");
      const MM = String(now.getMinutes()).padStart(2, "0");
      const SS = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${HH}:${MM}:${SS}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      const target = document.getElementById("projects-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      // Short delay to let the home screen mount before scrolling
      setTimeout(() => {
        const target = document.getElementById("projects-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  };

  const handleNavLinkClick = (path: string) => {
    setMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open candidate's real resume or an elegant dynamic print frame
  const handleResumeOpen = () => {
    setMenuOpen(false);
    window.open(PERSONAL_INFO.resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full h-16 z-[9990] flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-bg-cream/85 border-b border-border-custom/40 transition-colors duration-300"
        id="main-navbar"
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-sans font-semibold text-15 tracking-tight text-primary transition-opacity hover:opacity-80"
          id="navbar-logo-link"
        >
          {PERSONAL_INFO.name}
        </Link>

        {/* CLOCK & WORK BADGE DISPLAY - Desktop Only */}
        <div
          className="hidden md:flex items-center gap-6"
          id="navbar-widget-container"
        >
          {timeStr && (
            <span className="font-mono text-[13px] text-muted-text tracking-wider">
              {tzStr} {timeStr}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-blink" />
            <span className="font-sans text-[13px] text-muted-text">
              Available for projects
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS - Desktop Only */}
        <div className="hidden md:flex items-center gap-8" id="navbar-links-desktop">
          <a
            href="#work"
            onClick={handleWorkClick}
            className="font-sans text-sm text-primary relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scaleX-0 hover:after:scaleX-100 after:transform-origin-left after:transition-transform after:duration-300"
          >
            Work
          </a>
          <button
            onClick={() => handleNavLinkClick("/certifications")}
            className="font-sans text-sm text-primary relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scaleX-0 hover:after:scaleX-100 after:transform-origin-left after:transition-transform after:duration-300"
          >
            Certifications
          </button>
          <button
            onClick={() => handleNavLinkClick("/about")}
            className="font-sans text-sm text-primary relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scaleX-0 hover:after:scaleX-100 after:transform-origin-left after:transition-transform after:duration-300"
          >
            About
          </button>
          <button
            onClick={handleResumeOpen}
            className="font-sans text-[13px] font-medium border border-primary text-primary px-4 py-1.5 rounded-full cubic-transition hover:bg-primary hover:text-bg-cream"
            id="resume-btn-desktop"
          >
            Resume →
          </button>
        </div>

        {/* MOBILE TRIGGER - Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary z-[9999] hover:text-accent duration-250 cursor-pointer"
          aria-label="Toggle menu"
          id="mobile-menu-hamburger"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE FULL-SCREEN GRID OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 w-full h-screen bg-dark-bg text-bg-cream z-[9980] flex flex-col justify-center px-10 transition-opacity duration-300"
          id="mobile-navigation-overlay"
        >
          {/* Subtle decoration in overlay background */}
          <div className="absolute top-10 left-10 opacity-30 font-mono text-xs text-muted-text">
            Navigation Menu // Abhishek Manhar Portfolio
          </div>

          <div className="flex flex-col gap-6 md:gap-8" id="mobile-overlay-links">
            <div className="overflow-hidden">
              <a
                href="#work"
                onClick={handleWorkClick}
                className="block font-serif text-[48px] text-bg-cream hover:text-accent transform transition-transform duration-500 ease-out translate-y-0"
                style={{ transitionDelay: "0ms" }}
              >
                Work.
              </a>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavLinkClick("/certifications")}
                className="block font-serif text-[48px] text-bg-cream text-left hover:text-accent transform transition-transform duration-500 ease-out translate-y-0"
                style={{ transitionDelay: "800ms" }}
                id="mobile-link-certifications"
              >
                Certifications.
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavLinkClick("/about")}
                className="block font-serif text-[48px] text-bg-cream text-left hover:text-accent transform transition-transform duration-500 ease-out translate-y-0"
                style={{ transitionDelay: "160ms" }}
                id="mobile-link-about"
              >
                About.
              </button>
            </div>
            <div className="overflow-hidden mt-4">
              <button
                onClick={handleResumeOpen}
                className="font-sans text-sm inline-block border border-bg-cream text-bg-cream px-6 py-2.5 rounded-full cubic-transition hover:bg-bg-cream hover:text-primary"
              >
                View Resume →
              </button>
            </div>
          </div>

          {/* Bottom details of mobile layout */}
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-muted-text text-[11px] font-mono">
            <span>© 2025 Abhishek M.</span>
            <span>Based in Bangalore, IN</span>
          </div>
        </div>
      )}
    </>
  );
}
