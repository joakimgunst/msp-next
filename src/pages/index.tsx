import { NextPage, GetStaticProps } from 'next';
import {
  fetchPostSummaries,
  fetchPage,
  fetchSidebar,
  ContentfulPage,
  ContentfulSidebar,
  ContentfulPostSummary,
} from '../contentful/data';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import MainContent from '../components/MainContent';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import Link from 'next/link';
import AppHead from '../components/AppHead';
import styles from './index.module.css';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPostSummary[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  const title = page?.title ?? siteName;

  return (
    <MainContent>
      <AppHead title={title} image={page?.image} noSiteName />

      <div>
        <h1>{title}</h1>
        {page?.image && <HeroImage image={page.image} />}
        {page?.content && <div>{renderDocument(page.content)}</div>}

        <h2>Aktuellt</h2>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}

        <div className={styles.showAll}>
          <Link href="/aktuellt">Visa alla nyheter...</Link>
        </div>
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem', preview),
    fetchSidebar('hem', preview),
    fetchPostSummaries(preview, 3),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
