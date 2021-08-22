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
import { getOpenGraphImageUrl } from '../contentful/utils';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import Link from 'next/link';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPost[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  const title = page?.title ?? siteName;
  const ogImageUrl = getOpenGraphImageUrl(page?.image);

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
        {page?.image && <HeroImage image={page.image} />}
        {page?.content && <div>{renderDocument(page.content)}</div>}

        <h2>Aktuellt</h2>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}

        <div className="show-all">
          <Link href="/aktuellt">
            <a>Visa alla nyheter...</a>
          </Link>
        </div>
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}

      <style jsx>{`
        .show-all {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem', preview),
    fetchSidebar('hem', preview),
    fetchPosts(preview, 3),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
