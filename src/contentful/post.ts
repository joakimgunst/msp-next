import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';
import { graphqlClient } from './client';

export async function fetchPosts(
  preview = false
): Promise<ContentfulPostSummary[]> {
  const query = gql`
    {
      postCollection (preview: ${preview}, order: [date_DESC]) {
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

  const result = await graphqlClient.query({ query });
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
