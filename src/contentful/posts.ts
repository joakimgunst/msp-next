import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';
import { graphqlClient } from './client';

const POSTS_QUERY = gql`
  query Posts($preview: Boolean!) {
    postCollection(preview: $preview, order: [date_DESC]) {
      items {
        title
        slug
        date
        lead {
          json
        }
      }
    }
  }
`;

export async function fetchPosts(
  preview = false
): Promise<ContentfulPostSummary[]> {
  const result = await graphqlClient.query({
    query: POSTS_QUERY,
    variables: { preview },
  });
  return result.data.postCollection.items;
}

export interface ContentfulPostSummary {
  title: string;
  slug: string;
  date: string;
  lead: {
    json: Document;
  };
}
