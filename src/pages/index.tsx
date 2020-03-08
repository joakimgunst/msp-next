import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import { ContentfulPost, fetchPosts } from '../data/contentful';
import Layout from '../components/Layout';
import dayjs from 'dayjs';

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
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>{' '}
            ({dayjs(post.date).format('LL')})
          </li>
        ))}
      </ul>
      <p>
        <Link href="/kontakt">
          <a>Kontaktuppgifter</a>
        </Link>
      </p>
      <p>
        <Link href="/[slug]" as="/karen">
          <a>Kåren</a>
        </Link>
      </p>
    </main>
  </Layout>
);

HomePage.getInitialProps = async () => {
  return {
    posts: await fetchPosts(),
  };
};

export default HomePage;
