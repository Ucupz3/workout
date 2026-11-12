import React from "react";
import { Check, Square } from "lucide-react";

export default function ExerciseCard({ exercise, isCompleted, onToggle, onLogSet, logs = {} }) {
  const sets = exercise.setTarget || 3;

  return (
    <div className={`bg-white border transition-all duration-300 ${
      isCompleted ? 'border-black bg-gray-50' : 'border-gray-200'
    }`}>
      <div className="p-4 flex items-start gap-3">
        <button onClick={onToggle} className="shrink-0 mt-0.5 active:scale-90 transition-transform">
          {isCompleted ? (
            <div className="w-5 h-5 bg-black flex items-center justify-center">
               <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
          ) : (
            <Square className="w-5 h-5 text-gray-300 hover:text-black" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`text-[13px] font-black uppercase tracking-wide ${isCompleted ? 'text-gray-400 line-through' : 'text-black'}`}>
              {exercise.nama}
            </h3>
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">{exercise.alat}</p>

          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: sets }, (_, i) => i + 1).map((setNum) => (
              <div key={setNum} className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400">S{setNum}</span>
                <input
                  type="text"
                  placeholder="-"
                  value={logs[`set_${setNum}`] || ""}
                  onChange={(e) => onLogSet(`set_${setNum}`, e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-black text-xs font-black pl-6 pr-2 py-1.5 focus:outline-none focus:border-black transition-all placeholder:text-gray-300 text-center"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider leading-relaxed">{exercise.instruksi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}