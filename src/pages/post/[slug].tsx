import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ContentfulPost, fetchPost, fetchPosts } from '../../contentful/data';
import dayjs from 'dayjs';
import { renderDocument } from '../../contentful/render';
import Sidebar from '../../components/Sidebar';
import PostLink from '../../components/PostLink';
import NotFoundPage from '../404';
import HeroImage from '../../components/HeroImage';
import ContentBlock from '../../components/ContentBlock';
import MainContent from '../../components/MainContent';
import { ParsedUrlQuery } from 'querystring';
import AppHead from '../../components/AppHead';

interface Props {
  post: ContentfulPost | null;
  posts: ContentfulPost[] | null;
}

const PostPage: NextPage<Props> = ({ post, posts }) => {
  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <MainContent>
      <AppHead title={post.title} image={post.image} />

      <article className="post">
        <h1>{post.title}</h1>
        {post.image && <HeroImage image={post.image} />}
        <p className="date">{dayjs(post.date).format('LL')}</p>
        {renderDocument(post.lead)}
        {post.content && <ContentBlock content={post.content} />}
      </article>

      {posts && (
        <Sidebar>
          <h2>Aktuellt</h2>
          <ul>
            {posts.map((post) => (
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
    </MainContent>
  );
};

interface Query extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  const slug = params!.slug!;
  const [post, posts] = await Promise.all([
    fetchPost(slug, preview),
    fetchPosts(),
  ]);
  return { props: { post, posts } };
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: true };
};

export default PostPage;
