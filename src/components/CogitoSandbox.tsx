import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Sparkles, Check, RotateCcw, Copy, 
  ArrowRight, FileSpreadsheet, Newspaper
} from "lucide-react";

interface PresetArticle {
  id: string;
  title: string;
  author: string;
  wordCount: string;
  summary: {
    bullets: string[];
    paragraph: string;
    abstract: string;
  };
}

const PRESET_ARTICLES: PresetArticle[] = [
  {
    id: "art1",
    title: "Relational Queries & PostgreSQL High Performance",
    author: "Abhishek Manhar",
    wordCount: "1,240 words",
    summary: {
      bullets: [
        "Composite indexing on columns like workspace_id and owner_id decreases lookup times from 800ms to 24ms.",
        "Prisma ORM dynamic batching reduces database roundtrips by clustering separate database requests.",
        "Server-side edge caches maintain near-instant response profiles on active static directories."
      ],
      paragraph: "Optimizing PostgreSQL systems for dynamic SaaS tools requires a combination of composite database indexing, query batch construction with Prisma ORM, and edge node static file caching. These layered efforts reduce structural roundtrips, optimize API endpoints, and minimize response speeds by up to 80% under peak load.",
      abstract: "METHODOLOGY: We evaluated relational query latency curves under simulated client threads. By indexing composite identifiers and batching transactional loops, API latency reduced from 800ms down to 18ms. Server footprint testing proves edge-caching read isolates preserve database availability during burst loads."
    }
  },
  {
    id: "art2",
    title: "Swiss Modernism & Brutalist Typography on the Web",
    author: "Art & Engineering Lab",
    wordCount: "980 words",
    summary: {
      bullets: [
        "Swiss Modernism is defined by high typographical contrast, generous negative spaces, and asymmetric layout balance.",
        "Brutalist typography utilizes bold mono-spaced weights to convey robust structure and honest functionality.",
        "Interactive layouts achieve visual rhythm through intentional, varied margins, crisp borders, and smooth micro-interactions."
      ],
      paragraph: "Swiss Modernism and Brutalism provide a robust architectural framework for digital interfaces. By combining spacious off-white backgrounds, deep grays, and precise monospace layouts with fluid micro-animations, digital designers create tactile products that balance engineering precision with visual clarity.",
      abstract: "ANALYST STUDY: An investigation into modern website layouts reveals high typography pairing and asymmetric grid lines improve consumer retention. Brutalist mono alignments highlight structural indicators. Micro-animations guide attention to primary actions, avoiding visual clutter."
    }
  }
];

export default function CogitoSandbox() {
  const [selectedPreset, setSelectedPreset] = useState<PresetArticle>(PRESET_ARTICLES[0]);
  const [summaryType, setSummaryType] = useState<"bullets" | "paragraph" | "abstract">("bullets");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSummary = selectedPreset.summary[summaryType];

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="cogito-interactive-sandbox">
      {/* Intro header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          COGITO — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          AI Summarizer & Parser
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Experience AI-assisted parsing interfaces. Select from preset articles or toggle formatting options below to see clean compiled takeaways instantly.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
        
        {/* Left Side: Select Preset & Output Options */}
        <div className="md:col-span-5 bg-[#EDECE5] border border-border-custom p-5 rounded-2xl flex flex-col gap-4">
          <div>
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">CHOOSE RESEARCH DRAFT</span>
            <span className="font-sans text-xs text-primary font-medium">Select source thesis to condense:</span>
          </div>

          <div className="flex flex-col gap-2">
            {PRESET_ARTICLES.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  setSelectedPreset(art);
                  setIsProcessing(true);
                  setTimeout(() => setIsProcessing(false), 300);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedPreset.id === art.id 
                    ? "bg-white border-accent text-accent font-bold" 
                    : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-neutral-400" />
                  <span className="line-clamp-2">{art.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-[#D8D4CC] pt-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">CONVERSION FORMAT</span>
            <div className="flex bg-[#E0DFD8] p-0.5 rounded-lg border border-[#D8D4CC]">
              {([
                { id: "bullets", name: "Bullets" },
                { id: "paragraph", name: "Overview" },
                { id: "abstract", name: "Abstract" }
              ] as const).map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSummaryType(type.id);
                    setIsProcessing(true);
                    setTimeout(() => setIsProcessing(false), 200);
                  }}
                  className={`flex-1 text-[10px] font-bold py-1.5 rounded transition-all cursor-pointer ${
                    summaryType === type.id ? "bg-white text-accent shadow-xs" : "text-neutral-500 hover:text-primary"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Simple rendered Output Panel */}
        <div className="md:col-span-7 bg-white border border-border-custom rounded-2xl flex flex-col min-h-[290px] shadow-sm select-none">
          <div className="bg-[#FAF9F5] border-b border-border-custom px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase font-mono tracking-wider">
              <FileText size={13} className="text-accent" />
              <span>Summary Output Pipeline</span>
            </div>
            
            {/* Copy button */}
            <button
              onClick={() => handleCopy(
                Array.isArray(currentSummary) ? currentSummary.join("\n") : currentSummary
              )}
              className="text-xs text-neutral-500 hover:text-accent font-medium flex items-center gap-1 cursor-pointer transition"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-green-600 font-bold" />
                  <span className="text-green-600 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Rendering Area */}
          <div className="p-5 flex-grow flex flex-col justify-between font-sans text-xs sm:text-sm text-neutral-700">
            {isProcessing ? (
              <div className="flex-grow flex flex-col items-center justify-center py-10 gap-2 text-neutral-400 font-mono text-xs">
                <span className="animate-pulse">PARSING SEMANTIC TEXT DATA...</span>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="font-mono text-[9px] text-[#AAAAAA] uppercase tracking-wider block">Currently Parsing:</span>
                  <h4 className="text-sm font-bold text-primary mt-0.5 leading-tight">{selectedPreset.title}</h4>
                  <span className="font-mono text-[8.5px] text-neutral-400 block mt-1">Author: {selectedPreset.author} • {selectedPreset.wordCount}</span>
                </div>

                <div className="border-t border-[#FAF9F5] pt-4.5">
                  {summaryType === "bullets" && Array.isArray(currentSummary) ? (
                    <ul className="space-y-3">
                      {currentSummary.map((bullet, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span className="text-neutral-600 leading-relaxed text-xs">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-600 leading-relaxed text-xs">
                      {currentSummary}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-neutral-100 pt-3 mt-6 flex justify-between items-center font-mono text-[8px] text-neutral-400 pointer-events-none">
              <span>COGITO PARSING AGENT STATUS: ONLINE</span>
              <span>100% OFFLINE SANDBOXED</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
