import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const PRESETS = [60, 90];

export default function RestTimer() {
  const [total, setTotal] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (seconds <= 0) {
      setIsActive(false);
      if (total > 0 && !doneRef.current) doneRef.current = true;
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [isActive, seconds, total]);

  const start = (sec) => { doneRef.current = false; setTotal(sec); setSeconds(sec); setIsActive(true); };
  const reset = () => { setSeconds(0); setTotal(0); setIsActive(false); doneRef.current = false; };

  return (
    <div className="bg-black p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REST TIMER</span>
        <span className={`text-3xl font-black font-mono tracking-tighter ${seconds <= 5 && seconds > 0 ? "text-red-500 animate-pulse" : "text-white"}`}>
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => start(p)} className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black tracking-widest border border-white/20 transition-colors">
            {p}S
          </button>
        ))}
        <button onClick={() => setIsActive((a) => !a)} className="px-4 bg-white text-black hover:bg-gray-200 transition-colors">
          {isActive ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
        </button>
        <button onClick={reset} className="px-3 bg-transparent text-white border border-white/20 hover:bg-white/10 transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}