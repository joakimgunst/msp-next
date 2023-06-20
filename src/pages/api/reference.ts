import ky from 'ky';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.REFERENCE_NUMBERS_SPREADSHEET_ID;
  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name parameter missing' });
  }
  if (!apiKey) {
    return res.status(500).json({ message: 'API key not found' });
  }
  if (!spreadsheetId) {
    return res.status(500).json({ message: 'Spreadsheet id not found' });
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}?key=${apiKey}`;
    const data = await ky.get(url).json<ValueRange>();

    const items = data.values
      .slice(1)
      .filter((v) => v[0])
      .map<ReferenceNumberItem>((v) => ({
        name: v[0],
        referenceNumber: parseInt(v[1]),
      }));

    const match = items.find((i) => i.name.localeCompare(name, 'fi', { sensitivity: 'base' }) === 0);

    if (!match) {
      return res.status(404).json({ message: 'No reference number found' });
    }
    res.json(match);
  } catch {
    return res.status(502).json({ message: 'Error while fetching data' });
  }
}
