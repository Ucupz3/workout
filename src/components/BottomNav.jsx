import React from "react";
import { LayoutDashboard, CheckSquare, Award } from "lucide-react";

const ITEMS = [
  { id: "dashboard", label: "HOME", icon: LayoutDashboard },
  { id: "workout", label: "LATIHAN", icon: CheckSquare },
  { id: "evaluation", label: "EVALUASI", icon: Award },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white border-t border-black">
      <div className="flex justify-around items-center pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-1 px-2">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 w-full py-2 transition-all ${
                isActive ? "text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-black tracking-widest">{label}</span>
              {isActive && <div className="w-4 h-0.5 bg-black mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}