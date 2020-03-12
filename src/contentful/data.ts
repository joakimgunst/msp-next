import { Document } from '@contentful/rich-text-types';
import { getContentfulEntries, getContentfulEntry } from './client';
import { Asset } from 'contentful';

export async function fetchPosts() {
  return getContentfulEntries<ContentfulPost>({
    content_type: 'post',
    order: '-fields.date',
  });
}

export async function fetchPost(slug: string | string[]) {
  return getContentfulEntry<ContentfulPost>({
    content_type: 'post',
    'fields.slug': getFullSlug(slug),
  });
}

export async function fetchPages() {
  return getContentfulEntries<ContentfulPage>({
    content_type: 'page',
  });
}

export async function fetchPage(slug: string | string[]) {
  return getContentfulEntry<ContentfulPage>({
    content_type: 'page',
    'fields.slug': getFullSlug(slug),
  });
}

export async function fetchSidebar(slug: string | string[]) {
  return getContentfulEntry<ContentfulSidebar>({
    content_type: 'sidebar',
    'fields.slug': getRootSlug(slug),
  });
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
