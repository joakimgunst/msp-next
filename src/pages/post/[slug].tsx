import Head from 'next/head';
import { NextPage } from 'next';
import { ContentfulPost, fetchPost } from '../../contentful/data';
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

    <main className="post">
      <h1>{post.title}</h1>
      {post.image && (
        <img
          className="hero"
          src={post.image.fields.file?.url}
          alt={post.image.fields.title}
        />
      )}
      <p className="date">{dayjs(post.date).format('LL')}</p>
      {post.content && <div>{renderDocument(post.content)}</div>}
    </main>

    <style jsx>{`
      .post :global(img) {
        border-radius: 0.25rem;
      }

      .date {
        font-style: italic;
      }
    `}</style>
  </Layout>
);

PostPage.getInitialProps = async ({ query }) => {
  return {
    post: await fetchPost(query.slug),
  };
};

export default PostPage;
