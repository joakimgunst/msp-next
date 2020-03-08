import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

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

export async function fetchPosts() {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: 'post',
    select: 'fields.title,fields.slug',
  });
  return entries.items.map(item => item.fields);
}

export async function fetchPost(slug: string | string[]) {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: 'post',
    'fields.slug': concatSlug(slug),
  });
  return entries.items?.[0].fields;
}

export async function fetchPage(slug: string | string[]) {
  const entries = await contentfulClient.getEntries<ContentfulPage>({
    content_type: 'page',
    'fields.slug': concatSlug(slug),
  });
  return entries.items?.[0].fields;
}

export interface ContentfulPost {
  title: string;
  slug: string;
  content?: Document;
}

export interface ContentfulPage {
  title: string;
  slug: string;
  content?: Document;
}

function concatSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}
