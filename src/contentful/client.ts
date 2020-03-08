import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID environment variable undefined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN environment variable undefined');
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
