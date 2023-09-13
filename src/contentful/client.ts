import { EntriesQueries, EntrySkeletonType, createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID env variable undefined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN env variable undefined');
}

if (!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_PREVIEW_ACCESS_TOKEN env variable undefined');
}

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}).withoutUnresolvableLinks;

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com',
}).withoutUnresolvableLinks;

function getClient(preview?: boolean) {
  return preview ? previewClient : contentfulClient;
}

export async function getContentfulEntries<T extends EntrySkeletonType>(
  query: EntriesQueries<T, 'WITHOUT_UNRESOLVABLE_LINKS'>,
  preview?: boolean,
) {
  const entries = await getClient(preview).getEntries<T>(query);
  return entries.items.map((item) => item.fields);
}

export async function getContentfulEntry<T extends EntrySkeletonType>(
  query: EntriesQueries<T, 'WITHOUT_UNRESOLVABLE_LINKS'>,
  preview?: boolean,
) {
  const entries = await getClient(preview).getEntries<T>(query);
  return entries.items.at(0)?.fields ?? null;
}
