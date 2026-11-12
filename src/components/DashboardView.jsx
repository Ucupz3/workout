import React from "react";
import { ChevronRight, Activity } from "lucide-react";
import { TRAINING_DAYS } from "../config";

const MUSCLE_RECOVERY = [
  { name: "QUADRICEPS", recovery: 85, target: "Jump & Squat" },
  { name: "HAMSTRINGS", recovery: 45, target: "Sprint" },
  { name: "PECTORALIS", recovery: 100, target: "Chest Pass" },
  { name: "LATS & BACK", recovery: 100, target: "Rebound" },
  { name: "DELTOIDS", recovery: 70, target: "Shooting" },
];

const ProgressRing = ({ value }) => {
  const radius = 32;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle stroke="#E5E5E5" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
        <circle stroke="#000000" strokeWidth={stroke} strokeDasharray={circumference + " " + circumference} style={{ strokeDashoffset }} strokeLinecap="square" fill="transparent" r={normalizedRadius} cx={radius} cy={radius} className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-black text-black">{value}%</span>
      </div>
    </div>
  );
};

export default function DashboardView({ onNavigateToWorkout, selectedDay, exercises = [], completed = {} }) {
  const isTrainingDay = TRAINING_DAYS.includes(selectedDay);
  const doneToday = exercises.filter((ex) => completed[`${selectedDay}_${ex.id}`]).length;
  const totalToday = exercises.length || 6;
  const percent = totalToday ? Math.round((doneToday / totalToday) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Hero Card */}
      <div className="bg-white p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          <ProgressRing value={percent} />
          <div className="flex-1">
            <div className="inline-block bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 border border-gray-200">
              {selectedDay}
            </div>
            <h2 className="text-base font-black text-black uppercase leading-tight mb-0.5">
              {isTrainingDay ? "FULL BODY SESSION" : "REST DAY"}
            </h2>
            <p className="text-[10px] text-gray-500 font-medium leading-tight uppercase">
              {isTrainingDay ? "Tempo 3-1-1 kontrol eksentrik." : "Hidrasi & mobilitas."}
            </p>
          </div>
        </div>

        {isTrainingDay && (
          <button
            onClick={onNavigateToWorkout}
            className="mt-4 w-full py-3 bg-black hover:bg-gray-800 text-white font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
          >
            {doneToday > 0 ? "LANJUTKAN LATIHAN" : "MULAI LATIHAN"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 border border-gray-200 flex flex-col justify-between">
          <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase mb-3">SESI SELESAI</span>
          <div className="text-3xl font-black text-black leading-none">
            {doneToday}<span className="text-lg text-gray-400">/{totalToday}</span>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase">KEPATUHAN</span>
            <Activity className="w-3.5 h-3.5 text-black" />
          </div>
          <div className="text-3xl font-black text-black leading-none">100%</div>
        </div>
      </div>

      {/* Muscle Recovery */}
      <div>
        <h2 className="text-[10px] font-black text-black uppercase tracking-widest mb-2">MUSCLE RECOVERY</h2>
        <div className="bg-white border border-gray-200 overflow-hidden">
          {MUSCLE_RECOVERY.map((item, idx) => (
            <div key={item.name} className={`p-3 flex items-center justify-between ${idx !== MUSCLE_RECOVERY.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div>
                <p className="text-[10px] font-bold text-black tracking-wide uppercase">{item.name}</p>
                <p className="text-[9px] text-gray-500 mt-0.5">{item.target}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 bg-gray-200 rounded-none overflow-hidden">
                  <div className={`h-full bg-black`} style={{ width: `${item.recovery}%` }} />
                </div>
                <span className="text-[10px] font-black text-black w-8 text-right font-mono">{item.recovery}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}