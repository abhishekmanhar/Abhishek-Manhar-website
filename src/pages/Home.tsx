import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowDown, Plus, Minus, Github, ExternalLink } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, TESTIMONIALS } from "../data";
// @ts-ignore
import experiencePortrait from "../assets/images/regenerated_image_1780862136120.png";
// @ts-ignore
import dionThumbnail from "../assets/images/regenerated_image_1780954424543.png";

export default function Home() {
  const navigate = useNavigate();
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Dynamic document title & description update for client-side SEO caching
  useEffect(() => {
    document.title = "Abhishek Manhar — Generalist & Full-Stack Developer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Portfolio of Abhishek Manhar, a passion-driven Generalist & Full-Stack Software Developer. Former Intern at JPMorgan Chase and Citi. Builder of high-performance SaaS builders, real-time job indices, and interactive AI systems.");
    }
  }, []);

  // 1. Tagline dynamic carousel sequence (swapping every 3.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("projects-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleProject = (id: string) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-bg-cream pt-16 min-h-screen grain-texture overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section
        className="relative w-full h-[calc(100vh-64px)] min-h-[500px] flex flex-col justify-center px-[8vw] select-none"
        id="hero-section"
      >
        <div className="max-w-5xl flex flex-col items-start gap-4">
          
          {/* Subtle staggered load container */}
          {/* Headline Rotating Box */}
          <div className="relative h-[150px] sm:h-[130px] md:h-[180px] w-full overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute font-serif text-[7vw] sm:text-[6vw] md:text-[5.5vw] text-primary leading-[1.18] tracking-tight font-normal select-none"
                style={{ fontSize: "clamp(2.2rem, 6.2vw, 5.2rem)" }}
              >
                {PERSONAL_INFO.taglines[headlineIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subheadline sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-sans text-base sm:text-lg md:text-xl text-muted-text max-w-[550px] mt-2 sm:mt-4 leading-relaxed font-normal"
          >
            {PERSONAL_INFO.oneLiner} {PERSONAL_INFO.bioParagraph1.split(".").slice(0, 2).join(".")}.
          </motion.p>

          {/* Dynamic milestone snippet info highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex items-center gap-3 bg-[#E8E5DE]/45 border border-border-custom px-4 py-2 rounded-lg mt-1 overflow-hidden"
          >
            <span className="font-mono text-xs text-accent font-bold">MILESTONE</span>
            <span className="text-xs sm:text-sm text-primary font-medium">
              Former Software Intern at Citi ICG & JPMorgan Chase & Co. | TechGig Code Gladiators Semi-finalist.
            </span>
          </motion.div>

          {/* CTA Row buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-row items-center gap-4 mt-8"
            id="hero-cta-button-row"
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="flex items-center gap-2 bg-primary text-bg-cream px-6 py-3 rounded-md text-sm font-medium hover:bg-accent cubic-transition"
              id="hero-view-work-cta"
            >
              <span>View Work</span>
              <ArrowDown size={14} />
            </a>
            <Link
              to="/about"
              className="group flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md text-sm font-medium cubic-transition hover:border-accent hover:text-accent"
              id="hero-about-me-cta"
            >
              <span>About Me</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 cubic-transition" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Availability Badge: Bottom-Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="absolute bottom-10 right-10 hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 shadow-sm px-4 py-2 rounded-full animate-badge-float cursor-pointer z-10"
          id="hero-availability-badge"
          onClick={() => navigate("/about")}
        >
          <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
            👋 Available for Work 
          </span>
        </motion.div>
      </section>

      {/* SECTION 2: INTRO SNIPPET */}
      <section className="w-full py-24 px-6 md:px-12 border-t border-border-custom/30 select-none">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column Text details */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[60%] flex flex-col items-start gap-4"
          >
            <span className="font-mono text-xs text-muted-text uppercase tracking-widest">
              Hello ↓
            </span>
            <h2 className="font-serif text-[38px] sm:text-[48px] text-primary leading-tight font-normal">
              Don't you want to know more
            </h2>
            <div className="font-sans text-base sm:text-md text-[#555550] leading-relaxed flex flex-col gap-5 mt-2">
              <p>
                I'm <strong className="text-primary font-bold">{PERSONAL_INFO.name}</strong>, a Software Developer by discipline and designer by obsession. I spent terms doing full-scale system optimizations at corporate giants before diving deep into advanced interactive digital designs.
              </p>
              <p>
                Developing taught me computing constraints, rigorous data structures, and back-end scales. Creative art taught me color weight, spatial balance, and visual rhythm. I stopped treating them as diverging paths and launched myself into the creative intersection.
              </p>
            </div>
            
            <Link
              to="/about"
              className="group font-sans font-medium text-sm text-primary flex items-center gap-2 border-b border-primary/20 pb-1 mt-4 hover:border-accent hover:text-accent cubic-transition"
            >
              <span>Learn about my journey</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 cubic-transition" />
            </Link>
          </motion.div>

          {/* Right Column Staggered Collage */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[40%] flex justify-center items-center h-[380px] relative"
            id="intro-collage-container"
          >
            {/* Collage Image 1: Abhishek's SaaS Builder (DION) */}
            <div
              className="absolute w-[180px] h-[240px] rounded-lg overflow-hidden border-2 border-bg-cream shadow-md -translate-x-16 -translate-y-12 -rotate-[3deg] hover:rotate-0 hover:scale-110 hover:z-20 cubic-transition group select-none"
              data-cursor="view"
            >
              <img
                src={dionThumbnail}
                alt="DION Website Builder Canvas"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80";
                }}
                loading="lazy"
              />
            </div>

            {/* Collage Image 2: His Passion (Terracotta Dawn Stroke Acrylic Painting) */}
            <div
              className="absolute w-[170px] h-[220px] rounded-lg overflow-hidden border-2 border-bg-cream shadow-md translate-x-12 translate-y-10 rotate-[2deg] hover:rotate-0 hover:scale-110 hover:z-20 cubic-transition group select-none"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80"
                alt="Terracotta Dawn Stroke Acrylic Painting"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Collage Image 3: Core Craft (Enterprise Code visualization) */}
            <div
              className="absolute w-[190px] h-[190px] rounded-lg overflow-hidden border-2 border-bg-cream shadow-md -rotate-[1deg] translate-y-2 translate-x-3 hover:translate-y-0 hover:scale-110 hover:z-20 cubic-transition group select-none"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80"
                alt="Clean development code systems"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: PROJECTS */}
      <section className="w-full pt-20 pb-24 px-4 md:px-12 select-none" id="projects-section">
        
        {/* Large header title */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col justify-start">
          <span className="font-mono text-xs text-muted-text uppercase tracking-widest pl-2 mb-2">
            Selected Work
          </span>
          <h2 className="font-serif text-[48px] sm:text-[62px] text-primary leading-none tracking-tight">
            Projects <span className="font-mono text-sm align-super text-muted-text">({String(PROJECTS.length).padStart(2, "0")})</span>
          </h2>
        </div>

        {/* Scrolling ticker marquee banner */}
        <div className="w-full overflow-hidden border-y border-border-custom/50 py-3 bg-[#EAE7DF] marquee-container select-none mb-14">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-mono text-xs text-muted-text uppercase tracking-widest mx-6 flex items-center gap-1.5 font-bold">
              Recent Favourite Rectangles ✦ Selected Case Studies ✦ Best Work ✦ Recent Favourite Rectangles ✦ Selected Case Studies ✦ Best Work ✦
            </span>
            <span className="font-mono text-xs text-muted-text uppercase tracking-widest mx-6 flex items-center gap-1.5 font-bold">
              Recent Favourite Rectangles ✦ Selected Case Studies ✦ Best Work ✦ Recent Favourite Rectangles ✦ Selected Case Studies ✦ Best Work ✦
            </span>
          </div>
        </div>

        {/* STACKED ACCORDION-STYLE PROJECT LIST */}
        <div className="max-w-6xl mx-auto border-t border-border-custom" id="projects-accordion-list">
          {PROJECTS.map((proj, idx) => {
            const isExpanded = expandedProject === proj.id;
            return (
              <div
                key={proj.id}
                className="w-full border-b border-border-custom relative overflow-hidden transition-all duration-300"
                id={`project-row-${proj.id}`}
              >
                {/* Horizontal Divider scale trigger block */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-[1px] absolute top-0 left-0 bg-border-custom origin-left"
                />

                {/* Primary head line */}
                <div
                  onClick={() => handleToggleProject(proj.id)}
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`project-row w-full flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 px-4 cursor-pointer cubic-transition select-none gap-4 md:gap-0 ${
                    isExpanded ? "bg-[#EDEAE3]" : "hover:bg-[#EDE8DF]"
                  }`}
                >
                  {/* Left Column: Number + Title */}
                  <div className="flex items-center gap-4 sm:gap-6 md:col-span-6 w-full">
                    {/* Number block */}
                    <span className="font-mono text-xs sm:text-sm text-muted-text tracking-wide w-6 flex-shrink-0">
                      {proj.number}
                    </span>

                    {/* Work Title / Hover State Highlight */}
                    <h3
                      className={`font-sans text-lg sm:text-xl md:text-2xl font-bold cubic-transition tracking-tight pr-4 ${
                        hoveredProject === proj.id ? "text-accent translate-x-2" : "text-primary"
                      }`}
                    >
                      {proj.title}
                    </h3>
                  </div>

                  {/* Middle Column: Project tags list */}
                  <div className="flex flex-wrap gap-1.5 md:col-span-4 w-full">
                    {proj.tags.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="font-sans text-[11px] text-primary bg-[#E8E5DE] px-2.5 py-0.5 rounded-full border border-border-custom whitespace-nowrap transition-colors hover:bg-[#DDD9CE]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Right Column: Year + Button */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:col-span-2 w-full mt-2 md:mt-0">
                    <span className="font-mono text-xs sm:text-sm text-[#AAAAAA] md:mr-4">
                      {proj.year}
                    </span>
                    <button className="flex items-center gap-1.5 text-xs text-muted-text hover:text-primary pointer-events-none">
                      <span className="font-sans text-sm">
                        {isExpanded ? "Close" : "Case Study"}
                      </span>
                      {isExpanded ? <Minus size={14} className="text-accent" /> : <Plus size={14} className="group-hover:text-accent" />}
                    </button>
                  </div>
                </div>

                {/* HOVER PREVIEW PANEL: Floats gracefully nearby in visual field */}
                {hoveredProject === proj.id && !isExpanded && (
                  <div
                    className="hidden lg:block absolute right-72 top-[10px] w-[220px] h-[150px] rounded-lg overflow-hidden border border-border-custom shadow-xl z-25 pointer-events-none animate-fade-in duration-250 select-none"
                    style={{ animation: "fade-up 0.3s cubic-bezier(0.25, 1, 0.5, 1)" }}
                  >
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* EXPANDED INNER SUMMARY GRID */}
                <div
                  className="overflow-hidden duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    maxHeight: isExpanded ? "600px" : "0px",
                  }}
                >
                  <div className="px-6 md:px-20 py-8 border-t border-border-custom/45 flex flex-col gap-6 select-none bg-white">
                    <p className="font-sans text-[#555550] text-sm sm:text-base leading-relaxed max-w-2xl">
                      {proj.fullDescription.slice(0, 350)}...
                    </p>

                    {/* Project descriptive metadata lines */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 py-3 border-y border-border-custom/30">
                      <div>
                        <span className="font-mono text-[11px] text-muted-text block uppercase tracking-wider">
                          Discipline
                        </span>
                        <span className="font-sans text-sm text-primary font-medium">
                          {proj.discipline}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] text-muted-text block uppercase tracking-wider">
                          My Role
                        </span>
                        <span className="font-sans text-sm text-primary font-medium">
                          {proj.role}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="font-mono text-[11px] text-muted-text block uppercase tracking-wider">
                          Timeline
                        </span>
                        <span className="font-sans text-sm text-primary font-medium">
                          {proj.timeline}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        to={`/work/${proj.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-bg-cream px-6 py-2.5 rounded hover:bg-accent cubic-transition text-xs font-semibold uppercase tracking-wider"
                      >
                        <span>View Extended Case Study →</span>
                      </Link>

                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/5 hover:text-accent hover:border-accent px-4 py-2.5 rounded cubic-transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}

                      {proj.websiteLink && (
                        <a
                          href={proj.websiteLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/5 hover:text-accent hover:border-accent px-4 py-2.5 rounded cubic-transition text-xs font-semibold uppercase tracking-wider"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS */}
      <section className="relative w-full py-24 bg-white overflow-hidden select-none">
        
        {/* Large Decorative Quotes */}
        <div className="absolute top-6 left-6 font-serif text-[130px] text-[#F3F0E9] leading-none pointer-events-none select-none select-none">
          “
        </div>
        <div className="absolute bottom-6 right-6 font-serif text-[130px] text-[#F3F0E9] leading-none pointer-events-none select-none select-none">
          ”
        </div>

        {/* Centered Headline */}
        <div className="text-center mb-16 relative z-10 px-4">
          <h2 className="font-serif italic text-3xl sm:text-[42px] text-primary tracking-tight font-normal">
            Apparently, I'm fun to work with!
          </h2>
        </div>

        {/* Carousel containing continuous seamless linear slides */}
        <div className="w-full overflow-hidden flex marquee-container select-none " id="testimonials-marquee-stage">
          {/* Duplicated lines of elements to guarantee full infinite loops */}
          <div className="animate-marquee-slow flex select-none">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((test, index) => (
              <div
                key={index}
                className="w-[305px] border border-border-custom/80 bg-white rounded-xl p-6 mx-3 flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-lg cubic-transition select-none flex-shrink-0"
              >
                <div>
                  <p className="font-sans text-[14px] text-[#444440] italic leading-relaxed mb-4">
                    "{test.quote}"
                  </p>
                </div>
                <div className="border-t border-border-custom/40 pt-4 flex flex-col">
                  <span className="font-sans text-[14px] font-bold text-primary">
                    {test.author}
                  </span>
                  <span className="font-sans text-[12px] text-muted-text">
                    {test.position} @ {test.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCE TIMELINE STRIP */}
      <section className="w-full py-24 px-6 md:px-12 select-none border-b border-border-custom/30 bg-bg-cream">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Left Column timeline entries */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[55%] flex flex-col items-start gap-4"
          >
            {/* Status badge pill */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 shadow-xs px-3.5 py-1 rounded-full text-emerald-800 text-[12px] font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-blink" />
              <span>Current Status: {PERSONAL_INFO.currentStatus.split("Former")[0]}</span>
            </div>

            <h2 className="font-serif text-[38px] sm:text-[44px] text-primary leading-tight font-normal">
              Where I've been
            </h2>

            {/* Vertical dot-line timeline */}
            <div className="relative mt-6 pl-6 flex flex-col gap-10" id="experience-home-timeline">
              {/* Continuous vertical dashed trace line */}
              <div className="absolute top-2 bottom-2 left-1.5 border-l border-dashed border-[#C5C0B5] w-[1px]" />

              {/* Loop over experiences */}
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.5 }}
                  className="relative flex flex-col gap-1 select-none"
                >
                  {/* Bullet accent circle */}
                  <div className="absolute top-2 -left-6 w-[12px] h-[12px] rounded-full bg-accent border-[2.5px] border-bg-cream shadow-xs z-10" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="font-sans text-[15px] sm:text-base font-bold text-primary">
                      {exp.company}
                    </span>
                    <span className="font-mono text-xs text-muted-text font-semibold">
                      {exp.duration}
                    </span>
                  </div>

                  <span className="font-sans text-sm text-[#555550] font-medium">
                    {exp.role} — <span className="text-muted-text italic text-xs">{exp.location}</span>
                  </span>

                  <ul className="list-disc pl-4 mt-2 font-sans text-xs sm:text-sm text-muted-text flex flex-col gap-1">
                    {exp.description.slice(0, 1).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-1 bg-primary text-bg-cream px-6 py-3 rounded text-sm font-semibold mt-10 hover:bg-accent cubic-transition"
            >
              <span>View Expanded Timeline →</span>
            </Link>
          </motion.div>

          {/* Right Column Abstract Portrait Layout with organic canvas overlay */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] flex justify-center items-center h-[400px]"
            id="experience-abstract-photo-box"
          >
            <div className="w-full max-w-[360px] h-full rounded-2xl overflow-hidden relative border border-border-custom/50 shadow-lg select-none">
              <img
                src={experiencePortrait}
                alt="Representative Portrait"
                className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.03]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
                }}
                loading="lazy"
                data-cursor="view"
              />
              {/* Bottom decorative coordinates tags overlay */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded text-[11px] text-bg-cream font-mono">
                COORD: 12.9716° N, 77.5946° E // BLR
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
