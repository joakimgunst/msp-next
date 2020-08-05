import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';
import { graphqlClient } from './client';
import { getRootSlug } from './utils';

const SIDEBAR_QUERY = gql`
  query Sidebar($slug: String!, $preview: Boolean!) {
    sidebarCollection(preview: $preview, where: { slug: $slug }) {
      items {
        content {
          json
        }
      }
    }
  }
`;

export async function fetchSidebar(
  slug: string | string[],
  preview = false
): Promise<ContentfulSidebar | null> {
  const result = await graphqlClient.query({
    query: SIDEBAR_QUERY,
    variables: { preview, slug: getRootSlug(slug) },
  });
  return result.data.sidebarCollection.items?.[0] ?? null;
}

export interface ContentfulSidebar {
  content?: {
    json: Document;
  };
}
