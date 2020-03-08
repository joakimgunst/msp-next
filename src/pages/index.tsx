import Head from 'next/head';
import { NextPage } from 'next';
import {
  ContentfulPost,
  fetchPosts,
  fetchPage,
  fetchSidebar,
  ContentfulPage,
  ContentfulSidebar,
} from '../contentful/data';
import Layout from '../components/Layout';
import dayjs from 'dayjs';
import PostLink from '../components/PostLink';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';

interface InitialProps {
  page: ContentfulPage;
  sidebar: ContentfulSidebar;
  posts: ContentfulPost[];
}

const HomePage: NextPage<InitialProps> = ({ page, sidebar, posts }) => (
  <Layout>
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>{page.title}</h1>
      {page.content && <div>{renderDocument(page.content)}</div>}

      <h2>Aktuellt</h2>
      {posts.map(post => (
        <div key={post.slug}>
          <h3>
            <PostLink slug={post.slug}>
              <a>{post.title}</a>
            </PostLink>
          </h3>
          {dayjs(post.date).format('LL')}
        </div>
      ))}
    </main>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
  </Layout>
);

HomePage.getInitialProps = async () => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem'),
    fetchSidebar('hem'),
    fetchPosts(),
  ]);
  return { page, sidebar, posts };
};

export default HomePage;
