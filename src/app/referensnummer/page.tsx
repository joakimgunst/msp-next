import MainContent from '@/components/MainContent';
import { fetchPage } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import ReferenceNumberForm from '@/components/ReferenceNumberForm';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';

async function getData() {
  const { isEnabled } = draftMode();
  return await fetchPage('referensnummer', isEnabled);
}

export async function generateMetadata() {
  const page = await getData();
  return getMetadata(page);
}

export default async function Page() {
  const page = await getData();

  return (
    <MainContent>
      <div>
        <h1>{page?.title}</h1>
        {page?.content && <div>{renderDocument(page.content)}</div>}
        <ReferenceNumberForm />
      </div>
    </MainContent>
  );
}
