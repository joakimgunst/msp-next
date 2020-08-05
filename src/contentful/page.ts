import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';
import { getClient } from './client';
import { getFullSlug } from './utils';

const PAGE_QUERY = gql`
  query Page($slug: String!, $preview: Boolean!) {
    pageCollection(preview: $preview, where: { slug: $slug }) {
      items {
        title
        slug
        image {
          url
          title
        }
        content {
          json
        }
      }
    }
  }
`;

export async function fetchPage(
  slug: string | string[],
  preview = false
): Promise<ContentfulPage | null> {
  const result = await getClient(preview).query({
    query: PAGE_QUERY,
    variables: { preview, slug: getFullSlug(slug) },
  });
  return result.data.pageCollection.items?.[0] ?? null;
}

export interface ContentfulPage {
  title: string;
  slug: string;
  image?: {
    url: string;
    title: string;
  };
  content?: {
    json: Document;
  };
}
