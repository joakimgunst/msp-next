import { fetchPage, fetchSidebar, fetchPages } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';

type Props = { params: { slug: string[] } };

async function getData(slug: string[]) {
  const { isEnabled } = draftMode();
  return await Promise.all([fetchPage(slug, isEnabled), fetchSidebar(slug, isEnabled)]);
}

export async function generateMetadata({ params: { slug } }: Props) {
  const [page] = await getData(slug);
  return getMetadata(page?.fields);
}

export default async function Page({ params: { slug } }: Props) {
  const [page, sidebar] = await getData(slug);

  if (!page) {
    return notFound();
  }

  return (
    <MainContent>
      <div>
        <h1>{page.fields.title}</h1>
        {page.fields.image && <HeroImage image={page.fields.image} />}
        {page.fields.content && <ContentBlock content={page.fields.content} />}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.fields.content)}</Sidebar>}
    </MainContent>
  );
}

export async function generateStaticParams() {
  const pages = await fetchPages();
  // These pages should not be automatically generated because they are used in custom pages
  const excludedPages = ['hem', 'referensnummer'];
  const filteredPages = pages.filter((p) => !excludedPages.includes(p.slug));
  return filteredPages.map((page) => ({ slug: page.slug.split('/') }));
}
