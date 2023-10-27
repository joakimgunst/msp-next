'use server';

import { fetchReferenceNumber } from '@/services/referenceNumberService';

export async function getReferenceNumber(_prevState: string, formData: FormData): Promise<string> {
  const name = formData.get('name');

  if (typeof name !== 'string') {
    return 'Namn saknas';
  }

  try {
    const match = await fetchReferenceNumber(name);
    if (!match) {
      return 'Inget referensnummer hittades';
    }
    return `Ditt referensnummer är ${match.referenceNumber}`;
  } catch {
    return 'Ett oväntat problem uppstod';
  }
}
