import { fetchPage, fetchSidebar, fetchPages } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/contentful/utils';

type Props = { params: { slug: string[] } };

export async function generateMetadata({ params: { slug } }: Props) {
  const preview = false; // TODO
  const page = await fetchPage(slug, preview);
  return getMetadata(page);
}

export default async function Page({ params: { slug } }: Props) {
  const preview = false; // TODO
  const [page, sidebar] = await Promise.all([fetchPage(slug, preview), fetchSidebar(slug, preview)]);

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
