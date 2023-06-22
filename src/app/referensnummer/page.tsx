import MainContent from '@/components/MainContent';
import { fetchPage } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import ReferenceNumberForm from '@/components/ReferenceNumberForm';
import { getMetadata } from '@/contentful/utils';

const slug = 'referensnummer';

export async function generateMetadata() {
  const preview = false; // TODO
  const page = await fetchPage(slug, preview);
  return getMetadata(page);
}

export default async function Page() {
  const preview = false; // TODO
  const page = await fetchPage(slug, preview);

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
