import { Metadata } from 'next';
import { ContentfulAsset, ContentfulPage, ContentfulPost } from './data';
import { Document } from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export function getAssetUrl(asset: ContentfulAsset | undefined) {
  const url = asset?.fields?.file?.url;
  return url?.startsWith('//') ? `https:${url}` : url;
}

export function getAssetTitle(asset: ContentfulAsset | undefined) {
  return asset?.fields?.title;
}

export function getOpenGraphImageUrl(asset: ContentfulAsset | undefined) {
  const imageUrl = getAssetUrl(asset);
  return imageUrl ? `${imageUrl}?fit=fill&w=1200&h=630` : undefined;
}

export function getMetadata(fields: ContentfulPage | ContentfulPost | null | undefined): Metadata | undefined {
  if (!fields) return;

  const imageUrl = getOpenGraphImageUrl(fields.image);

  return {
    title: fields.title,
    description: getFirstParagraph('lead' in fields ? fields.lead : fields.content),
    ...(imageUrl && {
      openGraph: { images: [imageUrl] },
      twitter: { card: 'summary_large_image' },
    }),
  } satisfies Metadata;
}

function getFirstParagraph(document: Document | undefined): string | undefined {
  if (!document) return;
  const text = documentToPlainTextString(document, '\n').split('\n').at(0)?.replaceAll('\xa0', ' ');
  return text && text.length > 50 ? text : undefined;
}
