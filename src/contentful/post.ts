import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';
import { graphqlClient } from './client';
import { getFullSlug } from './utils';

const POST_QUERY = gql`
  query Post($slug: String!, $preview: Boolean!) {
    postCollection(preview: $preview, where: { slug: $slug }) {
      items {
        title
        slug
        date
        image {
          url
          title
        }
        lead {
          json
        }
        content {
          json
        }
      }
    }
  }
`;

export async function fetchPost(
  slug: string | string[],
  preview = false
): Promise<ContentfulPost | null> {
  const result = await graphqlClient.query({
    query: POST_QUERY,
    variables: { preview, slug: getFullSlug(slug) },
  });
  return result.data.postCollection.items?.[0] ?? null;
}

export interface ContentfulPost {
  title: string;
  slug: string;
  date: string;
  image?: {
    url: string;
    title: string;
  };
  lead: {
    json: Document;
  };
  content: {
    json: Document;
  };
}
