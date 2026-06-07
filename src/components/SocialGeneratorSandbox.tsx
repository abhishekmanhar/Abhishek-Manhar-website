import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Twitter, Linkedin, Instagram, Sparkles, Copy, 
  Check, Heart, MessageCircle, Share2, CornerDownRight
} from "lucide-react";

interface Tone {
  id: string;
  name: string;
  emoji: string;
}

const TONES: Tone[] = [
  { id: "evangelist", name: "Evangelist", emoji: "🚀" },
  { id: "sassy", name: "Sassy Dev", emoji: "💅" },
  { id: "honest", name: "Honest Log", emoji: "🔥" }
];

const PRESET_THOUGHTS = [
  {
    label: "Optimized Postgres",
    text: "Refactored my Postgres query batching today with Prisma ORM. Latency dropped from 800ms to 24ms. Composite database indexing is absolute magic."
  },
  {
    label: "Swiss Modernism",
    text: "True product craft comes from Swiss Modernist geometry — pairings like Inter and Space Grotesk, massive negative space, and absolutely no margin clutter."
  }
];

export default function SocialGeneratorSandbox() {
  const [thought, setThought] = useState(PRESET_THOUGHTS[0].text);
  const [selectedTone, setSelectedTone] = useState<string>("evangelist");
  const [platform, setPlatform] = useState<"twitter" | "linkedin">("twitter");
  const [copied, setCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const transformPost = (rawText: string, tone: string) => {
    let result = rawText;
    if (tone === "evangelist") {
      result = `🚀 MAJOR ENGINE OPTIMIZATION 🚀\n\n${rawText}\n\nThis completely changes how we scale transactional volume. Edge caching nodes coupled with Prisma batch selects build unbeatable throughput.\n\n#Developer #DesignSystems #Scaling #SaaS`;
    } else if (tone === "sassy") {
      result = `You are still querying your database in nested loops while crying over slow client response times. 💅\n\n${rawText}\n\nUse proper composite indexing, batch your selects, and maybe stop blaming your framework. It’s not the router’s fault. I said what I said.`;
    } else if (tone === "honest") {
      result = `Engineering transparency: It took me 3 whole days of head-scratching to fix this, but we finally got there. 🔥\n\n${rawText}\n\nNo tricks, just clean index audits and cutting down database roundtrips. Hard work beats fancy refactors every time.`;
    }
    setGeneratedText(result);
  };

  useEffect(() => {
    transformPost(thought, selectedTone);
  }, [thought, selectedTone]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="social-interactive-sandbox">
      {/* Intro header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          SOCIAL COPY — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          Social Media Post Engine
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Translate raw dev logs into viral social engagements. Pivot between platform frameworks, tweak prompt tones, and preview responsive posts smoothly.
        </p>
      </div>

      {/* Main Responsive Split Grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
        
        {/* Left column: input editor */}
        <div className="md:col-span-5 bg-[#EDECE5] border border-border-custom p-5 rounded-2xl flex flex-col gap-4">
          <div>
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">Input Workbench</span>
            <span className="font-sans text-xs text-primary font-medium">Type custom logs or click a preset:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PRESET_THOUGHTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setThought(item.text)}
                className={`text-[10px] font-sans font-semibold px-2.5 py-1 rounded transition bg-white border cursor-pointer border-[#D8D4CC] ${
                  thought === item.text ? "text-accent border-accent bg-accent/5 font-bold" : "text-primary hover:bg-[#F0EEE6]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            className="w-full h-24 bg-white border border-[#D8D4CC] rounded-xl p-3 text-xs text-primary font-sans focus:outline-none focus:border-accent resize-none placeholder-[#9E9C95] leading-relaxed"
            placeholder="Type your raw product or code updates..."
          />

          <div className="border-t border-[#D8D4CC] pt-4.5 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">Select Persona Tone</span>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition cursor-pointer ${
                    selectedTone === t.id 
                      ? "bg-white border-accent text-accent font-bold" 
                      : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white"
                  }`}
                >
                  <span className="text-sm">{t.emoji}</span>
                  <span className="text-[9px] font-semibold mt-0.5 leading-none uppercase tracking-tight">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Beautiful platform post feed preview */}
        <div className="md:col-span-7 bg-white border border-border-custom shadow-sm rounded-2xl flex flex-col overflow-hidden min-h-[295px]">
          
          {/* Top Platform Selector and copy */}
          <div className="bg-[#FAF9F5] border-b border-border-custom px-4 py-2.5 flex items-center justify-between">
            <div className="flex bg-neutral-200 p-0.5 rounded-lg border border-[#D8D4CC]">
              <button
                onClick={() => setPlatform("twitter")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded cursor-pointer transition ${
                  platform === "twitter" ? "bg-white text-primary shadow-xs" : "text-neutral-500"
                }`}
              >
                <Twitter size={11} className="text-[#1DA1F2]" />
                <span>X / Twitter</span>
              </button>
              <button
                onClick={() => setPlatform("linkedin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded cursor-pointer transition ${
                  platform === "linkedin" ? "bg-white text-primary shadow-xs" : "text-neutral-500"
                }`}
              >
                <Linkedin size={11} className="text-[#0A66C2]" />
                <span>LinkedIn</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="text-xs text-neutral-500 hover:text-accent font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy Copywriting</span>
                </>
              )}
            </button>
          </div>

          {/* Social Platform Card Render */}
          <div className="p-4 sm:p-6 flex-grow flex flex-col justify-center bg-neutral-50">
            {platform === "twitter" ? (
              /* Simulated Twitter Card Layout */
              <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs text-left w-full max-w-md mx-auto">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-800 text-white font-serif italic font-extrabold flex items-center justify-center text-xs">
                    Ab
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-neutral-950 block">Abhishek Manhar</span>
                    <span className="font-sans text-[10px] text-neutral-400 block -mt-0.5">@abhishekmanhar</span>
                  </div>
                </div>
                <div className="font-sans text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap">
                  {generatedText}
                </div>
                {/* Simulated engagement bar */}
                <div className="flex justify-between text-neutral-400 border-t border-neutral-100 pt-3 mt-4 text-[10px]">
                  <span className="flex items-center gap-1 hover:text-red-500"><Heart size={11} /> 124</span>
                  <span className="flex items-center gap-1 hover:text-blue-500"><MessageCircle size={11} /> 8</span>
                  <span className="flex items-center gap-1 hover:text-green-500"><Share2 size={11} /> 4</span>
                </div>
              </div>
            ) : (
              /* Simulated LinkedIn Card Layout */
              <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs text-left w-full max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-indigo-900 text-white font-serif italic font-extrabold flex items-center justify-center text-xs">
                    AB
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-neutral-950 block">Abhishek Manhar</span>
                    <span className="font-sans text-[9px] text-neutral-500 block leading-tight">Generalist Software Developer • Former Intern @ JP Morgan Chase & Co</span>
                  </div>
                </div>
                <div className="font-sans text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap">
                  {generatedText}
                </div>
                {/* Simulated engagement stats */}
                <div className="border-t border-neutral-100 mt-4 pt-2.5 flex justify-between items-center text-[9px] text-neutral-400">
                  <span>👍 82 Reactions</span>
                  <span>• 3 Comments</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
