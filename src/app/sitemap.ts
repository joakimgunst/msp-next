import { baseUrl } from '@/config';
import { fetchPages, fetchPostSummaries } from '@/contentful/data';
import type { MetadataRoute } from 'next';

const STATIC_PATHS = ['', 'kalender', 'kontakt', 'aktuellt'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([fetchPages(), fetchPostSummaries(false, 1000)]);
  const pagePaths = pages.map((page) => page.slug).filter((slug) => slug !== 'hem');
  const postPaths = posts.map((post) => `post/${post.slug}`);
  const allPaths = [...STATIC_PATHS, ...pagePaths, ...postPaths];

  const items = allPaths.map((path) => ({ url: joinPaths(baseUrl, path) }));

  return items.toSorted((a, b) => a.url.localeCompare(b.url));
}

function joinPaths(...parts: string[]): string {
  return parts.filter((part) => part !== '').join('/');
}
