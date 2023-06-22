import { fetchPost, fetchPostSummaries } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import PostLink from '@/components/PostLink';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import styles from './page.module.css';
import { formatDate } from '@/utils/dateUtils';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/contentful/utils';
import { draftMode } from 'next/headers';

type Props = { params: { slug: string } };

async function getData(slug: string) {
  const { isEnabled } = draftMode();
  return await Promise.all([fetchPost(slug, isEnabled), fetchPostSummaries()]);
}

export async function generateMetadata({ params: { slug } }: Props) {
  const [post] = await getData(slug);
  return getMetadata(post);
}

export default async function Page({ params: { slug } }: Props) {
  const [post, posts] = await getData(slug);

  if (!post) {
    return notFound();
  }

  return (
    <MainContent>
      <article>
        <h1>{post.title}</h1>
        {post.image && <HeroImage image={post.image} />}
        <p className={styles.date}>{formatDate(post.date)}</p>
        {renderDocument(post.lead)}
        {post.content && <ContentBlock content={post.content} />}
      </article>

      {posts && (
        <Sidebar>
          <h2>Aktuellt</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostLink slug={post.slug}>{post.title}</PostLink>
              </li>
            ))}
          </ul>
        </Sidebar>
      )}
    </MainContent>
  );
}

export async function generateStaticParams() {
  const posts = await fetchPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}
