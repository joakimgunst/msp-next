import { Document } from '@contentful/rich-text-types';
import { getContentfulEntries, getContentfulEntry } from './client';
import { Asset } from 'contentful';

export async function fetchPostSummaries(preview?: boolean, limit = 100) {
  return getContentfulEntries<ContentfulPostSummary>(
    {
      content_type: 'post',
      order: '-fields.date',
      limit: limit.toString(),
      select: 'sys,fields.title,fields.slug,fields.date,fields.lead',
    },
    preview
  );
}

export async function fetchPost(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<ContentfulPost>(
    {
      content_type: 'post',
      'fields.slug': getFullSlug(slug),
    },
    preview
  );
}

export async function fetchPages(preview?: boolean) {
  return getContentfulEntries<ContentfulPage>(
    {
      content_type: 'page',
    },
    preview
  );
}

export async function fetchPage(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<ContentfulPage>(
    {
      content_type: 'page',
      'fields.slug': getFullSlug(slug),
    },
    preview
  );
}

export async function fetchSidebar(slug: string | string[], preview?: boolean) {
  return getContentfulEntry<ContentfulSidebar>(
    {
      content_type: 'sidebar',
      'fields.slug': getRootSlug(slug),
    },
    preview
  );
}

export async function fetchContacts(preview?: boolean) {
  return getContentfulEntries<ContentfulContact>(
    {
      content_type: 'contact',
      order: 'fields.order,fields.name',
    },
    preview
  );
}

export interface ContentfulPostSummary {
  title: string;
  slug: string;
  date: string;
  lead: Document;
}

export interface ContentfulPost extends ContentfulPostSummary {
  image?: Asset;
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

export interface ContentfulContact {
  name: string;
  image?: Asset;
  title?: string;
  email?: string;
  phone?: string;
  order?: number;
}

function getFullSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}

function getRootSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug[0] : slug;
}
