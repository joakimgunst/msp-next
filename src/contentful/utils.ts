import { Metadata } from 'next';
import { ContentfulAsset, ContentfulPage, ContentfulPost } from './data';

export function getAssetUrl(asset: ContentfulAsset | undefined) {
  return asset?.fields?.file?.url;
}

export function getAssetTitle(asset: ContentfulAsset | undefined) {
  return asset?.fields?.title;
}

export function getOpenGraphImageUrl(asset: ContentfulAsset | undefined) {
  const imageUrl = getAssetUrl(asset);
  return 'https:' + imageUrl + '?fit=fill&w=1200&h=630';
}

export function getMetadata(fields: ContentfulPage | ContentfulPost | null | undefined): Metadata | undefined {
  if (!fields) return;

  return {
    title: fields.title,
    ...(fields.image && {
      openGraph: { images: [getOpenGraphImageUrl(fields.image)] },
      twitter: { card: 'summary_large_image' },
    }),
  } satisfies Metadata;
}
