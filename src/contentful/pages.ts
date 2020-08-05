import { gql } from '@apollo/client';
import { graphqlClient } from './client';

const PAGES_QUERY = gql`
  query Pages($preview: Boolean!) {
    pageCollection(preview: $preview) {
      items {
        title
        slug
      }
    }
  }
`;

export async function fetchPages(
  preview = false
): Promise<ContentfulPageSummary[]> {
  const result = await graphqlClient.query({
    query: PAGES_QUERY,
    variables: { preview },
  });
  return result.data.pageCollection.items;
}

export interface ContentfulPageSummary {
  title: string;
  slug: string;
}
