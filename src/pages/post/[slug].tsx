import Head from 'next/head';
import { NextPage } from 'next';
import { contentfulClient, Post } from '../../data/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import Layout from '../../components/Layout';

interface InitialProps {
  post: Post;
}

const PostPage: NextPage<InitialProps> = ({ post }) => (
  <Layout>
    <Head>
      <title>{post.title} – Scoutkåren Munksnäs Spejarna</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>{post.title}</h1>
      {post.content && <div>{documentToReactComponents(post.content)}</div>}
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>
  </Layout>
);

PostPage.getInitialProps = async context => {
  const entries = await contentfulClient.getEntries<Post>({
    content_type: 'post',
    'fields.slug': context.query.slug,
  });
  return {
    post: entries.items[0].fields,
  };
};

export default PostPage;
