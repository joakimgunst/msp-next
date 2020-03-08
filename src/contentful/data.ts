import { Document } from '@contentful/rich-text-types';
import { contentfulClient } from './client';
import { Asset } from 'contentful';

export async function fetchPosts() {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: 'post',
    order: '-fields.date',
  });
  return entries.items.map(item => item.fields);
}

export async function fetchPost(slug: string | string[]) {
  const entries = await contentfulClient.getEntries<ContentfulPost>({
    content_type: 'post',
    'fields.slug': getFullSlug(slug),
  });
  return entries.items?.[0].fields;
}

export async function fetchPage(slug: string | string[]) {
  const entries = await contentfulClient.getEntries<ContentfulPage>({
    content_type: 'page',
    'fields.slug': getFullSlug(slug),
  });
  return entries.items[0]?.fields;
}

export async function fetchSidebar(slug: string | string[]) {
  const entries = await contentfulClient.getEntries<ContentfulSidebar>({
    content_type: 'sidebar',
    'fields.slug': getRootSlug(slug),
  });
  return entries.items[0]?.fields;
}

export interface ContentfulPost {
  title: string;
  slug: string;
  date: string;
  image?: Asset;
  lead: Document;
  content?: Document;
}

export interface ContentfulPage {
  title: string;
  slug: string;
  image?: Asset;
  content?: Document;
}

export interface ContentfulSidebar {
  content: Document;
}

function getFullSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}

function getRootSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug[0] : slug;
}
