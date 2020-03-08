import Head from 'next/head';
import { NextPage } from 'next';
import { ContentfulPost, fetchPosts } from '../contentful/data';
import Layout from '../components/Layout';
import dayjs from 'dayjs';
import PostLink from '../components/PostLink';

interface InitialProps {
  posts: ContentfulPost[];
}

const HomePage: NextPage<InitialProps> = ({ posts }) => (
  <Layout>
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>Scoutkåren Munksnäs Spejarna</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <PostLink slug={post.slug}>
              <a>{post.title}</a>
            </PostLink>{' '}
            ({dayjs(post.date).format('LL')})
          </li>
        ))}
      </ul>
    </main>
  </Layout>
);

HomePage.getInitialProps = async () => {
  return {
    posts: await fetchPosts(),
  };
};

export default HomePage;
