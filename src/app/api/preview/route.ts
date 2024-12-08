import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  if (!secret || secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Missing or invalid secret parameter', { status: 401 });
  }
  if (!path) {
    return new Response('Missing path parameter', { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}
