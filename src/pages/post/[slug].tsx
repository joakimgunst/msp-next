import Head from 'next/head';
import { NextPage } from 'next';
import { ContentfulPost, fetchPost } from '../../contentful/data';
import Link from 'next/link';
import Layout from '../../components/Layout';
import dayjs from 'dayjs';
import { renderDocument } from '../../contentful/render';

interface InitialProps {
  post: ContentfulPost;
}

const PostPage: NextPage<InitialProps> = ({ post }) => (
  <Layout>
    <Head>
      <title>{post.title} – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>{post.title}</h1>
      <p>{dayjs(post.date).format('LL')}</p>
      {post.content && <div>{renderDocument(post.content)}</div>}
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>
  </Layout>
);

PostPage.getInitialProps = async ({ query }) => {
  return {
    post: await fetchPost(query.slug),
  };
};

export default PostPage;
