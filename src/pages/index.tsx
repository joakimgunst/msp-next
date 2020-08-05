import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import {
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
import {
  getOpenGraphImageUrl,
  getAssetUrl,
  getAssetTitle,
} from '../contentful/utils';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import { fetchPosts, ContentfulPostSummary } from '../contentful/posts';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPostSummary[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  const title = page?.title ?? siteName;

  const ogImageUrl = getOpenGraphImageUrl(page?.image);
  const imageUrl = getAssetUrl(page?.image)!;
  const imageTitle = getAssetTitle(page?.image)!;

  return (
    <MainContent>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {ogImageUrl && (
          <Fragment>
            <meta property="og:image" content={ogImageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div>
        <h1>{title}</h1>
        {page?.image && <HeroImage url={imageUrl} title={imageTitle} />}
        {page?.content && <div>{renderDocument(page.content)}</div>}

        {posts && (
          <Fragment>
            <h2>Aktuellt</h2>
            {posts.map((post) => (
              <PostSummary key={post.slug} post={post} />
            ))}
          </Fragment>
        )}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
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
