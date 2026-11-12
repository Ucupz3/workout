// src/hooks/useWorkoutData.js
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchBootstrap, normalizeExercise, pushToSheet, isConfigured } from "../lib/sheetsApi";
import { DEFAULT_EXERCISES } from "../data/defaultExercises";

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export default function useWorkoutData() {
  const [exercises, setExercises] = useState(DEFAULT_EXERCISES);
  const [completed, setCompleted] = useState(() => load("workout_completed", {}));
  const [logs, setLogs] = useState(() => load("workout_logs", {}));
  const [status, setStatus] = useState(isConfigured() ? "idle" : "offline");
  const [lastSync, setLastSync] = useState(null);
  const [error, setError] = useState(null);
  const queueRef = useRef([]);

  useEffect(() => {
    localStorage.setItem("workout_completed", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem("workout_logs", JSON.stringify(logs));
  }, [logs]);

  const sync = useCallback(async () => {
    if (!isConfigured()) {
      setStatus("offline");
      return;
    }
    setStatus("syncing");
    setError(null);
    try {
      const data = await fetchBootstrap();
      if (Array.isArray(data.exercises) && data.exercises.length) {
        setExercises(data.exercises.map(normalizeExercise));
      }
      if (data.completed) setCompleted((prev) => ({ ...prev, ...data.completed }));
      if (data.logs) setLogs((prev) => ({ ...prev, ...data.logs }));
      setStatus("online");
      setLastSync(new Date());
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  const flush = useCallback(async () => {
    if (!queueRef.current.length) return;
    const batch = [...queueRef.current];
    queueRef.current = [];
    for (const item of batch) await pushToSheet(item);
  }, []);

  const enqueue = useCallback(
    (payload) => {
      queueRef.current.push(payload);
      if (queueRef.current.length === 1) {
        setTimeout(() => flush(), 800);
      }
    },
    [flush]
  );

  const toggleComplete = useCallback(
    (day, exId) => {
      const key = `${day}_${exId}`;
      setCompleted((prev) => {
        const next = !prev[key];
        enqueue({
          action: "attendance",
          day,
          exerciseId: exId,
          done: next,
          sets: logs[key] || {},
          at: new Date().toISOString(),
        });
        return { ...prev, [key]: next };
      });
    },
    [enqueue, logs]
  );

  const handleLogSet = useCallback(
    (day, exId, setKey, val) => {
      const key = `${day}_${exId}`;
      setLogs((prev) => {
        const nextLogs = { ...prev, [key]: { ...(prev[key] || {}), [setKey]: val } };
        enqueue({
          action: "attendance",
          day,
          exerciseId: exId,
          done: !!completed[key],
          sets: nextLogs[key],
          at: new Date().toISOString(),
        });
        return nextLogs;
      });
    },
    [completed, enqueue]
  );

  return {
    exercises,
    completed,
    logs,
    status,
    lastSync,
    error,
    sync,
    toggleComplete,
    handleLogSet,
  };
}