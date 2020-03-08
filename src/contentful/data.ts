import { Document } from '@contentful/rich-text-types';
import { contentfulClient } from './client';

export async function fetchPosts() {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: 'post',
    select: 'fields.title,fields.slug,fields.date',
    order: '-fields.date',
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
  date: string;
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
