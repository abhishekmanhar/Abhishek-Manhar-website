import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, Eye, Settings, Sparkles, RefreshCw
} from "lucide-react";

interface CodePreset {
  id: string;
  name: string;
  html: string;
  css: string;
  previewClass: string;
}

const PRESETS: CodePreset[] = [
  {
    id: "glass",
    name: "Glassmorphic Plate",
    html: "<h3>Swiss Tech Space</h3>",
    css: "backdrop-filter: blur(8px);",
    previewClass: "bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700"
  },
  {
    id: "orb",
    name: "Tactile Pulsar",
    html: "<div class='pulse-orb'></div>",
    css: "box-shadow: 0 0 20px #E15A3E;",
    previewClass: "bg-neutral-950"
  }
];

export default function CompilerSandbox() {
  const [selectedPreset, setSelectedPreset] = useState<CodePreset>(PRESETS[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [accentColor, setAccentColor] = useState<string>("#EF5B3D");
  const [compiling, setCompiling] = useState(false);

  const triggerRecompile = () => {
    setCompiling(true);
    setTimeout(() => {
      setCompiling(false);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="compiler-interactive-sandbox">
      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          COMPILER — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          Web Dev CSS Compiler
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Harness real-time live browser compilation. Manipulate border curvature or colors and review hot-reloaded visual effects instantly.
        </p>
      </div>

      {/* Main Responsive Layout */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
        
        {/* Left adjusters */}
        <div className="md:col-span-5 bg-[#EDECE5] border border-border-custom p-5 rounded-2xl flex flex-col gap-4">
          <div>
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">CHOOSE PRESET</span>
            <span className="font-sans text-xs text-primary font-medium">Select dynamic code nodes to style:</span>
          </div>

          <div className="flex flex-col gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPreset(p);
                  triggerRecompile();
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  selectedPreset.id === p.id 
                    ? "bg-white border-accent text-accent font-bold shadow-xs" 
                    : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white"
                }`}
              >
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-[#D8D4CC] pt-4.5 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">STYLING KNOBS</span>
            
            {/* Curvature */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center text-[10px] font-mono text-primary">
                <span>BORDER CURVATURE:</span>
                <span className="font-bold">{borderRadius}PX</span>
              </div>
              <input 
                type="range"
                min="0"
                max="32"
                step="4"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="accent-accent h-1.5 w-full bg-[#D8D4CC] rounded cursor-pointer"
              />
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center text-[10px] font-mono text-primary">
                <span>GLOW ACCENT TONE:</span>
                <span className="font-bold flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full inline-block border border-[#D8D4CC]" style={{ backgroundColor: accentColor }} />
                  {accentColor.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2.5 mt-1">
                {["#EF5B3D", "#3B82F6", "#8B5CF6", "#10B981", "#EC4899"].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setAccentColor(color);
                      triggerRecompile();
                    }}
                    className={`w-6.5 h-6.5 rounded-full border cursor-pointer transition hover:scale-110 ${
                      accentColor === color ? "border-primary scale-105 shadow-inner" : "border-[#D8D4CC]"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right compiled display screen */}
        <div className="md:col-span-7 bg-[#100F11] border border-neutral-800 rounded-2xl flex flex-col min-h-[300px] overflow-hidden dark relative">
          
          {/* Header */}
          <div className="bg-[#18171B] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between font-mono text-[9px]">
            <span className="text-[#A2A1A5] font-bold">Compiler Code Port</span>
            
            <div className="flex bg-[#111013] p-0.5 rounded border border-neutral-800">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1 font-sans text-[9px] font-bold px-2.5 py-1 rounded cursor-pointer transition ${
                  activeTab === "preview" ? "bg-[#322F35] text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Eye size={10} />
                <span>Render</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1 font-sans text-[9px] font-bold px-2.5 py-1 rounded cursor-pointer transition ${
                  activeTab === "code" ? "bg-[#322F35] text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Code size={10} />
                <span>Styles</span>
              </button>
            </div>
          </div>

          {/* Core Screen */}
          <div className="p-4 flex-grow flex flex-col min-h-[220px]">
            {compiling ? (
              <div className="flex-grow flex flex-col items-center justify-center gap-2 font-mono text-[9px] text-neutral-500">
                <RefreshCw size={14} className="text-accent animate-spin" />
                <span>RE-COMPILING CODE PIPELINES...</span>
              </div>
            ) : (
              <div className="flex-grow flex flex-col">
                {activeTab === "preview" ? (
                  <div className={`flex-grow rounded-xl flex items-center justify-center p-6 ${selectedPreset.previewClass} min-h-[160px]`}>
                    {selectedPreset.id === "glass" ? (
                      <div 
                        className="p-5 text-center text-white border transition-all duration-200"
                        style={{ 
                          borderRadius: `${borderRadius}px`,
                          borderColor: `rgba(255, 255, 255, 0.2)`,
                          background: `rgba(255, 255, 255, 0.1)`,
                          backdropFilter: "blur(8px)"
                        }}
                      >
                        <Sparkles className="mx-auto text-amber-300 animate-pulse mb-1.5" size={16} />
                        <h4 className="font-serif italic font-bold text-xs tracking-wider">Swiss Workspace</h4>
                        <span className="font-mono text-[8px] text-neutral-200 block mt-1 tracking-widest uppercase">Hot-reloaded card</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div 
                          className="transition-all duration-300 animate-pulse"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: `${borderRadius}px`,
                            backgroundColor: accentColor,
                            boxShadow: `0 0 20px ${accentColor}`
                          }}
                        />
                        <span className="font-mono text-[8px] text-white/50 mt-3 block tracking-widest uppercase">Pulsing Node</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow bg-[#151418] rounded-xl p-3.5 border border-neutral-900 font-mono text-[9px] text-left text-neutral-400">
                    <span className="text-[#EF5B3D] block">// COMPILED CSS EXPORTS</span>
                    <pre className="text-emerald-400 mt-2 select-all whitespace-pre-wrap">
                      {selectedPreset.id === "glass" 
                        ? `.glass-card {\n  border-radius: ${borderRadius}px;\n  backdrop-filter: blur(8px);\n}` 
                        : `.glowing-orb {\n  border-radius: ${borderRadius}px;\n  background-color: ${accentColor};\n  box-shadow: 0 0 20px ${accentColor};\n}`}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-neutral-900 px-4 py-2 flex justify-between font-mono text-[7px] text-neutral-600">
            <span>OFFLINE COMPILER: INJECTED</span>
            <span>NO ERROR PASSES</span>
          </div>

        </div>

      </div>
    </div>
  );
}
