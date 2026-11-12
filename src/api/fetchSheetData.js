import Papa from 'papaparse';

const SPREADSHEET_ID = '1UBY9mKft5mpP_CXbqY2mW874NfGCJOpn';

const getSheetCsvUrl = (sheetName) =>
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

export const fetchSheetData = async (sheetName = 'Jadwal Mingguan') => {
  const url = getSheetCsvUrl(sheetName);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data sheet: ${response.statusText}`);
  }
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};                                      