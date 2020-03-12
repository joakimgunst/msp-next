import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID environment variable undefined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN environment variable undefined');
}

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getContentfulEntries<T>(
  query: ContentfulQuery
): Promise<T[]> {
  const entries = await contentfulClient.getEntries<T>(query);
  return entries.items.map(item => item.fields);
}

export async function getContentfulEntry<T>(
  query: ContentfulQuery
): Promise<T | null> {
  const entries = await contentfulClient.getEntries<T>(query);
  return entries.items[0]?.fields ?? null;
}

interface ContentfulQuery {
  [key: string]: string;
}
