import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {
  ContentfulPage,
  fetchPage,
  ContentfulSidebar,
  fetchSidebar,
  fetchPages,
} from '../contentful/data';
import Layout from '../components/Layout';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';
import { getAssetUrl } from '../contentful/utils';
import NotFoundPage from './404';
import HeroImage from '../components/HeroImage';
import ContentBlock from '../components/ContentBlock';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
}

const StandardPage: NextPage<Props> = ({ page, sidebar }) => {
  if (!page) {
    return <NotFoundPage />;
  }
  const imageUrl = getAssetUrl(page.image);

  return (
    <Layout>
      <Head>
        <title>{page.title} – Scoutkåren Munksnäs Spejarna</title>
        <meta property="og:title" content={page.title} />
        {imageUrl && (
          <Fragment>
            <meta property="og:image" content={'https:' + imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <main className="page">
        <h1>{page.title}</h1>
        {page.image && <HeroImage image={page.image} />}
        {page.content && <ContentBlock content={page.content} />}
      </main>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug;
  const [page, sidebar] = await Promise.all([
    fetchPage(slug),
    fetchSidebar(slug),
  ]);
  return { props: { page, sidebar } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchPages();
  const paths = pages.map(page => ({ params: { slug: page.slug.split('/') } }));
  return { paths, fallback: false };
};

export default StandardPage;
