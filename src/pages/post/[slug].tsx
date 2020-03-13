import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ContentfulPost, fetchPost, fetchPosts } from '../../contentful/data';
import Layout from '../../components/Layout';
import dayjs from 'dayjs';
import { renderDocument } from '../../contentful/render';
import Sidebar from '../../components/Sidebar';
import PostLink from '../../components/PostLink';
import { Fragment } from 'react';
import { getAssetUrl } from '../../contentful/utils';
import NotFoundPage from '../404';
import HeroImage from '../../components/HeroImage';
import ContentBlock from '../../components/ContentBlock';

interface Props {
  post: ContentfulPost | null;
  posts: ContentfulPost[] | null;
}

const PostPage: NextPage<Props> = ({ post, posts }) => {
  if (!post) {
    return <NotFoundPage />;
  }

  const imageUrl = getAssetUrl(post.image);

  return (
    <Layout>
      <Head>
        <title>{post.title} – Scoutkåren Munksnäs Spejarna</title>
        <meta property="og:title" content={post.title} />
        {imageUrl && (
          <Fragment>
            <meta property="og:image" content={'https:' + imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <main className="post">
        <h1>{post.title}</h1>
        {post.image && <HeroImage image={post.image} />}
        <p className="date">{dayjs(post.date).format('LL')}</p>
        {renderDocument(post.lead)}
        {post.content && <ContentBlock content={post.content} />}
      </main>

      {posts && (
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
      )}

      <style jsx>{`
        .date {
          font-style: italic;
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug;
  const [post, posts] = await Promise.all([fetchPost(slug), fetchPosts()]);
  return { props: { post, posts } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export default PostPage;
