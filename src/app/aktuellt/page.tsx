import { fetchPostSummaries } from '../../contentful/data';
import PostSummary from '../../components/PostSummary';
import MainContent from '../../components/MainContent';
import { Metadata } from 'next';

export const metadata = {
  title: 'Aktuellt',
} satisfies Metadata;

export default async function Page() {
  const preview = false; // TODO
  const posts = await fetchPostSummaries(preview);

  return (
    <MainContent>
      <div>
        <h1>{metadata.title}</h1>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </div>
    </MainContent>
  );
}
