import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Keyboard, Zap, RotateCcw, Gauge, Trophy, CheckCircle
} from "lucide-react";

interface Quote {
  id: string;
  text: string;
  type: string;
}

const QUOTES: Quote[] = [
  {
    id: "q1",
    text: "import { GoogleGenAI } from '@google/genai'; const ai = new GoogleGenAI();",
    type: "Coding Snippet"
  },
  {
    id: "q2",
    text: "Swiss Modernism relies on asymmetrical geometry, Inter fonts, and high contrast colors.",
    type: "Design Paragraph"
  }
];

export default function KeystrokeSandbox() {
  const [selectedQuote, setSelectedQuote] = useState(QUOTES[0]);
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    resetTest();
  }, [selectedQuote]);

  const resetTest = () => {
    setInputValue("");
    setStartTime(null);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isCompleted) return;

    let tStart = startTime;
    if (!startTime && val.length > 0) {
      tStart = Date.now();
      setStartTime(tStart);
    }

    setInputValue(val);

    // Accuracy
    let correctChars = 0;
    const targetText = selectedQuote.text;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) {
        correctChars++;
      }
    }
    const calculatedAccuracy = val.length === 0 ? 100 : Math.round((correctChars / val.length) * 100);
    setAccuracy(calculatedAccuracy);

    // Roll speeds
    if (tStart) {
      const timeElapsedMinutes = (Date.now() - tStart) / 1000 / 60;
      if (timeElapsedMinutes > 0) {
        const wordsTyped = val.length / 5;
        setWpm(Math.round(wordsTyped / timeElapsedMinutes));
        setCpm(Math.round(val.length / timeElapsedMinutes));
      }
    }

    if (val === targetText) {
      setIsCompleted(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="keystroke-interactive-sandbox">
      {/* Intro header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          KEYSTROKE — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          Typing Speed Analyzer
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Test your typewriter metrics in real-time. Input displayed snippets below and see active speedometers and accuracy meters scale.
        </p>
      </div>

      {/* Responsive split grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-left">
        
        {/* Left Side: Snippet selectors & Controls */}
        <div className="md:col-span-4 bg-[#EDECE5] border border-border-custom p-5 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">CHOOSE MODE</span>
              <span className="font-sans text-xs text-primary font-medium">Select source exercise text:</span>
            </div>

            <div className="flex flex-col gap-2">
              {QUOTES.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedQuote.id === q.id 
                      ? "bg-white border-accent text-accent font-bold" 
                      : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white"
                  }`}
                >
                  <span className="font-mono text-[10px] text-neutral-400 block mb-0.5">{q.type}</span>
                  <span className="truncate block font-semibold">{q.text}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetTest}
            className="w-full bg-white hover:bg-neutral-50 text-neutral-600 hover:text-accent border border-[#D8D4CC] py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw size={12} />
            <span>Reset Test Stats</span>
          </button>
        </div>

        {/* Right Side: Visualizer and Input Field */}
        <div className="md:col-span-8 bg-white border border-border-custom shadow-xs rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5">
          
          {/* Target Text Card display */}
          <div className="bg-[#FAF9F5] border border-border-custom rounded-xl p-4 text-left">
            <span className="font-mono text-[8px] text-[#A8A59C] uppercase tracking-wider block mb-2">TARGET PROMPT TEXT:</span>
            <div className="font-mono text-xs sm:text-sm text-primary tracking-wide leading-relaxed select-text select-all">
              {selectedQuote.text}
            </div>
          </div>

          {/* User Input field wrapper */}
          <div className="flex flex-col gap-2 w-full">
            <span className="font-sans text-xs text-primary font-bold">Type code precisely here:</span>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={isCompleted}
              className={`w-full bg-[#FAF9F5] border rounded-xl p-3 text-xs sm:text-sm font-mono focus:outline-none focus:bg-white focus:border-accent transition-all ${
                isCompleted ? "border-emerald-500 text-emerald-800 bg-emerald-50 bg-opacity-30" : "border-[#D8D4CC]"
              }`}
              placeholder="Begin typing the snippet above..."
              id="keystroke-typing-target-input"
            />
          </div>

          {/* Complete Banner */}
          {isCompleted && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold">
              <CheckCircle size={14} className="text-emerald-500 animate-bounce" />
              <span>Speed run completed cleanly! Hit 'Reset' or change prompt text to restart.</span>
            </div>
          )}

          {/* Numeric stat indicators */}
          <div className="grid grid-cols-3 gap-3 border-t border-neutral-100 pt-5 font-sans">
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EDEAE3] text-center">
              <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-widest block">WPM</span>
              <span className="text-xl sm:text-2xl font-serif italic font-black text-primary block mt-0.5">{wpm}</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EDEAE3] text-center">
              <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-widest block">CPM</span>
              <span className="text-xl sm:text-2xl font-serif italic font-black text-indigo-900 block mt-0.5">{cpm}</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EDEAE3] text-center">
              <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-widest block">ACCURACY</span>
              <span className={`text-xl sm:text-2xl font-serif italic font-black block mt-0.5 ${accuracy < 90 ? "text-rose-600" : "text-emerald-700"}`}>
                {accuracy}%
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
