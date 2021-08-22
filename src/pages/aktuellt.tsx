import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import { ContentfulPost, fetchPosts } from '../contentful/data';
import PostSummary from '../components/PostSummary';
import MainContent from '../components/MainContent';
import { siteName } from '../config';

interface Props {
  posts: ContentfulPost[];
  preview: boolean;
}

const NewsPage: NextPage<Props> = ({ posts }) => {
  const title = 'Aktuellt';
  return (
    <MainContent>
      <Head>
        <title>
          {title} – {siteName}
        </title>
      </Head>

      <div>
        <h1>{title}</h1>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </div>
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({
  preview = false,
}) => {
  const posts = await fetchPosts(preview);
  return { props: { posts, preview } };
};

export default NewsPage;
