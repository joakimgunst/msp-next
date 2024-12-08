import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  const draft = await draftMode();
  draft.disable();
  redirect(path ?? '/');
}
