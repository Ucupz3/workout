import React from "react";
import { Dumbbell, RefreshCw } from "lucide-react";

export default function Header({ onRefresh, status }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-black">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-black p-1.5 text-white">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-black text-sm uppercase tracking-widest text-black">
              Basket<span className="text-gray-400">Comeback</span>
            </h1>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={status === "syncing"}
          className="p-1.5 text-black border border-gray-300 hover:border-black active:scale-95 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${status === "syncing" ? "animate-spin" : ""}`} />
        </button>
      </div>
    </header>
  );
}