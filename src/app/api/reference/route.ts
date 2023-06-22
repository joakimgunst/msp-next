import { fetchReferenceNumber } from '@/services/referenceNumberService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (typeof name !== 'string') {
    return new Response('Name parameter missing', { status: 400 });
  }

  const match = await fetchReferenceNumber(name);

  if (!match) {
    return new Response('No reference number found', { status: 404 });
  }

  return new Response(JSON.stringify(match));
}
