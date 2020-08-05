import { Document } from '@contentful/rich-text-types';
import { getContentfulEntries, getContentfulEntry } from './client';
import { Asset } from 'contentful';
import { getFullSlug, getRootSlug } from './utils';

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
