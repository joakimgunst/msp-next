import Head from 'next/head';
import { NextPage } from 'next';
import { ContentfulPage, fetchPage } from '../contentful/data';
import Link from 'next/link';
import Layout from '../components/Layout';
import { renderDocument } from '../contentful/render';

interface InitialProps {
  page: ContentfulPage;
}

const StandardPage: NextPage<InitialProps> = ({ page }) => (
  <Layout>
    <Head>
      <title>{page.title} – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>{page.title}</h1>
      {page.content && <div>{renderDocument(page.content)}</div>}
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>
  </Layout>
);

StandardPage.getInitialProps = async ({ query }) => {
  return {
    page: await fetchPage(query.slug),
  };
};

export default StandardPage;
