import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import { ContentfulPost, fetchPosts } from '../contentful/data';
import Layout from '../components/Layout';
import dayjs from 'dayjs';
import PageLink from '../components/PageLink';
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
            <PostLink slug={post.slug}>{post.title}</PostLink> (
            {dayjs(post.date).format('LL')})
          </li>
        ))}
      </ul>
      <p>
        <Link href="/kontakt">
          <a>Kontaktuppgifter</a>
        </Link>
      </p>
      <p>
        <PageLink slug="karen">Kåren</PageLink>
      </p>
      <p>
        <PageLink slug="karen/kuksa">Kuksa</PageLink>
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
