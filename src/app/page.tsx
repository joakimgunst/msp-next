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

const slug = 'hem';

export async function generateMetadata() {
  const preview = false; // TODO
  const post = await fetchPage(slug, preview);
  return getMetadata(post);
}

export default async function Page() {
  const preview = false; // TODO

  const [page, sidebar, posts] = await Promise.all([
    fetchPage(slug, preview),
    fetchSidebar(slug, preview),
    fetchPostSummaries(preview, 3),
  ]);

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
