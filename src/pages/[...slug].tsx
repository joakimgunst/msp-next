import Head from 'next/head';
import { NextPage } from 'next';
import {
  ContentfulPage,
  fetchPage,
  ContentfulSidebar,
  fetchSidebar,
} from '../contentful/data';
import Layout from '../components/Layout';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';

interface InitialProps {
  page: ContentfulPage;
  sidebar: ContentfulSidebar;
}

const StandardPage: NextPage<InitialProps> = ({ page, sidebar }) => (
  <Layout>
    <Head>
      <title>{page.title} – Scoutkåren Munksnäs Spejarna</title>
      <meta property="og:title" content={page.title} />
      {page.image && (
        <Fragment>
          <meta
            property="og:image"
            content={'https:' + page.image.fields.file?.url}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Fragment>
      )}
    </Head>

    <main className="page">
      <h1>{page.title}</h1>
      {page.image && (
        <img
          className="hero"
          src={page.image.fields.file.url}
          alt={page.image.fields.title}
        />
      )}
      {page.content && renderDocument(page.content)}
    </main>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}

    <style jsx>{`
      .page :global(img) {
        border-radius: 0.25rem;
      }
    `}</style>
  </Layout>
);

StandardPage.getInitialProps = async ({ query }) => {
  const [page, sidebar] = await Promise.all([
    fetchPage(query.slug),
    fetchSidebar(query.slug),
  ]);
  return { page, sidebar };
};

export default StandardPage;
