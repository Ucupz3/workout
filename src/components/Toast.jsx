import React, { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center px-4 py-2 bg-black shadow-lg text-[10px] font-black text-white uppercase tracking-widest">
        <span>{toast.message}</span>
      </div>
    </div>
  );
}