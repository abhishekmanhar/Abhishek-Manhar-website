import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, Layout, ToggleLeft, ArrowRight, 
  Sparkles, Layers, DollarSign, Smartphone, Monitor
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  heroTitle: string;
  heroSub: string;
  ctaText: string;
  themeColor: string;
}

const TEMPLATES: Template[] = [
  {
    id: "agency",
    name: "Digital Agency",
    heroTitle: "We Build High-Speed SaaS Engines",
    heroSub: "Empower your workflows with automated subscription funnels and optimized DB structures.",
    ctaText: "Launch Agency Funnel",
    themeColor: "indigo"
  },
  {
    id: "portfolio",
    name: "Minimal Portfolio",
    heroTitle: "Simple Designs, Solid Engineering",
    heroSub: "Engineering robust full-stack software and fully interactive, high-fidelity tactile websites.",
    ctaText: "Explore Projects",
    themeColor: "emerald"
  },
  {
    id: "product",
    name: "SaaS Application",
    heroTitle: "Dion - One Platform to Run It All",
    heroSub: "The modern developer’s hub for cloud-hosted relational PostgreSQL indexes.",
    ctaText: "Sign Up Free",
    themeColor: "rose"
  }
];

export default function DionSandbox() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [accentBrightness, setAccentBrightness] = useState<number>(50); // percentage

  const themeColors: { [key: string]: { border: string, bg: string, text: string, button: string } } = {
    indigo: {
      border: "border-indigo-500",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
    },
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
    },
    rose: {
      border: "border-rose-500",
      bg: "bg-rose-50",
      text: "text-rose-600",
      button: "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
    }
  };

  const activeColor = themeColors[selectedTemplate.themeColor];

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="dion-interactive-sandbox">
      {/* Short introduction header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          DION — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          SaaS Site-Forge Engine
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Experience how our site builder compiles custom digital agency landers in real time. Tweak the styles and check the adaptivity.
        </p>
      </div>

      {/* Responsive Workbench Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Controllers */}
        <div className="md:col-span-4 bg-[#EDECE5] border border-border-custom p-5 rounded-xl flex flex-col gap-5">
          <div>
            <h4 className="font-mono text-[10px] text-muted-text uppercase tracking-widest font-bold">Template Architect</h4>
            <p className="font-sans text-xs text-primary mt-0.5">Select a landing layout template:</p>
          </div>

          {/* Simple layout buttons */}
          <div className="flex flex-col gap-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  selectedTemplate.id === tpl.id 
                    ? "bg-white border-accent text-accent font-bold shadow-xs" 
                    : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{tpl.name}</span>
                  {selectedTemplate.id === tpl.id && <Sparkles size={12} className="text-accent animate-pulse" />}
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-[#D8D4CC] pt-4 flex flex-col gap-4">
            <div>
              <h4 className="font-mono text-[10px] text-muted-text uppercase tracking-widest font-bold">Aesthetic Modifiers</h4>
              <p className="font-sans text-[11px] text-muted-text mt-0.5">Simulate client-facing style sheets:</p>
            </div>

            {/* Accent Intensity Multiplier */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-center text-[10px] font-mono text-primary">
                <span>CSS Color Tint:</span>
                <span className="font-bold text-accent">{accentBrightness}% Scale</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                step="10"
                value={accentBrightness}
                onChange={(e) => setAccentBrightness(Number(e.target.value))}
                className="accent-accent h-1.5 w-full bg-[#D8D4CC] rounded cursor-pointer"
              />
            </div>

            {/* Device Layout Toggles */}
            <div className="flex items-center justify-between border-t border-[#D8D4CC] pt-4">
              <span className="font-sans text-xs text-primary font-medium">Viewport Device:</span>
              <div className="flex bg-[#E0DFD8] p-0.5 rounded border border-[#D8D4CC]">
                <button
                  onClick={() => setIsMobilePreview(false)}
                  className={`p-1.5 rounded cursor-pointer transition ${!isMobilePreview ? "bg-white text-primary shadow-xs" : "text-neutral-500"}`}
                  title="Desktop Preview"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setIsMobilePreview(true)}
                  className={`p-1.5 rounded cursor-pointer transition ${isMobilePreview ? "bg-white text-primary shadow-xs" : "text-neutral-500"}`}
                  title="Mobile Preview"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Sandbox Preview Container */}
        <div className="md:col-span-8 flex flex-col gap-3 w-full">
          {/* Header of Preview */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#F3F2EB] border border-border-custom rounded-t-lg font-mono text-[10px] text-neutral-500">
            <span>SaaS Forge Live Sandbox Preview</span>
            <span className="text-[9px] uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
              Compiled Successfully
            </span>
          </div>

          {/* Render target layout either full or mobile dimensions with AnimatePresence */}
          <div className="flex justify-center bg-neutral-900/5 p-4 sm:p-6 border-x border-b border-border-custom rounded-b-lg overflow-hidden min-h-[300px]">
            <motion.div
              layout
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden text-left flex flex-col transition-all ${
                isMobilePreview ? "w-full max-w-[320px] min-h-[400px]" : "w-full min-h-[320px]"
              }`}
            >
              {/* Fake web browser address bar */}
              <div className="bg-neutral-50 border-b border-neutral-100 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex-grow bg-neutral-200/50 rounded px-2.5 py-0.5 text-[9px] text-neutral-500 font-mono text-center truncate">
                  dionforge.vercel.app/sandbox-{selectedTemplate.id}
                </div>
              </div>

              {/* Fake Interactive Landing Page Content */}
              <div className="p-6 flex flex-col gap-6 flex-grow justify-center">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: `hsl(${selectedTemplate.themeColor === 'indigo' ? 240 : selectedTemplate.themeColor === 'emerald' ? 140 : 340}, 80%, ${Math.min(70, accentBrightness)}%)` }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      LIVE TEMPLATE FORGE
                    </span>
                  </div>
                  <h4 className="font-serif italic font-extrabold text-xl sm:text-2xl text-neutral-900 leading-tight">
                    {selectedTemplate.heroTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-md">
                    {selectedTemplate.heroSub}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    className={`font-semibold text-xs text-white px-5 py-2.5 rounded-lg transition-transform hover:scale-[1.02] shadow-md border border-black/5 cursor-pointer`}
                    style={{ backgroundColor: `hsl(${selectedTemplate.themeColor === 'indigo' ? 240 : selectedTemplate.themeColor === 'emerald' ? 140 : 340}, 75%, ${Math.min(65, accentBrightness)}%)` }}
                  >
                    {selectedTemplate.ctaText}
                  </button>
                  <button className="text-neutral-500 hover:text-neutral-900 font-medium text-xs px-2 py-1.5 flex items-center gap-1 cursor-pointer">
                    <span>Explore Docs</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {/* Simulated Data counters to give realistic interaction */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-neutral-100 font-sans">
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[9px] text-neutral-400 font-mono uppercase block">ACTIVE CLIENTS</span>
                    <span className="text-sm font-bold text-neutral-800">142 Agencies</span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[9px] text-neutral-400 font-mono uppercase block">ESTIMATED INCOME</span>
                    <span className="text-sm font-bold text-neutral-800" style={{ color: `hsl(${selectedTemplate.themeColor === 'indigo' ? 240 : selectedTemplate.themeColor === 'emerald' ? 140 : 340}, 75%, ${Math.min(65, accentBrightness)}%)` }}>
                      $34,500 / mo
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
