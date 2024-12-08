import { fetchPostSummaries, fetchPage, fetchSidebar } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import PostSummary from '@/components/PostSummary';
import MainContent from '@/components/MainContent';
import HeroImage from '@/components/HeroImage';
import { siteName } from '@/config';
import Link from 'next/link';
import styles from './page.module.css';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';

async function getData() {
  const slug = 'hem';
  const { isEnabled } = await draftMode();
  return await Promise.all([
    fetchPage(slug, isEnabled),
    fetchSidebar(slug, isEnabled),
    fetchPostSummaries(isEnabled, 3),
  ]);
}

export async function generateMetadata() {
  const [post] = await getData();
  return getMetadata(post);
}

export default async function Page() {
  const [page, sidebar, posts] = await getData();

  return (
    <MainContent>
      <div>
        <h1>{siteName}</h1>
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
}
