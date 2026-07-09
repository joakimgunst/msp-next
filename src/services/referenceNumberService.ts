interface ValueRange {
  range: string;
  majorDimension: string;
  values: [string, string][];
}

export interface ReferenceNumberItem {
  name: string;
  referenceNumber: number;
}

const SHEET_NAME = 'Sheet1';

const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
const spreadsheetId = process.env.REFERENCE_NUMBERS_SPREADSHEET_ID;

export async function fetchReferenceNumber(name: string) {
  // Check inside the function so a missing env variable only breaks this
  // feature instead of every route importing the service
  if (!apiKey) {
    throw new Error('GOOGLE_SHEETS_API_KEY env variable is missing');
  }
  if (!spreadsheetId) {
    throw new Error('REFERENCE_NUMBERS_SPREADSHEET_ID env variable is missing');
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}?key=${apiKey}`;
    const response = await fetch(url);
    const data: ValueRange = await response.json();

    const items = data.values
      .slice(1)
      .filter((v) => v[0])
      .map<ReferenceNumberItem>((v) => ({
        name: v[0].trim(),
        referenceNumber: parseInt(v[1]),
      }));

    return items.find((i) => i.name.localeCompare(name.trim(), 'fi', { sensitivity: 'base' }) === 0);
  } catch (err) {
    throw new Error('Error while fetching data', { cause: err });
  }
}
