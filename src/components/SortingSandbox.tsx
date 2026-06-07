import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, RotateCcw, Volume2, VolumeX, BarChart3, 
  Pause, RefreshCw
} from "lucide-react";

export default function SortingSandbox() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(100); // ms delay
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection">("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const cancelSortRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    generateNewArray();
    return () => {
      cancelSortRef.current = true;
    };
  }, [arraySize]);

  const generateNewArray = () => {
    cancelSortRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
    setSortedIndices([]);
    
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 80) + 20);
    }
    setArray(newArray);
  };

  const playSortingTone = (heightValue: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const minFreq = 180;
      const maxFreq = 600;
      const frequency = minFreq + ((heightValue - 20) / 80) * (maxFreq - minFreq);

      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.type = "sine";

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn("Audio Context blocked: ", e);
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const startBubbleSort = async () => {
    setIsSorting(true);
    cancelSortRef.current = false;
    const tempArr = [...array];
    const len = tempArr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (cancelSortRef.current) {
          setIsSorting(false);
          return;
        }

        setActiveIndices([j, j + 1]);
        playSortingTone(tempArr[j]);

        await delay(speed);

        if (tempArr[j] > tempArr[j + 1]) {
          const temp = tempArr[j];
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = temp;
          setArray([...tempArr]);
        }
      }
      setSortedIndices((prev) => [...prev, len - i - 1]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const startSelectionSort = async () => {
    setIsSorting(true);
    cancelSortRef.current = false;
    const tempArr = [...array];
    const len = tempArr.length;

    for (let i = 0; i < len; i++) {
      let minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (cancelSortRef.current) {
          setIsSorting(false);
          return;
        }

        setActiveIndices([i, j, minIdx]);
        playSortingTone(tempArr[j]);

        await delay(speed);

        if (tempArr[j] < tempArr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = tempArr[i];
        tempArr[i] = tempArr[minIdx];
        tempArr[minIdx] = temp;
        setArray([...tempArr]);
      }

      setSortedIndices((prev) => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const triggerSort = () => {
    if (isSorting) {
      cancelSortRef.current = true;
      setIsSorting(false);
    } else {
      setSortedIndices([]);
      if (algorithm === "bubble") {
        startBubbleSort();
      } else {
        startSelectionSort();
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="sorting-interactive-sandbox">
      {/* Introduction text */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          SORTING — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          Algorithmic Data State Router
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Experience mathematical visual stability. Filter active sorting routines, toggle acoustic speed tones, and review active passes.
        </p>
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
        
        {/* Left column sidebar controls */}
        <div className="md:col-span-4 bg-[#EDECE5] border border-border-custom p-5 rounded-2xl flex flex-col gap-4">
          <div>
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">CHOOSE ALGORITHM</span>
            <span className="font-sans text-xs text-primary font-medium">Select database sorting flow:</span>
          </div>

          <div className="flex flex-col gap-2">
            {(["bubble", "selection"] as const).map((alg) => (
              <button
                key={alg}
                onClick={() => setAlgorithm(alg)}
                disabled={isSorting}
                className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  algorithm === alg 
                    ? "bg-white border-accent text-accent font-bold" 
                    : "bg-white/40 border-[#D8D4CC] text-primary hover:bg-white disabled:opacity-55"
                }`}
              >
                <span>{alg === "bubble" ? "Bubble Sort (O(n²))" : "Selection Sort (O(n²))"}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-[#D8D4CC] pt-4 flex flex-col gap-3.5">
            <span className="font-mono text-[9px] text-muted-text uppercase tracking-widest font-semibold block">TUNERS</span>
            
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center text-[10px] font-mono text-primary">
                <span>ITEMS COUNT:</span>
                <span className="font-bold">{arraySize}</span>
              </div>
              <input 
                type="range"
                min="10"
                max="30"
                step="2"
                value={arraySize}
                disabled={isSorting}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="accent-accent h-1.5 w-full bg-[#D8D4CC] rounded cursor-pointer disabled:opacity-40"
              />
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs cursor-pointer transition-all ${
                soundEnabled 
                  ? "bg-white border-accent text-accent font-bold" 
                  : "bg-white/40 border-[#D8D4CC] text-neutral-500 hover:text-primary"
              }`}
            >
              {soundEnabled ? <Volume2 size={13} className="text-accent" /> : <VolumeX size={13} />}
              <span>{soundEnabled ? "Audio Pitch: Enabled" : "Toggle Audio Pitch"}</span>
            </button>
          </div>
        </div>

        {/* Right column active diagram */}
        <div className="md:col-span-8 bg-white border border-border-custom rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-[300px]">
          
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5 mb-4">
            <div>
              <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-widest block">SORTING DIAGRAM PIXEL</span>
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mt-0.5">
                {algorithm === "bubble" ? "Bubble Sort Pipeline" : "Selection Sort Pipeline"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={generateNewArray}
                className="p-1.5 px-3 bg-[#FAF9F5] hover:bg-neutral-100 text-neutral-600 border border-[#EDEAE3] text-[10px] rounded-lg cursor-pointer font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw size={11} />
                <span>Reset</span>
              </button>

              <button
                onClick={triggerSort}
                className={`p-1.5 px-4 text-[10px] rounded-lg cursor-pointer font-bold transition flex items-center gap-1.5 ${
                  isSorting 
                    ? "bg-rose-600 hover:bg-rose-500 text-white" 
                    : "bg-primary hover:bg-accent text-white"
                }`}
              >
                {isSorting ? <Pause size={11} /> : <Play size={11} />}
                <span>{isSorting ? "Halt" : "Sort Data"}</span>
              </button>
            </div>
          </div>

          {/* Graph bars represent array values */}
          <div className="flex-grow flex items-end justify-between gap-[3px] border border-[#EDEAE3] bg-[#FAF9F5] p-4 rounded-xl min-h-[160px] relative overflow-hidden">
            {array.map((val, idx) => {
              let bgClass = "bg-[#D8D4CC] border-transparent";
              if (activeIndices.includes(idx)) {
                bgClass = "bg-accent border-accent animate-pulse scale-y-[1.03] shadow-md";
              } else if (sortedIndices.includes(idx)) {
                bgClass = "bg-emerald-600 border-emerald-500/10";
              }

              return (
                <div 
                  key={idx}
                  style={{ height: `${val}%` }}
                  className={`w-full rounded-t-xs transition-all duration-150 ${bgClass}`}
                />
              );
            })}
          </div>

          <div className="border-t border-neutral-100 pt-3.5 mt-4 flex justify-between items-center font-mono text-[8px] text-neutral-400">
            <span>SOUND KEY OSCILLATORS: SINE WAVE</span>
            <span className="flex items-center gap-1.5 font-bold uppercase text-accent">
              {isSorting ? "COMPILING INDEX PASSES" : "STABLE STATE"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
