import { getContentfulEntries, getContentfulEntry } from './client';
import {
  TypeContact,
  TypeContactPageSkeleton,
  TypePage,
  TypePageSkeleton,
  TypePost,
  TypePostSkeleton,
  TypeSidebar,
  TypeSidebarSkeleton,
} from '../contentful/types';
import { Asset } from 'contentful';

export async function fetchPostSummaries(preview?: boolean, limit = 100) {
  return getContentfulEntries<TypePostSkeleton>(
    {
      content_type: 'post',
      order: ['-fields.date'],
      limit: limit,
      select: ['sys', 'fields.title', 'fields.slug', 'fields.date', 'fields.lead'],
    },
    preview,
  );
}

export async function fetchPost(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<TypePostSkeleton>(
    {
      content_type: 'post',
      'fields.slug': getFullSlug(slug),
    },
    preview,
  );
}

export async function fetchPages(preview?: boolean) {
  return getContentfulEntries<TypePageSkeleton>(
    {
      content_type: 'page',
    },
    preview,
  );
}

export async function fetchPage(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<TypePageSkeleton>(
    {
      content_type: 'page',
      'fields.slug': getFullSlug(slug),
    },
    preview,
  );
}

export async function fetchSidebar(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<TypeSidebarSkeleton>(
    {
      content_type: 'sidebar',
      'fields.slug': getRootSlug(slug),
    },
    preview,
  );
}

export async function fetchContactPage(preview?: boolean) {
  return getContentfulEntry<TypeContactPageSkeleton>(
    {
      content_type: 'contactPage',
    },
    preview,
  );
}

export type ContentfulPostEntry = TypePost<'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type ContentfulPost = ContentfulPostEntry['fields'];

export type ContentfulPostSummary = Pick<ContentfulPost, 'title' | 'slug' | 'date' | 'lead'>;

export type ContentfulPageEntry = TypePage<'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type ContentfulPage = ContentfulPageEntry['fields'];

export type ContentfulSidebarEntry = TypeSidebar<'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type ContentfulSidebar = ContentfulSidebarEntry['fields'];

export type ContentfulContactEntry = TypeContact<'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type ContentfulContact = ContentfulContactEntry['fields'];

export type ContentfulAsset = Asset<'WITHOUT_UNRESOLVABLE_LINKS'>;

function getFullSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}

function getRootSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug[0] : slug;
}
