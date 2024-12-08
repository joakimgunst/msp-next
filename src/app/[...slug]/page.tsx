import { fetchPage, fetchSidebar, fetchPages } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';

type Props = { params: Promise<{ slug: string[] }> };

async function getData(slug: string[]) {
  const { isEnabled } = await draftMode();
  return await Promise.all([fetchPage(slug, isEnabled), fetchSidebar(slug, isEnabled)]);
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [page] = await getData(slug);
  return getMetadata(page);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [page, sidebar] = await getData(slug);

  if (!page) {
    return notFound();
  }

  return (
    <MainContent>
      <div>
        <h1>{page.title}</h1>
        {page.image && <HeroImage image={page.image} />}
        {page.content && <ContentBlock content={page.content} />}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
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
