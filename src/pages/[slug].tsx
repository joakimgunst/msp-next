import Head from 'next/head';
import { NextPage } from 'next';
import { contentfulClient, Post, Page } from '../data/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import Layout from '../components/Layout';

interface InitialProps {
  page: Page;
}

const StandardPage: NextPage<InitialProps> = ({ page }) => (
  <Layout>
    <Head>
      <title>{page.title} – Scoutkåren Munksnäs Spejarna</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>{page.title}</h1>
      {page.content && <div>{documentToReactComponents(page.content)}</div>}
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>
  </Layout>
);

StandardPage.getInitialProps = async context => {
  const entries = await contentfulClient.getEntries<Page>({
    content_type: 'page',
    'fields.slug': context.query.slug,
  });
  return {
    page: entries.items[0].fields,
  };
};

export default StandardPage;
