import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function EvaluationView() {
  const [userWeight, setUserWeight] = useState(12);
  const step = (d) => setUserWeight((w) => Math.max(0, Number((w + d).toFixed(1))));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[11px] font-black text-black uppercase tracking-widest mb-2 border-b border-gray-300 pb-2">REKONDISI FASE 1</h2>
        <div className="bg-white border border-gray-200 p-4">
          <ul className="text-[10px] text-gray-600 space-y-2 font-bold uppercase tracking-wide">
            <li className="flex items-start gap-2">
              <span className="text-black font-black mr-1">01.</span>
              <span>Tendon knee & ankle siap menerima beban lebih tinggi.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black font-black mr-1">02.</span>
              <span>Kapasitas paru-paru & daya tahan fisik kembali stabil.</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] font-black text-black uppercase tracking-widest mb-2 border-b border-gray-300 pb-2">REKOMENDASI FASE 2</h2>
        <div className="bg-white border border-gray-200 divide-y divide-gray-100">
          <div className="p-3">
            <h4 className="text-[11px] font-black text-black uppercase tracking-wide">1. PROGRESSIVE OVERLOAD</h4>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Naikkan beban 10-15% jika RPE &lt; 6.</p>
          </div>
          <div className="p-3">
            <h4 className="text-[11px] font-black text-black uppercase tracking-wide">2. DRIL EKSPLOSIF BASKET</h4>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Tambahkan footwork / pogo jumps.</p>
          </div>
          <div className="p-3">
            <h4 className="text-[11px] font-black text-black uppercase tracking-wide">3. EXPLOSIVE TEMPO</h4>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Ubah tempo dorongan untuk daya ledak.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] font-black text-black uppercase tracking-widest mb-2 border-b border-gray-300 pb-2">KALKULATOR BEBAN</h2>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Beban Saat Ini</span>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-1">
                <button onClick={() => step(-1)} className="p-1 text-black hover:bg-gray-200 bg-white border border-gray-200">
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="number"
                  value={userWeight}
                  onChange={(e) => setUserWeight(Number(e.target.value))}
                  className="w-full bg-transparent text-center text-sm font-black text-black focus:outline-none"
                />
                <button onClick={() => step(1)} className="p-1 text-black hover:bg-gray-200 bg-white border border-gray-200">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 border-l border-gray-200 pl-4">
              <span className="text-[9px] font-bold text-black block mb-1 uppercase tracking-wider">Target (+15%)</span>
              <div className="text-xl font-black text-black">
                {(userWeight * 1.15).toFixed(1)} <span className="text-xs text-gray-400">KG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}