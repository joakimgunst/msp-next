import { baseUrl } from '@/config';
import { fetchPageEntries, fetchPostEntries } from '@/contentful/data';
import type { MetadataRoute } from 'next';

const STATIC_PATHS = ['', 'kalender', 'kontakt', 'aktuellt'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([fetchPageEntries(), fetchPostEntries()]);

  const staticItems = STATIC_PATHS.map((path) => ({ path }));
  const pageItems = pages
    .filter((page) => page.fields.slug !== 'hem')
    .map((page) => ({ path: page.fields.slug, lastModified: page.sys.updatedAt }));
  const postItems = posts.map((post) => ({
    path: `post/${post.fields.slug}`,
    lastModified: post.sys.updatedAt,
  }));

  const items = [...staticItems, ...pageItems, ...postItems].map(({ path, ...rest }) => ({
    url: joinPaths(baseUrl, path),
    ...rest,
  }));

  return items.toSorted((a, b) => a.url.localeCompare(b.url));
}

function joinPaths(...parts: string[]): string {
  return parts.filter((part) => part !== '').join('/');
}
