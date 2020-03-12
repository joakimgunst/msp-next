import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import {
  ContentfulPost,
  fetchPosts,
  fetchPage,
  fetchSidebar,
  ContentfulPage,
  ContentfulSidebar,
} from '../contentful/data';
import Layout from '../components/Layout';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import { Fragment } from 'react';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPost[] | null;
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => (
  <Layout>
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>{page?.title ?? 'Scoutkåren Munksnäs Spejarna'}</h1>
      {page?.content && <div>{renderDocument(page.content)}</div>}

      {posts && (
        <Fragment>
          <h2>Aktuellt</h2>
          {posts.map(post => (
            <PostSummary key={post.slug} post={post} />
          ))}
        </Fragment>
      )}
    </main>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem'),
    fetchSidebar('hem'),
    fetchPosts(),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
