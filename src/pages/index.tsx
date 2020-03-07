import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import { contentfulClient, Post } from '../data/contentful';
import Layout from '../components/Layout';

interface InitialProps {
  posts: Post[];
}

const HomePage: NextPage<InitialProps> = ({ posts }) => (
  <Layout>
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Scoutkåren Munksnäs Spejarna</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/kontakt">
          <a>Kontaktuppgifter</a>
        </Link>
      </p>
    </main>
  </Layout>
);

HomePage.getInitialProps = async () => {
  const entries = await contentfulClient.getEntries<Post>({
    content_type: 'post',
  });
  return {
    posts: entries.items.map(item => item.fields),
  };
};

export default HomePage;
