import { useEffect, useState, useRef } from "react";
import { Mail, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Footer() {
  const [scramble1, setScramble1] = useState("I know you want to");
  const [scramble2, setScramble2] = useState("Work with me.");
  const [isTriggered, setIsTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const target1 = "I know you want to";
  const target2 = "Work with me.";

  // Custom text-scramble algorithm
  const performScramble = (targetText: string, setter: (val: string) => void) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz◆◇✦✶✸✴★☆";
    const duration = 12; // total cycles per character
    let tick = 0;
    const maxTicks = targetText.length * 3 + duration;

    const interval = setInterval(() => {
      let currentResult = "";
      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === " ") {
          currentResult += " ";
          continue;
        }

        // Left-to-right sequential resolution
        const resolvedTick = i * 3;
        if (tick >= resolvedTick + duration) {
          currentResult += targetText[i];
        } else if (tick >= resolvedTick) {
          // Rapidly cycling character state
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          currentResult += randomChar;
        } else {
          // Hidden or placeholder until sequence reaches it
          currentResult += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setter(currentResult);
      tick++;

      if (tick > maxTicks) {
        clearInterval(interval);
        setter(targetText); // Settle cleanly on target
      }
    }, 45); // highly smooth cycling frames

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTriggered) {
            setIsTriggered(true);
            performScramble(target1, setScramble1);
            setTimeout(() => {
              performScramble(target2, setScramble2);
            }, 300); // offset line 2 scramble for rhythmic staggered timing
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isTriggered]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-dark-bg text-[#F5F3EE] pt-24 pb-12 px-6 md:px-12 flex flex-col items-center justify-between overflow-hidden grain-texture"
      id="footer-section"
    >
      {/* Subtle glowing circular gradient behind footer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* FOOTER CALL TO ACTION CONTENT */}
      <div className="w-full max-w-4xl text-center flex flex-col items-center z-10">
        <span className="font-mono text-xs text-[#555550] uppercase tracking-[0.2em] mb-4">
          Still Here?
        </span>

        {/* Dynamic header row with scrambling reveal */}
        <h2 className="flex flex-col gap-2 select-none" id="footer-large-scramble-header">
          <span className="font-serif text-[42px] sm:text-[56px] md:text-[72px] text-[#888880] leading-none tracking-tight font-light">
            {scramble1}
          </span>
          <span className="font-serif italic text-[42px] sm:text-[56px] md:text-[72px] text-accent leading-none tracking-tight font-medium">
            {scramble2}
          </span>
        </h2>

        {/* SOCIAL LINKS ROW */}
        <div
          className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-16"
          id="footer-social-row"
        >
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group flex items-center gap-2 font-sans text-sm text-[#888880] hover:text-[#F5F3EE] transition-all hover:-translate-y-0.5 duration-200"
          >
            <Mail size={16} className="group-hover:text-accent cubic-transition group-hover:scale-110" />
            <span>Email</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-sans text-sm text-[#888880] hover:text-[#F5F3EE] transition-all hover:-translate-y-0.5 duration-200"
          >
            <Linkedin size={16} className="group-hover:text-accent cubic-transition group-hover:scale-110" />
            <span>LinkedIn</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-sans text-sm text-[#888880] hover:text-[#F5F3EE] transition-all hover:-translate-y-0.5 duration-200"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" 
              alt="GitHub" 
              className="w-4 h-4 invert opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-accent rounded-full cubic-transition"
            />
            <span>GitHub</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>

          <a
            href={PERSONAL_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-sans text-sm text-[#888880] hover:text-[#F5F3EE] transition-all hover:-translate-y-0.5 duration-200"
          >
            <Instagram size={16} className="group-hover:text-accent cubic-transition group-hover:scale-110" />
            <span>Instagram</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </div>
      </div>

      {/* SEPARATOR AND COPYRIGHT BOTTOM BAR */}
      <div className="w-full mt-24 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
        <span className="font-mono text-xs text-[#444440]">
          © 2025 {PERSONAL_INFO.name}. All Rights Reserved.
        </span>
        <span className="font-mono text-xs text-[#444440] italic">
          Definitely not my first draft.
        </span>
      </div>
    </footer>
  );
}
