// src/components/ExerciseCard.jsx
import React from "react";
import { Check, Square, Play } from "lucide-react";

export default function ExerciseCard({ exercise, isCompleted, onToggle, onLogSet, logs = {} }) {
  const sets = exercise.setTarget || 3;

  return (
    <div className={`bg-white border transition-all duration-300 ${
      isCompleted ? 'border-black bg-gray-50' : 'border-gray-200'
    }`}>
      <div className="p-4">
        
        {/* Header: Checkbox & Thumbnail & Judul */}
        <div className="flex items-start gap-3 mb-3">
          <button onClick={onToggle} className="shrink-0 mt-1 active:scale-90 transition-transform">
            {isCompleted ? (
              <div className="w-5 h-5 bg-black flex items-center justify-center">
                 <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
            ) : (
              <Square className="w-5 h-5 text-gray-300 hover:text-black" />
            )}
          </button>
          
          {/* Thumbnail Foto - Dibuat grayscale biar nyatu sama tema B&W */}
          {exercise.imageUrl && (
            <div className="w-14 h-14 shrink-0 border border-gray-200 overflow-hidden bg-gray-100">
              <img 
                src={exercise.imageUrl} 
                alt={exercise.nama} 
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className={`text-[13px] font-black uppercase tracking-wide leading-tight ${isCompleted ? 'text-gray-400 line-through' : 'text-black'}`}>
              {exercise.nama}
            </h3>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">{exercise.alat}</p>
          </div>
        </div>

        {/* Input Set */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
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
        
        {/* Instruksi & Tombol Video */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider leading-relaxed flex-1">
            {exercise.instruksi}
          </p>
          
          {exercise.youtubeUrl && (
            <a 
              href={exercise.youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-gray-800 transition-colors text-[9px] font-black uppercase tracking-widest"
            >
              <Play className="w-3 h-3 fill-white" /> Video
            </a>
          )}
        </div>

      </div>
    </div>
  );
}