import React from "react";
import RestTimer from "./RestTimer";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutChecklistView({
  exercises, completedItems, selectedDay, onToggleComplete, onLogSet, logs,
}) {
  const completedCount = exercises.filter((ex) => completedItems[`${selectedDay}_${ex.id}`]).length;

  return (
    <div className="space-y-4">
      <RestTimer />

      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <h2 className="text-[11px] font-black text-black uppercase tracking-widest">DAFTAR GERAKAN</h2>
        <span className="text-[10px] text-black font-black bg-white px-2 py-0.5 border border-gray-200">
          {completedCount}/{exercises.length}
        </span>
      </div>

      <div className="space-y-3">
        {exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            isCompleted={!!completedItems[`${selectedDay}_${ex.id}`]}
            onToggle={() => onToggleComplete(ex.id)}
            onLogSet={(setKey, val) => onLogSet(ex.id, setKey, val)}
            logs={logs[`${selectedDay}_${ex.id}`] || {}}
          />
        ))}
      </div>
    </div>
  );
}