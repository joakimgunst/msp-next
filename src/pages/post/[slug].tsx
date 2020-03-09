import Head from 'next/head';
import { NextPage } from 'next';
import { ContentfulPost, fetchPost, fetchPosts } from '../../contentful/data';
import Layout from '../../components/Layout';
import dayjs from 'dayjs';
import { renderDocument } from '../../contentful/render';
import Sidebar from '../../components/Sidebar';
import PostLink from '../../components/PostLink';
import { Fragment } from 'react';

interface InitialProps {
  post: ContentfulPost;
  posts: ContentfulPost[];
}

const PostPage: NextPage<InitialProps> = ({ post, posts }) => (
  <Layout>
    <Head>
      <title>{post.title} – Scoutkåren Munksnäs Spejarna</title>
      <meta property="og:title" content={post.title} />
      {post.image && (
        <Fragment>
          <meta
            property="og:image"
            content={'https:' + post.image.fields.file?.url}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Fragment>
      )}
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
      {renderDocument(post.lead)}
      {post.content && renderDocument(post.content)}
    </main>

    <Sidebar>
      <h2>Aktuellt</h2>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <PostLink slug={post.slug}>
              <a>{post.title}</a>
            </PostLink>
          </li>
        ))}
      </ul>
    </Sidebar>

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
  const [post, posts] = await Promise.all([
    fetchPost(query.slug),
    fetchPosts(),
  ]);
  return { post, posts };
};

export default PostPage;
