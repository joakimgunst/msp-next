import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface Post {
  title: string;
  slug: string;
  content?: Document;
}

export interface Page {
  title: string;
  slug: string;
  content?: Document;
}
