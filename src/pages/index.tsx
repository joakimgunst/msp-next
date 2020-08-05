import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import { Fragment } from 'react';
import MainContent from '../components/MainContent';
import { getOGImageUrl } from '../contentful/utils';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import { fetchPosts, ContentfulPostSummary } from '../contentful/posts';
import { fetchPage, ContentfulPage } from '../contentful/page';
import NotFoundPage from './404';
import { fetchSidebar, ContentfulSidebar } from '../contentful/siderbar';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPostSummary[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  if (!page) {
    return <NotFoundPage />;
  }

  const { image, content } = page;
  const title = page.title ?? siteName;

  return (
    <MainContent>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {image && (
          <Fragment>
            <meta property="og:image" content={getOGImageUrl(image.url)} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div>
        <h1>{title}</h1>
        {image && <HeroImage url={image.url} title={image.title} />}
        {content && <div>{renderDocument(content.json)}</div>}

        <h2>Aktuellt</h2>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </div>

      {sidebar?.content && (
        <Sidebar>{renderDocument(sidebar.content.json)}</Sidebar>
      )}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem', preview),
    fetchSidebar('hem', preview),
    fetchPosts(preview),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
