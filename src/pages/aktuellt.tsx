import { NextPage, GetStaticProps } from 'next';
import { ContentfulPostSummary, fetchPostSummaries } from '../contentful/data';
import PostSummary from '../components/PostSummary';
import MainContent from '../components/MainContent';
import AppHead from '../components/AppHead';

interface Props {
  posts: ContentfulPostSummary[];
}

const NewsPage: NextPage<Props> = ({ posts }) => {
  const title = 'Aktuellt';
  return (
    <MainContent>
      <AppHead title={title} />
      <div>
        <h1>{title}</h1>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </div>
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview = false }) => {
  const posts = await fetchPostSummaries(preview);
  return { props: { posts } };
};

export default NewsPage;
