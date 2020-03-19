import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import {
  ContentfulPost,
  fetchPosts,
  fetchPage,
  fetchSidebar,
  ContentfulPage,
  ContentfulSidebar,
} from '../contentful/data';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import { Fragment } from 'react';
import MainContent from '../components/MainContent';
import { getAssetUrl } from '../contentful/utils';
import HeroImage from '../components/HeroImage';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPost[] | null;
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  const imageUrl = getAssetUrl(page?.image);

  return (
    <MainContent>
      <Head>
        <title>Scoutkåren Munksnäs Spejarna</title>
        {imageUrl && (
          <Fragment>
            <meta property="og:image" content={'https:' + imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div>
        <h1>{page?.title ?? 'Scoutkåren Munksnäs Spejarna'}</h1>
        {page?.image && <HeroImage image={page.image} />}
        {page?.content && <div>{renderDocument(page.content)}</div>}

        {posts && (
          <Fragment>
            <h2>Aktuellt</h2>
            {posts.map(post => (
              <PostSummary key={post.slug} post={post} />
            ))}
          </Fragment>
        )}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem'),
    fetchSidebar('hem'),
    fetchPosts(),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
