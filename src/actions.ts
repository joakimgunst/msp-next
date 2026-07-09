'use server';

import { fetchReferenceNumber } from '@/services/referenceNumberService';

export interface ReferenceNumberFormState {
  name: string;
  message: string;
}

export async function getReferenceNumber(
  _prevState: ReferenceNumberFormState,
  formData: FormData,
): Promise<ReferenceNumberFormState> {
  const name = formData.get('name');

  if (typeof name !== 'string') {
    return { name: '', message: 'Namn saknas' };
  }

  try {
    const match = await fetchReferenceNumber(name);
    if (!match) {
      return { name, message: 'Inget referensnummer hittades' };
    }
    return { name, message: `Ditt referensnummer är ${match.referenceNumber}` };
  } catch (err) {
    console.error('Failed to fetch reference number', err);
    return { name, message: 'Ett oväntat problem uppstod' };
  }
}
