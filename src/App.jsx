import React, { useCallback, useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import DashboardView from "./components/DashboardView";
import WorkoutChecklistView from "./components/WorkoutChecklistView";
import EvaluationView from "./components/EvaluationView";
import Toast from "./components/Toast";
import useWorkoutData from "./hooks/useWorkoutData";
import { ALL_DAYS, TRAINING_DAYS } from "./config";

const DAY_BY_JS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const todayName = DAY_BY_JS[new Date().getDay()];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDay, setSelectedDay] = useState(todayName);
  const [toast, setToast] = useState(null);

  const {
    exercises, completed, logs, status, sync, toggleComplete, handleLogSet,
  } = useWorkoutData();

  const showToast = useCallback((message, type = "info") => setToast({ message, type }), []);

  const handleRefresh = useCallback(async () => {
    await sync();
    showToast("DATA TERSINKRONISASI", "success");
  }, [sync, showToast]);

  const onToggle = useCallback(
    (exId) => {
      toggleComplete(selectedDay, exId);
      const isNowDone = !completed[`${selectedDay}_${exId}`];
      if (isNowDone) showToast("LATIHAN SELESAI", "success");
    },
    [toggleComplete, selectedDay, completed, showToast]
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5] flex flex-col border-x border-gray-200">
      <Header onRefresh={handleRefresh} status={status} />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="px-4 pt-4 flex-1 safe-bottom">
        {/* Day Selector - Gaya Kotak Tegas */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-5">
          {ALL_DAYS.map((day) => {
            const active = selectedDay === day;
            const isTraining = TRAINING_DAYS.includes(day);
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative flex flex-col items-center justify-center min-w-[56px] py-2 text-[10px] font-black uppercase tracking-wider transition-all border ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200 hover:border-black"
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                {isTraining && (
                  <span className={`w-1.5 h-1.5 mt-1 ${active ? "bg-white" : "bg-black"}`} />
                )}
              </button>
            );
          })}
        </div>

        {activeTab === "dashboard" && (
          <DashboardView
            selectedDay={selectedDay}
            exercises={exercises}
            completed={completed}
            onNavigateToWorkout={() => setActiveTab("workout")}
          />
        )}

        {activeTab === "workout" && (
          <WorkoutChecklistView
            exercises={exercises}
            completedItems={completed}
            selectedDay={selectedDay}
            onToggleComplete={onToggle}
            onLogSet={(exId, setKey, val) => handleLogSet(selectedDay, exId, setKey, val)}
            logs={logs}
          />
        )}

        {activeTab === "evaluation" && (
          <EvaluationView
            completedCount={Object.values(completed).filter(Boolean).length}
            totalSessions={12}
          />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}