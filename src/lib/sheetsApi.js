import { SHEET_API_URL } from "../config";

const isConfigured = () =>
  typeof SHEET_API_URL === "string" && SHEET_API_URL.startsWith("https://script.google.com");

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

function pick(row, ...aliases) {
  const keys = Object.keys(row);
  for (const alias of aliases) {
    const found = keys.find((k) => norm(k) === norm(alias));
    if (found && row[found] !== "" && row[found] != null) return row[found];
  }
  return "";
}

export function normalizeExercise(row, i) {
  return {
    id: String(pick(row, "id", "kode") || `ex${i + 1}`),
    nama: pick(row, "Nama Gerakan", "Gerakan", "Exercise", "Nama") || `Gerakan ${i + 1}`,
    kategori: pick(row, "Kategori", "Category", "Tipe") || "General",
    alat: pick(row, "Alat", "Equipment", "Peralatan") || "-",
    target: pick(row, "Target Otot / Fungsi Basket", "Target Otot", "Target", "Fungsi Basket") || "-",
    instruksi: pick(row, "Instruksi Tempo & Coach Tip", "Instruksi", "Tempo", "Coach Tip", "Catatan") || "-",
    setTarget: Number(pick(row, "Set", "Sets") || 3),
  };
}

export async function fetchBootstrap() {
  if (!isConfigured()) throw new Error("SHEET_NOT_CONFIGURED");
  const res = await fetch(`${SHEET_API_URL}?action=bootstrap&t=${Date.now()}`, {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Gagal memuat data");
  return json.data;
}

export async function pushToSheet(payload) {
  if (!isConfigured()) return false;
  try {
    await fetch(SHEET_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

export { isConfigured };