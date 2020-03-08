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

interface InitialProps {
  page: ContentfulPage;
  sidebar: ContentfulSidebar;
}

const StandardPage: NextPage<InitialProps> = ({ page, sidebar }) => (
  <Layout>
    <Head>
      <title>{page.title} – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>{page.title}</h1>
      {page.content && <div>{renderDocument(page.content)}</div>}
    </main>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
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
