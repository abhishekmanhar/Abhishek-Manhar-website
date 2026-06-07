import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import DionSandbox from "../components/DionSandbox";
import DiscoverJobsSandbox from "../components/DiscoverJobsSandbox";
import CogitoSandbox from "../components/CogitoSandbox";
import SocialGeneratorSandbox from "../components/SocialGeneratorSandbox";
import KeystrokeSandbox from "../components/KeystrokeSandbox";
import CompilerSandbox from "../components/CompilerSandbox";
import SortingSandbox from "../components/SortingSandbox";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Find target project
  const currentIdx = PROJECTS.findIndex((p) => p.id === slug || p.slug === slug);
  const project = currentIdx !== -1 ? PROJECTS[currentIdx] : null;

  // Navigate to top when project slug shifts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setImageLoaded(false);
  }, [slug]);

  if (!project) {
    return (
      <div className="w-full bg-bg-cream pt-24 min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="font-serif text-3xl text-primary text-center">Case Study Not Found</h2>
        <p className="font-sans text-sm text-muted-text mt-2 text-center">We couldn't track down the project you requested.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-primary text-bg-cream px-6 py-2.5 rounded hover:bg-accent cubic-transition font-sans text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          <span>Return To Homepage</span>
        </Link>
      </div>
    );
  }

  // Calculate previous and next projects
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="w-full bg-bg-cream pt-24 min-h-screen grain-texture select-none pb-12">
      
      {/* CASE STUDY HEAD HERO SECTION */}
      <section className="w-full px-6 md:px-[12%] py-8 max-w-5xl mx-auto flex flex-col items-start gap-4 select-none">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-muted-text hover:text-primary duration-150 mb-4"
          id="case-study-back-btn"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 duration-200" />
          <span>Back to Work</span>
        </Link>

        {/* Dynamic Project Meta details */}
        <span className="font-mono text-xs text-accent font-bold uppercase tracking-widest pl-0.5">
          CASE STUDY ({project.number}) // {project.year}
        </span>

        <h1 className="font-serif text-[38px] sm:text-[56px] md:text-[68px] text-primary leading-[1.1] tracking-tight font-normal">
          {project.title}
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-text max-w-3xl leading-relaxed mt-2 font-light">
          {project.shortDescription}
        </p>

        {/* Project External Links */}
        {(project.githubLink || project.websiteLink) && (
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-bg-cream hover:bg-accent px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider shadow-xs cubic-transition"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            )}
            {project.websiteLink && (
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/5 hover:text-accent hover:border-accent px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider cubic-transition"
              >
                <ExternalLink size={14} />
                <span>Live Website</span>
              </a>
            )}
          </div>
        )}

        {/* HERO HERO PICTURE BLOCK with shimmer simulation skeleton loading */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:h-[480px] bg-[#E8E5DE] rounded-xl overflow-hidden mt-8 relative border border-border-custom shadow-xs select-none">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDEAE3] via-[#E2DFD8] to-[#EDEAE3] animate-pulse w-full h-full" />
          )}
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-300 filter saturate-[0.95] contrast-[1.02] ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            data-cursor="view"
          />
        </div>
      </section>

      {/* METADATA HORIZONTAL COLUMN STRIP */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-[12%] select-none">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-border-custom/80 text-left select-none">
          <div className="sm:border-r border-border-custom/50 pr-4">
            <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest block">Discipline</span>
            <span className="font-sans text-sm sm:text-base text-primary font-semibold mt-1 block">{project.discipline}</span>
          </div>
          <div className="sm:border-r border-border-custom/50 px-0 sm:px-4">
            <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest block">My Role</span>
            <span className="font-sans text-sm sm:text-base text-primary font-semibold mt-1 block">{project.role}</span>
          </div>
          <div className="px-0 sm:px-4">
            <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest block">Timeline</span>
            <span className="font-sans text-sm sm:text-base text-primary font-semibold mt-1 block">{project.timeline}</span>
          </div>
        </div>
      </section>

      {/* DETAILED NARRATIVE FLOW */}
      <section className="w-full max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 font-sans select-none">
        
        {/* Paragraph 1: Context & Overview */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-[30px] sm:text-[34px] text-primary tracking-tight leading-tight">
            Background & Overview
          </h2>
          <p className="text-[#444440] text-sm sm:text-base leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Complex Layout Callout Block: Obstacles & Hurdles */}
        {project.challenges && (
          <div className="flex flex-col gap-4 bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs select-none">
            <h3 className="font-sans text-[17px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Core Challenges
            </h3>
            <ul className="list-decimal pl-4 flex flex-col gap-3 font-sans text-sm sm:text-[15px] text-[#555550]">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="leading-relaxed">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pullquote decorative Orange layout */}
        <div className="py-2 inline-block">
          <blockquote className="font-serif italic text-xl sm:text-2xl text-accent pl-6 border-l-4 border-accent leading-relaxed max-w-xl my-4 select-none">
            "Developing taught me system performance, but art and design taught me constraint and intuition. We stopped choosing between them."
          </blockquote>
        </div>

        {/* Section 2: Concrete Technical Solutions */}
        {project.solutions && (
          <div className="flex flex-col gap-4 select-none">
            <h2 className="font-serif text-[30px] sm:text-[34px] text-primary tracking-tight leading-tight">
              Design & Implementation Strategy
            </h2>
            <p className="text-[#444440] text-sm sm:text-base leading-relaxed mb-4">
              To drive this system to absolute production quality, I compiled isolated, light-weight asynchronous variables that handled events incrementally, preventing thread blocks or slow user-indicator lag:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.solutions.map((sol, idx) => (
                <div key={idx} className="bg-[#EAE7DF]/40 border border-border-custom/75 rounded-lg p-5">
                  <span className="font-mono text-xs font-bold text-[#888880]">SOL-0{idx + 1}</span>
                  <p className="font-sans text-xs sm:text-sm text-[#444440] mt-1.5 leading-relaxed">{sol}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Interactive Sandbox for Projects */}
        {project.id === "p1" && <DionSandbox />}
        {project.id === "p2" && <DiscoverJobsSandbox />}
        {project.id === "p3" && <CogitoSandbox />}
        {project.id === "p4" && <SocialGeneratorSandbox />}
        {project.id === "p5" && <KeystrokeSandbox />}
        {project.id === "p6" && <CompilerSandbox />}
        {project.id === "p7" && <SortingSandbox />}

        {/* Render fully detailed tech-stack box */}
        {project.techStack && (
          <div className="pt-6 select-none">
            <h3 className="font-sans text-sm font-bold text-primary uppercase tracking-widest mb-3">Project Technologies Applied</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="font-mono text-xs px-3 py-1.5 border border-[#D8D4CC] bg-[#EDEBE4]/60 rounded-full text-primary font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* BOTTOM FOOTER-PAGE NAVIGATION STRIP */}
      <section className="w-full max-w-5xl mx-auto px-6 border-t border-border-custom pt-8 select-none">
        <div className="flex flex-row justify-between items-center gap-4 bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs">
          
          {/* Previous case link */}
          <button
            onClick={() => navigate(`/work/${prevProject.id}`)}
            className="group flex flex-col items-start text-left cursor-pointer select-none"
            id="case-study-prev-link"
          >
            <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest">← Previous Case</span>
            <span className="font-serif text-sm sm:text-base font-medium text-primary mt-1 group-hover:text-accent duration-200">
              {prevProject.title.split(" — ")[0]}
            </span>
          </button>

          {/* Next case link */}
          <button
            onClick={() => navigate(`/work/${nextProject.id}`)}
            className="group flex flex-col items-end text-right cursor-pointer select-none"
            id="case-study-next-link"
          >
            <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest">Next Case →</span>
            <span className="font-serif text-sm sm:text-base font-medium text-primary mt-1 group-hover:text-accent duration-200">
              {nextProject.title.split(" — ")[0]}
            </span>
          </button>

        </div>
      </section>

    </div>
  );
}
