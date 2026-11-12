import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const PRESETS = [60, 90];

// Menggunakan Web Audio API agar tidak perlu file MP3
let audioCtx = null;

const playSound = (type) => {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "countdown") {
      // Bunyi "Ting" pendek untuk hitungan mundur
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now); // Nada tinggi
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1); // Fade out cepat
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "finish") {
      // Bunyi "Tiiiiing" panjang saat selesai
      osc.type = "triangle"; // Sedikit lebih tajam dari sine
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Fade out panjang (1.5 detik)
      osc.start(now);
      osc.stop(now + 1.5);
    }
  } catch (e) {
    console.warn("Audio tidak didukung browser ini", e);
  }
};

export default function RestTimer() {
  const [total, setTotal] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    // 1. Jika waktu habis (0 detik)
    if (seconds === 0) {
      setIsActive(false);
      if (total > 0 && !doneRef.current) {
        doneRef.current = true;
        playSound("finish"); // Bunyi panjang
        navigator.vibrate?.([400, 200, 400]); // Getar panjang
      }
      return;
    }

    // 2. Bunyi "ting" saat hitungan mundur 5, 4, 3, 2, 1
    if (seconds <= 5 && seconds > 0) {
      playSound("countdown");
      navigator.vibrate?.(50); // Getar pendek
    }

    // 3. Timer berjalan
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [isActive, seconds, total]);

  const start = (sec) => {
    doneRef.current = false;
    setTotal(sec);
    setSeconds(sec);
    setIsActive(true);
    // Inisialisasi audio saat tombol diklik (syarat browser HP)
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  };

  const reset = () => {
    setSeconds(0);
    setTotal(0);
    setIsActive(false);
    doneRef.current = false;
  };

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