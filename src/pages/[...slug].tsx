import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {
  ContentfulPage,
  fetchPage,
  ContentfulSidebar,
  fetchSidebar,
  fetchPages,
} from '../contentful/data';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import NotFoundPage from './404';
import HeroImage from '../components/HeroImage';
import ContentBlock from '../components/ContentBlock';
import MainContent from '../components/MainContent';
import { ParsedUrlQuery } from 'querystring';
import AppHead from '../components/AppHead';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
}

const StandardPage: NextPage<Props> = ({ page, sidebar }) => {
  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <MainContent>
      <AppHead title={page.title} image={page.image} />

      <div>
        <h1>{page.title}</h1>
        {page.image && <HeroImage image={page.image} />}
        {page.content && <ContentBlock content={page.content} />}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

interface Query extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  const slug = params!.slug;
  const [page, sidebar] = await Promise.all([
    fetchPage(slug, preview),
    fetchSidebar(slug, preview),
  ]);
  return { props: { page, sidebar } };
};

// These pages should not be automatically generated because they are used in custom pages
const excludedPages = ['hem', 'referensnummer'];

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const pages = await fetchPages();
  const filteredPages = pages.filter((p) => !excludedPages.includes(p.slug));
  const paths = filteredPages.map((page) => ({
    params: { slug: page.slug.split('/') },
  }));
  return { paths, fallback: true };
};

export default StandardPage;
