import { fetchPage, fetchSidebar, fetchPages } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string[] }> };

// These pages have their own custom routes and should not also be reachable
// through the catch-all route (e.g. /hem would duplicate the front page)
const excludedPages = ['hem', 'referensnummer'];

async function getData(slug: string[]) {
  const { isEnabled } = await draftMode();
  return await Promise.all([fetchPage(slug, isEnabled), fetchSidebar(slug, isEnabled)]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (excludedPages.includes(slug.join('/'))) {
    return {};
  }
  const [page] = await getData(slug);
  return getMetadata(page) ?? {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (excludedPages.includes(slug.join('/'))) {
    return notFound();
  }
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
  const filteredPages = pages.filter((p) => !excludedPages.includes(p.slug));
  return filteredPages.map((page) => ({ slug: page.slug.split('/') }));
}
