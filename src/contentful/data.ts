import { cache } from 'react';
import { getContentfulEntries, getContentfulEntry, getContentfulEntryItems } from './client';
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

// The Contentful SDK doesn't use fetch, so requests are not deduplicated by
// Next.js. Wrap each fetcher in cache() to avoid duplicate API calls when both
// generateMetadata and the page component request the same data.
export const fetchPostSummaries = cache(async (preview?: boolean, limit = 100) => {
  return getContentfulEntries<TypePostSkeleton>(
    {
      content_type: 'post',
      order: ['-fields.date'],
      limit: limit,
      select: ['sys', 'fields.title', 'fields.slug', 'fields.date', 'fields.lead'],
    },
    preview,
  );
});

export async function fetchPost(slug: string | string[], preview?: boolean) {
  return fetchPostBySlug(getFullSlug(slug), preview);
}

const fetchPostBySlug = cache(async (slug: string, preview?: boolean) => {
  return getContentfulEntry<TypePostSkeleton>(
    {
      content_type: 'post',
      'fields.slug': slug,
    },
    preview,
  );
});

export const fetchPages = cache(async (preview?: boolean) => {
  return getContentfulEntries<TypePageSkeleton>(
    {
      content_type: 'page',
    },
    preview,
  );
});

export async function fetchPage(slug: string | string[], preview?: boolean) {
  return fetchPageBySlug(getFullSlug(slug), preview);
}

const fetchPageBySlug = cache(async (slug: string, preview?: boolean) => {
  return getContentfulEntry<TypePageSkeleton>(
    {
      content_type: 'page',
      'fields.slug': slug,
    },
    preview,
  );
});

export async function fetchSidebar(slug: string | string[], preview?: boolean) {
  return fetchSidebarBySlug(getRootSlug(slug), preview);
}

const fetchSidebarBySlug = cache(async (slug: string, preview?: boolean) => {
  return getContentfulEntry<TypeSidebarSkeleton>(
    {
      content_type: 'sidebar',
      'fields.slug': slug,
    },
    preview,
  );
});

// Full entries including sys.updatedAt, used for the sitemap
export const fetchPageEntries = cache(async () => {
  return getContentfulEntryItems<TypePageSkeleton>({
    content_type: 'page',
    select: ['sys', 'fields.slug'],
  });
});

export const fetchPostEntries = cache(async () => {
  return getContentfulEntryItems<TypePostSkeleton>({
    content_type: 'post',
    limit: 1000,
    select: ['sys', 'fields.slug'],
  });
});

export const fetchContactPage = cache(async (preview?: boolean) => {
  return getContentfulEntry<TypeContactPageSkeleton>(
    {
      content_type: 'contactPage',
    },
    preview,
  );
});

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
