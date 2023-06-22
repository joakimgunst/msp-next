import { fetchPost, fetchPostSummaries } from '@/contentful/data';
import { renderDocument } from '@/contentful/render';
import Sidebar from '@/components/Sidebar';
import PostLink from '@/components/PostLink';
import HeroImage from '@/components/HeroImage';
import ContentBlock from '@/components/ContentBlock';
import MainContent from '@/components/MainContent';
import AppHead from '@/components/AppHead';
import styles from './page.module.css';
import { formatDate } from '@/utils/dateUtils';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const preview = false; // TODO
  const [post, posts] = await Promise.all([fetchPost(slug, preview), fetchPostSummaries()]);

  if (!post) {
    return notFound();
  }

  return (
    <MainContent>
      <AppHead title={post.title} image={post.image} />

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
